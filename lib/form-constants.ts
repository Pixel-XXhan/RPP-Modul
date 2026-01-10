/**
 * Form Constants - Data Kurikulum Merdeka 2024
 * Berdasarkan Permendikbudristek No. 12 Tahun 2024 dan
 * Keputusan Kepala BSKAP No. 032/H/KR/2024
 */

// ========================================
// JENJANG PENDIDIKAN
// ========================================
export const JENJANG_OPTIONS = [
    { value: 'sd', label: 'SD/MI' },
    { value: 'smp', label: 'SMP/MTs' },
    { value: 'sma', label: 'SMA/MA' },
    { value: 'smk', label: 'SMK/MAK' },
] as const

// ========================================
// FASE KURIKULUM MERDEKA
// ========================================
export const FASE_OPTIONS = [
    { value: 'A', label: 'Fase A (SD Kelas 1-2)', jenjang: 'sd' },
    { value: 'B', label: 'Fase B (SD Kelas 3-4)', jenjang: 'sd' },
    { value: 'C', label: 'Fase C (SD Kelas 5-6)', jenjang: 'sd' },
    { value: 'D', label: 'Fase D (SMP Kelas 7-9)', jenjang: 'smp' },
    { value: 'E', label: 'Fase E (SMA/SMK Kelas 10)', jenjang: ['sma', 'smk'] },
    { value: 'F', label: 'Fase F (SMA/SMK Kelas 11-12)', jenjang: ['sma', 'smk'] },
] as const

// ========================================
// KELAS PER JENJANG
// ========================================
export const KELAS_OPTIONS = {
    sd: [
        { value: '1', label: 'Kelas 1' },
        { value: '2', label: 'Kelas 2' },
        { value: '3', label: 'Kelas 3' },
        { value: '4', label: 'Kelas 4' },
        { value: '5', label: 'Kelas 5' },
        { value: '6', label: 'Kelas 6' },
    ],
    smp: [
        { value: '7', label: 'Kelas 7' },
        { value: '8', label: 'Kelas 8' },
        { value: '9', label: 'Kelas 9' },
    ],
    sma: [
        { value: '10', label: 'Kelas 10' },
        { value: '11', label: 'Kelas 11' },
        { value: '12', label: 'Kelas 12' },
    ],
    smk: [
        { value: 'X', label: 'Kelas X' },
        { value: 'XI', label: 'Kelas XI' },
        { value: 'XII', label: 'Kelas XII' },
    ],
} as const

// ========================================
// SEMESTER
// ========================================
export const SEMESTER_OPTIONS = [
    { value: '1', label: 'Semester 1 (Ganjil)' },
    { value: '2', label: 'Semester 2 (Genap)' },
] as const

// ========================================
// BIDANG KEAHLIAN SMK (Spektrum 2024)
// Berdasarkan Kepmendikbudristek No. 244/M/2024
// ========================================
export const BIDANG_KEAHLIAN_SMK = [
    { value: 'teknologi-informasi', label: 'Teknologi Informasi' },
    { value: 'teknologi-konstruksi', label: 'Teknologi Konstruksi dan Bangunan' },
    { value: 'teknologi-manufaktur', label: 'Teknologi Manufaktur dan Rekayasa' },
    { value: 'energi-pertambangan', label: 'Energi dan Pertambangan' },
    { value: 'kesehatan', label: 'Kesehatan dan Pekerjaan Sosial' },
    { value: 'agribisnis', label: 'Agribisnis dan Agriteknologi' },
    { value: 'kemaritiman', label: 'Kemaritiman' },
    { value: 'bisnis-manajemen', label: 'Bisnis dan Manajemen' },
    { value: 'pariwisata', label: 'Pariwisata' },
    { value: 'seni-kreatif', label: 'Seni dan Ekonomi Kreatif' },
] as const

