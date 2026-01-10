// API Response Types
export interface ApiError {
    success: false
    statusCode: number
    message: string
    error: string
    timestamp?: string
    path?: string
}

// User & Auth
export interface User {
    id: string
    email: string
    email_confirmed_at?: string
}

export interface UserProfile {
    id: string
    user_id: string
    nama: string
    nip?: string
    sekolah?: string
    jenjang?: string
    mata_pelajaran?: string[]
    preferences?: UserPreferences
    created_at: string
    updated_at: string
}

export interface UserPreferences {
    theme?: 'light' | 'dark' | 'system'
    language?: 'id' | 'en'
    default_kurikulum?: string
    default_ai_model?: string
}

export interface AuthResponse {
    access_token: string
    refresh_token: string
    user: User
}

// Master Data
export interface Kurikulum {
    id: string
    nama: string
    kode: string
    deskripsi?: string
    aktif: boolean
}

export interface Jenjang {
    id: string
    nama: string
    kode: string
    urutan: number
}

export interface MataPelajaran {
    id: string
    nama: string
    kode?: string
    jenjang?: Jenjang
    kurikulum?: Kurikulum
    deskripsi?: string
}

// Curriculum Planning
export interface CapaianPembelajaran {
    id: string
    elemen: string
    fase: string
    deskripsi: string
    sub_elemen?: string[]
    mapel?: string
}

export interface TujuanPembelajaran {
    id: string
    deskripsi: string
    kelas: string
    alokasi_waktu?: number
    indikator?: string[]
    kata_kerja_operasional?: string
    level_kognitif?: string
    atp_id?: string
    mapel_id?: string
    created_at: string
}

export interface ATP {
    id: string
    judul: string
    fase: string
    kelas: string
    tujuan_pembelajaran?: TujuanPembelajaran[]
    mapel_id?: string
    user_id: string
    created_at: string
    updated_at: string
}

// Document Generation
export interface RPP {
    id: string
    judul: string
    kelas: string
    materi_pokok?: string
    alokasi_waktu?: number
    tujuan_pembelajaran?: string[]
    kegiatan?: KegiatanPembelajaran
    asesmen?: object
    konten_lengkap?: object
    status: 'draft' | 'published'
    mapel_id?: string
    silabus_id?: string
    user_id: string
    created_at: string
    updated_at: string
}

export interface Silabus {
    id: string
    judul: string
    kelas: string
    semester: number
    mapel_id?: string
    konten?: object
    status: 'draft' | 'published'
    user_id: string
    created_at: string
    updated_at: string
}

export interface ModulAjarKegiatan {
    pendahuluan?: string[]
    inti?: string[]
    penutup?: string[]
}

export interface ModulAjarAsesmen {
    formatif?: string
    sumatif?: string
}

export interface ModulAjar {
    id: string
    judul: string
    kelas: string
    topik?: string
    fase?: string
    alokasi_waktu?: number
    capaian_pembelajaran?: string[]
    tujuan_pembelajaran?: string[]
    materi?: object
    media?: object
    kegiatan_pembelajaran?: ModulAjarKegiatan
    asesmen?: ModulAjarAsesmen
    konten_lengkap?: object
    status: 'draft' | 'published'
    mapel_id?: string
    user_id: string
    created_at: string
    updated_at: string
}

export interface LKPD {
    id: string
    judul: string
    kelas: string
    jenis_kegiatan: 'individu' | 'kelompok' | 'praktikum'
    kompetensi_dasar?: string
    tujuan_pembelajaran?: string[]
    petunjuk?: string
    langkah_kegiatan?: string[]
    soal?: object
    konten?: object
    mapel_id?: string
    user_id: string
    created_at: string
    updated_at: string
}

export interface KegiatanPembelajaran {
    pendahuluan?: KegiatanItem[]
    inti?: KegiatanItem[]
    penutup?: KegiatanItem[]
}

export interface KegiatanItem {
    fase: 'pendahuluan' | 'inti' | 'penutup'
    durasi: number
    langkah: string[]
    metode?: string
}

