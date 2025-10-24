/**
 * # Difficulty: Medium
 *
 * # 0047. Permutations Ii
 *
 * Difficulty: Easy
 *
 * Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,1,2]</dd>
 * <dt>Output:</dt>
 * <dd>[[1,1,2],[1,2,1],[2,1,1]]</dd>
 * <dt>Explanation:</dt>
 * <dd>All unique permutations of [1,1,2] are [[1,1,2],[1,2,1],[2,1,1]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Hash Table Pattern, Backtracking
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use a frequency counter to track available numbers. During backtracking, iterate through unique numbers in the counter, not array positions. Decrement the counter when using a number and increment when backtracking. This naturally handles duplicates by treating them as frequency counts.
 *
 * ### APPROACH:
 * 1. **Create frequency counter**: Use Counter(nums) to build frequency map of available numbers
 * 2. **Initialize result**: Create empty result list and current permutation list
 * 3. **Define backtrack function**: Create recursive function that builds permutations incrementally
 * # 0047. **Base case**: When len(current) == len(nums), add copy of current to result and return  # Result undefined
 * 5. **Iterate unique numbers**: Loop through counter.keys() (unique numbers only)
 * 6. **Check availability**: If counter[num] > 0, the number is available to use
 * 7. **Use number**: Add num to current, decrement counter[num] by 1
 * 8. **Recurse and backtrack**: Call backtrack(), then remove num from current and increment counter[num]
 *
 * ### WHY THIS WORKS:
 * - Backtracking with frequency map to handle duplicates
 * - At each level, try each unique unused number
 * - Skip if count[num] == 0 (already used in this path)
 * - Decrement count on recursion, increment on backtrack
 * - O(n! * n) time: n! permutations, O(n) to copy each
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,1,2]
 * ```
 *
 * Step 1: Create frequency counter
 * counter = {1: 2, 2: 1}
 * Step 2: Backtrack to build permutations
 * Choose 1: temp = [1], counter = {1: 1, 2: 1}
 * Choose 1: temp = [1,1], counter = {1: 0, 2: 1}
 *
 * Steps:
 * Step 1: Choose 2: temp = [1,1,2] → add to result
 * Step 2: Choose 2: temp = [1,2], counter = {1: 1, 2: 0}
 * Step 3: Choose 1: temp = [1,2,1] → add to result
 * Step 4: Choose 2: temp = [2], counter = {1: 2, 2: 0}
 * Step 5: Choose 1: temp = [2,1], counter = {1: 1, 2: 0}
 * Step 6: Choose 1: temp = [2,1,1] → add to result
 *
 * Output:
 * ```
 * [[1,1,2],[1,2,1],[2,1,1]]
 * ```

 * ### TIME COMPLEXITY:

 * O(n)

 * - Single pass through the input
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
   * Generate all possible unique permutations of the input array.
   *
   * Time Complexity: O(n!)
   * Space Complexity: O(n)
   */
  permuteUnique(nums: number[]): number[][] {
    // Handle empty input
    if (!nums || nums.length === 0) {
      return [];
    }

    const result: number[][] = [];

    // Create counter for frequency of each number
    const counter = new Map<number, number>();
    for (const num of nums) {
      counter.set(num, (counter.get(num) || 0) + 1);
    }

    const backtrack = (tempPerm: number[], n: number): void => {
      // Base case: if current permutation is complete
      if (tempPerm.length === n) {
        result.push([...tempPerm]);
        return;
      }

      // Try each unique number from counter
      for (const [num, count] of counter.entries()) {
        if (count > 0) {
          // Add current number to permutation
          tempPerm.push(num);
          counter.set(num, count - 1);

          // Recursive call
          backtrack(tempPerm, n);

          // Backtrack
          tempPerm.pop();
          counter.set(num, count);
        }
      }
    };

    backtrack([], nums.length);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.permuteUnique([1, 1, 2]);
  console.log(`Test 1: ${result1.length === 3 ? "PASS" : "FAIL"}`);

  const result2 = solution.permuteUnique([1]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([[1]]) ? "PASS" : "FAIL"}`);

  const result3 = solution.permuteUnique([1, 1, 1]);
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify([[1, 1, 1]]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
