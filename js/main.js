

document.addEventListener("DOMContentLoaded", () => {
  var swiper = new Swiper(".swiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
      autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroBtn = document.querySelector(".hero-cta");

  const innerBannerTitle = document.querySelector(".inner-banner h1");
  const innerBannerSubtitle = document.querySelector(".inner-banner p");

  innerBannerTitle?.classList.add("visible");
  innerBannerSubtitle?.classList.add("visible");

  heroTitle.classList.add("visible");
  heroSubtitle.classList.add("visible");
  heroBtn.classList.add("visible");

// Select all accordion buttons
const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        const isActive = content.classList.contains("active");

        // Close all accordion items with animation
        document.querySelectorAll(".accordion-content").forEach(item => {
            if (item.classList.contains("active")) {
                item.style.maxHeight = item.scrollHeight + "px"; // Set maxHeight to current height
                setTimeout(() => {
                    item.style.maxHeight = null; // Animate closing
                }, 0);
            }
            item.classList.remove("active");
        });

        // If the clicked item wasn't active, open it with animation
        if (!isActive) {
            content.classList.add("active");
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});


 
// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Select the hero image
const heroImage = document.querySelector('.hero-image');
gsap.to(heroImage, {
  scale: 1.2,          // Zoom to 1.2x
  duration: 15,        // Time for one full zoom cycle
  yoyo: true,          // Reverse zoom after completing
  repeat: -1,          // Infinite loop
  ease: 'power1.inOut' // Smooth easing
});


gsap.to(heroImage, {
  y: -200, // Moves the image upward (parallax effect)
  ease: 'none', // Linear easing for a smooth parallax effect
  scrollTrigger: {
    trigger: '#home', // Element to monitor
    start: 'top top',               // When the top of the container hits the top of the viewport
    end: 'bottom top',              // When the bottom of the container hits the top of the viewport
    scrub: true                     // Smoothly link animation to scroll
  }
});

  // Create the zoom anima
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY; // Current scroll position
   
    const parallaxShift = scrollY * 0.1 ; // Adjust parallax speed (tweak multiplier)

    heroImage.style.transform = `translateY(-${parallaxShift}px)`;
  });


});
