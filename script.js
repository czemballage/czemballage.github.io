// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((elem) => {
  observer.observe(elem);
});

// Enhanced header scroll animation
function initHeaderAnimation() {
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Slightly different behavior for desktop and mobile
    if (window.innerWidth > 768) {
      // Desktop behavior
      if (scrollTop > 100) {
        header.style.backdropFilter = 'blur(10px)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.backdropFilter = 'blur(0px)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = 'none';
      }
    } else {
      // Mobile behavior with hide/show on scroll
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
      } else {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// Improved loading animation
function initImprovedLoading() {
  const loadingScreen = document.getElementById('loading-screen');
  
  if (loadingScreen) {
    // Create a more dynamic loading animation
    const loadingAnimation = gsap.timeline({
      defaults: { ease: "power3.out" }
    });
    
    loadingAnimation
      .from('.loading-content dotlottie-player', { scale: 0.8, opacity: 0, duration: 0.8 })
      .from('.loading-text .cz', { y: 30, opacity: 0, duration: 0.5 }, "-=0.3")
      .from('.loading-text .emballage', { y: 30, opacity: 0, duration: 0.5 }, "-=0.2");
    
    // Remove loading screen with better transition
    window.addEventListener('load', function() {
      setTimeout(() => {
        gsap.to(loadingScreen, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            loadingScreen.style.visibility = "hidden";
            setTimeout(() => loadingScreen.remove(), 100);
            // Animate page elements after loading
            animatePageElements();
          }
        });
      }, 2000);
    });
  }
}

// Animate page elements after loading
function animatePageElements() {
  // Fade in hero section elements
  gsap.from('#home h1', { 
    opacity: 0, 
    y: 50, 
    duration: 1, 
    ease: 'power3.out' 
  });
  
  gsap.from('#home p', { 
    opacity: 0, 
    y: 30, 
    duration: 1, 
    delay: 0.3, 
    ease: 'power3.out' 
  });
  
  gsap.from('#hero-button', { 
    opacity: 0, 
    y: 30, 
    duration: 1, 
    delay: 0.5, 
    ease: 'back.out(1.7)' 
  });

  // Add smooth fade-in for all sections
  gsap.utils.toArray('section').forEach((section, i) => {
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// Enhanced hover effects for all interactive elements
function initEnhancedInteractions() {
  // Modern button hover effects
  const buttons = document.querySelectorAll('.btn-primary, button:not(.carousel-nav-button)');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 10px 25px rgba(229, 9, 20, 0.4)'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.in',
        boxShadow: '0 5px 15px rgba(229, 9, 20, 0.3)'
      });
    });
    
    // Add ripple effect on click
    button.addEventListener('click', function(e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Enhanced navigation links
  const navLinks = document.querySelectorAll('nav a, footer a');
  
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        color: '#E50914',
        duration: 0.3,
        ease: 'power1.out',
        fontWeight: 600
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        color: '',
        duration: 0.3,
        ease: 'power1.in',
        fontWeight: ''
      });
    });
  });
}

