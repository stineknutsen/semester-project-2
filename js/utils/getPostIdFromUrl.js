export function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}
