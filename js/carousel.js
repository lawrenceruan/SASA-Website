// carousel.js

// Create a function that will be called from main.js after components are loaded
function initCarousel() {
    // Get all carousels on the page (in case you have multiple)
    const carousels = document.querySelectorAll('.carousel-container');
    
    // Initialize each carousel
    carousels.forEach(carouselContainer => {
        const carousel = carouselContainer.querySelector('.carousel');
        const slides = carouselContainer.querySelectorAll('.carousel-item');
        const prevBtn = carouselContainer.querySelector('.prev-btn');
        const nextBtn = carouselContainer.querySelector('.next-btn');
        const indicators = carouselContainer.querySelectorAll('.indicator');
        
        // Skip if required elements aren't found
        if (!carousel || !slides.length) return;
        
        // Initialize variables
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoplayInterval;
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Function to update carousel position
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Go to previous slide
        function goToPrevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        // Go to next slide
        function goToNextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }
        
        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                goToPrevSlide();
                resetAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                goToNextSlide();
                resetAutoplay();
            });
        }
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                goToSlide(index);
                resetAutoplay();
            });
        });
        
        // Touch events for mobile swipe
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - go to previous slide
                goToPrevSlide();
                resetAutoplay();
            } else if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - go to next slide
                goToNextSlide();
                resetAutoplay();
            }
        }
        
        // Auto slide functionality
        function startAutoplay() {
            autoplayInterval = setInterval(goToNextSlide, 5000);
        }
        
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
        
        // Pause auto slide on hover
        carousel.addEventListener('mouseenter', function() {
            clearInterval(autoplayInterval);
        });
        
        carousel.addEventListener('mouseleave', function() {
            startAutoplay();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
                resetAutoplay();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
                resetAutoplay();
            }
        });
        
        // Initialize carousel
        updateCarousel();
        startAutoplay();
        
        // Add accessibility attributes
        carousel.setAttribute('aria-roledescription', 'carousel');
        carousel.setAttribute('aria-live', 'polite');
        
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-roledescription', 'slide');
            slide.setAttribute('aria-label', `Slide ${index + 1} of ${totalSlides}`);
            slide.setAttribute('role', 'group');
        });
    });
    
    console.log('All carousels initialized');
}

// Export the function so it's available globally
// This is needed because main.js calls initCarousel() directly
window.initCarousel = initCarousel;