function renderList(data) {
  const container = document.getElementById("listing");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>Không có kết quả phù hợp</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className =
      "group flex flex-col bg-white rounded-xl border overflow-hidden";

    card.innerHTML = `
      <img src="https://picsum.photos/600/400?random=${item.price}" />
      <div class="p-4">
        <h3 class="font-bold">Mặt bằng cho thuê</h3>
        <p class="text-primary font-bold">
          ${Number(item.price).toLocaleString()} đ / tháng
        </p>
        <p>${item.area} m² • ${item.ward}, ${item.district}</p>
        <p>⭐ ${item.rating ?? "--"}</p>
      </div>
    `;

    container.appendChild(card);
  });
}


function renderPage() {
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const pageData = filteredData.slice(start, end);

  renderList(pageData);
  renderPagination();
}
function renderPagination() {
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const container = document.querySelector(".pagination");
  if (!container || totalPages <= 1) {
    if (container) container.innerHTML = "";
    return;
  }

  // phần còn lại giữ nguyên

  container.innerHTML = "";

  // Prev
  rememberBtn("‹", currentPage > 1, () => {
    currentPage--;
    renderPage();
  });

  // Pages
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className =
      "size-10 rounded-lg " +
      (i === currentPage
        ? "bg-primary text-white font-bold"
        : "hover:bg-slate-100");

    btn.onclick = () => {
      currentPage = i;
      renderPage();
    };

    container.appendChild(btn);
  }

  // Next
  rememberBtn("›", currentPage < totalPages, () => {
    currentPage++;
    renderPage();
  });
}

function rememberBtn(text, enabled, action) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className =
    "size-10 rounded-lg hover:bg-slate-100";
  btn.disabled = !enabled;
  btn.onclick = action;
  document.querySelector(".pagination").appendChild(btn);
}

