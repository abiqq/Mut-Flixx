// Sample content data with genres
const content = [
    {
        title: "JurnaRisa by Risa Saraswati (2024)",
        genre: "Horror Indo",
        thumbnail: "https://image.tmdb.org/t/p/original/znicsfFuTboZsNzBdZNKYp7VH4P.jpg",
        streamUrl: "https://uqloads.xyz/stream/XWardVakU6O1T7En9R6-lA/kjhhiuahiuhgihdf/1751381966/27789856/index-v1-a1.m3u8",
        fallbackUrl: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8" // Fallback URL
    },
    {
        title: "Ketindihan",
        genre: "Horror Indo",
        thumbnail: "https://www.endcoalnow.com/wp-content/uploads/2025/05/lGAqDi4IeLTzLmFXOEwNPSLBU3Z-152x228.jpg",
        streamUrl: "https://movearnpre.com/stream/tRn2P440jxhZQI_IMSnpJQ/hjkrhuihghfvu/1751382757/25628213/index-v1-a1.m3u8",
        fallbackUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Fallback URL
    },
    {
        title: "Marni: The Story Of Wewe Gombel",
        genre: "Horror Indo",
        thumbnail: "https://www.endcoalnow.com/marni-the-story-of-wewe-gombel/",
        streamUrl: "https://smoothpre.com/stream/IPZgvFl7u9qUHu7FyWDT7A/hjkrhuihghfvu/1751382894/23805400/index-v1-a1.m3u8",
        fallbackUrl: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    },
    {
        title: "Petaka Gunung Gede (2025)",
        genre: "Horror Indo",
        thumbnail: "https://new14.ngefilm.site/wp-content/uploads/2025/06/rmh9oNW0eaUwhQyW22mgzur0NpE-170x255.webp",
        streamUrl: "https://movearnpre.com/stream/UYQ-AqNx_fWwwKeMcZhhKw/hjkrhuihghfvu/1751383107/26702917/index-v1-a1.m3u8",
        fallbackUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "Pulung Gantung: Panti Ngendat (2024)",
        genre: "Horror Indo",
        thumbnail: "https://new14.ngefilm.site/wp-content/uploads/2025/06/v0izepha1mQpK0i71usiTZAzGsr.jpg",
        streamUrl: "https://movearnpre.com/stream/wtp_sOi8vwke1OZblLZFdg/hjkrhuihghfvu/1751383266/26555811/index-v1-a1.m3u8",
        fallbackUrl: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    },
    {
        title: "Rumah Teteh Story of Helena (2025)",
        genre: "Horror Indo",
        thumbnail: "https://new14.ngefilm.site/wp-content/uploads/2025/06/3M2SLZCS9zkgOFrAr1MsTYoULNs.jpg",
        streamUrl: "https://movearnpre.com/stream/9Xiw42UvvxfjNUmbJLuijg/hjkrhuihghfvu/1751383433/26713049/index-v1-a1.m3u8",
        fallbackUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "Jailangku Sandekala (2022)",
        genre: "Horror Indo",
        thumbnail: "https://new14.ngefilm.site/wp-content/uploads/2025/06/rrAG3nzfG4pNkmTZTSxBAespWyD.jpg",
        streamUrl: "https://gradehgplus.com/stream/7dlwu3bO9tGJs19SmYcjSQ/kjhhiuahiuhgihdf/1751383543/53473043/index-v1-a1.m3u8",
        fallbackUrl: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    }
];

// Available genres
const genres = ["Horror Indo", "Action", "Drama", "Comedy"];

// GSAP Animations
function applyAnimations() {
    gsap.from(".animate-title", { duration: 1.2, y: 60, opacity: 0, ease: "power3.out" });
    gsap.from(".animate-subtitle", { duration: 1.2, y: 60, opacity: 0, ease: "power3.out", delay: 0.4 });
    gsap.from(".navbar", { duration: 1, y: -50, opacity: 0, ease: "power3.out" });
    gsap.from(".card", { duration: 1, y: 40, opacity: 0, stagger: 0.15, ease: "power3.out", delay: 0.6 });
}

