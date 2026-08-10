/* ==========================================================================
   MITRAJA FOUNDATION — Activities feed, driven by a Google Sheet

   HOW THE "CLIENT EDITS, SITE UPDATES" SYSTEM WORKS
   --------------------------------------------------------------------------
   A plain Google Doc can't be parsed reliably (freeform paragraphs, no
   structure). Instead this page reads a Google SHEET that the Mitraja team
   edits directly — one row per activity/photo update. Google lets you
   "Publish to web" a sheet as a CSV, which gives a public URL that always
   reflects the latest saved version. This page fetches that CSV on load,
   with no backend and no rebuild step — so it works on GitHub Pages.

   SETUP FOR THE CLIENT (one-time, see README.md for full steps):
   1. Duplicate the "Mitraja Activities" Google Sheet template.
   2. Keep the column headers exactly as: Date, Title, Category, Description,
      ImageURL, Location, Participants, FeedType
        - FeedType is "Camp" for Summer Camp day-cards, or "Update" for the
          general "Recent Work" feed.
   3. File → Share → Publish to web → select the sheet tab → CSV → Publish.
   4. Paste that URL into SHEET_CSV_URL below.

   Until a real sheet is connected, this file falls back to
   data/activities.sample.csv so the layout always has content to show.
   ========================================================================== */

const SHEET_CSV_URL = ""; // <-- paste the "Publish to web" CSV link here
const FALLBACK_CSV_URL = "../data/activities.sample.csv";

function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = ''; }
        if (c === '\r' && next === '\n') i++;
      } else field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).filter(r => r.some(v => v.trim() !== '')).map(r => {
    const obj = {};
    headers.forEach((h, idx) => obj[h] = (r[idx] || '').trim());
    return obj;
  });
}

const CATEGORY_COLORS = {
  'Art': 'pb-1', 'Health': 'pb-2', 'Health & Hygiene': 'pb-2', 'Library': 'pb-3',
  'Pottery': 'pb-4', 'Green Skills': 'pb-6', 'Sports': 'pb-5', 'Community': 'pb-1',
  'Leadership': 'pb-6', 'default': 'pb-3'
};

function activityCard(item) {
  const cls = CATEGORY_COLORS[item.Category] || CATEGORY_COLORS.default;
  const img = item.ImageURL
    ? `<img src="${item.ImageURL}" alt="${item.Title}" loading="lazy">`
    : `<div class="photo-block ${cls}" style="height:100%;border-radius:0;"><span class="ph-emoji">📷</span><span class="ph-label">Photo coming soon</span></div>`;
  return `
  <article class="activity-card reveal in" data-category="${item.Category || ''}">
    <div class="activity-cover">${img}</div>
    <div class="activity-body">
      <span class="activity-date">${item.Date || ''}</span>
      <h3>${item.Title || 'Untitled activity'}</h3>
      ${item.Category ? `<span class="activity-tag">${item.Category}</span>` : ''}
      <p class="activity-desc">${item.Description || ''}</p>
      ${item.Location ? `<p class="activity-desc"><strong>📍 ${item.Location}</strong>${item.Participants ? ` · ${item.Participants} participants` : ''}</p>` : ''}
    </div>
  </article>`;
}

async function loadActivities() {
  const grid = document.getElementById('activityGrid');
  const status = document.getElementById('feedStatus');
  if (!grid) return;

  const tryFetch = async (url) => {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Network response was not ok');
    return parseCSV(await res.text());
  };

  let items = [];
  let usedFallback = false;
  try {
    if (!SHEET_CSV_URL) throw new Error('no sheet configured');
    items = await tryFetch(SHEET_CSV_URL);
  } catch (e) {
    try {
      items = await tryFetch(FALLBACK_CSV_URL);
      usedFallback = true;
    } catch (e2) {
      if (status) { status.textContent = 'Could not load activities right now — please check back soon.'; status.classList.add('error'); }
      return;
    }
  }

  // newest first if Date parses
  items.sort((a, b) => new Date(b.Date) - new Date(a.Date) || 0);

  window.__mitrajaActivities = items;
  renderActivities(items);
  buildFilters(items);

  if (status) {
    status.textContent = usedFallback
      ? 'Showing sample activities — connect the live Google Sheet in js/activities.js to go live.'
      : `Updated from Mitraja's shared activity log · ${items.length} entries.`;
  }
}

function renderActivities(items) {
  const grid = document.getElementById('activityGrid');
  if (!grid) return;
  grid.innerHTML = items.length
    ? items.map(activityCard).join('')
    : '<p class="feed-status">No activities to show yet.</p>';
}

function buildFilters(items) {
  const row = document.getElementById('filterRow');
  if (!row) return;
  const cats = Array.from(new Set(items.map(i => i.Category).filter(Boolean)));
  row.innerHTML = ['All', ...cats].map((c, idx) =>
    `<button class="filter-chip ${idx === 0 ? 'active' : ''}" data-filter="${c}">${c}</button>`
  ).join('');
  row.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      row.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const f = chip.getAttribute('data-filter');
      const items = window.__mitrajaActivities || [];
      renderActivities(f === 'All' ? items : items.filter(i => i.Category === f));
    });
  });
}

document.addEventListener('DOMContentLoaded', loadActivities);
