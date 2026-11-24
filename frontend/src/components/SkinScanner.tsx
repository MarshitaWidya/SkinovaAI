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
} from "lucide-react";

import {
  validateSkinImage,
  analyzeSkinImage,
  type ValidationResult,
  type SkinAnalysis,
  type SkinRecommendation,
  type QuestionnaireAnswers,
} from "@/lib/api";

type Mode = "camera" | "upload";

function RecommendationCard({
  recommendation,
}: {
  recommendation: SkinRecommendation;
}) {
  return (
    <div className="rounded-2xl border border-violet-100 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100">
          <Sparkles className="text-violet-600" size={21} />
        </div>

        <div>
          <h4 className="font-semibold capitalize text-ink">
            {recommendation.title}
          </h4>

          <p className="mt-1 text-xs text-slate-500">
            {recommendation.detected_count} objek terdeteksi
          </p>

          {recommendation.description && (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {recommendation.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h5 className="text-sm font-semibold text-ink">
          Kandungan skincare yang disarankan
        </h5>

        <div className="mt-3 flex flex-wrap gap-2">
          {recommendation.ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className="rounded-full bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h5 className="text-sm font-semibold text-ink">
          Perawatan yang disarankan
        </h5>

        <ul className="mt-3 space-y-2">
          {recommendation.care_tips.map((tip, index) => (
            <li
              key={index}
              className="flex gap-2 text-sm leading-6 text-slate-600"
            >
              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-green-600"
              />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl bg-amber-50 p-4">
        <h5 className="text-sm font-semibold text-amber-900">
          Hal yang perlu dihindari
        </h5>

        <ul className="mt-2 space-y-2">
          {recommendation.avoid.map((item, index) => (
            <li
              key={index}
              className="flex gap-2 text-sm leading-6 text-amber-800"
            >
              <ShieldAlert size={15} className="mt-1 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
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
    <section id="scanner" className="scroll-mt-24 bg-[#f5f3ff] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
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

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-3xl border border-white bg-white p-4 shadow-soft sm:p-6">
            {/* TAB NAVIGATION */}
            <div className="mb-6 grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("photo")}
                className={`rounded-lg px-2 py-3 text-xs font-semibold transition sm:text-sm ${
                  activeTab === "photo"
                    ? "bg-white text-violet shadow-sm"
                    : "text-slate-500 hover:text-violet"
                }`}
              >
                01. Scan Wajah
              </button>

              <button
                type="button"
                disabled={!showQuestionnaire || !validation?.valid}
                onClick={() => setActiveTab("questionnaire")}
                className={`rounded-lg px-2 py-3 text-xs font-semibold transition sm:text-sm ${
                  activeTab === "questionnaire"
                    ? "bg-white text-violet shadow-sm"
                    : "text-slate-500"
                } disabled:cursor-not-allowed disabled:opacity-40`}
              >
                02. Kuesioner
              </button>

              <button
                type="button"
                disabled={!analysis && !analyzing}
                onClick={() => setActiveTab("results")}
                className={`rounded-lg px-2 py-3 text-xs font-semibold transition sm:text-sm ${
                  activeTab === "results"
                    ? "bg-white text-violet shadow-sm"
                    : "text-slate-500"
                } disabled:cursor-not-allowed disabled:opacity-40`}
              >
                03. Hasil
              </button>
            </div>
            {activeTab === "photo" && (
              <>
                {/* SCANNER */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Face scanner
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Pilih metode pengambilan gambar
                    </p>
                  </div>

                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-[11px] font-semibold text-violet-700">
                    Tahap 2 · Image Validation
                  </span>
                </div>

                {/* MODE */}
                <div className="mb-4 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                  <button
                    onClick={() => changeMode("camera")}
                    className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold ${
                      mode === "camera"
                        ? "bg-white text-violet shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    <Camera size={16} />
                    Kamera
                  </button>

                  <button
                    onClick={() => changeMode("upload")}
                    className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold ${
                      mode === "upload"
                        ? "bg-white text-violet shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    <ImagePlus size={16} />
                    Upload foto
                  </button>
                </div>

                {/* IMAGE PREVIEW */}
                <div className="relative grid min-h-[300px] place-items-center overflow-hidden rounded-2xl bg-[#17152b]">
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
                        <div className="px-8 text-center text-white">
                          <Camera
                            className="mx-auto mb-3 text-violet-200"
                            size={34}
                          />

                          <p className="font-semibold">
                            Kamera belum diaktifkan
                          </p>

                          <p className="mt-2 text-xs leading-5 text-slate-300">
                            Klik tombol Aktifkan kamera untuk memulai
                            pemindaian.
                          </p>
                        </div>
                      )}

                      {streaming && (
                        <div className="pointer-events-none absolute inset-[12%] rounded-[45%] border-2 border-dashed border-white/80" />
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="m-5 flex min-h-[250px] w-[calc(100%-2.5rem)] flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/30 px-6 text-white hover:bg-white/5"
                    >
                      <Upload size={32} className="mb-3 text-violet-200" />

                      <span className="font-semibold">
                        Pilih foto dari perangkat
                      </span>

                      <span className="mt-2 text-xs text-slate-300">
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
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-ink disabled:opacity-50"
                    >
                      <RefreshCw size={16} />
                      Ambil ulang
                    </button>
                  ) : mode === "camera" ? (
                    !streaming ? (
                      <button
                        onClick={startCamera}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-violet px-4 py-3 text-sm font-semibold text-white"
                      >
                        <Camera size={16} />
                        Aktifkan kamera
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={capture}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-violet px-4 py-3 text-sm font-semibold text-white"
                        >
                          <CheckCircle2 size={16} />
                          Ambil foto
                        </button>

                        <button
                          onClick={stopCamera}
                          className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-ink"
                        >
                          <VideoOff size={16} />
                        </button>
                      </>
                    )
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-violet px-4 py-3 text-sm font-semibold text-white"
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
                    <span className="inline-flex items-center gap-2 text-violet-700">
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
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
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
                      <div className="mt-4 rounded-xl bg-green-50 p-3">
                        <p className="text-xs leading-5 text-green-700">
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
                <div className="mt-5 rounded-2xl border border-violet-100 bg-white p-5">
                  <div className="mb-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="text-violet-600" size={20} />
                      <h3 className="font-semibold text-ink">
                        Kenali Kondisi Kulitmu
                      </h3>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Jawab beberapa pertanyaan berikut agar rekomendasi
                      perawatan dapat disesuaikan dengan kebiasaan dan rutinitas
                      skincare-mu.
                    </p>
                  </div>

                  {/* KEBIASAAN */}
                  <div className="mb-6">
                    <h4 className="mb-3 text-sm font-semibold text-ink">
                      1. Bagaimana kebiasaanmu sehari-hari?
                    </h4>

                    <p className="mb-3 text-xs text-slate-500">
                      Pilih semua yang sesuai dengan kebiasaanmu.
                    </p>

                    <div className="space-y-3">
                      {[
                        {
                          value: "kurang_tidur",
                          label: "Sering tidur larut malam atau kurang tidur",
                        },
                        { value: "stres", label: "Sering mengalami stres" },
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
                      ].map((habit) => (
                        <label
                          key={habit.value}
                          className="flex cursor-pointer items-start gap-3 text-sm text-slate-600"
                        >
                          <input
                            type="checkbox"
                            checked={questionnaire.habits.includes(habit.value)}
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
                            className="mt-0.5 h-4 w-4 accent-violet-600"
                          />
                          <span>{habit.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* JENIS KULIT */}
                  <div className="mb-6">
                    <h4 className="mb-3 text-sm font-semibold text-ink">
                      2. Apa jenis kulitmu?
                    </h4>

                    <select
                      value={questionnaire.skin_type}
                      onChange={(event) =>
                        setQuestionnaire((previous) => ({
                          ...previous,
                          skin_type: event.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-500"
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
                  </div>

                  {/* PRODUK SKINCARE */}
                  <div className="mb-6">
                    <h4 className="mb-2 text-sm font-semibold text-ink">
                      3. Produk skincare apa yang sedang kamu gunakan?
                    </h4>

                    <p className="mb-3 text-xs leading-5 text-slate-500">
                      Tuliskan nama produk atau kandungan yang kamu gunakan.
                      Contoh: Vitamin C serum, moisturizer, sunscreen, retinol,
                      niacinamide, dan sebagainya.
                    </p>

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
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-violet-500"
                    />
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setActiveTab("photo")}
                      className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Kembali ke Foto
                    </button>

                    <button
                      type="button"
                      onClick={submitQuestionnaire}
                      disabled={analyzing}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                    Jawaban digunakan untuk memberikan konteks rekomendasi
                    perawatan dan bukan untuk menentukan diagnosis medis.
                  </p>
                </div>
              )}

            {/* ANALYSIS RESULT */}
            {activeTab === "results" && analyzing && (
              <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 p-4">
                <div className="flex items-center gap-3">
                  <LoaderCircle
                    className="animate-spin text-violet-600"
                    size={20}
                  />
                  <div>
                    <p className="text-sm font-semibold text-violet-900">
                      AI sedang menganalisis kulit
                    </p>
                    <p className="mt-1 text-xs text-violet-700">
                      Mohon tunggu, proses deteksi sedang berjalan.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "results" && analysis && (
              <div className="mt-5 rounded-2xl border border-violet-100 bg-white p-5">
                4{/* FOTO WAJAH DENGAN BOUNDING BOX YOLO */}
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold text-ink">
                    Hasil Deteksi pada Wajah
                  </h3>

                  {preview && (
                    <div className="relative mx-auto h-[360px] w-full max-w-md overflow-hidden rounded-2xl bg-[#17152b]">
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
                                fill="rgba(124, 58, 237, 0.12)"
                                stroke="#a78bfa"
                                strokeWidth="3"
                                vectorEffect="non-scaling-stroke"
                              />
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  )}

                  <p className="mt-2 text-center text-xs text-slate-400">
                    Area kotak menunjukkan lokasi kondisi kulit yang terdeteksi
                    oleh AI.
                  </p>
                </div>
                {/* JUDUL HASIL ANALISIS */}
                <div className="flex items-center gap-2">
                  <Sparkles className="text-violet-600" size={20} />
                  <h3 className="font-semibold text-ink">
                    Hasil Analisis Skinova AI
                  </h3>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-violet-50 p-3">
                    <p className="text-xs text-slate-500">Total deteksi</p>
                    <p className="mt-1 text-2xl font-bold text-violet-700">
                      {analysis.total_detections}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Perangkat AI</p>
                    <p className="mt-1 text-lg font-bold text-ink">
                      {analysis.device}
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="mb-3 text-sm font-semibold text-ink">
                    Kondisi kulit terdeteksi
                  </p>

                  {analysis.total_detections === 0 ? (
                    <p className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
                      Belum ditemukan objek yang terdeteksi oleh model AI. Hal
                      ini tidak berarti kulit pasti bebas dari masalah.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(analysis.summary).map(([name, data]) => (
                        <div
                          key={name}
                          className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
                        >
                          <div>
                            <p className="text-sm font-semibold capitalize text-ink">
                              {name.replaceAll("_", " ")}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {data.count} objek terdeteksi
                            </p>
                          </div>

                          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                            {(data.highest_confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* QUESTIONNAIRE PERSONALIZATION */}
                {analysis.questionnaire_context && (
                  <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50 p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-violet-600" />
                      <h4 className="text-sm font-semibold text-violet-900">
                        Personalisasi Berdasarkan Kuesioner
                      </h4>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-slate-500">Jenis kulit</p>
                      <p className="mt-1 text-sm font-semibold text-ink">
                        {analysis.questionnaire_context.skin_type}
                      </p>
                    </div>

                    {analysis.questionnaire_context.existing_ingredients
                      .length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-slate-500">
                          Kandungan yang sudah digunakan
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {analysis.questionnaire_context.existing_ingredients.map(
                            (ingredient) => (
                              <span
                                key={ingredient}
                                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-violet-700"
                              >
                                {ingredient}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 space-y-2">
                      {analysis.questionnaire_context.notes.map(
                        (note, index) => (
                          <p
                            key={index}
                            className="flex gap-2 text-xs leading-5 text-slate-600"
                          >
                            <CheckCircle2
                              size={15}
                              className="mt-0.5 shrink-0 text-violet-600"
                            />
                            {note}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                )}
                {/* SKINCARE RECOMMENDATIONS */}
                {analysis.recommendations &&
                  analysis.recommendations.length > 0 && (
                    <div className="mt-6">
                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="text-violet-600" size={20} />

                          <h3 className="font-semibold text-ink">
                            Rekomendasi Perawatan Kulit
                          </h3>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          Rekomendasi berikut disesuaikan dengan kategori
                          permasalahan kulit yang terdeteksi oleh Skinova AI.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {analysis.recommendations.map((recommendation) => (
                          <RecommendationCard
                            key={recommendation.title}
                            recommendation={recommendation}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-3">
                  <p className="text-xs leading-5 text-amber-800">
                    Hasil ini merupakan estimasi berdasarkan deteksi AI dan
                    bukan diagnosis medis. Akurasi hasil masih perlu dievaluasi
                    lebih lanjut.
                  </p>
                </div>
                <p className="mt-3 text-[11px] text-slate-400">
                  Model: {analysis.model}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-4">
            <div className="rounded-3xl bg-white p-6 shadow-soft">
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
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-lilac text-xs font-bold text-violet">
                      {item.n}
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-ink">{item.t}</p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <div className="flex gap-2">
                <ShieldAlert size={18} className="shrink-0 text-amber-700" />

                <p className="text-sm font-semibold text-amber-900">
                  Perlu diketahui
                </p>
              </div>

              <p className="mt-2 text-xs leading-6 text-amber-800">
                Foto dikirim ke backend untuk pemeriksaan kualitas. Hasil
                validasi hanya memeriksa kelayakan gambar, bukan mendiagnosis
                kondisi kulit. Foto belum dianalisis oleh model AI.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setActiveTab("questionnaire")}
                className="flex-1 rounded-full border border-violet-200 px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                Lihat Kuesioner
              </button>

              <button
                type="button"
                onClick={reset}
                className="flex-1 rounded-full bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Analisis Ulang
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
