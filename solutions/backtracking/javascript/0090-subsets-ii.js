/**
### INTUITION:
[This problem requires understanding of backtracking concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply backtracking methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- This ensures that the solution leverages backtracking principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,2,2]
```

Steps:
Step 1: Sort array → [1,2,2]
Step 2: Build subsets with backtracking
Step 3: Start with [] → add to result
Step 4: Try 1: [1] → add to result
Step 5: Try 2: [1,2] → add to result
Step 6: Try 2: [1,2,2] → add to result
Step 7: Skip duplicate 2
Step 8: Try first 2: [2] → add to result
Step 9: Try second 2: [2,2] → add to result
Step 10: Skip duplicate 2 (i=2, start=0, nums[2]==nums[1])

Output:
```
[[],[1],[1,2],[1,2,2],[2],[2,2]]
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

/**
 * Main solution for Problem 090: Subsets II
 *
 * @param {number[]} nums - Array of integers that may contain duplicates
 * @return {number[][]} - Array of all unique subsets (power set)
 *
 * Time Complexity: O(n × 2^n) in worst case (all unique), better with duplicates
 * Space Complexity: O(n) for recursion depth
 */
function solve(nums) {
  // Handle edge cases
  if (!nums) return [];
  if (nums.length === 0) return [[]];

  // Sort array to enable duplicate detection
  nums.sort((a, b) => a - b);

  const result = [];

  /**
   * Backtracking helper function
   * @param {number} start - Starting index for current level
   * @param {number[]} currentSubset - Current subset being built
   */
  function backtrack(start, currentSubset) {
    // Add current subset to result (every recursive call is a valid subset)
    result.push([...currentSubset]); // Make a copy

    // Try each element starting from start index
    for (let i = start; i < nums.length; i++) {
      // Skip duplicates at the same recursion level
      // We only want to use duplicate elements in order (first occurrence first)
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }

      // Choose: include current element
      currentSubset.push(nums[i]);

      // Explore: recursively build subsets that include current element
      backtrack(i + 1, currentSubset);

      // Unchoose: remove current element (backtrack)
      currentSubset.pop();
    }
  }

  // Start backtracking from index 0
  backtrack(0, []);

  return result;
}

/**
 * Test cases for Problem 090: Subsets II
 */
function testSolution() {
  console.log("Testing 090. Subsets II");

  // Helper function to sort subsets for comparison
  function sortSubsets(subsets) {
    return subsets
      .map((subset) => [...subset].sort((a, b) => a - b))
      .sort((a, b) => {
        if (a.length !== b.length) return a.length - b.length;
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) return a[i] - b[i];
        }
        return 0;
      });
  }

  // Helper function to compare arrays of arrays
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = sortSubsets(arr1);
    const sorted2 = sortSubsets(arr2);
    return JSON.stringify(sorted1) === JSON.stringify(sorted2);
  }

  // Test case 1: Basic functionality with duplicates
  const result1 = solve([1, 2, 2]);
  const expected1 = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Multiple duplicates
  const result2 = solve([4, 4, 4, 1, 4]);
  const expected2 = [
    [],
    [1],
    [1, 4],
    [1, 4, 4],
    [1, 4, 4, 4],
    [1, 4, 4, 4, 4],
    [4],
    [4, 4],
    [4, 4, 4],
    [4, 4, 4, 4],
  ];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: All elements are the same
  const result3 = solve([1, 1, 1]);
  const expected3 = [[], [1], [1, 1], [1, 1, 1]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: No duplicates (should work like Subsets I)
  const result4 = solve([1, 2, 3]);
  const expected4 = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Empty array
  const result5 = solve([]);
  const expected5 = [[]];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Single element
  const result6 = solve([1]);
  const expected6 = [[], [1]];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  // Test case 7: All subsets are unique
  const result7 = solve([1, 2, 2]);
  const uniqueSubsets = new Set(
    result7.map((subset) => JSON.stringify([...subset].sort())),
  );
  console.assert(
    uniqueSubsets.size === result7.length,
    `Test 7 failed: found duplicate subsets`,
  );

  // Test case 8: Contains empty subset
  const result8 = solve([1, 1]);
  const hasEmptySubset = result8.some((subset) => subset.length === 0);
  console.assert(hasEmptySubset, `Test 8 failed: should contain empty subset`);

  // Test case 9: Negative numbers with duplicates
  const result9 = solve([-1, -1, 0]);
  const expected9Count = 4; // [], [-1], [-1,-1], [-1,-1,0], [-1,0], [0]
  console.assert(
    result9.length === 6,
    `Test 9 failed: expected 6 subsets, got ${result9.length}`,
  );

  console.log("All test cases passed for 090. Subsets II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 090. Subsets Ii ===");
  console.log("Category: Backtracking");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on backtracking concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
