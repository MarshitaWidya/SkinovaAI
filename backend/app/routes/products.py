
from fastapi import APIRouter

from app.services.product_recommendations import (
    get_product_recommendations,
    load_skincare_products,
)

router = APIRouter(
    prefix="/api/products",
    tags=["Products"],
)


@router.get("/")
async def get_products():
    products = load_skincare_products()

    return {
        "success": True,
        "total": len(products),
        "products": [
            product.model_dump()
            for product in products
            if product.is_active
        ],
    }


@router.get("/test-recommendations")
async def test_product_recommendations():
    sample_recommendations = [
        {
            "title": "Acne",
            "ingredients": [
                "Salicylic Acid",
                "Niacinamide",
            ],
        }
    ]

    products = get_product_recommendations(
        recommendations=sample_recommendations,
        limit=6,
    )

    return {
        "success": True,
        "condition": "Acne",
        "total": len(products),
        "products": products,
    }
