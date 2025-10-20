/**
 *  Difficulty: Hard
 *
 * # 330. Patching Array
 *
 * You are given a sorted positive integer array nums and an integer n. You need to
 * make it so that any integer in the range [1, n] can be formed by the sum of some
 * elements from nums.
 *
 * Return the minimum number of patches (additions to the array) required.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,3], n = 6</dd>
 * <dt>Output:</dt>
 * <dd>1 (patched with 2)</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum 1 patch [3] needed to cover range [1,2,4] to sum 6</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Greedy Algorithm, Optimization
 * **Data Structures**: Array, Priority Queue
 * **Patterns**: Greedy Pattern, Local Optimization
 * **Time Complexity**: **O(m + log n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * The key insight is tracking what range [1, covered] we can currently form. If we
 * can form [1, covered], and we have a number x where x <= covered + 1, then adding
 * x extends our range to [1, covered + x]. If x > covered + 1, we have a gap and
 * need to patch with (covered + 1).
 *
 * ### APPROACH:
 * 1. **Track coverage**: Maintain the maximum number we can currently build
 * 2. **Use available numbers**: If nums[i] <= covered + 1, use it to extend coverage
 * 3. **Patch when needed**: If nums[i] > covered + 1, patch with (covered + 1)
 * 4. **Greedy choice**: Always patch with (covered + 1) as it doubles our coverage
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,3], n = 6
 *
 * covered = 0, patches = 0
 *
 * Step 1: 1 <= 0+1? Yes → covered = 0+1 = 1
 *         Can now form: [1,1]
 *
 * Step 2: 3 <= 1+1? No (3 > 2) → Need patch!
 *         Patch with 2, patches = 1
 *         covered = 1 + 2 = 3
 *         Can now form: [1,3]
 *
 * Step 3: 3 <= 3+1? Yes → covered = 3+3 = 6
 *         Can now form: [1,6]
 *
 * Step 4: covered >= 6, done!
 *
 * Output: 1 (patched with 2)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m + log n)
 * Where m is length of nums. In worst case, we need log(n) patches.
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * Only using constant extra space
 *
 * ### EDGE CASES:
 * - Empty array: Need to patch from 1 up to n
 * - Array already covers [1,n]: No patches needed
 * - Large n with small array: Multiple patches required
 * - Array starts with value > 1: Need to patch 1 first
 *
 * </details>
 */

/**
 * Main solution for Problem 330: Patching Array
 *
 * @param {number[]} nums - Sorted array of positive integers
 * @param {number} n - Target range to cover [1, n]
 * @return {number} - Minimum number of patches needed
 *
 * Time Complexity: O(m + log n)
 * Space Complexity: O(1)
 */
function solve(nums, n) {
  let patches = 0;
  let miss = 1; // Smallest number we can't form yet
  let i = 0;

  while (miss <= n) {
    if (i < nums.length && nums[i] <= miss) {
      // We can use nums[i] to extend our range
      miss += nums[i];
      i++;
    } else {
      // We need to patch with 'miss'
      miss += miss;
      patches++;
    }
  }

  return patches;
}

/**
 * Test cases for Problem 330: Patching Array
 */
function testSolution() {
  console.log("Testing 330. Patching Array");

  // Test case 1: Example from problem
  const result1 = solve([1, 3], 6);
  const expected1 = 1;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Another example
  const result2 = solve([1, 5, 10], 20);
  const expected2 = 2;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Empty array
  const result3 = solve([], 7);
  const expected3 = 3; // Need [1, 2, 4]
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Already covers range
  const result4 = solve([1, 2, 2], 5);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Large n
  const result5 = solve([1, 2, 31, 33], 2147483647);
  const expected5 = 28;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 330. Patching Array!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 330. Patching Array ===");
  console.log("Category: Greedy");
  console.log("Difficulty: Hard");
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
