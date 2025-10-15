# Browsing Solutions

[← Previous: Getting Started](02-getting-started.md) | [🏠 Home](README.md) | [Next: Downloading Solutions →](04-downloading-solutions.md)

---

## Table of Contents

- [Navigating the Platform](#navigating-the-platform)
- [Navigation Tools](#navigation-tools)
- [Home Page Categories](#home-page-categories)
- [Quick Access Dropdowns](#quick-access-dropdowns)
- [Category View](#category-view)
- [Browsing by Difficulty](#browsing-by-difficulty)
- [Browsing by Complexity](#browsing-by-complexity)
- [Solution Page Structure](#solution-page-structure)
- [Navigation Tips](#navigation-tips)
- [Visual Indicators](#visual-indicators)
- [Best Browsing Practices](#best-browsing-practices)

## Navigating the Platform

The Leet Code Learning Tool provides multiple ways to browse and find solutions efficiently. You can navigate by category, difficulty level, complexity, or use the table of contents sidebar for quick access.

## Navigation Tools

### View By Dropdown

The navigation bar includes a "View By" dropdown that lets you switch between different browsing modes:

**Accessing the Dropdown:**
1. Look for the icon button in the top navigation bar (📊/📁/⚡)
2. Click to reveal the dropdown menu
3. Select your preferred view mode

**View Options:**
- **By Category**: Browse problems organized by algorithmic patterns (default)
- **By Difficulty**: View all problems grouped by Easy, Medium, and Hard
- **By Complexity**: Browse problems organized by time and space complexity

The icon changes based on your current view:
- 📁 Category view
- 📊 Difficulty view
- ⚡ Complexity view

### Documentation Dropdown

Access comprehensive guides through the Documentation dropdown (📖 icon):

**Available Guides:**
- **All Documentation**: Overview of all available guides
- **User Guide**: Complete guide to using the application
- **Developer Guide**: Technical documentation for contributors
- **Upload Guide**: Instructions for adding new solutions

### Table of Contents (TOC) Sidebar

The TOC sidebar provides context-aware navigation based on your current page:

**Opening the TOC:**
- Click the document outline icon (📄) in the top-left corner
- The sidebar slides in from the left

**TOC Features:**
- **Category Pages**: Shows all problems in the category with expandable lists
- **Difficulty Page**: Jump links to Easy, Medium, and Hard sections
- **Complexity Page**: Quick navigation to complexity combinations
- **Documentation Pages**: Full guide structure with all sub-pages

**Using the TOC:**
1. Click any section or problem to navigate
2. Current location is highlighted
3. Click the X or TOC icon again to close

## Home Page Categories

### Category Cards

The home page displays all 29+ algorithmic categories as visual cards:

- **Category Name**: Clear identification of the algorithmic pattern
- **Solution Count**: Number of problems solved in that category
- **Color Coding**: Each category has a unique color for easy recognition
- **Quick Access Dropdown**: Direct navigation to specific problems

### Category Organization

Solutions are organized by common algorithmic patterns:

**Fundamental Categories:**
- Arrays & Hashing
- Two Pointers
- Sliding Window
- Stacks
- Binary Search
- Linked Lists

**Intermediate Categories:**
- Trees
- Tries
- Heap/Priority Queue
- Backtracking
- Intervals

**Advanced Categories:**
- Graphs
- Advanced Graphs
- 1-D Dynamic Programming
- 2-D Dynamic Programming
- Greedy Algorithms

**Specialized Categories:**
- Bit Manipulation
- Math & Geometry
- And more...

## Quick Access Dropdowns

Each category card includes a dropdown menu for direct navigation:

### Using Quick Access

1. **Locate Category**: Find the category card on the home page
2. **Open Dropdown**: Click the dropdown arrow on the card
3. **Select Problem**: Choose from the list of available problems
4. **View Solution**: Instantly navigate to the selected solution

### Dropdown Features

- **Problem Numbers**: LeetCode problem numbers for reference
- **Problem Names**: Full problem titles
- **Alphabetical Sorting**: Easy to find specific problems
- **Instant Navigation**: No need to browse category lists

## Category View

### Accessing Categories

Click any category card to view all solutions in that category:

- **Category Header**: Displays category name and description
- **Solution List**: All problems in the category
- **Difficulty Indicators**: Easy/Medium/Hard labels
- **Problem Details**: Number, title, and brief description

### Solution List Layout

Each solution entry shows:

1. **Problem Number**: LeetCode reference number (e.g., "001", "217")
2. **Problem Title**: Full problem name
3. **Difficulty Level**: Color-coded difficulty badge
4. **Language Indicators**: Available language implementations

### Filtering and Sorting

Navigate efficiently through category solutions:

- **By Difficulty**: Easy problems typically listed first
- **By Number**: Numerical order by LeetCode problem number
- **By Language**: Filter by available language implementations

## Browsing by Difficulty

### Difficulty Overview Page

Access the unified difficulty view to see all problems organized by difficulty level:

**Accessing:**
- Use the "View By" dropdown and select "By Difficulty"
- Or navigate directly to `/difficulty`

**Page Features:**
- All three difficulty levels (Easy, Medium, Hard) in one view
- Collapsible sections for each difficulty level
- Problem count displayed for each level
- TOC sidebar with jump links to each difficulty section

### Difficulty Sections

Each difficulty section includes:

**Section Header:**
- Difficulty name and problem count
- Expandable/collapsible arrow indicator (▶/▼)
- Click to expand or collapse the section

**Problem Cards:**
- Problem number and title
- Category label (which pattern it belongs to)
- Time and space complexity badges (when available)
- Click any card to view the solution

**Clickable Badges:**
- Difficulty badges on solution pages link to the difficulty overview
- Click a difficulty badge to see all problems at that level
- Automatically scrolls to the relevant difficulty section

### Using Difficulty View

**For Learning:**
1. Start with Easy section expanded
2. Work through problems sequentially
3. Expand Medium when ready to advance
4. Challenge yourself with Hard problems

**For Interview Prep:**
1. Focus on Medium difficulty
2. Ensure coverage across different categories
3. Practice Hard problems for top-tier interviews

## Browsing by Complexity

### Complexity Overview Page

View all problems organized by their time and space complexity combinations:

**Accessing:**
- Use the "View By" dropdown and select "By Complexity"
- Or navigate directly to `/complexity`

**Page Features:**
- All complexity combinations in one view
- Sorted by frequency (most common first)
- Collapsible sections for each combination
- Problem count for each complexity level
- TOC sidebar with jump links

### Complexity Sections

Each complexity section shows:

**Section Header:**
- Time complexity (e.g., O(n), O(log n), O(n²))
- Space complexity (e.g., O(1), O(n))
- Combined format: "Time: O(n) | Space: O(1)"
- Problem count for this combination
- Expandable/collapsible arrow

**Problem Cards:**
- Problem number and title
- Category label
- Difficulty level
- Click to view solution

**Common Complexity Combinations:**
- **O(n) | O(1)**: Linear time, constant space (very common)
- **O(n log n) | O(1)**: Sorting algorithms
- **O(n) | O(n)**: Hash table solutions
- **O(log n) | O(1)**: Binary search
- **O(n²) | O(1)**: Nested loops

**Clickable Badges:**
- Complexity badges on solution pages link to complexity overview
- Click to see all problems with that time/space combination
- Automatically jumps to the relevant section

### Using Complexity View

**For Learning:**
1. Study problems with the same complexity together
2. Compare different approaches to achieve same complexity
3. Understand space-time tradeoffs

**For Optimization:**
1. Find problems with optimal O(n) or O(log n) solutions
2. Study constant space O(1) techniques
3. Compare your solution's complexity to others

## Solution Page Structure

### Viewing Individual Solutions

Clicking a solution takes you to the detailed view:

1. **Problem Statement**: Complete problem description
2. **Example Cases**: Input/output examples with explanations
3. **Solution Code**: Syntax-highlighted implementation
4. **Complexity Analysis**: Time and space complexity
5. **Approach Explanation**: Step-by-step solution walkthrough

### Page Sections

**Header Section:**
- Problem number and title
- Difficulty badge
- Category badge
- Language selector (if alternatives available)

**Content Section:**
- Problem description with markdown formatting
- Example cases with formatted input/output
- Detailed solution explanation in collapsible section

**Code Section:**
- Syntax-highlighted code display
- Line numbers for reference
- Format toggle (Original/LeetCode format)

**Action Buttons:**
- Download Skeleton
- Download Solution
- Download LeetCode Format
- Download ZIP Bundle
- Upload Alternative Language

## Navigation Tips

### Efficient Browsing

1. **Use TOC Sidebar**: Quick navigation on any page
2. **Use View By Dropdown**: Switch between browsing modes
3. **Use Quick Access**: Category card dropdowns for specific problems
4. **Clickable Badges**: Jump from solution to difficulty/complexity overview
5. **Browse by Pattern**: Learn categories systematically
6. **Difficulty Progression**: Start with Easy, advance to Hard
7. **Multi-Language Exploration**: Compare implementations

### Search Strategies

**By Category:**
- Know the algorithmic pattern → Go to category
- Want to master a topic → Browse entire category
- Use TOC to see all problems in category

**By Difficulty:**
- Learning fundamentals → Use difficulty overview, start with Easy
- Interview prep → Focus on Medium section
- Advanced practice → Challenge with Hard section
- Compare across categories at same difficulty level

**By Complexity:**
- Learning efficiency → Study O(n) and O(log n) solutions
- Optimization practice → Find O(1) space solutions
- Algorithm comparison → See different approaches to same complexity

**By Problem:**
- Know the problem number → Use quick access dropdown
- Know the problem name → Browse category or use TOC
- Exploring similar problems → Use complexity or category view

### Back Navigation

- **Browser Back Button**: Return to previous page
- **Category Links**: Jump back to category view
- **Home Link**: Return to main category grid

## Visual Indicators

### Color Coding

- **Categories**: Each has a unique theme color
- **Difficulty Badges**:
  - 🟢 Easy - Green
  - 🟡 Medium - Yellow
  - 🔴 Hard - Red
- **Language Badges**: Available language implementations

### Status Indicators

- **Solution Count**: Number badge on category cards
- **Language Icons**: Show available alternative languages
- **Format Toggle**: Current view mode (Original/LeetCode)

## Best Browsing Practices

### For Learning

1. **Sequential Study**: Complete one category before moving to next
2. **Difficulty Progression**: Master Easy before attempting Hard
3. **Pattern Recognition**: Compare similar problems within category
4. **Multiple Languages**: Study different implementation approaches

### For Interview Prep

1. **Focus on Medium**: Most interview questions are Medium difficulty
2. **Cover Core Categories**: Arrays, Trees, Graphs, DP
3. **Practice Variations**: Multiple problems in same category
4. **Time Yourself**: Simulate interview conditions

### For Reference

1. **Quick Access**: Use dropdowns for fast lookup
2. **Bookmark Favorites**: Browser bookmarks for frequent references
3. **Download for Offline**: Save solutions for offline study

---

[← Previous: Getting Started](02-getting-started.md) | [🏠 Home](README.md) | [Next: Downloading Solutions →](04-downloading-solutions.md)
