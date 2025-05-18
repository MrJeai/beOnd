// JavaScript for beOndhub Studios website

// Add smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = '#000000'; // Black background
        } else {
            header.style.padding = '1rem 0';
            header.style.backgroundColor = '#000000'; // Black background
        }
    });

    // Add lazy loading for hero section
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    
    setTimeout(() => {
        heroSection.classList.add('loaded');
        heroTitle.classList.add('loaded');
    }, 300);
    
    // Remove classes that are no longer needed
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    
    sectionSubtitles.forEach(subtitle => {
        // Remove any existing classes that might interfere
        subtitle.classList.remove('multi-line');
        subtitle.classList.remove('single-line');
    });
});

// Function to check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
}

// Global variables for simple carousel
let simpleCarousel;
let simpleSlides;
let currentIndex = 0;
let mainSlideInterval; // Renamed to avoid conflict with carousel.js
let slideDelay = 300; // 300ms for slideshow
let totalSimpleSlides = 0;

// Global functions for carousel
function moveSlide(direction) {
    if (!simpleCarousel) return;
    
    simpleCarousel.style.transition = 'transform 0.5s ease';
    currentIndex += direction;
    updateSlidePosition(true);
    resetAutoSlide();
}

function updateSlidePosition(animated) {
    if (!simpleCarousel) return;
    
    if (animated) {
        simpleCarousel.style.transition = 'transform 0.5s ease';
    } else {
        simpleCarousel.style.transition = 'none';
    }
    
    // Handle edge cases for infinite loop
    if (currentIndex >= totalSimpleSlides + 1) {
        currentIndex = 1;
        simpleCarousel.style.transition = 'none';
        setTimeout(() => {
            simpleCarousel.style.transition = 'transform 0.5s ease';
        }, 10);
    } else if (currentIndex <= 0) {
        currentIndex = totalSimpleSlides;
        simpleCarousel.style.transition = 'none';
        setTimeout(() => {
            simpleCarousel.style.transition = 'transform 0.5s ease';
        }, 10);
    }
            
    // Calculate offset - adjusted for cloned slides
    const offset = -currentIndex * slideWidth;
            
    // Apply transform
    simpleCarousel.style.transform = `translateX(${offset}%)`;
            
    // Update indicators
    updateIndicators();
}

// Auto slide functions - make them global
window.startAutoSlide = function() {
    window.stopAutoSlide();
    mainSlideInterval = setInterval(() => {
        moveSlide(1);
    }, slideDelay);
};
        
window.stopAutoSlide = function() {
    clearInterval(mainSlideInterval);
};
        
window.resetAutoSlide = function() {
    window.stopAutoSlide();
    window.startAutoSlide();
};