// ========================================
// PROGRAM KEAHLIAN & KONSENTRASI SMK
// ========================================
export const PROGRAM_KEAHLIAN_SMK = {
    'teknologi-informasi': [
        {
            value: 'pplg',
            label: 'Pengembangan Perangkat Lunak dan Gim',
            konsentrasi: [
                { value: 'rpl', label: 'Rekayasa Perangkat Lunak' },
                { value: 'game-dev', label: 'Pengembangan Game' },
            ]
        },
        {
            value: 'tjkt',
            label: 'Teknik Jaringan Komputer dan Telekomunikasi',
            konsentrasi: [
                { value: 'tkj', label: 'Teknik Komputer dan Jaringan' },
                { value: 'telekomunikasi', label: 'Teknik Telekomunikasi' },
            ]
        },
    ],
    'teknologi-konstruksi': [
        {
            value: 'dpib',
            label: 'Desain Pemodelan dan Informasi Bangunan',
            konsentrasi: [
                { value: 'dpib', label: 'DPIB' },
            ]
        },
        {
            value: 'konstruksi-sipil',
            label: 'Konstruksi dan Perawatan Bangunan Sipil',
            konsentrasi: [
                { value: 'kji', label: 'Konstruksi Jalan, Irigasi, dan Jembatan' },
            ]
        },
    ],
    'teknologi-manufaktur': [
        {
            value: 'teknik-mesin',
            label: 'Teknik Mesin',
            konsentrasi: [
                { value: 'permesinan', label: 'Teknik Permesinan' },
                { value: 'mekanik-industri', label: 'Teknik Mekanik Industri' },
                { value: 'pengecoran', label: 'Teknik Pengecoran Logam' },
                { value: 'gambar-mesin', label: 'Desain Gambar Mesin' },
            ]
        },
        {
            value: 'teknik-otomotif',
            label: 'Teknik Otomotif',
            konsentrasi: [
                { value: 'tkro', label: 'Teknik Kendaraan Ringan Otomotif' },
                { value: 'tbsm', label: 'Teknik dan Bisnis Sepeda Motor' },
                { value: 'tbo', label: 'Teknik Bodi Otomotif' },
            ]
        },
        {
            value: 'teknik-elektronika',
            label: 'Teknik Elektronika',
            konsentrasi: [
                { value: 'elektronika-industri', label: 'Teknik Elektronika Industri' },
                { value: 'mekatronika', label: 'Teknik Mekatronika' },
            ]
        },
    ],
    'bisnis-manajemen': [
        {
            value: 'akuntansi',
            label: 'Akuntansi dan Keuangan Lembaga',
            konsentrasi: [
                { value: 'akl', label: 'Akuntansi dan Keuangan Lembaga' },
            ]
        },
        {
            value: 'perkantoran',
            label: 'Manajemen Perkantoran',
            konsentrasi: [
                { value: 'otkp', label: 'Otomatisasi Tata Kelola Perkantoran' },
            ]
        },
        {
            value: 'pemasaran',
            label: 'Pemasaran',
            konsentrasi: [
                { value: 'bdp', label: 'Bisnis Daring dan Pemasaran' },
                { value: 'bisnis-digital', label: 'Bisnis Digital' },
            ]
        },
    ],
    'seni-kreatif': [
        {
            value: 'dkv',
            label: 'Desain Komunikasi Visual',
            konsentrasi: [
                { value: 'dkv', label: 'Desain Komunikasi Visual' },
            ]
        },
        {
            value: 'multimedia',
            label: 'Broadcasting dan Perfilman',
            konsentrasi: [
                { value: 'pspt', label: 'Produksi dan Siaran Program Televisi' },
                { value: 'mm', label: 'Multimedia' },
            ]
        },
        {
            value: 'animasi',
            label: 'Animasi',
            konsentrasi: [
                { value: 'animasi', label: 'Animasi' },
            ]
        },
        {
            value: 'busana',
            label: 'Busana',
            konsentrasi: [
                { value: 'dpb', label: 'Desain dan Produksi Busana' },
            ]
        },
    ],
    'kesehatan': [
        {
            value: 'keperawatan',
            label: 'Keperawatan',
            konsentrasi: [
                { value: 'asisten-keperawatan', label: 'Asisten Keperawatan' },
            ]
        },
        {
            value: 'farmasi',
            label: 'Farmasi',
            konsentrasi: [
                { value: 'farmasi-klinis', label: 'Farmasi Klinis dan Komunitas' },
            ]
        },
    ],
    'pariwisata': [
        {
            value: 'perhotelan',
            label: 'Perhotelan',
            konsentrasi: [
                { value: 'hotel', label: 'Perhotelan' },
            ]
        },
        {
            value: 'kuliner',
            label: 'Kuliner',
            konsentrasi: [
                { value: 'tata-boga', label: 'Tata Boga' },
            ]
        },
        {
            value: 'kecantikan',
            label: 'Kecantikan dan Spa',
            konsentrasi: [
                { value: 'tkkr', label: 'Tata Kecantikan Kulit dan Rambut' },
            ]
        },
    ],
    'agribisnis': [
        {
            value: 'agribisnis-tanaman',
            label: 'Agribisnis Tanaman',
            konsentrasi: [
                { value: 'atph', label: 'Agribisnis Tanaman Pangan dan Hortikultura' },
            ]
        },
        {
            value: 'agribisnis-perikanan',
            label: 'Agribisnis Perikanan',
            konsentrasi: [
                { value: 'perikanan', label: 'Agribisnis Perikanan Payau dan Laut' },
            ]
        },
    ],
    'energi-pertambangan': [
        {
            value: 'ketenagalistrikan',
            label: 'Teknik Ketenagalistrikan',
            konsentrasi: [
                { value: 'listrik', label: 'Teknik Instalasi Tenaga Listrik' },
            ]
        },
    ],
    'kemaritiman': [
        {
            value: 'nautika',
            label: 'Nautika Kapal',
            konsentrasi: [
                { value: 'nautika', label: 'Nautika Kapal Penangkap Ikan' },
            ]
        },
    ],
} as const

