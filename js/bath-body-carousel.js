// function initBrandCarousel() {
//     // Get DOM elements
//     const track = document.getElementById('brand-carouselTrack');
//     const prevBtn = document.getElementById('brand-prevBtn');
//     const nextBtn = document.getElementById('brand-nextBtn');
    
//     // Check if elements exist
//     if (!track || !prevBtn || !nextBtn) {
//         console.error('Brand Carousel: Required elements not found.');
//         return;
//     }
    
//     // Get all carousel items
//     const items = track.querySelectorAll('.brand-carousel-item');
//     const totalItems = items.length;
    
//     // Check if we have items
//     if (totalItems === 0) {
//         console.error('Brand Carousel: No carousel items found.');
//         return;
//     }
    
//     // Determine how many items to show per row based on screen size
//     // function getItemsPerRow() {
//     //     if (window.innerWidth < 576) {
//     //         return 3; // Mobile: 3 items per row
//     //     } else if (window.innerWidth < 992) {
//     //         return 5; // Tablet: 5 items per row
//     //     } else {
//     //         return 10; // Desktop: 10 items per row
//     //     }
//     // }
    
//     // Set initial state
//     let currentPosition = 0;
//     let itemsPerRow = 10;
    
//     // Configure grid layout
//     function setupGrid() {
//         itemsPerRow = 10;
//         track.style.gridTemplateColumns = `repeat(${itemsPerRow}, 1fr)`;
        
//         // Calculate how many rows we need
//         const totalRows = Math.ceil(totalItems / itemsPerRow);
        
//         // Update which items are visible based on current position
//         updateVisibleItems();
//     }
    
//     // Function to update visible items
//     function updateVisibleItems() {
//         // Hide all items initially
//         items.forEach((item, index) => {
//             // Only show items in the current row
//             const itemRow = Math.floor(index / itemsPerRow);
//             const isVisible = itemRow === currentPosition;
            
//             // Apply opacity to create a fade effect instead of display:none
//             item.style.opacity = isVisible ? '1' : '0';
//             item.style.transform = isVisible ? 'scale(1)' : 'scale(0.9)';
//             item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
//             // Use grid-row-start/end to control which row is visible
//             if (isVisible) {
//                 item.style.gridRow = '1';
//             } else {
//                 item.style.gridRow = '-1'; // Put offscreen
//             }
//         });
        
//         // Log for debugging
//         console.log(`Current row: ${currentPosition}, Items per row: ${itemsPerRow}`);
//     }
    
//     // Initialize carousel setup
//     setupGrid();
    
//     // Next button click handler
//     nextBtn.addEventListener('click', function() {
//         const totalRows = Math.ceil(totalItems / itemsPerRow);
        
//         if (currentPosition < totalRows - 1) {
//             currentPosition++;
//         } else {
//             // Loop back to beginning
//             currentPosition = 0;
//         }
        
//         updateVisibleItems();
//     });
    
//     // Previous button click handler
//     prevBtn.addEventListener('click', function() {
//         const totalRows = Math.ceil(totalItems / itemsPerRow);
        
//         if (currentPosition > 0) {
//             currentPosition--;
//         } else {
//             // Loop to the end
//             currentPosition = totalRows - 1;
//         }
        
//         updateVisibleItems();
//     });
    
//     // Handle responsive design changes
//     let resizeTimer;
//     window.addEventListener('resize', function() {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(function() {
//             const newItemsPerRow = getItemsPerRow();
            
//             // Only update if number of items per row changed
//             if (newItemsPerRow !== itemsPerRow) {
//                 setupGrid();
//             }
//         }, 250);
//     });
    
//     // Return API for external control
//     return {
//         next: () => nextBtn.click(),
//         prev: () => prevBtn.click(),
//         goToRow: (rowIndex) => {
//             const totalRows = Math.ceil(totalItems / itemsPerRow);
//             if (rowIndex >= 0 && rowIndex < totalRows) {
//                 currentPosition = rowIndex;
//                 updateVisibleItems();
//             }
//         }
//     };
// }

