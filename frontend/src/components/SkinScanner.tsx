"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Upload,
  VideoOff,
  LoaderCircle,
  XCircle,
  ShoppingBag,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  validateSkinImage,
  analyzeSkinImage,
  type ValidationResult,
  type SkinAnalysis,
  type SkinRecommendation,
  type ProductRecommendation,
  type QuestionnaireAnswers,
} from "@/lib/api";

type Mode = "camera" | "upload";

function RecommendationCard({
  recommendation,
}: {
  recommendation: SkinRecommendation;
}) {
  return (
    <div className="rounded-2xl border border-[#E6E8DF] bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F4F4ED]">
          <Sparkles className="text-[#566251]" size={21} />
        </div>

        <div>
          <h4 className="font-semibold capitalize text-[#1A1C18]">
            {recommendation.title}
          </h4>

          <p className="mt-1 text-xs text-[#858B80]">
            {recommendation.detected_count} objek terdeteksi
          </p>

          {recommendation.description && (
            <p className="mt-2 text-sm leading-6 text-[#6D7269]">
              {recommendation.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h5 className="text-sm font-semibold text-[#1A1C18]">
          Kandungan skincare yang disarankan
        </h5>

        <div className="mt-3 flex flex-wrap gap-2">
          {recommendation.ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className="rounded-full border border-[#DDE3D8] bg-[#F4F4ED] px-3 py-2 text-xs font-medium text-[#566251]"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h5 className="text-sm font-semibold text-[#1A1C18]">
          Perawatan yang disarankan
        </h5>

        <ul className="mt-3 space-y-2">
          {recommendation.care_tips.map((tip, index) => (
            <li
              key={index}
              className="flex gap-2 text-sm leading-6 text-[#6D7269]"
            >
              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-[#788873]"
              />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border border-[#E8DCCB] bg-[#F8F3EC] p-4">
        <h5 className="text-sm font-semibold text-[#8C4E2F]">
          Hal yang perlu dihindari
        </h5>

        <ul className="mt-2 space-y-2">
          {recommendation.avoid.map((item, index) => (
            <li
              key={index}
              className="flex gap-2 text-sm leading-6 text-[#665D51]"
            >
              <ShieldAlert size={15} className="mt-1 shrink-0 text-[#8C4E2F]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: ProductRecommendation }) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-[#E6E8DF] bg-white transition duration-300 hover:border-[#A2AF9B]">
      {/* PRODUCT IMAGE */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#F4F4ED]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#A2AF9B]">
            <ShoppingBag size={42} strokeWidth={1.5} />
            <span className="text-xs font-medium text-[#858B80]">
              Gambar produk belum tersedia
            </span>
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full border border-[#E6E8DF] bg-white px-3 py-1 text-[10px] font-semibold text-[#566251]">
          {product.category}
        </span>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="p-4">
        <p className="text-xs font-semibold text-[#788873]">{product.brand}</p>

        <h4 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#1A1C18]">
          {product.name}
        </h4>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#6D7269]">
          {product.description}
        </p>

        {/* MATCHING INGREDIENTS */}
        {product.matching_ingredients.length > 0 && (
          <div className="mt-4">
            <p className="text-[11px] font-semibold text-[#444841]">
              Kandungan yang sesuai
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.matching_ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-full border border-[#DDE3D8] bg-[#F4F4ED] px-2.5 py-1 text-[10px] font-medium text-[#566251]"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* PRICE */}
        <div className="mt-4 border-t border-[#E6E8DF] pt-3">
          <p className="text-[11px] text-[#858B80]">Harga katalog</p>

          <p className="mt-1 text-base font-bold text-[#1A1C18]">
            {formattedPrice}
          </p>
        </div>

        {/* PRODUCT LINK */}
        {product.product_url ? (
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#566251] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#465342]"
          >
            Lihat Produk
            <ExternalLink size={14} />
          </a>
        ) : (
          <div className="mt-4 rounded-full bg-[#F4F4ED] px-4 py-2.5 text-center text-xs font-medium text-[#858B80]">
            Tautan produk belum tersedia
          </div>
        )}

        {product.marketplace && (
          <p className="mt-2 text-center text-[10px] text-[#858B80]">
            Tersedia di {product.marketplace}
          </p>
        )}
      </div>
    </div>
  );
}

function ProductCarousel({ products }: { products: ProductRecommendation[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    const container = carouselRef.current;

    if (!container) return;

    const firstCard = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 300;
    const gap = 16;

    container.scrollBy({
      left: direction === "right" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#C5C8BF] bg-[#F4F4ED] p-6 text-center">
        <ShoppingBag className="mx-auto mb-3 text-[#788873]" size={30} />
        <p className="text-sm font-semibold text-[#1A1C18]">
          Belum ada produk yang sesuai
        </p>
        <p className="mt-2 text-xs leading-5 text-[#6D7269]">
          Belum ditemukan produk dalam katalog yang cocok dengan rekomendasi
          kandungan dari hasil analisis.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between gap-3">
        {/* NAVIGATION */}
        {products.length > 3 && (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              aria-label="Produk sebelumnya"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDE3D8] text-[#566251] transition hover:bg-[#F4F4ED]"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              aria-label="Produk berikutnya"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDE3D8] text-[#566251] transition hover:bg-[#F4F4ED]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* CAROUSEL */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-3 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full flex-none snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkinScanner() {
  const [mode, setMode] = useState<Mode>("camera");
  const [streaming, setStreaming] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SkinAnalysis | null>(null);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState(
    "Posisikan wajah di tengah area kamera, lalu ambil foto.",
  );

  const [validating, setValidating] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  type AnalysisTab = "photo" | "questionnaire" | "results";

  const [activeTab, setActiveTab] = useState<AnalysisTab>("photo");

  const [questionnaire, setQuestionnaire] = useState<QuestionnaireAnswers>({
    habits: [],
    skin_type: "unknown",
    current_products: "",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function startCamera() {
    setMessage("Meminta izin kamera...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStreaming(true);
      setMessage(
        "Kamera aktif. Pastikan wajah terlihat jelas dan pencahayaan cukup.",
      );
    } catch {
      setStreaming(false);
      setMessage(
        "Kamera tidak dapat diakses. Izinkan akses kamera atau gunakan unggah foto.",
      );
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    streamRef.current = null;
    setStreaming(false);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  async function processImage(file: File) {
    if (!file.type.startsWith("image/")) {
      setMessage("File harus berupa gambar.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setMessage("Ukuran foto maksimal 8 MB.");
      return;
    }

    stopCamera();

    setPreview(null);
    setValidation(null);
    setAnalysis(null);
    setSelectedImage(null);
    setShowQuestionnaire(false);
    setFileName(file.name);
    setValidating(true);
    setAnalyzing(false);
    setMessage("Memeriksa kualitas foto...");

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(String(reader.result));
    };

    reader.readAsDataURL(file);

    try {
      // Tahap 1: Validasi kualitas gambar
      const result = await validateSkinImage(file);

      setValidation(result);

      if (!result.valid) {
        setMessage("Foto belum memenuhi persyaratan. Silakan perbaiki foto.");
        return;
      }

      // Simpan foto yang sudah lolos validasi
      setSelectedImage(file);

      // Aktifkan kuesioner
      setShowQuestionnaire(true);

      // Pindah ke tab kuesioner
      setActiveTab("questionnaire");

      setMessage("Foto valid. Silakan lengkapi kuesioner sebelum analisis.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Tidak dapat menghubungi server.",
      );
    } finally {
      setValidating(false);
      setAnalyzing(false);
    }
  }

  async function submitQuestionnaire() {
    if (!selectedImage) {
      setMessage("Silakan ambil atau unggah foto terlebih dahulu.");
      return;
    }

    setAnalyzing(true);
    setMessage("Skinova AI sedang menganalisis kondisi kulit...");
    setActiveTab("results");

    try {
      const analysisResult = await analyzeSkinImage(
        selectedImage,
        questionnaire,
      );

      if (!analysisResult.success || !analysisResult.analysis) {
        setMessage(
          analysisResult.message || "Analisis kulit belum berhasil dilakukan.",
        );
        setActiveTab("questionnaire");
        return;
      }

      setAnalysis(analysisResult.analysis);
      setShowQuestionnaire(false);
      setMessage("Analisis kulit berhasil diselesaikan.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Tidak dapat menghubungi server.",
      );
    } finally {
      setAnalyzing(false);
    }
  }

  async function capture() {
    const video = videoRef.current;

    if (!video || !video.videoWidth) {
      setMessage("Kamera belum siap. Coba beberapa saat lagi.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          setMessage("Gagal mengambil foto dari kamera.");
          return;
        }

        const file = new File([blob], "camera-capture.jpg", {
          type: "image/jpeg",
        });

        await processImage(file);
      },
      "image/jpeg",
      0.92,
    );
  }

  function onFile(file?: File) {
    if (!file) return;
    processImage(file);
  }

  function reset() {
    setPreview(null);
    setFileName("");
    setValidation(null);
    setAnalysis(null);
    setValidating(false);
    setAnalyzing(false);
    setSelectedImage(null);
    setShowQuestionnaire(false);
    setActiveTab("photo");

    setQuestionnaire({
      habits: [],
      skin_type: "unknown",
      current_products: "",
    });

    setMessage("Posisikan wajah di tengah area kamera, lalu ambil foto.");

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  function changeMode(newMode: Mode) {
    stopCamera();
    reset();
    setMode(newMode);
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  const checks = [
    {
      name: "Resolusi gambar",
      data: validation?.checks?.resolution,
      detail: validation?.checks?.resolution
        ? `${validation.checks.resolution.width} × ${validation.checks.resolution.height} px`
        : "",
    },
    {
      name: "Deteksi wajah",
      data: validation?.checks?.face_detection,
      detail: validation?.checks?.face_detection
        ? `${validation.checks.face_detection.face_count} wajah terdeteksi`
        : "",
    },
    {
      name: "Pencahayaan",
      data: validation?.checks?.lighting,
      detail: validation?.checks?.lighting
        ? `Nilai: ${validation.checks.lighting.brightness}`
        : "",
    },
    {
      name: "Ketajaman foto",
      data: validation?.checks?.sharpness,
      detail: validation?.checks?.sharpness
        ? `Skor: ${validation.checks.sharpness.score}`
        : "",
    },
  ];

  return (
    <section
      id="scanner"
      className="scroll-mt-24 min-h-screen bg-[#FAFAF3] pb-24 pt-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[.2em] text-violet">
            MULAI DARI SINI
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Siap mengenal kondisi kulitmu?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Ambil foto wajah secara langsung atau pilih foto dari galeri.
            Gunakan pencahayaan alami dan pastikan wajah terlihat utuh.
          </p>
        </div>

        <div
          className={`mx-auto grid max-w-6xl items-start gap-6 ${
            activeTab === "results"
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-[1.55fr_0.85fr]"
          }`}
        >
          <div className="rounded-[28px] border border-[#E6E8DF] bg-white p-4 shadow-[0_12px_45px_rgba(50,60,45,0.06)] sm:p-7">
            {/* TAB NAVIGATION */}
            <div className="mb-8 grid grid-cols-3 gap-2 rounded-2xl bg-[#F4F4ED] p-2">
              {[
                { id: "photo", number: "01", label: "Scan Wajah" },
                { id: "questionnaire", number: "02", label: "Kuesioner" },
                { id: "results", number: "03", label: "Hasil Analisis" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const isCompleted =
                  (tab.id === "photo" && Boolean(validation?.valid)) ||
                  (tab.id === "questionnaire" && Boolean(analysis));

                const isDisabled =
                  (tab.id === "questionnaire" &&
                    (!showQuestionnaire || !validation?.valid)) ||
                  (tab.id === "results" && !analysis && !analyzing);

                return (
                  <button
                    key={tab.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => setActiveTab(tab.id as AnalysisTab)}
                    className={`flex min-w-0 flex-row items-center justify-center gap-2 rounded-xl px-2 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-[#566251] text-white shadow-sm"
                        : "text-[#858B80] hover:bg-white hover:text-[#566251]"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    <span className="text-[10px] font-bold tracking-[0.12em]">
                      {isCompleted && !isActive ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        tab.number
                      )}
                    </span>

                    <span className="text-[10px] font-semibold sm:text-xs">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeTab === "photo" && (
              <>
                {/* SCANNER */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-serif text-2xl font-medium text-[#1A1C18]">
                      Mulai pemindaian
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#858B80]">
                      Ambil foto wajah atau pilih gambar dari perangkatmu.
                    </p>
                  </div>

                  <span className="rounded-full border border-[#DDE3D8] bg-[#F4F4ED] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#566251]">
                    IMAGE VALIDATION
                  </span>
                </div>

                {/* MODE */}
                <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-[#F4F4ED] p-1.5">
                  <button
                    onClick={() => changeMode("camera")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                      mode === "camera"
                        ? "bg-white text-[#566251] shadow-sm"
                        : "text-[#858B80] hover:bg-white/70 hover:text-[#566251]"
                    }`}
                  >
                    <Camera size={16} />
                    Kamera
                  </button>

                  <button
                    onClick={() => changeMode("upload")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                      mode === "upload"
                        ? "bg-white text-[#566251] shadow-sm"
                        : "text-[#858B80] hover:bg-white/70 hover:text-[#566251]"
                    }`}
                  >
                    <ImagePlus size={16} />
                    Upload foto
                  </button>
                </div>

                {/* IMAGE PREVIEW */}
                <div className="relative grid min-h-[320px] place-items-center overflow-hidden rounded-[24px] border border-[#DDE3D8] bg-[#E9EDE5] sm:min-h-[390px]">
                  {preview ? (
                    <div className="absolute inset-0">
                      <img
                        src={preview}
                        alt="Preview foto wajah"
                        className="h-full w-full object-contain"
                      />

                      {analysis && (
                        <svg
                          className="pointer-events-none absolute inset-0 h-full w-full"
                          viewBox={`0 0 ${analysis.image_width} ${analysis.image_height}`}
                          preserveAspectRatio="xMidYMid meet"
                        >
                          {analysis.detections.map((detection, index) => {
                            const box = detection.bounding_box;

                            return (
                              <g key={index}>
                                <rect
                                  x={box.x1}
                                  y={box.y1}
                                  width={box.x2 - box.x1}
                                  height={box.y2 - box.y1}
                                  fill="rgba(124, 58, 237, 0.12)"
                                  stroke="#a78bfa"
                                  strokeWidth="3"
                                  vectorEffect="non-scaling-stroke"
                                />
                              </g>
                            );
                          })}
                        </svg>
                      )}
                    </div>
                  ) : mode === "camera" ? (
                    <>
                      <video
                        ref={videoRef}
                        muted
                        playsInline
                        className={`absolute inset-0 h-full w-full object-cover ${
                          streaming ? "scale-x-[-1]" : "hidden"
                        }`}
                      />

                      {!streaming && (
                        <div className="px-8 text-center text-[#566251]">
                          <Camera
                            className="mx-auto mb-3 text-[#788873]"
                            size={36}
                          />

                          <p className="font-semibold">
                            Kamera belum diaktifkan
                          </p>

                          <p className="mt-2 text-xs leading-5 text-[#858B80]">
                            Aktifkan kamera untuk mengambil foto wajah secara
                            langsung.
                          </p>
                        </div>
                      )}

                      {streaming && (
                        <div className="pointer-events-none absolute inset-[12%] rounded-[45%] border border-dashed border-white/80 shadow-[0_0_0_999px_rgba(35,45,32,0.12)]" />
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="m-5 flex min-h-[250px] w-[calc(100%-2.5rem)] flex-col items-center justify-center rounded-2xl border border-dashed border-[#A2AF9B] bg-white/50 px-6 text-[#566251] transition hover:bg-white"
                    >
                      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#E8EDE5]">
                        <Upload size={25} className="text-[#566251]" />
                      </div>

                      <span className="text-sm font-semibold">
                        Pilih foto dari perangkat
                      </span>

                      <span className="mt-2 text-xs text-[#858B80]">
                        JPG, PNG, WEBP · Maksimal 8 MB
                      </span>
                    </button>
                  )}
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0])}
                />

                {/* BUTTONS */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {preview ? (
                    <button
                      onClick={reset}
                      disabled={validating}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#DDE3D8] bg-white px-5 py-3 text-sm font-semibold text-[#566251] transition hover:bg-[#F4F4ED] disabled:opacity-50"
                    >
                      <RefreshCw size={16} />
                      Ambil ulang
                    </button>
                  ) : mode === "camera" ? (
                    !streaming ? (
                      <button
                        onClick={startCamera}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#566251] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#414C3D] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Camera size={16} />
                        Aktifkan kamera
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={capture}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#566251] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#414C3D] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <CheckCircle2 size={16} />
                          Ambil foto
                        </button>

                        <button
                          onClick={stopCamera}
                          className="flex items-center justify-center rounded-full border border-[#DDE3D8] bg-white px-4 py-3 text-[#566251] transition hover:bg-[#F4F4ED]"
                        >
                          <VideoOff size={16} />
                        </button>
                      </>
                    )
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#566251] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#414C3D] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Upload size={16} />
                      Pilih gambar
                    </button>
                  )}
                </div>

                {/* STATUS */}
                <div
                  aria-live="polite"
                  className="mt-4 text-center text-xs leading-5 text-slate-500"
                >
                  {validating ? (
                    <span className="inline-flex items-center gap-2 text-[#566251]">
                      <LoaderCircle size={15} className="animate-spin" />
                      Sedang memeriksa kualitas foto...
                    </span>
                  ) : (
                    message
                  )}
                </div>

                {fileName && (
                  <p className="mt-1 truncate text-center text-[11px] text-slate-400">
                    {fileName}
                  </p>
                )}

                {/* VALIDATION RESULT */}
                {validation && !validating && (
                  <div className="mt-5 rounded-2xl border border-[#E6E8DF] bg-[#FAFAF3] p-5">
                    <div className="flex items-center gap-2">
                      {validation.valid ? (
                        <CheckCircle2 className="text-green-600" size={20} />
                      ) : (
                        <XCircle className="text-red-500" size={20} />
                      )}

                      <h3 className="text-sm font-semibold text-ink">
                        {validation.valid
                          ? "Foto berhasil divalidasi"
                          : "Foto belum memenuhi syarat"}
                      </h3>
                    </div>

                    {/* CHECK DETAILS */}
                    <div className="mt-4 space-y-3">
                      {checks.map(
                        (item) =>
                          item.data && (
                            <div
                              key={item.name}
                              className="flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                {item.data.passed ? (
                                  <CheckCircle2
                                    size={15}
                                    className="text-green-600"
                                  />
                                ) : (
                                  <XCircle size={15} className="text-red-500" />
                                )}

                                <span className="font-medium text-slate-700">
                                  {item.name}
                                </span>
                              </div>

                              <span className="text-right text-slate-500">
                                {item.detail}
                              </span>
                            </div>
                          ),
                      )}
                    </div>

                    {/* ERRORS */}
                    {validation.errors.length > 0 && (
                      <div className="mt-4 rounded-xl bg-red-50 p-3">
                        <p className="mb-2 text-xs font-semibold text-red-700">
                          Hal yang perlu diperbaiki:
                        </p>

                        {validation.errors.map((error, index) => (
                          <p
                            key={index}
                            className="mb-1 text-xs leading-5 text-red-600"
                          >
                            • {error}
                          </p>
                        ))}
                      </div>
                    )}

                    {validation.valid && (
                      <div className="mt-4 rounded-xl border border-[#DDE3D8] bg-[#E8EDE5] p-3">
                        <p className="text-xs leading-5 text-[#566251]">
                          Foto berhasil melewati pemeriksaan kualitas. Silakan
                          lengkapi kuesioner untuk melanjutkan ke analisis
                          kulit.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* QUESTIONNAIRE */}
            {activeTab === "questionnaire" &&
              showQuestionnaire &&
              validation?.valid && (
                <div className="mt-5 rounded-[28px] border border-[#E6E8DF] bg-white p-5 shadow-[0_12px_45px_rgba(50,60,45,0.04)] sm:p-8">
                  {/* KEBIASAAN */}
                  <div className="mb-9">
                    <div className="mb-4 flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8EDE5] text-xs font-bold text-[#566251]">
                        01
                      </span>

                      <div>
                        <h4 className="text-sm font-bold text-[#1A1C18] sm:text-base">
                          Bagaimana kebiasaanmu sehari-hari?
                        </h4>
                        <p className="mt-1 text-xs leading-5 text-[#858B80]">
                          Pilih semua kebiasaan yang sesuai dengan aktivitasmu.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        {
                          value: "kurang_tidur",
                          label: "Sering tidur larut malam atau kurang tidur",
                        },
                        {
                          value: "stres",
                          label: "Sering mengalami stres",
                        },
                        {
                          value: "paparan_matahari",
                          label: "Sering beraktivitas di bawah sinar matahari",
                        },
                        {
                          value: "makanan_tinggi_gula",
                          label: "Sering mengonsumsi makanan tinggi gula",
                        },
                        {
                          value: "makanan_tinggi_lemak",
                          label: "Sering mengonsumsi makanan tinggi lemak",
                        },
                        {
                          value: "kurang_minum_air",
                          label: "Kurang minum air putih",
                        },
                      ].map((habit) => {
                        const isChecked = questionnaire.habits.includes(
                          habit.value,
                        );

                        return (
                          <label
                            key={habit.value}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                              isChecked
                                ? "border-[#A2AF9B] bg-[#F0F3ED]"
                                : "border-[#E6E8DF] bg-white hover:border-[#A2AF9B] hover:bg-[#FAFAF3]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(event) => {
                                setQuestionnaire((previous) => ({
                                  ...previous,
                                  habits: event.target.checked
                                    ? [...previous.habits, habit.value]
                                    : previous.habits.filter(
                                        (item) => item !== habit.value,
                                      ),
                                }));
                              }}
                              className="h-4 w-4 shrink-0 accent-[#566251]"
                            />

                            <span className="text-xs font-medium leading-5 text-[#444841] sm:text-sm">
                              {habit.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* JENIS KULIT */}
                  <div className="mb-9">
                    <div className="mb-4 flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8EDE5] text-xs font-bold text-[#566251]">
                        02
                      </span>

                      <div>
                        <h4 className="text-sm font-bold text-[#1A1C18] sm:text-base">
                          Apa jenis kulitmu?
                        </h4>
                        <p className="mt-1 text-xs leading-5 text-[#858B80]">
                          Pilih jenis kulit yang paling menggambarkan kondisi
                          kulitmu.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        value={questionnaire.skin_type}
                        onChange={(event) =>
                          setQuestionnaire((previous) => ({
                            ...previous,
                            skin_type: event.target.value,
                          }))
                        }
                        className="w-full appearance-none rounded-2xl border border-[#E6E8DF] bg-[#FAFAF3] px-4 py-4 pr-12 text-sm font-medium text-[#444841] outline-none transition focus:border-[#A2AF9B] focus:ring-2 focus:ring-[#A2AF9B]/20"
                      >
                        <option value="unknown">
                          Belum mengetahui jenis kulit
                        </option>
                        <option value="oily">Berminyak (Oily)</option>
                        <option value="dry">Kering (Dry)</option>
                        <option value="combination">
                          Kombinasi (Combination)
                        </option>
                        <option value="sensitive">Sensitif (Sensitive)</option>
                        <option value="normal">Normal</option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#788873]">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>

                  {/* PRODUK SKINCARE */}
                  <div className="mb-8">
                    <div className="mb-4 flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8EDE5] text-xs font-bold text-[#566251]">
                        03
                      </span>

                      <div>
                        <h4 className="text-sm font-bold text-[#1A1C18] sm:text-base">
                          Produk skincare apa yang sedang kamu gunakan?
                        </h4>
                        <p className="mt-1 text-xs leading-5 text-[#858B80]">
                          Tuliskan nama produk atau kandungan skincare yang
                          sedang kamu gunakan saat ini.
                        </p>
                      </div>
                    </div>

                    <textarea
                      value={questionnaire.current_products}
                      onChange={(event) =>
                        setQuestionnaire((previous) => ({
                          ...previous,
                          current_products: event.target.value,
                        }))
                      }
                      rows={4}
                      placeholder="Contoh: Facial wash, moisturizer, Vitamin C serum, sunscreen SPF 50..."
                      className="w-full resize-none rounded-2xl border border-[#E6E8DF] bg-[#FAFAF3] px-4 py-4 text-sm leading-6 text-[#444841] outline-none transition placeholder:text-[#A2A69D] focus:border-[#A2AF9B] focus:ring-2 focus:ring-[#A2AF9B]/20"
                    />

                    <p className="mt-2 text-[11px] leading-5 text-[#858B80]">
                      Jika belum menggunakan skincare, kamu dapat membiarkan
                      bagian ini kosong.
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col gap-3 border-t border-[#E6E8DF] pt-6 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setActiveTab("photo")}
                      className="flex items-center justify-center gap-2 rounded-full border border-[#DDE3D8] bg-white px-6 py-3.5 text-sm font-semibold text-[#566251] transition hover:bg-[#F4F4ED]"
                    >
                      <ArrowLeft size={16} />
                      Kembali ke Foto
                    </button>

                    <button
                      type="button"
                      onClick={submitQuestionnaire}
                      disabled={analyzing}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#566251] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#465342] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {analyzing ? (
                        <>
                          <LoaderCircle size={17} className="animate-spin" />
                          Sedang Menganalisis...
                        </>
                      ) : (
                        <>
                          <Sparkles size={17} />
                          Mulai Analisis Kulit
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-5 text-center text-[11px] leading-5 text-[#858B80]">
                    Informasi yang diberikan digunakan sebagai konteks
                    rekomendasi perawatan dan bukan untuk menentukan diagnosis
                    medis.
                  </p>
                </div>
              )}

            {/* ANALYSIS RESULT - LOADING */}
            {activeTab === "results" && analyzing && (
              <div className="mt-6 rounded-[24px] border border-[#E6E8DF] bg-white px-6 py-12 sm:px-10">
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                  {/* LOADING ICON */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F3ED]">
                    <LoaderCircle
                      className="animate-spin text-[#566251]"
                      size={30}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* LABEL */}
                  <span className="mb-3 text-[10px] font-bold tracking-[0.2em] text-[#788873]">
                    SKIN ANALYSIS IN PROGRESS
                  </span>

                  {/* TITLE */}
                  <h3 className="font-serif text-2xl font-medium text-[#1A1C18] sm:text-3xl">
                    Sedang mengenali
                    <br />
                    <span className="italic text-[#788873]">
                      kondisi kulitmu.
                    </span>
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-4 max-w-sm text-sm leading-7 text-[#6D7269]">
                    Skinova AI sedang memproses gambar wajah dan menganalisis
                    karakteristik kulitmu. Mohon tunggu sebentar hingga hasil
                    analisis selesai.
                  </p>

                  {/* PROGRESS DECORATION */}
                  <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-[#E8E9E2]">
                    <div className="h-full w-1/3 animate-pulse rounded-full bg-[#A2AF9B]" />
                  </div>

                  <p className="mt-3 text-[10px] font-semibold tracking-[0.12em] text-[#858B80]">
                    PROCESSING YOUR SKIN DATA
                  </p>
                </div>
              </div>
            )}

            {/* ANALYSIS RESULT */}
            {activeTab === "results" && analysis && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.3fr_0.85fr]">
                  {/* LEFT COLUMN */}
                  <div className="space-y-6">
                    {/* FACE DETECTION */}
                    <section className="rounded-[24px] border border-[#E6E8DF] bg-white p-5 sm:p-7">
                      <div className="mb-5">
                        <span className="text-[10px] font-bold tracking-[0.16em] text-[#788873]">
                          VISUAL ANALYSIS
                        </span>

                        <h4 className="mt-2 font-serif text-2xl font-medium text-[#1A1C18]">
                          Hasil Deteksi Pada Wajah
                        </h4>

                        <p className="mt-2 text-xs leading-6 text-[#6D7269]">
                          Visualisasi area kulit yang berhasil diidentifikasi
                          oleh model deteksi Skinova AI.
                        </p>
                      </div>

                      {preview && (
                        <div className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden rounded-[18px] border border-[#E6E8DF] bg-[#F4F4ED]">
                          <img
                            src={preview}
                            alt="Foto wajah hasil analisis Skinova AI"
                            className="absolute inset-0 h-full w-full object-contain"
                          />

                          <svg
                            className="pointer-events-none absolute inset-0 h-full w-full"
                            viewBox={`0 0 ${analysis.image_width} ${analysis.image_height}`}
                            preserveAspectRatio="xMidYMid meet"
                          >
                            {analysis.detections.map((detection, index) => {
                              const box = detection.bounding_box;

                              return (
                                <g key={index}>
                                  <rect
                                    x={box.x1}
                                    y={box.y1}
                                    width={box.x2 - box.x1}
                                    height={box.y2 - box.y1}
                                    fill="rgba(162, 175, 155, 0.16)"
                                    stroke="#A2AF9B"
                                    strokeWidth="3"
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </g>
                              );
                            })}
                          </svg>
                        </div>
                      )}

                      <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#F4F4ED] px-4 py-3">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#A2AF9B]" />
                        <p className="text-xs leading-5 text-[#6D7269]">
                          Area yang ditandai menunjukkan lokasi kondisi kulit
                          yang terdeteksi oleh model AI.
                        </p>
                      </div>
                    </section>

                    {/* ANALYSIS SUMMARY */}
                    <section className="rounded-[24px] border border-[#E6E8DF] bg-white p-5 sm:p-7">
                      <div className="mb-5">
                        <span className="text-[10px] font-bold tracking-[0.16em] text-[#788873]">
                          DETECTION SUMMARY
                        </span>

                        <h4 className="mt-2 font-serif text-2xl font-medium text-[#1A1C18]">
                          Ringkasan Analisis
                        </h4>
                      </div>

                      {/* METRICS */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-[#F0F3ED] p-4">
                          <p className="text-[10px] font-bold tracking-[0.12em] text-[#6D7269]">
                            TOTAL DETEKSI
                          </p>

                          <p className="mt-2 font-serif text-4xl text-[#566251]">
                            {analysis.total_detections}
                          </p>

                          <p className="mt-1 text-[11px] text-[#858B80]">
                            Objek teridentifikasi
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#F4F4ED] p-4">
                          <p className="text-[10px] font-bold tracking-[0.12em] text-[#6D7269]">
                            PERANGKAT AI
                          </p>

                          <p className="mt-2 break-words font-serif text-2xl text-[#566251]">
                            {analysis.device}
                          </p>

                          <p className="mt-1 text-[11px] text-[#858B80]">
                            Detection model
                          </p>
                        </div>
                      </div>

                      {/* DETECTED CONDITIONS */}
                      <div className="mt-7">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <h5 className="text-sm font-bold text-[#1A1C18]">
                            Kondisi kulit terdeteksi
                          </h5>

                          <span className="text-[10px] font-medium text-[#858B80]">
                            AI DETECTION
                          </span>
                        </div>

                        {analysis.total_detections === 0 ? (
                          <div className="rounded-2xl border border-[#E6E8DF] bg-[#FAFAF3] p-5">
                            <p className="text-sm font-semibold text-[#566251]">
                              Belum ditemukan objek terdeteksi
                            </p>

                            <p className="mt-2 text-xs leading-6 text-[#6D7269]">
                              Model AI belum menemukan objek yang dapat
                              diidentifikasi pada gambar. Hal ini tidak berarti
                              kulit pasti bebas dari masalah.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {Object.entries(analysis.summary).map(
                              ([name, data]) => (
                                <div
                                  key={name}
                                  className="flex items-center justify-between gap-3 rounded-2xl border border-[#E6E8DF] bg-white p-4 transition-colors hover:bg-[#FAFAF3]"
                                >
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold capitalize text-[#1A1C18]">
                                      {name.replaceAll("_", " ")}
                                    </p>

                                    <p className="mt-1 text-xs text-[#858B80]">
                                      {data.count} objek terdeteksi
                                    </p>
                                  </div>

                                  <span className="shrink-0 rounded-full border border-[#DDE3D8] bg-[#F0F3ED] px-3 py-1.5 text-xs font-semibold tabular-nums text-[#566251]">
                                    {(data.highest_confidence * 100).toFixed(1)}
                                    %
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </section>

                    {/* QUESTIONNAIRE PERSONALIZATION */}
                    {analysis.questionnaire_context && (
                      <section className="rounded-[24px] border border-[#E6E8DF] bg-white p-5 sm:p-7">
                        <div className="mb-5">
                          <span className="text-[10px] font-bold tracking-[0.16em] text-[#788873]">
                            PERSONAL SKIN PROFILE
                          </span>

                          <h4 className="mt-2 font-serif text-2xl font-medium text-[#1A1C18]">
                            Personalisasi Kulitmu
                          </h4>

                          <p className="mt-2 text-xs leading-6 text-[#6D7269]">
                            Informasi tambahan dari kuesioner yang digunakan
                            sebagai konteks rekomendasi perawatan.
                          </p>
                        </div>

                        {/* SKIN TYPE */}
                        <div className="rounded-2xl bg-[#F4F4ED] p-4">
                          <p className="text-[10px] font-bold tracking-[0.12em] text-[#788873]">
                            JENIS KULIT
                          </p>

                          <p className="mt-2 font-serif text-2xl capitalize text-[#1A1C18]">
                            {analysis.questionnaire_context.skin_type}
                          </p>
                        </div>

                        {/* EXISTING INGREDIENTS */}
                        {analysis.questionnaire_context.existing_ingredients
                          .length > 0 && (
                          <div className="mt-5">
                            <p className="mb-3 text-xs font-semibold text-[#444841]">
                              Kandungan yang sudah digunakan
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {analysis.questionnaire_context.existing_ingredients.map(
                                (ingredient) => (
                                  <span
                                    key={ingredient}
                                    className="rounded-full border border-[#DDE3D8] bg-[#F4F4ED] px-3 py-2 text-xs font-medium text-[#566251]"
                                  >
                                    {ingredient}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {/* PERSONALIZATION NOTES */}
                        <div className="mt-5 space-y-3">
                          {analysis.questionnaire_context.notes.map(
                            (note, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle2
                                  size={16}
                                  className="mt-0.5 shrink-0 text-[#788873]"
                                />

                                <p className="text-xs leading-6 text-[#6D7269]">
                                  {note}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </section>
                    )}
                  </div>

                  {/* RIGHT COLUMN: RECOMMENDATIONS */}
                  <div className="space-y-6">
                    <section className="rounded-[24px] border border-[#E6E8DF] bg-white p-5 sm:p-7">
                      <div className="mb-6">
                        <span className="text-[10px] font-bold tracking-[0.16em] text-[#788873]">
                          PERSONALIZED SKINCARE
                        </span>

                        <h4 className="mt-2 font-serif text-2xl font-medium text-[#1A1C18]">
                          Rekomendasi Perawatan
                        </h4>

                        <p className="mt-3 text-xs leading-6 text-[#6D7269]">
                          Rekomendasi perawatan yang disesuaikan dengan kategori
                          kondisi kulit yang terdeteksi oleh Skinova AI.
                        </p>
                      </div>

                      {analysis.recommendations &&
                        analysis.recommendations.length > 0 && (
                          <div className="space-y-4">
                            {analysis.recommendations.map((recommendation) => (
                              <RecommendationCard
                                key={recommendation.title}
                                recommendation={recommendation}
                              />
                            ))}
                          </div>
                        )}

                      {(!analysis.recommendations ||
                        analysis.recommendations.length === 0) && (
                        <div className="rounded-2xl bg-[#F4F4ED] p-5">
                          <p className="text-sm font-semibold text-[#566251]">
                            Belum ada rekomendasi perawatan
                          </p>

                          <p className="mt-2 text-xs leading-6 text-[#6D7269]">
                            Belum tersedia rekomendasi berdasarkan hasil deteksi
                            pada gambar ini.
                          </p>
                        </div>
                      )}
                    </section>

                    {/* DISCLAIMER */}
                    <section className="rounded-[24px] border border-[#E8DCCB] bg-[#F8F3EC] p-5 sm:p-6">
                      <span className="text-[10px] font-bold tracking-[0.16em] text-[#8C4E2F]">
                        IMPORTANT INFORMATION
                      </span>

                      <h5 className="mt-2 font-serif text-xl text-[#1A1C18]">
                        Catatan Analisis
                      </h5>

                      <p className="mt-3 text-xs leading-6 text-[#665D51]">
                        Hasil ini merupakan estimasi berdasarkan deteksi
                        kecerdasan buatan dan bukan diagnosis medis. Akurasi
                        hasil masih perlu dievaluasi lebih lanjut.
                      </p>
                    </section>

                    {/* MODEL INFORMATION */}
                    <div className="flex items-center justify-between gap-3 border-t border-[#E6E8DF] px-1 pt-4">
                      <span className="text-[10px] font-bold tracking-[0.12em] text-[#858B80]">
                        ANALYSIS MODEL
                      </span>

                      <span className="text-xs font-medium text-[#566251]">
                        {analysis.model}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PRODUCT RECOMMENDATIONS */}
                <section className="border-t border-[#E6E8DF] pt-8">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#788873]">
                      CURATED FOR YOUR SKIN
                    </span>

                    <h4 className="mt-2 font-serif text-3xl font-medium text-[#1A1C18]">
                      Produk untuk Kulitmu
                    </h4>

                    <p className="mt-2 max-w-xl text-sm leading-7 text-[#6D7269]">
                      Pilihan produk skincare yang direkomendasikan berdasarkan
                      hasil analisis dan kebutuhan kulitmu.
                    </p>
                  </div>

                  <ProductCarousel
                    products={analysis.product_recommendations ?? []}
                  />

                  {/* RESET BUTTON */}
                  <div className="mt-8 flex justify-center border-t border-[#E6E8DF] pt-7">
                    <button
                      type="button"
                      onClick={reset}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#566251] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#465342] sm:w-auto"
                    >
                      <Sparkles size={16} />
                      Analisis Ulang
                    </button>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          {activeTab !== "results" && (
            <aside className="space-y-4">
              <div className="rounded-[22px] border border-[#E8DECF] bg-[#F6F0E7] p-5">
                <h3 className="font-semibold text-ink">
                  Tips mendapatkan foto terbaik
                </h3>

                <div className="mt-5 space-y-4">
                  {[
                    {
                      n: "01",
                      t: "Pencahayaan cukup",
                      d: "Hadap sumber cahaya. Hindari tempat gelap atau cahaya terlalu kuat.",
                    },
                    {
                      n: "02",
                      t: "Wajah terlihat jelas",
                      d: "Pastikan wajah tidak tertutup rambut, masker, tangan, atau aksesori.",
                    },
                    {
                      n: "03",
                      t: "Posisi menghadap kamera",
                      d: "Lihat lurus ke kamera dan tempatkan wajah di tengah frame.",
                    },
                    {
                      n: "04",
                      t: "Tanpa filter",
                      d: "Gunakan foto asli tanpa beauty filter atau efek kamera.",
                    },
                  ].map((item) => (
                    <div key={item.n} className="flex gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E8EDE5] text-xs font-bold text-[#566251]">
                        {item.n}
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {item.t}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[22px] border border-[#E8DECF] bg-[#F6F0E7] p-5">
                <div className="flex gap-2">
                  <ShieldAlert size={18} className="shrink-0 text-[#566251]" />

                  <p className="text-sm font-semibold text-ink">
                    Perlu diketahui
                  </p>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Foto dikirim ke backend untuk pemeriksaan kualitas. Hasil
                  validasi hanya memeriksa kelayakan gambar, bukan mendiagnosis
                  kondisi kulit. Foto belum dianalisis oleh model AI.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setActiveTab("questionnaire")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#DDE3D8] bg-white px-5 py-3 text-sm font-semibold text-[#566251] transition hover:bg-[#F4F4ED] disabled:opacity-50"
                >
                  Lihat Kuesioner
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#566251] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#414C3D] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Analisis Ulang
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
