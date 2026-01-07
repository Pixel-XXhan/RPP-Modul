# Dokumentasi Halaman Katedra

Dokumen ini berisi penjelasan lengkap setiap halaman yang ada di aplikasi **Katedra** - Platform AI untuk Administrasi Guru Kurikulum Merdeka.

---

## Daftar Isi

1. [Halaman Publik (Landing)](#halaman-publik-landing)
2. [Halaman Autentikasi](#halaman-autentikasi)
3. [Dashboard Utama](#dashboard-utama)
4. [Modul Dokumen](#modul-dokumen)
5. [Modul Asesmen](#modul-asesmen)
6. [Modul Kurikulum](#modul-kurikulum)
7. [Modul Media & Tools](#modul-media--tools)
8. [Modul Manajemen](#modul-manajemen)
9. [Halaman Utilitas](#halaman-utilitas)

---

## Halaman Publik (Landing)

### 1. Beranda (`/`)
**Lokasi File:** `app/(landing)/page.tsx`

**Deskripsi:**
Halaman utama yang menjadi pintu gerbang aplikasi Katedra. Menampilkan nilai proposisi utama platform kepada pengunjung.

**Konten:**
- **Hero Section:** Banner utama dengan tagline "Administrasi Selesai, Inspirasi Dimulai", dilengkapi tombol CTA (Call-to-Action) untuk memulai gratis dan melihat demo
- **Value Proposition:** Penjelasan fitur-fitur unggulan Katedra dalam bentuk BentoGrid yang interaktif
- **Visualization:** Demonstrasi visual cara kerja platform dengan gambar dan animasi
- **Trust Proof:** Bukti kepercayaan dari pengguna, termasuk statistik pengguna dan testimoni
- **Final CTA:** Ajakan terakhir untuk mendaftar dengan penawaran menarik

**Komponen Utama:**
- Hero dengan gradien dan animasi
- BentoGrid untuk menampilkan fitur
- Testimoni carousel
- Footer dengan navigasi lengkap

---

### 2. Halaman Fitur (`/fitur`)
**Lokasi File:** `app/(landing)/fitur/page.tsx`

**Deskripsi:**
Halaman yang menjelaskan secara detail semua fitur yang tersedia di Katedra.

**Konten:**
- Daftar lengkap fitur AI untuk pembuatan dokumen
- Penjelasan modul-modul yang tersedia
- Perbandingan cara manual vs menggunakan Katedra
- Screenshot dan demonstrasi visual fitur

---

### 3. Halaman Harga (`/harga`)
**Lokasi File:** `app/(landing)/harga/page.tsx`

**Deskripsi:**
Halaman yang menampilkan paket berlangganan dan harga layanan Katedra.

**Konten:**
- Tabel perbandingan paket (Gratis, Pro, Enterprise)
- Fitur yang tersedia di setiap paket
- FAQ tentang pembayaran dan langganan
- Tombol untuk memilih paket

---

### 4. Halaman Tentang (`/tentang`)
**Lokasi File:** `app/(landing)/tentang/page.tsx`

**Deskripsi:**
Halaman yang menceritakan tentang Katedra, visi, misi, dan tim di baliknya.

**Konten:**
- Cerita dan latar belakang Katedra
- Visi dan misi perusahaan
- Profil tim pendiri dan developer
- Nilai-nilai yang dianut

---

### 5. Halaman Showcase (`/showcase`)
**Lokasi File:** `app/(landing)/showcase/page.tsx`

**Deskripsi:**
Galeri yang menampilkan contoh hasil dokumen yang dibuat dengan Katedra.

**Konten:**
- Contoh Modul Ajar yang dihasilkan AI
- Contoh RPP lengkap
- Contoh Silabus dan ATP
- Preview interaktif dokumen

---

### 6. Kebijakan Privasi (`/kebijakan-privasi`)
**Lokasi File:** `app/(landing)/kebijakan-privasi/page.tsx`

**Deskripsi:**
Dokumen legal yang menjelaskan bagaimana Katedra menangani data pengguna.

**Konten:**
- Jenis data yang dikumpulkan
- Cara penggunaan data
- Hak-hak pengguna
- Kontak untuk pertanyaan privasi

---

### 7. Syarat dan Ketentuan (`/syarat-ketentuan`)
**Lokasi File:** `app/(landing)/syarat-ketentuan/page.tsx`

**Deskripsi:**
Dokumen legal yang mengatur penggunaan layanan Katedra.

**Konten:**
- Ketentuan penggunaan layanan
- Hak dan kewajiban pengguna
- Batasan tanggung jawab
- Ketentuan pembatalan

---

## Halaman Autentikasi

### 8. Halaman Login (`/login`)
**Lokasi File:** `app/login/page.tsx`

**Deskripsi:**
Halaman untuk pengguna yang sudah terdaftar untuk masuk ke akun mereka.

**Konten:**
- Form input email dan password
- Tombol "Lupa Password"
- Opsi login dengan Google dan Facebook
- Link ke halaman registrasi
- Visual testimonial di sisi kiri (desktop)

**Fitur Debug:**
- Mode bypass login aktif untuk pengembangan
- Tidak ada validasi, langsung redirect ke dashboard

---

### 9. Halaman Register (`/register`)
**Lokasi File:** `app/register/page.tsx`

**Deskripsi:**
Halaman untuk pengguna baru mendaftarkan akun Katedra.

**Konten:**
- Form input nama lengkap
- Form input nama sekolah/institusi
- Form input email
- Form input password dengan validasi
- Checkbox persetujuan syarat dan ketentuan
- Link ke halaman login

**Fitur Debug:**
- Mode bypass registrasi aktif untuk pengembangan

---

### 10. Halaman Lupa Password (`/forgot-password`)
**Lokasi File:** `app/forgot-password/page.tsx`

**Deskripsi:**
Halaman untuk mereset password jika pengguna lupa.

**Konten:**
- Form input email
- Instruksi untuk reset password
- Tombol kirim link reset
- Link kembali ke login

---

## Dashboard Utama

### 11. Dashboard Home (`/dashboard`)
**Lokasi File:** `app/(dashboard)/dashboard/page.tsx`

**Deskripsi:**
Halaman utama setelah login yang memberikan gambaran umum aktivitas pengguna.

**Konten:**
- **Banner Selamat Datang:** Sapaan personal dengan nama pengguna dan statistik penghematan waktu
- **Kartu Statistik:** Total dokumen, jumlah Modul Ajar, RPP, dan Asesmen
- **Quick Actions:** Grid tombol cepat untuk membuat dokumen baru (Modul Ajar, RPP, ATP, Silabus, Asesmen, Bank Soal)
- **Aktivitas Terbaru:** Daftar dokumen yang baru dibuat/diubah dengan status dan waktu
- **Pengingat:** Deadline silabus dan jadwal review mingguan

**Komponen:**
- StatCard dengan icon dan trend
- QuickAction cards dengan hover effect
- ActivityItem untuk riwayat

---

### 12. Halaman Analitik (`/dashboard/analytics`)
**Lokasi File:** `app/(dashboard)/dashboard/analytics/page.tsx`

**Deskripsi:**
Dashboard analitik yang menampilkan statistik penggunaan dan produktivitas.

**Konten:**
- **Kartu Statistik Utama:** Total dokumen, dokumen bulan ini, jam tersimpan, tingkat penyelesaian
- **Grafik Bar:** Aktivitas bulanan selama 6 bulan terakhir
- **Grafik Pie:** Distribusi jenis dokumen (Modul Ajar, RPP, Silabus, ATP, Asesmen)
- **Tabel Dokumen Populer:** Ranking dokumen yang paling sering diakses
- **Filter Periode:** Pilihan 7 hari, 30 hari, 3 bulan, 1 tahun

---

### 13. Halaman Kalender (`/dashboard/calendar`)
**Lokasi File:** `app/(dashboard)/dashboard/calendar/page.tsx`

**Deskripsi:**
Kalender interaktif untuk manajemen jadwal dan deadline.

**Konten:**
- **Tampilan Kalender:** Grid bulanan dengan navigasi bulan sebelum/sesudah
- **Event Markers:** Penanda pada tanggal yang memiliki event
- **Sidebar Event Hari Ini:** Daftar kegiatan untuk tanggal yang dipilih
- **Upcoming Events:** Jadwal mendatang dalam 7 hari ke depan
- **Tombol Tambah Event:** Untuk membuat jadwal baru

**Jenis Event:**
- Deadline dokumen
- Jadwal mengajar
- Rapat guru
- Pengumpulan tugas

---

## Modul Dokumen

### 14. Daftar Modul Ajar (`/dashboard/modul-ajar`)
**Lokasi File:** `app/(dashboard)/dashboard/modul-ajar/page.tsx`

**Deskripsi:**
Halaman daftar semua Modul Ajar yang telah dibuat pengguna.

**Konten:**
- **Header:** Judul "Modul Ajar" dengan tombol "Buat Baru"
- **Statistik:** Total modul, selesai, draft, dengan AI
- **Filter dan Search:** Pencarian berdasarkan judul, filter status
- **Grid Kartu Modul:** Menampilkan setiap modul dengan info mata pelajaran, kelas, fase, dan progress
- **Badge AI:** Penanda jika modul dibuat dengan bantuan AI

---

### 15. Buat Modul Ajar (`/dashboard/modul-ajar/create`)
**Lokasi File:** `app/(dashboard)/dashboard/modul-ajar/create/page.tsx`

**Deskripsi:**
Wizard 5 langkah untuk membuat Modul Ajar baru dengan bantuan AI.

**Langkah-langkah:**
1. **Informasi Umum:** Nama modul, mata pelajaran, kelas, fase, alokasi waktu
2. **Capaian Pembelajaran:** Pilih CP dari database atau input manual
3. **Tujuan Pembelajaran:** Generate TP dari CP atau input manual
4. **Materi & Media:** Tambah materi pembelajaran dan media pendukung
5. **Asesmen:** Pilih jenis asesmen formatif dan sumatif

**Fitur AI:**
- Tombol "Generate dengan AI" di setiap langkah
- Simulasi streaming response
- Preview hasil generate

---

### 16. Detail Modul Ajar (`/dashboard/modul-ajar/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/modul-ajar/[id]/page.tsx`

**Deskripsi:**
Halaman detail lengkap satu Modul Ajar tertentu.

**Konten:**
- **Header:** Judul modul, status, badge AI, tombol edit dan export
- **Info Umum:** Mata pelajaran, kelas, fase, alokasi waktu, tanggal dibuat
- **Capaian Pembelajaran:** Daftar CP yang terkait
- **Tujuan Pembelajaran:** Detail TP dengan indikator
- **Materi Pembelajaran:** Konten materi yang akan diajarkan
- **Media Pembelajaran:** File dan link media pendukung
- **Asesmen:** Jenis asesmen dengan kriteria penilaian
- **Refleksi:** Catatan refleksi guru

---

### 17. Daftar RPP (`/dashboard/rpp`)
**Lokasi File:** `app/(dashboard)/dashboard/rpp/page.tsx`

**Deskripsi:**
Halaman daftar semua Rencana Pelaksanaan Pembelajaran (RPP).

**Konten:**
- **Header:** Judul "Rencana Pelaksanaan Pembelajaran" dengan tombol buat baru
- **Statistik:** Total RPP, selesai, draft
- **Filter:** Berdasarkan mata pelajaran, kelas, status
- **Daftar RPP:** Kartu dengan judul, deskripsi, kelas, durasi, status

---

### 18. Buat RPP (`/dashboard/rpp/create`)
**Lokasi File:** `app/(dashboard)/dashboard/rpp/create/page.tsx`

**Deskripsi:**
Wizard 4 langkah untuk membuat RPP baru.

**Langkah-langkah:**
1. **Identitas:** Nama sekolah, mata pelajaran, kelas, semester, alokasi waktu
2. **Tujuan:** Kompetensi inti, kompetensi dasar, indikator pencapaian
3. **Kegiatan Pembelajaran:** Pendahuluan, inti, penutup dengan durasi masing-masing
4. **Penilaian:** Teknik penilaian, instrumen, rubrik

---

### 19. Detail RPP (`/dashboard/rpp/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/rpp/[id]/page.tsx`

**Deskripsi:**
Halaman detail lengkap satu RPP.

**Konten:**
- Identitas sekolah dan guru
- Kompetensi inti dan dasar
- Tujuan pembelajaran
- Kegiatan pembelajaran (pendahuluan, inti, penutup)
- Penilaian dengan rubrik
- Sumber belajar

---

### 20. Daftar ATP (`/dashboard/atp`)
**Lokasi File:** `app/(dashboard)/dashboard/atp/page.tsx`

**Deskripsi:**
Halaman daftar Alur Tujuan Pembelajaran (ATP).

**Konten:**
- Daftar ATP berdasarkan mata pelajaran
- Visualisasi alur dengan flowchart
- Filter berdasarkan fase dan semester
- Statistik jumlah TP per alur

---

### 21. Buat ATP (`/dashboard/atp/create`)
**Lokasi File:** `app/(dashboard)/dashboard/atp/create/page.tsx`

**Deskripsi:**
Form pembuatan ATP baru dengan builder visual.

**Konten:**
- Input mata pelajaran dan fase
- Builder alur dengan drag-and-drop
- Penambahan TP dengan urutan
- Estimasi durasi per TP

---

### 22. Detail ATP (`/dashboard/atp/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/atp/[id]/page.tsx`

**Deskripsi:**
Tampilan detail ATP dengan visualisasi alur.

**Konten:**
- Flowchart interaktif alur TP
- Detail setiap TP dalam alur
- Estimasi waktu total
- Link ke Modul Ajar terkait

---

### 23. Daftar Silabus (`/dashboard/silabus`)
**Lokasi File:** `app/(dashboard)/dashboard/silabus/page.tsx`

**Deskripsi:**
Halaman daftar semua Silabus yang telah dibuat.

**Konten:**
- Filter berdasarkan semester, mata pelajaran
- Kartu silabus dengan info semester dan total minggu
- Status kelengkapan silabus
- Tombol buat silabus baru

---

### 24. Buat Silabus (`/dashboard/silabus/create`)
**Lokasi File:** `app/(dashboard)/dashboard/silabus/create/page.tsx`

**Deskripsi:**
Form pembuatan Silabus semester.

**Konten:**
- Input informasi umum (sekolah, mata pelajaran, kelas, semester)
- Tabel mingguan dengan kolom:
  - Minggu ke-
  - Materi pokok
  - Kompetensi dasar
  - Indikator
  - Alokasi waktu
- Generate otomatis dengan AI

---

### 25. Detail Silabus (`/dashboard/silabus/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/silabus/[id]/page.tsx`

**Deskripsi:**
Tampilan detail Silabus lengkap.

**Konten:**
- Header dengan info semester
- Tabel breakdown per minggu
- Total jam pelajaran
- Link ke RPP terkait

---

### 26. Daftar LKPD (`/dashboard/lkpd`)
**Lokasi File:** `app/(dashboard)/dashboard/lkpd/page.tsx`

**Deskripsi:**
Halaman daftar Lembar Kerja Peserta Didik (LKPD).

**Konten:**
- Filter berdasarkan tipe (Individu/Kelompok)
- Kartu LKPD dengan preview
- Statistik penggunaan
- Tombol buat LKPD baru

**Jenis LKPD:**
- LKPD Individu
- LKPD Kelompok
- LKPD Praktikum
- LKPD Proyek

---

### 27. Buat LKPD (`/dashboard/lkpd/create`)
**Lokasi File:** `app/(dashboard)/dashboard/lkpd/create/page.tsx`

**Deskripsi:**
Form pembuatan LKPD baru.

**Konten:**
- Pilihan tipe LKPD
- Input tujuan pembelajaran
- Editor soal dan instruksi
- Pengaturan penilaian
- Generate dengan AI

---

## Modul Asesmen

### 28. Daftar Asesmen (`/dashboard/asesmen`)
**Lokasi File:** `app/(dashboard)/dashboard/asesmen/page.tsx`

**Deskripsi:**
Halaman daftar semua asesmen yang telah dibuat.

**Konten:**
- **Tab Filter:** Semua, Formatif, Sumatif
- **Kartu Asesmen:** Judul, tipe, mata pelajaran, jumlah soal, tanggal
- **Statistik:** Total asesmen per tipe
- **Search:** Pencarian berdasarkan judul

---

### 29. Buat Asesmen (`/dashboard/asesmen/create`)
**Lokasi File:** `app/(dashboard)/dashboard/asesmen/create/page.tsx`

**Deskripsi:**
Form pembuatan asesmen dengan berbagai tipe soal.

**Konten:**
- Pilihan tipe asesmen (Formatif/Sumatif)
- Input informasi asesmen
- Builder soal dengan berbagai format:
  - Pilihan ganda
  - Essay
  - Isian singkat
  - Menjodohkan
- Pengaturan skor dan bobot

---

### 30. Detail Asesmen (`/dashboard/asesmen/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/asesmen/[id]/page.tsx`

**Deskripsi:**
Tampilan detail asesmen lengkap.

**Konten:**
- Informasi asesmen
- Daftar soal dengan jawaban
- Rubrik penilaian
- Statistik KKM dan hasil

---

### 31. Daftar Bank Soal (`/dashboard/bank-soal`)
**Lokasi File:** `app/(dashboard)/dashboard/bank-soal/page.tsx`

**Deskripsi:**
Repositori semua soal yang dapat digunakan kembali.

**Konten:**
- **Filter:** Mata pelajaran, tingkat kesulitan, tipe soal
- **Daftar Soal:** Preview soal dengan metadata
- **Statistik:** Jumlah soal per kategori
- **Bulk Actions:** Pilih dan tambahkan ke asesmen

---

### 32. Buat Soal (`/dashboard/bank-soal/create`)
**Lokasi File:** `app/(dashboard)/dashboard/bank-soal/create/page.tsx`

**Deskripsi:**
Form pembuatan soal baru untuk bank soal.

**Konten:**
- Pilihan tipe soal (PG, Essay, Isian)
- Input pertanyaan dengan rich text editor
- Input pilihan jawaban (untuk PG)
- Input kunci jawaban
- Pengaturan tingkat kesulitan (Mudah, Sedang, Sulit)
- Tag mata pelajaran dan topik

---

### 33. Detail Soal (`/dashboard/bank-soal/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/bank-soal/[id]/page.tsx`

**Deskripsi:**
Tampilan detail satu soal dari bank soal.

**Konten:**
- Pertanyaan lengkap
- Pilihan jawaban dengan kunci
- Pembahasan/rasional
- Statistik penggunaan di asesmen
- Tingkat kesulitan dan tag

---

### 34. Daftar Rubrik (`/dashboard/rubrik`)
**Lokasi File:** `app/(dashboard)/dashboard/rubrik/page.tsx`

**Deskripsi:**
Halaman daftar rubrik penilaian yang telah dibuat.

**Konten:**
- Daftar rubrik dengan judul dan deskripsi
- Jumlah kriteria per rubrik
- Statistik penggunaan
- Filter berdasarkan mata pelajaran

---

### 35. Buat Rubrik (`/dashboard/rubrik/create`)
**Lokasi File:** `app/(dashboard)/dashboard/rubrik/create/page.tsx`

**Deskripsi:**
Builder rubrik penilaian dengan format matriks.

**Konten:**
- Input nama dan deskripsi rubrik
- Tabel matriks rubrik:
  - Baris: Kriteria penilaian
  - Kolom: Level (4-3-2-1 atau Sangat Baik-Baik-Cukup-Kurang)
- Pengaturan bobot per kriteria
- Preview rubrik
- Generate AI untuk deskripsi level

---

### 36. Detail Rubrik (`/dashboard/rubrik/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/rubrik/[id]/page.tsx`

**Deskripsi:**
Tampilan detail rubrik lengkap.

**Konten:**
- Tabel matriks rubrik interaktif
- Deskripsi setiap level
- Bobot dan skor maksimal
- Link ke asesmen yang menggunakan rubrik

---

### 37. Daftar Kisi-Kisi (`/dashboard/kisi-kisi`)
**Lokasi File:** `app/(dashboard)/dashboard/kisi-kisi/page.tsx`

**Deskripsi:**
Halaman daftar kisi-kisi ujian/ulangan.

**Konten:**
- Daftar kisi-kisi per ujian
- Info mata pelajaran, kelas, tipe ujian
- Jumlah soal dan TP yang dicakup
- Filter berdasarkan semester

---

### 38. Buat Kisi-Kisi (`/dashboard/kisi-kisi/create`)
**Lokasi File:** `app/(dashboard)/dashboard/kisi-kisi/create/page.tsx`

**Deskripsi:**
Form pembuatan kisi-kisi ujian.

**Konten:**
- Input informasi ujian
- Tabel kisi-kisi dengan kolom:
  - Kompetensi Dasar
  - Materi
  - Indikator
  - Level Kognitif (C1-C6 Bloom's Taxonomy)
  - Nomor Soal
  - Bentuk Soal
- Distribusi tingkat kesulitan
- Generate dengan AI

---

### 39. Detail Kisi-Kisi (`/dashboard/kisi-kisi/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/kisi-kisi/[id]/page.tsx`

**Deskripsi:**
Tampilan detail kisi-kisi lengkap.

**Konten:**
- Tabel kisi-kisi lengkap
- Ringkasan distribusi level kognitif
- Link ke soal-soal terkait
- Export ke Excel/PDF

---

## Modul Kurikulum

### 40. Daftar Capaian Pembelajaran (`/dashboard/capaian-pembelajaran`)
**Lokasi File:** `app/(dashboard)/dashboard/capaian-pembelajaran/page.tsx`

**Deskripsi:**
Database Capaian Pembelajaran sesuai Kurikulum Merdeka.

**Konten:**
- **Filter:** Mata pelajaran, Fase (A-F)
- **Daftar CP:** Elemen, deskripsi, fase
- **Search:** Pencarian kata kunci dalam CP
- **Statistik:** Jumlah CP per fase dan mata pelajaran

---

### 41. Detail Capaian Pembelajaran (`/dashboard/capaian-pembelajaran/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/capaian-pembelajaran/[id]/page.tsx`

**Deskripsi:**
Tampilan detail satu CP dengan breakdown elemen.

**Konten:**
- Deskripsi umum CP
- Elemen-elemen CP
- Tujuan Pembelajaran yang terkait
- Modul Ajar yang menggunakan CP ini

---

### 42. Daftar Tujuan Pembelajaran (`/dashboard/tujuan-pembelajaran`)
**Lokasi File:** `app/(dashboard)/dashboard/tujuan-pembelajaran/page.tsx`

**Deskripsi:**
Halaman daftar Tujuan Pembelajaran yang telah dibuat/digenerate.

**Konten:**
- Daftar TP dengan status (Aktif, Draft, Arsip)
- Koneksi ke CP induk
- Indikator pencapaian
- Filter berdasarkan mata pelajaran dan fase

---

### 43. Buat Tujuan Pembelajaran (`/dashboard/tujuan-pembelajaran/create`)
**Lokasi File:** `app/(dashboard)/dashboard/tujuan-pembelajaran/create/page.tsx`

**Deskripsi:**
Form pembuatan TP baru.

**Konten:**
- Pilih CP induk dari database
- Input tujuan pembelajaran
- Builder indikator pencapaian
- Pengaturan level dan urutan
- Generate dengan AI dari CP

---

### 44. Detail Tujuan Pembelajaran (`/dashboard/tujuan-pembelajaran/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/tujuan-pembelajaran/[id]/page.tsx`

**Deskripsi:**
Tampilan detail TP dengan indikator.

**Konten:**
- Deskripsi TP
- CP induk yang terkait
- Daftar indikator pencapaian
- Modul Ajar dan asesmen terkait

---

### 45. Daftar Materi (`/dashboard/materi`)
**Lokasi File:** `app/(dashboard)/dashboard/materi/page.tsx`

**Deskripsi:**
Perpustakaan materi pembelajaran.

**Konten:**
- **Filter Tipe:** Teks, Video, Gambar, Dokumen
- **Kartu Materi:** Preview, judul, deskripsi, mata pelajaran
- **Search:** Pencarian materi
- **Tombol Upload:** Tambah materi baru

---

### 46. Buat Materi (`/dashboard/materi/create`)
**Lokasi File:** `app/(dashboard)/dashboard/materi/create/page.tsx`

**Deskripsi:**
Form pembuatan/upload materi baru.

**Konten:**
- Pilihan tipe materi
- Upload file atau input URL
- Rich text editor untuk materi teks
- Tag dan kategorisasi
- Link ke TP terkait

---

### 47. Detail Materi (`/dashboard/materi/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/materi/[id]/page.tsx`

**Deskripsi:**
Tampilan detail satu materi pembelajaran.

**Konten:**
- Preview/render materi
- Metadata (tanggal, ukuran file, tipe)
- Penggunaan di Modul Ajar
- Tombol download/edit

---

### 48. Daftar Kegiatan (`/dashboard/kegiatan`)
**Lokasi File:** `app/(dashboard)/dashboard/kegiatan/page.tsx`

**Deskripsi:**
Halaman manajemen kegiatan pembelajaran.

**Konten:**
- Daftar kegiatan per TP
- Status kegiatan (Selesai, Berlangsung, Terjadwal)
- Durasi dan tipe (Individu, Kelompok)
- Timeline view

---

## Modul Media & Tools

### 49. Galeri Media (`/dashboard/media`)
**Lokasi File:** `app/(dashboard)/dashboard/media/page.tsx`

**Deskripsi:**
Perpustakaan media (gambar, video, audio) untuk pembelajaran.

**Konten:**
- **Tampilan:** Grid atau List view
- **Filter:** Tipe media (Gambar, Video, Audio, Dokumen)
- **Kartu Media:** Thumbnail, nama, ukuran, tanggal
- **Bulk Actions:** Pilih dan hapus/download
- **Tombol Upload:** Link ke halaman upload

---

### 50. Upload Media (`/dashboard/media/upload`)
**Lokasi File:** `app/(dashboard)/dashboard/media/upload/page.tsx`

**Deskripsi:**
Halaman untuk mengupload file media.

**Konten:**
- **Drag & Drop Zone:** Area untuk drop file
- **Progress Bar:** Indikator upload per file
- **Preview:** Thumbnail file yang diupload
- **Metadata Form:** Input judul, deskripsi, tag
- **Validasi:** Cek tipe dan ukuran file

---

### 51. Perpustakaan Template (`/dashboard/templates`)
**Lokasi File:** `app/(dashboard)/dashboard/templates/page.tsx`

**Deskripsi:**
Koleksi template siap pakai untuk berbagai dokumen.

**Konten:**
- **Kategori:** Modul Ajar, RPP, Silabus, Asesmen, LKPD
- **Kartu Template:** Preview, judul, rating, jumlah unduhan
- **Filter:** Berdasarkan mata pelajaran dan jenjang
- **Tombol Gunakan:** Salin template ke dokumen baru

---

### 52. File Manager (`/dashboard/files`)
**Lokasi File:** `app/(dashboard)/dashboard/files/page.tsx`

**Deskripsi:**
Manajer file untuk mengorganisir dokumen dan media.

**Konten:**
- **Folder Navigation:** Struktur folder hierarkis
- **Daftar File:** Nama, tipe, ukuran, tanggal modifikasi
- **Actions:** Rename, move, delete, download
- **Quick Access:** File yang sering diakses dan dibintangi
- **Storage Info:** Penggunaan ruang penyimpanan

---

## Modul Manajemen

### 53. Daftar Kelas (`/dashboard/kelas`)
**Lokasi File:** `app/(dashboard)/dashboard/kelas/page.tsx`

**Deskripsi:**
Halaman manajemen kelas yang diajar.

**Konten:**
- **Daftar Kelas:** Kartu per kelas dengan info jenjang dan jumlah siswa
- **Progress:** Bar progress materi per kelas
- **Modul Aktif:** Jumlah modul yang sedang berjalan
- **Filter:** Berdasarkan tahun ajaran dan semester

---

### 54. Detail Kelas (`/dashboard/kelas/[id]`)
**Lokasi File:** `app/(dashboard)/dashboard/kelas/[id]/page.tsx`

**Deskripsi:**
Halaman detail satu kelas tertentu.

**Konten:**
- **Info Kelas:** Nama, jenjang, wali kelas, jumlah siswa
- **Progress Bar:** Visualisasi kemajuan pembelajaran
- **Daftar Modul:** Modul Ajar yang diajarkan di kelas ini
- **Aktivitas Terbaru:** Log kegiatan kelas
- **Statistik:** Rata-rata nilai, kehadiran

---

## Halaman Utilitas

### 55. Pencarian Global (`/dashboard/search`)
**Lokasi File:** `app/(dashboard)/dashboard/search/page.tsx`

**Deskripsi:**
Halaman pencarian di seluruh konten dashboard.

**Konten:**
- **Input Pencarian:** Search bar dengan auto-suggest
- **Filter Tipe:** Modul, RPP, Soal, Materi, dll.
- **Hasil Pencarian:** Dikelompokkan berdasarkan tipe
- **Riwayat Pencarian:** Pencarian terakhir

---

### 56. Notifikasi (`/dashboard/notifications`)
**Lokasi File:** `app/(dashboard)/dashboard/notifications/page.tsx`

**Deskripsi:**
Pusat notifikasi dan pemberitahuan.

**Konten:**
- **Daftar Notifikasi:** Semua notifikasi dengan status baca/belum
- **Filter:** Semua, Belum Dibaca, Penting
- **Tipe Notifikasi:** Deadline, Update sistem, Kolaborasi
- **Actions:** Tandai dibaca, hapus

---

### 57. Profil Pengguna (`/dashboard/profile`)
**Lokasi File:** `app/(dashboard)/dashboard/profile/page.tsx`

**Deskripsi:**
Halaman profil dan informasi akun pengguna.

**Konten:**
- **Avatar dan Info:** Foto, nama, email, sekolah
- **Statistik:** Total dokumen, jam tersimpan, hari aktif
- **Form Edit:** Update nama, sekolah, bio
- **Link ke Pengaturan:** Navigasi ke halaman settings

---

### 58. Pengaturan (`/dashboard/settings`)
**Lokasi File:** `app/(dashboard)/dashboard/settings/page.tsx`

**Deskripsi:**
Pusat pengaturan aplikasi dengan 4 tab.

**Tab Konten:**

1. **Akun:**
   - Ubah email
   - Ubah password
   - Hapus akun

2. **Notifikasi:**
   - Toggle notifikasi email
   - Toggle push notification
   - Toggle ringkasan mingguan
   - Toggle email promosi

3. **Preferensi:**
   - Tema: Terang / Gelap / Sistem (Dark Mode)
   - Bahasa: Indonesia / English

4. **Keamanan:**
   - Autentikasi 2 faktor
   - Sesi login aktif
   - Riwayat login

---

### 59. Pusat Bantuan (`/dashboard/bantuan`)
**Lokasi File:** `app/(dashboard)/dashboard/bantuan/page.tsx`

**Deskripsi:**
Halaman bantuan dan dukungan pengguna.

**Konten:**
- **Search FAQ:** Pencarian pertanyaan umum
- **Kategori Bantuan:** Dokumentasi, Video Tutorial, Hubungi Kami
- **FAQ Accordion:** Pertanyaan yang sering diajukan dengan jawaban
- **Video Tutorial:** Embed video panduan penggunaan
- **Keyboard Shortcuts:** Daftar pintasan keyboard

---

## Rangkuman Statistik

| Kategori | Jumlah Halaman |
|----------|----------------|
| Landing (Publik) | 7 |
| Autentikasi | 3 |
| Dashboard Utama | 3 |
| Modul Dokumen | 13 |
| Modul Asesmen | 12 |
| Modul Kurikulum | 9 |
| Modul Media | 4 |
| Modul Manajemen | 2 |
| Utilitas | 5 |
| **TOTAL** | **58** |

---

## Catatan Teknis

### Status Implementasi
- ✅ Semua halaman list sudah diimplementasi
- ✅ Semua halaman create sudah diimplementasi
- ✅ Semua halaman detail sudah diimplementasi
- ⏳ Halaman edit belum diimplementasi
- ✅ Dark mode sudah terintegrasi
- ✅ Responsive design sudah diterapkan

### Teknologi yang Digunakan
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **Animasi:** Framer Motion
- **Icons:** Lucide React
- **UI Components:** shadcn/ui
- **Tema:** next-themes

---

*Dokumentasi ini diperbarui pada: 7 Januari 2026*
