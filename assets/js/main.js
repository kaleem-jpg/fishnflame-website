(() => {
  const doc = document.documentElement;
  doc.classList.add("js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Sticky nav background
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Reveal on scroll, staggered within each parent
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 6) * 0.08}s`);
  });
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // 700 counter
  const counter = document.querySelector("[data-count]");
  if (counter) {
    const target = Number(counter.dataset.count);
    const run = () => {
      if (reduceMotion) { counter.textContent = target; return; }
      const start = performance.now(), dur = 1800;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        counter.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { run(); obs.disconnect(); }
    }, { threshold: 0.5 }).observe(counter);
  }

  // Closing logo animation: load the right video only when it is near the viewport
  const closing = document.querySelector(".closing");
  if (closing) {
    const videos = closing.querySelectorAll("video[data-src]");
    const pick = () => [...videos].find((v) => getComputedStyle(v).display !== "none");
    new IntersectionObserver((entries) => {
      const v = pick();
      if (!v) return;
      if (entries[0].isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        if (!reduceMotion) v.play().catch(() => {});
      } else {
        v.pause();
      }
    }, { threshold: 0.25 }).observe(closing);
  }

  // Careers form (posts to FormSubmit, which emails info@fishnflame.in)
  const form = document.getElementById("careersForm");
  if (form) {
    const success = document.getElementById("formSuccess");
    const error = document.getElementById("formError");
    const next = document.getElementById("formNext");
    const MAX_CV = 5 * 1024 * 1024;

    // Return to this same page after sending, on whichever domain the site is served from
    next.value = `${location.origin}/careers?sent=1#apply`;

    if (new URLSearchParams(location.search).get("sent") === "1") {
      form.hidden = true;
      success.hidden = false;
      window.addEventListener("load", () => success.scrollIntoView({ block: "center" }));
    }

    form.addEventListener("submit", (e) => {
      error.hidden = true;
      const cv = form.querySelector('input[type="file"]').files[0];
      if (cv && cv.size > MAX_CV) {
        e.preventDefault();
        error.textContent = "Your CV is larger than 5 MB. Please upload a smaller file.";
        error.hidden = false;
        return;
      }
      const btn = form.querySelector(".form__submit");
      btn.disabled = true;
      btn.textContent = "Sending…";
    });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
