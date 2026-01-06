// --- file: asset/js/main.js ---

document.addEventListener("DOMContentLoaded", async () => {
  // Trang chủ: 6 item/trang, Trang tìm kiếm: 9 item/trang
  const path = window.location.pathname.toLowerCase();
  const isSearchPage = path.includes("timkiem");
  window.PAGE_SIZE = isSearchPage ? 9 : 6;

  // Lấy keyword từ URL (hỗ trợ cả ?keyword= và ?q=)
  const params = new URLSearchParams(window.location.search);
  const kw = (params.get("keyword") || params.get("q") || "").trim();

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.value = kw;
    window.filterState.keyword = kw;
  }

  // Gọi API (fetchData nằm trong api.js)
  if (typeof fetchData === "function") {
    await fetchData();
  }

  // Nếu có filter (trang tìm kiếm), thì applyFilter để ra đúng kết quả theo keyword
  if (typeof applyFilter === "function" && isSearchPage) {
    applyFilter();
  } else {
    window.currentPage = 1;
    if (typeof renderPage === "function") renderPage();
  }

  // Wire events
  if (searchInput && typeof applyFilter === "function") {
    searchInput.addEventListener("input", () => {
      window.currentPage = 1;
      applyFilter();
    });
  }

  const applyBtn = document.getElementById("applyFilterBtn");
  if (applyBtn && typeof applyFilter === "function") {
    applyBtn.addEventListener("click", () => {
      window.currentPage = 1;
      applyFilter();
    });
  }
});
