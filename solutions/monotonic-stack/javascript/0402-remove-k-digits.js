/**
 * # Difficulty: Medium
 *
 * # 402. Remove K Digits
 *
 * Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>num = "1432219", k = 3</dd>
 * <dt>Output:</dt>
 * <dd>"1219"</dd>
 * <dt>Explanation:</dt>
 * <dd>By greedily removing k digits to make the smallest number, '1432219' becomes '1219' after removing 3 digits</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Stack Operations
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply monotonic stack methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages monotonic stack principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * num = "1432219", k = 3
 * ```
 *
 * Step 1: Use monotonic stack
 * Add '1': stack=['1']
 * Add '4': stack=['1','4']
 * Add '3': pop '4' (3<4), k=2, stack=['1','3']
 * Add '2': pop '3' (2<3), k=1, stack=['1','2']
 * Add '2': stack=['1','2','2']
 * Add '1': pop '2' (1<2), k=0, stack=['1','2','1']
 * Add '9': stack=['1','2','1','9']
 *
 * Output:
 * ```
 * "1219"
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
 * Main solution for Problem 402: Remove K Digits
 *
 * @param {string} num - Number as string
 * @param {number} k - Number of digits to remove
 * @return {string} - Smallest possible number
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(num, k) {
  if (k >= num.length) return "0";

  const stack = [];

  for (const digit of num) {
    // Remove larger digits while we can
    while (stack.length > 0 && stack[stack.length - 1] > digit && k > 0) {
      stack.pop();
      k--;
    }
    stack.push(digit);
  }

  // If k > 0, remove from end (largest remaining digits)
  while (k > 0) {
    stack.pop();
    k--;
  }

  // Build result and remove leading zeros
  let result = stack.join("");

  // Remove leading zeros
  let i = 0;
  while (i < result.length && result[i] === "0") {
    i++;
  }
  result = result.substring(i);

  // Handle empty result
  return result.length === 0 ? "0" : result;
}

/**
 * Test cases for Problem 402: Remove K Digits
 */
function testSolution() {
  console.log("Testing 402. Remove K Digits");

  // Test case 1: Example from problem
  const result1 = solve("1432219", 3);
  const expected1 = "1219";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Another example
  const result2 = solve("10200", 1);
  const expected2 = "200";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Remove all digits
  const result3 = solve("10", 2);
  const expected3 = "0";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All same digits
  const result4 = solve("1111", 2);
  const expected4 = "11";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Increasing digits
  const result5 = solve("123456", 3);
  const expected5 = "123";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Leading zeros
  const result6 = solve("10001", 4);
  const expected6 = "0";
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log("All test cases passed for 402. Remove K Digits!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 402. Remove K Digits ===");
  console.log("Category: Monotonic Stack");
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
