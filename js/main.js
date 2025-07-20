document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const header = document.querySelector("header");
  const menuBtn = document.querySelector(".menu-button");
  const navbar = document.querySelector(".navbar");

  menuBtn?.addEventListener("click", () => {
    try {
      menuBtn.classList.toggle("opened");
      navbar.classList.toggle("open");
    } catch (error) {
      console.error("Error toggling menu:", error);
    }
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
  if (currentPage === "/index.html" || currentPage === "/" || currentPage.endsWith("index.html")) {
    try {
      gsap.utils.toArray("section").forEach((section) => {
        const heading = section.querySelector("h2");

        if (heading) {
          // Animate the h2 when the section scrolls into view
          gsap.fromTo(
            heading,
            {
              opacity: 0,
              y: 50, // Start slightly off-screen to the right
            },
            {
              scrollTrigger: {
                trigger: section,
                markers: false,
                start: "top 100%", // Animation starts when the top of the section is 80% from the top of the viewport
                end: "top 40%", // Animation ends as the section scrolls further into view
                scrub: true,
                toggleActions: "play none none reverse",
              },
              opacity: 1,
              y: 0, // Move back to the center
              duration: 1,
              ease: "power2.out",
            }
          );
        }
      });
    } catch (error) {
      console.error("Error initializing GSAP animations:", error);
    }

    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroBtn = document.querySelector(".hero-cta");

    heroTitle?.classList.add("visible");
    heroSubtitle?.classList.add("visible");
    heroBtn?.classList.add("visible");

    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {
      try {
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

        // Create the parallax effect
        window.addEventListener("scroll", () => {
          try {
            const scrollY = window.scrollY; // Current scroll position
            const parallaxShift = scrollY * 0.1; // Adjust parallax speed (tweak multiplier)
            heroImage.style.transform = `translateY(-${parallaxShift}px)`;
          } catch (error) {
            console.error("Error in parallax scroll handler:", error);
          }
        });
      } catch (error) {
        console.error("Error initializing hero image animations:", error);
      }
    }
  } else if (currentPage === "/about.html" || currentPage.endsWith("about.html")) {
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
  } else if (currentPage === "/menu.html" || currentPage.endsWith("menu.html")) {
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

  // Universal button functionality

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Book Venue buttons
  document.querySelectorAll('button, .cta').forEach(button => {
    if (button.textContent.includes('Book Venue')) {
      button.addEventListener('click', () => {
        // Scroll to contact section or redirect to contact page
        if (document.querySelector('#contact')) {
          document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = 'contact.html';
        }
      });
    }
  });

  // Hero buttons functionality
  document.querySelectorAll('button').forEach(button => {
    const text = button.textContent.trim();

    if (text === 'Our Blends') {
      button.addEventListener('click', () => {
        window.location.href = 'menu.html';
      });
    } else if (text === 'Take A Tour') {
      button.addEventListener('click', () => {
        window.location.href = 'about.html';
      });
    }
  });

  // CTA Arrow buttons functionality
  document.querySelectorAll('.cta-arrrow').forEach(button => {
    button.addEventListener('click', () => {
      const text = button.textContent.trim();

      switch(text) {
        case 'Read More':
          // If on blog page, go to post page, otherwise go to blog
          if (currentPage.includes('blog')) {
            window.location.href = 'post.html';
          } else {
            window.location.href = 'blog.html';
          }
          break;
        case 'Get A Taste':
          window.location.href = 'menu.html';
          break;
        case 'Book Now':
          window.location.href = 'contact.html';
          break;
        case 'Send':
          // This is now handled by the form submit event
          break;
        default:
          console.log('CTA button clicked:', text);
      }
    });
  });

  // Get Directions button
  document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Get Directions')) {
      button.addEventListener('click', () => {
        // Open Google Maps with the coffee shop location
        const address = "123 Coffee Lane, Coffee City, CA 12345";
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
      });
    }
  });

  // Form submission handling
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check if this is a contact form (has name and message fields)
      const nameInput = form.querySelector('input[name="name"]');
      const messageInput = form.querySelector('textarea[name="message"]');

      if (nameInput && messageInput) {
        // Contact form handling
        const emailInput = form.querySelector('input[type="email"]');
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff0000';
            input.style.borderWidth = '2px';
          } else {
            input.style.borderColor = '';
            input.style.borderWidth = '';
          }
        });

        if (isValid && emailInput) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(emailInput.value)) {
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
          } else {
            alert('Please enter a valid email address.');
            emailInput.style.borderColor = '#ff0000';
            emailInput.style.borderWidth = '2px';
          }
        } else if (!isValid) {
          alert('Please fill in all required fields.');
        }
      } else {
        // Newsletter subscription form handling
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(emailInput.value)) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
          } else {
            alert('Please enter a valid email address.');
            emailInput.style.borderColor = '#ff0000';
            emailInput.style.borderWidth = '2px';
          }
        }
      }
    });
  });

  // Social media links - prevent broken links
  document.querySelectorAll('.social-links a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = link.getAttribute('aria-label');
      alert(`Follow us on ${platform}! Social media links will be available soon.`);
    });
  });

  // Handle footer legal links
  document.querySelectorAll('.footer-legal a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const linkText = link.textContent;
      alert(`${linkText} page coming soon!`);
    });
  });
});
