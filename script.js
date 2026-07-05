// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
const toggle = document.getElementById("theme-toggle");
const toggleIcon = toggle.querySelector(".material-symbols-rounded");
const root = document.documentElement;

function applyTheme(dark) {
  if (dark) {
    root.setAttribute("data-theme", "dark");
    toggleIcon.textContent = "light_mode";
  } else {
    root.removeAttribute("data-theme");
    toggleIcon.textContent = "dark_mode";
  }
}

const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(saved === "dark" || (!saved && prefersDark));

toggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  applyTheme(!isDark);
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

// ---------- App bar elevation on scroll ----------
const appBar = document.getElementById("app-bar");
window.addEventListener(
  "scroll",
  () => appBar.classList.toggle("app-bar--scrolled", window.scrollY > 8),
  { passive: true }
);

// ---------- M3 ripple on buttons ----------
document.querySelectorAll(".button, .icon-button").forEach((el) => {
  el.addEventListener("pointerdown", (e) => {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

// ---------- Scroll reveal ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