// Assessment
export type TipeSoal = 'pilihan_ganda' | 'essay' | 'isian_singkat' | 'benar_salah' | 'menjodohkan'
export type TingkatKesulitan = 'mudah' | 'sedang' | 'sulit'

export interface BankSoal {
    id: string
    tipe: TipeSoal
    tingkat_kesulitan: TingkatKesulitan
    pertanyaan: string
    pilihan?: PilihanJawaban[]
    jawaban_benar: string
    pembahasan?: string
    mapel_id?: string
    kd_id?: string
    user_id: string
    created_at: string
}

export interface PilihanJawaban {
    label: string
    text: string
}

export interface BankSoalStatistics {
    total: number
    by_tipe: Record<TipeSoal, number>
    by_tingkat: Record<TingkatKesulitan, number>
}

export interface Asesmen {
    id: string
    judul: string
    jenis: 'diagnostik' | 'formatif' | 'sumatif'
    kelas: string
    status: 'draft' | 'published'
    kriteria_ketercapaian?: object[]
    soal?: BankSoal[]
    mapel_id?: string
    user_id: string
    created_at: string
    updated_at: string
}

export interface Rubrik {
    id: string
    judul: string
    jenis_penilaian: 'sikap' | 'pengetahuan' | 'keterampilan' | 'proyek' | 'portofolio'
    skala: '1-4' | '1-100' | 'A-E'
    kriteria?: KriteriaRubrik[]
    konten?: object
    kelas?: string
    mapel_id?: string
    user_id: string
    created_at: string
    updated_at: string
}

export interface KriteriaRubrik {
    aspek: string
    bobot: number
    deskriptor: Record<string, string>
}

export interface KisiKisi {
    id: string
    judul: string
    jenis_ujian: 'Ulangan Harian' | 'PTS' | 'PAS' | 'PAT'
    kelas: string
    indikator_soal?: IndikatorSoal[]
    mapel_id?: string
    user_id: string
    created_at: string
    updated_at: string
}

export interface IndikatorSoal {
    kompetensi_dasar: string
    materi: string
    indikator: string
    level_kognitif: 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6'
    nomor_soal: number[]
}

// Teaching Materials
export interface Materi {
    id: string
    judul: string
    kelas: string
    bab?: string
    ringkasan?: string
    poin_penting?: string[]
    kata_kunci?: string[]
    konten?: object
    mapel_id?: string
    user_id: string
    created_at: string
    updated_at: string
}

export interface Media {
    id: string
    judul: string
    jenis: 'video' | 'gambar' | 'audio' | 'interaktif' | 'dokumen'
    url?: string
    deskripsi?: string
    topik?: string[]
    kelas?: string[]
    mapel_id?: string
    user_id: string
    created_at: string
}

export interface MediaStatistics {
    total: number
    by_jenis: Record<string, number>
}

// Templates
export interface Template {
    id: string
    judul: string
    tipe: 'rpp' | 'modul_ajar' | 'silabus' | 'lkpd' | 'asesmen'
    deskripsi?: string
    konten: object
    is_system: boolean
    usage_count: number
    user_id?: string
    created_at: string
}

// Export
export interface ExportRequest {
    document_id?: string
    document_type: 'rpp' | 'silabus' | 'modul_ajar' | 'lkpd' | 'kisi_kisi' | 'bank_soal' | 'rubrik' | 'tujuan_pembelajaran' | 'atp' | 'materi' | 'asesmen' | 'bank-soal'
    format: 'pdf' | 'docx'
}

export interface ExportResponse {
    download_url: string
    filename: string
    format: 'pdf' | 'docx'
    size: number
    expires_at: string
}

// AI
export interface AIGenerateRequest {
    mapel: string
    topik: string
    kelas: string
    kurikulum?: string
    alokasi_waktu?: number
    model?: string
    save_to_db?: boolean
}

export interface AIResponse {
    model: string
    usage: {
        promptTokens: number
        completionTokens: number
        totalTokens: number
    }
}

// Pagination
export interface PaginationParams {
    limit?: number
    offset?: number
    search?: string
    mapel_id?: string
    kelas?: string
    status?: string
}
