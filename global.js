document.addEventListener("DOMContentLoaded", () => {
  // --------- Scroll Offset Fix for Anchor Links ---------
  const OFFSET = 90;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (href.length > 1 && !href.includes(".html")) {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - OFFSET,
            behavior: "smooth"
          });
        }
      });
    }
  });

  // --------- Animated Number Counters ---------
  const counters = document.querySelectorAll(".counter-number");
  const animateCounter = (el) => {
    const target = +el.getAttribute("data-target");
    let count = 0;
    const speed = Math.ceil(target / 100);

    const formatNumber = (num) => {
      if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
      if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
      return num;
    };

    const step = () => {
      if (count < target) {
        count += speed;
        if (count > target) count = target;

        const formatted = el.classList.contains("dollar")
          ? "$" + formatNumber(count)
          : formatNumber(count);

        el.innerText = formatted;
        requestAnimationFrame(step);
      }
    };

    step();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) animateCounter(entry.target);
    });
  }, { threshold: 0.8 });

  counters.forEach((counter) => counterObserver.observe(counter));

  // --------- Reveal on Scroll for Sections + .reveal Elements ---------
  const sections = document.querySelectorAll("section");
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add("reveal");
    revealObserver.observe(section);
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --------- Mobile Overlay Nav Toggle ---------
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeNav = document.getElementById("closeNav");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (navToggle && mobileNav && closeNav) {
    // ✅ Show mobile nav
    navToggle.addEventListener("click", () => {
      mobileNav.classList.add("active");
      navToggle.classList.add("open");
    });

    // ✅ Close mobile nav
    closeNav.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      navToggle.classList.remove("open");
      mobileLinks.forEach(link => link.classList.remove("open"));
    });

    // ✅ Toggle submenu one at a time
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        const isOpen = link.classList.contains("open");
        mobileLinks.forEach(l => l.classList.remove("open"));
        if (!isOpen) {
          link.classList.add("open");
        }
      });
    });
  }

  // --------- Desktop Dropdown Hover Toggle (No JS Needed) ---------
});
