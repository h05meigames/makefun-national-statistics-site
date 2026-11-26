// HTML tiap halaman DataNusa, dibangun dari data.js. Semua nilai di-escape sebelum masuk ke halaman.
// Grafik digambar main.js setelah HTML masuk ke DOM (kanvas butuh ukuran wadah yang nyata).

import {
  AGE_GROUPS,
  DENSITY_NOTES,
  FACTS,
  GDP_SECTORS,
  META,
  OVERVIEW,
  PROVINCES,
  TRADE_2024,
} from './data.js';

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const source = (text) => `<p class="source">Sumber: ${escape(text)}</p>`;

function kpiCards() {
  return OVERVIEW.map(
    (k) => `<a class="kpi" href="${k.page}">
      <span class="kpi-label">${escape(k.label)}</span>
      <span class="kpi-value">${escape(k.value)}</span>
      <span class="kpi-sub">${escape(k.sub)}</span>
      <span class="kpi-src">${escape(k.source)}</span>
    </a>`,
  ).join('');
}

function navCards() {
  const cards = [
    { href: '#/penduduk', title: 'Penduduk & demografi', text: 'Jumlah, pertumbuhan, struktur umur, dan kepadatan penduduk.' },
    { href: '#/ekonomi', title: 'Ekonomi', text: 'PDB, inflasi, pengangguran, dan perdagangan luar negeri.' },
    { href: '#/daerah', title: 'Daerah & provinsi', text: 'Penduduk 38 provinsi, bisa dicari, disaring, dan diurutkan.' },
    { href: '#/sosial', title: 'Sosial', text: 'Kemiskinan, pembangunan manusia, dan ketimpangan.' },
  ];
  return cards.map(
    (c) => `<a class="navcard" href="${c.href}"><strong>${escape(c.title)}</strong><span>${escape(c.text)}</span></a>`,
  ).join('');
}

export function home() {
  const top5 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return `<section class="hero">
    <p class="eyebrow">Statistik nasional · ${escape(META.country)}</p>
    <h1>Indonesia dalam angka</h1>
    <p class="lede">Penduduk, ekonomi, daerah, dan kondisi sosial Indonesia — angka nyata dari BPS dan
    Bank Indonesia, disusun agar mudah dibaca di layar besar maupun di HP.</p>
    <p class="updated">Terakhir diperbarui ${escape(META.updated)} · ${escape(META.note)}</p>
  </section>
  <section class="kpis" aria-label="Angka utama">${kpiCards()}</section>
  <section class="grid2">
    <article class="card">
      <h2><a href="#/penduduk">Penduduk terus bertambah</a></h2>
      <p>Dari 237,6 juta jiwa pada Sensus 2010 menjadi 281,6 juta pada 2024 — bertambah sekitar
      2,9 juta jiwa dalam setahun terakhir.</p>
      <canvas id="chart-pop" data-height="240" role="img" aria-label="Grafik batang jumlah penduduk 2010 sampai 2024"></canvas>
      ${source('BPS: Sensus Penduduk 2010 dan 2020, SUPAS 2015, estimasi pertengahan tahun 2021–2024')}
    </article>
    <article class="card">
      <h2><a href="#/ekonomi">Ekonomi tumbuh di atas 5%</a></h2>
      <p>PDB tumbuh 5,03% pada 2024 setelah sempat minus 2,07% pada 2020. Inflasi 2024 tercatat
      1,57%, terendah dalam lima tahun terakhir.</p>
      <canvas id="chart-gdp" data-height="240" role="img" aria-label="Grafik garis pertumbuhan PDB 2019 sampai 2024"></canvas>
      ${source('BPS 2019–2024')}
    </article>
  </section>
  <section class="grid2">
    <article class="card">
      <h2>Dari mana PDB berasal</h2>
      <p>Industri pengolahan adalah lapangan usaha terbesar, diikuti perdagangan dan pertanian.</p>
      <canvas id="chart-sectors" data-height="240" role="img" aria-label="Donat pangsa lapangan usaha terhadap PDB 2024"></canvas>
      <ul class="legend">${GDP_SECTORS.map((s) => `<li><span>${escape(s.sector)}</span><b>${s.pct.toFixed(1).replace('.', ',')}%</b></li>`).join('')}</ul>
      ${source('BPS 2024, dibulatkan')}
    </article>
    <article class="card">
      <h2><a href="#/daerah">Lima provinsi terpadat</a></h2>
      <p>Lebih dari separuh penduduk Indonesia tinggal di Pulau Jawa.</p>
      <ol class="toplist">${top5.map((p) => `<li><a href="#/daerah?prov=${encodeURIComponent(p.name)}">${escape(p.name)}</a><b>${p.pop.toFixed(1).replace('.', ',')} jt</b></li>`).join('')}</ol>
      ${source('BPS, estimasi pertengahan 2024')}
      <p><a class="btn" href="#/daerah">Lihat 38 provinsi →</a></p>
    </article>
  </section>
  <section>
    <h2>Jelajahi statistiknya</h2>
    <div class="navcards">${navCards()}</div>
  </section>`;
}

