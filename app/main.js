// DataNusa: router hash dan interaksi. Rute:
//
//   #/           beranda
//   #/penduduk   penduduk & demografi
//   #/ekonomi    ekonomi (tab PDB / inflasi / kerja / dagang)
//   #/daerah     daerah & provinsi (cari, saring, urut, detail)
//   #/sosial     sosial (kemiskinan, IPM, gini)
//   #/tentang    tentang data
//
// window.__shotReady false selama halaman dirender dan true sesudahnya, agar skrip
// screenshot tahu kapan menangkap.

import { barChart, donutChart, hbarChart, lineChart } from './charts.js';
import {
  AGE_GROUPS,
  GDP_GROWTH,
  GDP_SECTORS,
  GINI,
  HDI,
  INFLATION,
  ISLAND_LABELS,
  POPULATION_SERIES,
  POVERTY,
  PROVINCES,
  TRADE_2024,
  UNEMPLOYMENT,
} from './data.js';
import { daerah, ekonomi, home, missing, penduduk, sosial, tentang } from './views.js';

const app = document.getElementById('app');
const TOTAL_POP = 281.6;
const fmtJt = (v) => `${String(v).replace('.', ',')} jt`;
const fmtPct = (v) => `${String(v).replace('.', ',')}%`;
const fmtNum = (v) => String(v).replace('.', ',');

let popChartType = 'bar';
let socialChart = 'gini';

function draw(id, fn) {
  const canvas = document.getElementById(id);
  if (canvas) fn(canvas);
}

function drawHome() {
  draw('chart-pop', (c) => barChart(c, POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.value })), fmtJt));
  draw('chart-gdp', (c) => lineChart(c, GDP_GROWTH.map((p) => ({ label: String(p.year), value: p.value })), fmtPct));
  draw('chart-sectors', (c) => donutChart(c, GDP_SECTORS.map((s) => ({ label: s.sector, value: s.pct }))));
}

function drawPopulation() {
  const points = POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.value }));
  draw('chart-population', (c) => (popChartType === 'line' ? lineChart(c, points, fmtJt) : barChart(c, points, fmtJt)));
  draw('chart-age', (c) => hbarChart(c, AGE_GROUPS.map((a) => ({ label: a.group, value: a.pct })), (v) => `${fmtNum(v)}%`));
}

function drawEconomy(tab) {
  if (tab === 'pdb') draw('chart-growth', (c) => lineChart(c, GDP_GROWTH.map((p) => ({ label: String(p.year), value: p.value })), fmtPct));
  if (tab === 'inflasi') draw('chart-inflation', (c) => barChart(c, INFLATION.map((p) => ({ label: String(p.year), value: p.value })), fmtPct));
  if (tab === 'kerja') draw('chart-unemp', (c) => lineChart(c, UNEMPLOYMENT.map((p) => ({ label: String(p.year), value: p.value })), fmtPct));
  if (tab === 'dagang') draw('chart-trade', (c) => barChart(c, TRADE_2024.map((p) => ({ label: p.label, value: p.value })), (v) => `US$${fmtNum(v)} M`));
}

function drawSocial() {
  draw('chart-poverty', (c) => lineChart(c, POVERTY.map((p) => ({ label: String(p.year), value: p.value })), fmtPct));
  draw('chart-hdi', (c) => lineChart(c, HDI.map((p) => ({ label: String(p.year), value: p.value })), fmtNum));
  const series = socialChart === 'gini' ? GINI : HDI;
  draw('chart-social', (c) => lineChart(c, series.map((p) => ({ label: String(p.year), value: p.value })), fmtNum));
}

function drawDaerah() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  draw('chart-top10', (c) => hbarChart(c, top10.map((p) => ({ label: p.name, value: p.pop })), fmtJt));
  renderProvinceTable();
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function filteredProvinces() {
  const q = (document.getElementById('province-search')?.value || '').trim().toLowerCase();
  const island = document.getElementById('province-island')?.value || '';
  const sort = document.getElementById('province-sort')?.value || 'pop-desc';
  let rows = PROVINCES.filter((p) => (!island || p.island === island) && (!q || p.name.toLowerCase().includes(q)));
  if (sort === 'pop-desc') rows.sort((a, b) => b.pop - a.pop);
  if (sort === 'pop-asc') rows.sort((a, b) => a.pop - b.pop);
  if (sort === 'name-asc') rows.sort((a, b) => a.name.localeCompare(b.name, 'id'));
  if (sort === 'name-desc') rows.sort((a, b) => b.name.localeCompare(a.name, 'id'));
  return rows;
}

