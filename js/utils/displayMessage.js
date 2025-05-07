export function displayMessage(container, type, message) {
  if (!container) {
    return;
  }

  const colorClass =
    type === "success"
      ? "bg-green-100 border-green-300 text-green-600"
      : "bg-red-100 border-red-300 text-red-600";

  if (Array.isArray(message)) {
    container.innerHTML = `
      <div class=" ${colorClass} border text-center p-3">
        <ul class="list-none p-0 m-0">
          ${message.map((msg) => `<li>${msg}</li>`).join("")}
        </ul>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class=" ${colorClass} border text-center p-3">
        ${message}
      </div>
    `;
  }
}
