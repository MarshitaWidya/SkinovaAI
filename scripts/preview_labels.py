
from pathlib import Path
import cv2
import random

PROJECT_DIR = Path(__file__).resolve().parent.parent
DATASET_DIR = PROJECT_DIR / "dataset" / "Skinova_YOLO_Detection"
PREVIEW_DIR = PROJECT_DIR / "dataset" / "Skinova_Preview"

CLASS_NAMES = [
    "Dark Spots",
    "Acne",
    "Blackheads",
    "Skin Redness",
    "Wrinkles",
]

COLORS = [
    (255, 150, 0),
    (0, 0, 255),
    (0, 255, 255),
    (255, 0, 255),
    (0, 255, 0),
]

random.seed(42)

for split in ["train", "valid", "test"]:

    image_dir = DATASET_DIR / split / "images"
    label_dir = DATASET_DIR / split / "labels"

    output_dir = PREVIEW_DIR / split
    output_dir.mkdir(parents=True, exist_ok=True)

    label_files = sorted(label_dir.glob("*.txt"))
    random.shuffle(label_files)

    selected = label_files[:4]

    for label_file in selected:

        matches = list(image_dir.glob(label_file.stem + ".*"))

        if len(matches) != 1:
            continue

        image_path = matches[0]
        image = cv2.imread(str(image_path))

        if image is None:
            continue

        height, width = image.shape[:2]

        for line in label_file.read_text().splitlines():

            if not line.strip():
                continue

            values = line.split()

            if len(values) != 5:
                print("Format label tidak valid:", label_file.name)
                continue

            class_id = int(values[0])
            xc, yc, bw, bh = map(float, values[1:])

            x1 = int((xc - bw / 2) * width)
            y1 = int((yc - bh / 2) * height)
            x2 = int((xc + bw / 2) * width)
            y2 = int((yc + bh / 2) * height)

            color = COLORS[class_id]

            cv2.rectangle(
                image,
                (x1, y1),
                (x2, y2),
                color,
                2
            )

            cv2.putText(
                image,
                CLASS_NAMES[class_id],
                (x1, max(y1 - 8, 20)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                color,
                2
            )

        output_path = output_dir / image_path.name
        cv2.imwrite(str(output_path), image)

        print("Preview:", output_path)

print("\nVisualisasi selesai.")
print("Lokasi:", PREVIEW_DIR)
