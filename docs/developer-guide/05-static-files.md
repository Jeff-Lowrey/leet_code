# Static Files

[← Previous: Template System](04-template-system.md) | [🏠 Home](README.md) | [Next: Adding Features →](06-adding-features.md)

---

## Overview

Static assets (CSS, JavaScript, images) provide the visual design and interactive functionality for the web interface. Flask serves these files from the `static/` directory.

## Flask Configuration

```python
# In app.py
app = Flask(__name__,
            template_folder="../../templates",
            static_folder="../../static")
```

**URL Access**:
- Static files available at: `/static/{path}`
- Example: `/static/css/style.css`
- Example: `/static/js/main.js`

## CSS Styling

### Main Stylesheet (`static/css/style.css`)

**Organization**:
```css
/* Base styles */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --background-color: #ffffff;
    /* ... more variables ... */
}

/* Typography */
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", ...;
}

/* Layout */
.container { ... }
.sidebar { ... }
.main-content { ... }

/* Components */
.category-card { ... }
.solution-card { ... }
.code-block { ... }

/* Syntax highlighting */
.highlight { ... }

/* Responsive design */
@media (max-width: 768px) { ... }
```

### Pygments Syntax Highlighting

Pygments generates inline CSS for code highlighting:

```python
# In app.py
formatter = HtmlFormatter(style=style, linenos=True)
style_css = formatter.get_style_defs(".highlight")
```

**Template Integration**:
```jinja2
<!-- In solution.html -->
<style>
    {{ style|safe }}
</style>
```

**Pygments Themes** (for syntax highlighting):
- Light mode: `default` style
- Dark mode: `monokai` style

### Theme System (`static/css/themes.css`)

**Overview**:
The application includes a comprehensive theme system with 18 visual themes organized into 9 theme families. Each family provides both light and dark variants.

**Available Themes**:
1. **Soft Neutral** - `light`, `dark` (default)
2. **Classic** - `classic-light`, `classic-dark`
3. **Vibrant** - `vibrant-light`, `vibrant-dark`
4. **High Contrast** - `high-contrast-light`, `high-contrast-dark`
5. **Neon** - `neon-light`, `neon-dark`
6. **Chaos** - `chaos-light`, `chaos-dark`
7. **Rainbow** - `rainbow-light`, `rainbow-dark`
8. **Happy** - `happy-light`, `happy-dark`
9. **Moody** - `moody-light`, `moody-dark`

**Theme Structure**:
```css
/* Each theme defines CSS custom properties */
[data-theme="classic-light"] {
    --primary-color: #2563eb;
    --secondary-color: #2563eb;
    --dark-bg: #2563eb;
    --light-bg: #ffffff;
    --card-bg: #ffffff;
    --text-primary: #000000;
    --text-secondary: #2563eb;
    --border-color: transparent;
    --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    /* Category colors */
    --cat-rust: #2563eb;
    --cat-steel-blue: #2563eb;
    /* ... more category colors ... */
}
```

**Theme Application**:
Themes are applied via the `data-theme` attribute on the `<html>` or `<body>` element:
```html
<html data-theme="neon-dark">
```

**Category Colors**:
Each theme defines 8 category color variables used throughout the application:
- `--cat-rust`, `--cat-steel-blue`, `--cat-sage`, `--cat-amber`
- `--cat-plum`, `--cat-teal`, `--cat-burgundy`, `--cat-navy`

### Responsive Design

**Breakpoints**:
```css
/* Mobile */
@media (max-width: 576px) {
    .container {
        padding: 10px;
    }
}

/* Tablet */
@media (max-width: 768px) {
    .sidebar {
        display: none;
    }
}

/* Desktop */
@media (min-width: 992px) {
    .container {
        max-width: 1200px;
    }
}
```

## JavaScript Functionality

### Main Script (`static/js/main.js`)

**Core Features**:

#### 1. Theme Switching

**Current Implementation**:
The theme system uses `data-theme` attributes and localStorage for persistence.

```javascript
// Set theme
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
}

// Get current theme
function getTheme() {
    return localStorage.getItem('theme') || 'light'; // default
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', loadTheme);

// Theme selector handler
function handleThemeChange(event) {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
}
```

