document.addEventListener("DOMContentLoaded", () => {
  window.PAGE_SIZE = 6;

  window.rawData = [];
  window.filteredData = [];
  window.currentPage = 1;

  // 1) Load dữ liệu ban đầu
  fetchData();

  // 2) Search input: gõ tới đâu lọc tới đó
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
  }

  // 3) Nút áp dụng bộ lọc
  const applyBtn = document.getElementById("applyFilterBtn");
  if (applyBtn) {
    applyBtn.addEventListener("click", applyFilter);
  }
});
