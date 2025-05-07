import { registerUser } from "../../api/auth/registerUser.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { displayMessage } from "../../ui/displayMessage.js";

export function registerHandler() {
  const registerForm = document.querySelector("#register-form");
  const messageContainer = document.querySelector("#message-container");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      showLoader("loader");

      try {
        await submitRegisterForm(event);
        hideLoader("loader");
        displayMessage(
          messageContainer,
          "success",
          "Registration successful! Redirecting..."
        );
        setTimeout(() => {
          location.href = "/account/login.html";
        }, 1500);
      } catch (error) {
        hideLoader("loader");
        if (Array.isArray(error)) {
          displayMessage(messageContainer, "error", error);
        } else {
          displayMessage(
            messageContainer,
            "error",
            error.message || "Registration failed"
          );
        }
      }
    });
  }
}

async function submitRegisterForm(event) {
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    await registerUser(data);
  } catch (error) {
    throw error;
  }
}
