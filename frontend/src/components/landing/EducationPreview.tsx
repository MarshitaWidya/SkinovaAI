const articles = [
  {
    category: "Skin Concerns",
    readTime: "5 min read",
    title: "Mengenal Lima Permasalahan Kulit yang Umum",
    description:
      "Panduan komprehensif mengidentifikasi perbedaan jerawat papula, komedo tertutup, dan hiperpigmentasi pasca inflamasi.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCosKTGqr0wnA6IuC5vFvoXrv8PGJxf0SIlzMBkLVY7d7nUM_GDNbCu5e_M_t5xXD68rUwaO3Mu3yYfWBM0rJ5V7Xyu0Y0Ge-O0pF89Ym_l0WwJDZop_ts--e7Plx_UzrhCinaGr7_zCzn7yPVxExLywH86lOajNPqeB7Ys8I6iw-eY_83t5fgr8ggtjD8Wzw3qpZQZ8NS4yx_-6yRedpgTVQnWun_eFJxkg8c_k7iw",
  },
  {
    category: "Ingredients",
    readTime: "7 min read",
    title: "Memahami Kandungan Aktif dalam Skincare",
    description:
      "Eksplorasi fungsi Niacinamide, Salicylic Acid, dan Retinoid: dosis ideal dan cara kerja biologis pada stratum corneum.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBn1kFRBjuF0ymPZRfdRKj83wvq358IIA68gCzriNJ-Jer37myCMaOI08lwRf9jsp0R_VzMH6Kocjz__bX6hSrGy-iKREPW5BJbXECS2LDr6DIUnbztNtiU_k0kO6zCaWValFfdUXZdDnqzRYlM-2LY-t6b2hKQTYn96lfNBTfX7EJoPIK4-RZYVfPBgWrh3pHSzODr2LHtRhYMsBbz5f_6M5CzAu6j3HrdwoGKe6ED",
  },
  {
    category: "Skin Health",
    readTime: "4 min read",
    title: "Cara Menjaga Skin Barrier Tetap Utuh",
    description:
      "Tanda-tanda kerusakan barrier lipid, hidrasi mendalam dengan Ceramide, dan perlindungan dari transepidermal water loss.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6yVhBwxaYe5TVZY-os30X3tPVAhJjyq36fB8mMEhfKN-wtBxLNN7HurOvLQ3EE-wK_ZjtQkLN9ChTTKq-kZKFYCCkzxg_uLKieRNBRCrBboRo1x0U6DqgUuKTdRqPLQVfcomMMfl7jesiszLSWOCZvufk8u-LRLhG9-BXJTc9VEgFpVwxf4ePRNbMyAr1trVgWOmk9yK1BEVmMms5aPtA5s_ACRcZlVkHGSZscUnW",
  },
  {
    category: "Routine",
    readTime: "6 min read",
    title: "Pentingnya Sunscreen dalam Rutinitas",
    description:
      "Perlindungan spektrum luas UVA/UVB dan peran penting tabir surya dalam pencegahan penuaan dini serta dark spots.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2-AHUJpk87hSwCUrfSuq3KAGelJaCPQkcPWMRPxA6W0sEzKsAkwv-4V__Jmlx9frvLGy3Dkgj6AIzME1slDs-GDP5EUVvBDhpCXJSsAu-A40av-TSC6bP5Tp-IRbMk3zx1QXwEbJ0IuTNXSy4XX9AVAQLnFl5DkppUVgGcF6EvSG-kdd0RnSzZic0I5g2o5ziqPaV1fLQ3R833uLrNw48nZy0j7FGl3q1svoqOEC5",
  },
];

export default function DermatologyKnowledge() {
  return (
    <section
      id="edukasi"
      className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#566251]">
              Dermatology Knowledge
            </span>

            <h2 className="font-['Newsreader'] text-3xl leading-tight text-[#1A1C18] sm:text-4xl">
              Edukasi Dermatologis Pilihan
            </h2>
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-[#7A8075]">
            4 Topik Pilihan
          </span>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* Article Image */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#EEEFE8]">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Article Content */}
                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between gap-2 text-xs text-[#777D73]">
                    <span className="rounded bg-[#EEEFE8] px-2 py-1 font-medium text-[#444841]">
                      {article.category}
                    </span>

                    <span className="whitespace-nowrap">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-['Newsreader'] text-xl leading-snug text-[#1A1C18]">
                    {article.title}
                  </h3>

                  <p className="line-clamp-3 text-sm leading-6 text-[#666D63]">
                    {article.description}
                  </p>
                </div>
              </div>

              {/* Non-clickable article indicator */}
              <div className="px-6 pb-6 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#566251]">
                  Artikel Pilihan
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
