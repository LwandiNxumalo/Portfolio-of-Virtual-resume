// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // Options for the observer (triggers when 15% of element is visible)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  // Callback function executed when an element enters or leaves the screen
  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the class that triggers the CSS transition
        entry.target.classList.add("visible");
        // Stop observing once animated so it doesn't re-trigger
        observer.unobserve(entry.target);
      }
    });
  };

  // Create the observer instance
  const observer = new IntersectionObserver(revealOnScroll, observerOptions);

  // Target elements to animate (Contact section container + section titles)
  const animatedElements = document.querySelectorAll(".contact-container, .section-title, .about-container");
  
  // Start observing each element
  animatedElements.forEach(el => observer.observe(el));

  // --- Mobile Hamburger Menu Toggle ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    if (hamburger && navMenu) {
        // 1. Toggle menu when hamburger icon is clicked
        hamburger.addEventListener("click", () => {
            const isOpen = hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            // Accessibility update for screen readers
            hamburger.setAttribute("aria-expanded", isOpen);
        });
        // 2. Automatically close menu when any link is clicked
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }
});

