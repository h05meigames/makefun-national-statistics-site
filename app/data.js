// DataNusa: angka-angka Indonesia. Setiap angka dibulatkan dan diberi sumber + tahun di halaman yang
// menampilkannya. Sumber utama: Badan Pusat Statistik (BPS) dan Bank Indonesia (BI). Angka estimasi
// penduduk adalah estimasi pertengahan tahun BPS; angka sensus ditandai sebagai sensus.

export const META = {
  country: 'Indonesia',
  updated: 'November 2026',
  note: 'Angka dibulatkan. Bukan situs resmi pemerintah.',
};

export const OVERVIEW = [
  { label: 'Penduduk', value: '281,6 jt', sub: 'estimasi pertengahan 2024', source: 'BPS 2024', page: '#/penduduk' },
  { label: 'PDB', value: 'Rp22.139 T', sub: 'harga berlaku, 2024', source: 'BPS 2024', page: '#/ekonomi' },
  { label: 'Pertumbuhan PDB', value: '5,03%', sub: 'tahun 2024 (y-on-y)', source: 'BPS 2024', page: '#/ekonomi' },
  { label: 'Inflasi', value: '1,57%', sub: 'Des 2024 (y-on-y)', source: 'BPS 2024', page: '#/ekonomi' },
  { label: 'Pengangguran', value: '4,91%', sub: 'Agustus 2024 (TPT)', source: 'BPS 2024', page: '#/ekonomi' },
  { label: 'Kemiskinan', value: '9,03%', sub: 'Maret 2024', source: 'BPS 2024', page: '#/sosial' },
  { label: 'Angkatan kerja', value: '149,38 jt', sub: 'Agustus 2024', source: 'BPS 2024', page: '#/ekonomi' },
  { label: 'Penduduk miskin', value: '25,22 jt', sub: 'Maret 2024', source: 'BPS 2024', page: '#/sosial' },
];

// Penduduk per tahun, juta jiwa. 2010 dan 2020 sensus; lainnya estimasi pertengahan tahun BPS.
export const POPULATION_SERIES = [
  { year: 2010, value: 237.6, note: 'Sensus' },
  { year: 2015, value: 255.5, note: 'SUPAS' },
  { year: 2020, value: 270.2, note: 'Sensus' },
  { year: 2021, value: 272.7, note: '' },
  { year: 2022, value: 275.8, note: '' },
  { year: 2023, value: 278.7, note: '' },
  { year: 2024, value: 281.6, note: '' },
];

// Struktur umur 2024, persen dari penduduk (BPS, dibulatkan).
export const AGE_GROUPS = [
  { group: 'Anak (0–14 tahun)', pct: 24 },
  { group: 'Produktif (15–64 tahun)', pct: 69 },
  { group: 'Lansia (65+ tahun)', pct: 7 },
];

// Pertumbuhan PDB tahunan, persen (BPS).
export const GDP_GROWTH = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// Pertumbuhan PDB per triwulan 2024, persen y-on-y (BPS).
export const GDP_QUARTERS_2024 = [
  { q: 'Triwulan I', value: 5.11 },
  { q: 'Triwulan II', value: 5.05 },
  { q: 'Triwulan III', value: 4.95 },
  { q: 'Triwulan IV', value: 5.02 },
];

