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
 * ### METADATA:
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
 * 1. **Initialize result list**: Create an empty array to store all subsets (will include empty set)
 * 2. **Define recursive backtracking function**: Create a helper function with start index and current subset array parameters
 * 3. **Add current subset**: At each recursive call, add a copy of the current subset array to results (captures all intermediate states)
 * 4. **Iterate from start index**: Loop through remaining elements in array starting from the start index to avoid duplicates
 * 5. **Include element and recurse**: Add current element to subset array, then recursively explore with next start index (i+1)
 * 6. **Backtrack**: Remove the last added element from array to try the next element at the current level
 * 7. **Return power set**: After all recursive exploration completes, return the complete collection of 2^n subsets
 * 
 * ### WHY THIS WORKS:
 * - Each element has 2 choices: include or exclude
 * - Total subsets = 2^n (binary choices for n elements)
 * - Backtracking systematically explores all combinations
 * - Adding current subset at each step captures all intermediate states
 * 
 * ### EXAMPLE WALKTHROUGH:
 * **Input:** nums = [1,2,3]
 *
 * **Step 1:** Backtracking approach - Start with empty array
 * - Start with [] → add to result
 * - Add 1: [1] → add to result
 * - Add 2: [1,2] → add to result
 * - Add 3: [1,2,3] → add to result
 *
 * **Step 2:** Backtrack and try different combinations
 * - Remove 3, Add 3: [1,3] → add to result
 * - Remove 1, Add 2: [2] → add to result
 * - Add 3: [2,3] → add to result
 *
 * **Step 3:** Continue backtracking
 * - Remove 2, Add 3: [3] → add to result
 * - All 2^3 = 8 subsets generated
 *
 * **Output:** [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 * 
 * ### TIME COMPLEXITY:
 * O(n × 2^n) - 2^n subsets, each takes O(n) to copy
 * 
 * ### SPACE COMPLEXITY:
 * O(n) - recursion depth

 * ### EDGE CASES:
 * - **Empty array**: Return [[]] (power set contains only empty set)
 * - **Single element**: Return [[], [element]]
 * - **All elements identical (in variant)**: Handle duplicates with sorting
 * - **Large n values**: 2^n subsets, exponential but unavoidable
 * - **Negative numbers**: No special handling needed, works same as positive
 * 
 *
*/

class Solution {
  /**
   * Approach: Backtracking
   *         Time Complexity: O(n * 2^n)
   *         Space Complexity: O(n) for recursion
   */
  subsets(nums: number[]): number[][] {
    const result: number[][] = [];

    const backtrack = (start: number, current: number[]): void => {
      result.push([...current]);
      for (let i = start; i < nums.length; i++) {
        current.push(nums[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    };

    backtrack(0, []);
    return result;
  }

  /**
   * Approach: Bit manipulation
   *         Time Complexity: O(n * 2^n)
   *         Space Complexity: O(1) excluding output
   */
  subsetsBitMask(nums: number[]): number[][] {
    const n = nums.length;
    const result: number[][] = [];

    for (let mask = 0; mask < (1 << n); mask++) {  // 2^n possibilities
      const subset: number[] = [];
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          subset.push(nums[i]);
        }
      }
      result.push(subset);
    }

    return result;
  }

  /**
   * Approach: Iterative building
   *         Time Complexity: O(n * 2^n)
   *         Space Complexity: O(1) excluding output
   */
  subsetsIterative(nums: number[]): number[][] {
    const result: number[][] = [[]];

    for (const num of nums) {
      const newSubsets = result.map(subset => [...subset, num]);
      result.push(...newSubsets);
    }

    return result;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 78. Subsets ===");

  // Test Subsets
  const testCases = [[1, 2, 3], [0], [1, 2, 3, 4]];
  for (const nums of testCases) {
    const result = solution.subsets(nums);
    console.log(`Input: ${JSON.stringify(nums)}`);
    console.log(`Subsets (${result.length}): ${JSON.stringify(result)}\n`);
  }

  // Test bit mask approach
  console.log("Bit Mask Approach:");
  const result2 = solution.subsetsBitMask([1, 2, 3]);
  console.log(`Bit mask result: ${JSON.stringify(result2)}\n`);

  // Test iterative approach
  console.log("Iterative Approach:");
  const result3 = solution.subsetsIterative([1, 2, 3]);
  console.log(`Iterative result: ${JSON.stringify(result3)}\n`);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;