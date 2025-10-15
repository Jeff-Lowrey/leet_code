/**
 * # Difficulty: Easy
 *
 * # 1991. Find The Middle Index In Array
 *
 * Given a 0-indexed integer array nums, find the leftmost middleIndex (i.e., the smallest amongst all the possible ones).
 *
 * A middleIndex is an index where nums[0] + nums[1] + ... + nums[middleIndex-1] == nums[middleIndex+1] + nums[middleIndex+2] + ... + nums[nums.length-1].
 *
 * If middleIndex == 0, the left side sum is considered to be 0. Similarly, if middleIndex == nums.length - 1, the right side sum is considered to be 0.
 *
 * Return the leftmost middleIndex that satisfies the condition, or -1 if there is no such index.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2,3,-1]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>The middle index is 3, where sum of elements to the left equals sum to the right</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This is a classic prefix sum problem. For any index to be the middle index, the sum of all elements to its left must equal the sum of all elements to its right. We can calculate the total sum first, then iterate through the array tracking the left sum. At each position, we can calculate the right sum as (total - left_sum - current_element).
 *
 * ### APPROACH:
 * 1. **Calculate total sum**: Get sum of entire array
 * 2. **Initialize left sum**: Start with 0 (no elements to the left initially)
 * 3. **Iterate through array**: For each index i:
 *    - Calculate right sum = total - left_sum - nums[i]
 *    - If left_sum == right_sum, return i
 *    - Add nums[i] to left_sum for next iteration
 * 4. **Return -1**: If no middle index found
 *
 * ### WHY THIS WORKS:
 * - At any index i: total_sum = left_sum + nums[i] + right_sum
 * - We want: left_sum = right_sum
 * - Therefore: right_sum = total_sum - left_sum - nums[i]
 * - By maintaining running left_sum, we can check each position in O(1)
 * - Single pass solution after calculating total sum
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [2,3,-1,8,4]
 * Total sum = 16
 *
 * Index 0: left=0, right=16-0-2=14, not equal
 * Index 1: left=2, right=16-2-3=11, not equal
 * Index 2: left=5, right=16-5-(-1)=12, not equal
 * Index 3: left=4, right=16-4-8=4, equal! Return 3
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Two passes: one to calculate total sum, one to find middle index
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * Only using constant extra space for variables
 *
 * ### EDGE CASES:
 * - Single element array (always middle index)
 * - All zeros
 * - No valid middle index exists
 * - Negative numbers in array
 * - Middle index at start or end
 *
 * </details>
 */

/**
 * Main solution for Problem 1991: Find The Middle Index In Array
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Middle index, or -1 if none exists
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
  // Calculate total sum
  const totalSum = nums.reduce((sum, num) => sum + num, 0);

  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    // Right sum = total - left - current
    const rightSum = totalSum - leftSum - nums[i];

    if (leftSum === rightSum) {
      return i;
    }

    // Add current element to left sum for next iteration
    leftSum += nums[i];
  }

  return -1;
}

/**
 * Test cases for Problem 1991: Find The Middle Index In Array
 */
function testSolution() {
  console.log("Testing 1991. Find The Middle Index In Array");

  // Test case 1: Example 1
  const result1 = solve([2, 3, -1, 8, 4]);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Example 2 - no middle index
  const result2 = solve([1, -1, 4]);
  const expected2 = 2;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Example 3 - first index is middle
  const result3 = solve([2, 5]);
  const expected3 = -1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single element
  const result4 = solve([1]);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: All zeros
  const result5 = solve([0, 0, 0]);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log(
    "All test cases passed for 1991. Find The Middle Index In Array!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1991. Find The Middle Index In Array ===");
  console.log("Category: Prefix Sum");
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
 * - This solution focuses on prefix sum concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
