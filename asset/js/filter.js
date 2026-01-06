
function collectFilterState() {
  const searchInput = document.getElementById("search");
  
  // Lấy các checkbox Loại hình (Type)
  const typeCheckboxes = document.querySelectorAll("#typeFilter input[type='checkbox']:checked");
  const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value); // Bạn cần thêm value="office" vào html

  return {
    keyword: searchInput?.value?.trim().toLowerCase() || "",
    
    minPrice: Number(document.getElementById("minPrice")?.value?.replace(/,/g, "") || 0),
    maxPrice: Number(document.getElementById("maxPrice")?.value?.replace(/,/g, "") || 1000000000), // Max mặc định lớn

    // Lấy mảng diện tích
    areas: Array.from(document.querySelectorAll("input[data-area]:checked")).map(cb => cb.dataset.area),
    
    // Lấy mảng loại hình (nếu bạn update HTML thêm value)
    // Tạm thời lấy text logic từ HTML hiện tại của bạn
    types: [] 
  };
}

function applyFilter() {
  const filterState = collectFilterState();
  
  // Logic lọc nâng cao
  window.filteredData = window.rawData.filter(item => {
    // 1. Keyword: Tìm trong tên, địa chỉ, quận, phường
    const textSearch = `${item.title} ${item.district} ${item.ward} ${item.address}`.toLowerCase();
    if (filterState.keyword && !textSearch.includes(filterState.keyword)) return false;

    // 2. Giá
    if (item.price < filterState.minPrice || item.price > filterState.maxPrice) return false;
      const keyword = filterState.keyword;
      if (keyword) {
        const text = `${item.district} ${item.ward}`.toLowerCase();
        if (!text.includes(keyword.split(",")[0].trim())) return false;
      }

    // 3. Diện tích
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


    // 4. Loại hình (Logic chờ bạn gắn value vào HTML, ví dụ: office, retail)
    // Nếu HTML checkbox có value khớp với item.type
    // const typeContainer = document.querySelector("details summary:contains('Loại hình') + div");
    // ... logic tương tự area
    
    return true;
  });

  window.currentPage = 1;
  if(typeof renderPage === 'function') renderPage();
}