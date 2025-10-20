// Shared Utility Functions

/**
 * Register a click-outside handler for an element
 * @param {string} containerSelector - CSS selector for the container
 * @param {Function} callback - Function to call when clicking outside
 */
function onClickOutside(containerSelector, callback) {
  document.addEventListener('click', function (event) {
    if (!event.target.closest(containerSelector)) {
      callback();
    }
  });
}

/**
 * Close element by removing 'show' class
 * @param {string} elementId - ID of element to close
 */
function closeElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove('show');
  }
}

/**
 * Close element by removing 'active' class
 * @param {string} elementId - ID of element to close
 */
function deactivateElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove('active');
  }
}

/**
 * Toggle a dropdown menu
 * @param {Event} event - The click event
 * @param {string} menuId - ID of the dropdown menu
 */
function toggleDropdownMenu(event, menuId) {
  event.stopPropagation();
  const menu = document.getElementById(menuId);
  if (menu) {
    menu.classList.toggle('show');
  }
}

/**
 * Setup expand/collapse all functionality for details elements
 * @param {string} buttonId - ID of the toggle button
 * @param {string} detailsSelector - CSS selector for details elements
 */
function setupExpandCollapseAll(buttonId, detailsSelector) {
  const toggleBtn = document.getElementById(buttonId);
  const allDetails = document.querySelectorAll(detailsSelector);
  let allExpanded = true;

  if (!toggleBtn || allDetails.length === 0) {
    return;
  }

  toggleBtn.addEventListener('click', function () {
    allExpanded = !allExpanded;
    allDetails.forEach((details) => {
      details.open = allExpanded;
    });
    toggleBtn.textContent = allExpanded ? 'Collapse All' : 'Expand All';
  });
}

/**
 * Sort stats entries and format as text
 * @param {object} stats - Stats object with key-value pairs
 * @param {number} topN - Number of top items to show
 * @param {string} separator - Separator between items (default: ', ')
 * @param {Function} formatter - Optional custom formatter (pattern, count) => string
 * @returns {object} { text, totalShown, grandTotal, remaining }
 */
function formatTopStats(stats, topN, separator = ', ', formatter = null) {
  const sorted = Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN);

  const defaultFormatter = ([pattern, count]) => `${pattern}: ${count}`;
  const formatFunc = formatter || defaultFormatter;

  const text = sorted.map(formatFunc).join(separator);
  const totalShown = sorted.reduce((sum, [_, count]) => sum + count, 0);
  const grandTotal = Object.values(stats).reduce((sum, count) => sum + count, 0);
  const remaining = grandTotal - totalShown;

  return { text, totalShown, grandTotal, remaining };
}

/**
 * Fetch and handle stats with error handling
 * @param {string} url - API endpoint URL
 * @param {Function} successCallback - Function to call on success
 * @param {string} errorMessage - Error message to log
 * @param {Function} errorCallback - Optional function to call on error
 */
function fetchStats(url, successCallback, errorMessage, errorCallback = null) {
  fetch(url)
    .then((r) => r.json())
    .then(successCallback)
    .catch((error) => {
      console.error(errorMessage, error);
      if (errorCallback) {
        errorCallback(error);
      }
    });
}