function renderProvinceTable() {
  const tbody = document.querySelector('#province-table tbody');
  const count = document.getElementById('province-count');
  if (!tbody) return;
  const rows = filteredProvinces();
  tbody.innerHTML = rows
    .map(
      (p) => `<tr data-prov="${esc(p.name)}" tabindex="0">
        <td>${esc(p.name)}</td><td>${esc(ISLAND_LABELS[p.island])}</td>
        <td>${fmtNum(p.pop)}</td><td>${fmtNum(Math.round((p.pop / TOTAL_POP) * 1000) / 10)}%</td>
      </tr>`,
    )
    .join('');
  if (count) count.textContent = rows.length === PROVINCES.length
    ? `Menampilkan ${rows.length} provinsi.`
    : `Menampilkan ${rows.length} dari ${PROVINCES.length} provinsi.`;
}

function showProvinceDetail(name) {
  const p = PROVINCES.find((x) => x.name === name);
  const box = document.getElementById('province-detail');
  if (!p || !box) return;
  const share = Math.round((p.pop / TOTAL_POP) * 1000) / 10;
  const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.name === name) + 1;
  box.hidden = false;
  box.innerHTML = `<h3>${esc(p.name)}</h3>
    <p>Peringkat ${rank} dari ${PROVINCES.length} provinsi berdasarkan jumlah penduduk 2024.</p>
    <dl class="kv">
      <dt>Penduduk 2024</dt><dd>${fmtNum(p.pop)} juta jiwa</dd>
      <dt>Pangsa nasional</dt><dd>${fmtNum(share)}% dari 281,6 juta jiwa</dd>
      <dt>Pulau</dt><dd>${esc(ISLAND_LABELS[p.island])}</dd>
    </dl>
    <p class="source">Sumber: BPS, estimasi pertengahan 2024, dibulatkan.</p>
    <button type="button" id="detail-close">Tutup detail</button>`;
  document.getElementById('detail-close').addEventListener('click', () => {
    box.hidden = true;
    box.innerHTML = '';
  });
}

function wireDaerah() {
  const form = document.getElementById('province-filters');
  if (form) {
    form.addEventListener('submit', (e) => e.preventDefault());
    form.addEventListener('input', renderProvinceTable);
    form.addEventListener('change', renderProvinceTable);
  }
  const tbody = document.querySelector('#province-table tbody');
  if (tbody) {
    tbody.addEventListener('click', (e) => {
      const tr = e.target.closest('tr[data-prov]');
      if (tr) showProvinceDetail(tr.dataset.prov);
    });
    tbody.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const tr = e.target.closest('tr[data-prov]');
        if (tr) showProvinceDetail(tr.dataset.prov);
      }
    });
  }
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  const wanted = params.get('prov');
  if (wanted) showProvinceDetail(wanted);
}

function wireTabs() {
  document.querySelectorAll('.tabs [data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tabs [data-tab]').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      document.querySelectorAll('.tabpanel').forEach((panel) => {
        panel.hidden = panel.id !== `tab-${btn.dataset.tab}`;
      });
      drawEconomy(btn.dataset.tab);
    });
  });
}

function wireToggles() {
  document.querySelectorAll('[data-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-chart]').forEach((b) => b.classList.toggle('active', b === btn));
      popChartType = btn.dataset.chart;
      drawPopulation();
    });
  });
  document.querySelectorAll('[data-social]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-social]').forEach((b) => b.classList.toggle('active', b === btn));
      socialChart = btn.dataset.social;
      drawSocial();
    });
  });
}

function render() {
  window.__shotReady = false;
  const [path] = location.hash.replace(/^#/, '').split('?');
  const route = path || '/';
  let html;
  if (route === '/') html = home();
  else if (route === '/penduduk') html = penduduk();
  else if (route === '/ekonomi') html = ekonomi();
  else if (route === '/daerah') html = daerah();
  else if (route === '/sosial') html = sosial();
  else if (route === '/tentang') html = tentang();
  else html = missing();
  app.innerHTML = html;
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route);
  });
  if (route === '/') drawHome();
  if (route === '/penduduk') drawPopulation();
  if (route === '/ekonomi') {
    wireTabs();
    drawEconomy('pdb');
  }
  if (route === '/penduduk' || route === '/sosial') wireToggles();
  if (route === '/sosial') drawSocial();
  if (route === '/daerah') {
    drawDaerah();
    wireDaerah();
  }
  document.title =
    route === '/' ? 'DataNusa — Statistik Indonesia' : `DataNusa — ${document.querySelector('h1')?.textContent ?? 'Statistik Indonesia'}`;
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(render, 200);
});
render();
