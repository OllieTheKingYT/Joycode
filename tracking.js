// tracking.js

// Cookie Consent Logic
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

// Cookie Reader
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Consent Check
function cookiesAllowed() {
  return getCookie("cookiesAccepted") === "true";
}

// Page Visit Tracker
function trackPageVisit(pageName) {
  if (!cookiesAllowed()) return;
  let visits = JSON.parse(getCookie("pageVisits") || "{}");
  visits[pageName] = (visits[pageName] || 0) + 1;
  document.cookie = `pageVisits=${JSON.stringify(visits)}; path=/; max-age=31536000`;
}

// Time-on-Page Tracker
let startTime = Date.now();
window.addEventListener("beforeunload", () => {
  if (!cookiesAllowed()) return;
  let duration = Math.floor((Date.now() - startTime) / 1000); // seconds
  let timeData = JSON.parse(getCookie("timeSpent") || "{}");
  let page = window.location.pathname;
  timeData[page] = (timeData[page] || 0) + duration;
  document.cookie = `timeSpent=${JSON.stringify(timeData)}; path=/; max-age=31536000`;
});

// Form Submission Tracker + Badge Unlock
function trackFormSubmit(formName) {
  if (!cookiesAllowed()) return;
  let submits = JSON.parse(getCookie("formSubmits") || "{}");
  submits[formName] = (submits[formName] || 0) + 1;
  document.cookie = `formSubmits=${JSON.stringify(submits)}; path=/; max-age=31536000`;

  if (submits[formName] >= 3) {
    document.cookie = "talkativeBadge=unlocked; path=/; max-age=31536000";
    console.log("🎉 Talkative badge unlocked!");
  }
}

// Auto-hide banner if already accepted/declined
window.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (banner && (getCookie("cookiesAccepted") === "true" || getCookie("cookiesAccepted") === "false")) {
    banner.style.display = "none";
  }
});