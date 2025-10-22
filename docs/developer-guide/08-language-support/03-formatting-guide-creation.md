# Formatting Guide Creation

[← Previous: Adding Language Support](02-adding-languages.md) | [🏠 Home](../README.md) | [Next: Architecture →](../09-architecture.md)

---

## Table of Contents

- [Overview](#overview)
- [Guide Structure](#guide-structure)
- [Required Sections](#required-sections)
- [Writing Process](#writing-process)
- [Language-Specific Content](#language-specific-content)
- [Examples and Code Samples](#examples-and-code-samples)
- [Style and Tone](#style-and-tone)
- [Testing and Validation](#testing-and-validation)

## Overview

Formatting guides provide language-specific documentation for contributors creating solutions. Each guide explains the template structure, language conventions, and best practices.

**Purpose:**
- Explain language-specific formatting requirements
- Document comment style and documentation format
- Provide code examples and patterns
- Guide contributors through solution creation
- Ensure consistency across all solutions

**Location:** `docs/upload-guide/05-formatting-guidelines/`

**Naming:** `SOLUTION_FORMATTING_GUIDE_<LANG>.md`
- Python: `SOLUTION_FORMATTING_GUIDE_PY.md`
- JavaScript: `SOLUTION_FORMATTING_GUIDE_JS.md`
- TypeScript: `SOLUTION_FORMATTING_GUIDE_TS.md`
- Java: `SOLUTION_FORMATTING_GUIDE_JAVA.md`
- C++: `SOLUTION_FORMATTING_GUIDE_CPP.md`
- Go: `SOLUTION_FORMATTING_GUIDE_GO.md`
- Rust: `SOLUTION_FORMATTING_GUIDE_RS.md`

## Guide Structure

### Standard Sections (All Guides)

1. **Title and Overview**
   - Language name
   - Purpose of the guide
   - Who should read it

2. **Template Overview**
   - Template file location
   - Basic structure explanation
   - Key features

3. **Documentation Format**
   - Comment style requirements
   - Doc strings/comments format
   - Metadata section format

4. **Problem Description**
   - How to format problem statement
   - Example case formatting
   - HTML requirements

5. **Solution Explanation**
   - Details block structure
   - Required subsections
   - Formatting rules

6. **Code Implementation**
   - Language-specific syntax
   - Naming conventions
   - Type annotations/hints
   - Import/include requirements

7. **Test Cases**
   - Test structure
   - Assertion format
   - Expected output format

8. **Complete Example**
   - Full Two Sum solution
   - Demonstrates all features
   - Properly formatted

9. **Common Patterns**
   - Language idioms
   - Data structure usage
   - Algorithm implementations

10. **Style Guidelines**
    - Code formatting
    - Indentation and spacing
    - Comments and documentation

11. **Validation Checklist**
    - Pre-submission checks
    - Required elements
    - Quality checks

### Optional Sections

- **Language-Specific Features:** Unique language capabilities
- **Performance Considerations:** Optimization tips
- **Common Mistakes:** Pitfalls to avoid
- **Advanced Topics:** Complex patterns
- **FAQs:** Frequently asked questions

## Required Sections

### 1. Title and Overview

```markdown
# [Language] Solution Formatting Guide

## Overview

This guide provides comprehensive formatting requirements and best practices for
creating [Language] solutions in the LeetCode Learning Tool.

**Who Should Read This:**
- Contributors writing [Language] solutions
- Developers reviewing [Language] code
- Anyone unfamiliar with [Language] formatting standards

**What You'll Learn:**
- [Language] template structure
- Documentation requirements
- Code formatting standards
- Testing conventions
- Common patterns and idioms
```

### 2. Template Overview

```markdown
## Template Overview

**Location:** `docs/developer-guide/templates/SOLUTION_TEMPLATE.[ext]`

**Purpose:** Provides standardized structure for all [Language] solutions

**Key Features:**
- Problem description with HTML formatting
- Comprehensive solution explanation
- Metadata and complexity analysis
- Documented code implementation
- Test cases with expected output

**Usage:**
```bash
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.[ext] \
   solutions/<category>/[language]/NNNN-problem-name.[ext].[ext]
```
```

### 3. Documentation Format

**Show language-specific comment style:**

```markdown
## Documentation Format

### Comment Style

[Language] uses [comment type] for documentation:

```[language]
[Example of proper comment format]
```

### Required Elements

All solutions must include:
1. **Problem Header:** Number, title, difficulty
2. **Description:** Full problem statement
3. **Examples:** HTML-formatted with `<dl>` tags
4. **Explanation:** In collapsible `<details>` block
5. **Metadata:** Techniques, data structures, complexity
```

### 4. Problem Description Section

```markdown
## Problem Description Format

### Basic Structure

```[language]
[Show complete problem header format]
```

### Example Formatting

Use HTML definition lists for all examples:

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

**Why HTML?**
- Consistent rendering across platforms
- Custom CSS styling support
- Better semantic structure
- Proper indentation
```

### 5. Solution Explanation Section

```markdown
## Solution Explanation

### Details Block

All solutions must include comprehensive explanation in `<details>` block:

```[language]
[Show <details> block structure]
```

### Required Subsections

1. **METADATA:** Techniques, data structures, complexity
2. **INTUITION:** High-level approach
3. **APPROACH:** Step-by-step explanation
4. **WHY THIS WORKS:** Rationale
5. **EXAMPLE WALKTHROUGH:** Traced execution
6. **TIME COMPLEXITY:** Big O with explanation
7. **SPACE COMPLEXITY:** Big O with explanation
8. **EDGE CASES:** Special cases to handle
```

### 6. Code Implementation Section

```markdown
## Code Implementation

### [Language] Syntax

[Explain language-specific syntax requirements]

### Naming Conventions

- **Classes:** [Convention]
- **Functions/Methods:** [Convention]
- **Variables:** [Convention]
- **Constants:** [Convention]

### Type Annotations

[Show type annotation requirements if applicable]

### Imports/Includes

[List standard imports/includes]

### Code Structure

```[language]
[Show complete implementation structure]
```
```

### 7. Test Cases Section

```markdown
## Test Cases

### Structure

All solutions must include at least 3 test cases:

```[language]
[Show test case structure]
```

### Test Requirements

- **Input Variety:** Different input types and sizes
- **Edge Cases:** Empty, null, boundary values
- **Expected Output:** Clearly documented
- **Assertions:** Verify correctness

### Running Tests

```bash
[Show command to run tests]
```
```

### 8. Complete Example

```markdown
## Complete Example: Two Sum

This example demonstrates all required formatting elements:

```[language]
[Full Two Sum solution with all required sections]
```

### Key Features Demonstrated

- ✅ Problem description with HTML examples
- ✅ Comprehensive solution explanation
- ✅ Metadata and complexity analysis
- ✅ Well-documented code
- ✅ Multiple test cases
- ✅ [Language]-specific idioms
```

### 9. Common Patterns

```markdown
## Common Patterns in [Language]

### Hash Table Lookups

```[language]
[Show hash table pattern]
```

### Two Pointers

```[language]
[Show two pointers pattern]
```

### Tree Traversal

```[language]
[Show tree traversal pattern]
```

[Include 5-10 common algorithm patterns]
```

### 10. Validation Checklist

```markdown
## Validation Checklist

Before submitting, verify:

### Documentation
- [ ] Problem number, title, and difficulty present
- [ ] Complete problem description included
- [ ] Examples use HTML `<dl>` format
- [ ] Solution explanation in `<details>` block
- [ ] All metadata sections complete
- [ ] Complexity analysis included

### Code
- [ ] Follows [Language] naming conventions
- [ ] Proper type annotations [if applicable]
- [ ] Adequate comments and documentation
- [ ] Code is clean and idiomatic
- [ ] No syntax errors

### Tests
- [ ] At least 3 test cases included
- [ ] Tests cover edge cases
- [ ] Expected outputs documented
- [ ] Tests pass successfully

### File
- [ ] Filename follows pattern: `NNNN-problem-name.[ext].[ext]`
- [ ] File placed in correct category directory
- [ ] File executes without errors
```

## Writing Process

### Step 1: Research

1. **Study Language Conventions:**
   - Official style guides
   - Documentation standards
   - Community best practices
   - Popular frameworks/libraries

2. **Review Existing Guides:**
   - Read Python and JavaScript guides
   - Note common patterns
   - Identify language differences
   - Maintain consistency

3. **Gather Examples:**
   - Collect code samples
   - Find common patterns
   - Identify edge cases
   - Document best practices

### Step 2: Draft Structure

1. **Copy Template:**
   ```bash
   cp SOLUTION_FORMATTING_GUIDE_PY.md SOLUTION_FORMATTING_GUIDE_NEW.md
   ```

2. **Customize Sections:**
   - Update language name throughout
   - Change code examples
   - Modify comment style
   - Adjust conventions

3. **Add Language-Specific Content:**
   - Unique features
   - Special syntax
   - Common gotchas
   - Language idioms

### Step 3: Create Examples

1. **Write Two Sum Solution:**
   - Use new template
   - Follow all guidelines
   - Demonstrate all features
   - Test thoroughly

2. **Add Pattern Examples:**
   - Common algorithms
   - Data structure usage
   - Language-specific idioms
   - Best practices

3. **Include Edge Cases:**
   - Error handling
   - Boundary conditions
   - Special inputs
   - Common mistakes

### Step 4: Review and Refine

1. **Self-Review:**
   - Read through completely
   - Check for inconsistencies
   - Verify code examples
   - Test all commands

2. **Peer Review:**
   - Get feedback from language experts
   - Incorporate suggestions
   - Fix identified issues
   - Improve clarity

3. **Test with Contributors:**
   - Have someone follow the guide
   - Note confusion points
   - Clarify ambiguous sections
   - Add missing information

## Language-Specific Content

### Emphasize Unique Features

**Python:**
- List comprehensions
- Generator expressions
- Context managers
- Decorators

**JavaScript:**
- Array methods (map, filter, reduce)
- Destructuring
- Arrow functions
- Promises/async-await

**TypeScript:**
- Type annotations
- Interfaces
- Generics
- Type guards

**Java:**
- Collections framework
- Streams API
- Generics
- Exception handling

**C++:**
- STL containers and algorithms
- Move semantics
- Smart pointers
- Template metaprogramming

**Go:**
- Goroutines and channels
- Error handling
- Interfaces
- defer statements

**Rust:**
- Ownership and borrowing
- Pattern matching
- Result and Option types
- Traits

### Document Common Pitfalls

**For Each Language, Include:**
- Syntax errors to avoid
- Performance gotchas
- Memory management issues
- Type-related problems
- Common misconceptions

## Examples and Code Samples

### Use Real, Runnable Code

```[language]
// ✓ Good - Complete, runnable example
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

// ✗ Bad - Incomplete pseudocode
function twoSum:
    create hash map
    loop through array
    check for complement
    return result
```

### Show Both Simple and Complex Cases

**Simple:**
```[language]
# Basic hash table usage
seen = {}
seen[key] = value
```

**Complex:**
```[language]
# Hash table with collision handling
from collections import defaultdict
seen = defaultdict(list)
seen[key].append(value)
```

### Explain Why, Not Just How

```[language]
# Good - Explains rationale
# Use hash map for O(1) lookup instead of nested loops (O(n²))
seen = {}

# Bad - Just states what's happening
# Create dictionary
seen = {}
```

## Style and Tone

### Be Clear and Concise

**Clear:**
```markdown
Use HTML `<dl>` tags for all example cases to ensure consistent rendering.
```

**Unclear:**
```markdown
Examples should be formatted properly using the appropriate markup language.
```

### Be Helpful, Not Condescending

**Helpful:**
```markdown
New to [Language]? Check out [resource] for a quick introduction.
```

**Condescending:**
```markdown
If you don't know [Language] basics, you shouldn't be contributing yet.
```

### Use Active Voice

**Active:**
```markdown
Place test cases at the end of the file.
```

**Passive:**
```markdown
Test cases should be placed at the end of the file.
```

### Provide Context

**With Context:**
```markdown
Use type hints to help catch errors early and improve IDE support.
```

**Without Context:**
```markdown
Use type hints.
```

## Testing and Validation

### Test the Guide

1. **Have Someone Follow It:**
   - Choose someone unfamiliar with language
   - Have them create a solution using guide
   - Note where they get stuck
   - Clarify confusing sections

2. **Verify All Examples:**
   ```bash
   # Extract and test each code example
   [language-specific test command]
   ```

3. **Check Links:**
   - Verify all internal links work
   - Check external references
   - Ensure navigation is correct

### Validate Formatting

1. **Markdown Rendering:**
   - Preview in GitHub
   - Check in Flask application
   - Verify code blocks highlight correctly
   - Test collapsible sections

2. **Code Syntax:**
   - Run through language linter
   - Check for syntax errors
   - Verify idioms are correct
   - Test compilation/execution

### Get Feedback

1. **Language Experts:**
   - Review for accuracy
   - Check best practices
   - Verify conventions
   - Suggest improvements

2. **Documentation Team:**
   - Review for clarity
   - Check consistency
   - Verify completeness
   - Approve publication

---

[← Previous: Adding Language Support](02-adding-languages.md) | [🏠 Home](../README.md) | [Next: Architecture →](../09-architecture.md)
