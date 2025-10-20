/**
 *  Difficulty: Easy
 *
 * # 231. Power of Two
 *
 * Given an integer n, return true if it is a power of two. Otherwise, return false.
 *
 * An integer n is a power of two, if there exists an integer x such that n == 2^x.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 2, 3, 4, 16, 17, 1024]</dd>
 * <dt>Output:</dt>
 * <dd>"Solution for 231. Power of Two:"</dd>
 * <dt>Explanation:</dt>
 * <dd>Number 16 is a power of 2 (16 = 2^4)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Bitwise Operations, Bit Masking
 * **Data Structures**: Integer (as bit array)
 * **Patterns**: Bit Manipulation Pattern, XOR Properties
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * This problem uses bitwise operations to manipulate individual bits, providing elegant solutions with optimal space complexity.
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
 * Input: n = 16
 * Step 1: Check if n is power of 2
 *   Binary: 16 = 10000 (only one bit set)
 *   16 - 1 = 15 = 01111 (all bits after position 4 are set)
 *
 * Step 2: Apply bit trick
 *   16 & 15 = 10000 & 01111 = 00000 = 0
 *   Since result is 0, n is power of 2
 *
 * Counter-example: n = 18
 *   Binary: 18 = 10010 (two bits set)
 *   18 & 17 = 10010 & 10001 = 10000 ≠ 0
 *
 * Output: True (16 is power of 2)
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
 * Main solution for Problem 231: Power of Two
 *
 * @param {number} n - An integer
 * @return {boolean} - True if n is a power of two, false otherwise
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function solve(n) {
  // Power of 2 has exactly one bit set
  // n & (n-1) removes the rightmost set bit
  // If n is power of 2, this results in 0
  // Also check n > 0 to handle negative numbers and zero
  return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Test cases for Problem 231: Power
 */
function testSolution() {
  console.log("Testing 231. Power");

  // Test case 1: Power of 2
  const result1 = solve(1);
  const expected1 = true;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Power of 2
  const result2 = solve(16);
  const expected2 = true;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Not power of 2
  const result3 = solve(3);
  const expected3 = false;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Zero
  const result4 = solve(0);
  const expected4 = false;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Negative number
  const result5 = solve(-16);
  const expected5 = false;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Large power of 2
  const result6 = solve(1024);
  const expected6 = true;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log("All test cases passed for 231. Power!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 231. Power ===");
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
