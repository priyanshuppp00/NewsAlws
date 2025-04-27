// API KEY
const API_KEY = "970d29bf2d964043826f5dce03dde49f";
const BASE_URL = "https://newsapi.org/v2";

// Elements
const newsContainer = document.getElementById("newsContainer");
const breakingText = document.getElementById("breakingText");
const loadingSpinner = document.getElementById("loadingSpinner");
const noResultsMessage = document.getElementById("noResultsMessage");

const searchBtn = document.getElementById("searchBtn");
const searchQuery = document.getElementById("newsQuery");

const latestBtn = document.getElementById("latest");
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Load latest news
window.onload = function() {
  fetchNews("top-headlines?country=us", true);
};

// Fetch news function
function fetchNews(endpoint, isBreaking = false) {
  newsContainer.innerHTML = "";
  noResultsMessage.style.display = "none";
  loadingSpinner.style.display = "block";

  fetch(`${BASE_URL}/${endpoint}&apiKey=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      loadingSpinner.style.display = "none";
      if (data.articles.length > 0) {
        displayNews(data.articles);
        if (isBreaking) {
          displayBreakingNews(data.articles[0]);
        }
      } else {
        noResultsMessage.style.display = "block";
      }
    })
    .catch(err => {
      console.error("Error fetching news:", err);
      loadingSpinner.style.display = "none";
    });
}

// Display news articles
function displayNews(articles) {
  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4 d-flex";

    card.innerHTML = `
      <div class="card">
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="News image">
        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank" class="btn btn-warning mt-2">Read More</a>
        </div>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

// Display breaking news
function displayBreakingNews(article) {
  breakingText.innerHTML = `<a href="${article.url}" target="_blank" class="text-white">${article.title}</a>`;
}

// Handle active nav link
function setActiveLink(clickedLink) {
  navLinks.forEach(link => link.classList.remove("active"));
  clickedLink.classList.add("active");
}

// Event listeners
latestBtn.addEventListener("click", () => {
  fetchNews("top-headlines?country=us", true);
  setActiveLink(latestBtn);
});

generalBtn.addEventListener("click", () => {
  fetchNews("top-headlines?country=us&category=general");
  setActiveLink(generalBtn);
});

businessBtn.addEventListener("click", () => {
  fetchNews("top-headlines?country=us&category=business");
  setActiveLink(businessBtn);
});

sportsBtn.addEventListener("click", () => {
  fetchNews("top-headlines?country=us&category=sports");
  setActiveLink(sportsBtn);
});

entertainmentBtn.addEventListener("click", () => {
  fetchNews("top-headlines?country=us&category=entertainment");
  setActiveLink(entertainmentBtn);
});

technologyBtn.addEventListener("click", () => {
  fetchNews("top-headlines?country=us&category=technology");
  setActiveLink(technologyBtn);
});

searchBtn.addEventListener("click", () => {
  const query = searchQuery.value.trim();
  if (query !== "") {
    fetchNews(`everything?q=${encodeURIComponent(query)}`);
    navLinks.forEach(link => link.classList.remove("active"));
  }
});

// Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,hi,bn,te,mr,ta,gu,kn,ml,pa'
  }, 'google_translate_element');
}
