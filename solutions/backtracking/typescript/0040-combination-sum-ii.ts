/**
 * # Difficulty: Medium
 *
 * # 040. Combination Sum Ii
 *
 * Difficulty: Easy
 *
 * Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
 *
 * Each number in candidates may only be used once in the combination.
 *
 * Note: The solution set must not contain duplicate combinations.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>candidates = [10,1,2,7,6,1,5], target = 8</dd>
 * <dt>Output:</dt>
 * <dd>[[1,1,6],[1,2,5],[1,7],[2,6]]</dd>
 * <dt>Explanation:</dt>
 * <dd>All unique combinations summing to 8 from [10,1,2,7,6,1,5] are [[1,1,6],[1,2,5],[1,7],[2,6]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Sort the candidates first to handle duplicates. During backtracking, skip duplicate elements at the same recursion level by checking if nums[i] == nums[i-1] and i > start. Each number can only be used once, so advance the index by 1 after including a number.
 *
 * ### APPROACH:
 * 1. **Sort candidates**: Sort candidates array to group duplicates together for easy skipping
 * 2. **Initialize result**: Create empty result list and current combination list
 * 3. **Define backtrack function**: Create recursive function with parameters (start, current, remaining_target)
 * # 4. **Base case**: If remaining_target == 0, add copy of current to result and return  # Result undefined
 * 5. **Iterate from start**: Loop from start index to end of candidates array
 * 6. **Skip duplicates**: If i > start and candidates[i] == candidates[i-1], continue to avoid duplicate combinations
 * 7. **Prune search**: If candidates[i] > remaining_target, break early since array is sorted
 * 8. **Recursive call**: Add candidates[i] to current, call backtrack(i+1, current, remaining_target - candidates[i]), then remove last element
 *
 * ### WHY THIS WORKS:
 * - Sort array to enable duplicate skipping
 * - Skip duplicates: if i > start and candidates[i] == candidates[i-1], skip
 * - Backtracking tries including/excluding each candidate
 * - Pass start index to avoid reusing earlier elements
 * - O(2^n) time: each element in/out, sorting adds O(n log n)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * candidates = [10,1,2,7,6,1,5], target = 8
 * ```
 *
 * Steps:
 * Step 1: Sort candidates → [1,1,2,5,6,7,10]
 * Step 2: Backtrack to find combinations
 * Step 3: Try 1: curr = [1], remain = 7
 * Step 4: Try 1: curr = [1,1], remain = 6
 * Step 5: Try 2: curr = [1,1,2], remain = 4 → continue
 * Step 6: Try 5: curr = [1,1,5], remain = 1 → continue
 * Step 7: Try 6: curr = [1,1,6], remain = 0 → add [1,1,6]
 * Step 8: Skip duplicate 1 at position 2
 * Step 9: Try 2: curr = [1,2], remain = 5
 * Step 10: Try 5: curr = [1,2,5], remain = 0 → add [1,2,5]
 * Step 11: Try 7: curr = [1,7], remain = 0 → add [1,7]
 * Step 12: Skip duplicate 1 at position 1
 * Step 13: Try 2: curr = [2], remain = 6
 * Step 14: Try 6: curr = [2,6], remain = 0 → add [2,6]
 *
 * Output:
 * ```
 * [[1,1,6],[1,2,5],[1,7],[2,6]]
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
  /**
   * Find all unique combinations of numbers that sum to target.
   *
   * Time Complexity: O(2^n)
   * Space Complexity: O(n) for recursion depth
   */
  combinationSum2(candidates: number[], target: number): number[][] {
    // Sort candidates to handle duplicates and enable early termination
    candidates.sort((a, b) => a - b);
    const result: number[][] = [];

    const backtrack = (curr: number[], pos: number, remain: number): void => {
      if (remain === 0) {
        // Found a valid combination
        result.push([...curr]);
        return;
      }

      for (let i = pos; i < candidates.length; i++) {
        // Skip duplicates to avoid duplicate combinations
        if (i > pos && candidates[i] === candidates[i - 1]) {
          continue;
        }

        // Early termination if current number is too large
        if (candidates[i] > remain) {
          break;
        }

        // Include current number and recurse
        curr.push(candidates[i]);
        backtrack(curr, i + 1, remain - candidates[i]);
        curr.pop(); // Backtrack by removing the last number
      }
    };

    backtrack([], 0, target);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
  const expected1 = [
    [1, 1, 6],
    [1, 2, 5],
    [1, 7],
    [2, 6],
  ];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const result2 = solution.combinationSum2([2, 5, 2, 1, 2], 5);
  console.log(`Test 2: ${result2.length > 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
