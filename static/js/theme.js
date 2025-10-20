// Theme Management Module

// Helper: Update theme icon based on dark/light mode
/**
 *
 * @param themeId
 */
function updateThemeIcon(themeId) {
  const isDarkTheme = themeId.includes('-dark') || themeId === 'dark';
  const themeIcon = document.querySelector('.theme-icon');
  const themeButton = document.querySelector('.theme-toggle');

  if (isDarkTheme) {
    themeIcon.textContent = '☀️';
    themeButton.classList.add('dark-mode');
  } else {
    themeIcon.textContent = '🌙';
    themeButton.classList.remove('dark-mode');
  }
}

// Theme definitions with color previews - ordered by usage and intensity
const themes = {
  // Professional/Minimal
  light: {
    name: 'Soft Neutral Light',
    colors: [
      '#5b7bb5',
      '#6b7280',
      '#f5f5f0',
      '#d47d5e',
      '#6890c9',
      '#7fa87f',
      '#d4a366',
      '#ad85ad',
      '#66a8a8',
      '#c96680',
      '#6882ad',
    ],
  },
  dark: {
    name: 'Soft Neutral Dark',
    colors: [
      '#3b82f6',
      '#10b981',
      '#0f172a',
      '#f87171',
      '#60a5fa',
      '#4ade80',
      '#fbbf24',
      '#c084fc',
      '#2dd4bf',
      '#fb7185',
      '#818cf8',
    ],
  },
  'classic-light': {
    name: 'Classic Light',
    colors: ['#2563eb', '#ffffff'],
  },
  'classic-dark': {
    name: 'Classic Dark',
    colors: ['#2563eb', '#1a1a1a'],
  },
  // Accessibility
  'high-contrast-light': {
    name: 'High Contrast Light',
    colors: [
      '#0066cc',
      '#333333',
      '#ffffff',
      '#cc3300',
      '#009933',
      '#ff9900',
      '#9933cc',
      '#009999',
      '#cc0066',
      '#000099',
    ],
  },
  'high-contrast-dark': {
    name: 'High Contrast Dark',
    colors: [
      '#66b3ff',
      '#cccccc',
      '#000000',
      '#ff6666',
      '#66ff99',
      '#ffcc66',
      '#cc66ff',
      '#66ffff',
      '#ff66cc',
      '#6666ff',
    ],
  },
  // Colorful/Standard
  'vibrant-light': {
    name: 'Vibrant Light',
    colors: [
      '#e91e63',
      '#00bcd4',
      '#ff5722',
      '#2196f3',
      '#4caf50',
      '#ff9800',
      '#9c27b0',
      '#009688',
      '#3f51b5',
    ],
  },
  'vibrant-dark': {
    name: 'Vibrant Dark',
    colors: [
      '#f06292',
      '#4dd0e1',
      '#ff7043',
      '#42a5f5',
      '#66bb6a',
      '#ffa726',
      '#ab47bc',
      '#26a69a',
      '#5c6bc0',
    ],
  },
  'rainbow-light': {
    name: 'Rainbow Light',
    colors: [
      '#dc2626',
      '#2563eb',
      '#16a34a',
      '#d97706',
      '#9333ea',
      '#0891b2',
      '#e11d48',
      '#eab308',
    ],
  },
  'rainbow-dark': {
    name: 'Rainbow Dark',
    colors: [
      '#f87171',
      '#60a5fa',
      '#4ade80',
      '#fb923c',
      '#c084fc',
      '#22d3ee',
      '#fb7185',
      '#fbbf24',
    ],
  },
  // Mood-based
  'moody-light': {
    name: 'Moody Light',
    colors: [
      '#7a5f96',
      '#556270',
      '#9a6872',
      '#65866f',
      '#a08862',
      '#568a96',
      '#8f6279',
      '#576291',
    ],
  },
  'moody-dark': {
    name: 'Moody Dark',
    colors: [
      '#9d84b7',
      '#6c7a89',
      '#b5838d',
      '#7c9885',
      '#b8a07e',
      '#6b9ca8',
      '#a67c94',
      '#6d7aa8',
    ],
  },
  'happy-light': {
    name: 'Happy Light',
    colors: [
      '#ff1493',
      '#ffd700',
      '#ff4500',
      '#00bfff',
      '#00ff00',
      '#ffb400',
      '#da70d6',
      '#00ced1',
      '#4169e1',
    ],
  },
  'happy-dark': {
    name: 'Happy Dark',
    colors: [
      '#ff1493',
      '#ffd700',
      '#ff5533',
      '#00ccff',
      '#00ff66',
      '#ffcc00',
      '#ee82ee',
      '#00e5e5',
      '#5588ff',
    ],
  },
  // Special Effects
  'neon-light': {
    name: 'Neon Light',
    colors: [
      '#00cccc',
      '#dd00dd',
      '#f8f8f8',
      '#dd0066',
      '#00bbee',
      '#22dd00',
      '#ee5500',
      '#00dddd',
      '#dd0055',
    ],
  },
  'neon-dark': {
    name: 'Neon Dark',
    colors: [
      '#00ffff',
      '#ff00ff',
      '#0a0a0a',
      '#ff0080',
      '#00d4ff',
      '#39ff14',
      '#ff6600',
      '#ff0066',
    ],
  },
};

