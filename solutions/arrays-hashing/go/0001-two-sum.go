/*
### INTUITION:
The key insight is to use a hash map to store numbers we've seen so far.

For each number, we check if its complement (target - current_number) exists in our hash map.

This allows us to find the pair in a single pass.

### APPROACH:
1. We start by creating a hash map (dictionary) to store the numbers we've encountered along with their indices.
2. As we iterate through the array, for each number we calculate its complement - the value that would sum with the current number to reach our target.
3. The complement is simply `target - current_number`.
4. Before adding the current number to our hash map, we first check if its complement already exists in the map.
5. If we find the complement, we've discovered our pair and can immediately return both indices: the stored index from the hash map and the current index.
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

Step-by-step execution:
1. Initialize empty hash map: `seen = {}`
2. i=0, num=2: complement = 9-2 = 7, not in seen, add seen[2] = 0 → `seen = {2: 0}`
3. i=1, num=7: complement = 9-7 = 2, **found in seen!** → return [seen[2], 1] = [0, 1]

Output:
```
[0, 1]
```

Why it works: We found that nums[0]=2 and nums[1]=7 sum to target 9, so we return their indices.

### TIME COMPLEXITY:
**O(n)** - where n is the length of the array. In the worst case, we need to iterate through all n elements once. For each element, we perform two **O(1)** operations: one hash map lookup to check if the complement exists, and potentially one insertion to add the current number to the hash map. Therefore, the total time is **O(n × 1)** = **O(n)**.

### SPACE COMPLEXITY:
**O(n)** - In the worst case, we might need to store all n-1 elements in the hash map before finding the solution on the last element. For example, if nums = [1,2,3,4,5] and target = 9, we'd store {1:0, 2:1, 3:2, 4:3} before finding that 4+5=9 at index 4. The hash map stores at most n entries, giving us **O(n)** space complexity.

### EDGE CASES:
- **No solution exists:** Problem guarantees exactly one solution
- **Duplicate values:** Hash map handles correctly by index
- **Two same numbers sum to target:** Works if at different indices
- **Negative numbers:** Algorithm works for any integers

</details>

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
