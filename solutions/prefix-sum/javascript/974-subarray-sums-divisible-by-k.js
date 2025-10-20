/**
 *  Difficulty: Medium
 *
 * Given an integer array nums and an integer k, return the number of non-empty subarrays
 * that have a sum divisible by k.
 *
 * A subarray is a contiguous part of an array.
 *
 * Example:
 * Input: nums = [4,5,0,-2,-3,1], k = 5
 * Output: 7
 * Explanation: There are 7 subarrays with a sum divisible by k = 5:
 * [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [4,5,0,-2,-3,1], k = 5</dd>
 * <dt>Output:</dt>
 * <dd>7</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 7 subarrays with sum divisible by k=5</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Prefix Sum, Cumulative Sum
 * **Data Structures**: Array, Hash Map
 * **Patterns**: Prefix Sum Pattern, Subarray Sum
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(min(n, k))

 *
 * ### INTUITION:
 * Use prefix sum with modulo arithmetic. If two prefix sums have the same remainder
 * when divided by k, the subarray between them is divisible by k. Track remainder
 * frequencies in a hash map.
 *
 * ### APPROACH:
 * 1. **Hash Map**: Store (remainder → frequency) pairs
 * 2. **Prefix Sum**: Calculate cumulative sum modulo k
 * 3. **Count**: For each remainder, if seen before, add previous count (all pairs count)
 * 4. **Normalize**: Handle negative remainders by adding k
 *
 * ### WHY THIS WORKS:
 * If prefix[i] % k == prefix[j] % k, then sum(nums[i+1:j+1]) % k == 0.
 * For n occurrences of a remainder, there are n*(n-1)/2 pairs, but we count
 * incrementally: each new occurrence pairs with all previous occurrences.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * nums = [4,5,0,-2,-3,1], k = 5
 * Prefix sums: [4, 9, 9, 7, 4, 5]
 * Remainders: [4, 4, 4, 2, 4, 0]
 *
 * Initialize: {0: 1}  # remainder 0 before array
 * Index 0: rem=4, count=0 (not seen), add {0:1, 4:1}
 * Index 1: rem=4, count=1 (seen once), add {0:1, 4:2}
 * Index 2: rem=4, count=2 (seen twice), add {0:1, 4:3}
 * Index 3: rem=2, count=0 (not seen), add {0:1, 4:3, 2:1}
 * Index 4: rem=4, count=3 (seen 3 times), add {0:1, 4:4, 2:1}
 * Index 5: rem=0, count=1 (initial 0), add {0:2, 4:4, 2:1}
 * Total: 0+1+2+0+3+1 = 7
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(min(n, k))
 *
 * ### EDGE CASES:
 * - k = 1: All subarrays are divisible (return n*(n+1)/2)
 * - Negative numbers: Modulo normalization handles this
 * - Zero in array: Doesn't affect divisibility check
 *
 * </details>
 */

/**
 * Main solution for Problem 974: Subarray Sums Divisible By K
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Divisor
 * @return {number} - Number of subarrays with sum divisible by k
 *
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
function solve(nums, k) {
  // Map to store frequency of each remainder
  const remainderCount = new Map();
  remainderCount.set(0, 1); // Base case: remainder 0 appears once

  let prefixSum = 0;
  let count = 0;

  for (const num of nums) {
    prefixSum += num;

    // Calculate remainder (handle negative with + k)
    let remainder = prefixSum % k;
    if (remainder < 0) {
      remainder += k;
    }

    // If this remainder was seen before, all those positions
    // can form valid subarrays ending at current position
    if (remainderCount.has(remainder)) {
      count += remainderCount.get(remainder);
    }

    // Update frequency of current remainder
    remainderCount.set(remainder, (remainderCount.get(remainder) || 0) + 1);
  }

  return count;
}

/**
 * Test cases for Problem 974: Subarray Sums Divisible By K
 */
function testSolution() {
  console.log("Testing 974. Subarray Sums Divisible By K");

  // Test case 1: Example 1
  const result1 = solve([4, 5, 0, -2, -3, 1], 5);
  const expected1 = 7;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Simple case
  const result2 = solve([5], 5);
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: With negative numbers
  const result3 = solve([-1, 2, 9], 2);
  const expected3 = 2;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All elements divisible by k
  const result4 = solve([3, 6, 9], 3);
  const expected4 = 6;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: k = 1 (all subarrays valid)
  const result5 = solve([1, 2, 3], 1);
  const expected5 = 6;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 974. Subarray Sums Divisible By K!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 974. Subarray Sums Divisible By K ===");
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
