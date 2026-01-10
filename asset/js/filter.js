/* ================= TIỆN ÍCH ================= */
function parseMoney(v) {
  // "35,000,000" | "35tr" | "35.000.000" -> 35000000
  const n = Number(String(v || "").replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(n) {
  return Number(n || 0).toLocaleString("en-US");
}

/* ================= COLLECT FILTER ================= */
function collectFilterState() {
  const searchInput = document.getElementById("search");

  return {
    keyword: searchInput?.value?.trim().toLowerCase() || "",

    minPrice: parseMoney(document.getElementById("minPrice")?.value),
    maxPrice: parseMoney(document.getElementById("maxPrice")?.value) || 9e18,

    areas: Array.from(
      document.querySelectorAll("input[data-area]:checked")
    ).map(cb => cb.dataset.area),
  };
}

/* ================= APPLY FILTER ================= */
function applyFilter() {
  const f = collectFilterState();

  window.filteredData = window.rawData.filter(item => {

    /* ===== 1. KEYWORD ===== */
    if (f.keyword) {
      const text = `
        ${item.title || ""}
        ${item.street || ""}
        ${item.ward || ""}
        ${item.district || ""}
        ${item.region || ""}
        ${item.category || ""}
        ${item.group || ""}
      `.toLowerCase();

      if (!text.includes(f.keyword)) return false;
    }

    /* ===== 2. PRICE ===== */
    const price =
      Number(item.price) ||
      parseMoney(item.price_string) ||
      parseMoney(item.price_text);

    if (price < f.minPrice || price > f.maxPrice) return false;

    /* ===== 3. AREA ===== */
    if (f.areas.length > 0) {
      const area = Number(item.area_m2) || 0;
      let ok = false;

      for (const a of f.areas) {
        if (a === "0-30" && area < 30) ok = true;
        if (a === "30-50" && area >= 30 && area <= 50) ok = true;
        if (a === "50-80" && area > 50 && area <= 80) ok = true;
        if (a === "80+" && area > 80) ok = true;
      }

      if (!ok) return false;
    }

    return true;
  });

  window.currentPage = 1;
  if (typeof renderPage === "function") renderPage();
}

/* ================= PRICE INPUT HANDLING ================= */
document.addEventListener("DOMContentLoaded", () => {
  const minEl = document.getElementById("minPrice");
  const maxEl = document.getElementById("maxPrice");
  if (!minEl || !maxEl) return;

  const sync = () => applyFilter();

  minEl.addEventListener("input", sync);
  maxEl.addEventListener("input", sync);

  minEl.addEventListener("blur", () => {
    minEl.value = formatMoney(parseMoney(minEl.value));
  });

  maxEl.addEventListener("blur", () => {
    maxEl.value = formatMoney(parseMoney(maxEl.value));
  });
});
