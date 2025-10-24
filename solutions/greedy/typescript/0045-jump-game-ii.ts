/**
 * # Difficulty: Medium
 *
 * # 0045. Jump Game Ii
 *
 *
 * You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
 *
 * Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where 0 <= j <= nums[i] and i + j < n.
 *
 * Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2,3,1,1,4]</dd>
 * <dt>Output:</dt>
 * <dd>2</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum 2 jumps needed to reach end of [2,3,1,1,4]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Breadth-First Search
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Track current reach and farthest reach. When reach exhausted, must jump (increment jumps) and update reach to farthest. Greedy: always extend reach as far as possible before jumping.
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
 * - BFS-like greedy: track current jump's reach and next jump's reach
 * - Increment jumps when reaching end of current jump's range
 * - Update next reach as maximum of (i + nums[i]) for all i in current range
 * - Guaranteed to reach end, so count minimum jumps needed
 * - O(n) time: single pass, O(1) space
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
