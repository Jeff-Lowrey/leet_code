/**
 * # Difficulty: Easy
 *
 * # 1051. Height Checker
 *
 *
 * A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Let this ordering be represented by the integer array expected where expected[i] is the expected height of the ith student in line.
 *
 * You are given an integer array heights representing the current order that the students are standing in. Each heights[i] is the height of the ith student in line (0-indexed).
 *
 * Return the number of indices where heights[i] != expected[i].
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Input: heights = [1,1,4,2,1,3]</dd>
 * <dt>Output:</dt>
 * <dd>Expected (sorted): [1,1,1,2,3,4]</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum swaps needed to sort students by height</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Sorting
 * **Data Structures**: Array
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * We need to compare the current order with the expected sorted order and count mismatches. The key insight is that the expected order is simply the current array sorted.
 *
 * ### APPROACH:
 * 1. **Create expected array**: Sort the current heights array
 * 2. **Compare arrays**: Count positions where current != expected
 * 3. **Return count**: Number of students in wrong positions
 *
 * ### WHY THIS WORKS:
 * - The expected order is the sorted version of current heights
 * - Any position where current[i] != sorted[i] needs adjustment
 * - Simple comparison gives us the mismatch count
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * heights = [1,1,4,2,1,3]
 * ```
 *
 * Expected (sorted): [1,1,1,2,3,4]
 * Compare:
 * Current:  [1,1,4,2,1,3]
 * Expected: [1,1,1,2,3,4]
 * Match:     ✓ ✓ ✗ ✓ ✗ ✗
 * Mismatches at indices: 2, 4, 5
 * Count: 3

 * ### TIME COMPLEXITY:
 * O(n log n)
 * - Sorting or divide-and-conquer
 * Due to sorting the array
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For the sorted expected array
 *
 * ### EDGE CASES:
 * - **Already sorted**: Return 0 (no mismatches)
 * - **Reverse sorted**: Return n (all positions wrong)
 * - **Single element**: Return 0 (trivially sorted)
 * - **All same heights**: Return 0 (any order is sorted)
 * - **Few elements out of place**: Count specific mismatches
 *
 * </details>
 */

class Solution {
  heightChecker(heights: number[]): number {
    const expected = [...heights].sort((a, b) => a - b);
    let mismatches = 0;

    for (let i = 0; i < heights.length; i++) {
      if (heights[i] !== expected[i]) {
        mismatches++;
      }
    }

    return mismatches;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.heightChecker([1, 1, 4, 2, 1, 3]);
  console.log(`Test 1: ${result1 === 3 ? "PASS" : "FAIL"}`);

  const result2 = solution.heightChecker([5, 1, 2, 3, 4]);
  console.log(`Test 2: ${result2 === 5 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
