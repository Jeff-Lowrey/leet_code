/**
 * # Difficulty: Medium
 *
 * # 416. Partition Equal Subset Sum
 *
 * Difficulty: Medium
 *
 * Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,5,11,5]</dd>
 * <dt>Output:</dt>
 * <dd>True (can partition into equal subsets)</dd>
 * <dt>Explanation:</dt>
 * <dd>Array [1,5,11,5] can be partitioned into [1,5,5] and [11] with equal sum 11</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Dynamic Programming
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * This is 0/1 knapsack with target = sum/2. Check if sum is odd (impossible to partition). Use DP to find if any subset sums to target. dp[i][j] = can we sum to j using first i elements.
 *
 * ### APPROACH:
 * 1. **Calculate total sum**: Compute total_sum = sum(nums)
 * 2. **Check feasibility**: If total_sum is odd, return False (cannot split into equal halves)
 * 3. **Define target**: Set target = total_sum // 2 (need subset summing to this)
 * 4. **Initialize DP set**: Create dp = {0} to track all possible subset sums
 * 5. **Iterate through numbers**: For each num in nums
 * 6. **Update possible sums**: For each sum in current dp, add (sum + num) to new_dp
 * 7. **Check for target**: If target in dp, return True; otherwise continue
 * 8. **Return result**: After processing all numbers, return target in dp
 *
 * ### WHY THIS WORKS:
 * - Partition problem: find subset with sum = total_sum // 2
 * - 0/1 knapsack DP: dp[i][j] = can we make sum j using first i elements
 * - Transition: dp[i][j] = dp[i-1][j] (exclude) or dp[i-1][j-nums[i]] (include)
 * - Space optimization: 1D DP array, iterate backwards to avoid overwriting
 * - O(n * sum) time, O(sum) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,5,11,5]
 * ```
 *
 * Step 1: Calculate target
 * sum = 22, target = 11
 * Step 2: DP subset sum
 * dp[0] = True
 * Process 1: dp[1] = True
 * Process 5: dp[5] = True, dp[6] = True
 * Process 11: dp[11] = True, dp[16] = True, dp[12] = True
 * Process 5: dp[11] already True
 * Step 3: Verify partition
 * Subset 1: [1, 5, 5] = 11
 * Subset 2: [11] = 11
 *
 * Output:
 * ```
 * True (can partition into equal subsets)
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
  canPartition(nums: number[]): boolean {
    const totalSum = nums.reduce((acc, num) => acc + num, 0);

    if (totalSum % 2 !== 0) return false;

    const target = totalSum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
      for (let j = target; j >= num; j--) {
        dp[j] = dp[j] || dp[j - num];
      }
    }

    return dp[target];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.canPartition([1, 5, 11, 5]) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.canPartition([1, 2, 3, 5]) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.canPartition([1, 2, 5]) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
