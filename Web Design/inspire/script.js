let isTodayView = false;

document.addEventListener("DOMContentLoaded", function() {
    getQuote();
    getToday();
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
        const response = await fetch(`https://dummyjson.com/quotes/${quoteId}`);
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

function getShareText() {
    const quoteText = isTodayView ? document.getElementById('today-text').textContent : document.getElementById('quote-text').textContent;
    const quoteAuthor = isTodayView ? document.getElementById('today-author').textContent : document.getElementById('quote-author').textContent;
    return `${quoteText}\n${quoteAuthor}\n\nGet inspired on Legends Inspire! ${window.location.href}`;
}

async function shareQuote() {
    const shareText = getShareText();
    const shareData = {
        title: 'Legends Inspire',
        text: shareText,
        url: window.location.href,
    };


    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(shareText);
            alert('Quote copied to clipboard. Paste it into your app to share.');
        } catch (error) {
            console.error('Clipboard write failed:', error);
            prompt('Copy this text to share:', shareText);
        }
        return;
    }

    prompt('Copy this text to share:', shareText);
};

function shareVia(app) {
    const text = getShareText();
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(window.location.href);
    let shareUrl = '';

    switch(app) {
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'noopener');
};

// Theme switcher: toggles data-theme on <html> and persists preference
(function (){
    const btn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const STORAGE_KEY = 'theme-preference';

    function setTheme(theme){
        if(theme === 'dark'){
            root.setAttribute('data-theme','dark');
            btn.textContent = '☀️';
            btn.setAttribute('aria-pressed','true');
        } else {
            root.removeAttribute('data-theme');
            btn.textContent = '🌙';
            btn.setAttribute('aria-pressed','false');
        }
    }

    function init(){
        const saved = localStorage.getItem(STORAGE_KEY);
        if(saved === 'dark' || saved === 'light'){
            setTheme(saved === 'dark' ? 'dark' : 'light');
            return;
        }
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    btn.addEventListener('click', function(){
        const active = root.getAttribute('data-theme') === 'dark';
        const next = active ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
    });

    init();
})();