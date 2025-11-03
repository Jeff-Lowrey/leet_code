/**
 * # Difficulty: Medium
 * 
 * # 0560. Subarray Sum Equals K
 * 
 * Given an array of integers nums and an integer k, return the total number of subarrays whose sum is equal to k.
 * 
 * A subarray is a contiguous non-empty sequence of elements within an array.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,1,1], k = 2</dd>
 * <dt>Output:</dt>
 * <dd>[1]</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 2 subarrays with sum equal to k: [1] and [2,-1,2]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n) - Additional hash map storage
 * 
 * ### INTUITION:
 * This is a classic prefix sum problem. The key insight is that if we know the prefix sum up to index i and up to index j (where j > i), then the sum of subarray from i+1 to j is: prefix_sum[j] - prefix_sum[i]. We can use a hashmap to store prefix sums and their frequencies to find subarrays with target sum efficiently.
 * 
 * ### APPROACH:
 * 1. **Use prefix sum**: Calculate running sum as we iterate
 * 2. **HashMap tracking**: Store frequency of each prefix sum seen
 * 3. **Target calculation**: For current prefix sum, check if (prefix_sum - k) exists
 * 4. **Count subarrays**: Add frequency of (prefix_sum - k) to result
 * 5. **Update map**: Increment frequency of current prefix sum
 * 
 * ### WHY THIS WORKS:
 * - If prefix_sum[j] - prefix_sum[i] = k, then prefix_sum[i] = prefix_sum[j] - k
 * - By storing prefix sum frequencies, we can quickly find how many times (prefix_sum - k) occurred
 * - Each occurrence represents a valid subarray ending at current position
 * - Running prefix sum allows single pass solution
 * 
 * ### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,1,1], k = 2
```

Index 0: sum=1, need=1-2=-1, count=0, map={0:1, 1:1}
Index 1: sum=2, need=2-2=0, count=1, map={0:1, 1:1, 2:1}
Index 2: sum=3, need=3-2=1, count=2, map={0:1, 1:1, 2:1, 3:1}
Result: 2 subarrays: [1,1] and [1,1]

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Single pass through the array with O(1) hashmap operations
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional hash map storage
 * HashMap can store up to n different prefix sums
 * 
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  /**
   * Count subarrays with sum equal to k using prefix sum and hashmap.
   *
   *         Args:
   *             nums: Array of integers
   *             k: Target sum
   *
   *         Returns:
   *             Number of subarrays with sum equal to k
   *
   *         Time Complexity: O(n) - single pass through array
   *         Space Complexity: O(n) - hashmap for prefix sums
   */
  subarraySum(nums: number[], k: number): number {
    // Implementation
    prefix_sum_count: dict[Any, int] = defaultdict(int)
    prefix_sum_count.set(0, 1  # Empty subarray has sum 0
    current_sum = 0
    count = 0
    for num in nums:
    current_sum += num
  }

  /**
   * Brute force solution checking all subarrays.
   *
   *         Args:
   *             nums: Array of integers
   *             k: Target sum
   *
   *         Returns:
   *             Number of subarrays with sum equal to k
   *
   *         Time Complexity: O(n²) - check all possible subarrays
   *         Space Complexity: O(1) - constant extra space
   */
  subarraySumBruteForce(nums: number[], k: number): number {
    // Implementation
    count = 0
    n = nums.length
    for (let i = 0; i < n; i++) {
    current_sum = 0
    for (let j = 0; j < i, n; j++) {
    current_sum += nums.get(j)
    if current_sum == k:
    count += 1
  }

  /**
   * Optimized solution with manual hashmap to avoid defaultdict import.
   *
   *         Args:
   *             nums: Array of integers
   *             k: Target sum
   *
   *         Returns:
   *             Number of subarrays with sum equal to k
   */
  subarraySumOptimized(nums: number[], k: number): number {
    // Implementation
    prefix_sum_count = {0: 1}  // Initialize with sum 0 having count 1
    current_sum = 0
    count = 0
    for num in nums:
    current_sum += num
    needed_sum = current_sum - k
  }

  /**
   * More detailed implementation with step-by-step logic.
   *
   *         Args:
   *             nums: Array of integers
   *             k: Target sum
   *
   *         Returns:
   *             Number of subarrays with sum equal to k
   */
  subarraySumDetailed(nums: number[], k: number): number {
    // Implementation
    result = 0
    prefix_sum = 0
    sum_frequency: dict[Any, Any] = {}
    sum_frequency.set(0, 1
    for (let i = 0; i < nums.length; i++) {
        const num = nums.get(i);
    prefix_sum += num
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
  console.log("=== 560. Subarray Sum Equals K ===")
  # Demonstrate with examples
  test_cases = [([1, 1, 1], 2), ([1, 2, 3], 3), ([1, -1, 0], 0), ([1], 1)]
  for nums, k in test_cases:
  result = solution.subarraySum(nums, k)
  console.log(`subarraySum(nums, {k}) -> result`)
  # Show detailed walkthrough
  console.log("\nDetailed example: nums=[1,1,1], k=2")
  nums, k = [1, 1, 1], 2
  console.log(`Array: nums, Target: {k}`)
  console.log("Prefix sums and valid subarrays:")
  prefix_sum = 0
  prefix_map = {0: 1}
  count = 0
  for (let i = 0; i < nums.length; i++) {
  const num = nums.get(i);
  prefix_sum += num
  needed = prefix_sum - k
  if (prefix_map.has(needed)) {
  count += prefix_map.get(needed)
  console.log(`Index {i}: sum={prefix_sum}, need={needed}, found {prefix_map.get(needed)} times`)
  else:
  console.log(`Index {i}: sum={prefix_sum}, need={needed}, not found`)
  prefix_map.set(prefix_sum, prefix_map.get(prefix_sum, 0) + 1
  console.log(`Total subarrays: {count}`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;