/**
 * ### METADATA:
 * **Techniques**: Backtracking, Sorting
 * **Data Structures**: Array, List
 * **Time Complexity**: O(2^n × n)
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * The key insight is that sort the array to group duplicates together. During backtracking, add the current subset at each step (not just at leaves). Skip duplicate elements at the same recursion level using the condition i > start and nums[i] == nums[i-1] to avoid duplicate subsets.
 *
 * ### APPROACH:
 * 1. **Sort array**: Sort nums to group duplicate elements together
 * 2. **Initialize result**: Create result list starting with empty subset [[]]
 * 3. **Define backtrack function**: Create recursive function with parameters (start, current)
 * 4. **Add current subset**: Append copy of current to result at each recursive call
 * 5. **Iterate from start**: Loop from start index to end of array
 * 6. **Skip duplicates**: If i > start and nums[i] == nums[i-1], continue to avoid duplicate subsets
 * 7. **Include element**: Add nums[i] to current, call backtrack(i+1, current)
 * 8. **Backtrack**: Remove last element from current to explore other possibilities
 *
 * ### WHY THIS WORKS:
 * - Sort array to group duplicates, enables skipping in backtracking
 * - At each level, if nums[i] == nums[i-1] and i > start, skip (avoid duplicate subsets)
 * - Backtracking tries including/excluding each element
 * - Every path is valid subset, even partial paths
 * - O(2^n * n) time: 2^n subsets, O(n) to copy each
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,2,2]
 * ```
 *
 * Steps:
 * Step 1: Sort array → [1,2,2]
 * Step 2: Build subsets with backtracking
 * Step 3: Start with [] → add to result
 * Step 4: Try 1: [1] → add to result
 * Step 5: Try 2: [1,2] → add to result
 * Step 6: Try 2: [1,2,2] → add to result
 * Step 7: Skip duplicate 2
 * Step 8: Try first 2: [2] → add to result
 * Step 9: Try second 2: [2,2] → add to result
 * Step 10: Skip duplicate 2 (i=2, start=0, nums[2]==nums[1])
 *
 * Output:
 * ```
 * [[],[1],[1,2],[1,2,2],[2],[2,2]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(2^n × n)** - where n is the number of elements in the input array. We generate all possible subsets (the power set), which contains 2^n subsets (each element can be included or excluded). For each subset, we perform **O(n)** work to copy it to the result list. The sorting step takes **O(n log n)**, but this is dominated by the exponential subset generation. Duplicate skipping reduces the actual number of subsets when duplicates exist, but worst-case complexity remains **O(2^n × n)** when all elements are distinct. Total: **O(n log n)** + **O(2^n × n)** = **O(2^n × n)**.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - where n is the number of elements in the input array. The recursion call stack can go as deep as n levels (we can include up to n elements in a subset). The current subset list grows from size 0 to size n in the worst case. The result list storing all subsets is not counted toward space complexity as it's required output. Sorting is done in-place. Total auxiliary space: **O(n)** for recursion stack + **O(n)** for current subset = **O(n)**.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
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
