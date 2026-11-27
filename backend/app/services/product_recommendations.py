
import json
from pathlib import Path

from app.models.product import SkincareProduct


# Lokasi file katalog produk
DATA_FILE = (
    Path(__file__).resolve().parents[1]
    / "data"
    / "skincare_products.json"
)


def normalize_text(value: str) -> str:
    """Menyeragamkan teks agar pencocokan lebih konsisten."""
    return (
        value.lower()
        .strip()
        .replace("_", " ")
        .replace("-", " ")
    )


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
                products.append(
                    SkincareProduct.model_validate(item)
                )
            except Exception:
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
    Merekomendasikan produk berdasarkan:
    1. Kondisi kulit yang terdeteksi.
    2. Kecocokan kandungan skincare.
    3. Jenis kulit dari kuesioner.

    Memprioritaskan agar setiap kondisi kulit
    mendapatkan minimal satu rekomendasi produk
    jika produk yang sesuai tersedia di katalog.
    """

    products = load_skincare_products()

    if not products or not recommendations:
        return []

    # ==========================================
    # 1. KUMPULKAN KONDISI DAN KANDUNGAN
    # ==========================================

    detected_conditions = set()
    recommended_ingredients = set()

    for recommendation in recommendations:
        condition = normalize_text(
            recommendation.get("title", "")
        )

        if condition:
            detected_conditions.add(condition)

        for ingredient in recommendation.get("ingredients", []):
            normalized_ingredient = normalize_text(ingredient)

            if normalized_ingredient:
                recommended_ingredients.add(
                    normalized_ingredient
                )

    # ==========================================
    # 2. NORMALISASI JENIS KULIT
    # ==========================================

    normalized_skin_type = (
        normalize_text(skin_type)
        if skin_type
        else "unknown"
    )

    known_skin_types = {
        "oily",
        "dry",
        "combination",
        "sensitive",
        "normal",
    }

    has_known_skin_type = (
        normalized_skin_type in known_skin_types
    )

    # ==========================================
    # 3. HITUNG KECocOKAN PRODUK
    # ==========================================

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

        # Kecocokan kandungan
        matched_ingredients = (
            recommended_ingredients & product_ingredients
        )

        # Kecocokan kondisi kulit
        matched_conditions = (
            detected_conditions & product_conditions
        )

        # Produk harus cocok dengan kondisi
        # atau setidaknya kandungan yang direkomendasikan.
        if not matched_conditions and not matched_ingredients:
            continue

        # ======================================
        # 4. PERIKSA JENIS KULIT
        # ======================================

        skin_type_match = (
            not has_known_skin_type
            or normalized_skin_type in product_skin_types
            or "all" in product_skin_types
        )

        # Jika jenis kulit diketahui dan produk
        # tidak sesuai, jangan rekomendasikan.
        if not skin_type_match:
            continue

        # ======================================
        # 5. HITUNG SKOR
        # ======================================

        score = (
            len(matched_conditions) * 10
            + len(matched_ingredients) * 2
            + (3 if has_known_skin_type and skin_type_match else 0)
        )

        product_data = product.model_dump()

        product_data["matching_ingredients"] = sorted(
            [
                ingredient
                for ingredient in product.ingredients
                if normalize_text(ingredient) in matched_ingredients
            ]
        )

        product_data["matching_conditions"] = sorted(
            matched_conditions
        )

        product_data["match_score"] = score

        matched_products.append(product_data)

    # ==========================================
    # 6. URUTKAN PRODUK BERDASARKAN SKOR
    # ==========================================

    matched_products.sort(
        key=lambda item: (
            item["match_score"],
            len(item["matching_conditions"]),
            len(item["matching_ingredients"]),
        ),
        reverse=True,
    )

    # ==========================================
    # 7. PRIORITASKAN SETIAP KONDISI KULIT
    # ==========================================

    selected_products = []
    selected_ids = set()

    # Ambil minimal satu produk terbaik
    # untuk setiap kondisi yang terdeteksi.
    for condition in sorted(detected_conditions):

        for product in matched_products:

            if product["id"] in selected_ids:
                continue

            if condition in product["matching_conditions"]:
                selected_products.append(product)
                selected_ids.add(product["id"])
                break

    # ==========================================
    # 8. TAMBAHKAN PRODUK TERBAIK LAINNYA
    # ==========================================

    for product in matched_products:

        if product["id"] in selected_ids:
            continue

        selected_products.append(product)
        selected_ids.add(product["id"])

    # Jika kondisi yang terdeteksi lebih banyak
    # daripada limit, prioritaskan cakupan kondisi.
    final_limit = max(limit, len(detected_conditions))

    return selected_products[:final_limit]