// // Make available globally
// window.initBrandCarousel = initBrandCarousel;
function initBrandCarousel() {
    // Get DOM elements
    const track = document.getElementById('brand-carouselTrack');
    const prevBtn = document.getElementById('brand-prevBtn');
    const nextBtn = document.getElementById('brand-nextBtn');
    
    // Check if elements exist
    if (!track || !prevBtn || !nextBtn) {
        console.error('Brand Carousel: Required elements not found.');
        return;
    }
    
    // Get all carousel items
    const items = track.querySelectorAll('.brand-carousel-item');
    const totalItems = items.length;
    
    // Check if we have items
    if (totalItems === 0) {
        console.error('Brand Carousel: No carousel items found.');
        return;
    }
    
    // Determine how many items to show per row based on screen size
    function getItemsPerRow() {
        if (window.innerWidth < 576) {
            return 3; // Mobile: 3 items per row
        } else if (window.innerWidth < 992) {
            return 5; // Tablet: 5 items per row
        } else {
            return 10; // Desktop: 10 items per row
        }
    }
    
    // Set initial state
    let currentPage = 0;
    let itemsPerRow = getItemsPerRow();
    
    // Calculate total pages
    function getTotalPages() {
        return Math.ceil(totalItems / itemsPerRow);
    }
    
    // Configure grid layout
    function setupGrid() {
        itemsPerRow = getItemsPerRow();
        
        // Always maintain grid with itemsPerRow columns, regardless of item count
        track.style.gridTemplateColumns = `repeat(${itemsPerRow}, 1fr)`;
        
        // If we have fewer items than itemsPerRow, adjust navigation
        if (totalItems <= itemsPerRow) {
            // Hide navigation buttons if all items fit in one row
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
        
        // Update which items are visible based on current page
        updateVisibleItems();
    }
    
    // Function to update visible items
    function updateVisibleItems() {
        const totalPages = getTotalPages();
        
        // Ensure current page is valid
        if (currentPage >= totalPages) {
            currentPage = 0;
        }
        
        // Calculate start and end indices for current page
        const startIdx = currentPage * itemsPerRow;
        const endIdx = Math.min(startIdx + itemsPerRow, totalItems);
        
        // Show/hide items based on current page
        items.forEach((item, index) => {
            if (index >= startIdx && index < endIdx) {
                // Items on current page are visible
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                // Items on other pages are hidden
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
            }
        });
        
        // Log for debugging
        console.log(`Current page: ${currentPage + 1}/${totalPages}, Items per row: ${itemsPerRow}`);
    }
    
    // Initialize carousel setup
    setupGrid();
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
        const totalPages = getTotalPages();
        
        if (currentPage < totalPages - 1) {
            currentPage++;
        } else {
            // Loop back to beginning
            currentPage = 0;
        }
        
        updateVisibleItems();
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
        const totalPages = getTotalPages();
        
        if (currentPage > 0) {
            currentPage--;
        } else {
            // Loop to the end
            currentPage = totalPages - 1;
        }
        
        updateVisibleItems();
    });
    
    // Handle responsive design changes
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const newItemsPerRow = getItemsPerRow();
            
            // Only update if number of items per row changed
            if (newItemsPerRow !== itemsPerRow) {
                // Reset to first page when layout changes
                currentPage = 0;
                setupGrid();
            }
        }, 250);
    });
    
    // Add auto-scroll functionality (optional)
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            nextBtn.click();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Start auto-scroll and pause on hover
    startAutoScroll();
    
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);
    
    // Stop auto-scroll when user interacts with buttons
    prevBtn.addEventListener('mouseenter', stopAutoScroll);
    nextBtn.addEventListener('mouseenter', stopAutoScroll);
    
    // Return API for external control
    return {
        next: () => nextBtn.click(),
        prev: () => prevBtn.click(),
        goToPage: (pageIndex) => {
            const totalPages = getTotalPages();
            if (pageIndex >= 0 && pageIndex < totalPages) {
                currentPage = pageIndex;
                updateVisibleItems();
            }
        },
        startAutoScroll,
        stopAutoScroll
    };
}

// Make available globally
window.initBrandCarousel = initBrandCarousel;