// ========================================
// MATA PELAJARAN UMUM (Semua Jenjang)
// ========================================
export const MAPEL_UMUM = [
    { value: 'pai', label: 'Pendidikan Agama Islam dan Budi Pekerti' },
    { value: 'ppkn', label: 'Pendidikan Pancasila' },
    { value: 'bahasa-indonesia', label: 'Bahasa Indonesia' },
    { value: 'matematika', label: 'Matematika' },
    { value: 'bahasa-inggris', label: 'Bahasa Inggris' },
    { value: 'pjok', label: 'Pendidikan Jasmani, Olahraga, dan Kesehatan' },
    { value: 'sejarah', label: 'Sejarah Indonesia' },
    { value: 'seni-budaya', label: 'Seni dan Budaya' },
] as const

// ========================================
// MATA PELAJARAN PER JENJANG
// ========================================
export const MAPEL_SD = [
    { value: 'pai', label: 'Pendidikan Agama Islam dan Budi Pekerti' },
    { value: 'ppkn', label: 'Pendidikan Pancasila' },
    { value: 'bahasa-indonesia', label: 'Bahasa Indonesia' },
    { value: 'matematika', label: 'Matematika' },
    { value: 'ipas', label: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)' },
    { value: 'pjok', label: 'PJOK' },
    { value: 'seni-budaya', label: 'Seni dan Budaya' },
    { value: 'bahasa-inggris', label: 'Bahasa Inggris' },
    { value: 'muatan-lokal', label: 'Muatan Lokal' },
] as const

export const MAPEL_SMP = [
    { value: 'pai', label: 'Pendidikan Agama Islam dan Budi Pekerti' },
    { value: 'ppkn', label: 'Pendidikan Pancasila' },
    { value: 'bahasa-indonesia', label: 'Bahasa Indonesia' },
    { value: 'matematika', label: 'Matematika' },
    { value: 'bahasa-inggris', label: 'Bahasa Inggris' },
    { value: 'ipas', label: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)' },
    { value: 'pjok', label: 'PJOK' },
    { value: 'informatika', label: 'Informatika' },
    { value: 'seni-budaya', label: 'Seni dan Budaya' },
    { value: 'prakarya', label: 'Prakarya' },
    { value: 'muatan-lokal', label: 'Muatan Lokal' },
] as const

export const MAPEL_SMA = [
    // Umum
    { value: 'pai', label: 'Pendidikan Agama Islam dan Budi Pekerti', kategori: 'umum' },
    { value: 'ppkn', label: 'Pendidikan Pancasila', kategori: 'umum' },
    { value: 'bahasa-indonesia', label: 'Bahasa Indonesia', kategori: 'umum' },
    { value: 'matematika', label: 'Matematika', kategori: 'umum' },
    { value: 'bahasa-inggris', label: 'Bahasa Inggris', kategori: 'umum' },
    { value: 'sejarah', label: 'Sejarah Indonesia', kategori: 'umum' },
    { value: 'pjok', label: 'PJOK', kategori: 'umum' },
    { value: 'seni-budaya', label: 'Seni dan Budaya', kategori: 'umum' },
    // MIPA
    { value: 'fisika', label: 'Fisika', kategori: 'mipa' },
    { value: 'kimia', label: 'Kimia', kategori: 'mipa' },
    { value: 'biologi', label: 'Biologi', kategori: 'mipa' },
    { value: 'informatika', label: 'Informatika', kategori: 'mipa' },
    // IPS
    { value: 'ekonomi', label: 'Ekonomi', kategori: 'ips' },
    { value: 'sosiologi', label: 'Sosiologi', kategori: 'ips' },
    { value: 'geografi', label: 'Geografi', kategori: 'ips' },
    { value: 'antropologi', label: 'Antropologi', kategori: 'ips' },
    // Bahasa
    { value: 'sastra-indonesia', label: 'Bahasa dan Sastra Indonesia', kategori: 'bahasa' },
    { value: 'sastra-inggris', label: 'Bahasa dan Sastra Inggris', kategori: 'bahasa' },
    { value: 'bahasa-jepang', label: 'Bahasa Jepang', kategori: 'bahasa' },
    { value: 'bahasa-mandarin', label: 'Bahasa Mandarin', kategori: 'bahasa' },
    { value: 'bahasa-arab', label: 'Bahasa Arab', kategori: 'bahasa' },
] as const

