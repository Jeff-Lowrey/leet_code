# Code Viewing

[← Previous: Downloading Solutions](04-downloading-solutions.md) | [🏠 Home](README.md) | [Next: Understanding Solutions →](06-understanding-solutions.md)

---

## Table of Contents

- [Code Display Features](#code-display-features)
- [Syntax Highlighting](#syntax-highlighting)
- [Viewing Modes](#viewing-modes)
- [Code Organization](#code-organization)
- [Code Navigation](#code-navigation)
- [Interactive Features](#interactive-features)
- [Language-Specific Features](#language-specific-features)
- [Accessibility Features](#accessibility-features)
- [Code Display Tips](#code-display-tips)
- [Troubleshooting Code Display](#troubleshooting-code-display)

## Code Display Features

The platform provides professional code viewing with syntax highlighting and multiple viewing modes.

## Syntax Highlighting

### Language Support

Syntax highlighting is automatically applied based on file extension:

- **Python**: `.py` files
- **Java**: `.java` files
- **C++**: `.cpp`, `.cc`, `.cxx` files
- **JavaScript**: `.js` files
- **TypeScript**: `.ts` files
- **Go**: `.go` files
- **Rust**: `.rs` files
- **C#**: `.cs` files
- **Swift**: `.swift` files
- **Kotlin**: `.kt` files
- **Ruby**: `.rb` files
- **PHP**: `.php` files
- **Scala**: `.scala` files

### Syntax Elements

Code highlighting includes:

- **Keywords**: `class`, `def`, `if`, `for`, `return` (blue/purple)
- **Strings**: Text in quotes (green/red)
- **Comments**: Explanatory text (gray/green)
- **Numbers**: Numeric literals (orange)
- **Functions**: Function and method names (yellow)
- **Operators**: `+`, `-`, `==`, `!=` (white/gray)
- **Built-ins**: `print`, `len`, `map` (purple/blue)

### Example Display

**Python Code:**
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """Hash map approach"""
        seen = {}  # Track seen numbers
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
```

Elements are color-coded for readability:
- `class`, `def`, `for`, `if`, `return` - Keywords
- `"Hash map approach"` - Docstring
- `{}`, `[]` - Data structures
- `# Track seen numbers` - Comments

## Viewing Modes

### Original Format

Default view showing Python code as written:

```python
class Solution:
    def two_sum(self, nums: List[int], target: int) -> List[int]:
        """
        Approach: Hash Map for O(n) lookup
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
```

**Features:**
- ✅ Complete documentation
- ✅ Detailed comments
- ✅ Full method docstrings
- ✅ Educational format

### LeetCode Format

Converted format ready for LeetCode submission:

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
```

**Features:**
- ✅ CamelCase method names
- ✅ Minimal documentation
- ✅ Submission-ready
- ✅ Copy-paste compatible

### Toggling Between Formats

To switch viewing modes:

1. **Locate Format Toggle**: Button near code display
2. **Click Toggle**: Switch between Original/LeetCode
3. **View Changes**: Code updates to selected format
4. **Download**: Download button respects current format

## Code Organization

### Solution Structure

Each solution file follows a consistent structure:

**1. Module Docstring:**
```python
"""
1. Two Sum
Difficulty: Easy

Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.
...
"""
```

**2. Problem Description:**
- Complete problem statement
- Example cases with input/output
- Constraints and notes

**3. Solution Explanation:**
- Intuition section
- Approach description
- Complexity analysis
- Edge cases discussion

**4. Code Implementation:**
```python
class Solution:
    def method_name(self, params) -> return_type:
        # Implementation here
        pass
```

**5. Test Cases:**
```python
if __name__ == "__main__":
    solution = Solution()
    # Test case 1
    # Test case 2
```

## Code Navigation

### Line Numbers

- **Always Visible**: Each line numbered for reference
- **Discussion Reference**: Cite specific lines in notes
- **Error Location**: Easily find problematic lines
- **Comparison**: Match line numbers across versions

### Scrolling

- **Horizontal Scroll**: For long lines
- **Vertical Scroll**: For lengthy solutions
- **Sticky Headers**: Class/function names remain visible
- **Smooth Scrolling**: Easy navigation through code

### Code Blocks

Solutions may include multiple code blocks:

1. **Main Solution**: Primary implementation
2. **Alternative Approaches**: Different algorithms
3. **Helper Functions**: Supporting code
4. **Test Cases**: Example usage

## Reading Features

### Formatted Documentation

Problem descriptions use markdown formatting:

**Bold Text**: `**important**` → **important**

**Italic Text**: `*emphasis*` → *emphasis*

**Code Inline**: `` `variable` `` → `variable`

**Code Blocks**:
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
```

**Lists**:
- Bullet point one
- Bullet point two
- Bullet point three

### Collapsible Sections

Long explanations are in expandable sections:

**🔍 SOLUTION EXPLANATION** (Click to expand/collapse)

Contents include:
- Intuition
- Approach
- Time/Space Complexity
- Edge Cases
- Example Walkthrough

### Example Formatting

Examples use structured display:

**Input:** `nums = [2,7,11,15], target = 9`

**Output:** `[0,1]`

**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1]

### Complexity Analysis

Formatted for quick reference:

**Time Complexity:** **O(n)** - Single pass through array

**Space Complexity:** **O(n)** - Hash map stores up to n elements

## Multi-Language Viewing

### Language Selection

When other languages are available:

1. **View Language Badges**: Available languages displayed
2. **Click Language**: Switch to that implementation
3. **Code Updates**: Display changes to selected language
4. **Syntax Highlighting**: Automatically adjusted

### Comparing Languages

To compare implementations:

1. **Open Solution**: View in default language (Python)
2. **Study Approach**: Understand algorithm
3. **Switch Language**: Click Java badge
4. **Compare Syntax**: See language differences
5. **Switch Again**: Try C++, JavaScript, etc.

### Language-Specific Features

Each language shows its idioms:

**Python:**
```python
seen = {}
for i, num in enumerate(nums):
    if complement in seen:
        return [seen[complement], i]
```

**Java:**
```java
Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
    if (seen.containsKey(complement)) {
        return new int[]{seen.get(complement), i};
    }
}
```

**JavaScript:**
```javascript
const seen = new Map();
for (let i = 0; i < nums.length; i++) {
    if (seen.has(complement)) {
        return [seen.get(complement), i];
    }
}
```

## Copy Features

### Selecting Code

To copy code for study or submission:

1. **Select Text**: Click and drag to select
2. **Copy**: Use Ctrl/Cmd+C or right-click → Copy
3. **Paste**: Use in your editor or LeetCode

### Copy Best Practices

- **Full Method**: Copy entire solution method
- **Include Imports**: Copy necessary imports
- **Test Cases**: Copy test code for verification
- **Comments**: Include comments for understanding

### Browser Features

Most browsers support:
- **Triple-Click**: Select entire line
- **Drag Selection**: Select multiple lines
- **Copy-Paste**: Standard clipboard operations
- **Search**: Ctrl/Cmd+F to find text in code

## Visual Customization

### Browser Zoom

Adjust text size:
- **Zoom In**: Ctrl/Cmd + `+`
- **Zoom Out**: Ctrl/Cmd + `-`
- **Reset**: Ctrl/Cmd + `0`

### Dark/Light Mode

Browser extensions can apply dark mode:
- Install dark mode extension
- Toggle for comfortable viewing
- Preserves syntax highlighting

## Reading Tips

### For Understanding

1. **Read Top-Down**: Start with problem description
2. **Study Examples**: Understand input/output
3. **Read Explanation**: Grasp approach first
4. **Then Code**: View implementation
5. **Study Comments**: Understand each section
6. **Run Mentally**: Trace execution in your head

### For Practice

1. **Read Problem**: Understand requirements
2. **Hide Solution**: Scroll past code
3. **Try Solving**: Write your approach
4. **Compare**: View solution after attempt
5. **Study Differences**: Learn from comparison

### For Interview Prep

1. **Time Yourself**: Practice under pressure
2. **Read Problem Only**: Don't peek at solution
3. **Implement**: Code your solution
4. **Test**: Verify with examples
5. **Review**: Compare with provided solution

---

[← Previous: Downloading Solutions](04-downloading-solutions.md) | [🏠 Home](README.md) | [Next: Understanding Solutions →](06-understanding-solutions.md)
