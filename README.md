# 🏛️ Katedra AI

![Katedra Showcase](/public/images/carousel/dashboard.webp)

> **Administrasi Selesai, Inspirasi Dimulai.**
> Platform AI premium untuk pendidik Indonesia, menghemat waktu administrasi hingga 90% dengan presisi pedagogis Kurikulum Merdeka.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

---

## 🌟 Tentang Katedra

**Katedra** bukan sekadar tool administrasi, melainkan asisten cerdas yang memahami konteks pendidikan. Dibangun dengan teknologi AI terbaru (Gemini 1.5 Pro & Claude 3.5 Sonnet), Katedra membantu guru menyusun:
*   **Modul Ajar** yang personal dan berdiferensiasi.
*   **Bahan Ajar** kreatif (Artikel, Presentasi, Video Script).
*   **Asesmen** komprehensif (Soal, Rubrik, Kisi-kisi).
*   **Laporan** otomatis (Rapor, Analisis Nilai).

Semuanya dalam antarmuka *Luxury Glassmorphism* yang memanjakan mata, karena kami percaya guru layak mendapatkan tool kelas dunia.

## 🚀 Fitur Unggulan

### 🧠 AI Context-Aware Engine
Berbeda dengan ChatGPT biasa, AI kami telah dilatih khusus dengan:
-   Database Kurikulum Merdeka & K-13 terbaru.
-   Taksonomi Bloom & Understanding by Design (UbD).
-   Pedagogi Diferensiasi (Auditori, Visual, Kinestetik).

### ⚡ Generator Dokumen Kilat
Buat dokumen 20 halaman dalam < 30 detik:
-   **Modul Ajar**: Lengkap dengan ATP, CP, dan Glosarium.
-   **RPP Lengkap**: Termasuk skenario pembelajaran detail.
-   **Bank Soal**: HOTS (Higher Order Thinking Skills) ready.

### 🎨 Scholastic Luxury Design
Experience penggunaan aplikasi yang menenangkan:
-   **Focus Mode**: Area kerja bebas gangguan.
-   **Smart Sidebar**: Navigasi intuitif ke 20+ fitur.
-   **Dark/Light Mode**: Adaptif dengan preferensi visual Anda.

---

## 🛠️ Teknologi (Tech Stack)

Dibangun dengan standar industri modern untuk performa, keamanan, dan skalabilitas:

| Layer | Teknologi | Deskripsi |
|-------|-----------|-----------|
| **Core** | [Next.js 14](https://nextjs.org/) | App Router, Server Actions, SSR |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first framework |
| **UI Kit** | [Shadcn UI](https://ui.shadcn.com/) | Accessible, reusable components |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | Smooth interactions |
| **State** | [Zustand](https://github.com/pmndrs/zustand) | Lightweight state management |
| **Backend** | [NestJS](https://nestjs.com/) | Enterprise-grade Node.js framework |

---

## 🏁 Mulai Menggunakan (Getting Started)

### Prasyarat
-   Node.js 18+
-   NPM atau Bun

### Instalasi

1.  **Clone Repository**
    ```bash
    git clone https://github.com/YourUsername/katedra-frontend.git
    cd katedra-frontend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # atau
    bun install
    ```

3.  **Setup Environment**
    Buat file `.env.local` dan tambahkan:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Jalankan Server**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000).

---

## 📂 Struktur Project

```bash
katedra/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Route Group: Login, Register
│   ├── (dashboard)/      # Route Group: Main App
│   │   ├── modul-ajar/   # Fitur Modul Ajar
│   │   ├── rpp/          # Fitur RPP
│   │   └── ...           # 20+ fitur lainnya
│   └── layout.tsx        # Root Layout
├── components/           # Reusable Components
│   ├── ui/               # Shadcn UI primitives
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Utilities & Constants
├── hooks/                # Custom React Hooks
└── public/               # Static Assets
```

---

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi! Silakan cek [CONTRIBUTING.md](CONTRIBUTING.md) untuk pedoman kontribusi.

1.  Fork project ini
2.  Buat feature branch (`git checkout -b fitur-keren`)
3.  Commit perubahan (`git commit -m 'Menambahkan fitur keren'`)
4.  Push ke branch (`git push origin fitur-keren`)
5.  Buat Pull Request

---

## 📄 Lisensi

Hak Cipta © 2026 **Katedra AI**.
Dilisensikan di bawah [MIT License](LICENSE).

---

> *"Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia."* — Nelson Mandela

Dibuat dengan ❤️ dan ☕ oleh **Tim Katedra**.
