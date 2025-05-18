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
    
    // Update line count on window resize
    window.addEventListener('resize', function() {
        sectionSubtitles.forEach(subtitle => {
            subtitle.style.removeProperty('--line-count');
            subtitle.style.removeProperty('--size-multiplier');
        });
    });
    
    // Add click functionality for mobile devices
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Get all cards that need click functionality on mobile
    const allCards = document.querySelectorAll('.service-card, .model-card, .delivery-card, .success-card, .team-card');
    
    // Add click event listeners to all cards
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            if (isMobile()) {
                // Toggle active class on the clicked card
                this.classList.toggle('active');
                
                // Remove active class from all other cards
                allCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Handle team card hover/touch effects and layout
    function initTeamCardInteractions() {
        const teamCards = document.querySelectorAll('.team-card');
        const teamGrid = document.querySelector('.team-grid');
        
        if (!teamGrid || !teamCards.length) return;
        
        // Count team cards and adjust layout
        const cardCount = teamCards.length;
        teamGrid.setAttribute('data-card-count', cardCount);
        
        // Add class to help with CSS targeting
        if (cardCount <= 5) {
            teamGrid.classList.add('few-cards');
        } else {
            teamGrid.classList.add('many-cards');
        }
        
        // Function to adjust layout based on screen size and card count
        function adjustTeamLayout() {
            const isDesktop = window.innerWidth >= 992;
            const isTablet = window.innerWidth >= 768 && window.innerWidth < 992;
            
            // Reset all cards
            teamCards.forEach(card => {
                card.style.removeProperty('margin-left');
                card.style.removeProperty('margin-right');
            });
            
            // For desktop and large screens with more than 5 cards
            if (isDesktop && cardCount > 5) {
                // Calculate remaining cards
                const remainingCards = cardCount % 5 || 5;
                const lastRowStart = cardCount - remainingCards;
                
                // Center the remaining cards
                if (remainingCards < 5) {
                    const totalGap = (5 - remainingCards) * 20; // 20% per missing card
                    const marginPerSide = totalGap / 2;
                    
                    // Add margin to the first card in the last row
                    if (teamCards[lastRowStart]) {
                        teamCards[lastRowStart].style.marginLeft = `${marginPerSide}%`;
                    }
                }
            }
            
            // For tablet screens with more than 5 cards
            if (isTablet && cardCount > 5) {
                // Similar logic for tablets
                const remainingCards = cardCount % 3 || 3;
                const lastRowStart = cardCount - remainingCards;
                
                // Center the remaining cards
                if (remainingCards < 3) {
                    const totalGap = (3 - remainingCards) * 33.33; // 33.33% per missing card
                    const marginPerSide = totalGap / 2;
                    
                    // Add margin to the first card in the last row
                    if (teamCards[lastRowStart]) {
                        teamCards[lastRowStart].style.marginLeft = `${marginPerSide}%`;
                    }
                }
            }
        }
        
        // Call on load and resize
        adjustTeamLayout();
        window.addEventListener('resize', adjustTeamLayout);
        
        // Touch interactions
        teamCards.forEach(card => {
            // For touch devices
            card.addEventListener('touchstart', function() {
                if (window.innerWidth <= 768) {
                    this.classList.add('active');
                }
            });
        });
        
        // Remove active class when touching elsewhere
        document.addEventListener('touchstart', function(e) {
            if (!e.target.closest('.team-card')) {
                teamCards.forEach(c => c.classList.remove('active'));
            }
        });
    }
    
    // Initialize team card interactions
    document.addEventListener('DOMContentLoaded', initTeamCardInteractions);
    // Also call it immediately in case DOM is already loaded
    initTeamCardInteractions();

    // Ultra Simple Brand Carousel
    document.addEventListener('DOMContentLoaded', function() {
        // Get carousel elements
        const carousel = document.getElementById('brandCarousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('carouselDots');
        
        if (!carousel || !prevBtn || !nextBtn) {
            console.error('Carousel elements not found');
            return;
        }
        
        // Set up carousel
        const cards = carousel.querySelectorAll('.brand-card');
        const totalCards = cards.length;
        let currentIndex = 0;
        let cardWidth;
        let cardsToShow;
        let autoSlideInterval;
        const autoSlideDelay = 3000; // 3 seconds for auto slide
        
        // Calculate card width and visible cards based on screen size
        function calculateCardWidth() {
            const containerWidth = carousel.parentElement.offsetWidth;
            
            if (window.innerWidth <= 480) {
                cardWidth = 220 + 10; // card width + margin
                cardsToShow = 1;
            } else if (window.innerWidth <= 768) {
                cardWidth = 260 + 15; // card width + margin
                cardsToShow = 2;
            } else {
                cardWidth = 300 + 20; // card width + margin
                cardsToShow = 3;
            }
            
            return cardWidth;
        }
        
        // Create indicator dots
        function createDots() {
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(totalCards / cardsToShow);
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (i === Math.floor(currentIndex / cardsToShow)) {
                    dot.classList.add('active');
                }
                
                // Add click event to each dot
                dot.addEventListener('click', function() {
                    moveToSlide(i * cardsToShow);
                    resetAutoSlide();
                });
                
                dotsContainer.appendChild(dot);
            }
        }
        
        // Update active dot
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            const activeDotIndex = Math.floor(currentIndex / cardsToShow);
            
            dots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Move carousel to specific slide
        function moveToSlide(index) {
            // Ensure index is within bounds
            if (index < 0) {
                index = totalCards - cardsToShow;
            } else if (index > totalCards - cardsToShow) {
                index = 0;
            }
            
            currentIndex = index;
            const offset = -currentIndex * cardWidth;
            
            // Apply transform to move carousel
            carousel.style.transform = `translateX(${offset}px)`;
            console.log('Moving to slide:', { index, offset });
            
            // Update dots
            updateDots();
        }
        
        // Next slide
        function nextSlide() {
            moveToSlide(currentIndex + 1);
        }
        
        // Previous slide
        function prevSlide() {
            moveToSlide(currentIndex - 1);
        }
        
        // Start auto slide
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(function() {
                nextSlide();
            }, autoSlideDelay);
        }
        
        // Stop auto slide
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }
        
        // Reset auto slide (after user interaction)
        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }
        
        // Initialize carousel
        function initCarousel() {
            calculateCardWidth();
            createDots();
            moveToSlide(0);
            startAutoSlide();
            
            // Add event listeners
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                prevSlide();
                resetAutoSlide();
                console.log('Previous button clicked');
            });
            
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
            goToSlide(currentIndex);
        }
        
        // Auto-sliding
        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, slideDelay);
        }
        
        function stopSlideInterval() {
            clearInterval(slideInterval);
        }
        
        function resetSlideInterval() {
            stopSlideInterval();
            startSlideInterval();
        }
        
        // Initialize
        createIndicators();
        
        // Set up event listeners
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            resetSlideInterval();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            resetSlideInterval();
        });
        
        // Add hover effect to cards
        cards.forEach(card => {
            // Add subtle yellow glow on hover using beOnd signature yellow/gold color
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(254, 207, 106, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Start auto-sliding
        startSlideInterval();
    }
});