// Inflasi Desember y-on-y, persen (BPS).
export const INFLATION = [
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Tingkat Pengangguran Terbuka Agustus, persen (BPS).
export const UNEMPLOYMENT = [
  { year: 2019, value: 5.28 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

// Pangsa lapangan usaha terhadap PDB 2024, persen (BPS, dibulatkan).
export const GDP_SECTORS = [
  { sector: 'Industri pengolahan', pct: 18.7 },
  { sector: 'Perdagangan', pct: 12.9 },
  { sector: 'Pertanian, kehutanan, perikanan', pct: 12.3 },
  { sector: 'Konstruksi', pct: 9.8 },
  { sector: 'Pertambangan dan penggalian', pct: 8.3 },
  { sector: 'Lapangan usaha lainnya', pct: 38.0 },
];

// Tingkat Partisipasi Angkatan Kerja Agustus, persen (BPS, Sakernas).
export const TPAK = [
  { year: 2019, value: 68.26 },
  { year: 2020, value: 67.77 },
  { year: 2021, value: 68.08 },
  { year: 2022, value: 68.63 },
  { year: 2023, value: 69.8 },
  { year: 2024, value: 70.63 },
];

// Ketenagakerjaan Agustus 2024 (BPS, Sakernas).
export const LABOR_FACTS = {
  laborForce: '149,38 juta orang',
  working: '142,05 juta orang',
  unemployed: 'sekitar 7,3 juta orang',
  informal: '59,17%',
  formal: '40,83%',
};

// Jumlah penduduk miskin Maret, juta jiwa (BPS).
export const POOR_COUNT = [
  { year: 2019, value: 25.14 },
  { year: 2020, value: 26.42 },
  { year: 2021, value: 27.54 },
  { year: 2022, value: 26.16 },
  { year: 2023, value: 25.9 },
  { year: 2024, value: 25.22 },
];

// Perdagangan luar negeri 2024, miliar USD (BPS).
export const TRADE_2024 = [
  { label: 'Ekspor', value: 264.7 },
  { label: 'Impor', value: 233.7 },
  { label: 'Surplus', value: 31.0 },
];

// Kemiskinan Maret, persen (BPS).
export const POVERTY = [
  { year: 2019, value: 9.41 },
  { year: 2020, value: 9.78 },
  { year: 2021, value: 10.14 },
  { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 9.03 },
];

// Indeks Pembangunan Manusia (BPS).
export const HDI = [
  { year: 2019, value: 71.92 },
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 72.91 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

// Gini ratio Maret (BPS).
export const GINI = [
  { year: 2019, value: 0.38 },
  { year: 2020, value: 0.381 },
  { year: 2021, value: 0.384 },
  { year: 2022, value: 0.381 },
  { year: 2023, value: 0.379 },
  { year: 2024, value: 0.379 },
];

// Penduduk 38 provinsi, estimasi pertengahan 2024, juta jiwa (BPS, dibulatkan ke 0,1 juta).
// island: Sumatera, Jawa, BaliNusa, Kalimantan, Sulawesi, Maluku, Papua.
export const PROVINCES = [
  { name: 'Jawa Barat', island: 'Jawa', pop: 49.9 },
  { name: 'Jawa Timur', island: 'Jawa', pop: 41.8 },
  { name: 'Jawa Tengah', island: 'Jawa', pop: 37.9 },
  { name: 'Sumatera Utara', island: 'Sumatera', pop: 15.6 },
  { name: 'Banten', island: 'Jawa', pop: 12.4 },
  { name: 'DKI Jakarta', island: 'Jawa', pop: 10.6 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9.5 },
  { name: 'Lampung', island: 'Sumatera', pop: 9.3 },
  { name: 'Sumatera Selatan', island: 'Sumatera', pop: 8.9 },
  { name: 'Riau', island: 'Sumatera', pop: 6.9 },
  { name: 'Sumatera Barat', island: 'Sumatera', pop: 5.8 },
  { name: 'Kalimantan Barat', island: 'Kalimantan', pop: 5.8 },
  { name: 'Nusa Tenggara Timur', island: 'BaliNusa', pop: 5.7 },
  { name: 'Nusa Tenggara Barat', island: 'BaliNusa', pop: 5.6 },
  { name: 'Aceh', island: 'Sumatera', pop: 5.5 },
  { name: 'Bali', island: 'BaliNusa', pop: 4.4 },
  { name: 'Kalimantan Selatan', island: 'Kalimantan', pop: 4.3 },
  { name: 'Kalimantan Timur', island: 'Kalimantan', pop: 3.9 },
  { name: 'DI Yogyakarta', island: 'Jawa', pop: 3.8 },
  { name: 'Jambi', island: 'Sumatera', pop: 3.7 },
  { name: 'Sulawesi Tengah', island: 'Sulawesi', pop: 3.1 },
  { name: 'Kalimantan Tengah', island: 'Kalimantan', pop: 2.8 },
  { name: 'Sulawesi Tenggara', island: 'Sulawesi', pop: 2.8 },
  { name: 'Sulawesi Utara', island: 'Sulawesi', pop: 2.7 },
  { name: 'Kepulauan Riau', island: 'Sumatera', pop: 2.2 },
  { name: 'Bengkulu', island: 'Sumatera', pop: 2.1 },
  { name: 'Maluku', island: 'Maluku', pop: 2.0 },
  { name: 'Sulawesi Barat', island: 'Sulawesi', pop: 1.6 },
  { name: 'Bangka Belitung', island: 'Sumatera', pop: 1.5 },
  { name: 'Papua Pegunungan', island: 'Papua', pop: 1.5 },
  { name: 'Maluku Utara', island: 'Maluku', pop: 1.4 },
  { name: 'Papua Tengah', island: 'Papua', pop: 1.4 },
  { name: 'Gorontalo', island: 'Sulawesi', pop: 1.3 },
  { name: 'Papua', island: 'Papua', pop: 1.1 },
  { name: 'Kalimantan Utara', island: 'Kalimantan', pop: 0.7 },
  { name: 'Papua Barat', island: 'Papua', pop: 0.6 },
  { name: 'Papua Barat Daya', island: 'Papua', pop: 0.6 },
  { name: 'Papua Selatan', island: 'Papua', pop: 0.5 },
];

export const ISLAND_LABELS = {
  Sumatera: 'Sumatera',
  Jawa: 'Jawa',
  BaliNusa: 'Bali & Nusa Tenggara',
  Kalimantan: 'Kalimantan',
  Sulawesi: 'Sulawesi',
  Maluku: 'Maluku',
  Papua: 'Papua',
};

export const DENSITY_NOTES = [
  { place: 'DKI Jakarta', value: '±15.900 jiwa/km²', note: 'provinsi terpadat' },
  { place: 'Jawa Barat', value: '±1.400 jiwa/km²', note: 'provinsi terpadat kedua di Jawa' },
  { place: 'Papua', value: '±3 jiwa/km²', note: 'provinsi paling jarang penduduknya' },
];

export const FACTS = {
  landArea: '1,9 juta km²',
  islands: 'lebih dari 17.000 pulau',
  provinces: 38,
  regencies: 514,
  density: '±147 jiwa/km²',
  lifeExpectancy: '74,1 tahun',
  reserves: 'US$155,7 miliar',
};
