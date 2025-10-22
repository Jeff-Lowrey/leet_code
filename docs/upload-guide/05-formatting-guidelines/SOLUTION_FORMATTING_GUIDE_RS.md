# LeetCode Solution Formatting Guide - Rust

[← Previous: Go Formatting Guide](SOLUTION_FORMATTING_GUIDE_GO.md) | [🏠 Home](../README.md)

---

This guide explains the standard format for Rust LeetCode solution files in this repository.

## Table of Contents

- [Template Location](#template-location)
- [Key Formatting Rules](#key-formatting-rules)
- [Visual Styling Notes](#visual-styling-notes)
- [Theme System](#theme-system)
- [Rust-Specific Conventions](#rust-specific-conventions)
- [Best Practices](#best-practices)
- [Reference Implementation](#reference-implementation)
- [Additional Resources](#additional-resources)

## Template Location
[↑ Back to Table of Contents](#template-location)

Use [`docs/developer-guide/templates/SOLUTION_TEMPLATE.rs`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.rs) as the starting point for new solutions.

## Key Formatting Rules
[↑ Back to Table of Contents](#key-formatting-rules)

### 1. Doc Comment Structure

```rust
/*!
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

```rust
pub struct Solution;

impl Solution {
    /// Main solution method
    ///
    /// # Approach
    /// [Brief description]
    ///
    /// # Complexity
    /// - Time: O(?)
    /// - Space: O(?)
    pub fn method_name(param1: Type1, param2: Type2) -> ReturnType {
        // Implementation with clear comments
        result
    }

    /// Alternative solution method
    ///
    /// # Complexity
    /// - Time: O(?)
    /// - Space: O(?)
    pub fn alternative_method(param: Type) -> ReturnType {
        // Implementation
        result
    }
}
```

### 4. Test Cases

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_case() {
        let nums = vec![2, 7, 11, 15];
        let target = 9;
        let result = Solution::method_name(nums, target);
        let expected = vec![0, 1];
        assert_eq!(result, expected);
    }

    #[test]
    fn test_edge_case() {
        let nums = vec![];
        let result = Solution::method_name(nums, 0);
        let expected = vec![];
        assert_eq!(result, expected);
    }
}

fn main() {
    let nums = vec![2, 7, 11, 15];
    let result = Solution::method_name(nums, 9);
    println!("Result: {:?}", result);
}
```

## Rust-Specific Conventions
[↑ Back to Table of Contents](#rust-specific-conventions)

### Common Data Structures

```rust
// Vectors (dynamic arrays)
let mut nums: Vec<i32> = Vec::new();
let nums = vec![1, 2, 3];
nums.push(4);

// Hash Maps
use std::collections::HashMap;
let mut map: HashMap<i32, i32> = HashMap::new();
map.insert(key, value);
let val = map.get(&key);

// Hash Sets
use std::collections::HashSet;
let mut set: HashSet<i32> = HashSet::new();
set.insert(value);
let exists = set.contains(&value);

// VecDeque (double-ended queue)
use std::collections::VecDeque;
let mut deque = VecDeque::new();
deque.push_back(1);
deque.push_front(0);
```

### Ownership and Borrowing

```rust
// Ownership
let s1 = String::from("hello");
let s2 = s1; // s1 is moved, can't use s1 anymore

// Borrowing (immutable reference)
let s1 = String::from("hello");
let len = calculate_length(&s1); // s1 is borrowed

// Mutable borrowing
let mut s = String::from("hello");
change(&mut s);

// Multiple immutable borrows OK
let r1 = &s;
let r2 = &s;

// Can't have mutable and immutable borrows together
```

### Pattern Matching

```rust
// Match expressions
match value {
    0 => println!("zero"),
    1 | 2 => println!("one or two"),
    3..=9 => println!("three to nine"),
    _ => println!("something else"),
}

// if let for simple matches
if let Some(val) = option {
    println!("Got: {}", val);
}

// while let
while let Some(val) = stack.pop() {
    println!("{}", val);
}
```

### Iterators

```rust
// Iterate with index
for (i, num) in nums.iter().enumerate() {
    // i is index, num is &i32
}

// Iterate values
for num in &nums {
    // num is &i32
}

// Iterate mutably
for num in &mut nums {
    *num += 1; // num is &mut i32
}

// Iterator methods
let doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();
let filtered: Vec<i32> = nums.iter().filter(|&&x| x > 0).copied().collect();
let sum: i32 = nums.iter().sum();
```

### Option and Result

```rust
// Option for potentially missing values
fn find_index(nums: &[i32], target: i32) -> Option<usize> {
    for (i, &num) in nums.iter().enumerate() {
        if num == target {
            return Some(i);
        }
    }
    None
}

// Using Option
match find_index(&nums, target) {
    Some(idx) => println!("Found at {}", idx),
    None => println!("Not found"),
}

// Unwrapping (use carefully)
let idx = find_index(&nums, target).unwrap_or(0);

// Result for operations that can fail
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}
```

### Common Traits

```rust
// Clone - explicit copying
let nums2 = nums.clone();

// Copy - implicit copying (for simple types)
let x = 5;
let y = x; // x is still valid (i32 implements Copy)

// Debug - for debugging output
#[derive(Debug)]
struct Point { x: i32, y: i32 }
println!("{:?}", point);

// PartialEq - for equality comparisons
#[derive(PartialEq)]
struct Point { x: i32, y: i32 }
```

### Slices

```rust
// String slices
let s = String::from("hello world");
let hello = &s[0..5];
let world = &s[6..11];

// Array slices
let arr = [1, 2, 3, 4, 5];
let slice = &arr[1..3]; // &[i32]

// Slice methods
let first = slice.first(); // Option<&i32>
let last = slice.last();
```

## Best Practices
[↑ Back to Table of Contents](#best-practices)

1. ✅ Use `cargo fmt` to format code
2. ✅ Use `cargo clippy` for linting
3. ✅ Prefer borrowing over ownership transfer
4. ✅ Use iterators for functional-style operations
5. ✅ Handle `Option` and `Result` explicitly
6. ✅ Use pattern matching for clarity
7. ✅ Write unit tests with `#[test]`
8. ❌ Don't use `unwrap()` without good reason
9. ❌ Don't ignore compiler warnings
10. ❌ Don't fight the borrow checker - understand it

## Reference Implementation
[↑ Back to Table of Contents](#reference-implementation)

See template at [`docs/developer-guide/templates/SOLUTION_TEMPLATE.rs`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.rs) for a complete example.

## Additional Resources
[↑ Back to Table of Contents](#additional-resources)

- Go guide: [SOLUTION_FORMATTING_GUIDE_GO.md](SOLUTION_FORMATTING_GUIDE_GO.md)
- Python guide: [SOLUTION_FORMATTING_GUIDE_PY.md](SOLUTION_FORMATTING_GUIDE_PY.md)
- Template: [`docs/developer-guide/templates/SOLUTION_TEMPLATE.rs`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.rs)
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)

---

[← Previous: Go Formatting Guide](SOLUTION_FORMATTING_GUIDE_GO.md) | [🏠 Home](../README.md)
