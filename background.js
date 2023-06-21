// background.js

// Initialize the user interface and set up event listeners
function initializeUI() {
  // Implement the logic to set up the UI and event listeners
  loadObjections();
  // Set up event listeners for search, display, favorites, and other UI interactions

  const searchInput = document.getElementById('search-input');
  const objectionList = document.getElementById('objection-list');
  const favoritesList = document.getElementById('favorites-list');

  searchInput.addEventListener('input', handleSearch);

  objectionList.addEventListener('click', handleObjectionClick);
  favoritesList.addEventListener('click', handleFavoriteClick);

  renderObjections(objections); // Render the initial list of objections
  renderFavorites(favorites); // Render the initial list of favorites
}

// Event handler for search input
function handleSearch(event) {
  const searchQuery = event.target.value;
  const filteredObjections = searchObjections(searchQuery);
  renderObjections(filteredObjections); // Re-render the objection list with the filtered results
}

// Event handler for objection click
function handleObjectionClick(event) {
  const objectionItem = event.target.closest('.objection-item');
  if (objectionItem) {
    const objectionType = objectionItem.dataset.objectionType;
    const selectedObjection = objections.find((objection) => objection.objectionType === objectionType);
    displayRebuttal(selectedObjection.rebuttal);
  }
}

// Event handler for favorite button click
function handleFavoriteClick(event) {
  const favoriteButton = event.target.closest('.favorite-button');
  if (favoriteButton) {
    const objectionType = favoriteButton.dataset.objectionType;
    const isFavorite = favorites.includes(objectionType);
    if (isFavorite) {
      removeFromFavorites(objectionType);
    } else {
      addToFavorites(objectionType);
    }
    renderFavorites(favorites); // Re-render the favorites list to reflect the changes
  }
}

// Function to render the list of objections
function renderObjections(objections) {
  const objectionList = document.getElementById('objection-list');
  objectionList.innerHTML = '';

  objections.forEach((objection) => {
    const objectionItem = document.createElement('li');
    objectionItem.classList.add('objection-item');
    objectionItem.dataset.objectionType = objection.objectionType;
    objectionItem.textContent = objection.objectionType;
    objectionList.appendChild(objectionItem);
  });
}

// Function to render the list of favorites
function renderFavorites(favorites) {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';

  favorites.forEach((objection) => {
    const favoriteItem = document.createElement('li');
    favoriteItem.classList.add('favorite-item');
    favoriteItem.textContent = objection;
    favoritesList.appendChild(favoriteItem);
  });
}

// Call the initialization function when the extension is installed or updated
chrome.runtime.onInstalled.addListener(initializeUI);