// Global variables for simple carousel
let simpleCarousel;
let simpleSlides;
let currentIndex = 0;
let slideInterval;
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
    }
    
    // Calculate slide width based on viewport
    let slideWidth;
    if (window.innerWidth <= 480) {
        slideWidth = 90; // 90% of container width for mobile
    } else if (window.innerWidth <= 768) {
        slideWidth = 65; // 65% of container width for tablets
    } else if (window.innerWidth <= 1200) {
        slideWidth = 40; // 40% of container width for medium screens
    } else {
        slideWidth = 33.33; // 33.33% of container width for large screens
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

// Simple Carousel with Touch Support
document.addEventListener('DOMContentLoaded', function() {
    simpleCarousel = document.getElementById('simpleCarousel');
    simpleSlides = document.querySelectorAll('.simple-slide');
    const prevBtn = document.querySelector('.simple-prev');
    const nextBtn = document.querySelector('.simple-next');
    
    if (!simpleCarousel || !simpleSlides.length || !prevBtn || !nextBtn) {
        console.error('Carousel elements not found');
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
    
    // Initialize
    function init() {
        // Set up infinite loop
        setupInfiniteLoop();
        
        // Create indicators for mobile
        createIndicators();
        
        // Ensure all slides are visible initially
        setTimeout(() => {
            updateSlidePosition(false);
        }, 100);
        
        // Set up click events for navigation
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            moveSlide(-1);
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            moveSlide(1);
        });
        
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
        
        // Handle transition end for infinite loop
        simpleCarousel.addEventListener('transitionend', function() {
            // If we've moved to the clone of the first slide (at the end)
            if (currentIndex >= totalSimpleSlides + 1) {
                simpleCarousel.style.transition = 'none';
                currentIndex = 1;
                updateSlidePosition(false);
                setTimeout(() => {
                    simpleCarousel.style.transition = 'transform 0.5s ease';
                }, 10);
            }
            // If we've moved to the clone of the last slide (at the beginning)
            else if (currentIndex <= 0) {
                simpleCarousel.style.transition = 'none';
                currentIndex = totalSimpleSlides;
                updateSlidePosition(false);
                setTimeout(() => {
                    simpleCarousel.style.transition = 'transform 0.5s ease';
                }, 10);
            }
        });
        
        // Start auto sliding
        startAutoSlide();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            updateSlidePosition(true);
        });
    }
    
    // Toggle overlay for mobile
    function toggleOverlay(slide) {
        // For mobile devices, manually toggle overlay visibility
        if (window.innerWidth <= 768) {
            const overlay = slide.querySelector('.slide-overlay');
            const front = slide.querySelector('.slide-front');
            
            if (overlay && front) {
                if (overlay.style.transform === 'translateY(0px)') {
                    // Hide overlay
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'translateY(100%)';
                    front.style.transform = '';
                } else {
                    // Show overlay
                    overlay.style.opacity = '1';
                    overlay.style.transform = 'translateY(0)';
                    front.style.transform = 'scale(0.8)';
                }
            }
        }
    }
    
    // We'll use the global functions instead of local ones
    // Initialize carousel
    init();
});

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all brand cards are visible on mobile screens
    setTimeout(function() {
        if (simpleCarousel) {
            updateSlidePosition(false);
        }
    }, 500);
});
            
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
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, slideDelay);
}
        
