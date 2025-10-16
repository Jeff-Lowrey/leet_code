/**
 * # Difficulty: Easy
 *
 * # 136. Single Number
 *
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
 *
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[4,1,2,1,2]</dd>
 * <dt>Output:</dt>
 * <dd>4 (single number)</dd>
 * <dt>Explanation:</dt>
 * <dd>The single number 4 appears once in [2,2,1,4,1] (all others appear twice)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [This problem requires understanding of bit manipulation concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply bit manipulation methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages bit manipulation principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [4,1,2,1,2]
 * Step 1: XOR all numbers
 *   result = 0
 *   result ^= 4 → result = 4 (binary: 100)
 *   result ^= 1 → result = 5 (binary: 101)
 *   result ^= 2 → result = 7 (binary: 111)
 *   result ^= 1 → result = 6 (binary: 110)
 *   result ^= 2 → result = 4 (binary: 100)
 *
 * Step 2: All duplicate numbers cancel out (a^a=0)
 *   Pairs: (1^1)=0, (2^2)=0
 *   Remaining: 4
 *
 * Output: 4 (single number)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 136: Single Number (Alternative Implementation)
 *
 * @param {number[]} nums - Array of integers where every element appears twice except one
 * @return {number} - The single number that appears only once
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
  // Alternative implementation using reduce
  return nums.reduce((acc, num) => acc ^ num, 0);
}

/**
 * Test cases for Problem 136: Single
 */
function testSolution() {
  console.log("Testing 136. Single");

  // Test case 1: Basic case
  const result1 = solve([2, 2, 1]);
  const expected1 = 1;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Multiple pairs
  const result2 = solve([4, 1, 2, 1, 2]);
  const expected2 = 4;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single element
  const result3 = solve([1]);
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Negative numbers
  const result4 = solve([-1, -1, -2]);
  const expected4 = -2;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  console.log("All test cases passed for 136. Single!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 136. Single ===");
  console.log("Category: Bit Manipulation");
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
 * - This solution focuses on bit manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
