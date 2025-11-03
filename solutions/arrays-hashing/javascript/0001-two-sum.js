/**
### INTUITION:
The key insight is to use a hash map to store numbers we've seen so far.

For each number, we check if its complement (target - current_number) exists in our hash map.

This allows us to find the pair in a single pass.

### APPROACH:
1. We start by creating a hash map (Map) to store the numbers we've encountered along with their indices.
2. As we iterate through the array, for each number we calculate its complement - the value that would sum with the current number to reach our target.
3. The complement is simply `target - current_number`.
4. Before adding the current number to our hash map, we first check if its complement already exists in the map.
5. If we find the complement, we've discovered our pair and can immediately return both indices: the stored index from the hash map and the current index.
6. If the complement doesn't exist yet, we store the current number and its index in the hash map.
7. This prepares us for future iterations where this number might be the complement we're looking for.
8. The beauty of this approach is that we only need to make a single pass through the array.
9. Each lookup in the hash map is O(1), making this dramatically faster than checking all possible pairs.

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [2,7,11,15], target = 9
```

Step-by-step execution:
1. Initialize empty hash map: `seen = new Map()`
2. i=0, nums[0]=2: complement = 9-2 = 7, not in seen, add seen.set(2, 0) → `seen = {2: 0}`
3. i=1, nums[1]=7: complement = 9-7 = 2, **found in seen!** → return [seen.get(2), 1] = [0, 1]

Output:
```
[0, 1]
```

Why it works: We found that nums[0]=2 and nums[1]=7 sum to target 9, so we return their indices.

### TIME COMPLEXITY:
O(n)** - where n is the length of the array. In the worst case, we need to iterate through all n elements once. For each element, we perform two **O(1)** operations: one Map lookup to check if the complement exists (Map.has()), and potentially one insertion to add the current number to the Map (Map.set()). Therefore, the total time is **O(n × 1)** = **O(n)**.

### SPACE COMPLEXITY:
O(n)** - In the worst case, we might need to store all n-1 elements in the hash map before finding the solution on the last element. For example, if nums = [1,2,3,4,5] and target = 9, we'd store {1:0, 2:1, 3:2, 4:3} before finding that 4+5=9 at index 4. The Map stores at most n entries, giving us **O(n)** space complexity.

### EDGE CASES:
- **No solution exists:** Problem guarantees exactly one solution
- **Duplicate values:** Hash map handles correctly by index
- **Two same numbers sum to target:** Works if at different indices
- **Negative numbers:** Algorithm works for any integers

</details>

*/

class Solution {
  /**
   * Find two numbers that add up to target
   * @param {number[]} nums - Array of integers
   * @param {number} target - Target sum
   * @return {number[]} - Indices of the two numbers
   *
   * Approach: Hash Map for O(n) lookup
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  twoSum(nums, target) {
    // Map to store value -> index mapping
    const seen = new Map();

    for (let i = 0; i < nums.length; i++) {
      // Calculate complement needed to reach target
      const complement = target - nums[i];

      // Check if complement exists in our hash map
      if (seen.has(complement)) {
        return [seen.get(complement), i];
      }

      // Store current number and its index
      seen.set(nums[i], i);
    }

    // Should never reach here given problem constraints
    return [];
  }

  /**
   * Brute force approach - check all pairs
   * @param {number[]} nums - Array of integers
   * @param {number} target - Target sum
   * @return {number[]} - Indices of the two numbers
   *
   * Approach: Brute Force
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  twoSumBruteForce(nums, target) {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }

    return [];
  }
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

// Test cases
function runTests() {
  const solution = new Solution();

  // Test case 1
  console.log("Test Case 1:");
  const nums1 = [2, 7, 11, 15];
  const target1 = 9;
  const result1 = solution.twoSum(nums1, target1);
  console.log(`Input: nums = ${JSON.stringify(nums1)}, target = ${target1}`);
  console.log(`Output: ${JSON.stringify(result1)}`);
  console.log(`Expected: [0, 1]`);
  console.log(`Pass: ${JSON.stringify(result1) === JSON.stringify([0, 1])}`);
  console.log();

  // Test case 2
  console.log("Test Case 2:");
  const nums2 = [3, 2, 4];
  const target2 = 6;
  const result2 = solution.twoSum(nums2, target2);
  console.log(`Input: nums = ${JSON.stringify(nums2)}, target = ${target2}`);
  console.log(`Output: ${JSON.stringify(result2)}`);
  console.log(`Expected: [1, 2]`);
  console.log(`Pass: ${JSON.stringify(result2) === JSON.stringify([1, 2])}`);
  console.log();

  // Test case 3
  console.log("Test Case 3:");
  const nums3 = [3, 3];
  const target3 = 6;
  const result3 = solution.twoSum(nums3, target3);
  console.log(`Input: nums = ${JSON.stringify(nums3)}, target = ${target3}`);
  console.log(`Output: ${JSON.stringify(result3)}`);
  console.log(`Expected: [0, 1]`);
  console.log(`Pass: ${JSON.stringify(result3) === JSON.stringify([0, 1])}`);
}

// Run tests if executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
