
import json
from pathlib import Path

from app.models.product import SkincareProduct


# Lokasi file katalog produk
DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "skincare_products.json"


def normalize_text(value: str) -> str:
    """Menyeragamkan teks agar pencocokan lebih konsisten."""
    return value.lower().strip().replace("_", " ").replace("-", " ")


def load_skincare_products() -> list[SkincareProduct]:
    """Membaca katalog produk dari file JSON."""
    if not DATA_FILE.exists():
        return []

    try:
        with DATA_FILE.open("r", encoding="utf-8") as file:
            products_data = json.load(file)

        if not isinstance(products_data, list):
            return []

        products = []

        for item in products_data:
            try:
                products.append(SkincareProduct.model_validate(item))
            except Exception:
                # Lewati data produk yang tidak sesuai struktur
                continue

        return products

    except (json.JSONDecodeError, OSError):
        return []


def get_product_recommendations(
    recommendations: list[dict],
    skin_type: str | None = None,
    limit: int = 6,
) -> list[dict]:
    """
    Mencocokkan produk dengan bahan aktif dan kondisi kulit
    berdasarkan rekomendasi hasil analisis Skinova AI.
    """

    products = load_skincare_products()

    if not products or not recommendations:
        return []

    # Mengumpulkan bahan aktif dan kondisi kulit dari hasil analisis
    recommended_ingredients = set()
    detected_conditions = set()

    for recommendation in recommendations:
        condition = normalize_text(recommendation.get("title", ""))

        if condition:
            detected_conditions.add(condition)

        for ingredient in recommendation.get("ingredients", []):
            recommended_ingredients.add(normalize_text(ingredient))

    normalized_skin_type = (
        normalize_text(skin_type) if skin_type else None
    )

    matched_products = []

    for product in products:
        if not product.is_active:
            continue

        product_ingredients = {
            normalize_text(ingredient)
            for ingredient in product.ingredients
        }

        product_conditions = {
            normalize_text(condition)
            for condition in product.suitable_conditions
        }

        product_skin_types = {
            normalize_text(value)
            for value in product.skin_types
        }

        # Produk harus memiliki setidaknya satu bahan aktif relevan
        matched_ingredients = (
            recommended_ingredients & product_ingredients
        )

        if not matched_ingredients:
            continue

        # Hitung kecocokan kondisi kulit
        matched_conditions = detected_conditions & product_conditions

        # Jika jenis kulit diketahui, utamakan produk yang sesuai
        skin_type_match = (
            normalized_skin_type is None
            or normalized_skin_type in product_skin_types
            or "all" in product_skin_types
        )

        score = (
            len(matched_ingredients) * 2
            + len(matched_conditions) * 3
            + (2 if skin_type_match else 0)
        )

        product_data = product.model_dump()

        product_data["matching_ingredients"] = sorted(
            matched_ingredients
        )
        product_data["matching_conditions"] = sorted(
            matched_conditions
        )
        product_data["match_score"] = score

        matched_products.append(product_data)

    # Urutkan dari skor kecocokan tertinggi
    matched_products.sort(
        key=lambda item: item["match_score"],
        reverse=True,
    )

    return matched_products[:limit]
