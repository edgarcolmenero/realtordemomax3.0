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
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add("reveal");
    revealObserver.observe(section);
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --------- Dropdown Toggle for Mobile Nav ---------
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".dropdown-menu");

    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        menu.classList.toggle("show");
      }
    });
  });

  // --------- Close all dropdowns on outside click ---------
  document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        const menu = dropdown.querySelector(".dropdown-menu");
        menu.classList.remove("show");
      }
    });
  });

function toggleNav() {
  const nav = document.querySelector('.nav-links ul');
  nav.classList.toggle('active');
}

document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.parentElement.classList.toggle('open');
    }
  });
});
  
  // --------- Mobile Hamburger Toggle ---------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      navToggle.classList.toggle("open");
    });
  }
});

// ===== Mobile Overlay Nav Toggle =====
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeNav = document.getElementById("closeNav");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Open mobile nav
  navToggle.addEventListener("click", () => {
    mobileNav.classList.add("active");
  });

  // Close mobile nav
  closeNav.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    navToggle.classList.remove("open"); // ✅ resets hamburger to default
    mobileLinks.forEach(link => link.classList.remove("open"));
  });
  

  // Toggle submenus and collapse others
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      const isOpen = link.classList.contains("open");

      // Close all submenus
      mobileLinks.forEach(l => l.classList.remove("open"));

      // Open this one if it wasn't already open
      if (!isOpen) {
        link.classList.add("open");
      }
    });
  });
});
 2bd8204 (Final site updates: mobile nav, hero responsiveness)
