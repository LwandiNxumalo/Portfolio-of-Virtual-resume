// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, observerOptions);
  const animatedElements = document.querySelectorAll(".contact-container, .section-title, .about-container");
  animatedElements.forEach(el => observer.observe(el));

  // 2. Mobile Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  // Updated selector to target anchor tags directly inside .nav-menu
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (hamburger && navMenu) {
    // Toggle menu open/close
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Auto-close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Formspree AJAX Submission
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
      e.preventDefault(); // Stop page redirect
      
      const formData = new FormData(contactForm);
      const button = contactForm.querySelector("button[type='submit']");
      const originalText = button.textContent;
      
      button.textContent = "Sending...";
      button.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          button.textContent = "Message Sent! ✓";
          button.style.backgroundColor = "#22c55e"; // Success green

          setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = "";
            button.disabled = false;
          }, 4000);
        } else {
          button.textContent = "Error! Try Again";
          button.style.backgroundColor = "#ef4444"; // Failure red
          setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = "";
            button.disabled = false;
          }, 3000);
        }
      } catch (error) {
        button.textContent = "Error! Try Again";
        button.style.backgroundColor = "#ef4444";
        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = "";
          button.disabled = false;
        }, 3000);
      }
    });
  }
});

// Clear inputs if coming back via browser back button
window.addEventListener("pageshow", () => {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.reset();
  }
});