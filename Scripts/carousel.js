// Simple direct carousel script
let carouselSlideIndex = 0;
let carouselInterval; // Renamed to avoid all conflicts
const carouselSlides = document.querySelectorAll('.simple-slide');
const carouselTotalSlides = carouselSlides.length;

// Initialize carousel
function initSimpleCarousel() {
    if (carouselSlides.length === 0) return;
    
    // Show initial slides
    updateSlides();
    
    // Start auto sliding
    startAutoSlide();
}

// Move slide by n positions
function moveSlide(n) {
    carouselSlideIndex += n;
    
    // Handle wrapping
    if (carouselSlideIndex >= carouselTotalSlides - 2) {
        carouselSlideIndex = 0;
    } else if (carouselSlideIndex < 0) {
        carouselSlideIndex = carouselTotalSlides - 3;
    }
    
    updateSlides();
    resetAutoSlide();
}

// Update slides display
function updateSlides() {
    const carouselElement = document.getElementById('simpleCarousel');
    if (carouselElement) {
        carouselElement.style.transform = `translateX(-${carouselSlideIndex * 33.33}%)`;
    }
}

// Auto slide functionality
function startAutoSlide() {
    stopAutoSlide();
    carouselInterval = setInterval(() => {
        moveSlide(1);
    }, 3000); // 3 seconds
}

function stopAutoSlide() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
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