// Initialize page-specific content
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.split("/").pop();
    
    // Populate genres dropdown
    const genreDropdown = document.getElementById("genreDropdown");
    if (genreDropdown) {
        genres.forEach(genre => {
            const genreContent = content.filter(item => item.genre === genre);
            const item = document.createElement("li");
            item.innerHTML = `<a class="dropdown-item" href="result.html?query=${encodeURIComponent(genre)}">${genre} (${genreContent.length})</a>`;
            genreDropdown.appendChild(item);
        });
    }

    if (path === "index.html" || path === "") {
        applyAnimations();
        populateContent(content, "contentGrid");
    } else if (path === "result.html") {
        applyAnimations();
        const query = new URLSearchParams(window.location.search).get("query") || "";
        populateSearchResults(query);
    } else if (path === "watch.html") {
        applyAnimations();
        setupVideoPlayer();
        const url = new URLSearchParams(window.location.search).get("url");
        const title = new URLSearchParams(window.location.search).get("title") || "Streaming Content";
        if (url) playStream(url, title);
    }

    // Search functionality
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && e.target.value) {
                window.location.href = `result.html?query=${encodeURIComponent(e.target.value)}`;
            }
        });
    }

    // Stream URL input
    const streamUrl = document.getElementById("streamUrl");
    if (streamUrl) {
        streamUrl.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                window.location.href = `watch.html?url=${encodeURIComponent(e.target.value)}`;
            }
        });
    }
});

// Populate content grid
function populateContent(contentArray, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = "";
    if (contentArray.length === 0) {
        grid.innerHTML = '<p class="text-center text-danger">Belum Tersedia</p>';
        return;
    }

    contentArray.forEach(item => {
        const card = `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card bg-dark text-white">
                    <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}" loading="lazy" onerror="this.classList.add('error'); this.src=''; this.alt='Image failed to load';">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.genre}</p>
                        <a href="watch.html?url=${encodeURIComponent(item.streamUrl)}&title=${encodeURIComponent(item.title)}" class="btn btn-primary">Watch Now</a>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// Populate search results
function populateSearchResults(query) {
    const grid = document.getElementById("searchGrid");
    if (!grid) return;

    const results = content.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.genre.toLowerCase().includes(query.toLowerCase())
    );
    populateContent(results, "searchGrid");
}

// Video player setup
function setupVideoPlayer() {
    const player = videojs("videoPlayer", {
        fluid: true,
        responsive: true,
        playbackRates: [0.5, 1, 1.5, 2],
        html5: {
            vhs: {
                overrideNative: true
            }
        }
    });

    player.on("error", () => {
        const error = player.error();
        const errorMessage = `Error: ${error?.message || "Media tidak dapat dimuat"} (Kode: ${error?.code || "N/A"})`;
        document.getElementById("errorLog").innerText = errorMessage;
        document.getElementById("errorHelp").style.display = "block";

        // Detailed logging for debugging
        console.log("Stream Error Details:", {
            message: errorMessage,
            url: player.currentSrc(),
            type: player.currentType(),
            timestamp: new Date()
        });

        // Try fallback URL if available
        const currentUrl = player.currentSrc();
        const contentItem = content.find(item => item.streamUrl === currentUrl);
        if (contentItem && contentItem.fallbackUrl) {
            console.log("Attempting fallback URL:", contentItem.fallbackUrl);
            player.src({ src: contentItem.fallbackUrl, type: contentItem.fallbackUrl.endsWith(".m3u8") ? "application/x-mpegURL" : "video/mp4" });
        }

        // Optional: Send error to server
        // fetch('/log-error', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ error: errorMessage, timestamp: new Date(), url: player.currentSrc() })
        // });
    });
}

// Play stream from URL
function playStream(streamUrl, title = "Streaming Content") {
    if (!streamUrl) {
        document.getElementById("errorLog").innerText = "Error: Tidak ada URL yang diberikan";
        document.getElementById("errorHelp").style.display = "block";
        console.log("Stream Error: No URL provided");
        return;
    }

    const player = videojs("videoPlayer");
    let type = "video/mp4";
    if (streamUrl.endsWith(".m3u8")) {
        type = "application/x-mpegURL"; // HLS
    } else if (streamUrl.endsWith(".mpd")) {
        type = "application/dash+xml"; // DASH
    }

    // Proxy URL (uncomment and configure if needed)
    // const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(streamUrl)}`;
    player.src({ src: streamUrl, type });
    document.getElementById("videoTitle").innerText = title;
    document.getElementById("errorLog").innerText = "";
    document.getElementById("errorHelp").style.display = "none";

    // Log stream attempt
    console.log("Attempting to play stream:", {
        url: streamUrl,
        type: type,
        title: title,
        timestamp: new Date()
    });
}