// Enhanced parallax effects
function initParallaxEffects() {
  // Hero section parallax
  gsap.to('#home', {
    backgroundPosition: '50% 30%',
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  // Content parallax for depth
  gsap.utils.toArray('.bg-parallax').forEach(parallaxElem => {
    gsap.to(parallaxElem, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: parallaxElem.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
  
  // Subtle parallax for text elements
  gsap.utils.toArray('section h2').forEach(heading => {
    gsap.to(heading, {
      backgroundPositionX: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: heading,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// Enhanced product cards interaction with modern 3D effect
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation values based on mouse position
      const rotateY = ((x - rect.width / 2) / rect.width) * 10;
      const rotateX = ((y - rect.height / 2) / rect.height) * -10;
      
      // Apply improved 3D effect with more subtle movement
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: `${rotateY/2}px ${rotateX/-2}px 20px rgba(0,0,0,0.1)`
      });
      
      // Create light reflection effect
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Create gradient highlight effect
      const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`;
      card.style.backgroundImage = shine;
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset card position with elastic animation
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        duration: 0.6,
        ease: 'elastic.out(1,0.5)',
        backgroundImage: 'none'
      });
    });
  });
}

// Enhanced Video Carousel
function initVideoCarousel() {
  // Check if carousel exists before initializing
  const carousel = document.querySelector('.video-carousel');
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.video-slide');
  let currentIndex = 0;

  // Create indicators
  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    indicators.appendChild(dot);
  });
  carousel.appendChild(indicators);

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');
      if (index === currentIndex) {
        slide.classList.add('active');
      } else if (index < currentIndex) {
        slide.classList.add('prev');
     }
      
      // Reset video when switching slides
      const iframe = slide.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
    });
    
    // Update indicators
    const indicatorDots = indicators.querySelectorAll('.carousel-indicator');
    indicatorDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlides();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }

  // Create and set up navigation buttons if they don't exist
  let prevButton = carousel.querySelector('#prevVideo');
  let nextButton = carousel.querySelector('#nextVideo');
  
  if (!prevButton) {
    prevButton = document.createElement('button');
    prevButton.id = 'prevVideo';
    prevButton.className = 'carousel-nav-button prev';
    prevButton.innerHTML = '<i class="ri-arrow-right-s-line"></i>';
    carousel.appendChild(prevButton);
  }
  
  if (!nextButton) {
    nextButton = document.createElement('button');
    nextButton.id = 'nextVideo';
    nextButton.className = 'carousel-nav-button next';
    nextButton.innerHTML = '<i class="ri-arrow-left-s-line"></i>';
    carousel.appendChild(nextButton);
  }
  
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Initialize first slide
  updateSlides();

  // Auto-advance slides every 10 seconds
  setInterval(nextSlide, 10000);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initVideoCarousel);

document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP animations
  gsapInit();
  
  // Enhanced mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenu.classList.toggle('hidden');
      
      if(mobileMenu.classList.contains('active')) {
        gsap.to(mobileMenu, {
          maxHeight: '300px',
          duration: 0.3,
          ease: 'power2.out'
        });
        mobileMenuButton.innerHTML = '<i class="ri-close-line ri-2x"></i>';
      } else {
        gsap.to(mobileMenu, {
          maxHeight: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => mobileMenu.classList.add('hidden')
        });
        mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-2x"></i>';
      }
    });
  }
  
  // Close mobile menu when clicking on links
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-2x"></i>';
      });
    });
  }

  // Initialize video carousel with better transitions
  initEnhancedVideoCarousel();
  
  // Animate product cards on hover with better effects
  initProductCards();
  
  // Add animated gradient background
  const body = document.body;
  body.classList.add('animated-gradient');
  
  // Add parallax effect to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const sectionTop = section.offsetTop;
      const distance = sectionTop - scrollPosition;
      
      if (section.querySelector('.bg-parallax')) {
        section.querySelector('.bg-parallax').style.transform = `translateY(${distance * 0.1}px)`;
      }
    });
  });
  
  // Add hover effects to all cards and buttons
  const cards = document.querySelectorAll('.product-card, .service-card, .testimonial-card, .video-showcase');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: 'power2.in'
      });
    });
  });
  
  // Fix scroll animations
  ScrollTrigger.batch(".fade-in", {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    }),
    start: "top 85%"
  });
  
  // Enhanced logo animation
  const logo = document.querySelector('header img');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      gsap.to(logo, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.3,
        ease: "power2.in"
      });
    });
  }
  
  // Add smooth reveal animations as sections come into view
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelectorAll('h2, h3, p, .grid > div'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Add animated text typing effect to main header
  const heroTitle = document.querySelector('#home h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        heroTitle.textContent += text[i];
      }, 100 * i);
    }
  }
});

// Modified loading sequence
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Remove loading screen after delay
    setTimeout(() => {
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          loadingScreen.style.visibility = "hidden";
          setTimeout(() => loadingScreen.remove(), 100);
        }
      });
    }, 2800);
  });
  
  // Initialize GSAP animations
  gsapInit();
  
  // Enhanced mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenu.classList.toggle('hidden');
      
      if(mobileMenu.classList.contains('active')) {
        gsap.to(mobileMenu, {
          maxHeight: '300px',
          duration: 0.3,
          ease: 'power2.out'
        });
        mobileMenuButton.innerHTML = '<i class="ri-close-line ri-2x"></i>';
      } else {
        gsap.to(mobileMenu, {
          maxHeight: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => mobileMenu.classList.add('hidden')
        });
        mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-2x"></i>';
      }
    });
  }
  
  // Close mobile menu when clicking on links
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-2x"></i>';
      });
    });
  }

  // Initialize video carousel with better transitions
  initEnhancedVideoCarousel();
  
  // Animate product cards on hover with better effects
  initProductCards();
  
  // Add animated gradient background
  const body = document.body;
  body.classList.add('animated-gradient');
  
  // Add parallax effect to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const sectionTop = section.offsetTop;
      const distance = sectionTop - scrollPosition;
      
      if (section.querySelector('.bg-parallax')) {
        section.querySelector('.bg-parallax').style.transform = `translateY(${distance * 0.1}px)`;
      }
    });
  });
  
  // Add hover effects to all cards and buttons
  const cards = document.querySelectorAll('.product-card, .service-card, .testimonial-card, .video-showcase');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: 'power2.in'
      });
    });
  });
  
  // Fix scroll animations
  ScrollTrigger.batch(".fade-in", {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    }),
    start: "top 85%"
  });
  
  // Enhanced logo animation
  const logo = document.querySelector('header img');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      gsap.to(logo, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.3,
        ease: "power2.in"
      });
    });
  }
  
  // Add smooth reveal animations as sections come into view
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelectorAll('h2, h3, p, .grid > div'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Add animated text typing effect to main header
  const heroTitle = document.querySelector('#home h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        heroTitle.textContent += text[i];
      }, 100 * i);
    }
  }
});

// GSAP animations initialization
function gsapInit() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero section parallax effect
  gsap.to("#home", {
    backgroundPositionY: "50%",
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  
  // Animate section headings
  gsap.utils.toArray('section h2').forEach(heading => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });
  
  // Animate stats in about section
  gsap.utils.toArray('.about-section-content .text-4xl').forEach((stat, i) => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: "top 85%"
      },
      textContent: 0,
      duration: 2,
      ease: "power2.out",
      snap: { textContent: 1 },
      stagger: 0.3,
      delay: i * 0.2
    });
  });
  
  // Services icons animation
  gsap.utils.toArray('#services .ri-3x').forEach((icon, i) => {
    gsap.from(icon, {
      scrollTrigger: {
        trigger: icon,
        start: "top 85%"
      },
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: i * 0.1
    });
  });
  
  // Hero button animation
  const heroButton = document.querySelector('#hero-button');
  if (heroButton) {
    gsap.to(heroButton, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });
  }
  
  // Animate testimonials
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.2)",
      delay: i * 0.2
    });
  });
  
  // Contact form field animations
  gsap.utils.toArray('#contact form input, #contact form textarea').forEach((field, i) => {
    gsap.from(field, {
      scrollTrigger: {
        trigger: field,
        start: "top 95%"
      },
      x: i % 2 === 0 ? -30 : 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: i * 0.1
    });
  });
  
  // Footer logo animation
  const footerLogo = document.querySelector('footer img');
  if (footerLogo) {
    gsap.to(footerLogo, {
      scrollTrigger: {
        trigger: footerLogo,
        start: "top bottom"
      },
      rotation: 360,
      duration: 3,
      ease: "elastic.out(1, 0.3)"
    });
  }
}

// Enhanced product cards interaction
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation values based on mouse position
      const rotateY = ((x - rect.width / 2) / rect.width) * 10;
      const rotateX = ((y - rect.height / 2) / rect.height) * -10;
      
      // Apply improved 3D effect with more subtle movement
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: `${rotateY/2}px ${rotateX/-2}px 20px rgba(0,0,0,0.1)`
      });
      
      // Create light reflection effect
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Create gradient highlight effect
      const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`;
      card.style.backgroundImage = shine;
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset card position with elastic animation
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        duration: 0.6,
        ease: 'elastic.out(1,0.5)',
        backgroundImage: 'none'
      });
    });
  });
}

// Enhanced video carousel with better transitions
function initEnhancedVideoCarousel() {
  // Check if carousel exists before initializing
  const carousel = document.querySelector('.video-carousel');
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.video-slide');
  let currentIndex = 0;
  
  // Create indicators
  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    indicators.appendChild(dot);
  });
  carousel.appendChild(indicators);
  
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev', 'next');
      
      if (index === currentIndex) {
        slide.classList.add('active');
        gsap.to(slide, {opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', clearProps: 'transform'});
      } else if (index < currentIndex) {
        slide.classList.add('prev');
        gsap.set(slide, {opacity: 0, x: '-100%'});
      } else {
        slide.classList.add('next');
        gsap.set(slide, {opacity: 0, x: '100%'});
      }
      
      // Reset video when switching slides
      const iframe = slide.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
    });
    
    // Update indicators with animation
    const indicatorDots = indicators.querySelectorAll('.carousel-indicator');
    indicatorDots.forEach((dot, index) => {
      if (index === currentIndex) {
        gsap.to(dot, {scale: 1.2, background: 'var(--primary-color)', duration: 0.3});
      } else {
        gsap.to(dot, {scale: 1, background: 'rgba(255,255,255,0.5)', duration: 0.3});
      }
    });
  }
  
  function goToSlide(index) {
    if (index === currentIndex) return;
    
    // Determine direction for animation
    const direction = index > currentIndex ? 'next' : 'prev';
    const outgoing = slides[currentIndex];
    const incoming = slides[index];
    
    // Set initial position based on direction
    if (direction === 'next') {
      gsap.set(incoming, {x: '100%', opacity: 0});
    } else {
      gsap.set(incoming, {x: '-100%', opacity: 0});
    }
    
    // Animate outgoing slide
    gsap.to(outgoing, {
      x: direction === 'next' ? '-100%' : '100%',
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    });
    
    // Animate incoming slide
    gsap.to(incoming, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power2.inOut'
    });
    
    currentIndex = index;
    updateSlides();
  }
  
  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
  }
  
  function prevSlide() {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }
  
  // Create and set up navigation buttons
  let prevButton = carousel.querySelector('.carousel-nav-button.prev');
  let nextButton = carousel.querySelector('.carousel-nav-button.next');
  
  if (!prevButton) {
    prevButton = document.createElement('button');
    prevButton.className = 'carousel-nav-button prev';
    prevButton.innerHTML = '<i class="ri-arrow-right-s-line"></i>';
    carousel.appendChild(prevButton);
  }
  
  if (!nextButton) {
    nextButton = document.createElement('button');
    nextButton.className = 'carousel-nav-button next';
    nextButton.innerHTML = '<i class="ri-arrow-left-s-line"></i>';
    carousel.appendChild(nextButton);
  }
  
  // Add hover animations to buttons
  [prevButton, nextButton].forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {scale: 1.1, duration: 0.2});
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {scale: 1, duration: 0.2});
    });
  });
  
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);
  
  // Initialize first slide
  updateSlides();
  
  // Auto-advance slides with a smoother transition
  let autoplayInterval = setInterval(nextSlide, 8000);
  
  // Pause autoplay on user interaction
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel.addEventListener('mouseleave', () => {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 8000);
  });
  
  // Handle touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    } else if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  }
}

