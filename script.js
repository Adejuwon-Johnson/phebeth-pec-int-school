document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");

      const expanded = menuToggle.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", expanded);
    });

    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =========================================
     STICKY HEADER
  ========================================= */

  const header = document.querySelector(".site-header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }


  /* =========================================
     SCROLL REVEAL ANIMATION
  ========================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .section-header, .academic-card, .value-card, .objective-card, .gallery-item"
  );

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }


  /* =========================================
     SMOOTH SCROLLING
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });


  /* =========================================
     BACK TO TOP BUTTON
  ========================================= */

  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }


  /* =========================================
     CURRENT YEAR
  ========================================= */

  const yearElements = document.querySelectorAll(".current-year");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  /* =========================================
     ADMISSION / CONTACT FORM
  ========================================= */

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      if (submitButton) {
        const originalText =
          submitButton.textContent || submitButton.value;

        if (submitButton.tagName === "INPUT") {
          submitButton.value = "Sending...";
        } else {
          submitButton.textContent = "Sending...";
        }

        submitButton.disabled = true;

        setTimeout(() => {
          alert(
            "Thank you for contacting Phebeth-PEC International School. We have received your message and will get back to you shortly."
          );

          form.reset();

          if (submitButton.tagName === "INPUT") {
            submitButton.value = originalText;
          } else {
            submitButton.textContent = originalText;
          }

          submitButton.disabled = false;
        }, 1000);
      }
    });
  });


  /* =========================================
     GALLERY IMAGE FALLBACK
  ========================================= */

  const galleryImages = document.querySelectorAll(".gallery img");

  galleryImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.src =
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80";
    });
  });


  /* =========================================
     ACTIVE NAVIGATION LINK
  ========================================= */

  const sections = document.querySelectorAll("section[id]");
  const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if (sections.length > 0 && navigationLinks.length > 0) {
    window.addEventListener("scroll", () => {
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      navigationLinks.forEach((link) => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    });
  }
});