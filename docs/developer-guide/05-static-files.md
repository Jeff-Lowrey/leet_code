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

**Themes**:
- Light mode: `default` style
- Dark mode: `monokai` style

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
```javascript
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme')
        ? 'dark'
        : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', newTheme);
    updateSyntaxHighlighting(newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Load theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);
```

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
