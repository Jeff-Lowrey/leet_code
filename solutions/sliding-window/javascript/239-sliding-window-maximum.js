/**
 *  Difficulty: Medium
 *
 * # 239. Sliding Window Maximum
 *
 * You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
 *
 * Return the max sliding window.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,3,-1,-3,5,3,6,7], k = 3</dd>
 * <dt>Output:</dt>
 * <dd>[3,3,5,5,6,7]</dd>
 * <dt>Explanation:</dt>
 * <dd>The maximum value in each sliding window of size 3 is [3,3,5,5,6,7]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Sliding Window, Two Pointers
 * **Data Structures**: Array, Hash Map, Deque
 * **Patterns**: Sliding Window Pattern, Window Expansion/Contraction
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * This problem uses a sliding window to maintain a subset of elements that satisfy certain conditions, enabling linear time complexity.
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply sliding window methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages sliding window principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Step 1: Use deque to track indices
 *   Window [1,3,-1]: max=3
 *   Window [3,-1,-3]: max=3
 *   Window [-1,-3,5]: max=5
 *   Window [-3,5,3]: max=5
 *   Window [5,3,6]: max=6
 *   Window [3,6,7]: max=7
 *
 * Output: [3,3,5,5,6,7]
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
 * Main solution for Problem 239: Sliding Window Maximum
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Window size
 * @return {number[]} - Array of maximums for each window
 *
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
function solve(nums, k) {
  if (!nums || nums.length === 0 || k <= 0) return [];
  if (k === 1) return nums;
  if (k >= nums.length) return [Math.max(...nums)];

  const result = [];
  const deque = []; // Stores indices

  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside current window from front
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // Remove indices of smaller elements from back
    // They can never be maximum in any future window
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    // Add current index to deque
    deque.push(i);

    // Add maximum to result once we have a full window
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

/**
 * Test cases for Problem 239: Sliding Window Maximum
 */
function testSolution() {
  console.log("Testing 239. Sliding Window Maximum");

  // Helper function to compare arrays
  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((val, idx) => val === b[idx]);

  // Test case 1: Basic example
  const result1 = solve([1, 3, -1, -3, 5, 3, 6, 7], 3);
  const expected1 = [3, 3, 5, 5, 6, 7];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected [${expected1}], got [${result1}]`,
  );
  console.log(`Test 1 passed: nums=[1,3,-1,-3,5,3,6,7], k=3 -> [${result1}]`);

  // Test case 2: Window size 1
  const result2 = solve([1, 2, 3, 4], 1);
  const expected2 = [1, 2, 3, 4];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected [${expected2}], got [${result2}]`,
  );
  console.log(`Test 2 passed: nums=[1,2,3,4], k=1 -> [${result2}]`);

  // Test case 3: Window equals array length
  const result3 = solve([1, 3, 5, 2, 4], 5);
  const expected3 = [5];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected [${expected3}], got [${result3}]`,
  );
  console.log(`Test 3 passed: nums=[1,3,5,2,4], k=5 -> [${result3}]`);

  // Test case 4: All elements same
  const result4 = solve([5, 5, 5, 5], 2);
  const expected4 = [5, 5, 5];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected [${expected4}], got [${result4}]`,
  );
  console.log(`Test 4 passed: nums=[5,5,5,5], k=2 -> [${result4}]`);

  // Test case 5: Decreasing array
  const result5 = solve([9, 8, 7, 6, 5], 3);
  const expected5 = [9, 8, 7];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected [${expected5}], got [${result5}]`,
  );
  console.log(`Test 5 passed: nums=[9,8,7,6,5], k=3 -> [${result5}]`);

  // Test case 6: Increasing array
  const result6 = solve([1, 2, 3, 4, 5], 3);
  const expected6 = [3, 4, 5];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected [${expected6}], got [${result6}]`,
  );
  console.log(`Test 6 passed: nums=[1,2,3,4,5], k=3 -> [${result6}]`);

  // Test case 7: Single element
  const result7 = solve([7], 1);
  const expected7 = [7];
  console.assert(
    arraysEqual(result7, expected7),
    `Test 7 failed: expected [${expected7}], got [${result7}]`,
  );
  console.log(`Test 7 passed: nums=[7], k=1 -> [${result7}]`);

  // Test case 8: Negative numbers
  const result8 = solve([-7, -8, 7, 5, 7, 1, 6, 0], 4);
  const expected8 = [7, 7, 7, 7, 7];
  console.assert(
    arraysEqual(result8, expected8),
    `Test 8 failed: expected [${expected8}], got [${result8}]`,
  );
  console.log(`Test 8 passed: nums=[-7,-8,7,5,7,1,6,0], k=4 -> [${result8}]`);

  console.log("All test cases passed for 239. Sliding Window Maximum!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 239. Sliding Window Maximum ===");
  console.log("Category: Sliding Window");
  console.log("Difficulty: Hard");
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
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 * - Monotonic deque is a powerful technique for sliding window maximum/minimum problems
 */
