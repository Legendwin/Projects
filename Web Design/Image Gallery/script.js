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

// Load images from Pexels API
(function(){
    const API_KEY = 'AKc64Lbu0yi42jhXv5GBRO1eFUWiflbs0IFGf4uh5WR6k3rMUzVq3khs';
    const gallery = document.getElementById('gallery');
    const moreBtn = document.querySelector('.btn button');
    const searchInput = document.getElementById('search-input');
    let query = '';
    let cols = [];
    let columnCount = 3;
    let resizeTimeout;

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            loadPexelsImages(null, false);
            searchInput.blur();
            searchInput.value = '';
        };
    });
    
    // Random search queries to vary the images
    const searchQueries = [
        'nature', 'landscape', 'city', 'ocean', 'mountain', 'forest', 'sunset', 'houses', 'background', 'beach', 'waterfall', 'aurora', 'countryside',  'desert', 'windows',
        'travel', 'abstract', 'animals', 'sky', 'architecture', 'flowers', 'dark', 'light', 'festival', 'night', 'gradient', 'bridge', 'island',  'aerial', 'stars', 'desktop',
        'people', 'food', 'technology', 'urban', 'water', 'wildlife', 'space', 'cars', 'sports', 'art', 'music', 'vintage', 'minimal', 'colorful', 'black and white',
    ];

    function getColumnCount() {
        if (window.innerWidth <= 576) {
            return 1;
        } else if (window.innerWidth <= 780) {
            return 2;
        }
        return 3;
    }
    
    function getRandomQuery() {
        return searchQueries[Math.floor(Math.random() * searchQueries.length)];
    }
    
    function getRandomPage() {
        return Math.floor(Math.random() * 50) + 1;
    }

    async function loadPexelsImages(page = null, append = false) {
        try {
            // Use random query and page if not specified
            if (!append) {
                const searchItem = searchInput.value.trim();
                query = searchItem ? searchItem : getRandomQuery();
            }
            const randomPage = page !== null ? page : getRandomPage();
            
            const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${randomPage}`, {
                headers: {
                    'Authorization': API_KEY
                }
            });
            const data = await response.json();
            
            columnCount = getColumnCount();
            
            if (!append) {
                gallery.innerHTML = ''; // Clear existing content
                cols = [];
                for (let i = 0; i < columnCount; i++) {
                    const col = document.createElement('div');
                    col.className = 'col';
                    gallery.appendChild(col);
                    cols.push(col);
                }
            } else {
                // Update cols reference to match current column count when appending
                cols = Array.from(gallery.querySelectorAll('.col'));
            }
            
            // Distribute images across columns
            const totalImages = gallery.querySelectorAll('.image-card').length;
            data.photos.forEach((photo, idx) => {
                const col = cols[(totalImages + idx) % columnCount];
                
                const figure = document.createElement('figure');
                figure.className = 'image-card';
                
                const alt = photo.alt;
                const img = document.createElement('img');
                img.src = photo.src.medium;
                img.alt = alt;
                img.loading = 'lazy';
                img.setAttribute('tabindex', '0');
                
                figure.setAttribute('data-title', alt);
                figure.appendChild(img);
                col.appendChild(figure);
            });
            
            initializeGallery();
        } catch (error) {
            console.error('Error loading images from Pexels:', error);
            if (!append) {
                gallery.innerHTML = '<p>Failed to load images. Please try again.</p>';
            }
        }
    }

    // Load initial images
    loadPexelsImages();

    // More button click handler
    moreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loadPexelsImages(null, true);
    });

    // Handle window resize to adapt column count with debounce
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const newColumnCount = getColumnCount();
            if (newColumnCount !== columnCount) {
                loadPexelsImages(null, false);
            }
        }, 250);
    });
})();

// Lightbox functionality
(function (){
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCaption = document.getElementById('lb-caption');
    const btnClose = document.getElementById('lb-close');
    const btnPrev = document.getElementById('lb-prev');
    const btnNext = document.getElementById('lb-next');

    let figures = [];
    let currentIndex = -1;

    function initializeGallery() {
        figures = Array.from(gallery.querySelectorAll('figure.image-card'));
        
        gallery.addEventListener('click', function(e){
            const fig = e.target.closest('figure.image-card');
            if(!fig) return;
            const index = figures.indexOf(fig);
            if(index !== -1) openAt(index);
        });

        figures.forEach(function(fig, idx){
            fig.addEventListener('keydown', function(e){
                if(e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openAt(idx);
                }
            });
        });
    }

    function openAt(index){
        if(index < 0 || index >= figures.length) return;
        const fig = figures[index];
        const img = fig.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        const title = fig.getAttribute('data-title');

        lbImg.src = src;
        lbImg.alt = alt;
        lbCaption.textContent = title;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        currentIndex = index;
        btnClose.focus();
    }

    function close(){
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lbImg.src = '';
        currentIndex = -1;
    }

    function prev(){
        if(currentIndex === -1) return;
        const nextIndex = (currentIndex - 1 + figures.length) % figures.length;
        openAt(nextIndex);
    }

    function next(){
        if(currentIndex === -1) return;
        const nextIndex = (currentIndex + 1) % figures.length;
        openAt(nextIndex);
    }

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function(e){ e.stopPropagation(); prev(); });
    btnNext.addEventListener('click', function(e){ e.stopPropagation(); next(); });

    lightbox.addEventListener('click', function(e){
        if(e.target === lightbox) close();
    });

    document.addEventListener('keydown', function(e){
        if(lightbox.classList.contains('open')){
            if(e.key === 'Escape') close();
            if(e.key === 'ArrowLeft') prev();
            if(e.key === 'ArrowRight') next();
        }
    });

    lightbox.addEventListener('keydown', function(e){
        if(e.key !== 'Tab') return;
        const focusable = [btnClose, btnPrev, btnNext].filter(Boolean);
        if(focusable.length === 0) return;
        const idx = focusable.indexOf(document.activeElement);
        if(e.shiftKey){
            if(idx === 0){
                e.preventDefault();
                focusable[focusable.length-1].focus();
            }
        } else {
            if(idx === focusable.length - 1){
                e.preventDefault();
                focusable[0].focus();
            }
        }
    });

    // Export for API loading
    window.initializeGallery = initializeGallery;
})();