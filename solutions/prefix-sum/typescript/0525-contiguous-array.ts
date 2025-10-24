/**
 * # 525. Contiguous Array
 *
 * # Difficulty: Medium
 *
 * Given a binary array nums, return the maximum length of a contiguous subarray
 * with an equal number of 0 and 1.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [0,1]</dd>
 * <dt>Output:</dt>
 * <dd>2</dd>
 * <dt>Explanation:</dt>
 * <dd>The longest contiguous subarray with equal 0s and 1s has length 2: [0,1] or [1,0]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n) - Additional hash map storage
 *
 * ### INTUITION:
 * Transform the problem: treat 0 as -1. Finding equal 0s and 1s is equivalent to
 * finding a subarray with sum 0. Use prefix sum with hash map to track when we've
 * seen each sum value before.
 *
 * ### APPROACH:
 * 1. **Transform**: Replace 0 with -1 in counting (not modifying array)
 * 2. **Prefix Sum**: Calculate cumulative count (treating 0 as -1)
 * 3. **Hash Map**: Store (sum → earliest_index) pairs
 * 4. **Check**: If same sum seen before, subarray between has sum 0 (equal 0s and 1s)
 *
 * ### WHY THIS WORKS:
 * If we treat 0 as -1, then a subarray with equal 0s and 1s will have sum 0.
 * Using prefix sums: if prefix[i] == prefix[j], then sum(nums[i+1:j+1]) == 0.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [0, 1, 0]
 * ```
 *
 * Transform to: [-1, 1, -1]
 * Prefix sums: [-1, 0, -1]
 * Index -1: sum 0 (initialize)
 * Index 0: sum -1, store {0: -1, -1: 0}
 * Index 1: sum 0, seen at index -1, length = 1 - (-1) = 2
 * Index 2: sum -1, seen at index 0, length = 2 - 0 = 2
 * Maximum length = 2

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 *
 * ### EDGE CASES:
 * - All 0s or all 1s: No equal subarray (return 0)
 * - Already balanced: Entire array is valid
 * - Empty array: Return 0
 * - Single element: Cannot have equal 0s and 1s
 *
 * </details>
 */

class Solution {
  /**
   * Prefix sum with hash map (treat 0 as -1).
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  findMaxLength(nums: number[]): number {
    const countMap: Map<number, number> = new Map([[0, -1]]);
    let maxLength = 0;
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
      count += nums[i] === 1 ? 1 : -1;

      if (countMap.has(count)) {
        maxLength = Math.max(maxLength, i - countMap.get(count)!);
      } else {
        countMap.set(count, i);
      }
    }

    return maxLength;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.findMaxLength([0, 1]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.findMaxLength([0, 1, 0]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.findMaxLength([0, 0, 0]) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.findMaxLength([1, 1, 1]) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.findMaxLength([0, 1, 1, 0]) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.findMaxLength([0, 1, 0, 1, 1, 0, 0]) === 6 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
