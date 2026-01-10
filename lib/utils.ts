import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AIGenerateRequest } from "@/types/database"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructPrompt(type: string, input: AIGenerateRequest & Record<string, any>): string {
  const baseInfo = `Mata Pelajaran: ${input.mapel}, Kelas: ${input.kelas}, Topik: ${input.topik}`

  switch (type) {
    case 'modul_ajar':
      return `Buatkan Modul Ajar Kurikulum Merdeka yang lengkap dan detail untuk ${baseInfo}. 
      Sertakan: 
      1. Informasi Umum (Identitas, Kompetensi Awal, Profil Pelajar Pancasila)
      2. Komponen Inti (Tujuan, Pemahaman Bermakna, Pertanyaan Pemantik)
      3. Kegiatan Pembelajaran (Pendahuluan, Inti, Penutup)
      4. Asesmen dan Lampiran.
      Format output dalam Markdown.`

    case 'rpp':
      return `Buatkan Rencana Pelaksanaan Pembelajaran (RPP) untuk ${baseInfo}.
      Fokus pada tujuan pembelajaran, langkah-langkah kegiatan (pendahuluan, inti, penutup), dan penilaian.
      Format output dalam Markdown.`

    case 'silabus':
      return `Buatkan Silabus Pembelajaran untuk ${baseInfo}, Semester ${input.semester || 'Ganjil'}.
      Termasuk Kompetensi Dasar/Capaian Pembelajaran, Materi Pokok, dan Alokasi Waktu.
      Format output dalam Markdown.`

    case 'lkpd':
      return `Buatkan Lembar Kerja Peserta Didik (LKPD) untuk ${baseInfo}.
      Jenis Kegiatan: ${input.jenis_kegiatan || 'Individu'}.
      Sertakan Judul, Identitas, Petunjuk Belajar, Tugas/Langkah Kerja, dan Penilaian.
      Format output dalam Markdown.`

    case 'atp':
      return `Susun Alur Tujuan Pembelajaran (ATP) untuk ${baseInfo}.
      Fase: ${input.fase || 'sesuaikan kelas'}.
      Urutan logis dari mudah ke sulit. Sertakan perkiraan jam pelajaran.
      Format output dalam Markdown.`

    case 'asesmen':
      return `Buatkan Instrumen Asesmen (${input.jenis || 'Formatif'}) untuk ${baseInfo}.
      Sertakan kisi-kisi, indikator, dan rubrik penilaian sederhana.
      Format output dalam Markdown.`

    case 'bank_soal':
      return `Buatkan ${input.jumlah || 10} soal ${input.tipe || 'Pilihan Ganda'} untuk ${baseInfo}.
      Tingkat Kesulitan: ${input.tingkat_kesulitan || 'Sedang'}.
      Sertakan kunci jawaban dan pembahasan.
      Format output dalam Markdown.`

    case 'rubrik':
      return `Buatkan Rubrik Penilaian untuk ${baseInfo}.
      Jenis: ${input.jenis_penilaian || 'Proyek'}. Skala: ${input.skala || '1-4'}.
      Format tabel dalam Markdown.`

    case 'kisi_kisi':
      return `Buatkan Kisi-Kisi Soal untuk ${baseInfo}.
      Jenis Ujian: ${input.jenis_ujian || 'Ulangan Harian'}. Jumlah Soal: ${input.jumlah_soal}.
      Format tabel dalam Markdown.`

    case 'materi':
      return `Buatkan Materi Ajar / Rangkuman Materi yang menarik dan mudah dipahami siswa untuk ${baseInfo}.
      Gunakan bahasa yang sesuai usia siswa. Gunakan analogi jika perlu.
      Format output dalam Markdown.`

    default:
      return `Buatkan dokumen ${type} untuk ${baseInfo}. Format Markdown.`
  }
}
