/**
 *
 * ### INTUITION:
 * The key insight is that use a frequency counter to track available numbers. During backtracking, iterate through unique numbers in the counter, not array positions. Decrement the counter when using a number and increment when backtracking. This naturally handles duplicates by treating them as frequency counts.
 *
 * ### APPROACH:
 * 1. **Create frequency counter**: Use Counter(nums) to build frequency map of available numbers
 * 2. **Initialize result**: Create empty result list and current permutation list
 * 3. **Define backtrack function**: Create recursive function that builds permutations incrementally
 * 4. **Base case**: When len(current) == len(nums), add copy of current to result and return
 * 5. **Iterate unique numbers**: Loop through counter.keys() (unique numbers only)
 * 6. **Check availability**: If counter[num] > 0, the number is available to use
 * 7. **Use number**: Add num to current, decrement counter[num] by 1
 * 8. **Recurse and backtrack**: Call backtrack(), then remove num from current and increment counter[num]
 *
 * ### WHY THIS WORKS:
 * - This ensures that backtracking with frequency map to handle duplicates
 * - This ensures that at each level, try each unique unused number
 * - This ensures that skip if count[num] == 0 (already used in this path)
 * - This ensures that decrement count on recursion, increment on backtrack
 * - This ensures that o(n! * n) time: n! permutations, O(n) to copy each
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
 *
 * ### TIME COMPLEXITY:
 * **O(n × n!)** - where n is the number of elements in the input array. In the worst case (when all elements are distinct), we generate n! permutations. For each permutation, we perform **O(n)** work to copy it to the result list. The frequency counter approach reduces the number of permutations when there are duplicates (e.g., if all elements are the same, we only generate 1 permutation instead of n!), but the worst-case complexity remains **O(n × n!)**. Building the initial counter takes **O(n)** time, but this is dominated by the permutation generation.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - where n is the number of elements in the input array. We use a frequency counter that stores at most n unique elements (**O(n)** in worst case when all elements are distinct). The recursion call stack can go as deep as n levels (one for each element in the permutation). The current permutation list grows from size 0 to size n. Total auxiliary space: **O(n)** for counter + **O(n)** for recursion stack + **O(n)** for current permutation = **O(n)**. The result list is not counted as it's required output.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 *
 */

function solve(nums) {
  // Handle edge cases
  if (!nums || nums.length === 0) {
    return [[]];
  }

  // Sort array to enable duplicate detection
  nums.sort((a, b) => a - b);

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

      // Skip duplicates: only use duplicate elements in order
      // If current element equals previous element and previous element is not used,
      // skip current element to avoid duplicate permutations
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
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
 * Test cases for Problem 047: Permutations II
 */
function testSolution() {
  console.log("Testing 047. Permutations II");

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

  // Test case 1: Basic functionality with duplicates
  const result1 = solve([1, 1, 2]);
  const expected1 = [
    [1, 1, 2],
    [1, 2, 1],
    [2, 1, 1],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Three duplicates
  const result2 = solve([1, 2, 1, 1]);
  const expected2 = [
    [1, 1, 1, 2],
    [1, 1, 2, 1],
    [1, 2, 1, 1],
    [2, 1, 1, 1],
  ];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: All elements are the same
  const result3 = solve([1, 1, 1]);
  const expected3 = [[1, 1, 1]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: No duplicates (should work like Permutations I)
  const result4 = solve([1, 2, 3]);
  const expected4 = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Empty array
  const result5 = solve([]);
  const expected5 = [[]];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Single element
  const result6 = solve([1]);
  const expected6 = [[1]];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  // Test case 7: Check all permutations are unique
  const result7 = solve([1, 1, 2, 2]);
  const uniquePermutations = new Set(
    result7.map((perm) => JSON.stringify(perm)),
  );
  console.assert(
    uniquePermutations.size === result7.length,
    `Test 7 failed: found duplicate permutations`,
  );

  console.log("All test cases passed for 047. Permutations II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 047. Permutations Ii ===");
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
