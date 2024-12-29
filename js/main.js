document.addEventListener("DOMContentLoaded", () => {
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
    trigger: '.parallax-container', // Element to monitor
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

  const reviews = document.querySelectorAll(".review");

  const nextReview = document.querySelector(".next-review");
  const prevReview = document.querySelector(".pre-review");

  let currentReview = 0;

  nextReview.addEventListener("click", () => {
    console.log("next clicked");
    reviews[currentReview].classList.remove("visible");
    currentReview = (currentReview + 1) % reviews.length;
    reviews[currentReview].classList.add("visible");
  });

  prevReview.addEventListener("click", () => {
    console.log("prev clicked");
    reviews[currentReview].classList.remove("visible");
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    reviews[currentReview].classList.add("visible");
  });
  setInterval(() => {
    reviews[currentReview].classList.remove("visible");
    currentReview = (currentReview + 1) % reviews.length;
    reviews[currentReview].classList.add("visible");
  }, 2000);
});
