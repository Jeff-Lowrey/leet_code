/**
 * # Difficulty: Medium
 *
 * # 0066. Plus One
 *
 * Difficulty: Easy
 *
 * You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.
 *
 * Increment the large integer by one and return the resulting array of digits.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>digits = [1,2,3]</dd>
 * <dt>Output:</dt>
 * <dd>[1,2,4]
 * [1,0,0,0]</dd>
 * <dt>Explanation:</dt>
 * <dd>Array [1,2,9] plus one is [1,3,0]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

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
 * digits = [1,2,3]
 * ```
 *
 * Step 1: Add 1 from rightmost
 * digits[2] = 3+1 = 4, no carry
 * Example with carry: [9,9,9]
 *
 * Steps:
 * Step 1: digits[2] = 9+1 = 10 → 0, carry=1
 * Step 2: digits[1] = 9+1 = 10 → 0, carry=1
 * Step 3: digits[0] = 9+1 = 10 → 0, carry=1
 * Step 4: Insert 1 at front
 *
 * Output:
 * ```
 * [1,2,4]
 * [1,0,0,0]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
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
 * Main solution for Problem 066: Plus One
 *
 * @param {number[]} digits - Array of digits representing a number
 * @return {number[]} - Array of digits after adding one
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) excluding output
 */
function solve(digits) {
  const n = digits.length;

  // Start from the rightmost digit
  for (let i = n - 1; i >= 0; i--) {
    // If digit is less than 9, just add 1 and return
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    // Otherwise, set to 0 and continue (carry over)
    digits[i] = 0;
  }

  // If we're here, all digits were 9s
  // Need to prepend 1 to the array
  return [1, ...digits];
}

/**
 * Test cases for Problem 066: Plus One
 */
function testSolution() {
  console.log("Testing 066. Plus One");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => val === b[idx]);
  };

  // Test case 1: Basic increment
  const result1 = solve([1, 2, 3]);
  const expected1 = [1, 2, 4];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Carry needed
  const result2 = solve([1, 2, 9]);
  const expected2 = [1, 3, 0];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: All 9s
  const result3 = solve([9, 9, 9]);
  const expected3 = [1, 0, 0, 0];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single digit (not 9)
  const result4 = solve([5]);
  const expected4 = [6];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Single 9
  const result5 = solve([9]);
  const expected5 = [1, 0];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Multiple carries
  const result6 = solve([8, 9, 9]);
  const expected6 = [9, 0, 0];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log("All test cases passed for 066. Plus One!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 066. Plus ===");
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
