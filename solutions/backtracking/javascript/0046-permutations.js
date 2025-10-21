/**
 * # Difficulty: Medium
 *
 * Given an array `nums` of distinct integers, return all the possible permutations.
 * You can return the answer in any order.
 *
 * Example:
 * Input: `nums` = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums` = [1,2,3]</dd>
 * <dt>Output:</dt>
 * <dd>[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</dd>
 * <dt>Explanation:</dt>
 * <dd>All permutations of [1,2,3] are 6 arrangements: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n × n!) - n! permutations, each takes O(n) to build/copy
**Space Complexity**: * O(n) - recursion depth and current permutation

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
 * ```
 * Input: nums = [1, 2, 3]
 *
 * Step 1: backtrack([])
 *   Try 1: current = [1]
 *     Try 2: current = [1,2]
 *       Try 3: current = [1,2,3] ✓ Complete! Add to result
 *       Remove 3: current = [1,2]
 *     Remove 2: current = [1]
 *     Try 3: current = [1,3]
 *       Try 2: current = [1,3,2] ✓ Complete! Add to result
 *       Remove 2: current = [1,3]
 *     Remove 3: current = [1]
 *   Remove 1: current = []
 *
 * Step 2: Try 2: current = [2]
 *     Try 1: current = [2,1]
 *       Try 3: current = [2,1,3] ✓ Complete! Add to result
 *     Try 3: current = [2,3]
 *       Try 1: current = [2,3,1] ✓ Complete! Add to result
 *
 * Step 3: Try 3: current = [3]
 *     Try 1: current = [3,1]
 *       Try 2: current = [3,1,2] ✓ Complete! Add to result
 *     Try 2: current = [3,2]
 *       Try 1: current = [3,2,1] ✓ Complete! Add to result
 *
 * Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n × n!) - n! permutations, each takes O(n) to build/copy
 *
 * ### SPACE COMPLEXITY:
 * O(n) - recursion depth and current permutation
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

/**
 * Main solution for Problem 046: Permutations
 *
 * @param {number[]} nums - Array of distinct integers
 * @return {number[][]} - Array of all possible permutations
 *
 * Time Complexity: O(n × n!) - n! permutations, each takes O(n) to build/copy
 * Space Complexity: O(n) - recursion depth and current permutation
 */
function solve(nums) {
  // Handle edge cases
  if (!nums || nums.length === 0) {
    return [[]];
  }

  const result = [];
  const used = new Array(nums.length).fill(false);

  /**
   * Backtracking helper function
   * @param {number[]} currentPermutation - Current permutation being built
   */
  function backtrack(currentPermutation) {
    // Base case: we've used all elements
    if (currentPermutation.length === nums.length) {
      result.push([...currentPermutation]); // Make a copy
      return;
    }

    // Try each unused element at the current position
    for (let i = 0; i < nums.length; i++) {
      // Skip if element is already used
      if (used[i]) {
        continue;
      }

      // Choose: add current element to permutation
      currentPermutation.push(nums[i]);
      used[i] = true;

      // Explore: recursively build the rest of the permutation
      backtrack(currentPermutation);

      // Unchoose: remove current element and mark as unused (backtrack)
      currentPermutation.pop();
      used[i] = false;
    }
  }

  // Start backtracking with empty permutation
  backtrack([]);

  return result;
}

/**
 * Test cases for Problem 046: Permutations
 */
function testSolution() {
  console.log("Testing 046. Permutations");

  // Helper function to sort permutations for comparison
  function sortPermutations(permutations) {
    return permutations
      .map((perm) => [...perm])
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
    const sorted1 = sortPermutations(arr1);
    const sorted2 = sortPermutations(arr2);
    return JSON.stringify(sorted1) === JSON.stringify(sorted2);
  }

  // Test case 1: Basic functionality - 3 elements
  const result1 = solve([1, 2, 3]);
  const expected1 = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Two elements
  const result2 = solve([0, 1]);
  const expected2 = [
    [0, 1],
    [1, 0],
  ];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single element
  const result3 = solve([1]);
  const expected3 = [[1]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Empty array
  const result4 = solve([]);
  const expected4 = [[]];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Four elements (larger case)
  const result5 = solve([1, 2, 3, 4]);
  const expected5Length = 24; // 4! = 24
  console.assert(
    result5.length === expected5Length,
    `Test 5 failed: expected ${expected5Length} permutations, got ${result5.length}`,
  );

  // Test case 6: Negative numbers
  const result6 = solve([-1, 1]);
  const expected6 = [
    [-1, 1],
    [1, -1],
  ];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  // Test case 7: Check all permutations are unique
  const result7 = solve([1, 2, 3]);
  const uniquePermutations = new Set(
    result7.map((perm) => JSON.stringify(perm)),
  );
  console.assert(
    uniquePermutations.size === result7.length,
    `Test 7 failed: found duplicate permutations`,
  );

  console.log("All test cases passed for 046. Permutations!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 046. Permutations ===");
  console.log("Category: Backtracking");
  console.log("Difficulty: Backtrack");
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
