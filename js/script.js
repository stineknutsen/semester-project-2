import { registerHandler } from "./handlers/auth/registerHandler.js";
import { toggleDropdown } from "./utils/toggleDropdown.js";
import { toggleMenu } from "./utils/toggleMenu.js";

function router() {
  const { pathname } = window.location;

  switch (pathname) {
    case "/":
    case "/index":
    case "/index.html":
      createListing();
      displayFeed();
      break;
    case "/account/register":
    case "/account/register.html":
      registerHandler();
      break;
    case "/account/login":
    case "/account/login.html":
      loginHandler();
      break;
  }
}

toggleMenu();
toggleDropdown();

router();
