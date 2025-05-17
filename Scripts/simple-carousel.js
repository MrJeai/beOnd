// Simple Carousel with Touch Support for beOnd Website
// This script ensures all brand cards are visible on mobile screens

// Global variables for simple carousel
let simpleCarousel;
let simpleSlides;
let currentIndex = 0;
let slideInterval;
const slideDelay = 3000; // 3 seconds for slideshow
let totalSimpleSlides = 0;

// Global moveSlide function for HTML onclick
function moveSlide(direction) {
    if (!simpleCarousel) return;
    
    simpleCarousel.style.transition = 'transform 0.5s ease';
    currentIndex += direction;
    updateSlidePosition(true);
    resetAutoSlide();
}

// Create indicators for mobile
function createIndicators() {
    const indicatorsContainer = document.getElementById('simpleIndicators');
    if (!indicatorsContainer) return;
    
    // Clear existing indicators
    indicatorsContainer.innerHTML = '';
    
    // Create an indicator for each slide (excluding clones)
    for (let i = 0; i < totalSimpleSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('simple-indicator');
        if (i === 0) indicator.classList.add('active');
        
        // Add click event to each indicator
        indicator.addEventListener('click', () => {
            // Add 1 to account for the cloned slide at the beginning
            currentIndex = i + 1;
            updateSlidePosition(true);
            updateIndicators();
            resetAutoSlide();
        });
        
        indicatorsContainer.appendChild(indicator);
    }
}

// Update indicators based on current slide
function updateIndicators() {
    const indicators = document.querySelectorAll('.simple-indicator');
    if (!indicators.length) return;
    
    // Calculate the actual index (accounting for cloned slides)
    let actualIndex;
    if (currentIndex === 0) {
        actualIndex = totalSimpleSlides - 1;
    } else if (currentIndex === totalSimpleSlides + 1) {
        actualIndex = 0;
    } else {
        actualIndex = currentIndex - 1;
    }
    
    // Update active indicator
    indicators.forEach((indicator, index) => {
        if (index === actualIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Update slide position
function updateSlidePosition(animated) {
    if (!simpleCarousel) return;
    
    if (animated) {
        simpleCarousel.style.transition = 'transform 0.5s ease';
    }
    
    // Calculate slide width based on viewport
    let slideWidth;
    let centeringOffset = 0; // Additional offset to center the active slide
    
    if (window.innerWidth <= 480) {
        slideWidth = 90; // 90% of container width for mobile
        centeringOffset = (100 - slideWidth) / 2; // Center the slide
    } else if (window.innerWidth <= 768) {
        slideWidth = 65; // 65% of container width for tablets
        centeringOffset = (100 - slideWidth) / 2; // Center the slide
    } else if (window.innerWidth <= 1200) {
        slideWidth = 40; // 40% of container width for medium screens
        centeringOffset = (100 - slideWidth) / 2; // Center the slide
    } else {
        slideWidth = 33.33; // 33.33% of container width for large screens
        centeringOffset = (100 - slideWidth) / 2; // Center the slide
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
    
    // Calculate offset - adjusted for cloned slides and centering
    const offset = -currentIndex * slideWidth + centeringOffset;
    
    // Apply transform
    simpleCarousel.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    updateIndicators();
}

// Auto slide functions
function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, slideDelay);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Toggle overlay for mobile
function toggleOverlay(slide) {
    // For mobile devices, manually toggle overlay visibility
    if (window.innerWidth <= 768) {
        const overlay = slide.querySelector('.slide-overlay');
        const front = slide.querySelector('.slide-front');
        
        // Remove active class from all slides first
        document.querySelectorAll('.simple-slide').forEach(s => {
            if (s !== slide) s.classList.remove('active');
        });
        
        if (overlay && front) {
            if (slide.classList.contains('active')) {
                // Hide overlay
                slide.classList.remove('active');
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(100%)';
                front.style.transform = '';
            } else {
                // Show overlay
                slide.classList.add('active');
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
                front.style.transform = 'scale(0.8)';
            }
        }
    }
}

// Initialize the carousel
function initSimpleCarousel() {
    simpleCarousel = document.getElementById('simpleCarousel');
    simpleSlides = document.querySelectorAll('.simple-slide');
    const prevBtn = document.querySelector('.simple-prev');
    const nextBtn = document.querySelector('.simple-next');
    
    if (!simpleCarousel || !simpleSlides.length || !prevBtn || !nextBtn) {
        console.error('Simple carousel elements not found');
        return;
    }
    
    // Initialize variables
    currentIndex = 0;
    totalSimpleSlides = simpleSlides.length;
    
    // Clone first and last slides for infinite loop effect
    function setupInfiniteLoop() {
        // Clone first slide and append to end
        const firstSlideClone = simpleSlides[0].cloneNode(true);
        firstSlideClone.classList.add('cloned-slide');
        simpleCarousel.appendChild(firstSlideClone);
        
        // Clone last slide and prepend to beginning
        const lastSlideClone = simpleSlides[totalSimpleSlides - 1].cloneNode(true);
        lastSlideClone.classList.add('cloned-slide');
        simpleCarousel.insertBefore(lastSlideClone, simpleSlides[0]);
        
        // Adjust initial position to show first real slide
        currentIndex = 1;
        updateSlidePosition(false);
    }
    
    // Set up infinite loop
    setupInfiniteLoop();
    
    // Create indicators for mobile
    createIndicators();
    
    // Ensure all slides are visible initially
    setTimeout(() => {
        updateSlidePosition(false);
    }, 100);
    
    // Add touch/click events to slides for mobile overlay
    const allSlides = document.querySelectorAll('.simple-slide');
    allSlides.forEach(slide => {
        // For touch devices
        slide.addEventListener('touchstart', function(e) {
            // Stop auto sliding when user interacts
            stopAutoSlide();
        }, { passive: true });
        
        slide.addEventListener('touchend', function(e) {
            // Toggle overlay class for mobile
            toggleOverlay(this);
            // Reset auto slide after interaction
            resetAutoSlide();
        }, { passive: true });
        
        // For click events (mobile and desktop)
        slide.addEventListener('click', function(e) {
            // Toggle overlay class
            toggleOverlay(this);
            // Stop propagation to prevent carousel movement
            e.stopPropagation();
            // Reset auto slide
            resetAutoSlide();
        });
    });
    
    // Swipe detection
    let touchStartX = 0;
    simpleCarousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });
    
    simpleCarousel.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        // Only process swipe if it's not a tap (which should show overlay)
        if (Math.abs(diff) > 30) {
            if (diff > 0) {
                moveSlide(1); // Swipe left = next
            } else {
                moveSlide(-1); // Swipe right = prev
            }
        }
        
        resetAutoSlide();
    }, { passive: true });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        updateSlidePosition(true);
    });
    
    // Start auto sliding
    startAutoSlide();
}

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initSimpleCarousel();
    
    // Ensure all brand cards are visible on mobile screens
    setTimeout(function() {
        if (simpleCarousel) {
            updateSlidePosition(false);
        }
    }, 500);
});