export function penduduk() {
  return `<p class="crumb"><a href="#/">← Beranda</a></p>
  <h1>Penduduk &amp; demografi</h1>
  <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia. Kepadatan rata-rata
  ${escape(FACTS.density)}, di atas lahan seluas ${escape(FACTS.landArea)} yang tersebar di
  ${escape(FACTS.islands)}.</p>
  <section class="card">
    <div class="card-head">
      <h2>Jumlah penduduk, 2010–2024</h2>
      <div class="toggle" role="group" aria-label="Jenis grafik">
        <button type="button" data-chart="bar" class="active">Batang</button>
        <button type="button" data-chart="line">Garis</button>
      </div>
    </div>
    <canvas id="chart-population" data-height="280" role="img" aria-label="Grafik jumlah penduduk 2010 sampai 2024"></canvas>
    ${source('BPS: Sensus 2010 dan 2020, SUPAS 2015, estimasi pertengahan tahun 2021–2024. Satuan: juta jiwa.')}
  </section>
  <section class="grid2">
    <article class="card">
      <h2>Struktur umur 2024</h2>
      <p>Indonesia masih dalam bonus demografi: hampir tujuh dari sepuluh penduduk berusia produktif.</p>
      <canvas id="chart-age" data-height="220" role="img" aria-label="Grafik batang struktur umur penduduk 2024"></canvas>
      ${source('BPS 2024, dibulatkan')}
    </article>
    <article class="card">
      <h2>Kepadatan yang timpang</h2>
      <ul class="facts">${DENSITY_NOTES.map((d) => `<li><strong>${escape(d.place)}</strong> — ${escape(d.value)} <span>(${escape(d.note)})</span></li>`).join('')}</ul>
      <p>Angka kepadatan dihitung dari penduduk 2024 dibagi luas wilayah menurut BPS.</p>
      <h3>Angka kunci</h3>
      <dl class="kv">
        <dt>Angka harapan hidup</dt><dd>${escape(FACTS.lifeExpectancy)} (BPS 2024)</dd>
        <dt>Jumlah provinsi</dt><dd>${FACTS.provinces} (BPS 2024)</dd>
        <dt>Kabupaten/kota</dt><dd>${FACTS.regencies} (BPS 2024)</dd>
      </dl>
    </article>
  </section>`;
}

export function ekonomi() {
  return `<p class="crumb"><a href="#/">← Beranda</a></p>
  <h1>Ekonomi</h1>
  <p class="lede">PDB 2024 mencapai Rp22.139 triliun dengan PDB per kapita Rp78,6 juta. Cadangan devisa
  akhir 2024 tercatat ${escape(FACTS.reserves)} menurut Bank Indonesia.</p>
  <div class="tabs" role="tablist" aria-label="Topik ekonomi">
    <button type="button" role="tab" data-tab="pdb" class="active" aria-selected="true">PDB</button>
    <button type="button" role="tab" data-tab="inflasi" aria-selected="false">Inflasi</button>
    <button type="button" role="tab" data-tab="kerja" aria-selected="false">Ketenagakerjaan</button>
    <button type="button" role="tab" data-tab="dagang" aria-selected="false">Perdagangan</button>
  </div>
  <section class="card tabpanel" id="tab-pdb">
    <h2>Pertumbuhan PDB, 2019–2024</h2>
    <p>Setelah kontraksi 2020, ekonomi kembali tumbuh di atas 5% selama tiga tahun berturut-turut.
    Pada 2024, pertumbuhan per triwulan: I 5,11%, II 5,05%, III 4,95%, IV 5,02%.</p>
    <canvas id="chart-growth" data-height="280" role="img" aria-label="Grafik garis pertumbuhan PDB 2019 sampai 2024"></canvas>
    ${source('BPS 2019–2024')}
  </section>
  <section class="card tabpanel" id="tab-inflasi" hidden>
    <h2>Inflasi, 2020–2024</h2>
    <p>Inflasi melonjak ke 5,51% pada 2022, lalu mereda ke 1,57% pada Desember 2024 — terendah
    dalam lima tahun terakhir.</p>
    <canvas id="chart-inflation" data-height="280" role="img" aria-label="Grafik batang inflasi 2020 sampai 2024"></canvas>
    ${source('BPS, inflasi Desember year-on-year 2020–2024')}
  </section>
  <section class="card tabpanel" id="tab-kerja" hidden>
    <h2>Pengangguran terbuka, 2019–2024</h2>
    <p>Tingkat Pengangguran Terbuka (TPT) sempat 7,07% pada Agustus 2020, lalu turun bertahap ke
    4,91% pada Agustus 2024.</p>
    <canvas id="chart-unemp" data-height="280" role="img" aria-label="Grafik garis pengangguran 2019 sampai 2024"></canvas>
    ${source('BPS, TPT Agustus 2019–2024')}
  </section>
  <section class="card tabpanel" id="tab-dagang" hidden>
    <h2>Perdagangan luar negeri 2024</h2>
    <p>Ekspor US$264,7 miliar dan impor US$233,7 miliar, sehingga neraca perdagangan surplus
    US$31,0 miliar.</p>
    <canvas id="chart-trade" data-height="280" role="img" aria-label="Grafik batang ekspor impor dan surplus 2024"></canvas>
    ${source('BPS 2024, miliar USD')}
  </section>`;
}

