
INGREDIENT_ALIASES = {
    "Salicylic Acid": ["salicylic acid", "bha"],
    "Niacinamide": ["niacinamide"],
    "Vitamin C": ["vitamin c", "ascorbic acid"],
    "Retinol": ["retinol"],
    "Centella Asiatica": ["centella asiatica", "cica"],
    "Panthenol": ["panthenol", "pro-vitamin b5", "provitamin b5"],
    "Peptides": ["peptide", "peptides"],
}

SKIN_TYPE_LABELS = {
    "oily": "Berminyak",
    "dry": "Kering",
    "combination": "Kombinasi",
    "sensitive": "Sensitif",
    "normal": "Normal",
    "unknown": "Belum mengetahui",
}

HABIT_GUIDANCE = {
    "kurang_tidur": (
        "Kamu memilih kebiasaan kurang tidur. Usahakan menjaga jadwal "
        "tidur yang teratur untuk mendukung kesehatan tubuh dan kulit."
    ),
    "stres": (
        "Kamu memilih sering mengalami stres. Perhatikan pengelolaan stres "
        "dan pertahankan rutinitas perawatan kulit yang konsisten."
    ),
    "paparan_matahari": (
        "Kamu memilih sering terpapar matahari. Pertimbangkan penggunaan "
        "sunscreen broad-spectrum SPF 30 atau lebih dan aplikasikan ulang "
        "sesuai kebutuhan."
    ),
    "makanan_tinggi_gula": (
        "Kamu memilih sering mengonsumsi makanan tinggi gula. Pertahankan "
        "pola makan seimbang; jawaban ini tidak membuktikan penyebab kondisi kulit."
    ),
    "makanan_tinggi_lemak": (
        "Kamu memilih sering mengonsumsi makanan tinggi lemak. Perhatikan "
        "keseimbangan pola makan; jawaban ini tidak membuktikan penyebab kondisi kulit."
    ),
    "kurang_minum_air": (
        "Kamu memilih kurang minum air. Usahakan memenuhi kebutuhan cairan "
        "harian sesuai aktivitas dan kondisi tubuh."
    ),
}


def build_questionnaire_context(questionnaire: dict) -> dict:
    skin_type = str(questionnaire.get("skin_type", "unknown")).lower()

    if skin_type not in SKIN_TYPE_LABELS:
        skin_type = "unknown"

    habits = questionnaire.get("habits", [])
    if not isinstance(habits, list):
        habits = []

    habits = [
        str(habit)
        for habit in habits
        if isinstance(habit, str) and habit in HABIT_GUIDANCE
    ]

    current_products = str(
        questionnaire.get("current_products", "")
    ).strip()

    products_lower = current_products.lower()

    existing_ingredients = [
        ingredient
        for ingredient, aliases in INGREDIENT_ALIASES.items()
        if any(alias in products_lower for alias in aliases)
    ]

    notes = []

    if skin_type == "sensitive":
        notes.append(
            "Karena kamu memilih jenis kulit sensitif, prioritaskan produk "
            "yang lembut, lakukan patch test, dan perkenalkan bahan aktif "
            "secara bertahap."
        )
    elif skin_type == "dry":
        notes.append(
            "Untuk kulit kering, prioritaskan pelembap dan produk yang "
            "mendukung skin barrier."
        )
    elif skin_type == "oily":
        notes.append(
            "Untuk kulit berminyak, pertimbangkan produk ringan dan "
            "non-comedogenic sesuai kebutuhan kulit."
        )
    elif skin_type == "combination":
        notes.append(
            "Untuk kulit kombinasi, sesuaikan penggunaan produk dengan "
            "kebutuhan area wajah yang berbeda."
        )

    for habit in habits:
        notes.append(HABIT_GUIDANCE[habit])

    if existing_ingredients:
        notes.append(
            "Beberapa kandungan yang kamu sebutkan sudah terdapat dalam "
            "produk yang sedang digunakan: "
            + ", ".join(existing_ingredients)
            + ". Periksa komposisi produk sebelum menambahkan produk baru."
        )

    if current_products and not existing_ingredients:
        notes.append(
            "Periksa daftar komposisi produk yang sedang digunakan sebelum "
            "menambahkan bahan aktif baru."
        )

    if not notes:
        notes.append(
            "Pertahankan rutinitas perawatan kulit yang sesuai dengan "
            "kebutuhan kulitmu dan perhatikan reaksi kulit terhadap produk."
        )

    return {
        "skin_type": SKIN_TYPE_LABELS[skin_type],
        "habits": habits,
        "existing_ingredients": existing_ingredients,
        "notes": notes,
    }
