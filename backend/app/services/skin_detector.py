
from pathlib import Path
from functools import lru_cache

import cv2
import numpy as np
import torch
from ultralytics import YOLO


PROJECT_ROOT = Path(__file__).resolve().parents[3]

MODEL_PATH = (
    PROJECT_ROOT
    / "runs"
    / "detect"
    / "runs"
    / "skinova"
    / "yolo11n_v1-2"
    / "weights"
    / "best.pt"
)


@lru_cache(maxsize=1)
def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Model tidak ditemukan: {MODEL_PATH}"
        )

    return YOLO(str(MODEL_PATH))


def detect_skin_conditions(image_bytes: bytes):

    image_array = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if image is None:
        raise ValueError("Gambar tidak dapat dibaca.")

    model = load_model()

    device = 0 if torch.cuda.is_available() else "cpu"

    results = model.predict(
        source=image,
        imgsz=640,
        conf=0.05,
        iou=0.45,
        device=device,
        verbose=False
    )

    result = results[0]
    detections = []

    if result.boxes is not None:

        for box in result.boxes:

            class_id = int(box.cls[0].item())
            confidence = float(box.conf[0].item())

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            class_name = model.names[class_id]

            detections.append({
                "class_id": class_id,
                "class_name": class_name,
                "confidence": round(confidence, 4),
                "bounding_box": {
                    "x1": round(x1, 2),
                    "y1": round(y1, 2),
                    "x2": round(x2, 2),
                    "y2": round(y2, 2)
                }
            })

    detections.sort(
        key=lambda item: item["confidence"],
        reverse=True
    )

    summary = {}

    for detection in detections:

        name = detection["class_name"]

        if name not in summary:
            summary[name] = {
                "count": 0,
                "highest_confidence": detection["confidence"]
            }

        summary[name]["count"] += 1

    return {
        "success": True,
        "model": "YOLO11n Skinova V1",
        "device": "GPU" if device == 0 else "CPU",
        "image_width": image.shape[1],
        "image_height": image.shape[0],
        "total_detections": len(detections),
        "summary": summary,
        "detections": detections
    }
