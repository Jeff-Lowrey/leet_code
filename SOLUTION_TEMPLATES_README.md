# Solution Templates and Formatting Guide

This repository uses standardized templates for LeetCode solutions in both Python and JavaScript.

## 📁 Template Files

### Python
- **Template:** `SOLUTION_TEMPLATE.py`
- **Guide:** `SOLUTION_FORMATTING_GUIDE.md`
- **Example:** `solutions/arrays-hashing/001-two-sum.py`

### JavaScript
- **Template:** `SOLUTION_TEMPLATE.js`
- **Guide:** `SOLUTION_FORMATTING_GUIDE_JS.md`
- **Example:** `solutions/arrays-hashing/001-two-sum.js`

## 🎯 Key Features

### Consistent Structure
All solutions follow the same format:
1. Problem statement with difficulty level
2. Problem description with examples
3. Detailed solution explanation (collapsible)
4. Implementation with comments
5. Test cases

### Enhanced Example Display
Examples use definition lists for better visual presentation:

```html
<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [2,7,11,15], target = 9</dd>
<dt>Output:</dt>
<dd>[0,1]</dd>
<dt>Explanation:</dt>
<dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
</dl>
```

**Visual styling:**
- Light background (#f9f9f6)
- 4px left border in category color
- Labels (Input:, Output:, Explanation:) in category color
- Regular font (not monospace) for readability

### Required Explanation Sections

1. **INTUITION** - The key insight (1-3 sentences)
2. **APPROACH** - Step-by-step explanation (flowing prose)
3. **WHY THIS WORKS** - Correctness explanation (optional)
4. **EXAMPLE WALKTHROUGH** - Traced execution with steps
5. **TIME COMPLEXITY** - Big O with explanation
6. **SPACE COMPLEXITY** - Big O with explanation
7. **EDGE CASES** - How edge cases are handled

## 🚀 Quick Start

### Creating a New Python Solution

1. Copy the template:
   ```bash
   cp SOLUTION_TEMPLATE.py solutions/category/NNN-problem-name.py
   ```

2. Fill in the template:
   - Replace placeholders with problem details
   - Write intuition and approach
   - Implement solution
   - Add test cases

3. Format examples using `<dl>` structure

### Creating a New JavaScript Solution

1. Copy the template:
   ```bash
   cp SOLUTION_TEMPLATE.js solutions/category/NNN-problem-name.js
   ```

2. Fill in the JSDoc comments
3. Implement the solution
4. Add test cases

## 📊 Web Interface Styling

When viewed through the web interface:

### Category Colors
Each category has a unique color scheme:
- arrays-hashing: Rust (#d47d5e)
- dynamic-programming: Teal (#66a8a8)
- graphs: Burgundy (#c96680)
- backtracking: Steel Blue (#6890c9)
- binary-search: Sage (#7fa87f)
- ... (25 total categories)

### Element Styling
- **Problem Statement heading** → Category color
- **Example: label** → Category color (1.1rem, bold)
- **Example box** → Light background with category-colored left border
- **Input/Output/Explanation labels** → Category color, bold
- **Example values** → Regular text (no monospace)
- **Code blocks** → Monospace with enhanced borders and shadows

## ✅ Best Practices

### Documentation
- ✅ Keep INTUITION brief (the "aha moment")
- ✅ Write APPROACH as flowing prose, not lists
- ✅ Include multiple test cases with edge cases
- ✅ Add clear inline comments

### Code Quality
- ✅ Use type hints (Python) or JSDoc (JavaScript)
- ✅ Follow language conventions
- ✅ Include alternative solutions when relevant
- ✅ Test all edge cases

### Formatting
- ✅ Use `<dl>` for examples (not code blocks)
- ✅ Use inline `code` for variable names
- ✅ Keep values in regular font (readable)
- ❌ Don't skip required sections
- ❌ Don't use monospace for example values
- ❌ Don't use old code block format for examples

## 🔄 Migrating Existing Solutions

To convert old format to new format:

**Old:**
```
**Example:**

\```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: ...
\```
```

**New:**
```html
**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [2,7,11,15], target = 9</dd>
<dt>Output:</dt>
<dd>[0,1]</dd>
<dt>Explanation:</dt>
<dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
</dl>
```

## 📚 Additional Resources

- **Python Guide:** See `SOLUTION_FORMATTING_GUIDE.md` for detailed Python conventions
- **JavaScript Guide:** See `SOLUTION_FORMATTING_GUIDE_JS.md` for detailed JavaScript conventions
- **CSS Styles:** See `static/css/style.css` for web interface styling
- **Reference Implementation:** `solutions/arrays-hashing/001-two-sum.py` and `.js`

## 🤝 Contributing

When adding new solutions:
1. Use the appropriate template
2. Follow the formatting guide
3. Include all required sections
4. Test your solution
5. Use the new example format

## 📝 Notes

- The web interface automatically applies category-specific colors
- Examples are rendered with enhanced styling for better readability
- Both Python and JavaScript solutions share the same documentation structure
- All templates maintain consistency across the codebase