// Theme switching functionality - preserves theme family, toggles light/dark
/**
 *
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

  // Determine theme family and mode
  let newTheme;

  if (currentTheme.endsWith('-dark')) {
    // Currently on X-dark, switch to X-light
    const themeFamily = currentTheme.slice(0, -5); // Remove '-dark'
    newTheme = themeFamily + '-light';
  } else if (currentTheme.endsWith('-light')) {
    // Currently on X-light, switch to X-dark
    const themeFamily = currentTheme.slice(0, -6); // Remove '-light'
    newTheme = themeFamily + '-dark';
  } else if (currentTheme === 'dark') {
    // Special case: generic dark -> generic light
    newTheme = 'light';
  } else if (currentTheme === 'light') {
    // Special case: generic light -> generic dark
    newTheme = 'dark';
  } else {
    // Fallback: treat as light mode, switch to dark
    newTheme = 'dark';
  }

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Update theme icon
  updateThemeIcon(newTheme);

  // Reload page to apply new syntax highlighting
  if (window.location.pathname.includes('/solution/')) {
    const url = new URL(window.location);
    url.searchParams.set('theme', newTheme);
    window.location.href = url.toString();
  }
}

// Initialize theme on page load
/**
 *
 */
function initializeTheme() {
  // Check URL parameter first, then localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');
  const savedTheme = urlTheme || localStorage.getItem('theme') || 'light';

  // Update localStorage if URL theme is different
  if (urlTheme && urlTheme !== localStorage.getItem('theme')) {
    localStorage.setItem('theme', urlTheme);
  }

  document.documentElement.setAttribute('data-theme', savedTheme);

  // Update theme icon
  updateThemeIcon(savedTheme);

  // Clean up URL parameter after applying theme
  if (urlTheme) {
    const url = new URL(window.location);
    url.searchParams.delete('theme');
    window.history.replaceState({}, '', url.toString());
  }
}

// Toggle theme picker dropdown
/**
 *
 * @param event
 */
function toggleThemePicker(event) {
  event.stopPropagation();
  const dropdown = document.getElementById('theme-picker-dropdown');

  // Repopulate dropdown each time to reflect current mode
  populateThemePicker();

  dropdown.classList.toggle('show');
}

// Populate theme picker with themes matching current mode
/**
 *
 */
function populateThemePicker() {
  const dropdown = document.getElementById('theme-picker-dropdown');
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const isDarkMode = currentTheme.includes('-dark') || currentTheme === 'dark';

  let html = `<div class="theme-picker-header">Select Theme (${isDarkMode ? 'Dark' : 'Light'} Mode)</div>`;

  let themeCount = 0;
  // Filter themes by current mode
  for (const [themeId, theme] of Object.entries(themes)) {
    const isThemeDark = themeId.includes('-dark') || themeId === 'dark';

    // Only show themes that match current mode
    if (isThemeDark === isDarkMode) {
      themeCount++;
      const isActive = themeId === currentTheme;
      html += `
                <div class="theme-option ${isActive ? 'active' : ''}" onclick="selectTheme('${themeId}')">
                    <span class="theme-name">${theme.name}${isActive ? ' ✓' : ''}</span>
                    <div class="theme-color-preview">
                        ${theme.colors
                          .map(
                            (color) =>
                              `<span class="color-square" style="background-color: ${color};"></span>`
                          )
                          .join('')}
                    </div>
                </div>
            `;
    }
  }

  // Debug: Showing theme count
  // console.log(`Showing ${themeCount} ${isDarkMode ? 'dark' : 'light'} themes`);
  dropdown.innerHTML = html;
}

// Select a theme
/**
 *
 * @param themeId
 */
function selectTheme(themeId) {
  document.documentElement.setAttribute('data-theme', themeId);
  localStorage.setItem('theme', themeId);

  // Update theme icon
  updateThemeIcon(themeId);

  // Close dropdown
  document.getElementById('theme-picker-dropdown').classList.remove('show');

  // Reload page to apply new syntax highlighting
  if (window.location.pathname.includes('/solution/')) {
    const url = new URL(window.location);
    url.searchParams.set('theme', themeId);
    window.location.href = url.toString();
  }
}

// Event Listeners for theme
document.addEventListener('DOMContentLoaded', function () {
  // Close theme picker when clicking outside
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.theme-picker-container')) {
      document.getElementById('theme-picker-dropdown')?.classList.remove('show');
    }
  });
});
