
from pathlib import Path
import shutil
import yaml

# ==================================================
# KONFIGURASI
# ==================================================

PROJECT_DIR = Path(__file__).resolve().parent.parent

SOURCE_DIR = PROJECT_DIR / "dataset" / "Skin_Care_Detection"
OUTPUT_DIR = PROJECT_DIR / "dataset" / "Skinova_YOLO_Detection"

SPLITS = ["train", "valid", "test"]

# ID kelas asli: ID kelas baru
CLASS_MAPPING = {
    0: 0,  # dark spots
    1: 1,  # inflammatory acne
    2: 2,  # blackheads
    6: 3,  # redness
    7: 4,  # wrinkles
}

CLASS_NAMES = [
    "dark_spots",
    "acne",
    "blackheads",
    "skin_redness",
    "wrinkles",
]

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


# ==================================================
# KONVERSI ANOTASI
# ==================================================

def convert_annotation(line, line_number):
    parts = line.strip().split()

    if len(parts) < 5:
        raise ValueError(
            f"Baris {line_number}: anotasi terlalu pendek."
        )

    old_class = int(parts[0])

    # Abaikan kelas yang tidak digunakan
    if old_class not in CLASS_MAPPING:
        return None

    values = [float(value) for value in parts[1:]]

    # Format bounding box YOLO:
    # class x_center y_center width height
    if len(parts) == 5:
        x_center, y_center, width, height = values

    # Format polygon YOLO:
    # class x1 y1 x2 y2 x3 y3 ...
    else:
        if len(values) < 6 or len(values) % 2 != 0:
            raise ValueError(
                f"Baris {line_number}: format polygon tidak valid."
            )

        xs = values[0::2]
        ys = values[1::2]

        x_min = min(xs)
        x_max = max(xs)
        y_min = min(ys)
        y_max = max(ys)

        x_center = (x_min + x_max) / 2
        y_center = (y_min + y_max) / 2
        width = x_max - x_min
        height = y_max - y_min

    # Pastikan koordinat normalisasi valid
    coordinates = [x_center, y_center, width, height]

    if not all(0 <= value <= 1 for value in coordinates):
        raise ValueError(
            f"Baris {line_number}: koordinat di luar rentang 0-1."
        )

    if width <= 0 or height <= 0:
        raise ValueError(
            f"Baris {line_number}: ukuran bounding box tidak valid."
        )

    new_class = CLASS_MAPPING[old_class]

    return (
        f"{new_class} "
        f"{x_center:.8f} "
        f"{y_center:.8f} "
        f"{width:.8f} "
        f"{height:.8f}"
    )


# ==================================================
# PROSES DATASET
# ==================================================

def main():

    if not SOURCE_DIR.exists():
        raise FileNotFoundError(
            f"Dataset sumber tidak ditemukan: {SOURCE_DIR}"
        )

    if OUTPUT_DIR.exists():
        raise FileExistsError(
            f"Folder output sudah ada: {OUTPUT_DIR}\n"
            "Pindahkan atau ubah nama folder tersebut sebelum menjalankan ulang."
        )

    # Pastikan struktur sumber tersedia
    for split in SPLITS:
        if not (SOURCE_DIR / split / "images").exists():
            raise FileNotFoundError(f"Folder images {split} tidak ditemukan.")

        if not (SOURCE_DIR / split / "labels").exists():
            raise FileNotFoundError(f"Folder labels {split} tidak ditemukan.")

    OUTPUT_DIR.mkdir(parents=True)

    total_objects = [0] * len(CLASS_NAMES)
    total_images = 0

    for split in SPLITS:

        print(f"\nMemproses {split.upper()}...")

        source_images = SOURCE_DIR / split / "images"
        source_labels = SOURCE_DIR / split / "labels"

        target_images = OUTPUT_DIR / split / "images"
        target_labels = OUTPUT_DIR / split / "labels"

        target_images.mkdir(parents=True)
        target_labels.mkdir(parents=True)

        image_lookup = {}

        for image_path in source_images.iterdir():
            if image_path.is_file() and image_path.suffix.lower() in IMAGE_EXTENSIONS:
                image_lookup.setdefault(image_path.stem, []).append(image_path)

        split_objects = [0] * len(CLASS_NAMES)
        split_images = 0

        label_files = sorted(source_labels.glob("*.txt"))

        for label_path in label_files:

            candidates = image_lookup.get(label_path.stem, [])

            if len(candidates) != 1:
                raise ValueError(
                    f"Pasangan gambar tidak ditemukan atau ambigu: "
                    f"{label_path.name} ({len(candidates)} gambar cocok)"
                )

            image_path = candidates[0]

            converted_lines = []

            for line_number, line in enumerate(
                label_path.read_text(encoding="utf-8").splitlines(),
                start=1
            ):
                if not line.strip():
                    continue

                converted = convert_annotation(line, line_number)

                if converted is not None:
                    converted_lines.append(converted)

                    new_class = int(converted.split()[0])
                    split_objects[new_class] += 1

            # Hanya simpan gambar yang memiliki objek target
            if not converted_lines:
                continue

            shutil.copy2(
                image_path,
                target_images / image_path.name
            )

            (target_labels / label_path.name).write_text(
                "\n".join(converted_lines) + "\n",
                encoding="utf-8"
            )

            split_images += 1

        print(f"Gambar hasil konversi: {split_images:,}")

        for class_id, class_name in enumerate(CLASS_NAMES):
            print(
                f"{class_name}: "
                f"{split_objects[class_id]:,} objek"
            )

        total_images += split_images

        for i in range(len(CLASS_NAMES)):
            total_objects[i] += split_objects[i]

    # ==================================================
    # BUAT DATA.YAML
    # ==================================================

    data_config = {
        "path": ".",
        "train": "train/images",
        "val": "valid/images",
        "test": "test/images",
        "nc": len(CLASS_NAMES),
        "names": CLASS_NAMES,
    }

    with (OUTPUT_DIR / "data.yaml").open(
        "w",
        encoding="utf-8"
    ) as file:
        yaml.safe_dump(
            data_config,
            file,
            sort_keys=False,
            allow_unicode=True
        )

    print("\n===================================")
    print("KONVERSI SELESAI")
    print("===================================")
    print(f"Total gambar: {total_images:,}")
    print(f"Lokasi output: {OUTPUT_DIR}")

    print("\nTotal objek setiap kelas:")

    for class_id, class_name in enumerate(CLASS_NAMES):
        print(f"{class_name}: {total_objects[class_id]:,}")

    print("\nFile data.yaml berhasil dibuat.")


if __name__ == "__main__":
    main()
