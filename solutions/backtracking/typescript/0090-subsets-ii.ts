/**
 * # Difficulty: Medium
 *
 * # 090. Subsets Ii
 *
 * Given an integer array nums that may contain duplicates, return all possible subsets (the power set).
 *
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>All unique subsets of [1,2,2] are [[],[1],[1,2],[1,2,2],[2],[2,2]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Backtracking
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Sort the array to group duplicates together. During backtracking, add the current subset at each step (not just at leaves). Skip duplicate elements at the same recursion level using the condition i > start and nums[i] == nums[i-1] to avoid duplicate subsets.
 *
 * ### APPROACH:
 * 1. **Sort array**: Sort nums to group duplicate elements together
 * 2. **Initialize result**: Create result list starting with empty subset [[]]
 * 3. **Define backtrack function**: Create recursive function with parameters (start, current)
 * 4. **Add current subset**: Append copy of current to result at each recursive call
 * 5. **Iterate from start**: Loop from start index to end of array
 * 6. **Skip duplicates**: If i > start and nums[i] == nums[i-1], continue to avoid duplicate subsets
 * 7. **Include element**: Add nums[i] to current, call backtrack(i+1, current)
 * 8. **Backtrack**: Remove last element from current to explore other possibilities
 *
 * ### WHY THIS WORKS:
 * - Sort array to group duplicates, enables skipping in backtracking
 * - At each level, if nums[i] == nums[i-1] and i > start, skip (avoid duplicate subsets)
 * - Backtracking tries including/excluding each element
 * - Every path is valid subset, even partial paths
 * - O(2^n * n) time: 2^n subsets, O(n) to copy each
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,2,2]
 * ```
 *
 * Steps:
 * Step 1: Sort array → [1,2,2]
 * Step 2: Build subsets with backtracking
 * Step 3: Start with [] → add to result
 * Step 4: Try 1: [1] → add to result
 * Step 5: Try 2: [1,2] → add to result
 * Step 6: Try 2: [1,2,2] → add to result
 * Step 7: Skip duplicate 2
 * Step 8: Try first 2: [2] → add to result
 * Step 9: Try second 2: [2,2] → add to result
 * Step 10: Skip duplicate 2 (i=2, start=0, nums[2]==nums[1])
 *
 * Output:
 * ```
 * [[],[1],[1,2],[1,2,2],[2],[2,2]]
 * ```

### TIME COMPLEXITY:
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
  /**
   * Generate all possible unique subsets of the input array.
   *
   * Time Complexity: O(2^n * n)
   * Space Complexity: O(n) for recursion depth
   */
  subsetsWithDup(nums: number[]): number[][] {
    // Sort the array to handle duplicates properly
    nums.sort((a, b) => a - b);
    const result: number[][] = [];

    const backtrack = (start: number, currentSubset: number[]): void => {
      // Add the current subset to result
      result.push([...currentSubset]);

      // Try adding each remaining number to current subset
      for (let i = start; i < nums.length; i++) {
        // Skip duplicates to avoid duplicate subsets
        if (i > start && nums[i] === nums[i - 1]) {
          continue;
        }

        // Include current number in subset
        currentSubset.push(nums[i]);
        // Recursively generate subsets with remaining elements
        backtrack(i + 1, currentSubset);
        // Backtrack by removing the last added element
        currentSubset.pop();
      }
    };

    // Start backtracking with empty subset
    backtrack(0, []);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.subsetsWithDup([1, 2, 2]);
  const expected1 = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const result2 = solution.subsetsWithDup([]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([[]]) ? "PASS" : "FAIL"}`);

  const result3 = solution.subsetsWithDup([1]);
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify([[], [1]]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
