export function renderPaginationControls(
  container,
  totalPages,
  currentPage,
  onPageClick
) {
  container.innerHTML = "";

  const createButton = (label, page, isActive = false, isDisabled = false) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = `px-2 py-1 mx-1 rounded ${
      isActive ? "bg-secondary text-dark" : "bg-light text-dark"
    }`;
    btn.disabled = isActive || isDisabled;
    if (!btn.disabled) {
      btn.addEventListener("click", () => {
        onPageClick(page);
        document
          .getElementById("feed-listings")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
    return btn;
  };

  const addEllipsis = () => {
    const span = document.createElement("span");
    span.textContent = "...";
    span.className = "mx-1 text-gray-500";
    container.appendChild(span);
  };

  const start = Math.max(2, currentPage - 2);
  const end = Math.min(totalPages - 1, currentPage + 2);

  container.appendChild(createButton(1, 1, currentPage === 1));

  if (start > 2) addEllipsis();

  for (let i = start; i <= end; i++) {
    container.appendChild(createButton(i, i, currentPage === i));
  }

  if (end < totalPages - 1) addEllipsis();

  if (totalPages > 1) {
    container.appendChild(
      createButton(totalPages, totalPages, currentPage === totalPages)
    );
  }
}