// Enhanced scroll animations with GSAP
function initEnhancedScrollAnimations() {
  gsap.utils.toArray('.fade-in').forEach(elem => {
    gsap.from(elem, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Parallax effect for hero section
  gsap.to("#home", {
    backgroundPosition: "50% 30%",
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Enhanced header animations
  const header = document.querySelector('header');
  ScrollTrigger.create({
    start: "top -100",
    end: 99999,
    onUpdate: (self) => {
      const scrolled = self.getVelocity() < 0;
      if (scrolled) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      } else {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      }
    }
  });

  // Product cards animation
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }
    });
  });
}

// Enhanced video showcase interactions
function initEnhancedVideoShowcase() {
  const showcases = document.querySelectorAll('.video-showcase');
  
  showcases.forEach(showcase => {
    const content = showcase.querySelector('.content');
    
    showcase.addEventListener('mouseenter', () => {
      gsap.to(content, {
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    showcase.addEventListener('mouseleave', () => {
      gsap.to(content, {
        y: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    });
  });
}

// Enhanced form validations and animations
function initEnhancedForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate form
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          gsap.to(input, {
            x: [-10, 10, -10, 10, 0],
            duration: 0.5,
            ease: "power2.inOut"
          });
        }
      });
      
      if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'تم إرسال الرسالة بنجاح!';
        form.appendChild(successMessage);
        
        gsap.fromTo(successMessage, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
        
        setTimeout(() => {
          gsap.to(successMessage, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => successMessage.remove()
          });
        }, 3000);
        
        form.reset();
      }
    });
  });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
  initEnhancedScrollAnimations();
  initEnhancedVideoShowcase();
  initEnhancedForms();
});

