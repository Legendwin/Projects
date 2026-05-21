let isTodayView = false;

document.addEventListener("DOMContentLoaded", function() {
    getQuote();
    getToday();
    scheduleMidnightRefresh();
});

async function getQuote() {
    try {
        // 3. Fetch quote
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();

        // 4. Update your HTML
        document.getElementById("quote-text").textContent = `"${data.quote}"`;
        document.getElementById("quote-author").textContent = `- ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
};

async function getToday() {
    try {
        // 1. Get today's date formatted as a simple string (YYYY-MM-DD)
        const todayStr = new Date().toISOString().split('T')[0];

        // 2. Check localStorage for an existing quote saved today
        const cachedData = localStorage.getItem('quoteOfTheDay');
        const cachedDate = localStorage.getItem('quoteDate');

        if (cachedData && cachedDate === todayStr) {
            // Data exists and is fresh! Use it immediately.
            displayQuote(JSON.parse(cachedData));
            return; 
        }

        // Generate today's specific ID (1-100)
        const now = new Date();
        const millisecondsInDay = 24 * 60 * 60 * 1000;
        const localTimestamp = now.getTime() - (now.getTimezoneOffset() * 60000);
        const totalDays = Math.floor(localTimestamp / millisecondsInDay);
        
        const totalQuotesInAPI = 100;
        const quoteId = (totalDays % totalQuotesInAPI) + 1;

        // 3. Fetch that specific quote ID
        const response = await fetch(`https://dummyjson.com${quoteId}`);
        const data = await response.json();

        // 5. Save the new quote and today's date into localStorage
        localStorage.setItem('quoteOfTheDay', JSON.stringify(data));
        localStorage.setItem('quoteDate', todayStr);
        
        // 6. Display the fetched quote
        displayQuote(data);        
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
};

function displayQuote(data) {
    // 4. Update your HTML
    document.getElementById("today-text").textContent = `"${data.quote}"`;
    document.getElementById("today-author").textContent = `- ${data.author}`; 
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