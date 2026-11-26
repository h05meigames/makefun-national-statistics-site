// Grafik kanvas DataNusa: batang, garis, dan batang horizontal. Tanpa library luar; semua digambar
// dari data di data.js. Setiap grafik menggambar ulang saat ukuran wadahnya berubah.

const INK = '#17324a';
const MUTED = '#5d7186';
const GRID = '#dbe4ec';
const TEAL = '#0f766e';
const AMBER = '#d97706';
const RED = '#b91c1c';

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(280, Math.floor(rect.width));
  const height = parseInt(canvas.dataset.height || '260', 10);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function niceMax(max) {
  if (max <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

// Angka sumbu dibulatkan ke 1 desimal supaya tidak muncul ekor float seperti 5,900399999999999.
function axisFormat(format) {
  return (v) => format(Math.round(v * 10) / 10);
}

function drawAxes(ctx, pad, width, height, max, format) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const ticks = 4;
  const fmt = axisFormat(format);
  for (let i = 0; i <= ticks; i += 1) {
    const v = (max / ticks) * i;
    const y = height - pad.bottom - ((height - pad.top - pad.bottom) * v) / max;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(fmt(v), pad.left - 8, y);
  }
}

function drawXLabels(ctx, labels, pad, width, height) {
  ctx.fillStyle = MUTED;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const n = labels.length;
  labels.forEach((label, i) => {
    const x = pad.left + ((width - pad.left - pad.right) * (i + 0.5)) / n;
    ctx.fillText(String(label), x, height - pad.bottom + 8);
  });
}

// Grafik batang vertikal. points: [{label, value}], format: angka -> teks sumbu.
export function barChart(canvas, points, format) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { top: 26, right: 12, bottom: 28, left: 56 };
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.08);
  const fmt = format || ((v) => String(Math.round(v)));
  drawAxes(ctx, pad, width, height, max, fmt);
  drawXLabels(ctx, points.map((p) => p.label), pad, width, height);
  const n = points.length;
  const slot = (width - pad.left - pad.right) / n;
  const barW = Math.min(46, slot * 0.62);
  points.forEach((p, i) => {
    const h = ((height - pad.top - pad.bottom) * p.value) / max;
    const x = pad.left + slot * i + (slot - barW) / 2;
    const y = height - pad.bottom - h;
    ctx.fillStyle = p.value < 0 ? RED : i === n - 1 ? AMBER : TEAL;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(p.value), x + barW / 2, y - 4);
  });
}

// Grafik garis dengan titik. points: [{label, value}].
export function lineChart(canvas, points, format) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { top: 26, right: 12, bottom: 28, left: 56 };
  const values = points.map((p) => p.value);
  const lo = Math.min(0, ...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  const max = hi + span * 0.08;
  const min = lo - span * 0.08;
  const fmt = format || ((v) => String(Math.round(v)));
  const axisFmt = axisFormat(fmt);
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 4; i += 1) {
    const v = min + ((max - min) / 4) * i;
    const y = height - pad.bottom - ((height - pad.top - pad.bottom) * (v - min)) / (max - min);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(axisFmt(v), pad.left - 8, y);
  }
  drawXLabels(ctx, points.map((p) => p.label), pad, width, height);
  const n = points.length;
  const xAt = (i) => pad.left + ((width - pad.left - pad.right) * i) / (n - 1);
  const yAt = (v) => height - pad.bottom - ((height - pad.top - pad.bottom) * (v - min)) / (max - min);
  ctx.strokeStyle = TEAL;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(xAt(i), yAt(p.value));
    else ctx.lineTo(xAt(i), yAt(p.value));
  });
  ctx.stroke();
  points.forEach((p, i) => {
    ctx.fillStyle = p.value < 0 ? RED : TEAL;
    ctx.beginPath();
    ctx.arc(xAt(i), yAt(p.value), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(p.value), xAt(i), yAt(p.value) - 8);
  });
}

// Grafik batang horizontal. points: [{label, value}]. Label tiap baris duduk di kolom kiri
// (rata kanan), batangnya mulai setelah kolom itu, nilainya di ujung kanan batang.
export function hbarChart(canvas, points, format) {
  const { ctx, width, height } = setupCanvas(canvas);
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.08);
  const fmt = format || ((v) => String(Math.round(v)));
  ctx.font = '13px system-ui, sans-serif';
  const labelW = Math.min(220, Math.max(...points.map((p) => ctx.measureText(p.label).width)));
  const pad = { top: 8, right: 64, bottom: 8, left: Math.ceil(labelW) + 12 };
  const n = points.length;
  const slot = (height - pad.top - pad.bottom) / n;
  const barH = Math.min(30, slot * 0.6);
  points.forEach((p, i) => {
    const w = ((width - pad.left - pad.right) * p.value) / max;
    const y = pad.top + slot * i + (slot - barH) / 2;
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.label, pad.left - 8, y + barH / 2);
    ctx.fillStyle = i === 0 ? AMBER : TEAL;
    ctx.beginPath();
    ctx.roundRect(pad.left, y, Math.max(w, 2), barH, [0, 4, 4, 0]);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(fmt(p.value), pad.left + w + 8, y + barH / 2);
    ctx.font = '13px system-ui, sans-serif';
  });
}

// Donat sederhana untuk pangsa. points: [{label, value}] dengan value persen.
export function donutChart(canvas, points) {
  const { ctx, width, height } = setupCanvas(canvas);
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 14;
  const colors = [TEAL, AMBER, '#2563eb', '#7c3aed', '#0891b2', '#64748b'];
  let start = -Math.PI / 2;
  const total = points.reduce((s, p) => s + p.value, 0);
  points.forEach((p, i) => {
    const sweep = (p.value / total) * Math.PI * 2;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + sweep);
    ctx.closePath();
    ctx.fill();
    start += sweep;
  });
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PDB 2024', cx, cy - 8);
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText('per lapangan usaha', cx, cy + 10);
}