// Preload all essential images for smoother experience
function preloadImages() {
  const imagesToPreload = document.querySelectorAll('img[data-src]');
  imagesToPreload.forEach(img => {
    const src = img.getAttribute('data-src');
    if (src) {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        img.src = src;
        img.removeAttribute('data-src');
        gsap.to(img, {opacity: 1, duration: 0.5});
      };
    }
  });
}

// Call preload function
document.addEventListener('DOMContentLoaded', preloadImages);

// Form submission with animation and validation
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    let valid = true;
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        gsap.to(field, {
          borderColor: 'red',
          x: [0, -5, 5, -5, 5, 0],
          duration: 0.4
        });
      } else {
        gsap.to(field, {borderColor: 'var(--primary-color)'});
      }
    });
    
    if (valid) {
      // Show success animation
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 opacity-0';
      successMessage.textContent = 'تم إرسال رسالتك بنجاح!';
      document.body.appendChild(successMessage);
      
      gsap.to(successMessage, {
        opacity: 1, 
        y: 20, 
        duration: 0.5,
        onComplete: () => {
          setTimeout(() => {
            gsap.to(successMessage, {
              opacity: 0, 
              y: -20, 
              duration: 0.5,
              onComplete: () => successMessage.remove()
            });
          }, 3000);
        }
      });
      
      form.reset();
    }
  });
});

