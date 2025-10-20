// Main Initialization Module

// Initialize all modules on page load
document.addEventListener('DOMContentLoaded', function () {
  // Initialize theme first (for visual consistency)
  initializeTheme();

  // Build table of contents
  buildTableOfContents();

  // Update navigation icons
  updateViewIcon();
});
