document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const header = document.querySelector("header");
  const menuBtn = document.querySelector(".menu-button");
  const navbar = document.querySelector(".navbar");

  menuBtn?.addEventListener("click", () => {
    const menuLinks = document.querySelector(".menu-links");
    menuBtn.classList.toggle("opened");
    navbar.classList.toggle("open");
  });
  if (header) {
    document.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  const currentPage = window.location.pathname;
  if (currentPage === "/index.html") {
    gsap.utils.toArray(".content").forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 110%",
            end: "bottom 90%",
            scrub: true,
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        section,
        {
          opacity: 1,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: "bottom 20%",
            end: "bottom",
            scrub: true,
            toggleActions: "none none none none",
          },
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        }
      );
    });

    var swiper = new Swiper(".swiper", {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      // Responsive breakpoints

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        425: {
          slidesPerView: 1,
        },
      },
    });
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroBtn = document.querySelector(".hero-cta");

    heroTitle?.classList.add("visible");
    heroSubtitle?.classList.add("visible");
    heroBtn?.classList.add("visible");

    const heroImage = document.querySelector(".hero-image");
    // gsap.to(heroImage, {
    //   scale: 1.2, // Zoom to 1.2x
    //   duration: 15, // Time for one full zoom cycle
    //   yoyo: true, // Reverse zoom after completing
    //   repeat: -1, // Infinite loop
    //   ease: "power1.inOut", // Smooth easing
    // });

    gsap.to(heroImage, {
      y: -200, // Moves the image upward (parallax effect)
      ease: "none", // Linear easing for a smooth parallax effect
      scrollTrigger: {
        trigger: "#home", // Element to monitor
        start: "top top", // When the top of the container hits the top of the viewport
        end: "bottom top", // When the bottom of the container hits the top of the viewport
        scrub: true, // Smoothly link animation to scroll
      },
    });

    // Create the zoom anima
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY; // Current scroll position
      const parallaxShift = scrollY * 0.1; // Adjust parallax speed (tweak multiplier)
      heroImage.style.transform = `translateY(-${parallaxShift}px)`;
    });
  } else if (currentPage === "/about.html") {
    const accordionButtons = document.querySelectorAll(".accordion-button");
    accordionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        const isActive = content.classList.contains("active");

        // Close all accordion items with animation
        document.querySelectorAll(".accordion-content").forEach((item) => {
          if (item.classList.contains("active")) {
            item.style.maxHeight = item.scrollHeight + "px"; // Set maxHeight to current height
            setTimeout(() => {
              item.style.maxHeight = null; // Animate closing
            }, 0);
          }
          item.classList.remove("active");
          item.previousElementSibling.querySelector(
            ".accordion-icon"
          ).textContent = "+";
        });

        // If the clicked item wasn't active, open it with animation
        if (!isActive) {
          content.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
          // Change the icon to minus
          button.querySelector(".accordion-icon").textContent = "-";
        }
      });
    });
  } else if (currentPage === "/menu.html") {
    // Select buttons and sections
    const buttons = {
      coffee: document.querySelector("#menu-coffee-btn"),
      pastries: document.querySelector("#menu-pastries-btn"),
      all: document.querySelector("#menu-all-btn"),
    };

    const sections = {
      coffee: document.querySelector("#menu-coffee"),
      pastries: document.querySelector("#menu-pastries"),
      all: document.querySelector("#menu-all"),
    };

    const setActiveSection = (activeKey) => {
      Object.keys(sections).forEach((key) => {
        console.log(key, activeKey);
        if (key === activeKey) {
          sections[key]?.classList.add("active");
        } else {
          sections[key]?.classList.remove("active");
        }
      });
      Object.keys(buttons).forEach((key) => {
        if (key === activeKey) {
          buttons[key]?.classList.add("active");
        } else {
          buttons[key]?.classList.remove("active");
        }
      });
    };

    // Add event listeners for each button
    buttons.coffee?.addEventListener("click", () => setActiveSection("coffee"));
    buttons.pastries?.addEventListener("click", () =>
      setActiveSection("pastries")
    );
    buttons.all?.addEventListener("click", () => setActiveSection("all"));
  } else {
    const innerBannerTitle = document.querySelector(".inner-banner h1");
    const innerBannerSubtitle = document.querySelector(".inner-banner p");

    innerBannerTitle?.classList.add("visible");
    innerBannerSubtitle?.classList.add("visible");
  }

  // Select all accordion buttons
});