// Add interactive background effect
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  document.documentElement.style.setProperty('--mouse-x', `${mouseX * 100}%`);
  document.documentElement.style.setProperty('--mouse-y', `${mouseY * 100}%`);
});

// Enhanced section animations
function initSectionAnimations() {
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
      },
      opacity: 0.5,
      scale: 0.97,
      filter: 'blur(5px)',
      duration: 1.2
    });
  });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', () => {
  initSectionAnimations();
  
  // Add parallax effect to sections
  gsap.utils.toArray('section').forEach(section => {
    const bg = section.querySelector('.bg');
    if (bg) {
      gsap.to(bg, {
        scrollTrigger: {
          trigger: section,
          scrub: true
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: 'none'
      });
    }
  });
});

// Enhanced section reveal animations
function initEnhancedSectionAnimations() {
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
      },
      y: 50,
      opacity: 0.5,
      duration: 1,
      ease: 'power2.out'
    });
  });
}

// Enhanced card animations
function initEnhancedCardAnimations() {
  gsap.utils.toArray('.product-card, .service-card, .testimonial-card').forEach(card => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 60%',
        scrub: 1
      },
      y: -20,
      duration: 1,
      ease: 'power2.out'
    });
  });
}

// Add smooth page transitions
function initPageTransitions() {
  gsap.to('body', {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  });
}

// Initialize new animations
document.addEventListener('DOMContentLoaded', () => {
  initEnhancedSectionAnimations();
  initEnhancedCardAnimations();
  initPageTransitions();
  
  // Add hover animations for interactive elements
  gsap.utils.toArray('a, button').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      gsap.to(elem, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    elem.addEventListener('mouseleave', () => {
      gsap.to(elem, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.in'
      });
    });
  });
});

// Add animated counting for statistics
function animateStatistics() {
  const stats = document.querySelectorAll('#about .text-4xl');
  
  stats.forEach(stat => {
    // Get the target number from the text content
    let target = parseInt(stat.textContent);
    if (stat.textContent.includes('+')) {
      target = parseInt(stat.textContent);
    }
    if (stat.textContent.includes('/')) {
      // For 24/7 case, don't animate
      return;
    }
    
    // Start from 0
    let current = 0;
    
    // Calculate increment
    const increment = target / 50; // Will take 50 steps to reach target
    
    // Start counter
    const counter = setInterval(() => {
      current += increment;
      
      // Update the display
      if (current < target) {
        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
      } else {
        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
        clearInterval(counter);
      }
    }, 40); // 40ms interval means animation will take ~2 seconds
  });
}

// Initialize counter animation when the about section becomes visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatistics();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(aboutSection);
}

