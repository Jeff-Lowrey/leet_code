/**
 * # Difficulty: Medium
 *
 * # 0039. Combination Sum
 *
 *
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen numbers sum to target.
 * You may return the combinations in any order.
 *
 * The same number may be chosen from candidates an unlimited number of times.
 * Two combinations are unique if the frequency of at least one of the chosen numbers is different.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>candidates = [2,3,6,7], target = 7</dd>
 * <dt>Output:</dt>
 * <dd>[[2,2,3], [7]]</dd>
 * <dt>Explanation:</dt>
 * <dd>All combinations summing to 7 using [2,3,6,7] are [[2,2,3], [7]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Sorting
 * **Data Structures**: Array, Matrix
 * **Patterns**: Hash Table Pattern, Backtracking
 * **Time Complexity**: O(N^(T/M))
 * **Space Complexity**: O(T/M)
 *
 * ### INTUITION:
 * This is a classic backtracking problem where we need to find all combinations that sum to target.
 * Since numbers can be reused unlimited times, we explore each candidate multiple times.
 *
 * ### APPROACH:
 * 1. **Sort candidates**: For optimization and early termination
 * 2. **Use backtracking**: Build combinations incrementally
 * 3. **Two choices per element**: Include it (allowing reuse) or skip it
 * 4. **Base cases**: Sum equals target (valid) or exceeds target (invalid)
 *
 * ### WHY THIS WORKS:
 * - Backtracking explores all possible combinations systematically
 * - Sorting allows early termination when candidate > remaining sum
 * - Using start index prevents duplicate combinations
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * candidates = [2,3,6,7], target = 7
 * ```
 *
 * Combinations found: [[2,2,3], [7]]
 *
 * Steps:
 * Step 1: - Try 2: [2] -> remaining=5, try 2 again: [2,2] -> remaining=3, try 3: [2,2,3] ✓
 * Step 2: - Try 7: [7] -> remaining=0 ✓

 * ### TIME COMPLEXITY:
 * O(N^(T/M))
 * Where N=len(candidates), T=target, M=minimal candidate value
 *
 * ### SPACE COMPLEXITY:
 * O(T/M)
 * For recursion depth and storing combinations
 *
 * ### EDGE CASES:
 * - Target = 0: return [[]]
 * - No valid combinations: return []
 * - Single candidate equals target: return [[candidate]]
 *
 * </details>
 */

class Solution {
  /**
   * Find all unique combinations of numbers that sum up to the target.
   *
   * Time Complexity: O(N^(T/M))
   * Space Complexity: O(T/M) for recursion depth
   */
  combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];

    const backtrack = (remain: number, combo: number[], start: number): void => {
      if (remain === 0) {
        // Found a valid combination
        result.push([...combo]);
        return;
      }

      for (let i = start; i < candidates.length; i++) {
        // Skip if the current number is too large
        if (candidates[i] > remain) {
          continue;
        }

        // Include the current number in combination
        combo.push(candidates[i]);
        // Recursively find combinations with the remaining sum
        backtrack(remain - candidates[i], combo, i);
        // Remove the number to try other combinations
        combo.pop();
      }
    };

    // Sort candidates to optimize and handle cases more efficiently
    candidates.sort((a, b) => a - b);
    backtrack(target, [], 0);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.combinationSum([2, 3, 6, 7], 7);
  console.log(`Test 1: ${result1.length > 0 ? "PASS" : "FAIL"}`);

  const result2 = solution.combinationSum([2, 3, 5], 8);
  console.log(`Test 2: ${result2.length > 0 ? "PASS" : "FAIL"}`);

  const result3 = solution.combinationSum([2], 3);
  console.log(`Test 3: ${result3.length === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
