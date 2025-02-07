// API Key
const API_KEY = "970d29bf2d964043826f5dce03dde49f";

// Base URL for News API
const BASE_URL = "https://newsapi.org/v2";

// Elements
const newsContainer = document.getElementById("newsContainer");
const breakingNews = document.getElementById("breakingNews");
const breakingText = document.getElementById("breakingText");
const loadingSpinner = document.getElementById("loadingSpinner");

const searchQuery = document.getElementById("newsQuery");
const searchBtn = document.getElementById("searchBtn");

const latestBtn = document.getElementById("latest");
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

const languageSelector = document.getElementById("languageSelector");

// Load Latest News on Page Load
window.onload = function () {
    fetchNews("top-headlines?country=us", "Latest News");
};

// Fetch News by Category or Search Query
function fetchNews(endpoint, category) {
    newsContainer.innerHTML = "";
    document.getElementById("noResultsMessage").style.display = "none"; // Hide no results message
    loadingSpinner.style.display = "block"; // Show loading spinner
    fetch(`${BASE_URL}/${endpoint}&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = "none"; // Hide loading spinner
            if (data.articles.length > 0) {
                displayNews(data.articles);
                displayBreakingNews(data.articles[0]); // Display Breaking News
            } else {
                newsContainer.innerHTML = "";
                document.getElementById("noResultsMessage").style.display = "block"; // Show no results message
            }
        })
        .catch(error => {
            loadingSpinner.style.display = "none"; // Hide loading spinner
            console.log("Error fetching news:", error);
        });
}

// Display News Cards
function displayNews(articles) {
    articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4 d-flex";

        card.innerHTML = `
            <div class="card">
                <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description || "No description available"}</p>
                    <a href="${article.url}" class="btn btn-warning btn-display mt-auto" target="_blank">Read More</a>
                </div>
            </div>
        `;

        newsContainer.appendChild(card);
    });
}

// Display Breaking News
function displayBreakingNews(news) {
    breakingNews.style.display = "block";
    breakingText.innerHTML = `<a href="${news.url}" target="_blank">${news.title}</a>`;
}

// Function to handle active state
function setActiveLink(link) {
    navLinks.forEach(navLink => {
        navLink.classList.remove('active');
    });
    link.classList.add('active');
}

// Event Listeners for Category Buttons
latestBtn.addEventListener("click", () => {
    fetchNews("top-headlines?country=us", "Latest News");
    setActiveLink(latestBtn);
});
generalBtn.addEventListener("click", () => {
    fetchNews("top-headlines?country=us&category=general", "General News");
    setActiveLink(generalBtn);
});
businessBtn.addEventListener("click", () => {
    fetchNews("top-headlines?country=us&category=business", "Business News");
    setActiveLink(businessBtn);
});
sportsBtn.addEventListener("click", () => {
    fetchNews("top-headlines?country=us&category=sports", "Sports News");
    setActiveLink(sportsBtn);
});
entertainmentBtn.addEventListener("click", () => {
    fetchNews("top-headlines?country=us&category=entertainment", "Entertainment News");
    setActiveLink(entertainmentBtn);
});
technologyBtn.addEventListener("click", () => {
    fetchNews("top-headlines?country=us&category=technology", "Technology News");
    setActiveLink(technologyBtn);
});

// Search News by Query
searchBtn.addEventListener("click", () => {
    const query = searchQuery.value;
    if (query) {
        fetchNews(`everything?q=${query}`, `Search Results for "${query}"`);
    }
});

// Function to change language
languageSelector.addEventListener("change", function() {
    const language = languageSelector.value;
    const googleTranslateElement = document.querySelector('.goog-te-combo');
    if (googleTranslateElement) {
        googleTranslateElement.value = language;
        googleTranslateElement.dispatchEvent(new Event('change'));
    }
});



function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,bn,te,mr,ta,gu,kn,ml,pa'
    }, 'languageSelector');

}