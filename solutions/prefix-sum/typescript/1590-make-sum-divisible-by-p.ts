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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(min(n, p))
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

class Solution {
  /**
   * Find length of smallest subarray to remove to make sum divisible by p.
   *
   *         Args:
   *             nums: Array of positive integers
   *             p: Divisor
   *
   *         Returns:
   *             Length of smallest subarray to remove, or -1 if impossible
   *
   *         Time Complexity: O(n) - single pass through array
   *         Space Complexity: O(min(n, p)) - hashmap for prefix remainders
   */
  minSubarray(nums: number[], p: number): number {
    // Implementation
    n = nums.length
    total_sum = sum(nums)
    target_remainder = total_sum % p
    if target_remainder == 0:
    return 0
    remainder_map = {0: -1}  # Base case: empty prefix has remainder 0
  }

  /**
   * Alternative implementation with detailed comments.
   *
   *         Args:
   *             nums: Array of positive integers
   *             p: Divisor
   *
   *         Returns:
   *             Length of smallest subarray to remove, or -1 if impossible
   */
  minSubarrayAlternative(nums: number[], p: number): number {
    // Implementation
    n = nums.length
    total = sum(nums)
    remainder = total % p
    if remainder == 0:
    return 0
    mod_index = {0: -1}
  }

  /**
   * Brute force solution for verification (TLE on large inputs).
   *
   *         Args:
   *             nums: Array of positive integers
   *             p: Divisor
   *
   *         Returns:
   *             Length of smallest subarray to remove, or -1 if impossible
   *
   *         Time Complexity: O(n²) - check all subarrays
   *         Space Complexity: O(1) - constant extra space
   */
  minSubarrayBruteForce(nums: number[], p: number): number {
    // Implementation
    n = nums.length
    total = sum(nums)
    if total % p == 0:
    return 0
    min_length = n
    for (let i = 0; i < n; i++) {
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log("=== 1590. Make Sum Divisible By P ===")
  # Demonstrate with examples
  test_cases = [([3, 1, 4, 2], 6), ([6, 3, 5, 2], 9), ([1, 2, 3], 3), ([1, 2, 3], 7)]
  for nums, p in test_cases:
  result = solution.minSubarray(nums, p)
  total = sum(nums)
  console.log(`minSubarray({nums}, p={p}) -> {result} (total={total}, remainder={total % p})`)
  # Show detailed walkthrough
  console.log("\nDetailed example: nums=[3,1,4,2], p=6")
  nums, p = [3, 1, 4, 2], 6
  total = sum(nums)
  target = total % p
  console.log(`Array: {nums}, p={p}`)
  console.log(`Total sum: {total}, target remainder to remove: {target}`)
  console.log("\nPrefix remainders:")
  remainder_map = {0: -1}
  prefix = 0
  min_len = nums.length
  for (let i = 0; i < nums.length; i++) {
  const num = nums.get(i);
  prefix += num
  curr_rem = prefix % p
  need_rem = (curr_rem - target) % p
  if (remainder_map.has(need_rem)) {
  length = i - remainder_map.get(need_rem)
  console.log(
  f"Index {i}: prefix_sum={prefix}, remainder={curr_rem}, need={need_rem}, found at {remainder_map.get(need_rem)}, length={length}"
  )
  min_len = min(min_len, length)
  else:
  console.log(`Index {i}: prefix_sum={prefix}, remainder={curr_rem}, need={need_rem}, not found`)
  remainder_map.set(curr_rem, i
  console.log(`\nMinimum length: {min_len if min_len < nums.length else -1}`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;