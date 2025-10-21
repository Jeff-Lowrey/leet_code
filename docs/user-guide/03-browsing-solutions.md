# Browsing Solutions

[← Previous: Getting Started](02-getting-started.md) | [🏠 Home](README.md) | [Next: Downloading Solutions →](04-downloading-solutions.md)

---

## Table of Contents

- [Navigating the Platform](#navigating-the-platform)
- [Navigation Tools](#navigation-tools)
- [Smart Search](#smart-search)
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

## Smart Search

The Smart Search feature provides powerful, flexible search capabilities with intelligent query parsing and multiple search modes.

### Accessing Smart Search

**Location:**
- Search icon (🔍) in the top navigation bar
- Click to expand the search input
- Type your query and press Enter or click the search button

### Search Modes

Smart Search automatically detects your intent based on the query format:

#### 1. Navigate Mode (Direct Problem Number)

Jump directly to a specific problem by number.

**Examples:**
```
1          → Goes to Two Sum (#1)
443        → Goes to String Compression (#443)
217        → Goes to Contains Duplicate (#217)
```

**When to Use:**
- You know the exact LeetCode problem number
- Quick navigation to a specific problem
- Fastest way to find a known problem

#### 2. Name Search Mode (Text Search)

Search for problems by name or keywords.

**Examples:**
```
palindrome           → Finds all palindrome problems
two sum             → Finds Two Sum and related problems
binary search       → Finds binary search problems
array               → Finds all array-related problems
```

**Features:**
- Case-insensitive matching
- Searches problem titles and slugs
- Returns all matching problems
- Shows origin category for each result

**When to Use:**
- Remember part of the problem name
- Want to find related problems
- Exploring a specific topic

#### 3. Similar Mode (Number + Filters)

Find problems similar to a reference problem, with optional filters.

**Examples:**
```
1 difficulty=easy        → Problems similar to Two Sum that are Easy
443 difficulty=medium    → Medium problems similar to String Compression
1 category=arrays        → Array problems similar to Two Sum
```

**Available Filters:**
- `difficulty=easy|medium|hard` - Filter by difficulty level
- `category=<name>` - Filter by category
- `complexity=<pattern>` - Filter by time/space complexity

**When to Use:**
- Want more practice on similar patterns
- Looking for related but different difficulty
- Finding problems in the same category

#### 4. Filter Mode (Pure Filters)

Browse problems using only filter criteria.

**Examples:**
```
difficulty=medium           → All Medium difficulty problems
difficulty=hard            → All Hard problems
category=graphs            → All graph problems
difficulty=easy category=arrays  → Easy array problems
```

**Multiple Filters:**
- Combine filters with spaces
- All filters must match (AND operation)
- Results show matching problems with badges

**When to Use:**
- Studying a specific difficulty level
- Focusing on a particular category
- Interview prep for specific patterns

### Search Results Page

**Result Display:**
- Problem number and title
- Difficulty badge (🟢 Easy, 🟡 Medium, 🔴 Hard)
- Category label (origin category)
- Time and space complexity (when available)
- Clickable cards to view solution

**Result Organization:**
- Grouped by relevance (for similarity search)
- Sorted by problem number
- Shows filters applied at top
- Empty state with helpful message if no results

### Search Tips

**For Quick Navigation:**
```
1               # Direct jump to problem #1
443             # Jump to problem #443
```

**For Exploration:**
```
palindrome      # Find all palindrome problems
sliding         # Find sliding window problems
```

**For Focused Practice:**
```
difficulty=medium              # Practice medium problems
category=dynamic-programming   # Study DP problems
```

**For Related Problems:**
```
1 difficulty=medium       # Find medium problems similar to Two Sum
443 category=strings      # Similar string problems
```

### Search Best Practices

1. **Start Simple**: Begin with problem numbers or names
2. **Add Filters**: Refine results with difficulty/category filters
3. **Explore Similar**: Use similarity search to find practice problems
4. **Combine Filters**: Mix difficulty and category for focused study

### Search Shortcuts

- **Press '/' key**: Focus search input (keyboard shortcut)
- **Escape key**: Close search results
- **Enter key**: Execute search
- **Click badges**: Navigate from results to full views

## Home Page Categories

### Category Cards

The home page displays all 29+ algorithmic categories as visual cards with helpful metadata:

- **Category Name**: Clear identification of the algorithmic pattern
- **Solution Count**: Number of problems solved in that category
- **Difficulty Badges**: Color-coded breakdown (🟢 Easy, 🟡 Medium, 🔴 Hard) showing distribution
- **Complexity Badges**: Top 3 complexity patterns in the category (e.g., "O(n): 15 | O(n²): 8")
- **Color Coding**: Each category has a unique color for easy recognition
- **Quick Access Dropdown**: Direct navigation to specific problems

**Badge Features:**
- **Difficulty Breakdown**: See at a glance how many Easy, Medium, and Hard problems are in each category
- **Complexity Patterns**: Understand the common time/space complexity patterns in the category
- **Dynamic Loading**: Badges load automatically when you visit the home page
- **Smart Filtering**: Badges exclude "Unknown" complexity and show "Other" for less common patterns

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

1. **Use Smart Search**: Fastest way to find problems by number, name, or filters
2. **Use TOC Sidebar**: Quick navigation on any page
3. **Use View By Dropdown**: Switch between browsing modes
4. **Use Quick Access**: Category card dropdowns for specific problems
5. **Clickable Badges**: Jump from solution to difficulty/complexity overview
6. **Category Badges**: Check difficulty/complexity distribution before diving in
7. **Browse by Pattern**: Learn categories systematically
8. **Difficulty Progression**: Start with Easy, advance to Hard
9. **Multi-Language Exploration**: Compare implementations

### Search Strategies

**By Problem Number:**
- Use Smart Search: Type the number (e.g., "1", "443")
- Instant navigation to the problem
- Fastest method when you know the number

**By Problem Name:**
- Use Smart Search: Type keywords (e.g., "palindrome", "two sum")
- Finds all matching problems across categories
- Great for exploring related problems

**By Filters:**
- Use Smart Search with filters (e.g., "difficulty=medium")
- Combine multiple filters (e.g., "difficulty=easy category=arrays")
- Perfect for focused study sessions

**By Similar Problems:**
- Use Smart Search: Number + filters (e.g., "1 difficulty=medium")
- Find problems with similar patterns but different difficulty
- Excellent for progressive practice

**By Category:**
- Check category card badges for difficulty/complexity distribution
- Know the algorithmic pattern → Go to category
- Want to master a topic → Browse entire category
- Use TOC to see all problems in category

**By Difficulty:**
- Use View By dropdown or Smart Search filters
- Learning fundamentals → Start with Easy
- Interview prep → Focus on Medium section
- Advanced practice → Challenge with Hard section
- Compare across categories at same difficulty level

**By Complexity:**
- Use View By dropdown or complexity filters in search
- Learning efficiency → Study O(n) and O(log n) solutions
- Optimization practice → Find O(1) space solutions
- Algorithm comparison → See different approaches to same complexity

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
- **Language Icons**: Show available other languages
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
