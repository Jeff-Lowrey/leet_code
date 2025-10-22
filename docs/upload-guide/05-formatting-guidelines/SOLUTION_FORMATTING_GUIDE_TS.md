# LeetCode Solution Formatting Guide - TypeScript

[← Previous: JavaScript Formatting Guide](SOLUTION_FORMATTING_GUIDE_JS.md) | [🏠 Home](../README.md) | [Next: C++ Formatting Guide →](SOLUTION_FORMATTING_GUIDE_CPP.md)

---

This guide explains the standard format for TypeScript LeetCode solution files in this repository.

## Table of Contents

- [Template Location](#template-location)
- [Key Formatting Rules](#key-formatting-rules)
- [Visual Styling Notes](#visual-styling-notes)
- [Theme System](#theme-system)
- [TypeScript-Specific Conventions](#typescript-specific-conventions)
- [Best Practices](#best-practices)
- [Reference Implementation](#reference-implementation)
- [Additional Resources](#additional-resources)

## Template Location
[↑ Back to Table of Contents](#table-of-contents)

Use [`docs/developer-guide/templates/SOLUTION_TEMPLATE.ts`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.ts) as the starting point for new solutions.

## Key Formatting Rules
[↑ Back to Table of Contents](#table-of-contents)

### 1. JSDoc Comment Structure

```typescript
/**
 * # [Problem Number]. Problem Title
 *
 * # Difficulty: [Easy/Medium/Hard]
 *
 * [Problem description with markdown formatting]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input]</dd>
 * <dt>Output:</dt>
 * <dd>[output]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>...</details>
 */
```

### 2. Example Section Format

**Always use the definition list (`<dl>`) format:**

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

### 3. Solution Explanation Sections

Include these sections in the `<details>` block **in this exact order**:

1. **METADATA:** (Required)
2. **INTUITION:** (Required)
3. **APPROACH:** (Required)
4. **WHY THIS WORKS:** (Optional but Recommended)
5. **EXAMPLE WALKTHROUGH:** (Required)
6. **TIME COMPLEXITY:** (Required)
7. **SPACE COMPLEXITY:** (Required)
8. **EDGE CASES:** (Required)

### 4. Code Structure

```typescript
class Solution {
  methodName(param1: Type1, param2: Type2): ReturnType {
    // Implementation with type safety
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

export default Solution;
```

## TypeScript-Specific Conventions
[↑ Back to Table of Contents](#table-of-contents)

### Type Annotations

```typescript
// Primitive types
function example(num: number, str: string): boolean {}

// Array types
function arrayExample(nums: number[]): number[] {}

// Common data structure types
const map: Map<string, number> = new Map();
const set: Set<number> = new Set();
```

### Interfaces for Data Structures

```typescript
interface ListNode {
  val: number;
  next: ListNode | null;
}

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
```

## Best Practices
[↑ Back to Table of Contents](#table-of-contents)

1. ✅ Use proper TypeScript type annotations
2. ✅ Leverage type safety throughout
3. ✅ Include both CommonJS and ES6 exports
4. ✅ Add comprehensive test cases
5. ❌ Don't use `any` type - use specific types or `unknown`

## Reference Implementation
[↑ Back to Table of Contents](#table-of-contents)

See [`solutions/arrays-hashing/typescript/0001-two-sum.ts`](../../solutions/arrays-hashing/typescript/0001-two-sum.ts) for a complete example.

## Additional Resources
[↑ Back to Table of Contents](#additional-resources)

- JavaScript guide: [SOLUTION_FORMATTING_GUIDE_JS.md](SOLUTION_FORMATTING_GUIDE_JS.md)
- C++ guide: [SOLUTION_FORMATTING_GUIDE_CPP.md](SOLUTION_FORMATTING_GUIDE_CPP.md)
- Template: [`docs/developer-guide/templates/SOLUTION_TEMPLATE.ts`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.ts)

---

[← Previous: JavaScript Formatting Guide](SOLUTION_FORMATTING_GUIDE_JS.md) | [🏠 Home](../README.md) | [Next: C++ Formatting Guide →](SOLUTION_FORMATTING_GUIDE_CPP.md)
