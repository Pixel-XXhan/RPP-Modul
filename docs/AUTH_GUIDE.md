# Panduan Implementasi Autentikasi & Keamanan Katedra

Dokumen ini menjelaskan cara kerja sistem autentikasi, rate limiting, dan langkah konfigurasi yang diperlukan di Supabase.

## 1. Arsitektur Keamanan

Sistem ini menggunakan pendekatan Hybrid antara Backend (NestJS) dan Supabase Auth:

1.  **Strict Global Rate Limiting**:
    *   Semua endpoint API dilindungi oleh `ThrottlerGuard` di Backend.
    *   Limit default: 100 request/menit (User), 20 request/menit (AI Generation).
    *   Limit ketat untuk Auth: 10 request/menit.

2.  **Secure Auth Flow**:
    *   Frontend (`useAuth`) **TIDAK** memanggil Supabase secara langsung untuk Login/Register.
    *   Frontend memanggil Backend Proxy (`/auth/login`, `/auth/register`).
    *   Backend memverifikasi Rate Limit -> memanggil Supabase -> mengembalikan Session.
    *   Ini mencegah serangan Brute Force yang melewati frontend.

3.  **User Identity**:
    *   User yang login dilimit berdasarkan **User ID**.
    *   Tamu (Guest) dilimit berdasarkan **IP Address**.

---

## 2. Konfigurasi Supabase (Wajib)

Agar fitur "Register dengan Email" dan "Lupa Password" berjalan, Anda harus mengonfigurasi Supabase Project Anda.

### A. Aktifkan Email Provider
1.  Masuk ke Dashboard Supabase > **Authentication** > **Providers**.
2.  Pastikan **Email** dalam keadaan `Enabled`.
3.  **(Recommended)** Matikan "Confirm email" jika ingin user bisa langsung login tanpa verifikasi (untuk dev), TAPI aktifkan untuk Production.
    *   Menu: **Authentication** > **Providers** > **Email** > **Confirm email**.
    *   Status saat ini di kode: Kode kita menangani validasi "Email Not Confirmed". Jadi aman untuk diaktifkan.

### B. Konfigurasi URL Redirect
Supabase perlu tahu kemana user harus diarahkan setelah klik link di email (misal: verifikasi akun atau reset password).

1.  Masuk ke **Authentication** > **URL Configuration**.
2.  **Site URL**: Isi dengan URL frontend Anda.
    *   Dev: `http://localhost:3000`
    *   Prod: `https://katedra.id` (contoh)
3.  **Redirect URLs**: Tambahkan URL spesifik:
    *   `http://localhost:3000/auth/callback`
    *   `http://localhost:3000/reset-password`
    *   `http://localhost:3000/dashboard`

### C. Konfigurasi SMTP (Untuk Email Custom)
Secara default, Supabase membatasi jumlah email yang dikirim (Rate Limit Internal Supabase). Untuk production, gunakan SMTP sendiri (Gmail, AWS SES, Resend, dll).

1.  Masuk ke **Authentication** > **SMTP Settings**.
2.  Aktifkan "Enable Custom SMTP".
3.  Isi kredensial SMTP Anda.

---

## 3. Implementasi Frontend & Backend

### Backend (`Bagian_Belakang`)
*   **Guard**: `src/common/guards/user-throttler.guard.ts` (Logika User vs IP).
*   **Module**: `src/common/common.module.ts` (Konfigurasi Limit).
*   **Controller**: `src/auth/auth.controller.ts` (Penerapan `@Throttle`).
*   **Filter**: `src/common/filters/http-exception.filter.ts` (Pesan Error Bahasa Indonesia).

### Frontend (`katedra`)
*   **Hook**: `hooks/useAuth.tsx` (Logic proxy ke backend).
*   **Pages**: `app/login/page.tsx`, `app/register/page.tsx`, `app/forgot-password/page.tsx`.
*   **404**: `app/not-found.tsx`.

---

## 4. Testing / Verifikasi

1.  **Coba Spam Login**:
    *   Coba login salah 10x dalam 1 menit.
    *   Harus muncul error: *"Terlalu banyak percobaan. Mohon tunggu beberapa saat."*
2.  **Coba Register**:
    *   Daftar email baru.
    *   Cek inbox email (jika SMTP benar) atau Logs di Supabase Dashboard.
    *   Klik link verifikasi -> Harus redirect ke Dashboard/Login.
3.  **Coba Lupa Password**:
    *   Buka halaman Lupa Password.
    *   Input email -> Kirim.
    *   Harus ada limit 5x/menit.
