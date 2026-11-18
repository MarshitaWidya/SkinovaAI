
import json

from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.services.image_validation import validate_image_bytes
from app.services.skin_detector import detect_skin_conditions
from app.services.skin_recommendations import (
    get_skin_recommendations,
    get_ingredient_warnings,
)
from app.services.questionnaire_service import build_questionnaire_context


router = APIRouter(
    prefix="/api/analysis",
    tags=["Analysis"],
)

ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
]

MAX_FILE_SIZE = 8 * 1024 * 1024


async def read_image(file: UploadFile):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Gunakan format JPG, PNG, atau WEBP.",
        )

    image_bytes = await file.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="File gambar kosong.",
        )

    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Ukuran gambar maksimal 8 MB.",
        )

    return image_bytes


@router.get("/status")
async def analysis_status():
    return {
        "available": True,
        "message": "Model YOLO Skinova V1 siap digunakan.",
        "stage": "AI Skin Detection",
    }


@router.post("/validate")
async def validate_uploaded_image(
    file: UploadFile = File(...),
):
    image_bytes = await read_image(file)
    return validate_image_bytes(image_bytes)


@router.post("/analyze")
async def analyze_skin(
    file: UploadFile = File(...),
    questionnaire: str = Form("{}"),
):
    image_bytes = await read_image(file)

    try:
        questionnaire_data = json.loads(questionnaire)

        if not isinstance(questionnaire_data, dict):
            raise ValueError("Format kuesioner tidak valid.")

    except (json.JSONDecodeError, ValueError):
        raise HTTPException(
            status_code=422,
            detail="Jawaban kuesioner tidak valid.",
        )

    validation = validate_image_bytes(image_bytes)

    if not validation["valid"]:
        return {
            "success": False,
            "stage": "image_validation",
            "message": validation["message"],
            "validation": validation,
            "analysis": None,
        }

    try:
        analysis = detect_skin_conditions(image_bytes)

        analysis["recommendations"] = get_skin_recommendations(
            analysis["detections"]
        )

        analysis["ingredient_warnings"] = get_ingredient_warnings(
            analysis["recommendations"]
        )

        analysis["questionnaire_context"] = (
            build_questionnaire_context(questionnaire_data)
        )

        return {
            "success": True,
            "message": "Analisis kulit berhasil dilakukan.",
            "validation": validation,
            "analysis": analysis,
            "disclaimer": (
                "Hasil merupakan estimasi AI untuk tujuan edukasi, "
                "bukan diagnosis medis."
            ),
        }

    except FileNotFoundError as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Gagal melakukan analisis: {str(error)}",
        )
