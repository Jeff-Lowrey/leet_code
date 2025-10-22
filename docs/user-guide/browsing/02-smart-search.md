# Smart Search

[← Previous: Navigation Tools](01-navigation-tools.md) | [🏠 Browsing Home](README.md) | [Next: Category Browsing →](03-category-browsing.md)

---

## Table of Contents

- [Accessing Smart Search](#accessing-smart-search)
- [Search Modes](#search-modes)
- [Search Results Page](#search-results-page)
- [Search Tips](#search-tips)
- [Search Best Practices](#search-best-practices)
- [Search Shortcuts](#search-shortcuts)

## Accessing Smart Search

The Smart Search feature provides powerful, flexible search capabilities with intelligent query parsing and multiple search modes.

**Location:**
- Search icon (🔍) in the top navigation bar
- Click to expand the search input
- Type your query and press Enter or click the search button

## Search Modes

Smart Search automatically detects your intent based on the query format:

### 1. Navigate Mode (Direct Problem Number)

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

### 2. Name Search Mode (Text Search)

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

### 3. Similar Mode (Number + Filters)

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

### 4. Filter Mode (Pure Filters)

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

## Search Results Page

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

## Search Tips

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

## Search Best Practices

1. **Start Simple**: Begin with problem numbers or names
2. **Add Filters**: Refine results with difficulty/category filters
3. **Explore Similar**: Use similarity search to find practice problems
4. **Combine Filters**: Mix difficulty and category for focused study

## Search Shortcuts

- **Press '/' key**: Focus search input (keyboard shortcut)
- **Escape key**: Close search results
- **Enter key**: Execute search
- **Click badges**: Navigate from results to full views

---

[← Previous: Navigation Tools](01-navigation-tools.md) | [🏠 Browsing Home](README.md) | [Next: Category Browsing →](03-category-browsing.md)