export function daerah() {
  return `<p class="crumb"><a href="#/">← Beranda</a></p>
  <h1>Daerah &amp; provinsi</h1>
  <p class="lede">Penduduk 38 provinsi pada 2024. Cari nama provinsi, saring berdasarkan pulau, atau
  urutkan tabelnya. Klik sebuah baris untuk melihat detail provinsi itu.</p>
  <section class="card">
    <h2>Sepuluh provinsi berpenduduk terbanyak</h2>
    <canvas id="chart-top10" data-height="300" role="img" aria-label="Grafik batang sepuluh provinsi berpenduduk terbanyak 2024"></canvas>
    ${source('BPS, estimasi pertengahan 2024, juta jiwa')}
  </section>
  <section class="card">
    <h2>Semua provinsi</h2>
    <form class="filters" id="province-filters">
      <label>Cari provinsi
        <input type="search" id="province-search" placeholder="mis. Jawa Barat" autocomplete="off">
      </label>
      <label>Pulau
        <select id="province-island">
          <option value="">Semua pulau</option>
          <option value="Sumatera">Sumatera</option>
          <option value="Jawa">Jawa</option>
          <option value="BaliNusa">Bali &amp; Nusa Tenggara</option>
          <option value="Kalimantan">Kalimantan</option>
          <option value="Sulawesi">Sulawesi</option>
          <option value="Maluku">Maluku</option>
          <option value="Papua">Papua</option>
        </select>
      </label>
      <label>Urutkan
        <select id="province-sort">
          <option value="pop-desc">Penduduk terbanyak</option>
          <option value="pop-asc">Penduduk tersedikit</option>
          <option value="name-asc">Nama A–Z</option>
          <option value="name-desc">Nama Z–A</option>
        </select>
      </label>
    </form>
    <p id="province-count" class="count" aria-live="polite"></p>
    <div id="province-detail" class="detail" hidden></div>
    <div class="tablewrap">
      <table id="province-table">
        <thead><tr><th>Provinsi</th><th>Pulau</th><th>Penduduk 2024 (juta)</th><th>Pangsa</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
    ${source('BPS, estimasi pertengahan 2024, dibulatkan ke 0,1 juta jiwa. Pangsa = penduduk provinsi dibagi total nasional 281,6 juta.')}
  </section>`;
}

