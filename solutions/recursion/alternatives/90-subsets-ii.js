/**
 * # Difficulty: Medium
 *
 * # 90. Subsets II
 *
 * This problem demonstrates key concepts in Recursion.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>All unique subsets of [1,2,2] are [[],[1],[1,2],[1,2,2],[2],[2,2]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Given an array that may contain duplicate integers, return all possible unique subsets.
 * The challenge is avoiding duplicate subsets when the input array has duplicate values.
 * We need to combine the subset generation logic with duplicate handling.
 *
 * ### APPROACH:
 * 1. **Sort the array**: Groups duplicates together for efficient duplicate detection
 * 2. **Backtracking with duplicate handling**:
 *    - Generate subsets using standard backtracking
 *    - Skip duplicate elements at the same recursion level
 *    - If current element equals previous and we're not at start, skip it
 * 3. **Key insight**:
 *    - For [1,2,2], we want [1,2] and [1,2,2] but not [1,2] twice
 *    - Sorting + skipping ensures we only use duplicates consecutively
 *
 * ### WHY THIS WORKS:
 * - Sorting groups duplicates together
 * - The skip condition (i > start and nums[i] == nums[i-1]) ensures
 *   we only use duplicate values in left-to-right order at each level
 * - This prevents generating the same subset multiple times
 * - Each duplicate is only added if we're continuing from previous duplicate
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: [1,2,2]
 * After sorting: [1,2,2]
 *
 * Generate subsets:
 * [] -> Add to result
 * Include 1: [1] -> Add to result
 *   Include first 2: [1,2] -> Add to result
 *     Include second 2: [1,2,2] -> Add to result
 *   Skip second 2 at same level (would create duplicate [1,2])
 * Skip 1, Include first 2: [2] -> Add to result
 *   Include second 2: [2,2] -> Add to result
 * Skip both, Include second 2: SKIP (duplicate at same level)
 *
 * Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(2^n * n) - 2^n subsets, O(n) to build each
 *
 * ### SPACE COMPLEXITY:
 * O(n) - recursion depth
 *
 * ### EDGE CASES:
 * - All elements are the same (return subsets of different sizes)
 * - No duplicates (behaves like Subsets I)
 * - Empty array (return [[]])
 *
 * </details>
 */

/**
 * Main solution for Problem 90: Subsets II
 *
 * @param {number[]} nums - Array of integers (may contain duplicates)
 * @return {number[][]} - All unique subsets
 *
 * Time Complexity: O(2^n * n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  const result = [];

  // Sort to group duplicates together
  nums.sort((a, b) => a - b);

  /**
   * Backtracking helper function
   * @param {number} start - Starting index in nums array
   * @param {number[]} subset - Current subset being built
   */
  function backtrack(start, subset) {
    // Add current subset to results
    result.push([...subset]);

    // Try adding each remaining number
    for (let i = start; i < nums.length; i++) {
      // Skip duplicates at the same recursion level
      // If current element equals previous and we're not at start, skip
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }

      // Choose: add number to subset
      subset.push(nums[i]);

      // Explore: recurse with next index
      backtrack(i + 1, subset);

      // Unchoose: backtrack
      subset.pop();
    }
  }

  // Start backtracking from index 0 with empty subset
  backtrack(0, []);

  return result;
}

/**
 * Test cases for Problem 90: Subsets II
 */
function testSolution() {
  console.log("Testing 90. Subsets II");

  // Helper function to compare 2D arrays (order doesn't matter)
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const sortedA = a.map((arr) => JSON.stringify([...arr])).sort();
    const sortedB = b.map((arr) => JSON.stringify([...arr])).sort();
    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
  }

  // Test case 1: Array with duplicates
  const result1 = solve([1, 2, 2]);
  const expected1 = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: All same elements
  const result2 = solve([1, 1, 1]);
  const expected2 = [[], [1], [1, 1], [1, 1, 1]];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Multiple different duplicates
  const result3 = solve([4, 4, 4, 1, 4]);
  // Should have subsets with 0 to 4 4's, each potentially with or without 1
  console.assert(
    result3.length === 10, // 5 choices for number of 4's * 2 choices for 1
    `Test 3 failed: expected 10 unique subsets, got ${result3.length}`,
  );

  // Test case 4: No duplicates
  const result4 = solve([1, 2, 3]);
  console.assert(
    result4.length === 8, // 2^3 = 8
    `Test 4 failed: expected 8 subsets, got ${result4.length}`,
  );

  // Test case 5: Empty array
  const result5 = solve([]);
  const expected5 = [[]];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 90. Subsets II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 90. Subsets II ===");
  console.log("Category: Recursion");
  console.log("Difficulty: Medium");
  console.log("");

  console.log("Input: [1,2,2]");
  console.log("Output:", JSON.stringify(solve([1, 2, 2])));
  console.log("");

  console.log("Input: [0]");
  console.log("Output:", JSON.stringify(solve([0])));

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
 * - Key difference from Subsets I: handling duplicate values
 * - The duplicate-skipping condition is crucial: i > start && nums[i] === nums[i-1]
 * - Sorting is essential for this approach to work correctly
 * - This pattern combines subset generation with duplicate handling
 * - Similar technique used in Combination Sum II and Permutations II
 */
