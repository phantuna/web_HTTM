// Dữ liệu gốc từ API
let rawData = [];

// Dữ liệu sau khi filter
let filteredData = [];
let currentPage = 1;
const filterState = {
  keyword: "",
  minPrice: 0,
  maxPrice: Infinity,
  areas: []
};
const PAGE_SIZE =9;