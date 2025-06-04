const now = new Date();
const countdownDate = new Date(now.getTime() + (1*24*60*60*1000) + (20*60*60*1000) + (16*60*1000) + (50*1000));

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    // Calculate days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Add leading zeros
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    
    // If the countdown is over
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
}

// Update the countdown every second
window.updateCountdown = updateCountdown;
const countdownInterval = setInterval(updateCountdown, 1000);