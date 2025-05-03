// JavaScript for beOndhub Studios website
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
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
});
