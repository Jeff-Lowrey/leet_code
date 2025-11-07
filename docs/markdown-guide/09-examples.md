# Complete Examples

## Python Example

```python
"""
# 1. Two Sum
Difficulty: Easy

Given an array of integers `nums` and an integer `target`, return **indices**
of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you
may not use the same element twice.

**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Constraints:**
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use a hash map to store seen numbers and look up complements in O(1) time.

### APPROACH:
Single-pass through array, checking hash map for complement at each step.

### ALGORITHM:
1. Initialize empty hash map
2. For each number:
   - Calculate complement = target - num
   - If complement in map, return indices
   - Store current number in map

### COMPLEXITY:
- **Time Complexity**: O(n) - single pass through array
- **Space Complexity**: O(n) - hash map stores up to n elements

</details>
"""

from typing import List

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

---

## JavaScript Example

```javascript
/**
 * # 1. Two Sum
 * Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return **indices**
 * of the two numbers such that they add up to `target`.
 *
 * **Example 1:**
 * ```
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * ```
 *
 * **Constraints:**
 * - `2 <= nums.length <= 10^4`
 * - `-10^9 <= nums[i] <= 10^9`
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Use a hash map to store seen numbers and look up complements in O(1) time.
 *
 * ### COMPLEXITY:
 * - **Time Complexity**: O(n) - single pass
 * - **Space Complexity**: O(n) - hash map storage
 *
 * </details>
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};
```

---

## Java Example

```java
/**
 * # 1. Two Sum
 * Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return **indices**
 * of the two numbers such that they add up to `target`.
 *
 * **Example 1:**
 * ```
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * ```
 *
 * **Constraints:**
 * - `2 <= nums.length <= 10^4`
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Use a hash map to store seen numbers and look up complements in O(1) time.
 *
 * ### COMPLEXITY:
 * - **Time Complexity**: O(n) - single pass
 * - **Space Complexity**: O(n) - hash map storage
 *
 * </details>
 */

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] {seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}
```

---

## C++ Example

```cpp
/**
 * # 1. Two Sum
 * Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return **indices**
 * of the two numbers such that they add up to `target`.
 *
 * **Example 1:**
 * ```
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * ```
 *
 * **Constraints:**
 * - `2 <= nums.length <= 10^4`
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Use unordered_map for O(1) complement lookup.
 *
 * ### COMPLEXITY:
 * - **Time Complexity**: O(n) - single pass
 * - **Space Complexity**: O(n) - hash map storage
 *
 * </details>
 */

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};
```

---

## Go Example

```go
/**
 * # 1. Two Sum
 * Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return **indices**
 * of the two numbers such that they add up to `target`.
 *
 * **Example 1:**
 * ```
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * ```
 *
 * **Constraints:**
 * - `2 <= nums.length <= 10^4`
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Use map for O(1) complement lookup.
 *
 * ### COMPLEXITY:
 * - **Time Complexity**: O(n) - single pass
 * - **Space Complexity**: O(n) - hash map storage
 *
 * </details>
 */

func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if j, ok := seen[complement]; ok {
            return []int{j, i}
        }
        seen[num] = i
    }
    return []int{}
}
```

---

## Rust Example

```rust
/**
 * # 1. Two Sum
 * Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return **indices**
 * of the two numbers such that they add up to `target`.
 *
 * **Example 1:**
 * ```
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * ```
 *
 * **Constraints:**
 * - `2 <= nums.length <= 10^4`
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Use HashMap for O(1) complement lookup.
 *
 * ### COMPLEXITY:
 * - **Time Complexity**: O(n) - single pass
 * - **Space Complexity**: O(n) - hash map storage
 *
 * </details>
 */

use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut seen = HashMap::new();
        for (i, &num) in nums.iter().enumerate() {
            let complement = target - num;
            if let Some(&j) = seen.get(&complement) {
                return vec![j as i32, i as i32];
            }
            seen.insert(num, i);
        }
        vec![]
    }
}
```

---

## Key Differences by Language

### Comment Syntax
- **Python**: `"""..."""` (docstring)
- **Others**: `/** ... */` (block comment)

### Type Annotations
- **Python**: Type hints with `List[int]`, `-> List[int]`
- **TypeScript**: Type annotations with `:number[]`, `: number[]`
- **Java/C++**: Static types `int[]`, `vector<int>`
- **Go**: Type after variable `nums []int`
- **Rust**: Ownership system `&nums`, `Vec<i32>`

### Data Structures
- **Python**: `dict`
- **JavaScript**: `Map`
- **Java**: `HashMap`
- **C++**: `unordered_map`
- **Go**: `map`
- **Rust**: `HashMap`

## Related Sections

- **Language Formatting** → [06-language-formatting.md](06-language-formatting.md)
- **Upload Guide** → [../upload-guide/README.md](../upload-guide/README.md)
- **Formatting Guides** → [../upload-guide/05-formatting-guidelines/](../upload-guide/05-formatting-guidelines/)
