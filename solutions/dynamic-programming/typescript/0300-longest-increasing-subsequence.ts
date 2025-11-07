/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that for each number, find the longest increasing subsequence ending at that number. dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]. The answer is max(dp).
 *
 * ### APPROACH:
 * 1. **Initialize DP array**: Create dp = [1] * len(nums) where dp[i] = LIS length ending at index i
 * 2. **Iterate through array**: For each position i from 1 to len(nums)
 * 3. **Check previous elements**: For each j from 0 to i-1
 * 4. **Find increasing pairs**: If nums[j] < nums[i], we can extend subsequence ending at j
 * 5. **Update DP value**: Set dp[i] = max(dp[i], dp[j] + 1) for all valid j
 * 6. **Track maximum length**: Keep running maximum of all dp values
 * 7. **Return result**: Return max(dp) as the length of longest increasing subsequence
 *
 * ### WHY THIS WORKS:
 * - This ensures that dP: dp[i] = length of LIS ending at i
 * - This ensures that for each i, check all j < i: if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1)
 * - This ensures that binary search optimization: maintain increasing tails array, binary search for insertion point
 * - This ensures that tails[i] = smallest ending value of LIS of length i+1
 * - This ensures that o(n^2) DP solution, O(n log n) with binary search, O(n) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [10, 9, 2, 5, 3, 7, 101, 18]
 * ```
 *
 * Step 1: num=10
 * tails = [10]
 * Step 2: num=9
 * 9 < 10, replace: tails = [9]
 * Step 3: num=2
 * 2 < 9, replace: tails = [2]
 * Step 4: num=5
 * 5 > 2, append: tails = [2, 5]
 * Step 5: num=3
 * 3 > 2 but 3 < 5, replace 5
 * tails = [2, 3]
 * Step 6: num=7
 * 7 > 3, append: tails = [2, 3, 7]
 * Step 7: num=101
 * 101 > 7, append: tails = [2, 3, 7, 101]
 * Step 8: num=18
 * 18 > 7 but 18 < 101, replace 101
 * tails = [2, 3, 7, 18]
 *
 * Output:
 * ```
 * 4 (LIS: [2, 3, 7, 18] or [2, 3, 7, 101])
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 */

class Solution {
  lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0;

    const dp = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
    }

    return Math.max(...dp);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.lengthOfLIS([0, 1, 0, 3, 2, 3]) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.lengthOfLIS([7, 7, 7, 7, 7, 7, 7]) === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
