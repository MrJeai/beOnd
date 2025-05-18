/**
 * Custom Cursor Implementation for beOnd Website
 * Features an elegant design with the brand's gold accent color and smooth animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    
    // Add classes to cursor elements
    cursorDot.classList.add('cursor-dot');
    cursorRing.classList.add('cursor-ring');
    
    // Append cursor elements to the body
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    
    // Initialize trail elements array
    const trailElements = [];
    const maxTrailElements = 5;
    
    // Create trail elements
    for (let i = 0; i < maxTrailElements; i++) {
        const trailElement = document.createElement('div');
        trailElement.classList.add('cursor-trail');
        document.body.appendChild(trailElement);
        trailElements.push({
            element: trailElement,
            x: 0,
            y: 0,
            active: false,
            timeoutId: null
        });
    }
    
    // Variables to track mouse position and movement
    let mouseX = 0;
    let mouseY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let cursorVisible = false;
    let isMoving = false;
    let movementTimeout;
    
    // Function to update cursor position
    function updateCursorPosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor elements if they're hidden
        if (!cursorVisible) {
            cursorVisible = true;
            cursorDot.style.opacity = 1;
            cursorRing.style.opacity = 1;
        }
        
        // Check if mouse is moving
        if (mouseX !== prevMouseX || mouseY !== prevMouseY) {
            isMoving = true;
            clearTimeout(movementTimeout);
            
            // Create trail effect when moving
            createTrailElement();
            
            movementTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        }
        
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    }
    
    // Function to create trail element
    function createTrailElement() {
        // Find an inactive trail element
        const inactiveTrail = trailElements.find(item => !item.active);
        
        if (inactiveTrail) {
            inactiveTrail.active = true;
            inactiveTrail.x = mouseX;
            inactiveTrail.y = mouseY;
            inactiveTrail.element.style.left = `${mouseX}px`;
            inactiveTrail.element.style.top = `${mouseY}px`;
            inactiveTrail.element.style.opacity = 0.6;
            
            // Animate trail element
            setTimeout(() => {
                inactiveTrail.element.style.opacity = 0;
                inactiveTrail.element.style.width = '3px';
                inactiveTrail.element.style.height = '3px';
                
                // Reset trail element after animation
                inactiveTrail.timeoutId = setTimeout(() => {
                    inactiveTrail.active = false;
                    inactiveTrail.element.style.width = '6px';
                    inactiveTrail.element.style.height = '6px';
                }, 300);
            }, 10);
        }
    }
    
    // Function to animate cursor
    function animateCursor() {
        // Smooth cursor movement with lerp (linear interpolation)
        const targetX = mouseX;
        const targetY = mouseY;
        
        // Move cursor dot directly to mouse position for precision
        cursorDot.style.left = `${targetX}px`;
        cursorDot.style.top = `${targetY}px`;
        
        // Move cursor ring with slight delay for smooth effect
        cursorRing.style.left = `${targetX}px`;
        cursorRing.style.top = `${targetY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Track cursor movement
    document.addEventListener('mousemove', updateCursorPosition);
    
    // Handle cursor visibility when mouse leaves/enters the window
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = 1;
        cursorRing.style.opacity = 1;
        cursorVisible = true;
    });
    
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = 0;
        cursorRing.style.opacity = 0;
        cursorVisible = false;
    });
    
    // Add special effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .logo-container, .service-card, .team-card, .brand-logo, .delivery-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.backgroundColor = 'rgba(254, 207, 106, 0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorRing.style.width = '30px';
            cursorRing.style.height = '30px';
            cursorRing.style.backgroundColor = 'transparent';
        });
        
        element.addEventListener('mousedown', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorRing.style.backgroundColor = 'rgba(254, 207, 106, 0.2)';
        });
        
        element.addEventListener('mouseup', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.backgroundColor = 'rgba(254, 207, 106, 0.1)';
        });
    });
    
    // Start animation loop
    animateCursor();
});
