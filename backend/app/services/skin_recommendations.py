RECOMMENDATIONS = {
    "acne": {
        "title": "Acne",
        "ingredients": ["Salicylic Acid", "Niacinamide"],
        "care_tips": [
            "Gunakan pembersih wajah yang lembut.",
            "Pilih produk non-comedogenic.",
            "Hindari memencet jerawat."
        ],
        "avoid": [
            "Eksfoliasi berlebihan.",
            "Produk yang memicu iritasi."
        ]
    },

    "blackheads": {
        "title": "Blackheads",
        "ingredients": ["Salicylic Acid", "Niacinamide"],
        "care_tips": [
            "Gunakan pembersih wajah secara teratur.",
            "Pilih produk non-comedogenic."
        ],
        "avoid": [
            "Memencet komedo secara paksa.",
            "Eksfoliasi berlebihan."
        ]
    },

    "dark spots": {
        "title": "Dark Spots",
        "ingredients": ["Niacinamide", "Vitamin C"],
        "care_tips": [
            "Gunakan sunscreen minimal SPF 30.",
            "Lindungi kulit dari paparan sinar matahari."
        ],
        "avoid": [
            "Paparan sinar matahari tanpa perlindungan."
        ]
    },

    "skin redness": {
        "title": "Skin Redness",
        "ingredients": ["Centella Asiatica", "Panthenol"],
        "care_tips": [
            "Gunakan skincare yang lembut.",
            "Gunakan pelembap untuk menjaga skin barrier.",
            "Gunakan sunscreen broad-spectrum minimal SPF 30.",
            "Kurangi paparan sinar matahari langsung."
        ],
        "avoid": [
            "Produk yang memicu iritasi.",
            "Eksfoliasi berlebihan.",
            "Menggosok wajah terlalu keras."
        ]
    },

    "wrinkles": {
        "title": "Wrinkles",
        "ingredients": ["Retinol", "Peptides"],
        "care_tips": [
            "Gunakan pelembap secara rutin.",
            "Gunakan sunscreen minimal SPF 30."
        ],
        "avoid": [
            "Paparan sinar matahari tanpa perlindungan.",
            "Penggunaan bahan aktif berlebihan."
        ]
    }
}


# Aturan pemeriksaan kombinasi kandungan skincare
INGREDIENT_INTERACTIONS = [
    {
        "ingredients": ["salicylic acid", "retinol"],
        "level": "caution",
        "title": "Perhatian: Salicylic Acid dan Retinol",
        "message": (
            "Kombinasi ini dapat meningkatkan risiko kulit kering, "
            "kemerahan, dan iritasi. Pertimbangkan penggunaan "
            "pada waktu atau hari yang berbeda, terutama jika "
            "kulit sensitif."
        )
    },
    {
        "ingredients": ["tretinoin", "benzoyl peroxide"],
        "level": "interaction",
        "title": "Interaksi: Tretinoin dan Benzoyl Peroxide",
        "message": (
            "Tretinoin konvensional dapat teroksidasi oleh "
            "Benzoyl Peroxide sehingga efektivitasnya berkurang. "
            "Pertimbangkan pemisahan waktu penggunaan dan "
            "ikuti petunjuk dokter atau apoteker. "
            "Interaksi ini bergantung pada formulasi."
        )
    }
]


def get_ingredient_warnings(recommendations):
    """
    Memeriksa kombinasi kandungan dari seluruh kondisi
    kulit yang terdeteksi.
    """

    detected_ingredients = set()

    for recommendation in recommendations:
        for ingredient in recommendation.get("ingredients", []):
            detected_ingredients.add(
                ingredient.lower().strip()
            )

    warnings = []

    for rule in INGREDIENT_INTERACTIONS:
        required_ingredients = set(rule["ingredients"])

        if required_ingredients.issubset(detected_ingredients):
            warnings.append({
                "level": rule["level"],
                "title": rule["title"],
                "ingredients": rule["ingredients"],
                "message": rule["message"]
            })

    return warnings



def get_skin_recommendations(detections):
    recommendations = {}

    for detection in detections:
        class_name = (
            detection["class_name"]
            .lower()
            .strip()
            .replace("_", " ")
            .replace("-", " ")
        )

        if class_name in RECOMMENDATIONS:
            if class_name not in recommendations:
                recommendations[class_name] = {
                    **RECOMMENDATIONS[class_name],
                    "detected_count": 0
                }

            recommendations[class_name]["detected_count"] += 1

    return list(recommendations.values())