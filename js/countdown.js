// countdown.js - Countdown Timer for Flash Sale

// Define the initialization function in the global scope so it can be called by safeInitialize
window.updateCountdown = function() {
    // Set the target date for the countdown (2 days from now by default)
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2); // 2 days from now
    targetDate.setHours(targetDate.getHours() + 3); // Add 3 hours
    
    // Check if there's a data attribute with a custom end date
    const countdownContainer = document.querySelector('.countdown-container');
    if (countdownContainer && countdownContainer.dataset.endDate) {
        try {
            targetDate = new Date(countdownContainer.dataset.endDate);
        } catch (error) {
            console.error('Invalid date format in data-end-date attribute:', error);
        }
    }
    
    // Function to update the countdown display
    function updateDisplay() {
        // Get elements
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const headerElement = document.querySelector('.countdown-header h1');
        
        // If any element doesn't exist, stop the timer
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.error('Countdown elements not found');
            clearInterval(timerInterval);
            return;
        }
        
        // Get current date and time
        const currentDate = new Date();
        
        // Calculate the time difference in milliseconds
        const timeDifference = targetDate - currentDate;
        
        // Check if the countdown has ended
        if (timeDifference <= 0) {
            // Countdown has ended
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // Update header text if it exists
            if (headerElement) {
                headerElement.textContent = '活動已結束';
            }
            
            // Stop the timer
            clearInterval(timerInterval);
            
            // Dispatch an event that the countdown has ended
            document.dispatchEvent(new CustomEvent('countdownEnded', {
                detail: { endTime: targetDate }
            }));
            
            return;
        }
        
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Format the time values
        const formattedDays = days < 10 ? '0' + days : days;
        const formattedHours = hours < 10 ? '0' + hours : hours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        
        // Update the display
        daysElement.textContent = formattedDays;
        hoursElement.textContent = formattedHours;
        minutesElement.textContent = formattedMinutes;
        secondsElement.textContent = formattedSeconds;
        
        // Apply pulse animation to seconds
        secondsElement.classList.add('pulse');
        setTimeout(() => {
            secondsElement.classList.remove('pulse');
        }, 500);
    }
    
    // Initialize countdown immediately
    updateDisplay();
    
    // Set interval to update every second
    const timerInterval = setInterval(updateDisplay, 1000);
    
    // Return the interval ID so it can be cleared if needed
    return timerInterval;
};

// Optional: Add a utility function to set a custom end date
window.setCountdownEndDate = function(year, month, day, hour = 0, minute = 0, second = 0) {
    // Find the countdown container
    const countdownContainer = document.querySelector('.countdown-container');
    if (countdownContainer) {
        // Create the date string in ISO format (YYYY-MM-DDTHH:MM:SS)
        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
        
        // Set the data attribute
        countdownContainer.dataset.endDate = dateString;
        
        // Reinitialize the countdown
        if (typeof window.updateCountdown === 'function') {
            window.updateCountdown();
        }
    }
};

// Notify that the countdown module is loaded
console.log('Countdown module loaded');

// If the document is already loaded, initialize immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('Document already loaded, initializing countdown immediately');
    // Don't auto-initialize - let the main.js handle it
} else {
    // Otherwise wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, countdown ready to be initialized');
        // Don't auto-initialize - let the main.js handle it
    });
}