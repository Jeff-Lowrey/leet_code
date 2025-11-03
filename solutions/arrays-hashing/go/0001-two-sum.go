/**
 * # 0001. Two Sum
 *
 * 1. Two Sum
 * Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return indices of the
 * two numbers such that they add up to `target`.
 *
 * You may assume that each input would have exactly one solution, and you may
 * not use the same element twice.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [2,7,11,15], target = 9</dd>
 * <dt>Output:</dt>
 * <dd>[]</dd>
 * <dt>Explanation:</dt>
 * <dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Single Pass
 * **Data Structures**: Map, Slice
 * **Patterns**: Complement Search
 * **Time Complexity**: **O(n)** - Single pass through array with O(1) hash map lookups
 * **Space Complexity**: **O(n)** - Hash map stores up to n elements in worst case
 *
 * ### INTUITION:
 * The key insight is to use a hash map to store numbers we've seen so far.
 *
 * For each number, we check if its complement (target - current_number) exists in our hash map.
 *
 * This allows us to find the pair in a single pass.
 *
 * ### APPROACH:
1. We start by creating a map to store the numbers we've encountered along with their indices.
2. As we iterate through the array, for each number we calculate its complement - the value that
would sum with the current number to reach our target.
3. The complement is simply
`target - current_number`.
4. Before adding the current number to our hash map, we first check if its complement already
exists in the map.
5. If we find the complement, we've discovered our pair and can immediately
return both indices: the stored index from the hash map and the current index.
6. If the complement doesn't exist yet, we store the current number and its index in the hash map.
7. This prepares us for future iterations where this number might be the complement we're looking for.
8. The beauty of this approach is that we only need to make a single pass through the array.
9. Each lookup in the hash map is O(1), making this dramatically faster than checking all possible pairs.

### WHY THIS WORKS:
Instead of checking every pair (O(n²)), we use hash map for O(1) lookup.

We only need to store numbers we've already seen.

When we find a complement, we know the current index and the stored index.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [2,7,11,15], target = 9
```

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * **O(n)** - Single pass through array with O(1) hash map lookups
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Hash map stores up to n elements in worst case
 *
 * ### EDGE CASES:
 * - **No solution exists:** Problem guarantees exactly one solution
 * - **Duplicate values:** Hash map handles correctly by index
 * - **Two same numbers sum to target:** Works if at different indices
 * - **Negative numbers:** Algorithm works for any integers
 *
 * </details>
 */

package main

import "fmt"

/**
 * Find two numbers that add up to target
 *
 * Approach: Hash Map for O(n) lookup
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param nums Slice of integers
 * @param target Target sum
 * @return Slice containing indices of the two numbers
 */
func twoSum(nums []int, target int) []int {
    // Map to store value -> index mapping
    seen := make(map[int]int)

    for i, num := range nums {
        // Calculate complement needed to reach target
        complement := target - num

        // Check if complement exists in our hash map
        if idx, found := seen[complement]; found {
            return []int{idx, i}
        }

        // Store current number and its index
        seen[num] = i
    }

    // Should never reach here given problem constraints
    return []int{}
}

/**
 * Brute force approach - check all pairs
 *
 * Approach: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * @param nums Slice of integers
 * @param target Target sum
 * @return Slice containing indices of the two numbers
 */
func twoSumBruteForce(nums []int, target int) []int {
    n := len(nums)

    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if nums[i] + nums[j] == target {
                return []int{i, j}
            }
        }
    }

    return []int{}
}

// Helper function to compare slices
func equal(a, b []int) bool {
    if len(a) != len(b) {
        return false
    }
    for i := range a {
        if a[i] != b[i] {
            return false
        }
    }
    return true
}

// Test cases
func main() {
    // Test case 1
    fmt.Println("Test Case 1:")
    nums1 := []int{2, 7, 11, 15}
    target1 := 9
    result1 := twoSum(nums1, target1)
    fmt.Printf("Input: nums = %v, target = %d\n", nums1, target1)
    fmt.Printf("Output: %v\n", result1)
    fmt.Printf("Expected: [0 1]\n")
    fmt.Printf("Pass: %v\n", equal(result1, []int{0, 1}))
    fmt.Println()

    // Test case 2
    fmt.Println("Test Case 2:")
    nums2 := []int{3, 2, 4}
    target2 := 6
    result2 := twoSum(nums2, target2)
    fmt.Printf("Input: nums = %v, target = %d\n", nums2, target2)
    fmt.Printf("Output: %v\n", result2)
    fmt.Printf("Expected: [1 2]\n")
    fmt.Printf("Pass: %v\n", equal(result2, []int{1, 2}))
    fmt.Println()

    // Test case 3
    fmt.Println("Test Case 3:")
    nums3 := []int{3, 3}
    target3 := 6
    result3 := twoSum(nums3, target3)
    fmt.Printf("Input: nums = %v, target = %d\n", nums3, target3)
    fmt.Printf("Output: %v\n", result3)
    fmt.Printf("Expected: [0 1]\n")
    fmt.Printf("Pass: %v\n", equal(result3, []int{0, 1}))
}
