// cookieConsent.js

function acceptCookies() {
  document.cookie = "cookiesAccepted=true; path=/; max-age=31536000"; // 1 year
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.style.display = "none";
}

function declineCookies() {
  document.cookie = "cookiesAccepted=false; path=/; max-age=31536000";
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.style.display = "none";
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

window.addEventListener("DOMContentLoaded", () => {
  const decision = getCookie("cookiesAccepted");
  const banner = document.getElementById("cookie-banner");
  if (banner && (decision === "true" || decision === "false")) {
    banner.style.display = "none";
  }
});