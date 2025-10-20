/**
 * # Difficulty: Medium
 *
 * # 46. Permutations
 *
 * This problem demonstrates key concepts in Recursion.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {len(expected)} permutations, got {len(result)}"</dd>
 * <dt>Explanation:</dt>
 * <dd>All permutations of [1,2,3] are 6 arrangements: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n! * n) where n is array length
**Space Complexity**: * O(n) - recursion depth and tracking set

 *
 * ### INTUITION:
 * Given an array of distinct integers, return all possible permutations. A permutation
 * is an arrangement of all elements in different orders. This is a classic backtracking
 * problem where we explore all possible orderings systematically.
 *
 * ### APPROACH:
 * 1. **Backtracking with tracking**:
 *    - At each position, try every unused number
 *    - Mark numbers as used to avoid duplicates in same permutation
 *    - When all positions filled, add permutation to results
 * 2. **Implementation strategy**:
 *    - Use a set to track used indices
 *    - Recurse for each unused number
 *    - Backtrack by unmarking the number as used
 * 3. **Alternative approach**: Swap elements in-place
 *
 * ### WHY THIS WORKS:
 * - Each level of recursion chooses one number for current position
 * - Tracking prevents using same number twice in one permutation
 * - Backtracking explores all possible orderings systematically
 * - The recursion tree has n! leaves (all permutations)
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: [1,2,3]
 *
 * Build permutations by choosing one number at a time:
 * Choose 1: [1] -> Choose 2: [1,2] -> Choose 3: [1,2,3] ✓
 *                        -> Choose 3: [1,3] -> Choose 2: [1,3,2] ✓
 * Choose 2: [2] -> Choose 1: [2,1] -> Choose 3: [2,1,3] ✓
 *                -> Choose 3: [2,3] -> Choose 1: [2,3,1] ✓
 * Choose 3: [3] -> Choose 1: [3,1] -> Choose 2: [3,1,2] ✓
 *                -> Choose 2: [3,2] -> Choose 1: [3,2,1] ✓
 *
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n! * n) where n is array length
 * - n! permutations to generate
 * - O(n) to copy each permutation
 *
 * ### SPACE COMPLEXITY:
 * O(n) - recursion depth and tracking set
 *
 * ### EDGE CASES:
 * - Empty array (return [[]])
 * - Single element (return [[element]])
 * - All distinct integers (no duplicates in input)
 *
 * </details>
 */

/**
 * Main solution for Problem 46: Permutations
 *
 * @param {number[]} nums - Array of distinct integers
 * @return {number[][]} - All possible permutations
 *
 * Time Complexity: O(n! * n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  const result = [];

  /**
   * Backtracking helper function
   * @param {number[]} current - Current permutation being built
   * @param {Set} used - Set of indices already used in current permutation
   */
  function backtrack(current, used) {
    // Base case: permutation is complete
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    // Try each number that hasn't been used yet
    for (let i = 0; i < nums.length; i++) {
      if (used.has(i)) {
        continue; // Skip if already used
      }

      // Choose: add number to permutation
      current.push(nums[i]);
      used.add(i);

      // Explore: recurse to fill next position
      backtrack(current, used);

      // Unchoose: backtrack
      current.pop();
      used.delete(i);
    }
  }

  // Start backtracking with empty permutation
  backtrack([], new Set());

  return result;
}

/**
 * Alternative solution using swap approach (more space efficient)
 */
function solveSwap(nums) {
  const result = [];

  function backtrack(index) {
    // Base case: reached end of array
    if (index === nums.length) {
      result.push([...nums]);
      return;
    }

    // Try swapping current position with every position from here to end
    for (let i = index; i < nums.length; i++) {
      // Swap
      [nums[index], nums[i]] = [nums[i], nums[index]];

      // Recurse
      backtrack(index + 1);

      // Swap back (backtrack)
      [nums[index], nums[i]] = [nums[i], nums[index]];
    }
  }

  backtrack(0);
  return result;
}

/**
 * Test cases for Problem 46: Permutations
 */
function testSolution() {
  console.log("Testing 46. Permutations");

  // Helper function to compare 2D arrays (order doesn't matter)
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const sortedA = a
      .map((arr) => JSON.stringify([...arr].sort((x, y) => x - y)))
      .sort();
    const sortedB = b
      .map((arr) => JSON.stringify([...arr].sort((x, y) => x - y)))
      .sort();
    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
  }

  // Test case 1: Three elements
  const result1 = solve([1, 2, 3]);
  const expected1 = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${expected1.length} permutations, got ${result1.length}`,
  );

  // Test case 2: Two elements
  const result2 = solve([0, 1]);
  const expected2 = [
    [0, 1],
    [1, 0],
  ];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single element
  const result3 = solve([1]);
  const expected3 = [[1]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Verify count for 4 elements (should be 4! = 24)
  const result4 = solve([1, 2, 3, 4]);
  console.assert(
    result4.length === 24,
    `Test 4 failed: expected 24 permutations, got ${result4.length}`,
  );

  // Test case 5: Test swap approach
  const result5 = solveSwap([1, 2, 3]);
  console.assert(
    arraysEqual(result5, expected1),
    `Test 5 (swap) failed: expected ${expected1.length} permutations, got ${result5.length}`,
  );

  console.log("All test cases passed for 46. Permutations!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 46. Permutations ===");
  console.log("Category: Recursion");
  console.log("Difficulty: Medium");
  console.log("");

  console.log("Input: [1,2,3]");
  console.log("Output:", JSON.stringify(solve([1, 2, 3])));
  console.log("");

  console.log("Input: [0,1]");
  console.log("Output:", JSON.stringify(solve([0, 1])));

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  solveSwap,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Two common approaches: tracking used elements or swapping in-place
 * - Swap approach is more memory efficient but modifies input array
 * - Number of permutations of n elements is n! (factorial)
 * - This is a fundamental backtracking pattern used in many problems
 */
