/**
 * # Difficulty: Medium
 *
 * # 268. Missing
 *
 * Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3,0,1]</dd>
 * <dt>Output:</dt>
 * <dd>2 (missing number)</dd>
 * <dt>Explanation:</dt>
 * <dd>Missing number in [3,0,1] is 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [This problem requires understanding of math concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply math methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages math principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [3,0,1]
 * Step 1: Calculate expected sum
 *   expected = 0+1+2+3 = 6
 *
 * Step 2: Calculate actual sum
 *   actual = 3+0+1 = 4
 *
 * Step 3: Find difference
 *   missing = 6 - 4 = 2
 *
 * Output: 2 (missing number)
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
 * Main solution for Problem 268: Missing Number (XOR approach)
 *
 * @param {number[]} nums - Array of n distinct numbers from [0, n]
 * @return {number} - The missing number
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
  const n = nums.length;
  let xor = 0;

  // XOR all indices from 0 to n
  for (let i = 0; i <= n; i++) {
    xor ^= i;
  }

  // XOR all values in the array
  for (const num of nums) {
    xor ^= num;
  }

  // The result is the missing number
  return xor;
}

/**
 * Alternative solution using mathematical sum
 *
 * @param {number[]} nums - Array of n distinct numbers from [0, n]
 * @return {number} - The missing number
 */
function solveWithSum(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

/**
 * Test cases for Problem 268: Missing Number
 */
function testSolution() {
  console.log("Testing 268. Missing Number");

  // Test case 1: Missing number in middle
  const result1 = solve([3, 0, 1]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Missing number is 0
  const result2 = solve([1, 2, 3]);
  const expected2 = 0;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Missing number is n
  const result3 = solve([0, 1, 2]);
  const expected3 = 3;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single element [0]
  const result4 = solve([0]);
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Single element [1]
  const result5 = solve([1]);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Larger array
  const result6 = solve([9, 6, 4, 2, 3, 5, 7, 0, 1]);
  const expected6 = 8;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test alternative sum approach
  const result7 = solveWithSum([3, 0, 1]);
  const expected7 = 2;
  console.assert(
    result7 === expected7,
    `Test 7 (sum approach) failed: expected ${expected7}, got ${result7}`,
  );

  console.log("All test cases passed for 268. Missing Number!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 268. Missing ===");
  console.log("Category: Math");
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
 * - This solution focuses on math concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
