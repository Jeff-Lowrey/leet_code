/**
 * # Difficulty: Medium
 *
 * # 376. Wiggle Subsequence
 *
 * A wiggle sequence is a sequence where the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with one element and a sequence with two non-equal elements are trivially wiggle sequences.
 *
 * Given an integer array nums, return the length of the longest wiggle subsequence of nums.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,7,4,9,2,5]</dd>
 * <dt>Output:</dt>
 * <dd>6 (longest wiggle sequence length)</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest wiggle subsequence in [1,7,4,9,2,5] has length 6</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * A wiggle occurs when direction changes (up->down or down->up). Greedily count direction changes by tracking previous difference sign. Skip equal consecutive numbers.
 *
 * ### APPROACH:
 * 1. **Handle edge cases**: If len(nums) < 2, return len(nums)
 * 2. **Initialize variables**: Set up = 1, down = 1
 * 3. **Iterate from second element**: For i in range(1, len(nums))
 * 4. **Check increasing**: If nums[i] > nums[i-1], up = down + 1
 * 5. **Check decreasing**: If nums[i] < nums[i-1], down = up + 1
 * 6. **Continue processing**: Update up and down for each element
 * 7. **Return result**: Return max(up, down)
 *
 * ### WHY THIS WORKS:
 * - Track up/down lengths: up[i] = longest wiggle ending with up, down[i] ending with down
 * - If nums[i] > nums[i-1]: up = down + 1 (extend down sequence with up)
 * - If nums[i] < nums[i-1]: down = up + 1 (extend up sequence with down)
 * - Greedy works: always extend appropriate sequence
 * - O(n) time, O(1) space with two variables
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,7,4,9,2,5]
 * Step 1: Track direction changes
 *   up = 1, down = 1
 *
 * Step 2: Process each adjacent pair
 *   1→7: increasing, up = down + 1 = 2
 *   7→4: decreasing, down = up + 1 = 3
 *   4→9: increasing, up = down + 1 = 4
 *   9→2: decreasing, down = up + 1 = 5
 *   2→5: increasing, up = down + 1 = 6
 *
 * Output: 6 (longest wiggle sequence length)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  wiggleMaxLength(nums: number[]): number {
    if (nums.length < 2) return nums.length;

    let prevDiff = 0;
    let count = 1;

    for (let i = 1; i < nums.length; i++) {
      const diff = nums[i] - nums[i - 1];

      if ((diff > 0 && prevDiff <= 0) || (diff < 0 && prevDiff >= 0)) {
        count++;
        prevDiff = diff;
      }
    }

    return count;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.wiggleMaxLength([1, 7, 4, 9, 2, 5]) === 6 ? "PASS" : "FAIL"}`);
  console.log(
    `Test 2: ${solution.wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8]) === 7 ? "PASS" : "FAIL"}`
  );
  console.log(`Test 3: ${solution.wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9]) === 2 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