window.stopAutoSlide = function() {
    clearInterval(slideInterval);
}
        
window.resetAutoSlide = function() {
    window.stopAutoSlide();
    window.startAutoSlide();
}
        
// Initialize carousel
init();
        
    init();
});

// Enhanced Mobile Touch Support for Carousel
document.addEventListener('DOMContentLoaded', function() {
    // Get all slides
    const slides = document.querySelectorAll('.simple-slide');
    
    // Add click event listeners to all slides
    slides.forEach(slide => {
        slide.addEventListener('click', function(e) {
            // Only handle overlay on mobile/tablet
            if (window.innerWidth <= 992) {
                const overlay = this.querySelector('.slide-overlay');
                const front = this.querySelector('.slide-front');
                
                if (overlay && front) {
                    // Toggle overlay visibility
                    if (overlay.style.transform === 'translateY(0px)') {
                        // Hide overlay
                        overlay.style.opacity = '0';
                        overlay.style.transform = 'translateY(100%)';
                        front.style.transform = '';
                    } else {
                        // Show overlay
                        overlay.style.opacity = '1';
                        overlay.style.transform = 'translateY(0)';
                        front.style.transform = 'scale(0.8)';
                    }
                }
                
                // Prevent event propagation to avoid carousel movement
                e.stopPropagation();
            }
        });
    });
});

