/**
 *  Difficulty: Easy
 *
 * Write a function that takes the binary representation of a positive integer and returns
 * the number of set bits it has (also known as the Hamming weight).
 *
 * Example:
 * Input: n = 11
 * Output: 3
 * Explanation: The input binary string 1011 has three set bits.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 11</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>Number 11 (binary 1011) has 3 set bits</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Bitwise Operations, Bit Masking
 * **Data Structures**: Integer (as bit array)
 * **Patterns**: Bit Manipulation Pattern, XOR Properties
 * **Time Complexity**: **O(k) where k is number of 1-bits
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * Use bit manipulation to count 1s. The key insight is `n & (n-1)` removes the rightmost
 * set bit, allowing us to count iterations until n becomes 0.
 *
 * ### APPROACH:
 * 1. **Brian Kernighan's Algorithm**: n & (n-1) flips rightmost 1-bit to 0
 * 2. **Count iterations**: Each operation removes one 1-bit
 * 3. **Terminate**: When n becomes 0, all 1-bits have been counted
 *
 * ### WHY THIS WORKS:
 * n-1 flips all bits after the rightmost 1 (including the 1 itself).
 * AND-ing with n keeps only the bits that were 1 in both, effectively removing that rightmost 1.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * n = 11 (binary: 1011)
 * Count = 0
 *
 * Iteration 1: n = 1011, n-1 = 1010
 * n & (n-1) = 1010, count = 1
 *
 * Iteration 2: n = 1010, n-1 = 1001
 * n & (n-1) = 1000, count = 2
 *
 * Iteration 3: n = 1000, n-1 = 0111
 * n & (n-1) = 0000, count = 3
 *
 * Result: 3
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(k) where k is number of 1-bits
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - **n = 0**: Return 0 (no 1 bits)
 * - **n = 1**: Return 1 (single 1 bit)
 * - **All bits are 1**: Return 32 for 32-bit integer
 * - **Single bit set**: Return 1
 * - **Power of 2**: Exactly one 1 bit
 *
 * </details>
 */

/**
 * Main solution for Problem 191: Number Of 1 Bits (Hamming Weight)
 *
 * @param {number} n - A 32-bit unsigned integer
 * @return {number} - The number of '1' bits
 *
 * Time Complexity: O(k) where k is the number of 1 bits
 * Space Complexity: O(1)
 */
function solve(n) {
  let count = 0;

  // Brian Kernighan's Algorithm
  // n & (n-1) clears the least significant 1 bit
  while (n !== 0) {
    n &= n - 1;
    count++;
  }

  return count;
}

/**
 * Test cases for Problem 191: Number Of 1 Bits
 */
function testSolution() {
  console.log("Testing 191. Number Of 1 Bits");

  // Test case 1: Three 1 bits
  const result1 = solve(0b00000000000000000000000000001011);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Single 1 bit
  const result2 = solve(0b00000000000000000000000010000000);
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Many 1 bits
  const result3 = solve(0b11111111111111111111111111111101);
  const expected3 = 31;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Zero
  const result4 = solve(0);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: All ones
  const result5 = solve(0xffffffff);
  const expected5 = 32;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 191. Number Of 1 Bits!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 191. Number Of 1 Bits ===");
  console.log("Category: Bit Manipulation");
  console.log("Difficulty: Easy");
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
