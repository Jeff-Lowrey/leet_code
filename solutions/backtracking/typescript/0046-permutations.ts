/**
 * # 0046. Permutations
 *
 * Difficulty: Easy
 *
 *
 * Given an array `nums` of distinct integers, return all the possible permutations.
 * You can return the answer in any order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,2,3]</dd>
 * <dt>Output:</dt>
 * <dd>[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</dd>
 * <dt>Explanation:</dt>
 * <dd>All permutations of [1,2,3] are 6 arrangements: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n × n!) - n! permutations, each takes O(n) to build/copy
 * **Space Complexity**: O(n) - recursion depth and current permutation
 *
 * ### INTUITION:
 * Generate all permutations by systematically trying each unused element at each position. Use backtracking to explore all possibilities while maintaining state through choices and un-choices.
 *
 * ### APPROACH:
 * 1. **Initialize result list**: Create an empty list to store all permutations
 * 2. **Define recursive backtracking function**: Create a helper function that builds permutations by maintaining a current partial permutation
 * 3. **Base case check**: If the current permutation length equals the input array length, we have a complete permutation - add a copy to results
 * 4. **Iterate through all elements**: For each element in the original array, check if it's not already in the current permutation
 * 5. **Make choice and recurse**: Add the element to current permutation, recursively call backtrack to continue building
 * 6. **Backtrack**: Remove the last added element (undo choice) to try other possibilities
 * 7. **Return all permutations**: After exploring all branches, return the complete list of permutations
 *
 * ### WHY THIS WORKS:
 * - Each permutation uses every element exactly once
 * - Backtracking ensures we explore all n! permutations
 * - Checking "not in current" ensures no duplicates within a permutation
 * - Systematic exploration guarantees all permutations are found
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1, 2, 3]
 * ```
 *
 * Step 1: backtrack([])
 * Try 1: current = [1]
 * Try 2: current = [1,2]
 * Try 3: current = [1,2,3] ✓ Complete! Add to result
 * Remove 3: current = [1,2]
 * Remove 2: current = [1]
 * Try 3: current = [1,3]
 * Try 2: current = [1,3,2] ✓ Complete! Add to result
 * Remove 2: current = [1,3]
 * Remove 3: current = [1]
 * Remove 1: current = []
 * Step 2: Try 2: current = [2]
 * Try 1: current = [2,1]
 * Try 3: current = [2,1,3] ✓ Complete! Add to result
 * Try 3: current = [2,3]
 * Try 1: current = [2,3,1] ✓ Complete! Add to result
 * Step 3: Try 3: current = [3]
 * Try 1: current = [3,1]
 * Try 2: current = [3,1,2] ✓ Complete! Add to result
 * Try 2: current = [3,2]
 * Try 1: current = [3,2,1] ✓ Complete! Add to result
 *
 * Output:
 * ```
 * [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
 * ```

 * ### TIME COMPLEXITY:
 * O(n × n!)
 * - n! permutations, each takes O(n) to build/copy
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - recursion depth and current permutation
 *
 * ### EDGE CASES:
 * - **Empty array**: Return [[]] (empty permutation)
 * - **Single element**: Return [[element]]
 * - **Two elements**: Return both orderings [[a,b], [b,a]]
 * - **Duplicate elements (in variant)**: Use frequency counter to avoid duplicates
 * - **Large arrays**: n! permutations, factorial growth
 *
 * </details>
 */

class Solution {
  /**
   * Approach: Backtracking
   * Time Complexity: O(n * n!)
   * Space Complexity: O(n) for recursion
   */
  permute(nums: number[]): number[][] {
    const result: number[][] = [];

    const backtrack = (current: number[]): void => {
      if (current.length === nums.length) {
        result.push([...current]);
        return;
      }

      for (const num of nums) {
        if (!current.includes(num)) {
          current.push(num);
          backtrack(current);
          current.pop();
        }
      }
    };

    backtrack([]);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.permute([1, 2, 3]);
  console.log(`Test 1: ${result1.length === 6 ? "PASS" : "FAIL"}`);

  const result2 = solution.permute([0, 1]);
  console.log(`Test 2: ${result2.length === 2 ? "PASS" : "FAIL"}`);

  const result3 = solution.permute([1]);
  console.log(`Test 3: ${result3.length === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
