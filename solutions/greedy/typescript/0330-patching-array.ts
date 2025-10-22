/**
 * # Difficulty: Hard
 *
 * # 330. Patching Array
 *
 * You are given a sorted positive integer array nums and an integer n. You need to
 * make it so that any integer in the range [1, n] can be formed by the sum of some
 * elements from nums.
 *
 * Return the minimum number of patches (additions to the array) required.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,3], n = 6</dd>
 * <dt>Output:</dt>
 * <dd>1 (patched with 2)</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum 1 patch [3] needed to cover range [1,2,4] to sum 6</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Greedy Selection
 * **Data Structures**: Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(m + log n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * The key insight is tracking what range [1, covered] we can currently form. If we
 * can form [1, covered], and we have a number x where x <= covered + 1, then adding
 * x extends our range to [1, covered + x]. If x > covered + 1, we have a gap and
 * need to patch with (covered + 1).
 *
 * ### APPROACH:
 * 1. **Track coverage**: Maintain the maximum number we can currently build
 * 2. **Use available numbers**: If nums[i] <= covered + 1, use it to extend coverage
 * 3. **Patch when needed**: If nums[i] > covered + 1, patch with (covered + 1)
 * 4. **Greedy choice**: Always patch with (covered + 1) as it doubles our coverage
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,3], n = 6
 *
 * covered = 0, patches = 0
 *
 * Step 1: 1 <= 0+1? Yes → covered = 0+1 = 1
 *         Can now form: [1,1]
 *
 * Step 2: 3 <= 1+1? No (3 > 2) → Need patch!
 *         Patch with 2, patches = 1
 *         covered = 1 + 2 = 3
 *         Can now form: [1,3]
 *
 * Step 3: 3 <= 3+1? Yes → covered = 3+3 = 6
 *         Can now form: [1,6]
 *
 * Step 4: covered >= 6, done!
 *
 * Output: 1 (patched with 2)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m + log n)
 * Where m is length of nums. In worst case, we need log(n) patches.
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * Only using constant extra space
 *
 * ### EDGE CASES:
 * - Empty array: Need to patch from 1 up to n
 * - Array already covers [1,n]: No patches needed
 * - Large n with small array: Multiple patches required
 * - Array starts with value > 1: Need to patch 1 first
 *
 * </details>
 */

class Solution {
  minPatches(nums: number[], n: number): number {
    let patches = 0;
    let miss = 1;
    let i = 0;

    while (miss <= n) {
      if (i < nums.length && nums[i] <= miss) {
        miss += nums[i];
        i++;
      } else {
        miss += miss;
        patches++;
      }
    }

    return patches;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.minPatches([1, 3], 6) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.minPatches([1, 5, 10], 20) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.minPatches([1, 2, 2], 5) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
