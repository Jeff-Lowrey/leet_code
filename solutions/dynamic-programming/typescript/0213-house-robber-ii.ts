/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that houses are circular - can't rob both first and last. Run House Robber I twice: once on houses[0:n-1] and once on houses[1:n]. Take the maximum of both results.
 *
 * ### APPROACH:
 * 1. **Handle single house**: If len(nums) == 1, return nums[0]
 * 2. **Define helper function**: Create rob_linear(houses) to solve linear house robber problem
 * 3. **Case 1 - rob first**: Call rob_linear(nums[:-1]) to rob houses 0 to n-2 (exclude last)
 * 4. **Case 2 - rob last**: Call rob_linear(nums[1:]) to rob houses 1 to n-1 (exclude first)
 * 5. **Compare both cases**: Take maximum of the two results
 * 6. **Return maximum**: Return max(case1, case2) as the maximum money that can be robbed
 *
 * ### WHY THIS WORKS:
 * - This ensures that circular: robbing house 0 means can't rob house n-1 and vice versa
 * - This ensures that run house robber I twice: once on [0..n-2], once on [1..n-1]
 * - This ensures that take maximum of two results
 * - This ensures that handles circular constraint by excluding one of the boundary houses
 * - This ensures that o(n) time: two passes of O(n) each, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [2,3,2]
 * ```
 *
 * Step 1: Handle circular array
 *
 * Steps:
 * Step 1: Case 1: Rob houses [0:n-1] → [2,3] → max = 3
 * Step 2: Case 2: Rob houses [1:n] → [3,2] → max = 3
 * Step 3: Case 1 detail
 * Step 4: dp[0] = 2
 * Step 5: dp[1] = max(2, 3) = 3
 * Step 6: Case 2 detail
 * Step 7: dp[0] = 3
 * Step 8: dp[1] = max(3, 2) = 3
 *
 * Output:
 * ```
 * 3 (maximum money, rob middle house)
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
  rob(nums: number[]): number {
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    return Math.max(this.robRange(nums, 0, nums.length - 2), this.robRange(nums, 1, nums.length - 1));
  }

  private robRange(nums: number[], start: number, end: number): number {
    let prev = 0;
    let curr = 0;

    for (let i = start; i <= end; i++) {
      const temp = curr;
      curr = Math.max(curr, prev + nums[i]);
      prev = temp;
    }

    return curr;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.rob([2, 3, 2]) === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.rob([1, 2, 3, 1]) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.rob([1, 2, 3]) === 3 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