**HTML Theme Selector**:
```html
<select id="theme-selector" onchange="handleThemeChange(event)">
    <option value="light">Soft Neutral - Light</option>
    <option value="dark">Soft Neutral - Dark</option>
    <option value="classic-light">Classic - Light</option>
    <option value="classic-dark">Classic - Dark</option>
    <option value="vibrant-light">Vibrant - Light</option>
    <option value="vibrant-dark">Vibrant - Dark</option>
    <!-- ... more themes ... -->
</select>
```

**Key Features**:
- Instant theme switching (no page reload)
- Automatic persistence via localStorage
- Fallback to default theme if none saved
- Cross-page theme consistency

#### 2. Code Copying
```javascript
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const code = codeBlock.innerText;

    navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}
```

#### 3. Navigation
```javascript
function navigateToSolution(category, filename) {
    window.location.href = `/solution/${category}/${filename}`;
}

function goBack() {
    window.history.back();
}
```

#### 4. Sidebar Toggle
```javascript
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Auto-hide on mobile after selection
function closeSidebarOnMobile() {
    if (window.innerWidth < 768) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('open');
    }
}
```

#### 5. Download Handling
```javascript
function downloadSolution(category, filename, format, language = 'Python') {
    const url = `/solution/${category}/${filename}/download/${format}/${language}`;
    window.location.href = url;
}
```

#### 6. Language Switching
```javascript
function switchLanguage(category, filename, language) {
    if (language === 'Python') {
        window.location.href = `/solution/${category}/${filename}`;
    } else {
        window.location.href = `/solution/${category}/${filename}/view/${language}`;
    }
}
```

## Template Integration

### Loading Static Files

**In base template** (`templates/base.html`):
```jinja2
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}LeetCode Learning Tool{% endblock %}</title>

    <!-- CSS -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">

    {% block extra_css %}{% endblock %}
</head>
<body>
    {% block content %}{% endblock %}

    <!-- JavaScript -->
    <script src="{{ url_for('static', filename='js/main.js') }}"></script>

    {% block extra_js %}{% endblock %}
</body>
</html>
```

### Dynamic Styling

**Syntax highlighting CSS**:
```jinja2
<!-- In solution.html -->
{% block extra_css %}
<style>
    {{ style|safe }}
</style>
{% endblock %}
```

**Inline styles for specific pages**:
```jinja2
{% block extra_css %}
<style>
    .solution-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
</style>
{% endblock %}
```

## Asset Optimization

### CSS Minification

**Development**:
```css
/* Readable with comments */
.category-card {
    padding: 20px;
    margin: 10px;
    /* More styles... */
}
```

**Production** (manually minified):
```css
.category-card{padding:20px;margin:10px}
```

### JavaScript Minification

**Development**:
```javascript
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
}
```

**Production** (manually minified):
```javascript
function toggleTheme(){const t=getCurrentTheme();setTheme("light"===t?"dark":"light")}
```

### Image Optimization

**Best Practices**:
- Use SVG for icons and logos
- Compress PNG/JPG images (80-90% quality)
- Use WebP format for modern browsers
- Implement lazy loading for images

```html
<img src="{{ url_for('static', filename='images/logo.svg') }}"
     alt="Logo"
     loading="lazy">
```

## Adding New Static Assets

### Adding CSS Files

1. **Create file**: `static/css/new-styles.css`

2. **Include in template**:
```jinja2
{% block extra_css %}
<link rel="stylesheet" href="{{ url_for('static', filename='css/new-styles.css') }}">
{% endblock %}
```

3. **Or import in main CSS**:
```css
@import url('new-styles.css');
```

### Adding JavaScript Files

1. **Create file**: `static/js/new-feature.js`

2. **Include in template**:
```jinja2
{% block extra_js %}
<script src="{{ url_for('static', filename='js/new-feature.js') }}"></script>
{% endblock %}
```

3. **Or import in main JS** (ES6 modules):
```javascript
import { newFeature } from './new-feature.js';
```

### Adding Images

