function collectFilterState() {
  const searchInput = document.getElementById("search");

  const keyword =
    typeof searchInput?.value === "string"
      ? searchInput.value.trim().toLowerCase()
      : "";

  return {
    keyword,

    minPrice: Number(
      document.getElementById("minPrice")?.value?.replace(/,/g, "") || 0
    ),

    maxPrice: Number(
      document.getElementById("maxPrice")?.value?.replace(/,/g, "") || Infinity
    ),

    areas: Array.from(
      document.querySelectorAll("input[data-area]:checked")
    ).map(cb => cb.dataset.area),
  };
}
function applyFilter() {
  const filterState = collectFilterState();

  filteredData = rawData.filter(item => {

    // keyword
    if (filterState.keyword) {
      const text = `${item.district} ${item.ward}`.toLowerCase();
      if (!text.includes(filterState.keyword)) return false;
    }

    // giá
    if (item.price < filterState.minPrice ||
        item.price > filterState.maxPrice) {
      return false;
    }

    // diện tích
    if (filterState.areas.length > 0) {
      let ok = false;
      for (const a of filterState.areas) {
        if (a === "0-30" && item.area < 30) ok = true;
        if (a === "30-50" && item.area >= 30 && item.area <= 50) ok = true;
        if (a === "50-80" && item.area > 50 && item.area <= 80) ok = true;
        if (a === "80+" && item.area > 80) ok = true;
      }
      if (!ok) return false;
    }

    return true;
  });

  // 🔑 CỰC QUAN TRỌNG
  currentPage = 1;
  renderPage();
}
