"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ImagePlus,
  LoaderCircle,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import {
  validateSkinImage,
  analyzeSkinImage,
  type ValidationResult,
  type SkinAnalysis,
  type QuestionnaireAnswers,
  type SkinRecommendation,
} from "@/lib/api";

type Step = 1 | 2 | 3;
type Mode = "camera" | "upload";

const initialQuestionnaire: QuestionnaireAnswers = {
  habits: [],
  skin_type: "unknown",
  current_products: "",
};

const habits = [
  {
    value: "kurang_tidur",
    label: "Sering tidur larut malam atau kurang tidur",
  },
  { value: "stres", label: "Sering mengalami stres" },
  { value: "paparan_matahari", label: "Sering terpapar sinar matahari" },
  {
    value: "makanan_tinggi_gula",
    label: "Sering mengonsumsi makanan tinggi gula",
  },
  {
    value: "makanan_tinggi_lemak",
    label: "Sering mengonsumsi makanan tinggi lemak",
  },
  { value: "kurang_minum_air", label: "Kurang minum air putih" },
];

function RecommendationCard({
  recommendation,
}: {
  recommendation: SkinRecommendation;
}) {
  return (
    <article className="rounded-2xl border border-[#e8e9df] bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf0e8] text-[#71846d]">
          <Sparkles size={19} />
        </div>
        <div>
          <h4 className="font-semibold capitalize text-[#343b32]">
            {recommendation.title}
          </h4>
          <p className="mt-1 text-xs text-[#858b80]">
            {recommendation.detected_count} objek terdeteksi
          </p>
          {recommendation.description && (
            <p className="mt-2 text-sm leading-6 text-[#73796f]">
              {recommendation.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h5 className="text-sm font-semibold text-[#343b32]">
          Kandungan yang disarankan
        </h5>
        <div className="mt-3 flex flex-wrap gap-2">
          {recommendation.ingredients.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#edf0e8] px-3 py-2 text-xs font-medium text-[#60745c]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h5 className="text-sm font-semibold text-[#343b32]">
          Perawatan yang disarankan
        </h5>
        <ul className="mt-3 space-y-2">
          {recommendation.care_tips.map((tip, index) => (
            <li
              key={index}
              className="flex gap-2 text-sm leading-6 text-[#73796f]"
            >
              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-[#82947a]"
              />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {recommendation.avoid.length > 0 && (
        <div className="mt-5 rounded-xl bg-[#faf4eb] p-4">
          <h5 className="text-sm font-semibold text-[#856d4c]">
            Hal yang perlu diperhatikan
          </h5>
          <ul className="mt-2 space-y-2">
            {recommendation.avoid.map((item, index) => (
              <li
                key={index}
                className="flex gap-2 text-sm leading-6 text-[#8a765d]"
              >
                <ShieldAlert size={15} className="mt-1 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default function AnalysisWorkspace() {
  const [step, setStep] = useState<Step>(1);
  const [mode, setMode] = useState<Mode>("upload");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [analysis, setAnalysis] = useState<SkinAnalysis | null>(null);

  const [questionnaire, setQuestionnaire] =
    useState<QuestionnaireAnswers>(initialQuestionnaire);

  const [validating, setValidating] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  async function startCamera() {
    setError("");

    try {
      stopCamera();

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
    } catch {
      setError(
        "Kamera tidak dapat diakses. Periksa izin kamera atau gunakan upload foto.",
      );
    }
  }

  async function processImage(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError("Ukuran foto maksimal 8 MB.");
      return;
    }

    stopCamera();
    setError("");
    setSelectedImage(null);
    setValidation(null);
    setAnalysis(null);
    setStep(1);
    setValidating(true);

    const imageUrl = URL.createObjectURL(file);
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return imageUrl;
    });

    try {
      const result = await validateSkinImage(file);
      setValidation(result);

      if (!result.valid) {
        setError(result.message || "Foto belum memenuhi persyaratan.");
        return;
      }

      // Simpan file hanya setelah validasi berhasil.
      setSelectedImage(file);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memeriksa kualitas foto.",
      );
    } finally {
      setValidating(false);
    }
  }

  async function capturePhoto() {
    const video = videoRef.current;

    if (!video || !video.videoWidth) {
      setError("Kamera belum siap. Coba beberapa saat lagi.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0);

    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          setError("Gagal mengambil foto.");
          return;
        }

        const file = new File([blob], "skinova-camera.jpg", {
          type: "image/jpeg",
        });

        await processImage(file);
      },
      "image/jpeg",
      0.92,
    );
  }

  function retakePhoto() {
    if (preview) URL.revokeObjectURL(preview);

    setPreview(null);
    setSelectedImage(null);
    setValidation(null);
    setAnalysis(null);
    setQuestionnaire(initialQuestionnaire);
    setStep(1);
    setError("");

    if (fileRef.current) fileRef.current.value = "";
  }

  function toggleHabit(value: string) {
    setQuestionnaire((previous) => ({
      ...previous,
      habits: previous.habits.includes(value)
        ? previous.habits.filter((item) => item !== value)
        : [...previous.habits, value],
    }));
  }

  async function submitQuestionnaire() {
    if (!selectedImage || !validation?.valid) {
      setError("Silakan unggah foto dan pastikan foto berhasil divalidasi.");
      setStep(1);
      return;
    }

    setAnalyzing(true);
    setError("");

    try {
      const result = await analyzeSkinImage(selectedImage, questionnaire);

      if (!result.success || !result.analysis) {
        throw new Error(result.message || "Analisis kulit gagal dilakukan.");
      }

      setAnalysis(result.analysis);
      setStep(3);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Tidak dapat menghubungi server.",
      );
    } finally {
      setAnalyzing(false);
    }
  }

  useEffect(() => {
    return () => {
      stopCamera();
      if (preview) URL.revokeObjectURL(preview);
    };
    // Cleanup saat komponen dilepas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = [
    { id: 1, title: "Foto Wajah", description: "Upload dan validasi" },
    { id: 2, title: "Kuesioner", description: "Kenali kebiasaanmu" },
    { id: 3, title: "Hasil Analisis", description: "Lihat hasil pemindaian" },
  ];

  const canGoToQuestionnaire = Boolean(selectedImage && validation?.valid);

  return (
    <main className="min-h-screen bg-[#faf9ee] pb-20">
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#788b70]">
            SKIN ANALYSIS
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-[#343b32] sm:text-5xl">
            Kenali kondisi kulitmu lebih dekat.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#777d72] sm:text-base">
            Ikuti tiga tahap sederhana untuk mendapatkan insight kondisi kulit
            dan rekomendasi perawatan yang lebih sesuai dengan rutinitasmu.
          </p>
        </div>

        {/* STEP NAVIGATION */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-2 sm:gap-4">
          {steps.map((item) => {
            const active = step === item.id;
            const completed = step > item.id;
            const locked =
              (item.id === 2 && !canGoToQuestionnaire) ||
              (item.id === 3 && !analysis);

            return (
              <button
                key={item.id}
                type="button"
                disabled={locked || validating || analyzing}
                onClick={() => setStep(item.id as Step)}
                className={`rounded-2xl border p-3 text-left transition sm:p-4 ${
                  active
                    ? "border-[#a2af9b] bg-[#eaf0e5]"
                    : completed
                      ? "border-[#dce5d7] bg-white"
                      : "border-[#e8e8df] bg-white/60"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                      active || completed
                        ? "bg-[#82947a] text-white"
                        : "bg-[#eeeeea] text-[#92978d]"
                    }`}
                  >
                    {completed ? <Check size={14} /> : `0${item.id}`}
                  </span>
                  <span className="hidden text-xs font-medium text-[#82947a] sm:block">
                    TAHAP {item.id}
                  </span>
                </div>
                <p className="mt-3 text-xs font-semibold text-[#343b32] sm:text-sm">
                  {item.title}
                </p>
                <p className="mt-1 hidden text-[11px] text-[#858b80] sm:block">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-6 max-w-4xl rounded-[2rem] border border-[#e9e9df] bg-white p-5 shadow-[0_18px_55px_rgba(65,75,55,0.06)] sm:p-8 lg:p-10">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <div className="mb-7">
                <p className="text-xs font-semibold tracking-[0.16em] text-[#82947a]">
                  STEP 01 — PHOTO
                </p>
                <h2 className="mt-2 font-serif text-3xl text-[#343b32]">
                  Mulai dengan foto wajah
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#858b80]">
                  Gunakan foto wajah tanpa filter dengan pencahayaan yang cukup.
                </p>
              </div>

              <div className="mb-5 flex rounded-full bg-[#f1f1eb] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode("upload");
                    setError("");
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium ${
                    mode === "upload"
                      ? "bg-white text-[#52664c] shadow-sm"
                      : "text-[#858b80]"
                  }`}
                >
                  <ImagePlus size={17} /> Upload foto
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("camera");
                    setError("");
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium ${
                    mode === "camera"
                      ? "bg-white text-[#52664c] shadow-sm"
                      : "text-[#858b80]"
                  }`}
                >
                  <Camera size={17} /> Kamera
                </button>
              </div>

              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-[#f1f2eb] sm:min-h-[380px]">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview foto wajah"
                    className="max-h-[420px] w-full object-contain"
                  />
                ) : mode === "camera" ? (
                  <video
                    ref={videoRef}
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full scale-x-[-1] object-cover"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex min-h-[280px] w-full flex-col items-center justify-center px-6 text-center sm:min-h-[380px]"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#82947a] shadow-sm">
                      <Upload size={26} />
                    </span>
                    <span className="mt-5 font-medium text-[#485443]">
                      Pilih foto wajah
                    </span>
                    <span className="mt-2 text-xs text-[#92978d]">
                      JPG, PNG, WEBP · Maksimal 8 MB
                    </span>
                  </button>
                )}

                {!preview && mode === "camera" && (
                  <div className="pointer-events-none absolute inset-[12%] rounded-[45%] border-2 border-dashed border-[#82947a]/70" />
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(event) => processImage(event.target.files?.[0])}
              />

              <div className="mt-4 flex flex-wrap gap-3">
                {!preview && mode === "camera" && (
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#82947a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#71846a]"
                  >
                    <Camera size={17} /> Aktifkan kamera
                  </button>
                )}

                {!preview && mode === "camera" && (
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#dfe4d9] px-5 py-3 text-sm font-semibold text-[#52664c] hover:bg-[#f6f7f2]"
                  >
                    Ambil foto
                  </button>
                )}

                {!preview && mode === "upload" && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#82947a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#71846a]"
                  >
                    <Upload size={17} /> Pilih gambar
                  </button>
                )}

                {preview && (
                  <>
                    <button
                      type="button"
                      onClick={retakePhoto}
                      disabled={validating}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#dfe4d9] px-5 py-3 text-sm font-semibold text-[#52664c] disabled:opacity-50"
                    >
                      <RefreshCw size={16} /> Ganti foto
                    </button>
                    {mode === "upload" && (
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        disabled={validating}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#82947a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                      >
                        <ImagePlus size={16} /> Pilih foto lain
                      </button>
                    )}
                  </>
                )}
              </div>

              {validating && (
                <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#edf0e8] p-4 text-sm text-[#60745c]">
                  <LoaderCircle size={18} className="animate-spin" />
                  Memeriksa kualitas foto...
                </div>
              )}

              {validation && !validating && (
                <div
                  className={`mt-5 rounded-xl p-4 ${
                    validation.valid ? "bg-[#edf3e9]" : "bg-[#fbefeb]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {validation.valid ? (
                      <CheckCircle2 size={19} className="text-[#718b67]" />
                    ) : (
                      <CircleAlert size={19} className="text-[#b76d5e]" />
                    )}
                    <p className="text-sm font-semibold text-[#485443]">
                      {validation.valid
                        ? "Foto berhasil divalidasi"
                        : "Foto belum memenuhi persyaratan"}
                    </p>
                  </div>

                  {validation.errors?.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs leading-5 text-[#9a6559]">
                      {validation.errors.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  )}

                  {validation.valid && (
                    <p className="mt-2 text-xs leading-5 text-[#60745c]">
                      Foto memenuhi pemeriksaan kualitas. Kamu bisa melanjutkan
                      ke kuesioner.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div className="mb-7">
                <p className="text-xs font-semibold tracking-[0.16em] text-[#82947a]">
                  STEP 02 — QUESTIONNAIRE
                </p>
                <h2 className="mt-2 font-serif text-3xl text-[#343b32]">
                  Kenali kebiasaan dan kulitmu
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#858b80]">
                  Jawabanmu membantu Skinova AI memberikan konteks pada
                  rekomendasi perawatan.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-[#343b32]">
                    1. Bagaimana kebiasaanmu sehari-hari?
                  </h3>
                  <p className="mt-1 text-xs text-[#858b80]">
                    Kamu dapat memilih lebih dari satu jawaban.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {habits.map((habit) => (
                      <label
                        key={habit.value}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition ${
                          questionnaire.habits.includes(habit.value)
                            ? "border-[#a2af9b] bg-[#f0f3ec] text-[#52664c]"
                            : "border-[#e9e9df] text-[#73796f] hover:bg-[#fafaf6]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={questionnaire.habits.includes(habit.value)}
                          onChange={() => toggleHabit(habit.value)}
                          className="mt-0.5 h-4 w-4 accent-[#82947a]"
                        />
                        {habit.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#343b32]">
                    2. Apa jenis kulitmu?
                  </h3>
                  <p className="mt-1 text-xs text-[#858b80]">
                    Pilih jenis kulit yang paling sesuai dengan kondisimu.
                  </p>
                  <select
                    value={questionnaire.skin_type}
                    onChange={(event) =>
                      setQuestionnaire((previous) => ({
                        ...previous,
                        skin_type: event.target.value,
                      }))
                    }
                    className="mt-4 w-full rounded-xl border border-[#e5e7dc] bg-white px-4 py-3 text-sm text-[#52604d] outline-none focus:border-[#82947a]"
                  >
                    <option value="unknown">
                      Belum mengetahui jenis kulit
                    </option>
                    <option value="oily">Berminyak (Oily)</option>
                    <option value="dry">Kering (Dry)</option>
                    <option value="combination">Kombinasi (Combination)</option>
                    <option value="sensitive">Sensitif (Sensitive)</option>
                    <option value="normal">Normal</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#343b32]">
                    3. Produk skincare apa yang sedang kamu gunakan?
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#858b80]">
                    Tuliskan nama produk atau kandungan aktif yang sedang
                    digunakan, termasuk frekuensi jika kamu mengetahuinya.
                  </p>
                  <textarea
                    rows={4}
                    value={questionnaire.current_products}
                    onChange={(event) =>
                      setQuestionnaire((previous) => ({
                        ...previous,
                        current_products: event.target.value,
                      }))
                    }
                    placeholder="Contoh: Facial wash, moisturizer, Vitamin C serum setiap pagi, retinol 2 kali seminggu..."
                    className="mt-4 w-full resize-y rounded-xl border border-[#e5e7dc] px-4 py-3 text-sm leading-6 text-[#52604d] outline-none placeholder:text-[#a6aa9f] focus:border-[#82947a]"
                  />
                </div>
              </div>

              <div className="mt-7 rounded-xl bg-[#f5f4ed] p-4 text-xs leading-6 text-[#7c8177]">
                Jawaban kuesioner digunakan sebagai konteks personalisasi
                rekomendasi, bukan sebagai bukti penyebab masalah kulit atau
                diagnosis medis.
              </div>

              <button
                type="button"
                onClick={submitQuestionnaire}
                disabled={analyzing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#82947a] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#71846a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {analyzing ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Sedang menganalisis kulit...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} /> Mulai Analisis Kulit
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && analysis && (
            <div>
              <div className="mb-7">
                <p className="text-xs font-semibold tracking-[0.16em] text-[#82947a]">
                  STEP 03 — YOUR SKIN INSIGHT
                </p>
                <h2 className="mt-2 font-serif text-3xl text-[#343b32]">
                  Hasil analisis kulitmu
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#858b80]">
                  Berikut hasil deteksi AI dan informasi perawatan berdasarkan
                  hasil pemindaian serta jawaban kuesionermu.
                </p>
              </div>

              {preview && (
                <div className="mb-6 overflow-hidden rounded-2xl bg-[#f1f2eb]">
                  <img
                    src={preview}
                    alt="Foto yang dianalisis"
                    className="mx-auto max-h-[300px] w-full object-contain"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#edf0e8] p-5">
                  <p className="text-xs text-[#78836f]">Total deteksi</p>
                  <p className="mt-2 text-3xl font-semibold text-[#52664c]">
                    {analysis.total_detections}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f4f1eb] p-5">
                  <p className="text-xs text-[#8a8175]">Perangkat AI</p>
                  <p className="mt-2 text-lg font-semibold text-[#5f594f]">
                    {analysis.device}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <h3 className="font-semibold text-[#343b32]">
                  Kondisi kulit terdeteksi
                </h3>

                {analysis.total_detections === 0 ? (
                  <p className="mt-3 rounded-xl bg-[#f5f4ed] p-4 text-sm leading-6 text-[#73796f]">
                    Belum ditemukan objek yang terdeteksi oleh model AI. Hal ini
                    tidak berarti kulit pasti bebas dari masalah.
                  </p>
                ) : (
                  <div className="mt-3 space-y-3">
                    {Object.entries(analysis.summary).map(([name, data]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between rounded-xl border border-[#e9e9df] p-4"
                      >
                        <div>
                          <p className="text-sm font-semibold capitalize text-[#343b32]">
                            {name.replaceAll("_", " ")}
                          </p>
                          <p className="mt-1 text-xs text-[#858b80]">
                            {data.count} objek terdeteksi
                          </p>
                        </div>
                        <span className="rounded-full bg-[#edf0e8] px-3 py-1.5 text-xs font-semibold text-[#60745c]">
                          {(data.highest_confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {analysis.questionnaire_context && (
                <div className="mt-7 rounded-2xl bg-[#f2f3ed] p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-[#71846a]" />
                    <h3 className="font-semibold text-[#485443]">
                      Personalisasi berdasarkan kuesioner
                    </h3>
                  </div>
                  <p className="mt-4 text-xs text-[#858b80]">Jenis kulit</p>
                  <p className="mt-1 text-sm font-semibold capitalize text-[#485443]">
                    {analysis.questionnaire_context.skin_type}
                  </p>

                  {analysis.questionnaire_context.existing_ingredients?.length >
                    0 && (
                    <>
                      <p className="mt-4 text-xs text-[#858b80]">
                        Kandungan yang sudah digunakan
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {analysis.questionnaire_context.existing_ingredients.map(
                          (ingredient) => (
                            <span
                              key={ingredient}
                              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#60745c]"
                            >
                              {ingredient}
                            </span>
                          ),
                        )}
                      </div>
                    </>
                  )}

                  {analysis.questionnaire_context.notes?.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {analysis.questionnaire_context.notes.map(
                        (note, index) => (
                          <p
                            key={index}
                            className="flex gap-2 text-xs leading-5 text-[#687260]"
                          >
                            <CheckCircle2
                              size={15}
                              className="mt-0.5 shrink-0"
                            />
                            {note}
                          </p>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}

              {analysis.ingredient_warnings &&
                analysis.ingredient_warnings.length > 0 && (
                  <div className="mt-6 rounded-xl border border-[#ead9bd] bg-[#faf4eb] p-4">
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={18} className="text-[#987b4f]" />
                      <h3 className="text-sm font-semibold text-[#806b4d]">
                        Perhatian penggunaan kandungan
                      </h3>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {analysis.ingredient_warnings.map((warning, index) => (
                        <li
                          key={index}
                          className="text-xs leading-5 text-[#8a765d]"
                        >
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {analysis.recommendations &&
                analysis.recommendations.length > 0 && (
                  <div className="mt-7">
                    <h3 className="mb-4 font-semibold text-[#343b32]">
                      Rekomendasi perawatan kulit
                    </h3>
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

              <div className="mt-7 rounded-xl border border-[#eadfca] bg-[#faf6ed] p-4">
                <p className="text-xs leading-6 text-[#806f55]">
                  Hasil ini merupakan estimasi berdasarkan deteksi AI dan
                  informasi yang kamu berikan. Hasil bukan diagnosis medis.
                  Konsultasikan dengan dokter kulit jika mengalami keluhan yang
                  menetap atau memburuk.
                </p>
              </div>

              <p className="mt-4 text-xs text-[#a0a397]">
                Model: {analysis.model}
              </p>

              <button
                type="button"
                onClick={retakePhoto}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#dfe4d9] px-5 py-3.5 text-sm font-semibold text-[#52664c] hover:bg-[#f6f7f2]"
              >
                <RefreshCw size={16} /> Analisis foto baru
              </button>
            </div>
          )}

          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-[#fbefeb] p-4 text-sm leading-6 text-[#a45f52]">
              <CircleAlert size={18} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* FOOTER NAVIGATION */}
          {step === 1 && (
            <div className="mt-8 flex justify-end border-t border-[#eeeeea] pt-6">
              <button
                type="button"
                disabled={!canGoToQuestionnaire || validating}
                onClick={() => {
                  setError("");
                  setStep(2);
                }}
                className="flex items-center gap-2 rounded-full bg-[#82947a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#71846a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Lanjut ke Kuesioner <ChevronRight size={17} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 flex justify-between border-t border-[#eeeeea] pt-6">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setStep(1);
                }}
                disabled={analyzing}
                className="rounded-full border border-[#dfe4d9] px-5 py-3 text-sm font-semibold text-[#65735e] disabled:opacity-50"
              >
                Kembali
              </button>
              <span className="self-center text-xs text-[#9a9e93]">
                Foto sudah divalidasi
              </span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
