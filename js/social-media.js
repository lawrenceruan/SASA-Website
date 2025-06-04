// JavaScript for scroll to top functionality
function InitSocialMediaList() {
    const scrollTopButton = document.querySelector('.scroll-top');
    
    // Show or hide the scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.display = 'flex';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top when the button is clicked
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initially hide the button
    scrollTopButton.style.display = 'none';
};

window.InitSocialMediaList = InitSocialMediaList;