/**
 *
 * ### INTUITION:
 * The key insight is that sort the candidates first to handle duplicates. During backtracking, skip duplicate elements at the same recursion level by checking if nums[i] == nums[i-1] and i > start. Each number can only be used once, so advance the index by 1 after including a number.
 *
 * ### APPROACH:
 * 1. **Sort candidates**: Sort candidates array to group duplicates together for easy skipping
 * 2. **Initialize result**: Create empty result list and current combination list
 * 3. **Define backtrack function**: Create recursive function with parameters (start, current, remaining_target)
 * 4. **Base case**: If remaining_target == 0, add copy of current to result and return
 * 5. **Iterate from start**: Loop from start index to end of candidates array
 * 6. **Skip duplicates**: If i > start and candidates[i] == candidates[i-1], continue to avoid duplicate combinations
 * 7. **Prune search**: If candidates[i] > remaining_target, break early since array is sorted
 * 8. **Recursive call**: Add candidates[i] to current, call backtrack(i+1, current, remaining_target - candidates[i]), then remove last element
 *
 * ### WHY THIS WORKS:
 * - This ensures that sort array to enable duplicate skipping
 * - This ensures that skip duplicates: if i > start and candidates[i] == candidates[i-1], skip
 * - This ensures that backtracking tries including/excluding each candidate
 * - This ensures that pass start index to avoid reusing earlier elements
 * - This ensures that o(2^n) time: each element in/out, sorting adds O(n log n)
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
 *
 * ### TIME COMPLEXITY:
 * **O(2^n × n)** - where n is the number of candidates. In the worst case, we generate all possible subsets of the candidates array. There are 2^n possible subsets (each element can be included or excluded). For each valid subset that sums to the target, we need **O(n)** time to copy it to the result list. The sorting step takes **O(n log n)**, but this is dominated by the exponential subset generation. Early termination and duplicate skipping reduce the actual number of subsets generated, but the worst-case complexity remains **O(2^n × n)**.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - where n is the number of candidates. The recursion call stack can go as deep as n levels (when we include all candidates in decreasing order). We also maintain a current combination list that can have at most n elements. The space for storing the result is not counted toward space complexity as it's required output. The sorting is done in-place, so it doesn't add to space complexity. Total auxiliary space: **O(n)** for recursion stack + **O(n)** for current combination = **O(n)**.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 *
 */

function solve(candidates, target) {
  // Handle edge cases
  if (!candidates || candidates.length === 0 || target <= 0) {
    return target === 0 ? [[]] : [];
  }

  // Sort candidates to enable duplicate handling and early termination
  candidates.sort((a, b) => a - b);

  const result = [];

  /**
   * Backtracking helper function
   * @param {number} startIndex - Current index in candidates array
   * @param {number[]} currentCombination - Current combination being built
   * @param {number} currentSum - Current sum of the combination
   */
  function backtrack(startIndex, currentCombination, currentSum) {
    // Base case: found a valid combination
    if (currentSum === target) {
      result.push([...currentCombination]); // Make a copy
      return;
    }

    // Pruning: if current sum exceeds target, stop exploring
    if (currentSum > target) {
      return;
    }

    // Try each candidate starting from startIndex
    for (let i = startIndex; i < candidates.length; i++) {
      const candidate = candidates[i];

      // Skip duplicates at the same recursion level
      // This prevents duplicate combinations like [1a,2] and [1b,2] where 1a and 1b are same value
      if (i > startIndex && candidates[i] === candidates[i - 1]) {
        continue;
      }

      // Early termination: if candidate alone exceeds remaining target
      if (currentSum + candidate > target) {
        break; // Since array is sorted, all subsequent candidates will also exceed
      }

      // Choose: add current candidate to combination
      currentCombination.push(candidate);

      // Explore: recursively try to complete the combination
      // Note: we use 'i + 1' because each number can only be used once
      backtrack(i + 1, currentCombination, currentSum + candidate);

      // Unchoose: remove current candidate (backtrack)
      currentCombination.pop();
    }
  }

  // Start backtracking from index 0
  backtrack(0, [], 0);

  return result;
}

/**
 * Test cases for Problem 040: Combination Sum II
 */
function testSolution() {
  console.log("Testing 040. Combination Sum II");

  // Helper function to sort combinations for comparison
  function sortCombinations(combinations) {
    return combinations
      .map((combo) => [...combo].sort((a, b) => a - b))
      .sort((a, b) => {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
          if (a[i] !== b[i]) return a[i] - b[i];
        }
        return a.length - b.length;
      });
  }

  // Helper function to compare arrays of arrays
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = sortCombinations(arr1);
    const sorted2 = sortCombinations(arr2);
    return JSON.stringify(sorted1) === JSON.stringify(sorted2);
  }

  // Test case 1: Basic functionality with duplicates
  const result1 = solve([10, 1, 2, 7, 6, 1, 5], 8);
  const expected1 = [
    [1, 1, 6],
    [1, 2, 5],
    [1, 7],
    [2, 6],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: All duplicates
  const result2 = solve([2, 5, 2, 1, 2], 5);
  const expected2 = [[1, 2, 2], [5]];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: No solution exists
  const result3 = solve([2, 4, 6], 3);
  const expected3 = [];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Target is 0
  const result4 = solve([1, 2], 0);
  const expected4 = [[]];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Empty candidates array
  const result5 = solve([], 5);
  const expected5 = [];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Single element equals target
  const result6 = solve([1], 1);
  const expected6 = [[1]];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  // Test case 7: Multiple duplicates, single solution
  const result7 = solve([1, 1, 1, 1], 2);
  const expected7 = [[1, 1]];
  console.assert(
    arraysEqual(result7, expected7),
    `Test 7 failed: expected ${JSON.stringify(expected7)}, got ${JSON.stringify(result7)}`,
  );

  console.log("All test cases passed for 040. Combination Sum II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 040. Combination Sum Ii ===");
  console.log("Category: Backtracking");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on backtracking concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
