export function showLoader(loaderId) {
  const container = document.getElementById(loaderId);
  if (!container) {
    return;
  }
  const loader = container.querySelector("svg");
  if (loader) {
    loader.classList.remove("hidden");
  }
}

export function hideLoader(loaderId) {
  const container = document.getElementById(loaderId);
  if (!container) {
    return;
  }
  const loader = container.querySelector("svg");
  if (loader) {
    loader.classList.add("hidden");
  }
}
