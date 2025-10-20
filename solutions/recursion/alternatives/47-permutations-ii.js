/**
 * # Difficulty: Medium
 *
 * # 47. Permutations II
 *
 * This problem demonstrates key concepts in Recursion.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 1, 2]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>All unique permutations of [1,1,2] are [[1,1,2],[1,2,1],[2,1,1]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n! * n) - n! permutations, O(n) to build each
**Space Complexity**: * O(n) - recursion depth and tracking array

 *
 * ### INTUITION:
 * Given an array that may contain duplicate integers, return all unique permutations.
 * The challenge is avoiding duplicate permutations when the input has duplicate values.
 * We need to track which numbers we've used AND skip duplicates at the same recursion level.
 *
 * ### APPROACH:
 * 1. **Sort the array**: Groups duplicates together for efficient duplicate detection
 * 2. **Backtracking with duplicate handling**:
 *    - Track which indices have been used in current permutation
 *    - Skip a number if it equals the previous number AND the previous wasn't used
 *    - This prevents duplicate permutations from being generated
 * 3. **Key insight**:
 *    - If we have [1,1,2], we want [1,1,2] but not [1,1,2] again from swapping the 1's
 *    - Sorting + skipping ensures we only use duplicates in order
 *
 * ### WHY THIS WORKS:
 * - Sorting groups duplicates together
 * - The skip condition (i > 0 and nums[i] == nums[i-1] and not used[i-1]) ensures
 *   we only use duplicate values in left-to-right order
 * - This prevents generating the same permutation multiple times
 * - Each duplicate is only considered if all previous duplicates were used
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: [1,1,2]
 * After sorting: [1,1,2]
 *
 * Generate permutations:
 * Use first 1: [1] -> Use second 1: [1,1] -> Use 2: [1,1,2] ✓
 *                  -> Use 2: [1,2] -> Use second 1: [1,2,1] ✓
 * Use second 1: SKIP (first 1 not used, would create duplicate)
 * Use 2: [2] -> Use first 1: [2,1] -> Use second 1: [2,1,1] ✓
 *
 * Output: [[1,1,2],[1,2,1],[2,1,1]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n! * n) - n! permutations, O(n) to build each
 *
 * ### SPACE COMPLEXITY:
 * O(n) - recursion depth and tracking array
 *
 * ### EDGE CASES:
 * - All elements are the same (return single permutation)
 * - No duplicates (behaves like Permutations I)
 * - Empty array (return [[]])
 *
 * </details>
 */

/**
 * Main solution for Problem 47: Permutations II
 *
 * @param {number[]} nums - Array of integers (may contain duplicates)
 * @return {number[][]} - All unique permutations
 *
 * Time Complexity: O(n! * n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  const result = [];

  // Sort to group duplicates together
  nums.sort((a, b) => a - b);

  // Track which indices have been used
  const used = new Array(nums.length).fill(false);

  /**
   * Backtracking helper function
   * @param {number[]} current - Current permutation being built
   */
  function backtrack(current) {
    // Base case: permutation is complete
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    // Try each number that hasn't been used yet
    for (let i = 0; i < nums.length; i++) {
      // Skip if already used
      if (used[i]) {
        continue;
      }

      // Skip duplicates: if current number equals previous number
      // and previous number hasn't been used, skip current
      // This ensures we only use duplicates in left-to-right order
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }

      // Choose: add number to permutation
      current.push(nums[i]);
      used[i] = true;

      // Explore: recurse to fill next position
      backtrack(current);

      // Unchoose: backtrack
      current.pop();
      used[i] = false;
    }
  }

  // Start backtracking with empty permutation
  backtrack([]);

  return result;
}

/**
 * Test cases for Problem 47: Permutations II
 */
function testSolution() {
  console.log("Testing 47. Permutations II");

  // Helper function to compare 2D arrays (order doesn't matter)
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const sortedA = a.map((arr) => JSON.stringify([...arr])).sort();
    const sortedB = b.map((arr) => JSON.stringify([...arr])).sort();
    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
  }

  // Test case 1: Two duplicates
  const result1 = solve([1, 1, 2]);
  const expected1 = [
    [1, 1, 2],
    [1, 2, 1],
    [2, 1, 1],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: All same
  const result2 = solve([1, 1, 1]);
  const expected2 = [[1, 1, 1]];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Multiple duplicates
  const result3 = solve([2, 2, 1, 1]);
  console.assert(
    result3.length === 6, // 4!/(2!*2!) = 6
    `Test 3 failed: expected 6 unique permutations, got ${result3.length}`,
  );

  // Test case 4: No duplicates (should work like Permutations I)
  const result4 = solve([1, 2, 3]);
  console.assert(
    result4.length === 6, // 3! = 6
    `Test 4 failed: expected 6 permutations, got ${result4.length}`,
  );

  // Test case 5: Single element
  const result5 = solve([1]);
  const expected5 = [[1]];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 47. Permutations II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 47. Permutations II ===");
  console.log("Category: Recursion");
  console.log("Difficulty: Medium");
  console.log("");

  console.log("Input: [1,1,2]");
  console.log("Output:", JSON.stringify(solve([1, 1, 2])));
  console.log("");

  console.log("Input: [1,2,3]");
  console.log("Output:", JSON.stringify(solve([1, 2, 3])));

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
 * - Key difference from Permutations I: handling duplicate values
 * - The duplicate-skipping condition is crucial: i > 0 && nums[i] === nums[i-1] && !used[i-1]
 * - Sorting is essential for this approach to work
 * - Number of unique permutations with duplicates: n! / (n1! * n2! * ... * nk!)
 *   where n1, n2, ..., nk are counts of each duplicate value
 */
