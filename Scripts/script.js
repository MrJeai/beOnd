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
    const allCards = document.querySelectorAll('.service-card, .model-card, .delivery-card, .success-card');
    
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
                nextSlide();
                resetAutoSlide();
                console.log('Next button clicked');
            });
            
            // Pause auto slide on hover
            carousel.addEventListener('mouseenter', stopAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
            
            // Handle touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            carousel.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            }, { passive: true });
            
            carousel.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                
                // Detect swipe direction
                if (touchStartX - touchEndX > 50) {
                    nextSlide(); // Swipe left
                } else if (touchEndX - touchStartX > 50) {
                    prevSlide(); // Swipe right
                }
                
                resetAutoSlide();
            }, { passive: true });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                calculateCardWidth();
                createDots();
                moveToSlide(currentIndex);
            });
        }
        
        // Initialize carousel
        initCarousel();
    });
});

// Elegant Carousel Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('elegantPrev');
    const nextBtn = document.getElementById('elegantNext');
    const indicators = document.getElementById('elegantIndicators');
    
    if (!track || !prevBtn || !nextBtn || !indicators) {
        console.error('Carousel elements not found');
        return;
    }
    
    // Get all cards
    const cards = track.querySelectorAll('.elegant-card');
    const totalCards = cards.length;
    
    // Set up variables
    let currentIndex = 0;
    let cardWidth;
    let visibleCards;
    let slideInterval;
    const slideDelay = 3000; // 3 seconds between slides
    
    // Calculate dimensions based on screen size
    function calculateDimensions() {
        if (window.innerWidth <= 480) {
            cardWidth = 220 + 30; // card width + gap
            visibleCards = 1;
        } else if (window.innerWidth <= 768) {
            cardWidth = 240 + 30; // card width + gap
            visibleCards = 2;
        } else {
            cardWidth = 280 + 30; // card width + gap
            visibleCards = 3;
        }
        
        return { cardWidth, visibleCards };
    }
    
    // Create indicators
    function createIndicators() {
        indicators.innerHTML = '';
        const totalIndicators = Math.ceil(totalCards / visibleCards);
        
        for (let i = 0; i < totalIndicators; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('elegant-indicator');
            if (i === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                goToSlide(i * visibleCards);
                resetSlideInterval();
            });
            
            indicators.appendChild(indicator);
        }
    }
    
    // Update active indicator
    function updateIndicators() {
        const allIndicators = indicators.querySelectorAll('.elegant-indicator');
        const activeIndex = Math.floor(currentIndex / visibleCards);
        
        allIndicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Move to specific slide
    function goToSlide(index) {
        const { cardWidth, visibleCards } = calculateDimensions();
        const maxIndex = totalCards - visibleCards;
        
        // Ensure index is within bounds
        if (index < 0) {
            index = maxIndex;
        } else if (index > maxIndex) {
            index = 0;
        }
        
        currentIndex = index;
        const translateX = -currentIndex * cardWidth;
        
        // Apply smooth transition
        track.style.transform = `translateX(${translateX}px)`;
        console.log('Moving to slide:', { index, translateX, cardWidth });
        
        // Update indicators
        updateIndicators();
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Start auto-sliding
    function startSlideInterval() {
        stopSlideInterval();
        slideInterval = setInterval(() => {
            nextSlide();
        }, slideDelay);
    }
    
    // Stop auto-sliding
    function stopSlideInterval() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // Reset auto-sliding (after user interaction)
    function resetSlideInterval() {
        stopSlideInterval();
        startSlideInterval();
    }
    
    // Initialize carousel
    function initCarousel() {
        // Calculate initial dimensions
        calculateDimensions();
        
        // Create indicators
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
        
        // Pause auto-sliding on hover
        track.addEventListener('mouseenter', stopSlideInterval);
        track.addEventListener('mouseleave', startSlideInterval);
        
        // Handle touch events for mobile
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopSlideInterval();
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            
            // Detect swipe direction
            if (touchStartX - touchEndX > 50) {
                nextSlide(); // Swipe left
            } else if (touchEndX - touchStartX > 50) {
                prevSlide(); // Swipe right
            }
            
            resetSlideInterval();
        }, { passive: true });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            calculateDimensions();
            createIndicators();
            goToSlide(currentIndex);
        });
        
        // Add hover effect to cards
        cards.forEach(card => {
            // Add subtle yellow glow on hover
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
    
    // Initialize the carousel
    initCarousel();
});

// Simple Carousel with Touch Support
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('simpleCarousel');
    const slides = document.querySelectorAll('.simple-slide');
    const prevBtn = document.querySelector('.simple-prev');
    const nextBtn = document.querySelector('.simple-next');
    
    if (!carousel || !slides.length || !prevBtn || !nextBtn) {
        console.error('Carousel elements not found');
        return;
    }
    
    // Variables
    let currentIndex = 0;
    let slideInterval;
    const slideDelay = 300; // Changed to 300ms (0.3 seconds) for even faster slideshow
    const totalSlides = slides.length;
    
    // Clone first and last slides for infinite loop effect
    function setupInfiniteLoop() {
        // Clone first slide and append to end
        const firstSlideClone = slides[0].cloneNode(true);
        firstSlideClone.classList.add('cloned-slide');
        carousel.appendChild(firstSlideClone);
        
        // Clone last slide and prepend to beginning
        const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
        lastSlideClone.classList.add('cloned-slide');
        carousel.insertBefore(lastSlideClone, slides[0]);
        
        // Adjust initial position to show first real slide
        currentIndex = 1;
        updateSlidePosition(false);
    }
    
    // Initialize
    function init() {
        // Set up infinite loop
        setupInfiniteLoop();
        
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
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });
        
        carousel.addEventListener('touchend', function(e) {
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
        carousel.addEventListener('transitionend', function() {
            // If we've moved to the clone of the first slide (at the end)
            if (currentIndex >= totalSlides + 1) {
                carousel.style.transition = 'none';
                currentIndex = 1;
                updateSlidePosition(false);
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease';
                }, 10);
            }
            // If we've moved to the clone of the last slide (at the beginning)
            else if (currentIndex <= 0) {
                carousel.style.transition = 'none';
                currentIndex = totalSlides;
                updateSlidePosition(false);
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease';
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
    
    // Move slide
    function moveSlide(direction) {
        carousel.style.transition = 'transform 0.5s ease';
        currentIndex += direction;
        updateSlidePosition(true);
    }
    
    // Update slide position
    function updateSlidePosition(animated) {
        if (animated) {
            carousel.style.transition = 'transform 0.5s ease';
        }
        
        // Calculate slide width based on viewport
        let slideWidth;
        if (window.innerWidth <= 480) {
            slideWidth = 80; // 80% of container width
        } else if (window.innerWidth <= 768) {
            slideWidth = 65; // 65% of container width (updated from 50%)
        } else if (window.innerWidth <= 1200) {
            slideWidth = 40; // 40% of container width
        } else {
            slideWidth = 33.33; // 33.33% of container width
        }
        
        // Calculate offset - adjusted for cloned slides
        const offset = -currentIndex * slideWidth;
        
        // Apply transform
        carousel.style.transform = `translateX(${offset}%)`;
    }
    
    // Auto slide functions
    function startAutoSlide() {
        stopAutoSlide();
        slideInterval = setInterval(() => {
            moveSlide(1);
        }, slideDelay);
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
    
    // Initialize carousel
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
