/**
 * # 0078. Subsets
 * 
 * # Difficulty: Medium
 * 
 * Given an integer array `nums` of unique elements, return all possible subsets
 * (the power `set`).
 * 
 * The solution `set` must not contain duplicate subsets. Return the solution in any order.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,2,3]</dd>
 * <dt>Output:</dt>
 * <dd>[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</dd>
 * <dt>Explanation:</dt>
 * <dd>All subsets of [1,2,3] include [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Matrix
 * **Patterns**: Backtracking, Tree Pattern
 * **Time Complexity**: O(n × 2^n) - 2^n subsets, each takes O(n) to copy
 * **Space Complexity**: O(n) - recursion depth
 * 
 * ### INTUITION:
 * Generate all possible subsets (power set) by making binary choices for each element: include it or don't include it in the current subset. Use backtracking to explore all combinations.
 * 
 * ### APPROACH:
 * 1. **Initialize result list**: Create an empty list to store all subsets (will include empty set)
 * 2. **Define recursive backtracking function**: Create a helper function with start index and current subset parameters
 * 3. **Add current subset**: At each recursive call, add a copy of the current subset to results (captures all intermediate states)
 * 4. **Iterate from start index**: Loop through remaining elements starting from the start index to avoid duplicates
 * 5. **Include element and recurse**: Add current element to subset, then recursively explore with next start index (i+1)
 * 6. **Backtrack**: Remove the last added element to try the next element at the current level
 * 7. **Return power set**: After all recursive exploration completes, return the complete collection of 2^n subsets
 * 
 * ### WHY THIS WORKS:
 * - Each element has 2 choices: include or exclude
 * - Total subsets = 2^n (binary choices for n elements)
 * - Backtracking systematically explores all combinations
 * - Adding current subset at each step captures all intermediate states
 * 
 * ### EXAMPLE WALKTHROUGH:
 * * Input:
 *  * ```
 *  * nums = [1,2,3]
 *  * ```
 *  * 
 *  * **Step 1:** Backtracking approach
 *  * - Start with [] → add to result
 *  *   - Add 1: [1] → add to result
 *  *     - Add 2: [1,2] → add to result
 *  *       - Add 3: [1,2,3] → add to result
 *  *     - Add 3: [1,3] → add to result
 *  *   - Add 2: [2] → add to result
 *  *     - Add 3: [2,3] → add to result
 *  *   - Add 3: [3] → add to result
 *  * 
 *  * **Step 2:** Iterative approach
 *  * - Start: result = [[]]
 *  * - Add 1: result = [[], [1]]
 *  * - Add 2: result = [[], [1], [2], [1,2]]
 *  * - Add 3: result = [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
 *  * 
 *  * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 *  * 
 *  * ### TIME COMPLEXITY:
 *  * O(n × 2^n) - 2^n subsets, each takes O(n) to copy
 *  * 
 *  * ### SPACE COMPLEXITY:
 *  * O(n) - recursion depth
 *  * 
 *  * ### EDGE CASES:
 *  * - **Empty array**: Return [[]] (power set contains only empty set)
 *  * - **Single element**: Return [[], [element]]
 *  * - **All elements identical (in variant)**: Handle duplicates with sorting
 *  * - **Large n values**: 2^n subsets, exponential but unavoidable
 *  * - **Negative numbers**: No special handling needed, works same as positive
 *  * 
 *  *
*/

class Solution {
  /**
   * Approach: Backtracking
   *         Time Complexity: O(n * 2^n)
   *         Space Complexity: O(n) for recursion
   */
  subsets(nums: number[]): number[][] {
    // Implementation
    result: list.set(Any, []
    def backtrack(start: Any, current: Any) -> Any:
    result.append(current.get(:))
    for (let i = 0; i < start, nums.length; i++) {
    current.append(nums.get(i))
    backtrack(i + 1, current)
    current.pop()
  }

  /**
   * Approach: Bit manipulation
   *         Time Complexity: O(n * 2^n)
   *         Space Complexity: O(1) excluding output
   */
  subsetsBitMask(nums: number[]): number[][] {
    // Implementation
    n = nums.length
    result: list.get(list[int)] = []
    for (let mask = 0; mask < 1 << n; mask++) {  # 2^n possibilities
    subset: list.set(Any, []
    for (let i = 0; i < n; i++) {
    if mask & (1 << i):
    subset.append(nums.get(i))
    result.append(subset)
  }

  /**
   * Approach: Iterative building
   *         Time Complexity: O(n * 2^n)
   *         Space Complexity: O(1) excluding output
   */
  subsetsIterative(nums: number[]): number[][] {
    // Implementation
    result: list.get(list[int)] = [[]]
    for num in nums:
    result += [subset + [num] for subset in result]
    return result
    """
    90. Subsets II
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  # Test Subsets
  solution = Solution()
  console.log("Subsets:")
  test_cases = [[1, 2, 3], [0], [1, 2, 3, 4]]
  for nums in test_cases:
  result = solution.subsets(nums)
  console.log(`Input: nums`)
  console.log(`Subsets ({result.length}): result\n`)
  # Test Subsets with Duplicates
  solution_dup = SolutionUnique()
  console.log("Subsets with Duplicates:")
  test_cases_dup = [[1, 2, 2], [4, 4, 4, 1, 4]]
  for nums in test_cases_dup:
  result = solution_dup.subsetsWithDup(nums)
  console.log(`Input: nums`)
  console.log(`Unique Subsets: result\n`)
  # Test Combination Sum
  solution_comb = SolutionCombSum()
  console.log("Combination Sum:")
  test_comb = [([2, 3, 6, 7], 7), ([2, 3, 5], 8)]
  for candidates, target in test_comb:
  result = solution_comb.combinationSum(candidates, target)
  console.log(`Candidates: {candidates}, Target: {target}`)
  console.log(`Combinations: result\n`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;