1. **Place file**: `static/images/new-image.png`

2. **Use in template**:
```jinja2
<img src="{{ url_for('static', filename='images/new-image.png') }}"
     alt="Description">
```

3. **Use in CSS**:
```css
.background {
    background-image: url('/static/images/new-image.png');
}
```

## LocalStorage Usage

### Overview

The application uses the browser's localStorage API to persist user preferences across sessions without requiring server-side storage or user accounts.

### Theme Persistence

**Storage Key**: `theme`

**Stored Value**: Theme name string (e.g., `"neon-dark"`, `"classic-light"`)

**Implementation**:
```javascript
// Save theme preference
localStorage.setItem('theme', 'neon-dark');

// Retrieve theme preference
const savedTheme = localStorage.getItem('theme');

// Check if theme exists
if (localStorage.getItem('theme')) {
    console.log('User has saved theme preference');
}

// Remove theme preference (reset to default)
localStorage.removeItem('theme');

// Clear all localStorage
localStorage.clear();
```

### LocalStorage Best Practices

**1. Always Provide Defaults**:
```javascript
// Bad - may return null
const theme = localStorage.getItem('theme');

// Good - provides fallback
const theme = localStorage.getItem('theme') || 'light';
```

**2. Error Handling**:
```javascript
function saveTheme(themeName) {
    try {
        localStorage.setItem('theme', themeName);
        return true;
    } catch (e) {
        // Storage full or disabled
        console.error('Failed to save theme:', e);
        return false;
    }
}

function loadTheme() {
    try {
        return localStorage.getItem('theme') || 'light';
    } catch (e) {
        // localStorage disabled or unavailable
        console.warn('localStorage unavailable, using default theme');
        return 'light';
    }
}
```

**3. Storage Availability Check**:
```javascript
function isLocalStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Use before storing
if (isLocalStorageAvailable()) {
    localStorage.setItem('theme', selectedTheme);
} else {
    // Fallback: use in-memory storage or cookies
    console.warn('localStorage not available');
}
```

**4. Data Validation**:
```javascript
const VALID_THEMES = [
    'light', 'dark',
    'classic-light', 'classic-dark',
    'vibrant-light', 'vibrant-dark',
    'high-contrast-light', 'high-contrast-dark',
    'neon-light', 'neon-dark',
    'chaos-light', 'chaos-dark',
    'rainbow-light', 'rainbow-dark',
    'happy-light', 'happy-dark',
    'moody-light', 'moody-dark'
];

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');

    // Validate stored value
    if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        return savedTheme;
    }

    // Invalid or missing - return default
    return 'light';
}
```

### LocalStorage Limitations

**Storage Capacity**:
- **Limit**: ~5-10 MB per domain (varies by browser)
- **Current Usage**: < 100 bytes for theme preference
- **Plenty of headroom** for future features

**Synchronous Operations**:
- localStorage operations are synchronous (blocking)
- For small data like theme names, this is negligible
- Avoid storing large amounts of data

**Security Considerations**:
- localStorage is accessible via JavaScript (XSS vulnerability)
- Do NOT store sensitive data (passwords, tokens, PII)
- Theme preferences are safe to store

**Browser Compatibility**:
- ✅ Chrome 4+
- ✅ Firefox 3.5+
- ✅ Safari 4+
- ✅ Edge (all versions)
- ✅ Mobile browsers

**Private/Incognito Mode**:
- localStorage may be cleared on browser close
- Some browsers restrict localStorage in private mode
- Always provide fallback defaults

### Debugging LocalStorage

**Browser DevTools**:

1. **Chrome DevTools**:
   - F12 → Application tab → Storage → Local Storage
   - View all key-value pairs
   - Edit, delete, or add entries
   - Clear storage

2. **Firefox DevTools**:
   - F12 → Storage tab → Local Storage
   - Same functionality as Chrome

3. **Safari DevTools**:
   - Develop → Show Web Inspector → Storage tab

**Console Commands**:
```javascript
// View all localStorage
console.table(localStorage);

// View specific item
console.log(localStorage.getItem('theme'));

// View all keys
console.log(Object.keys(localStorage));

// Storage size (approximate)
const size = new Blob(Object.values(localStorage)).size;
console.log(`localStorage size: ${size} bytes`);
```

