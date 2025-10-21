/**
 * # Difficulty: Medium
 *
 * # 053. Maximum Subarray
 *
 * Given an integer array nums, find the subarray with the largest sum, and return its sum.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[-2, 1, -3, 4, -1, 2, 1, -5, 4]</dd>
 * <dt>Output:</dt>
 * <dd>6 (subarray [4, -1, 2, 1])</dd>
 * <dt>Explanation:</dt>
 * <dd>Maximum subarray sum of [-2,1,-3,4,-1,2,1,-5,4] is 6 from [4,-1,2,1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of dynamic programming concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply dynamic programming methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages dynamic programming principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 *
 * Step 1: Initialize
 *   current_sum = -2, max_sum = -2
 *
 * Step 2: num=1
 *   current_sum = max(1, -2+1) = max(1, -1) = 1
 *   max_sum = max(-2, 1) = 1
 *
 * Step 3: num=-3
 *   current_sum = max(-3, 1-3) = max(-3, -2) = -2
 *   max_sum = 1
 *
 * Step 4: num=4
 *   current_sum = max(4, -2+4) = max(4, 2) = 4
 *   max_sum = max(1, 4) = 4
 *
 * Step 5: num=-1
 *   current_sum = max(-1, 4-1) = 3
 *   max_sum = 4
 *
 * Step 6: num=2
 *   current_sum = max(2, 3+2) = 5
 *   max_sum = max(4, 5) = 5
 *
 * Step 7: num=1
 *   current_sum = max(1, 5+1) = 6
 *   max_sum = max(5, 6) = 6
 *
 * Step 8: num=-5
 *   current_sum = max(-5, 6-5) = 1
 *   max_sum = 6
 *
 * Step 9: num=4
 *   current_sum = max(4, 1+4) = 5
 *   max_sum = 6
 *
 * Output: 6 (subarray [4, -1, 2, 1])
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
 * Main solution for Problem 53: Maximum Subarray using Kadane's Algorithm
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum sum of contiguous subarray
 *
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(1) - constant extra space
 */
function solve(nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  // Initialize with first element
  let currentSum = nums[0];
  let maxSum = nums[0];

  // Iterate through remaining elements
  for (let i = 1; i < nums.length; i++) {
    // At each step: start new subarray OR extend current subarray
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    // Update maximum sum found so far
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

/**
 * Alternative DP solution with explicit state tracking
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum sum of contiguous subarray
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for DP array
 */
function solveWithDP(nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  // dp[i] represents max subarray sum ending at index i
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either start new subarray at i, or extend previous subarray
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    maxSum = Math.max(maxSum, dp[i]);
  }

  return maxSum;
}

/**
 * Solution that also returns the actual subarray indices
 *
 * @param {number[]} nums - Array of integers
 * @return {object} - {sum, start, end} of maximum subarray
 */
function solveWithIndices(nums) {
  if (!nums || nums.length === 0) {
    return { sum: 0, start: 0, end: 0 };
  }

  let currentSum = nums[0];
  let maxSum = nums[0];
  let start = 0,
    end = 0,
    tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    if (currentSum < 0) {
      currentSum = nums[i];
      tempStart = i;
    } else {
      currentSum += nums[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return { sum: maxSum, start, end };
}

/**
 * Test cases for Problem 53: Maximum Subarray
 */
function testSolution() {
  console.log("Testing 53. Maximum Subarray");

  // Test case 1: Basic example
  const result1 = solve([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  const expected1 = 6; // [4,-1,2,1]
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: All negative numbers
  const result2 = solve([-3, -2, -1, -4]);
  const expected2 = -1; // single element [-1]
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: All positive numbers
  const result3 = solve([1, 2, 3, 4, 5]);
  const expected3 = 15; // entire array
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single element
  const result4 = solve([5]);
  const expected4 = 5;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Mixed with zero
  const result5 = solve([-1, 0, 1]);
  const expected5 = 1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test DP approach
  const result6 = solveWithDP([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  console.assert(
    result6 === expected1,
    `Test 6 failed: DP approach should give same result`,
  );

  // Test with indices
  const result7 = solveWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  console.assert(
    result7.sum === 6 && result7.start === 3 && result7.end === 6,
    `Test 7 failed: indices should be start=3, end=6`,
  );

  console.log("All test cases passed for 53. Maximum Subarray!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 53. Maximum Subarray ===");
  console.log("Category: Dynamic Programming");
  console.log("Difficulty: Medium");
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  solveWithDP,
  solveWithIndices,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Kadane's Algorithm is the optimal solution for this problem
 * - The key insight: at each position, decide to start fresh or continue
 * - This is a fundamental DP problem that appears in many variations
 * - Understanding this pattern helps with other subarray problems
 */
