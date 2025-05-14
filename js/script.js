import { loginHandler } from "./handlers/auth/loginHandler.js";
import { registerHandler } from "./handlers/auth/registerHandler.js";
import { toggleDropdown } from "./utils/toggleDropdown.js";
import { toggleMenu } from "./utils/toggleMenu.js";
import { updateHeader } from "./utils/updateHeader.js";
import { displayProfile } from "./handlers/profile/displayProfile.js";
import { createListingHandler } from "./handlers/listings/createListingHandler.js";
import { displayFeedListings } from "./handlers/listings/displayFeedListings.js";

function router() {
  const { pathname } = window.location;

  switch (pathname) {
    case "/":
    case "/index":
    case "/index.html":
      createListingHandler();
      displayFeedListings();
      break;
    case "/account/register":
    case "/account/register.html":
      registerHandler();
      break;
    case "/account/login":
    case "/account/login.html":
      loginHandler();
      break;
    case "/account/profile":
    case "/account/profile.html":
      displayProfile();
      break;
  }
}

updateHeader();
toggleMenu();
toggleDropdown();

router();
