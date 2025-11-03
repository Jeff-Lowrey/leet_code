/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that track current reach and farthest reach. When reach exhausted, must jump (increment jumps) and update reach to farthest. Greedy: always extend reach as far as possible before jumping.
 *
 * ### APPROACH:
 * 1. **Initialize variables**: Set jumps = 0, current_end = 0, farthest = 0
 * 2. **Iterate to second-last**: For i in range(len(nums) - 1)
 * 3. **Update farthest**: farthest = max(farthest, i + nums[i])
 * 4. **Reached current end**: If i == current_end, increment jumps
 * 5. **Extend range**: Set current_end = farthest
 * 6. **Continue jumping**: Process all positions
 * 7. **Return result**: Return jumps as minimum number of jumps
 *
 * ### WHY THIS WORKS:
 * - This ensures that bFS-like greedy: track current jump's reach and next jump's reach
 * - This ensures that increment jumps when reaching end of current jump's range
 * - This ensures that update next reach as maximum of (i + nums[i]) for all i in current range
 * - This ensures that guaranteed to reach end, so count minimum jumps needed
 * - This ensures that o(n) time: single pass, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [2,3,1,1,4]
 * ```
 *
 * Step 1: Initialize variables
 * jumps = 0, current_end = 0, farthest = 0
 * Step 2: Iterate through array
 * i=0: farthest = max(0, 0+2) = 2
 *
 * Steps:
 * Step 1: i=1: farthest = max(2, 1+3) = 4, reached current_end → jumps=1, current_end=2
 * Step 2: i=2: farthest = max(4, 2+1) = 4, reached current_end → jumps=2, current_end=4
 * Step 3: Reached last index
 *
 * Output:
 * ```
 * 2 (minimum jumps)
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
  jump(nums: number[]): number {
    if (nums.length <= 1) return 0;

    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;

    for (let i = 0; i < nums.length - 1; i++) {
      farthest = Math.max(farthest, i + nums[i]);

      if (i === currentEnd) {
        jumps++;
        currentEnd = farthest;

        if (currentEnd >= nums.length - 1) {
          break;
        }
      }
    }

    return jumps;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.jump([2, 3, 1, 1, 4]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.jump([2, 3, 0, 1, 4]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.jump([1, 2, 3]) === 2 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
