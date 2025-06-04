// // Function to load HTML components
// async function loadComponent(url, containerId) {
//     try {
//         const response = await fetch(url);
//         const html = await response.text();
//         document.getElementById(containerId).innerHTML = html;
//     } catch (error) {
//         console.error(`Error loading ${url}: ${error}`);
//     }
// }

// // Load all components when document is ready
// document.addEventListener('DOMContentLoaded', function() {
//     loadComponent('components/header.html', 'header-source');
//     loadComponent('components/social-media-list.html','social-media-list-source');
//     loadComponent('components/carousel.html', 'carousel-source');
//     loadComponent('components/categories.html', 'category-source');
//     loadComponent('components/shopping-grid-1.html','shopping-grid-1-source');
//     loadComponent('components/shopping-grid-2.html','shopping-grid-2-source');
//     loadComponent('components/shopping-grid-3.html','shopping-grid-3-source');
//     loadComponent('components/products-1.html', 'products-1-source');
//     loadComponent('components/activity.html','activity-source');
//     loadComponent('components/featured-brand.html','featured-brand-source');
//     loadComponent('components/online-exclusive.html','online-exclusive-source');
//     loadComponent('components/mask-collection.html','mask-collection-source');
//     loadComponent('components/serum-collection.html','serum-collection-source');
//     loadComponent('components/toner-cream.html','toner-cream-source');
//     loadComponent('components/trendy-makeup.html','trendy-makeup-source');
//     loadComponent('components/personal-care.html','personal-care-source');
//     loadComponent('components/health-care.html','health-care-source');
//     loadComponent('components/hair-care.html','hair-care-source');
//     loadComponent('components/fragrance-candles.html','fragrance-candles-source');
//     loadComponent('components/beauty.html','beauty-source');
//     loadComponent('components/bath-body-care.html','bath-body-care-source');
//     loadComponent('components/footer.html', 'footer-source');
//     loadComponent('components/payment.html','payment-source');
    
//     // Initialize components after they've loaded
//     setTimeout(() => {
//         initCarousel();
//         initDuoProductCarousel();
//         InitBrandCarousel();
//         InitSocialMediaList();
//     }, 100);
// });

// Function to load HTML components with Promise
async function loadComponent(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            return true;
        } else {
            console.error(`Container not found: ${containerId}`);
            return false;
        }
    } catch (error) {
        console.error(`Error loading ${url}: ${error}`);
        return false;
    }
}

// Function to initialize components with existence check
function safeInitialize(initFunction, name) {
    if (typeof window[initFunction] === 'function') {
        try {
            window[initFunction]();
            console.log(`Initialized: ${name}`);
        } catch (error) {
            console.error(`Error initializing ${name}: ${error}`);
        }
    } else {
        console.warn(`Initialization function not found: ${initFunction}`);
    }
}

// Load all components when document is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Show loading state
    document.body.classList.add('loading');
    
    // Components to load with their container IDs
    const components = [
        { url: 'components/header.html', id: 'header-source' },
        { url: 'components/social-media-list.html', id: 'social-media-list-source' },
        { url: 'components/carousel.html', id: 'carousel-source' },
        { url: 'components/categories.html', id: 'category-source' },
        { url: 'components/shopping-grid-1.html', id: 'shopping-grid-1-source' },
        { url: 'components/shopping-grid-2.html', id: 'shopping-grid-2-source' },
        { url: 'components/shopping-grid-3.html', id: 'shopping-grid-3-source' },
        { url: 'components/products-1.html', id: 'products-1-source' },
        { url: 'components/activity.html', id: 'activity-source' },
        { url: 'components/featured-brand.html', id: 'featured-brand-source' },
        { url: 'components/online-exclusive.html', id: 'online-exclusive-source' },
        { url: 'components/mask-collection.html', id: 'mask-collection-source' },
        { url: 'components/serum-collection.html', id: 'serum-collection-source' },
        { url: 'components/toner-cream.html', id: 'toner-cream-source' },
        { url: 'components/trendy-makeup.html', id: 'trendy-makeup-source' },
        { url: 'components/personal-care.html', id: 'personal-care-source' },
        { url: 'components/health-care.html', id: 'health-care-source' },
        { url: 'components/hair-care.html', id: 'hair-care-source' },
        { url: 'components/fragrance-candles.html', id: 'fragrance-candles-source' },
        { url: 'components/beauty.html', id: 'beauty-source' },
        { url: 'components/bath-body-care.html', id: 'bath-body-care-source' },
        { url: 'components/footer.html', id: 'footer-source' },
        { url: 'components/payment.html', id: 'payment-source' }
    ];
    
    // Load components in parallel but handle them as a group
    try {
        const results = await Promise.allSettled(
            components.map(comp => loadComponent(comp.url, comp.id))
        );
        
        // Check if any critical components failed to load
        const criticalComponents = ['header-source', 'footer-source', 'carousel-source'];
        const criticalFailures = results.filter((result, index) => 
            criticalComponents.includes(components[index].id) && result.status === 'rejected'
        );
        
        if (criticalFailures.length > 0) {
            console.error('Critical components failed to load:', criticalFailures);
            document.body.innerHTML += '<div class="error-message">Sorry, we encountered an error loading the page. Please refresh.</div>';
        }
        
        // Initialize components in proper order with small delays between them
        // This ensures DOM has time to process each component
        await new Promise(resolve => setTimeout(resolve, 50));
        safeInitialize('initCarousel', 'Main Carousel');
        
        await new Promise(resolve => setTimeout(resolve, 50));
        safeInitialize('initDuoProductCarousel', 'Duo Product Carousel');
        
        await new Promise(resolve => setTimeout(resolve, 50));
        safeInitialize('initBrandCarousel', 'Brand Carousel'); // Note: corrected function name casing
        
        await new Promise(resolve => setTimeout(resolve, 50));
        safeInitialize('initSocialMediaList', 'Social Media List'); // Note: corrected function name casing

        await new Promise(resolve => setTimeout(resolve,50));
        safeInitialize('updateCountdown','Count Down');
        
        // Additional initializations as needed
        
    } catch (error) {
        console.error('Error during component loading:', error);
    } finally {
        // Remove loading state regardless of success/failure
        document.body.classList.remove('loading');
    }
});

// Add event listeners for custom events if components need to communicate
document.addEventListener('carouselReady', function(e) {
    console.log('Carousel reported ready:', e.detail);
    // Any additional actions needed when carousel is fully ready
});

