// Simple Carousel with Touch Support for beOnd Website
// This script ensures all brand cards are visible on mobile screens

// Global variables for simple carousel
let simpleCarousel;
let simpleSlides;
let currentIndex = 0;
let slideInterval;
const slideDelay = 3000; // 3 seconds for slideshow
let totalSimpleSlides = 0;
let isTouchDevice = false;
let isProcessingTouch = false;
let touchStartTime = 0;
let touchEndTime = 0;

// Global moveSlide function for HTML onclick
function moveSlide(direction) {
    if (!simpleCarousel) return;
    
    simpleCarousel.style.transition = 'transform 0.5s ease';
    currentIndex += direction;
    updateSlidePosition(true);
    resetAutoSlide();
}

// Create indicators for all screen sizes
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

// Check if device supports touch events
function detectTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

// Toggle overlay for mobile
function toggleOverlay(slide, forceShow = false) {
    // For mobile and tablet devices, manually toggle overlay visibility
    if (window.innerWidth <= 768) {
        const overlay = slide.querySelector('.slide-overlay');
        const front = slide.querySelector('.slide-front');
        
        if (!overlay || !front) return;
        
        // First, close all other slides
        document.querySelectorAll('.simple-slide').forEach(s => {
            if (s !== slide) {
                s.classList.remove('active');
                const otherOverlay = s.querySelector('.slide-overlay');
                const otherFront = s.querySelector('.slide-front');
                if (otherOverlay && otherFront) {
                    otherOverlay.style.opacity = '0';
                    otherOverlay.style.transform = 'translateY(100%)';
                    otherFront.style.transform = '';
                }
            }
        });
        
        // Handle the current slide
        if (forceShow || !slide.classList.contains('active')) {
            // Show overlay
            slide.classList.add('active');
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
            front.style.transform = 'scale(0.8)';
        } else {
            // Hide overlay
            slide.classList.remove('active');
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(100%)';
            front.style.transform = '';
        }
    }
    // For desktop, do nothing - rely on CSS hover effects
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
    
    // Check if this is a touch device
    isTouchDevice = detectTouchDevice();
    
    // Add touch events to slides for mobile/tablet
    const allSlides = document.querySelectorAll('.simple-slide');
    allSlides.forEach(slide => {
        // For touch devices
        slide.addEventListener('touchstart', function(e) {
            // Store touch start time and position
            touchStartTime = new Date().getTime();
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
            this.isMoving = false; // Reset moving flag
            // Stop auto sliding during interaction
            stopAutoSlide();
        }, { passive: true });
        
        slide.addEventListener('touchmove', function(e) {
            // If significant movement, mark as not a tap
            const touchMoveX = e.changedTouches[0].screenX;
            const touchMoveY = e.changedTouches[0].screenY;
            const diffX = Math.abs(this.touchStartX - touchMoveX);
            const diffY = Math.abs(this.touchStartY - touchMoveY);
            
            if (diffX > 10 || diffY > 10) {
                this.isMoving = true;
            }
        }, { passive: true });
        
        slide.addEventListener('touchend', function(e) {
            // Only process for mobile/tablet
            if (window.innerWidth <= 768) {
                // Calculate touch duration and distance
                touchEndTime = new Date().getTime();
                const touchDuration = touchEndTime - touchStartTime;
                const touchEndX = e.changedTouches[0].screenX;
                const touchEndY = e.changedTouches[0].screenY;
                const diffX = Math.abs(this.touchStartX - touchEndX);
                const diffY = Math.abs(this.touchStartY - touchEndY);
                
                // If it's a tap (short duration, minimal movement)
                if (touchDuration < 300 && diffX < 20 && diffY < 20 && !this.isMoving) {
                    // Toggle overlay
                    toggleOverlay(this);
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
            
            // Reset auto slide
            resetAutoSlide();
        });
        
        // Click event for all devices - for desktop it will be used with hover effects
        slide.addEventListener('click', function(e) {
            // For mobile/tablet
            if (window.innerWidth <= 768) {
                toggleOverlay(this);
                e.stopPropagation();
            }
            resetAutoSlide();
        });
    });
    
    // Swipe detection for mobile/tablet
    let touchStartX = 0;
    
    simpleCarousel.addEventListener('touchstart', function(e) {
        // Skip if we're touching a slide directly
        if (e.target.closest('.simple-slide')) return;
        
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });
    
    simpleCarousel.addEventListener('touchend', function(e) {
        // Skip if we're touching a slide directly
        if (e.target.closest('.simple-slide')) return;
        
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        // Process swipe if it's significant movement
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
