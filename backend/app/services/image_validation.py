
import cv2
import numpy as np


def detect_faces(gray):
    """
    Mendeteksi wajah menggunakan Haar Cascade pada gambar asli
    dan gambar yang sudah ditingkatkan kontrasnya.
    """

    cascade_path = (
        cv2.data.haarcascades
        + "haarcascade_frontalface_default.xml"
    )

    face_detector = cv2.CascadeClassifier(cascade_path)

    if face_detector.empty():
        return []

    # Tingkatkan kontras untuk membantu mendeteksi wajah
    # yang pencahayaannya kurang merata.
    equalized = cv2.equalizeHist(gray)

    detected_faces = []

    for image in [gray, equalized]:
        faces = face_detector.detectMultiScale(
            image,
            scaleFactor=1.05,
            minNeighbors=4,
            minSize=(60, 60)
        )

        for (x, y, w, h) in faces:
            detected_faces.append([int(x), int(y), int(w), int(h)])

    if not detected_faces:
        return []

    # Menggabungkan deteksi ganda dari gambar asli
    # dan gambar yang sudah ditingkatkan kontrasnya.
    boxes = [
        [x, y, w, h]
        for x, y, w, h in detected_faces
    ]

    scores = [1.0] * len(boxes)

    indices = cv2.dnn.NMSBoxes(
        boxes,
        scores,
        score_threshold=0.0,
        nms_threshold=0.35
    )

    if len(indices) == 0:
        return []

    indices = np.array(indices).flatten()

    result = [boxes[i] for i in indices]

    return result


def validate_image_bytes(image_bytes: bytes):
    """
    Memeriksa kualitas gambar sebelum dikirim
    ke proses analisis kondisi kulit.
    """

    image_array = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if image is None:
        return {
            "valid": False,
            "message": "File gambar tidak dapat dibaca.",
            "errors": ["Format gambar tidak valid."]
        }

    height, width = image.shape[:2]

    errors = []
    checks = {}

    # 1. Pemeriksaan resolusi
    resolution_passed = width >= 320 and height >= 320

    checks["resolution"] = {
        "passed": resolution_passed,
        "width": width,
        "height": height
    }

    if not resolution_passed:
        errors.append(
            "Resolusi gambar terlalu rendah. "
            "Gunakan foto yang lebih jelas."
        )

    # 2. Deteksi wajah
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = detect_faces(gray)

    checks["face_detection"] = {
        "passed": len(faces) == 1,
        "face_count": len(faces)
    }

    if len(faces) == 0:
        errors.append(
            "Wajah tidak terdeteksi. "
            "Posisikan wajah menghadap kamera."
        )

    elif len(faces) > 1:
        errors.append(
            "Terdapat lebih dari satu wajah. "
            "Pastikan hanya satu wajah terlihat."
        )

    # Pemeriksaan kualitas hanya dilakukan jika
    # tepat satu wajah berhasil dideteksi.
    if len(faces) == 1:
        x, y, w, h = faces[0]

        face_area = gray[y:y+h, x:x+w]

        if face_area.size == 0:
            errors.append(
                "Area wajah tidak dapat diperiksa. "
                "Silakan gunakan foto lain."
            )
        else:
            # 3. Pemeriksaan pencahayaan wajah
            brightness = float(np.mean(face_area))

            dark_ratio = float(
                np.mean(face_area < 50) * 100
            )

            bright_ratio = float(
                np.mean(face_area > 230) * 100
            )

            # Pemeriksaan perbedaan pencahayaan
            # berdasarkan beberapa bagian wajah.
            resized_face = cv2.resize(
                face_area,
                (64, 64)
            )

            tile_means = []

            for row in range(4):
                for col in range(4):
                    tile = resized_face[
                        row * 16:(row + 1) * 16,
                        col * 16:(col + 1) * 16
                    ]

                    tile_means.append(float(np.mean(tile)))

            lighting_variation = float(
                np.std(tile_means)
            )

            lighting_passed = (
                65 <= brightness <= 200
                and dark_ratio <= 25
                and bright_ratio <= 20
                and lighting_variation <= 50
            )

            checks["lighting"] = {
                "passed": lighting_passed,
                "brightness": round(brightness, 2),
                "dark_ratio": round(dark_ratio, 2),
                "bright_ratio": round(bright_ratio, 2),
                "variation": round(lighting_variation, 2)
            }

            if brightness < 65 or dark_ratio > 25:
                errors.append(
                    "Wajah terlalu gelap. "
                    "Cari tempat dengan pencahayaan lebih baik."
                )

            elif brightness > 200 or bright_ratio > 20:
                errors.append(
                    "Wajah terlalu terang. "
                    "Hindari cahaya berlebihan yang mengenai wajah."
                )

            elif lighting_variation > 50:
                errors.append(
                    "Pencahayaan wajah tidak merata. "
                    "Hindari cahaya dari belakang dan arahkan "
                    "wajah ke sumber cahaya."
                )

            # 4. Pemeriksaan ketajaman gambar
            sharpness = float(
                cv2.Laplacian(
                    face_area,
                    cv2.CV_64F
                ).var()
            )

            sharpness_passed = sharpness >= 70

            checks["sharpness"] = {
                "passed": sharpness_passed,
                "score": round(sharpness, 2)
            }

            if not sharpness_passed:
                errors.append(
                    "Foto kurang jelas atau buram. "
                    "Coba ambil foto kembali."
                )

    valid = len(errors) == 0

    return {
        "valid": valid,
        "message": (
            "Foto memenuhi persyaratan dan siap dianalisis."
            if valid
            else "Foto belum memenuhi persyaratan."
        ),
        "checks": checks,
        "errors": errors
    }
