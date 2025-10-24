/**
 * # Difficulty: Easy
 *
 * # 0136. Single Number
 *
 *
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
 *
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2,2,1]</dd>
 * <dt>Output:</dt>
 * <dd>1 (the single number)</dd>
 * <dt>Explanation:</dt>
 * <dd>The single number 4 appears once in [2,2,1,4,1] (all others appear twice)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal
 * **Data Structures**: Array
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * This is a classic bit manipulation problem. The key insight is that XOR has special properties:
 * - a ^ a = 0 (any number XORed with itself is 0)
 * - a ^ 0 = a (any number XORed with 0 is itself)
 * - XOR is commutative and associative
 *
 * So if we XOR all numbers together, the duplicates cancel out, leaving only the single number.
 *
 * ### APPROACH:
 * 1. **Initialize result**: Start with 0
 * 2. **XOR all elements**: XOR each number with the result
 * 3. **Return result**: The final value is the single number
 *
 * ### WHY THIS WORKS:
 * - Duplicate numbers cancel out: a ^ a = 0
 * - XOR with 0 preserves the value: a ^ 0 = a
 * - Order doesn't matter due to commutativity
 * - All duplicates disappear, leaving only the single number
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [2,2,1]
 * ```
 *
 * Step 1: result = 0
 * Step 2: result = 0 ^ 2 = 2
 * Step 3: result = 2 ^ 2 = 0 (duplicate cancels out)
 * Step 4: result = 0 ^ 1 = 1
 *
 * Output:
 * ```
 * 1 (the single number)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Single pass through the array
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only using constant extra space
 *
 * ### EDGE CASES:
 * - Single element array
 * - Large arrays with many duplicates
 * - Negative numbers (XOR works the same)
 *
 * </details>
 */

/**
 * Main solution for Problem 136: Single Number
 *
 * @param {number[]} nums - Array of integers where every element appears twice except one
 * @return {number} - The single number that appears only once
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
  let result = 0;

  // XOR all numbers together
  // Duplicate pairs will cancel out to 0
  for (const num of nums) {
    result ^= num;
  }

  return result;
}

/**
 * Test cases for Problem 136: Single Number
 */
function testSolution() {
  console.log("Testing 136. Single Number");

  // Test case 1: Basic case with odd positioned single
  const result1 = solve([2, 2, 1]);
  const expected1 = 1;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Single number at different position
  const result2 = solve([4, 1, 2, 1, 2]);
  const expected2 = 4;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single element array
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

  // Test case 5: Larger numbers
  const result5 = solve([1000, 999, 1000]);
  const expected5 = 999;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 136. Single Number!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 136. Single Number ===");
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
