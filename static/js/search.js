// Search Module

// Toggle search input
/**
 *
 */
function toggleSearch() {
  const searchInput = document.getElementById('search-input');
  searchInput.classList.toggle('active');

  if (searchInput.classList.contains('active')) {
    searchInput.focus();
  }
}

// Event Listeners for search
document.addEventListener('DOMContentLoaded', function () {
  // Close search when clicking outside
  onClickOutside('.search-container', function () {
    deactivateElement('search-input');
  });
});
