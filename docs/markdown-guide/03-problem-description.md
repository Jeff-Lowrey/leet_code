# Problem Description Section

## Overview

The problem description contains the actual LeetCode problem statement including the task explanation, examples, and constraints.

## Format

```markdown
Given an array of integers `nums` and an integer `target`, return indices
of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**.

**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Constraints:**
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
```

## Components

### 1. Problem Statement

**Purpose**: Clearly explain what the problem asks you to solve.

**Format**: Standard markdown paragraphs

**Best Practices**:
- Use inline code for variables: \`nums\`, \`target\`
- Use **bold** for emphasis: `**exactly one solution**`
- Keep paragraphs concise and clear
- Match LeetCode's wording exactly

**Example**:
```markdown
Given an array of integers `nums` and an integer `target`, return **indices**
of the two numbers such that they add up to `target`.
```

---

### 2. Examples

**Purpose**: Demonstrate expected input/output behavior.

**Format**:
```markdown
**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```
```

**Best Practices**:
- Number examples: `**Example 1:**`, `**Example 2:**`
- Use code blocks for input/output
- Include explanation for non-obvious cases
- Show edge cases in later examples

**Multiple Examples**:
```markdown
**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
```

**Example 2:**
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**
```
Input: nums = [3,3], target = 6
Output: [0,1]
```
```

---

### 3. Constraints

**Purpose**: Define input boundaries and limitations.

**Format**:
```markdown
**Constraints:**
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Only one valid answer exists
```

**Best Practices**:
- Use bullet points for each constraint
- Wrap technical specs in backticks
- Include all LeetCode constraints
- Use proper mathematical notation

**Common Constraint Types**:
```markdown
**Constraints:**
- Array length: `1 <= nums.length <= 10^5`
- Value ranges: `-10^9 <= nums[i] <= 10^9`
- Uniqueness: `All integers in nums are unique`
- Guarantees: `Only one valid answer exists`
- Follow-up: `Could you come up with O(n) solution?`
```

---

## Markdown Features

### Inline Code
Use backticks for:
- Variable names: \`nums\`, \`target\`
- Function names: \`twoSum()\`
- Data types: \`int[]\`, \`List[int]\`
- Technical terms: \`O(n)\`, \`HashMap\`

### Bold Text
Use `**text**` for:
- Key requirements: `**exactly one solution**`
- Important conditions: `**must be in sorted order**`
- Emphasis: `**without using extra space**`

### Lists
Use `-` or `*` for:
- Constraints
- Multiple conditions
- Step-by-step explanations

### Code Blocks
Use triple backticks for:
- Examples
- Input/output formats
- Expected return values

---

## Processing

### Extraction
```python
# From content/content_processing.py
problem_html = parse_problem_markdown(markdown_content)
```

### Transformations
1. **Remove Solution Explanation**: Content before `<details>` tag extracted
2. **Strip Metadata**: Difficulty line removed
3. **Clean Title**: Problem number removed from heading
4. **Convert to HTML**: Markdown converted using `markdown.markdown()`

### Result
HTML-formatted problem description ready for display:
```html
<p>Given an array of integers <code>nums</code>...</p>
<p><strong>Example 1:</strong></p>
<pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]</code></pre>
```

---

## Best Practices

### 1. Copy from LeetCode
Start with LeetCode's exact problem description to ensure accuracy.

### 2. Format Consistently
```markdown
# Title
Difficulty: Level

Problem statement paragraph.

**Example 1:**
```
Input: ...
Output: ...
```

**Constraints:**
- Constraint 1
- Constraint 2
```

### 3. Use Proper Markdown
- Inline code for all technical terms
- Bold for emphasis
- Code blocks for examples
- Bullet lists for constraints

### 4. Include All Information
- ✅ Main problem statement
- ✅ At least one example
- ✅ All constraints
- ✅ Return type/format
- ✅ Special conditions

---

## Common Mistakes

### 1. Missing Backticks
❌ **Wrong**: `Given an array nums and integer target`
✅ **Correct**: `Given an array `nums` and integer `target``

### 2. Inconsistent Example Format
❌ **Wrong**:
```markdown
Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
```

✅ **Correct**:
```markdown
**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
```
```

### 3. Missing Constraints
❌ **Wrong**: Problem description without constraints section
✅ **Correct**: Always include `**Constraints:**` section

---

## Related Sections

- **Metadata** → [02-metadata.md](02-metadata.md)
- **Solution Explanation** → [04-solution-explanation.md](04-solution-explanation.md)
- **Complete Examples** → [09-examples.md](09-examples.md)