// ========================================
// MATA PELAJARAN SMK - UMUM
// ========================================
export const MAPEL_SMK_UMUM = [
    { value: 'pai', label: 'Pendidikan Agama Islam dan Budi Pekerti' },
    { value: 'ppkn', label: 'Pendidikan Pancasila' },
    { value: 'bahasa-indonesia', label: 'Bahasa Indonesia' },
    { value: 'pjok', label: 'PJOK' },
    { value: 'sejarah', label: 'Sejarah' },
    { value: 'seni-budaya', label: 'Seni Budaya' },
] as const

// ========================================
// MATA PELAJARAN KEJURUAN SMK (Fase E & F)
// ========================================
export const MAPEL_SMK_KEJURUAN = [
    { value: 'matematika', label: 'Matematika' },
    { value: 'bahasa-inggris', label: 'Bahasa Inggris' },
    { value: 'informatika', label: 'Informatika' },
    { value: 'projek-ipas', label: 'Projek Ilmu Pengetahuan Alam dan Sosial' },
    { value: 'dasar-program', label: 'Dasar-Dasar Program Keahlian' },
    { value: 'konsentrasi', label: 'Konsentrasi Keahlian' },
    { value: 'pkk', label: 'Projek Kreatif dan Kewirausahaan' },
    { value: 'pkl', label: 'Praktik Kerja Lapangan' },
] as const

// ========================================
// MATA PELAJARAN PRODUKTIF PPLG
// ========================================
export const MAPEL_PPLG = [
    // Fase E (Kelas X) - Dasar-dasar
    { value: 'dasar-pplg', label: 'Dasar-Dasar Pengembangan Perangkat Lunak dan Gim', fase: 'E' },
    // Fase F (Kelas XI-XII) - Konsentrasi
    { value: 'pemrograman-web', label: 'Pemrograman Web', fase: 'F' },
    { value: 'pbo', label: 'Pemrograman Berorientasi Objek', fase: 'F' },
    { value: 'basis-data', label: 'Basis Data', fase: 'F' },
    { value: 'pemrograman-mobile', label: 'Pemrograman Perangkat Bergerak', fase: 'F' },
    { value: 'game-2d', label: 'Pengembangan Game 2D', fase: 'F' },
    { value: 'game-3d', label: 'Pengembangan Game 3D', fase: 'F' },
    { value: 'ui-ux', label: 'UI/UX Design', fase: 'F' },
    { value: 'data-science', label: 'Data Science', fase: 'F' },
    { value: 'iot', label: 'Internet of Things', fase: 'F' },
] as const

// ========================================
// MATA PELAJARAN PRODUKTIF TKJ
// ========================================
export const MAPEL_TKJ = [
    // Fase E (Kelas X)
    { value: 'dasar-tjkt', label: 'Dasar-Dasar Teknik Jaringan Komputer dan Telekomunikasi', fase: 'E' },
    // Fase F (Kelas XI-XII)
    { value: 'administrasi-infrastruktur', label: 'Administrasi Infrastruktur Jaringan', fase: 'F' },
    { value: 'teknologi-layanan', label: 'Teknologi Layanan Jaringan', fase: 'F' },
    { value: 'wan', label: 'Teknologi Wide Area Network', fase: 'F' },
    { value: 'keamanan-jaringan', label: 'Keamanan Jaringan', fase: 'F' },
    { value: 'administrasi-sistem', label: 'Administrasi Sistem Jaringan', fase: 'F' },
] as const

// ========================================
// KURIKULUM OPTIONS
// ========================================
export const KURIKULUM_OPTIONS = [
    { value: 'merdeka', label: 'Kurikulum Merdeka' },
    { value: 'merdeka-2024', label: 'Kurikulum Merdeka 2024' },
    { value: 'k13', label: 'Kurikulum 2013 (Legacy)' },
] as const

// ========================================
// AI MODEL OPTIONS
// Verified from backend: gemini/dto/chat.dto.ts and openrouter/dto/chat.dto.ts
// ========================================

