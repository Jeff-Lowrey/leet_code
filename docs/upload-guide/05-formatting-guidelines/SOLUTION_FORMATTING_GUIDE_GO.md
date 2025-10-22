# LeetCode Solution Formatting Guide - Go

[← Previous: Java Formatting Guide](SOLUTION_FORMATTING_GUIDE_JAVA.md) | [🏠 Home](../README.md) | [Next: Rust Formatting Guide →](SOLUTION_FORMATTING_GUIDE_RS.md)

---

This guide explains the standard format for Go LeetCode solution files in this repository.

## Table of Contents

- [Template Location](#template-location)
- [Key Formatting Rules](#key-formatting-rules)
- [Visual Styling Notes](#visual-styling-notes)
- [Theme System](#theme-system)
- [Go-Specific Conventions](#go-specific-conventions)
- [Best Practices](#best-practices)
- [Reference Implementation](#reference-implementation)
- [Additional Resources](#additional-resources)

## Template Location
[↑ Back to Table of Contents](#template-location)

Use [`docs/developer-guide/templates/SOLUTION_TEMPLATE.go`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.go) as the starting point for new solutions.

## Key Formatting Rules
[↑ Back to Table of Contents](#key-formatting-rules)

### 1. Package Comment Structure

```go
/*
# [Problem Number]. Problem Title

# Difficulty: [Easy/Medium/Hard]

[Problem description with markdown formatting]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input]</dd>
<dt>Output:</dt>
<dd>[output]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>...</details>
*/
```

### 2. Solution Explanation Sections

Include these sections in the `<details>` block **in this exact order**:

1. **METADATA:** (Required)
2. **INTUITION:** (Required)
3. **APPROACH:** (Required)
4. **WHY THIS WORKS:** (Optional but Recommended)
5. **EXAMPLE WALKTHROUGH:** (Required)
6. **TIME COMPLEXITY:** (Required)
7. **SPACE COMPLEXITY:** (Required)
8. **EDGE CASES:** (Required)

### 3. Code Structure

```go
package solution

// MethodName is the main solution
//
// Approach: [Brief description]
// Time Complexity: O(?)
// Space Complexity: O(?)
func MethodName(param1 Type1, param2 Type2) ReturnType {
    // Implementation with clear comments
    return result
}

// AlternativeMethod provides an alternative approach
//
// Time Complexity: O(?)
// Space Complexity: O(?)
func AlternativeMethod(param Type) ReturnType {
    // Implementation
    return result
}
```

### 4. Test Cases

```go
package solution

import (
    "fmt"
    "reflect"
)

func RunTests() {
    // Test case 1 - Basic case
    nums1 := []int{2, 7, 11, 15}
    target1 := 9
    result1 := MethodName(nums1, target1)
    expected1 := []int{0, 1}
    fmt.Printf("Test 1: %s\n", testResult(reflect.DeepEqual(result1, expected1)))

    // Test case 2 - Edge case
    nums2 := []int{}
    result2 := MethodName(nums2, 0)
    expected2 := []int{}
    fmt.Printf("Test 2: %s\n", testResult(reflect.DeepEqual(result2, expected2)))
}

func testResult(pass bool) string {
    if pass {
        return "PASS"
    }
    return "FAIL"
}
```

## Go-Specific Conventions
[↑ Back to Table of Contents](#go-specific-conventions)

### Common Data Structures

```go
// Slices (dynamic arrays)
var nums []int
nums = []int{1, 2, 3}
nums = make([]int, 0, capacity)
nums = append(nums, 4)

// Maps (hash maps)
freq := make(map[int]int)
freq[key] = value
val, exists := freq[key]

// Structs for custom types
type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

type ListNode struct {
    Val  int
    Next *ListNode
}
```

### Common Patterns

```go
// Iterate with index
for i := 0; i < len(nums); i++ {
    // Access nums[i]
}

// Iterate with range
for i, num := range nums {
    // i is index, num is value
}

// Iterate values only
for _, num := range nums {
    // num is value
}

// Two pointers
left, right := 0, len(nums)-1

// Sliding window
start := 0
for end := 0; end < len(nums); end++ {
    // Expand window
    for /* condition */ {
        // Shrink window
        start++
    }
}
```

### Error Handling

```go
// Multiple return values
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Usage
result, err := divide(10, 2)
if err != nil {
    // Handle error
    return
}
```

### Pointers

```go
// Pointer declaration
var p *int

// Address of operator
num := 42
p = &num

// Dereferencing
value := *p

// Nil pointer check
if p != nil {
    value = *p
}
```

### Built-in Functions

```go
// len - length of slice, array, string, map
length := len(nums)

// cap - capacity of slice
capacity := cap(nums)

// append - add elements to slice
nums = append(nums, 4, 5, 6)

// copy - copy slice
dst := make([]int, len(src))
copy(dst, src)

// make - create slice, map, channel
nums := make([]int, length, capacity)
m := make(map[string]int)

// new - allocate memory
p := new(int)
```

### String Operations

```go
import "strings"

// Common string operations
s := "hello world"
parts := strings.Split(s, " ")
joined := strings.Join(parts, "-")
upper := strings.ToUpper(s)
contains := strings.Contains(s, "world")

// Rune (character) iteration
for i, r := range s {
    // i is byte index, r is rune
}

// String builder
var sb strings.Builder
sb.WriteString("Hello")
sb.WriteString(" World")
result := sb.String()
```

## Best Practices
[↑ Back to Table of Contents](#best-practices)

1. ✅ Follow Go naming conventions (MixedCaps, not snake_case)
2. ✅ Use `gofmt` to format code
3. ✅ Keep functions short and focused
4. ✅ Use meaningful variable names
5. ✅ Handle errors explicitly
6. ✅ Use pointers for large structs
7. ✅ Prefer slices over arrays
8. ❌ Don't ignore errors
9. ❌ Don't use panic for normal error handling

## Reference Implementation
[↑ Back to Table of Contents](#reference-implementation)

See template at [`docs/developer-guide/templates/SOLUTION_TEMPLATE.go`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.go) for a complete example.

## Additional Resources
[↑ Back to Table of Contents](#additional-resources)

- Java guide: [SOLUTION_FORMATTING_GUIDE_JAVA.md](SOLUTION_FORMATTING_GUIDE_JAVA.md)
- Rust guide: [SOLUTION_FORMATTING_GUIDE_RS.md](SOLUTION_FORMATTING_GUIDE_RS.md)
- Template: [`docs/developer-guide/templates/SOLUTION_TEMPLATE.go`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.go)

---

[← Previous: Java Formatting Guide](SOLUTION_FORMATTING_GUIDE_JAVA.md) | [🏠 Home](../README.md) | [Next: Rust Formatting Guide →](SOLUTION_FORMATTING_GUIDE_RS.md)
