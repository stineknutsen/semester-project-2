export function renderPaginationControls(
  container,
  totalPages,
  currentPage,
  onPageClick
) {
  container.innerHTML = "";

  for (let page = 1; page <= totalPages; page++) {
    const button = document.createElement("button");
    button.textContent = page;
    button.className = `px-3 py-1 m-1 rounded ${
      page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
    }`;

    button.addEventListener("click", () => onPageClick(page));
    container.appendChild(button);
  }
}
