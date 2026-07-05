// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Dark mode toggle with saved preference
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (saved === "dark" || (!saved && prefersDark)) {
  root.setAttribute("data-theme", "dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙";
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️";
  }
});