export function sosial() {
  return `<p class="crumb"><a href="#/">← Beranda</a></p>
  <h1>Sosial</h1>
  <p class="lede">Kemiskinan turun ke 9,03% pada Maret 2024, dan Indeks Pembangunan Manusia mencapai
  75,02 — kategori tinggi menurut BPS.</p>
  <section class="grid2">
    <article class="card">
      <h2>Kemiskinan, 2019–2024</h2>
      <p>Persentase penduduk miskin sempat naik pada 2020–2021, lalu turun kembali di bawah 2019.</p>
      <canvas id="chart-poverty" data-height="260" role="img" aria-label="Grafik garis tingkat kemiskinan 2019 sampai 2024"></canvas>
      ${source('BPS, Maret 2019–2024')}
    </article>
    <article class="card">
      <h2>Pembangunan manusia, 2019–2024</h2>
      <p>IPM naik dari 71,92 (2019) menjadi 75,02 (2024), didorong harapan hidup, lama sekolah,
      dan pengeluaran per kapita.</p>
      <canvas id="chart-hdi" data-height="260" role="img" aria-label="Grafik garis IPM 2019 sampai 2024"></canvas>
      ${source('BPS 2019–2024')}
    </article>
  </section>
  <section class="card">
    <div class="card-head">
      <h2>Ketimpangan (gini ratio)</h2>
      <div class="toggle" role="group" aria-label="Pilih grafik sosial">
        <button type="button" data-social="gini" class="active">Gini</button>
        <button type="button" data-social="hdi2">IPM</button>
      </div>
    </div>
    <p>Gini ratio Maret 2024 tercatat 0,379 — relatif stabil dalam enam tahun terakhir. Angka 0
    berarti pemerataan sempurna; 1 berarti ketimpangan sempurna.</p>
    <canvas id="chart-social" data-height="260" role="img" aria-label="Grafik garis gini ratio 2019 sampai 2024"></canvas>
    ${source('BPS, gini ratio Maret 2019–2024')}
    <h3>Angka kunci sosial 2024</h3>
    <dl class="kv">
      <dt>Angka harapan hidup</dt><dd>${escape(FACTS.lifeExpectancy)} (BPS)</dd>
      <dt>Rata-rata lama sekolah</dt><dd>sekitar 9 tahun (BPS)</dd>
      <dt>Melek huruf usia 15+</dt><dd>sekitar 96% (BPS)</dd>
    </dl>
  </section>`;
}

export function tentang() {
  return `<p class="crumb"><a href="#/">← Beranda</a></p>
  <h1>Tentang data</h1>
  <p class="lede">DataNusa adalah situs peraga yang menyusun angka-angka resmi Indonesia agar mudah
  dibaca. Situs ini bukan situs resmi pemerintah dan tidak berafiliasi dengan BPS atau Bank Indonesia.</p>
  <section class="card">
    <h2>Sumber data</h2>
    <ul class="facts">
      <li><strong>Badan Pusat Statistik (BPS)</strong> — penduduk, PDB, inflasi, pengangguran, kemiskinan, IPM, dan gini ratio.</li>
      <li><strong>Bank Indonesia (BI)</strong> — cadangan devisa akhir 2024.</li>
    </ul>
    <p>Setiap angka di situs ini disertai sumber dan tahunnya. Angka dibulatkan agar mudah dibaca;
    untuk angka resmi yang persis, rujuk publikasi BPS dan BI.</p>
  </section>
  <section class="card">
    <h2>Pertanyaan yang sering ditanyakan</h2>
    <details><summary>Apakah angka di sini angka resmi?</summary>
    <p>Angka-angka di sini diambil dari publikasi BPS dan Bank Indonesia, lalu dibulatkan. Tahun dan
    sumber selalu dicantumkan di bawah grafik atau tabelnya.</p></details>
    <details><summary>Mengapa jumlah penduduk 2024 berbeda dengan sensus?</summary>
    <p>Sensus dilakukan sepuluh tahun sekali (terakhir 2020). Angka 2021–2024 adalah estimasi
    pertengahan tahun BPS, bukan hasil sensus.</p></details>
    <details><summary>Apakah situs ini membutuhkan internet?</summary>
    <p>Tidak. Semua halaman, data, dan grafik tersimpan di situs ini sendiri dan berjalan tanpa
    permintaan jaringan apa pun.</p></details>
    <details><summary>Bagaimana data diperbarui?</summary>
    <p>Angka diperbarui mengikuti rilis BPS dan BI. Halaman beranda mencantumkan tanggal pembaruan terakhir.</p></details>
  </section>
  <section class="card">
    <h2>Metodologi singkat</h2>
    <p>Pertumbuhan PDB dihitung year-on-year dari PDB harga konstan. Inflasi adalah inflasi Desember
    year-on-year. TPT adalah Tingkat Pengangguran Terbuka bulan Agustus. Kemiskinan dan gini ratio
    memakai angka Maret. IPM memakai skala 0–100 BPS.</p>
  </section>`;
}

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1>
  <p>Tidak ada halaman statistik di alamat ini. <a href="#/">Kembali ke beranda</a>.</p>`;
}
