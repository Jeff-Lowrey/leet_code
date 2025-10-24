/**
 * # Difficulty: Medium
 *
 * # 260. Single Number III
 *
 * Difficulty: Medium
 *
 * Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.
 *
 * You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,2,1,3,2,5]</dd>
 * <dt>Output:</dt>
 * <dd>[3, 5] (two single numbers)</dd>
 * <dt>Explanation:</dt>
 * <dd>Two numbers [3,5] appear once in [1,2,1,3,2,5]</dd>
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
 * Input:
 * ```
 * nums = [1,2,1,3,2,5]
 * ```
 *
 * Step 1: XOR all numbers
 * xor = 1^2^1^3^2^5 = 3^5 = 6 (binary: 110)
 * Step 2: Find rightmost set bit
 * rightmost_bit = xor & -xor = 110 & 010 = 010 (bit 1)
 * Step 3: Partition numbers by rightmost bit
 *
 * Steps:
 * Step 1: Group 1 (bit 1 is 0): [1,1,5] → XOR = 5
 * Step 2: Group 2 (bit 1 is 1): [2,3,2] → XOR = 3
 *
 * Output:
 * ```
 * [3, 5] (two single numbers)
 * ```

### TIME COMPLEXITY:
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
 * Main solution for Problem 260: Single Number III
 *
 * @param {number[]} nums - Array where two elements appear once, rest appear twice
 * @return {number[]} - Array of the two single numbers
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
  // Step 1: XOR all numbers to get XOR of the two unique numbers
  let xor = 0;
  for (const num of nums) {
    xor ^= num;
  }

  // Step 2: Find a bit that is set in xor (differs between the two numbers)
  // This isolates the rightmost set bit
  const rightmostBit = xor & -xor;

  // Step 3: Separate numbers into two groups based on this bit
  let num1 = 0;
  let num2 = 0;

  for (const num of nums) {
    if (num & rightmostBit) {
      num1 ^= num;
    } else {
      num2 ^= num;
    }
  }

  return [num1, num2];
}

/**
 * Test cases for Problem 260: Single
 */
function testSolution() {
  console.log("Testing 260. Single");

  // Test case 1: Basic case
  const result1 = solve([1, 2, 1, 3, 2, 5]);
  const expected1 = [3, 5];
  const matches1 =
    (result1.includes(3) && result1.includes(5)) ||
    (result1[0] === 5 && result1[1] === 3);
  console.assert(matches1, `Test 1 failed: expected [3, 5], got [${result1}]`);

  // Test case 2: Negative numbers
  const result2 = solve([-1, 0]);
  const matches2 = result2.includes(-1) && result2.includes(0);
  console.assert(matches2, `Test 2 failed: expected [-1, 0], got [${result2}]`);

  // Test case 3: Mix of positives
  const result3 = solve([1, 2, 3, 4, 1, 2]);
  const matches3 = result3.includes(3) && result3.includes(4);
  console.assert(matches3, `Test 3 failed: expected [3, 4], got [${result3}]`);

  // Test case 4: Large numbers
  const result4 = solve([100, 200, 100, 300]);
  const matches4 = result4.includes(200) && result4.includes(300);
  console.assert(
    matches4,
    `Test 4 failed: expected [200, 300], got [${result4}]`,
  );

  console.log("All test cases passed for 260. Single!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 260. Single ===");
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
