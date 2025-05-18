// JavaScript for handling the location link functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle the Meet Us location link
    function initializeLocationLink() {
        const locationLinks = document.querySelectorAll('.location-link');
        if (locationLinks.length > 0) {
            locationLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const confirmNavigation = confirm("Opening beOnd's office location in Google Maps. Would you like to continue?");
                    if (confirmNavigation) {
                        window.open('https://maps.app.goo.gl/8LhKdF6N5VXrRUyNA', '_blank');
                    }
                });
            });
        }
    }

    // Initialize the location link functionality
    initializeLocationLink();
});
