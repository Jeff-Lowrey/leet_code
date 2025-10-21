/**
 * # Difficulty: Medium
 *
 * # 371. Sum of Two Integers
 *
 * Given two integers a and b, return the sum of the two integers without using the operators + and -.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>a = 1, b = 2</dd>
 * <dt>Output:</dt>
 * <dd>3 (1 + 2)</dd>
 * <dt>Explanation:</dt>
 * <dd>Sum of 1+2 is 3 without using + or - operators</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n)
**Space Complexity**: * O(1)

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
 * Input: a = 1, b = 2
 * Step 1: Add without carry
 *   sum = a ^ b = 001 ^ 010 = 011 = 3
 *
 * Step 2: Calculate carry
 *   carry = (a & b) << 1 = (001 & 010) << 1 = 000 << 1 = 0
 *
 * Step 3: Since carry = 0, done
 *
 * Example with carry: a = 3, b = 5
 *   sum = 3 ^ 5 = 011 ^ 101 = 110 = 6
 *   carry = (3 & 5) << 1 = (011 & 101) << 1 = 001 << 1 = 010 = 2
 *   Repeat: sum = 6 ^ 2 = 110 ^ 010 = 100 = 4
 *   carry = (6 & 2) << 1 = (110 & 010) << 1 = 010 << 1 = 100 = 4
 *   Repeat: sum = 4 ^ 4 = 000 = 0, carry = (4 & 4) << 1 = 1000 = 8
 *
 * Output: 3 (1 + 2)
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
 * Main solution for Problem 371: Sum of Two Integers
 *
 * @param {number} a - First integer
 * @param {number} b - Second integer
 * @return {number} - Sum of a and b without using + or -
 *
 * Time Complexity: O(1) - limited by 32-bit integer size
 * Space Complexity: O(1)
 */
function solve(a, b) {
  // Use XOR for addition without carry
  // Use AND + left shift for carry
  while (b !== 0) {
    // Calculate carry
    const carry = (a & b) << 1;

    // Sum without carry
    a = a ^ b;

    // Update b to carry
    b = carry;
  }

  return a;
}

/**
 * Test cases for Problem 371: Sum
 */
function testSolution() {
  console.log("Testing 371. Sum");

  // Test case 1: Basic positive numbers
  const result1 = solve(1, 2);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: One zero
  const result2 = solve(2, 0);
  const expected2 = 2;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Both zeros
  const result3 = solve(0, 0);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Negative and positive
  const result4 = solve(-1, 1);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Larger numbers
  const result5 = solve(20, 30);
  const expected5 = 50;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 371. Sum!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 371. Sum ===");
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
