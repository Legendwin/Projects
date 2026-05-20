let isTodayView = false;

document.addEventListener("DOMContentLoaded", function() {
    getQuote();
    getToday();
    scheduleMidnightRefresh();
});

async function getQuote() {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        document.getElementById("quote-text").textContent = `"${data.quote}"`;
        document.getElementById("quote-author").textContent = `- ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
};

async function getToday() {
    try {
        const response = await fetch('https://dummyjson.com/quotes/1');
        const data = await response.json();
        document.getElementById("today-text").textContent = `"${data.quote}"`;
        document.getElementById("today-author").textContent = `- ${data.author}`;       
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
};

function scheduleMidnightRefresh() {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);

    setTimeout(() => {
        getToday();
    }, nextMidnight);
}

// Function to slide between cards
function switchCard() {
    const track = document.getElementById("track");
    if (!track) return; // Prevents error if ID is missing

    if (!isTodayView) {
        track.style.transform = "translateX(-50%)";
        isTodayView = true;
    } else {
        track.style.transform = "translateX(0%)";
        isTodayView = false;
    }
};