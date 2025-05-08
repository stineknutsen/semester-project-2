import { loginUser } from "../../api/auth/loginUser.js";
import { setToken, setUsername } from "../../utils/localStorage.js";
import { displayMessage } from "../../utils/displayMessage.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { updateHeader } from "../../utils/updateHeader.js";

export function loginHandler() {
  const loginForm = document.querySelector("#login-form");
  const messageContainer = document.querySelector("#message-container");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      showLoader("loader");

      try {
        await submitLoginForm(event);
        hideLoader("loader");
        displayMessage(
          messageContainer,
          "success",
          "Login successful! Redirecting..."
        );
        setTimeout(() => {
          location.href = "/account/profile.html";
        }, 1500);
      } catch (error) {
        hideLoader("loader");
        if (Array.isArray(error)) {
          displayMessage(messageContainer, "error", error);
        } else {
          displayMessage(
            messageContainer,
            "error",
            error.message || "Login failed"
          );
        }
      }
    });
  }
}

async function submitLoginForm(event) {
  const form = event.target;
  const formData = new FormData(form);
  const credentials = Object.fromEntries(formData);

  try {
    const data = await loginUser(credentials);
    setToken(data.data.accessToken);
    setUsername(data.data.name);
  } catch (error) {
    throw error;
  }
}