// Gemini Models (Direct API via Google AI SDK)
export const GEMINI_MODELS = [
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Cepat)', provider: 'gemini' },
    { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Context Besar)', provider: 'gemini' },
    { value: 'gemini-3-flash-preview', label: 'Gemini 3 Flash (Thinking)', provider: 'gemini' },
    { value: 'gemini-3-pro-preview', label: 'Gemini 3 Pro (Flagship)', provider: 'gemini' },
] as const

// OpenRouter Models (Claude Opus, GPT-5.2)
export const OPENROUTER_MODELS = [
    { value: 'anthropic/claude-opus-4.5', label: 'Claude Opus 4.5 (Paling Pintar)', provider: 'openrouter' },
    { value: 'anthropic/claude-sonnet-4.5', label: 'Claude Sonnet 4.5 (Agentic)', provider: 'openrouter' },
    { value: 'openai/gpt-5.2', label: 'GPT-5.2 (Flagship)', provider: 'openrouter' },
    { value: 'openai/gpt-5.2-pro', label: 'GPT-5.2 Pro (High Throughput)', provider: 'openrouter' },
    { value: 'openai/gpt-5.2-chat', label: 'GPT-5.2 Chat (Conversational)', provider: 'openrouter' },
] as const

// Combined for dropdown (Gemini first as default provider)
export const AI_MODEL_OPTIONS = [
    // Gemini - Fast options first
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Cepat & Murah)', provider: 'gemini', recommended: true },
    { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Context 1M Token)', provider: 'gemini' },
    { value: 'gemini-3-flash-preview', label: 'Gemini 3 Flash (Thinking Mode)', provider: 'gemini' },
    { value: 'gemini-3-pro-preview', label: 'Gemini 3 Pro (Flagship Reasoning)', provider: 'gemini' },
    // OpenRouter - Premium options
    { value: 'anthropic/claude-opus-4.5', label: 'Claude Opus 4.5 (Terpintar)', provider: 'openrouter', premium: true },
    { value: 'anthropic/claude-sonnet-4.5', label: 'Claude Sonnet 4.5 (Agentic)', provider: 'openrouter', premium: true },
    { value: 'openai/gpt-5.2', label: 'GPT-5.2 (OpenAI Flagship)', provider: 'openrouter', premium: true },
    { value: 'openai/gpt-5.2-pro', label: 'GPT-5.2 Pro (High Throughput)', provider: 'openrouter', premium: true },
] as const

// Provider type for routing
export type AIProvider = 'gemini' | 'openrouter'

// Helper to get provider from model value
export function getProviderFromModel(modelValue: string): AIProvider {
    if (modelValue.includes('/')) return 'openrouter'
    return 'gemini'
}

// ========================================
// EXPORT FORMAT OPTIONS
// ========================================
export const EXPORT_FORMAT_OPTIONS = [
    { value: 'pdf', label: 'PDF Document (.pdf)' },
    { value: 'docx', label: 'Word Document (.docx)' },
] as const

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get mata pelajaran based on jenjang
 */
export function getMapelByJenjang(jenjang: string) {
    switch (jenjang) {
        case 'sd':
            return MAPEL_SD
        case 'smp':
            return MAPEL_SMP
        case 'sma':
            return MAPEL_SMA
        case 'smk':
            return [...MAPEL_SMK_UMUM, ...MAPEL_SMK_KEJURUAN]
        default:
            return MAPEL_UMUM
    }
}

/**
 * Get kelas options based on jenjang
 */
export function getKelasByJenjang(jenjang: string) {
    return KELAS_OPTIONS[jenjang as keyof typeof KELAS_OPTIONS] || []
}

/**
 * Get program keahlian based on bidang keahlian
 */
export function getProgramByBidang(bidang: string) {
    return PROGRAM_KEAHLIAN_SMK[bidang as keyof typeof PROGRAM_KEAHLIAN_SMK] || []
}

/**
 * Get fase based on jenjang and kelas
 */
export function getFase(jenjang: string, kelas: string): string {
    if (jenjang === 'sd') {
        if (['1', '2'].includes(kelas)) return 'A'
        if (['3', '4'].includes(kelas)) return 'B'
        return 'C'
    }
    if (jenjang === 'smp') return 'D'
    if (['sma', 'smk'].includes(jenjang)) {
        if (['10', 'X'].includes(kelas)) return 'E'
        return 'F'
    }
    return 'D'
}

/**
 * Get mapel produktif for SMK based on program keahlian
 */
export function getMapelProduktif(programKeahlian: string) {
    switch (programKeahlian) {
        case 'pplg':
            return MAPEL_PPLG
        case 'tjkt':
            return MAPEL_TKJ
        default:
            return []
    }
}
