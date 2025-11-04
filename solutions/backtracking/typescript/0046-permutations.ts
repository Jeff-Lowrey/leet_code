/**
 * ### METADATA:
 * **Techniques**: Backtracking, Recursion
 * **Data Structures**: Array, List
 * **Time Complexity**: O(n × n!)
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * The key insight is that generate all permutations by systematically trying each unused element at each position. Use backtracking to explore all possibilities while maintaining state through choices and un-choices.
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
 *
 * ### TIME COMPLEXITY:
 * **O(n × n!)** - where n is the number of elements in the input array. There are n! (n factorial) possible permutations of n distinct elements. For each permutation, we perform **O(n)** work: checking membership in the current permutation (**O(n)** for list lookup), adding elements (**O(1)**), and copying the complete permutation to the result (**O(n)**). Therefore, the total time complexity is **O(n!)** permutations × **O(n)** work per permutation = **O(n × n!)**. Note that while the first call explores n choices, the second explores n-1, then n-2, etc., giving us n × (n-1) × (n-2) × ... × 1 = n! total paths.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - where n is the number of elements in the input array. The recursion call stack can go as deep as n levels (one level for each element we add to the current permutation). At each level, we maintain a current permutation list that grows from size 0 to size n. The maximum stack depth is n when we have a complete permutation. Additionally, the current permutation list takes **O(n)** space. The result list storing all permutations is not counted toward space complexity as it's required output. Total auxiliary space: **O(n)** for recursion stack + **O(n)** for current permutation = **O(n)**.
 *
 * ### EDGE CASES:
 * - **Empty array**: Return [[]] (empty permutation)
 * - **Single element**: Return [[element]]
 * - **Two elements**: Return both orderings [[a,b], [b,a]]
 * - **Duplicate elements (in variant)**: Use frequency counter to avoid duplicates
 * - **Large arrays**: n! permutations, factorial growth
 *
 *
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
