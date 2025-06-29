// script.js – Index-only logic for RealtorDemoMaxV3

document.addEventListener("DOMContentLoaded", () => {
  // --------- Listings (Dynamic Cards) ---------
  const listings = [
    {
      title: "Modern Home",
      description: "2-bed, 2-bath in the heart of Dallas. Great views and amenities.",
      price: "$420,000",
      image: "IMG_4458.jpg"
    },
    {
      title: "Spacious Suburban Home",
      description: "4-bed home with updated kitchen and large backyard.",
      price: "$599,000",
      image: "IMG_4459.jpg"
    },
    {
      title: "Modern Downtown Apartment",
      description: "3-bed gem for first-time buyers in a quiet neighborhood.",
      price: "$315,000",
      image: "IMG_4460.jpg"
    }
  ];

  const listingContainer = document.querySelector(".listing-carousel");
  if (listingContainer) {
    listings.forEach(({ title, description, price, image }) => {
      const card = document.createElement("div");
      card.className = "listing-card";
      card.innerHTML = `
      <div class="listing-img-wrapper">
        <img src="${image}" alt="${title}" />
      </div>
      <div class="listing-info">
        <h4 class="listing-title">${title}</h4>
        <p class="listing-description">${description}</p>
        <span class="listing-price">${price}</span>
      </div>
    `;
    
      listingContainer.appendChild(card);
    });
  }

 // --------- Testimonials (Carousel with Stars) ---------
const testimonials = [
  {
    quote: "Edgar was professional, responsive, and truly had our best interests at heart.",
    author: "Samantha L."
  },
  {
    quote: "His strategy got us multiple offers above asking — couldn’t recommend more!",
    author: "Jason & Marissa"
  },
  {
    quote: "As a first-time buyer, I felt confident every step. Edgar is the real deal.",
    author: "Carlos V."
  }
];

let currentIndex = 0;

const textEl = document.getElementById("testimonial-text");
const nameEl = document.getElementById("testimonial-name");
const leftBtn = document.querySelector(".testimonial-btn.left");
const rightBtn = document.querySelector(".testimonial-btn.right");

function updateTestimonial(index) {
  textEl.textContent = `“${testimonials[index].quote}”`;
  nameEl.textContent = `– ${testimonials[index].author}`;
}

leftBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonial(currentIndex);
});

rightBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateTestimonial(currentIndex);
});

// Initialize on load
updateTestimonial(currentIndex);


  // --------- Contact Form Confirmation ---------
  const form = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation-message");

  if (form && confirmation) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.reset();
      confirmation.textContent = "Message received! Edgar will reach out shortly.";
      confirmation.classList.add("show");
      setTimeout(() => {
        confirmation.classList.remove("show");
        confirmation.textContent = "";
      }, 4000);
    });
  }

  // --------- Counters with Suffix Formatting ---------
  const counters = document.querySelectorAll(".counter-number");
  const animateCounter = (el) => {
    const raw = +el.getAttribute("data-target");
    const suffix = raw >= 1000000 ? "M" : raw >= 1000 ? "K" : "";
    const target = raw;
    let count = 0;
    const speed = Math.ceil(target / 100);
    const step = () => {
      if (count < target) {
        count += speed;
        if (count > target) count = target;

        let display = count;
        if (suffix === "M") display = (count / 1000000).toFixed(1) + "M";
        else if (suffix === "K") display = (count / 1000).toFixed(1) + "K";

        el.innerText = display;
        requestAnimationFrame(step);
      }
    };
    step();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCounter(entry.target);
    });
  }, { threshold: 0.7 });

  counters.forEach(counter => counterObserver.observe(counter));
});