### Future localStorage Features

**Potential Additions**:
- User preference for code font size
- Preferred programming language
- Recently viewed solutions
- Favorite categories
- Code snippet bookmarks

**Implementation Pattern**:
```javascript
// Centralized storage manager
const StorageManager = {
    keys: {
        THEME: 'theme',
        FONT_SIZE: 'font_size',
        LANGUAGE: 'preferred_language'
    },

    get(key, defaultValue) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? value : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    }
};

// Usage
StorageManager.set(StorageManager.keys.THEME, 'neon-dark');
const theme = StorageManager.get(StorageManager.keys.THEME, 'light');
```

## Browser Caching

### Cache Control

**Flask Configuration**:
```python
# In app.py
@app.after_request
def add_header(response):
    """Add headers to both force latest IE rendering or Chrome Frame,
    and also to cache the rendered page for 10 minutes."""
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=600'
    return response
```

**Static File Versioning**:
```jinja2
<!-- Add version parameter to bust cache -->
<link rel="stylesheet"
      href="{{ url_for('static', filename='css/style.css') }}?v=1.0.0">
```

## Development Workflow

### Local Development

1. **Modify static files** in `static/` directory
2. **Refresh browser** (Flask auto-serves updated files)
3. **Clear browser cache** if needed (Ctrl+Shift+R / Cmd+Shift+R)

### Testing Changes

```bash
# Start Flask development server
pdm run python -m src.leet_code.app --debug

# Access site at http://127.0.0.1:9501
# Make changes to CSS/JS
# Refresh browser to see updates
```

### Browser DevTools

**Chrome DevTools**:
- `F12` or `Cmd+Opt+I` (Mac) / `Ctrl+Shift+I` (Windows)
- Inspect elements
- View console logs
- Debug JavaScript
- Test responsive design
- Profile performance

**Useful DevTools Features**:
- **Elements**: Inspect and modify DOM/CSS
- **Console**: Test JavaScript snippets
- **Network**: Monitor file loading
- **Application**: View localStorage, cookies
- **Performance**: Analyze rendering speed

## Performance Best Practices

### CSS Optimization

1. **Minimize HTTP requests**: Combine CSS files
2. **Use CSS variables**: Easier theme switching
3. **Avoid `@import`**: Slower than `<link>`
4. **Minimize specificity**: Faster selector matching
5. **Use shorthand properties**: Smaller file size

### JavaScript Optimization

1. **Load at end of `<body>`**: Don't block rendering
2. **Use `async` or `defer`**: Non-blocking script loading
3. **Minimize DOM manipulation**: Batch updates
4. **Debounce event handlers**: Reduce function calls
5. **Use event delegation**: Fewer event listeners

### Example: Debouncing

```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usage
const debouncedSearch = debounce(function(query) {
    performSearch(query);
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

## Common Issues

### CSS Not Loading

**Check**:
1. File path correct?
2. Flask static folder configured?
3. Browser cache cleared?
4. Network tab shows 200 status?

**Solution**:
```python
# Verify static folder
print(app.static_folder)  # Should be absolute path to static/

# Force reload in template
{{ url_for('static', filename='css/style.css') }}?v={{ timestamp }}
```

### JavaScript Not Executing

**Check**:
1. Console errors?
2. Script loaded before DOM ready?
3. Syntax errors?

**Solution**:
```javascript
// Wrap in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Your code here
});
```

### MIME Type Warnings

**Issue**: "Refused to execute script... MIME type ('text/plain')"

**Solution**:
```python
# Ensure Flask serves correct MIME types
# This is automatic for standard extensions (.css, .js, .png, etc.)
```

---

## Appendix: Directory Structure

```
static/
├── css/
│   └── style.css              # Main stylesheet
├── js/
│   └── main.js                # JavaScript functionality
└── images/                     # Image assets (if any)
```

---

[← Previous: Template System](04-template-system.md) | [🏠 Home](README.md) | [Next: Adding Features →](06-adding-features.md)
