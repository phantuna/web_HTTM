const API_URL = "https://script.google.com/macros/s/AKfycbw_SGZF7YOo3w8rmwJK6T0E6bOPdEEnZQH-VeUupV6nwdMOq_YbI9570w8FjULeL0Gn/exec";

async function fetchData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    rawData = data;
    filteredData = [...rawData];

    renderList(filteredData);
  } catch (err) {
    console.error("Lỗi gọi API:", err);
  }
}
