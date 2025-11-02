/**
 * # Difficulty: Medium
 *
 * # 0007. Reverse Integer
 *
 *
 * Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>x = 123</dd>
 * <dt>Output:</dt>
 * <dd>* 321</dd>
 * <dt>Explanation:</dt>
 * <dd>Reversed integer: 123 becomes 321</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal
 * **Data Structures**: Basic Types
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space

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
 * Input:
 * ```
 * x = 123
 * ```
 *
 * Step 1: Extract digits and build reversed number
 * result = 0
 * result = 0*10 + 3 = 3, x = 12
 * result = 3*10 + 2 = 32, x = 1
 * result = 32*10 + 1 = 321, x = 0
 *
 * Output:
 * ```
 * 321
 * ```

 * ### TIME COMPLEXITY:

 * O(n)

 * - Single pass through the input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 007: Reverse Integer
 *
 * @param {number} x - Integer to reverse
 * @return {number} - Reversed integer, or 0 if overflow occurs
 *
 * Time Complexity: O(log(x))
 * Space Complexity: O(1)
 */
function solve(x) {
  const INT_MAX = Math.pow(2, 31) - 1; // 2147483647
  const INT_MIN = -Math.pow(2, 31); // -2147483648

  let result = 0;
  let num = Math.abs(x);
  const isNegative = x < 0;

  while (num > 0) {
    const digit = num % 10;
    num = Math.floor(num / 10);

    // Check for overflow before adding the digit
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      return 0;
    }

    result = result * 10 + digit;
  }

  result = isNegative ? -result : result;

  // Final overflow check
  if (result > INT_MAX || result < INT_MIN) {
    return 0;
  }

  return result;
}

/**
 * Test cases for Problem 007: Reverse Integer
 */
function testSolution() {
  console.log("Testing 007. Reverse Integer");

  // Test case 1: Positive number
  const result1 = solve(123);
  const expected1 = 321;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Negative number
  const result2 = solve(-123);
  const expected2 = -321;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Number with trailing zeros
  const result3 = solve(120);
  const expected3 = 21;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Overflow case
  const result4 = solve(1534236469);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Single digit
  const result5 = solve(5);
  const expected5 = 5;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 007. Reverse Integer!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 007. Reverse ===");
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
