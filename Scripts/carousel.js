// Simple direct carousel script
let slideIndex = 0;
let slideInterval;
const slides = document.querySelectorAll('.simple-slide');
const totalSlides = slides.length;

// Initialize carousel
function initSimpleCarousel() {
    if (slides.length === 0) return;
    
    // Show initial slides
    updateSlides();
    
    // Start auto sliding
    startAutoSlide();
}

// Move slide by n positions
function moveSlide(n) {
    slideIndex += n;
    
    // Handle wrapping
    if (slideIndex >= totalSlides - 2) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 3;
    }
    
    updateSlides();
    resetAutoSlide();
}

// Update slides display
function updateSlides() {
    const carousel = document.getElementById('simpleCarousel');
    carousel.style.transform = `translateX(-${slideIndex * 33.33}%)`;
}

// Auto slide functionality
function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, 3000); // 3 seconds
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSimpleCarousel);

// Pause on hover
document.querySelector('.simple-carousel').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.simple-carousel').addEventListener('mouseleave', startAutoSlide);