// Enhanced mobile scroll handling
function initMobileScroll() {
  const scrollContainers = document.querySelectorAll('.product-carousel, .video-carousel-mobile, .scroll-container');
  
  scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let momentum = 0;
    let rafId = null;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      cancelAnimationFrame(rafId);
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
      
      // Add momentum scrolling
      let startTime = Date.now();
      const momentumScroll = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        if (elapsed > 1000 || Math.abs(momentum) < 0.5) {
          cancelAnimationFrame(rafId);
          return;
        }
        
        container.scrollLeft += momentum;
        momentum *= 0.95; // Decay factor
        
        rafId = requestAnimationFrame(momentumScroll);
      };
      
      rafId = requestAnimationFrame(momentumScroll);
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed
      const prevScrollLeft = container.scrollLeft;
      container.scrollLeft = scrollLeft - walk;
      
      // Calculate momentum based on scroll difference
      momentum = prevScrollLeft - container.scrollLeft;
    });
    
    // Touch events with improved momentum
    container.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    }, { passive: true });

    container.addEventListener('touchend', () => {
      isDown = false;
      
      // Add momentum scrolling
      let startTime = Date.now();
      const momentumScroll = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        if (elapsed > 1000 || Math.abs(momentum) < 0.5) {
          cancelAnimationFrame(rafId);
          return;
        }
        
        container.scrollLeft += momentum;
        momentum *= 0.95; // Decay factor
        
        rafId = requestAnimationFrame(momentumScroll);
      };
      
      rafId = requestAnimationFrame(momentumScroll);
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      const prevScrollLeft = container.scrollLeft;
      container.scrollLeft = scrollLeft - walk;
      
      // Calculate momentum based on scroll difference
      momentum = prevScrollLeft - container.scrollLeft;
    }, { passive: true });
  });
}

document.addEventListener('DOMContentLoaded', initMobileScroll);

document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate stats numbers with GSAP
  const statsAnimation = gsap.utils.toArray('#about .text-4xl').forEach((stat, i) => {
    let endValue = parseInt(stat.textContent);
    if (isNaN(endValue)) return; // Skip if not a number (e.g., 24/7)
    
    gsap.from(stat, {
      textContent: 0,
      duration: 2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: stat,
        start: "top 80%",
      },
      snap: { textContent: 1 },
      stagger: 0.2,
    });
  });
  
  // Animate services on scroll
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      rotation: -5,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      },
      delay: i * 0.2
    });
  });
  
  // Animate product cards on scroll
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      },
      delay: i * 0.1
    });
  });
  
  // Animate testimonial cards
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      }
    });
  });
  
  // Animate section headings
  gsap.utils.toArray('section h2').forEach(heading => {
    gsap.from(heading, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
      }
    });
  });
  
  // Enhanced hover animations for buttons
  const buttons = document.querySelectorAll('.btn-primary');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.in"
      });
    });
  });
  
  // Animate logo on load
  gsap.from('header img', {
    opacity: 0,
    scale: 0.5,
    rotation: 360,
    duration: 1,
    ease: "back.out(1.7)"
  });
  
  // Animate hero section
  gsap.from('#home h1', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });
  
  gsap.from('#home p', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: "power2.out"
  });
  
  gsap.from('#hero-button', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.6,
    ease: "back.out(1.7)"
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const initMobileHorizontalScroll = () => {
    const scrollContainers = document.querySelectorAll('.product-carousel, .video-carousel-mobile');
    
    scrollContainers.forEach(container => {
      let isDown = false;
      let startX;
      let scrollLeft;
      let momentum = 0;
      let raf;

      const handleMouseDown = (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        cancelAnimationFrame(raf);
      };

      const handleMouseLeave = () => {
        isDown = false;
      };

      const handleMouseUp = () => {
        isDown = false;
        // Momentum scrolling
        const animate = () => {
          container.scrollLeft += momentum;
          momentum *= 0.95;
          if (Math.abs(momentum) > 0.5) {
            raf = requestAnimationFrame(animate);
          }
        };
        raf = requestAnimationFrame(animate);
      };

      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        momentum = walk * 0.2;
        container.scrollLeft = scrollLeft - walk;
      };

      // Touch handlers
      const handleTouchStart = (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };

      const handleTouchMove = (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      };

      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('touchend', handleMouseUp);
    });
  };

  initMobileHorizontalScroll();
});

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAnimation();
  initImprovedLoading();
  initEnhancedInteractions();
  initParallaxEffects();
  initProductCards();
  
  // Initialize existing features
  initVideoCarousel();
  initEnhancedScrollAnimations();
  initEnhancedVideoShowcase();
  initEnhancedForms();
});
