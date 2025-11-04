/**
 * ### METADATA:
 * **Techniques**: Backtracking, Recursion
 * **Data Structures**: Array, List
 * **Time Complexity**: O(N^(T/M)) where T is target, M is minimum value
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
 * - This ensures that backtracking explores all possible combinations systematically
 * - This ensures that sorting allows early termination when candidate > remaining sum
 * - This ensures that using start index prevents duplicate combinations
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
 *
 * Output:
 * ```
 * [Expected output]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(N^(T/M))** - where N is the number of candidates, T is the target value, and M is the minimal candidate value. In the worst case, we explore a tree where each node has N choices (all candidates), and the maximum depth is T/M (when we repeatedly pick the smallest candidate). The number of nodes in this tree is bounded by N^(T/M). For each complete combination, we perform **O(T/M)** work to copy it. This gives us **O(N^(T/M)** × (T/M)) total time, but the N^(T/M) term dominates.
 *
 * ### SPACE COMPLEXITY:
 * **O(T/M)** - where T is the target and M is the minimal candidate value. The recursion call stack depth is at most T/M levels (when we repeatedly use the smallest candidate to reach the target). The current combination list can grow to size at most T/M. The result list is not counted as it's required output. Total auxiliary space: **O(T/M)** for recursion stack + **O(T/M)** for current combination = **O(T/M)**.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
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
