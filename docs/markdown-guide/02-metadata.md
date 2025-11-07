# Metadata Section

## Table of Contents

- [Overview](#overview)
- [Required Format](#required-format)
- [Components](#components)
- [Validation Rules](#validation-rules)
- [Best Practices](#best-practices)
- [Related Sections](#related-sections)

## Overview

The metadata section provides structured information about the problem that the application uses for categorization, search, filtering, and display.

## Required Format

```markdown
# 1. Two Sum
Difficulty: Easy
```

## Components

### Problem Title (H1 Header)

#### Format
```markdown
# {number}. {Problem Name}
```

#### Examples
```markdown
# 1. Two Sum
# 15. 3Sum
# 146. LRU Cache
# 2013. Detect Squares
```

#### Rules
- Must be level 1 heading (single `#`)
- Must include problem number followed by period
- Number can be 1-4 digits
- Problem name should match LeetCode exactly
- First line in markdown content

#### Usage
- **Display**: Number is stripped, only name shown as page title
- **Navigation**: Number extracted for direct problem lookup
- **Search**: Both number and name indexed for search
- **URL**: Used to generate solution page URLs

---

### Difficulty Level

#### Format
```markdown
Difficulty: {Level}
```

#### Valid Values
- `Easy` - Beginner-friendly problems
- `Medium` - Intermediate complexity
- `Hard` - Advanced algorithms/data structures

#### Rules
- Must be on its own line immediately after title
- Case-insensitive (`easy`, `Easy`, `EASY` all work)
- Only three valid values accepted
- Required field - cannot be omitted

#### Usage
- **Badge Display**: Colored badges on solution pages (🟢 Easy, 🟡 Medium, 🔴 Hard)
- **Filtering**: Virtual difficulty categories (`/difficulty/easy`)
- **Statistics**: Difficulty distribution charts
- **Search**: Filter search results by difficulty

---

## Validation Rules

### Title Validation
✅ **Valid**:
```markdown
# 1. Two Sum
# 443. String Compression
```

❌ **Invalid**:
```markdown
Two Sum                    # Missing # and number
# 1 Two Sum                # Missing period
## 1. Two Sum              # Wrong heading level
```

### Difficulty Validation
✅ **Valid**:
```markdown
Difficulty: Easy
Difficulty: Medium
Difficulty: Hard
```

❌ **Invalid**:
```markdown
Difficulty: Moderate      # Not a valid level
Difficulty:Easy           # Missing space
Level: Easy               # Wrong key
```

---

## Best Practices

1. **Match LeetCode Exactly** - Use exact title and number from LeetCode
2. **Be Consistent** - Always use same format across all solutions
3. **Verify Difficulty** - Double-check difficulty matches LeetCode's classification

---

## Related Sections

- **Problem Description** → [03-problem-description.md](03-problem-description.md)
- **Complete Examples** → [09-examples.md](09-examples.md)
