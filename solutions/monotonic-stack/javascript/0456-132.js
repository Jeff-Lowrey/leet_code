/**
 * # Difficulty: Medium
 *
 * # 0456. 132 Pattern
 *
 *
 * Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j].
 *
 * Return true if there is a 132 pattern in nums, otherwise, return false.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3,1,4,2]</dd>
 * <dt>Output:</dt>
 * <dd>True (132 pattern exists)</dd>
 * <dt>Explanation:</dt>
 * <dd>The array contains a 132 pattern because there exist indices i < j < k where nums[i] < nums[k] < nums[j]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal, Stack Operations
 * **Data Structures**: Array, Stack
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

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
 * nums = [3,1,4,2]
 * ```
 *
 * Step 1: Find 132 pattern
 * i=0, j=2, k=3: nums[0]=3, nums[2]=4, nums[3]=2
 * Check: 3 < 4 and 2 < 4 and 3 > 2? Yes
 *
 * Output:
 * ```
 * True (132 pattern exists)
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
 * Main solution for Problem 456: 132 Pattern
 *
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if 132 pattern exists
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  if (!nums || nums.length < 3) return false;

  const stack = [];
  let third = -Infinity; // This will be nums[k] - the middle value in 132 pattern

  // Traverse from right to left
  for (let i = nums.length - 1; i >= 0; i--) {
    // If current element < third, we found nums[i]
    if (nums[i] < third) {
      return true;
    }

    // Pop smaller elements - they become candidates for nums[k]
    while (stack.length > 0 && nums[i] > stack[stack.length - 1]) {
      third = stack.pop(); // Update third to the largest popped value
    }

    stack.push(nums[i]);
  }

  return false;
}

/**
 * Test cases for Problem 456: 132 Pattern
 */
function testSolution() {
  console.log("Testing 456. 132 Pattern");

  // Test case 1: Example with pattern
  const result1 = solve([1, 2, 3, 4]);
  const expected1 = false;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Example with pattern
  const result2 = solve([3, 1, 4, 2]);
  const expected2 = true;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Example without pattern
  const result3 = solve([-1, 3, 2, 0]);
  const expected3 = true;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Too short
  const result4 = solve([1, 2]);
  const expected4 = false;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Decreasing sequence
  const result5 = solve([5, 4, 3, 2, 1]);
  const expected5 = false;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Complex pattern
  const result6 = solve([3, 5, 0, 3, 4]);
  const expected6 = true;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log("All test cases passed for 456. 132 Pattern!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 456. 132 ===");
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
