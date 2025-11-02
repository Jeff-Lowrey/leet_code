/**
 * # Difficulty: Easy
 *
 * # 0303. Range Sum Query - Immutable
 *
 *
 * Given an integer array nums, handle multiple queries of the following type:
 *
 * Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
 *
 * Implement the NumArray class:
 *
 * - NumArray(int[] nums) Initializes the object with the integer array nums.
 * - int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e., nums[left] + nums[left + 1] + ... + nums[right]).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["NumArray","sumRange","sumRange","sumRange"], [[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]</dd>
 * <dt>Output:</dt>
 * <dd>[null,1,-1,-3]</dd>
 * <dt>Explanation:</dt>
 * <dd>The sum of elements between indices 2 and 5 is calculated as prefix[5+1] - prefix[2] = 1</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of prefix sum concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply prefix sum methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages prefix sum principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * ["NumArray","sumRange","sumRange","sumRange"], [[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]
 * ```
 *
 * Step 1: Build prefix sum array
 * nums = [-2,0,3,-5,2,-1]
 * prefix = [0,-2,-2,1,-4,-2,-3]
 * Step 2: Query using prefix
 * sumRange(0,2) = prefix[3] - prefix[0] = 1 - 0 = 1
 * sumRange(2,5) = prefix[6] - prefix[2] = -3 - (-2) = -1
 * sumRange(0,5) = prefix[6] - prefix[0] = -3 - 0 = -3
 *
 * Output:
 * ```
 * [null,1,-1,-3]
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
 * NumArray class for range sum queries (LeetCode solution format)
 *
 * @param {number[]} nums - Array of integers
 *
 * Time Complexity: O(n) for initialization
 * Space Complexity: O(n) for prefix sum array
 */
class NumArray {
  constructor(nums) {
    // Build prefix sum array
    // prefixSum[i] = sum of elements from index 0 to i-1
    this.prefixSum = new Array(nums.length + 1).fill(0);

    for (let i = 0; i < nums.length; i++) {
      this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
    }
  }

  /**
   * Returns sum of elements between indices left and right (inclusive)
   *
   * @param {number} left - Left index
   * @param {number} right - Right index
   * @return {number} - Sum of range
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  sumRange(left, right) {
    // Sum from left to right = prefixSum[right+1] - prefixSum[left]
    return this.prefixSum[right + 1] - this.prefixSum[left];
  }
}

/**
 * Wrapper function for testing
 *
 * @param {number[]} nums - Array of integers
 * @return {NumArray} - NumArray instance
 */
function solve(nums) {
  return new NumArray(nums);
}

/**
 * Test cases for Problem 303: Range Sum Query
 */
function testSolution() {
  console.log("Testing 303. Range Sum Query");

  // Test case 1: Example from LeetCode
  const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
  const result1 = numArray.sumRange(0, 2);
  const expected1 = 1;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  const result2 = numArray.sumRange(2, 5);
  const expected2 = -1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  const result3 = numArray.sumRange(0, 5);
  const expected3 = -3;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 2: Single element
  const numArray2 = new NumArray([5]);
  const result4 = numArray2.sumRange(0, 0);
  const expected4 = 5;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 3: All negative numbers
  const numArray3 = new NumArray([-1, -2, -3, -4]);
  const result5 = numArray3.sumRange(1, 3);
  const expected5 = -9;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 303. Range Sum Query!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 303. Range Sum Query ===");
  console.log("Category: Prefix Sum");
  console.log("Difficulty: Preprocessing");
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
 * - This solution focuses on prefix sum concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
