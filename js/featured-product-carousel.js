function initDuoProductCarousel() {
    // Get DOM elements with error handling
    const track = document.getElementById('duo-carouselTrack');
    const prevBtn = document.getElementById('duo-prevBtn');
    const nextBtn = document.getElementById('duo-nextBtn');
    
    // Check if elements exist
    if (!track || !prevBtn || !nextBtn) {
        console.error('Duo Carousel: Required elements not found.');
        return; // Exit if elements don't exist
    }
    
    // Get all carousel items
    const items = track.querySelectorAll('.duo-carousel-item');
    const totalItems = items.length;
    
    // Check if we have items
    if (totalItems === 0) {
        console.error('Duo Carousel: No carousel items found.');
        return;
    }
    
    // Set initial state
    let currentIndex = 0;
    const visibleItemsCount = 2; // We want to always show 2 items at once
    
    // Configure the carousel layout
    function setupCarousel() {
        
        // Make sure all items have correct width
        items.forEach(item => {
            item.style.flex = '0 0 50%';
        });
    }
    
    // Apply initial setup
    setupCarousel();
    
    // Function to update the carousel position
    function updateCarousel() {
        // Calculate how far to translate the track
        const translateX = -currentIndex * 50; // 50% per item
        track.style.transform = `translateX(${translateX}%)`;
        
        // Log for debugging
        console.log(`Current index: ${currentIndex}, translateX: ${translateX}%`);
    }
    
    // Initialize carousel display
    updateCarousel();
    
    // Next button click handler - simplified to just advance by 1
    nextBtn.addEventListener('click', function() {
        // Check if we can move forward
        if (currentIndex < totalItems - visibleItemsCount) {
            currentIndex++;
        } else {
            // Loop back to beginning
            currentIndex = 0;
        }
        
        updateCarousel();
    });
    
    // Previous button click handler - simplified to just go back by 1
    prevBtn.addEventListener('click', function() {
        // Check if we can move backward
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Loop to the end
            currentIndex = totalItems - visibleItemsCount;
        }
        
        updateCarousel();
    });
    
    // Return API for potential external control
    return {
        next: () => nextBtn.click(),
        prev: () => prevBtn.click(),
        goToSlide: (index) => {
            if (index >= 0 && index <= totalItems - visibleItemsCount) {
                currentIndex = index;
                updateCarousel();
            }
        }
    };
}

// Make available globally
window.initDuoProductCarousel = initDuoProductCarousel;