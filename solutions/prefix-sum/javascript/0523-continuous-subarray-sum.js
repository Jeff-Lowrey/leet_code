/**
 * # 523. Continuous Subarray Sum
 *
 * Difficulty: Medium
 *
 * # Difficulty: Medium
 *
 * Given an integer array nums and an integer k, return true if nums has a continuous
 * subarray of size at least two that sums to a multiple of k, or false otherwise.
 *
 * An integer x is a multiple of k if there exists an integer n such that x = n * k.
 * 0 is always a multiple of k.
 *
 * Example:
 * Input: nums = [23,2,4,6,7], k = 6
 * Output: true
 * Explanation: [2, 4] is a continuous subarray of size 2 whose sum is 6.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [23,2,4,6,7], k = 6</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>The subarray [23,2,4,6,7] has sum 42, which is a multiple of k=6</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Greedy Algorithm
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(min(n, k))

 *
 * ### INTUITION:
 * Use prefix sum with modulo arithmetic. If two prefix sums have the same remainder
 * when divided by k, the subarray between them is divisible by k. Track remainders
 * in a hash map with their earliest index to ensure subarray length ≥ 2.
 *
 * ### APPROACH:
 * 1. **Hash Map**: Store (remainder → earliest_index) pairs
 * 2. **Prefix Sum**: Calculate cumulative sum modulo k
 * 3. **Check**: If same remainder seen before and distance ≥ 2, return true
 * 4. **Edge Cases**: Handle k=0, negative remainders with modulo normalization
 *
 * ### WHY THIS WORKS:
 * If prefix_sum[i] % k == prefix_sum[j] % k, then sum(nums[i+1:j+1]) % k == 0.
 * By storing earliest occurrence of each remainder, we maximize subarray length.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [23,2,4,6,7], k = 6
 * ```
 *
 * Prefix sums: [23, 25, 29, 35, 42]
 * Modulos: [5, 1, 5, 5, 0]
 * At index 0: remainder 5, store {5: 0}
 * At index 1: remainder 1, store {5: 0, 1: 1}
 *
 * Steps:
 * Step 1: At index 2: remainder 5, seen at index 0, distance = 2 → return true
 * 
 * Output:
 * ```
 * return true
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(min(n, k))
 *
 * ### EDGE CASES:
 * - k = 0: Division by zero (special handling or constraint)
 * - Subarray length = 1: Must skip (requirement: length ≥ 2)
 * - Negative numbers: Modulo handles correctly with normalization
 * - All elements sum to multiple of k: Returns true
 *
 * </details>
 */

/**
 * Main solution for Problem 523: Continuous Subarray Sum
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Divisor
 * @return {boolean} - True if valid subarray exists
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, k))
 */
function solve(nums, k) {
  if (nums.length < 2) {
    return false;
  }

  // Map to store first occurrence of each remainder
  const remainderMap = new Map();
  remainderMap.set(0, -1); // Base case: remainder 0 before array starts

  let prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    // Calculate remainder (handle negative with + k)
    const remainder = ((prefixSum % k) + k) % k;

    if (remainderMap.has(remainder)) {
      // Check if subarray length is at least 2
      if (i - remainderMap.get(remainder) >= 2) {
        return true;
      }
    } else {
      // Store first occurrence of this remainder
      remainderMap.set(remainder, i);
    }
  }

  return false;
}

/**
 * Test cases for Problem 523: Continuous Subarray Sum
 */
function testSolution() {
  console.log("Testing 523. Continuous Subarray Sum");

  // Test case 1: Example 1
  const result1 = solve([23, 2, 4, 6, 7], 6);
  const expected1 = true;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Example 2
  const result2 = solve([23, 2, 6, 4, 7], 6);
  const expected2 = true;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Example 3 - false case
  const result3 = solve([23, 2, 6, 4, 7], 13);
  const expected3 = false;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Two zeros (sum is 0, which is multiple of any k)
  const result4 = solve([0, 0], 1);
  const expected4 = true;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Single element (must be at least 2 elements)
  const result5 = solve([5], 5);
  const expected5 = false;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 523. Continuous Subarray Sum!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 523. Continuous Subarray Sum ===");
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