// Function to directly handle all instances of beOnd
function handleBeOndWord() {
    // First, find all text in the document
    const textWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    // Collect nodes to process
    const textNodes = [];
    let node;
    while (node = textWalker.nextNode()) {
        if (node.nodeValue && node.nodeValue.trim() !== '') {
            textNodes.push(node);
        }
    }
    
    // Process each text node
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        if (!parent || parent.nodeName === 'SCRIPT' || parent.nodeName === 'STYLE') {
            return; // Skip script and style tags
        }
        
        // Check for beOnd in various forms
        const text = textNode.nodeValue;
        if (text.match(/beOnd|be\s+Ond|be\s+ond|Be\s*Ond/i)) {
            // Replace the text with HTML that wraps beOnd
            const fragment = document.createDocumentFragment();
            const tempDiv = document.createElement('div');
            
            // Replace all variations of beOnd with the wrapped version
            tempDiv.innerHTML = text
                .replace(/beOnd/gi, '<span class="beond-word">beOnd</span>')
                .replace(/be\s+Ond/gi, '<span class="beond-word">beOnd</span>')
                .replace(/be\s+ond/gi, '<span class="beond-word">beOnd</span>');
            
            // Move all nodes from the temp div to the fragment
            while (tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
            }
            
            // Replace the original text node with our fragment
            parent.replaceChild(fragment, textNode);
        }
    });
    
    // Also handle all studio card overlays specifically
    document.querySelectorAll('.studio-card .overlay-title, .studio-card .overlay-desc, .studio-overlay-title, .studio-overlay-desc').forEach(element => {
        if (element.innerHTML.match(/beOnd|be\s+Ond|be\s+ond|Be\s*Ond/i)) {
            element.innerHTML = element.innerHTML
                .replace(/beOnd/gi, '<span class="beond-word">beOnd</span>')
                .replace(/be\s+Ond/gi, '<span class="beond-word">beOnd</span>')
                .replace(/be\s+ond/gi, '<span class="beond-word">beOnd</span>');
        }
    });
}

// Special function to fix studio card beOnd text on desktop
function fixStudioCardBeOnd() {
    // Directly target studio card overlays
    document.querySelectorAll('.studio-card .overlay-title, .studio-card .overlay-desc, .studio-overlay-title, .studio-overlay-desc').forEach(element => {
        // Get the HTML content
        const html = element.innerHTML;
        
        // Check if it contains beOnd in any form
        if (html.includes('beOnd') || html.includes('be Ond') || html.includes('be ond') || html.includes('Be Ond')) {
            // Create a temporary div to manipulate the content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Find all text nodes in the temp div
            const textNodes = [];
            const walker = document.createTreeWalker(
                tempDiv,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }
            
            // Process each text node
            let modified = false;
            textNodes.forEach(textNode => {
                const text = textNode.nodeValue;
                if (text.match(/beOnd|be\s+Ond|be\s+ond|Be\s*Ond/i)) {
                    // Create a span element for the brand name
                    const span = document.createElement('span');
                    span.className = 'beond-word';
                    span.textContent = 'beOnd';
                    span.style.display = 'inline-block';
                    span.style.whiteSpace = 'nowrap';
                    span.style.color = '#fecf6a';
                    span.style.fontWeight = '600';
                    
                    // Replace the text node with our span
                    const newText = text.replace(/beOnd|be\s+Ond|be\s+ond|Be\s*Ond/gi, '___BEOND_PLACEHOLDER___');
                    const parts = newText.split('___BEOND_PLACEHOLDER___');
                    
                    const fragment = document.createDocumentFragment();
                    if (parts[0]) fragment.appendChild(document.createTextNode(parts[0]));
                    fragment.appendChild(span);
                    if (parts[1]) fragment.appendChild(document.createTextNode(parts[1]));
                    
                    const parent = textNode.parentNode;
                    parent.replaceChild(fragment, textNode);
                    modified = true;
                }
            });
            
            // If we made changes, update the original element
            if (modified) {
                element.innerHTML = tempDiv.innerHTML;
            }
        }
    });
}

