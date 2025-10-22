# Customizing Themes

[← Previous: Study Strategies](07-study/README.md) | [🏠 Home](README.md) | [Next: Language Selection →](09-language-selection.md)

---

## Table of Contents

- [Overview](#overview)
- [Accessing the Theme Selector](#accessing-the-theme-selector)
- [Available Theme Families](#available-theme-families)
- [Theme Selection Guide](#theme-selection-guide)
- [Technical Details](#technical-details)
- [Theme Customization Tips](#theme-customization-tips)
- [Accessibility Considerations](#accessibility-considerations)
- [Troubleshooting Themes](#troubleshooting-themes)

## Overview

The Leet Code Learning Tool offers a comprehensive theme system with 18 different visual themes to customize your learning experience. Choose from professional, vibrant, accessible, or novelty themes to match your preferences and environment.

## Accessing the Theme Selector

### Location

The theme selector is located in the navigation bar at the top of every page:

1. Look for the **"Theme"** dropdown in the navbar
2. Click to reveal all available themes
3. Select your preferred theme
4. Your choice is automatically saved

### Automatic Persistence

Your theme preference is stored in your browser's localStorage, meaning:
- ✅ Your selection persists across sessions
- ✅ No account or login required
- ✅ Works independently on each device/browser
- ✅ Changes take effect immediately

## Available Theme Families

### 1. Soft Neutral (Default)

**Best for**: General purpose, professional environments

- **Light Mode**: Soft beige background with muted colors
- **Dark Mode**: Dark slate background with subtle accents
- **Features**:
  - Easy on the eyes for extended reading
  - Distinct category colors for organization
  - Professional appearance

**When to use**: Default starting point, all-day coding, professional presentations

---

### 2. Classic

**Best for**: Traditional blue and white aesthetic

- **Light Mode**: Clean white cards with blue headers
- **Dark Mode**: Dark background with blue accents
- **Features**:
  - Professional blue color scheme
  - High readability
  - Traditional interface design

**When to use**: Corporate environments, traditional preferences, business presentations

---

### 3. Vibrant

**Best for**: Energetic, colorful learning

- **Light Mode**: Bright eclectic colors on light background
- **Dark Mode**: Vivid colors on dark background
- **Features**:
  - Diverse category colors (orange, blue, green, purple, pink)
  - High energy visual style
  - Material Design inspired

**When to use**: Creative work, long study sessions needing visual variety, personal projects

---

### 4. High Contrast

**Best for**: Accessibility and visual impairments

- **Light Mode**: Black text on white background
- **Dark Mode**: White text on black background
- **Features**:
  - Maximum contrast ratios
  - Enhanced readability
  - WCAG accessibility compliant
  - Bold borders and separations

**When to use**: Low vision, screen glare, bright environments, accessibility requirements

---

### 5. Neon

**Best for**: High-energy, cyberpunk aesthetic

- **Light Mode**: Neon colors on light background
- **Dark Mode**: True neon colors on very dark background
- **Features**:
  - Bright cyan, magenta, and lime green
  - Glowing effects on dark mode
  - Futuristic appearance

**When to use**: Night coding, creative projects, cyberpunk enthusiasts, making a statement

---

### 6. Chaos

**Best for**: Fun, novelty, April Fools

- **Light Mode**: Deliberately clashing bright colors (magenta, yellow, cyan, red)
- **Dark Mode**: Clashing colors on dark background
- **Features**:
  - Deliberately garish color combinations
  - Maximum visual chaos
  - Entertainment value

**When to use**: Pranks, screenshots for social media, breaking monotony, demonstrating themes

---

### 7. Rainbow

**Best for**: Colorful organization with distinct categories

- **Light Mode**: 8 distinct rainbow colors for categories
- **Dark Mode**: Bright rainbow palette on dark background
- **Features**:
  - Red, blue, green, orange, purple, cyan, pink, yellow
  - Each category gets unique color
  - Clear visual differentiation

**When to use**: Visual learners, category organization, colorful preferences

---

### 8. Happy

**Best for**: Cheerful, positive aesthetic

- **Light Mode**: Vivid pinks, golds, and blues
- **Dark Mode**: Bright cheerful colors on dark background
- **Features**:
  - Pink and gold primary colors
  - Uplifting color palette
  - Energetic and positive

**When to use**: Morning coding, mood boosting, personal enjoyment, creative work

---

### 9. Moody

**Best for**: Subdued, atmospheric coding

- **Light Mode**: Muted purples and grays on light background
- **Dark Mode**: Deep purple-tinted dark theme
- **Features**:
  - Sophisticated muted palette
  - Purple and gray tones
  - Calm and atmospheric

**When to use**: Evening coding, focused work, reducing eye strain, aesthetic preference

---

## Theme Selection Guide

### By Time of Day

| Time | Recommended Themes |
|------|-------------------|
| **Morning** | Soft Neutral Light, Classic Light, Happy Light |
| **Afternoon** | Vibrant Light, Rainbow Light, High Contrast Light |
| **Evening** | Soft Neutral Dark, Moody Dark, Classic Dark |
| **Night** | Neon Dark, Moody Dark, High Contrast Dark |

### By Environment

| Environment | Recommended Themes |
|------------|-------------------|
| **Bright Office** | High Contrast Light, Classic Light |
| **Dim Room** | Soft Neutral Dark, Neon Dark, Moody Dark |
| **Outdoors** | High Contrast Light |
| **Coffee Shop** | Soft Neutral Light, Classic Light |

### By Task

| Task | Recommended Themes |
|------|-------------------|
| **Long Study Session** | Soft Neutral, High Contrast, Moody |
| **Quick Reference** | Classic, Vibrant |
| **Presentation** | Classic, Soft Neutral |
| **Creative Work** | Vibrant, Rainbow, Happy, Neon |

### By Preference

| Preference | Recommended Themes |
|-----------|-------------------|
| **Professional** | Classic, Soft Neutral |
| **Colorful** | Vibrant, Rainbow, Happy |
| **Minimalist** | High Contrast, Classic |
| **Unique** | Neon, Moody, Chaos |
| **Accessibility** | High Contrast |

## Technical Details

### CSS Variables

All themes use CSS custom properties (variables) for easy customization:

```css
:root {
    --primary-color: #5b7bb5;
    --secondary-color: #6b7280;
    --dark-bg: #111827;
    --light-bg: #f5f5f0;
    --card-bg: #fdfdfc;
    --text-primary: #1a1a1a;
    --text-secondary: #4a4a4a;
    --border-color: #e0e0dc;
    --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

    /* Badge colors (NEW in Issue #5) */
    --badge-problem-number: #8b8680;        /* Theme-appropriate neutral/accent color */
    --badge-problem-number-text: #ffffff;

    /* Category-specific colors */
    --cat-rust: #d47d5e;
    --cat-steel-blue: #6890c9;
    --cat-sage: #7fa87f;
    /* ... more categories ... */
}
```

### Badge Color System (Issue #5)

**New Feature**: Problem number badges now use theme-specific colors that match each theme's aesthetic, creating clear visual distinction from category labels.

**Visual Hierarchy**:
- **Problem Number Badges**: Theme-appropriate neutral or accent colors
- **Category Labels**: Bold category-specific colors

This creates a clear information hierarchy where:
- Problem numbers (reference information) use subtle theme colors
- Categories (classification) use distinctive bold colors

**Theme Examples**:

```css
/* Soft Neutral - Warm gray for soft aesthetic */
:root {
    --badge-problem-number: #8b8680;
    --badge-problem-number-text: #ffffff;
}

/* Classic - Only blue, black, and white */
[data-theme="classic-light"] {
    --badge-problem-number: #000000;      /* Pure black */
    --badge-problem-number-text: #ffffff;
}

/* Vibrant - Colorful pink for energy */
[data-theme="vibrant-light"] {
    --badge-problem-number: #e91e63;      /* Deep pink */
    --badge-problem-number-text: #ffffff;
}

/* Neon - Electric magenta for neon effect */
[data-theme="neon-dark"] {
    --badge-problem-number: #ff00ff;      /* Electric magenta */
    --badge-problem-number-text: #000000;
}

/* High Contrast - Maximum contrast for accessibility */
[data-theme="high-contrast-light"] {
    --badge-problem-number: #000000;      /* Pure black */
    --badge-problem-number-text: #ffffff;
}
```

**Implementation**:
```css
/* In static/css/components/cards.css */
.problem-number {
    background-color: var(--badge-problem-number);
    color: var(--badge-problem-number-text);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 700;
}
```

### Theme Application

Themes are applied using the `data-theme` attribute:

```html
<html data-theme="neon-dark">
```

JavaScript handles theme switching and persistence:

```javascript
// Save theme preference
localStorage.setItem('theme', 'neon-dark');

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme');
document.documentElement.setAttribute('data-theme', savedTheme);
```

### Browser Compatibility

Themes work on all modern browsers:
- ✅ Chrome 49+
- ✅ Firefox 31+
- ✅ Safari 9.1+
- ✅ Edge 15+

CSS custom properties are widely supported and provide instant theme switching without page reload.

## Tips for Theme Usage

### Finding Your Preference

1. **Try Multiple Themes**: Experiment with different themes over several days
2. **Match Your Environment**: Choose themes that work with your lighting
3. **Consider Time of Day**: Switch between light and dark modes as needed
4. **Accessibility First**: If you have visual needs, prioritize High Contrast

### Performance

- ✅ Theme switching is instant (no page reload)
- ✅ No performance impact (pure CSS)
- ✅ Works offline (localStorage)
- ✅ No network requests needed

### Troubleshooting

**Theme not saving?**
- Check browser localStorage is enabled
- Ensure cookies/storage not blocked
- Try clearing browser cache

**Colors look wrong?**
- Verify you selected correct theme variant (light vs dark)
- Check browser zoom level (100% recommended)
- Try hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

**Theme selector missing?**
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify you're using a supported browser

## Contributing New Themes

Developers can add new themes by:

1. Adding CSS variables in `static/css/themes.css`
2. Following the existing theme structure
3. Providing both light and dark variants
4. Testing for readability and contrast
5. Documenting the theme purpose

See the [Developer Guide](../developer-guide/05-static-files.md) for technical details on theme implementation.

---

## Summary

The theme system provides:
- **18 total themes** across 9 families
- **Light and dark variants** for each family
- **Automatic persistence** using localStorage
- **Instant switching** with no reload
- **Accessibility options** with High Contrast
- **Professional to novelty** options for all preferences

Choose the theme that makes your learning experience most comfortable and enjoyable!

---

[← Previous: Study Strategies](07-study/README.md) | [🏠 Home](README.md) | [Next: Language Selection →](09-language-selection.md)
