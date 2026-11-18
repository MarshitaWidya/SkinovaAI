# Skinova AI

MVP website analisis kondisi kulit berbasis AI. Tahap 1 menyediakan landing page, antarmuka scanner kamera/upload, dan backend FastAPI dasar.

> Status: UI dan pengambilan gambar sudah berjalan. Validasi kualitas gambar dan prediksi kondisi kulit belum diaktifkan. Jangan menganggap tampilan tahap ini sebagai diagnosis atau hasil AI.

## Teknologi
- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Backend: FastAPI
- Tahap berikutnya: OpenCV + MediaPipe untuk kualitas/posisi wajah; model klasifikasi multi-label untuk kondisi kulit.

## Persyaratan
- Node.js 20.9+ dan npm
- Python 3.10+
- Browser modern dengan izin kamera
- Untuk akses kamera, gunakan `localhost` atau HTTPS.

## Menjalankan frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
Buka http://localhost:3000

## Menjalankan backend
Buka terminal baru:
```bash
cd backend
python -m venv .venv
```
Windows PowerShell:
```powershell
.venv\Scripts\Activate.ps1
```
macOS/Linux:
```bash
source .venv/bin/activate
```
Lanjutkan:
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Dokumentasi API: http://localhost:8000/docs

## Fitur tahap 1
- Landing page responsif
- Navigasi ke area scanner
- Pilihan kamera langsung atau unggah foto
- Preview foto
- Start/stop kamera
- Ganti foto dan reset
- API health-check dasar

## Belum termasuk
- Face detection / face count
- Pemeriksaan brightness, blur, pose, dan occlusion
- YOLO atau model klasifikasi terlatih
- Rekomendasi skincare berbasis hasil model
- Penyimpanan riwayat dan akun pengguna

## Catatan privasi dan keselamatan
Tahap awal hanya menampilkan foto di browser. Jangan mengunggah foto wajah ke server sebelum kebijakan privasi, persetujuan pengguna, batas retensi, dan pengamanan endpoint diterapkan. Hasil proyek ini ditujukan sebagai informasi edukatif, bukan diagnosis medis.
