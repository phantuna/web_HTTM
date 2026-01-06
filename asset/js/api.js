const API_URL = "..";

function normalizeChoTotItem(item) {
  return {
    id: item.ad_id,
    title: "Mặt bằng cho thuê", // tạm, sau có thể nâng cấp
    image: `https://picsum.photos/600/400?random=${item.ad_id}`,
    price: Number(item.price) || 0,
    area: Number(item.area) || 0,
    district: item.district || "",
    ward: item.ward || "",
    rating: item.rating ? Number(item.rating) : null,
    type: "retail" // hoặc office, tạm hardcode
  };
}

async function fetchData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const normalized = data.map(normalizeChoTotItem);

    window.rawData = normalized;
    window.filteredData = [...normalized];

    window.currentPage = 1;
    renderPage();
   

  } catch (err) {
    console.error("Lỗi gọi API:", err);
  }
}

