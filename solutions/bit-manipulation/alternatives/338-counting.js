/**
 * # Difficulty: Easy
 *
 * # 338. Counting Bits
 *
 * Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[0,1,1,2,1,2]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Counting bits: for n=5, result is [0,1,1,2,1,2] (bit counts for 0-5)</dd>
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
 * Input: n = 5
 * Step 1: Count bits for each number from 0 to 5
 *   0 = 000 → 0 bits
 *   1 = 001 → 1 bit
 *   2 = 010 → 1 bit
 *   3 = 011 → 2 bits
 *   4 = 100 → 1 bit
 *   5 = 101 → 2 bits
 *
 * Step 2: DP relation: count[i] = count[i>>1] + (i&1)
 *   count[0] = 0
 *   count[1] = count[0] + 1 = 1
 *   count[2] = count[1] + 0 = 1
 *   count[3] = count[1] + 1 = 2
 *   count[4] = count[2] + 0 = 1
 *   count[5] = count[2] + 1 = 2
 *
 * Output: [0,1,1,2,1,2]
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
 * Main solution for Problem 338: Counting Bits
 *
 * @param {number} n - Non-negative integer
 * @return {number[]} - Array where ans[i] is the number of 1's in binary of i
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) - excluding output array
 */
function solve(n) {
  const result = new Array(n + 1);
  result[0] = 0;

  // Dynamic programming approach
  // For any number i, the count of 1's is:
  // count[i] = count[i >> 1] + (i & 1)
  // i >> 1 removes the last bit, i & 1 checks if last bit is 1
  for (let i = 1; i <= n; i++) {
    result[i] = result[i >> 1] + (i & 1);
  }

  return result;
}

/**
 * Test cases for Problem 338: Counting
 */
function testSolution() {
  console.log("Testing 338. Counting");

  // Test case 1: Small input
  const result1 = solve(2);
  const expected1 = [0, 1, 1];
  const matches1 = JSON.stringify(result1) === JSON.stringify(expected1);
  console.assert(
    matches1,
    `Test 1 failed: expected [${expected1}], got [${result1}]`,
  );

  // Test case 2: Medium input
  const result2 = solve(5);
  const expected2 = [0, 1, 1, 2, 1, 2];
  const matches2 = JSON.stringify(result2) === JSON.stringify(expected2);
  console.assert(
    matches2,
    `Test 2 failed: expected [${expected2}], got [${result2}]`,
  );

  // Test case 3: Zero
  const result3 = solve(0);
  const expected3 = [0];
  const matches3 = JSON.stringify(result3) === JSON.stringify(expected3);
  console.assert(
    matches3,
    `Test 3 failed: expected [${expected3}], got [${result3}]`,
  );

  // Test case 4: Power of 2
  const result4 = solve(8);
  const expected4 = [0, 1, 1, 2, 1, 2, 2, 3, 1];
  const matches4 = JSON.stringify(result4) === JSON.stringify(expected4);
  console.assert(
    matches4,
    `Test 4 failed: expected [${expected4}], got [${result4}]`,
  );

  console.log("All test cases passed for 338. Counting!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 338. Counting ===");
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
