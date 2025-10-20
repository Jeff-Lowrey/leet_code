// Navigation and Dropdown Module

// Toggle dropdown menu for category quick access
/**
 *
 * @param event
 * @param categorySlug
 */
function toggleDropdown(event, categorySlug) {
  event.preventDefault();
  event.stopPropagation();

  const dropdown = document.getElementById(`dropdown-${categorySlug}`);
  const button = event.target;

  // Close all other dropdowns
  document.querySelectorAll('.dropdown-menu.show').forEach((menu) => {
    if (menu !== dropdown) {
      menu.classList.remove('show');
      menu.previousElementSibling.querySelector('.dropdown-toggle').classList.remove('active');
    }
  });

  // Toggle current dropdown
  dropdown.classList.toggle('show');
  button.classList.toggle('active');
}

// Toggle View By dropdown
/**
 *
 * @param event
 */
function toggleViewByDropdown(event) {
  toggleDropdownMenu(event, 'view-by-menu');
}

// Toggle Docs dropdown
/**
 *
 * @param event
 */
function toggleDocsDropdown(event) {
  toggleDropdownMenu(event, 'docs-menu');
}

// Update view icon based on current page
/**
 *
 */
function updateViewIcon() {
  const path = window.location.pathname;
  const viewIcon = document.getElementById('view-icon');
  const viewButton = document.querySelector('.view-by-toggle');

  if (path === '/difficulty') {
    viewIcon.textContent = '📊';
    viewButton.setAttribute('title', 'By Difficulty');
  } else if (path === '/complexity') {
    viewIcon.textContent = '⚡';
    viewButton.setAttribute('title', 'By Complexity');
  } else {
    viewIcon.textContent = '📁';
    viewButton.setAttribute('title', 'By Category');
  }
}

// Event Listeners for navigation
document.addEventListener('DOMContentLoaded', function () {
  // Close category dropdowns when clicking outside
  onClickOutside('.solutions-dropdown', function () {
    document.querySelectorAll('.dropdown-menu.show').forEach((menu) => {
      menu.classList.remove('show');
    });
    document.querySelectorAll('.dropdown-toggle.active').forEach((button) => {
      button.classList.remove('active');
    });
  });

  // Close View By dropdown when clicking outside
  onClickOutside('.view-by-container', function () {
    closeElement('view-by-menu');
  });

  // Close Docs dropdown when clicking outside
  onClickOutside('.docs-container', function () {
    closeElement('docs-menu');
  });
});
