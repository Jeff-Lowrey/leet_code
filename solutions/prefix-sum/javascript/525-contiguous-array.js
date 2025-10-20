/**
 *  Difficulty: Medium
 *
 * Given a binary array nums, return the maximum length of a contiguous subarray
 * with an equal number of 0 and 1.
 *
 * Example:
 * Input: nums = [0,1]
 * Output: 2
 * Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [0,1]</dd>
 * <dt>Output:</dt>
 * <dd>2</dd>
 * <dt>Explanation:</dt>
 * <dd>The longest contiguous subarray with equal 0s and 1s has length 2: [0,1] or [1,0]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Prefix Sum, Cumulative Sum
 * **Data Structures**: Array, Hash Map
 * **Patterns**: Prefix Sum Pattern, Subarray Sum
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(n)

 *
 * ### INTUITION:
 * Transform the problem: treat 0 as -1. Finding equal 0s and 1s is equivalent to
 * finding a subarray with sum 0. Use prefix sum with hash map to track when we've
 * seen each sum value before.
 *
 * ### APPROACH:
 * 1. **Transform**: Replace 0 with -1 in counting (not modifying array)
 * 2. **Prefix Sum**: Calculate cumulative count (treating 0 as -1)
 * 3. **Hash Map**: Store (sum → earliest_index) pairs
 * 4. **Check**: If same sum seen before, subarray between has sum 0 (equal 0s and 1s)
 *
 * ### WHY THIS WORKS:
 * If we treat 0 as -1, then a subarray with equal 0s and 1s will have sum 0.
 * Using prefix sums: if prefix[i] == prefix[j], then sum(nums[i+1:j+1]) == 0.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * nums = [0, 1, 0]
 * Transform to: [-1, 1, -1]
 * Prefix sums: [-1, 0, -1]
 *
 * Index -1: sum 0 (initialize)
 * Index 0: sum -1, store {0: -1, -1: 0}
 * Index 1: sum 0, seen at index -1, length = 1 - (-1) = 2
 * Index 2: sum -1, seen at index 0, length = 2 - 0 = 2
 * Maximum length = 2
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 *
 * ### EDGE CASES:
 * - All 0s or all 1s: No equal subarray (return 0)
 * - Already balanced: Entire array is valid
 * - Empty array: Return 0
 * - Single element: Cannot have equal 0s and 1s
 *
 * </details>
 */

/**
 * Main solution for Problem 525: Contiguous Array
 *
 * @param {number[]} nums - Binary array (0s and 1s)
 * @return {number} - Length of longest contiguous subarray
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  // Map to store first occurrence of each cumulative sum
  const sumIndexMap = new Map();
  sumIndexMap.set(0, -1); // Base case: sum 0 before array starts

  let sum = 0;
  let maxLength = 0;

  for (let i = 0; i < nums.length; i++) {
    // Treat 0 as -1, 1 as +1
    sum += nums[i] === 0 ? -1 : 1;

    if (sumIndexMap.has(sum)) {
      // Found a subarray with equal 0s and 1s
      const length = i - sumIndexMap.get(sum);
      maxLength = Math.max(maxLength, length);
    } else {
      // Store first occurrence of this sum
      sumIndexMap.set(sum, i);
    }
  }

  return maxLength;
}

/**
 * Test cases for Problem 525: Contiguous Array
 */
function testSolution() {
  console.log("Testing 525. Contiguous Array");

  // Test case 1: Example 1
  const result1 = solve([0, 1]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Example 2
  const result2 = solve([0, 1, 0]);
  const expected2 = 2;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Longer array
  const result3 = solve([0, 1, 1, 0, 1, 1, 1, 0]);
  const expected3 = 4;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All zeros
  const result4 = solve([0, 0, 0]);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: All ones
  const result5 = solve([1, 1, 1]);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 525. Contiguous Array!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 525. Contiguous Array ===");
  console.log("Category: Prefix Sum");
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
 * - This solution focuses on prefix sum concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