// Function to handle the Meet Us location link
function initializeLocationLink() {
    const locationLinks = document.querySelectorAll('.location-link');
    if (locationLinks.length > 0) {
        locationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const confirmNavigation = confirm("Opening beOnd's office location in Google Maps. Continue?");
                if (confirmNavigation) {
                    window.open('https://maps.app.goo.gl/8LhKdF6N5VXrRUyNA', '_blank');
                }
            });
        });
    }
}

// Function to initialize animations and interactions
function initializeAnimations() {
    // First, find all text in the document
    const textWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    // Collect nodes to process
    const textNodes = [];
    let node;
    while (node = textWalker.nextNode()) {
        if (node.nodeValue && node.nodeValue.trim() !== '') {
            textNodes.push(node);
        }
    }
    
    // Process each text node
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        if (!parent || parent.nodeName === 'SCRIPT' || parent.nodeName === 'STYLE') {
            return; // Skip script and style tags
        }
        
        // Check for beOnd in various forms
        const text = textNode.nodeValue;
        if (text.match(/beOnd|be\s+Ond|be\s+ond|Be\s*Ond/i)) {
            // Replace the text with HTML that wraps beOnd
            const fragment = document.createDocumentFragment();
            const tempDiv = document.createElement('div');
            
            // Replace all variations of beOnd with the wrapped version
            tempDiv.innerHTML = text
                .replace(/beOnd/gi, '<span class="beond-word">beOnd</span>')
                .replace(/be\s+Ond/gi, '<span class="beond-word">beOnd</span>')
                .replace(/be\s+ond/gi, '<span class="beond-word">beOnd</span>');
            
            // Move all nodes from the temp div to the fragment
            while (tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
            }
            
            // Replace the original text node with our fragment
            parent.replaceChild(fragment, textNode);
        }
    });
    
    // Also handle all studio card overlays specifically
    document.querySelectorAll('.studio-card .overlay-title, .studio-card .overlay-desc, .studio-overlay-title, .studio-overlay-desc').forEach(element => {
        if (element.innerHTML.match(/beOnd|be\s+Ond|be\s+ond|Be\s*Ond/i)) {
            element.innerHTML = element.innerHTML
                .replace(/beOnd/gi, '<span class="beond-word">beOnd</span>')
                .replace(/be\s+Ond/gi, '<span class="beond-word">beOnd</span>')
                .replace(/be\s+ond/gi, '<span class="beond-word">beOnd</span>');
        }
    });
}

// Run when DOM is loaded and again after a short delay to catch dynamic content
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initializeAnimations();
    
    // Initialize the custom cursor
    initializeCustomCursor();
    
    // Handle beOnd word styling
    handleBeOndWord();
    
    // Fix studio card beOnd text
    fixStudioCardBeOnd();
    
    // Initialize location link functionality
    initializeLocationLink();
    
    // Initialize scroll animations
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });
    
    // Re-initialize on window resize
    window.addEventListener('resize', function() {
        handleBeOndWord();
        fixStudioCardBeOnd();
        AOS.refresh();
    });
    
    // Re-initialize on orientation change (for mobile)
    window.addEventListener('orientationchange', function() {
        handleBeOndWord();
        fixStudioCardBeOnd();
        AOS.refresh();
    });
    
    // Run again after a delay to catch any dynamic content
    setTimeout(function() {
        handleBeOndWord();
        fixStudioCardBeOnd();
    }, 1000);
    
    // And again after all images and resources are loaded
    window.addEventListener('load', function() {
        handleBeOndWord();
        fixStudioCardBeOnd();
    });
});
