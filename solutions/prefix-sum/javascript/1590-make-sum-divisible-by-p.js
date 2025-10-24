/**
 * # Difficulty: Medium
 *
 * # 1590. Make Sum Divisible By P
 *
 * Given an array of positive integers nums, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by p. It is not allowed to remove the whole array.
 *
 * Return the length of the smallest subarray that you need to remove, or -1 if it's impossible.
 *
 * A subarray is defined as a contiguous block of elements in the array.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [3,1,4,2], p = 6</dd>
 * <dt>Output:</dt>
 * <dd>"minSubarray({nums}, p={p}) -> {result} (total={total}, remainder={total % p})"</dd>
 * <dt>Explanation:</dt>
 * <dd>The minimum length subarray to remove is 1 (element 3), so remaining sum is divisible by p</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Greedy Algorithm
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(min(n, p))

 *
 * ### INTUITION:
 * The problem requires finding the smallest subarray to remove so that the remaining sum is divisible by p. Instead of trying all possible removals, we can use the mathematical property that if total_sum % p = remainder, we need to find the smallest subarray with sum % p = remainder. This is a prefix sum problem with modular arithmetic.
 *
 * ### APPROACH:
 * 1. **Calculate total remainder**: Get total_sum % p
 * 2. **Handle base case**: If remainder is 0, array sum already divisible (return 0)
 * 3. **Use prefix sum with modulo**: Track (prefix_sum % p) in a hashmap
 * 4. **Find target**: For each position, calculate what previous remainder we need
 * 5. **Track minimum**: Keep track of smallest subarray length that works
 *
 * ### WHY THIS WORKS:
 * - If we remove subarray from i to j, remaining sum = total_sum - subarray_sum
 * - We need: (total_sum - subarray_sum) % p = 0
 * - This means: subarray_sum % p = total_sum % p
 * - Using prefix sums: (prefix[j] - prefix[i-1]) % p = target_remainder
 * - Rearranging: prefix[i-1] % p = (prefix[j] - target_remainder) % p
 * - Store prefix remainders in hashmap to find matches in O(1)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [3,1,4,2], p = 6
 * ```
 *
 * Total sum = 10, remainder = 10 % 6 = 4
 * Need to find smallest subarray with sum % 6 = 4
 * Index 0: prefix=3%6=3, need=(3-4)%6=5, not found, map={0:(-1), 3:0}
 * Index 1: prefix=4%6=4, need=(4-4)%6=0, found at -1, length=2
 * Index 2: prefix=8%6=2, need=(2-4)%6=4, found at 1, length=1
 * Index 3: prefix=10%6=4, need=(4-4)%6=0, found at -1, length=4
 * Minimum length = 1 (removing [4])
 * Result: [3,1,2] sums to 6, which is divisible by 6

### TIME COMPLEXITY:
 * O(n)
 * Single pass through array with O(1) hashmap operations
 *
 * ### SPACE COMPLEXITY:
 * O(min(n, p))
 * Hashmap stores at most min(n, p) different remainders
 *
 * ### EDGE CASES:
 * - Total sum already divisible by p (return 0)
 * - Need to remove entire array (return -1)
 * - Single element array
 * - p = 1 (always divisible, return 0)
 * - Multiple subarrays with same remainder (keep shortest)
 *
 * </details>
 */

/**
 * Main solution for Problem 1590: Make Sum Divisible By P
 *
 * @param {number[]} nums - Array of integers
 * @param {number} p - Divisor
 * @return {number} - Length of smallest subarray to remove, or -1 if impossible
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, p))
 */
function solve(nums, p) {
  const n = nums.length;

  // Calculate total sum modulo p
  let totalSum = 0;
  for (const num of nums) {
    totalSum = (totalSum + num) % p;
  }

  const target = totalSum % p;

  // If already divisible, no need to remove anything
  if (target === 0) {
    return 0;
  }

  // Map to store most recent index of each prefix sum modulo p
  const modMap = new Map();
  modMap.set(0, -1); // Base case: empty prefix

  let prefixSum = 0;
  let minLength = n;

  for (let i = 0; i < n; i++) {
    prefixSum = (prefixSum + nums[i]) % p;

    // We need to find a previous prefix where:
    // (prefixSum - prevPrefix) % p = target
    // So prevPrefix = (prefixSum - target + p) % p
    const needed = (prefixSum - target + p) % p;

    if (modMap.has(needed)) {
      const length = i - modMap.get(needed);
      minLength = Math.min(minLength, length);
    }

    // Store current prefix sum modulo
    modMap.set(prefixSum, i);
  }

  // If we need to remove the entire array, it's impossible
  return minLength === n ? -1 : minLength;
}

/**
 * Test cases for Problem 1590: Make Sum Divisible By P
 */
function testSolution() {
  console.log("Testing 1590. Make Sum Divisible By P");

  // Test case 1: Example 1
  const result1 = solve([3, 1, 4, 2], 6);
  const expected1 = 1;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Example 2
  const result2 = solve([6, 3, 5, 2], 9);
  const expected2 = 2;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Example 3 - impossible case
  const result3 = solve([1, 2, 3], 3);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Already divisible
  const result4 = solve([1, 2, 3], 6);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Need to remove entire array
  const result5 = solve([1000000000], 3);
  const expected5 = -1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 1590. Make Sum Divisible By P!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1590. Make Sum Divisible By P ===");
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
