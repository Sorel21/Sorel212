const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const progress = document.querySelector(".scroll-progress span");
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = pct + "%";
}
updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

revealItems.forEach(function(el, index) {
  el.style.transitionDelay = Math.min(index % 4, 3) * 55 + "ms";
  observer.observe(el);
});

const glow = document.querySelector(".pointer-glow");
window.addEventListener("pointermove", function(event) {
  if (!glow) return;
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
}, { passive: true });

document.querySelectorAll(".spotlight").forEach(function(card) {
  card.addEventListener("pointermove", function(event) {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", (event.clientX - rect.left) + "px");
    card.style.setProperty("--my", (event.clientY - rect.top) + "px");
  });
});

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
navToggle.addEventListener("click", function() {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(function(link) {
  link.addEventListener("click", function() {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

if (!window.matchMedia("(pointer: coarse)").matches) {
  document.querySelectorAll(".project").forEach(function(card) {
    card.addEventListener("pointermove", function(event) {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = "translateY(-4px) rotateX(" + (y * -0.8) + "deg) rotateY(" + (x * 0.8) + "deg)";
    });
    card.addEventListener("pointerleave", function() {
      card.style.transform = "";
    });
  });
}