/**
 * # Difficulty: Medium
 *
 * # 643. Maximum Average Subarray I
 *
 * Difficulty: Medium
 *
 * You are given an integer array nums consisting of n elements, and an integer k.
 *
 * Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10^-5 will be accepted.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,12,-5,-6,50,3], k = 4</dd>
 * <dt>Output:</dt>
 * <dd>12.75 (maximum average)</dd>
 * <dt>Explanation:</dt>
 * <dd>The maximum average of subarray of length k=4 is 12.75</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Sliding Window Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use sliding window of size k. Calculate sum of first window. Then slide: subtract left element, add right element. Track maximum sum. Divide by k for average.
 *
 * ### APPROACH:
 * 1. **Calculate first window**: Compute sum of first k elements as current_sum
 * 2. **Initialize maximum**: Set max_sum = current_sum
 * 3. **Slide window**: For i from k to len(nums)
 * 4. **Update window sum**: current_sum = current_sum - nums[i-k] + nums[i]
 * 5. **Update maximum**: max_sum = max(max_sum, current_sum)
 * 6. **Continue sliding**: Process all possible windows
 * 7. **Calculate average**: Return max_sum / k
 *
 * ### WHY THIS WORKS:
 * - Fixed-size sliding window of length k
 * - Initial window: sum first k elements
 * - Slide: add nums[i+k], remove nums[i] for each position
 * - Track maximum sum seen, divide by k at end for average
 * - O(n) time: single pass with constant work per element, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,12,-5,-6,50,3], k = 4
 * ```
 *
 * Step 1: Calculate first window sum
 * sum = 1+12+(-5)+(-6) = 2, avg = 0.5
 * Step 2: Slide window
 * sum = 2-1+50 = 51, avg = 12.75
 * sum = 51-12+3 = 42, avg = 10.5
 *
 * Output:
 * ```
 * 12.75 (maximum average)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
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

class Solution {
  /**
   * Find maximum average of subarray of length k.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  findMaxAverage(nums: number[], k: number): number {
    let currentSum = 0;

    for (let i = 0; i < k; i++) {
      currentSum += nums[i];
    }

    let maxSum = currentSum;

    for (let i = k; i < nums.length; i++) {
      currentSum = currentSum - nums[i - k] + nums[i];
      maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum / k;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.findMaxAverage([1, 12, -5, -6, 50, 3], 4) === 12.75 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.findMaxAverage([5], 1) === 5 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.findMaxAverage([0, 4, 0, 3, 2], 1) === 4 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
