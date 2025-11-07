/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * [This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply monotonic stack methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - This ensures that the solution leverages monotonic stack principles
 * - This ensures that time complexity is optimized for the given constraints
 * - This ensures that space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,2,1]
 * ```
 *
 * Step 1: Treat as circular, process twice
 * Extended: [1,2,1,1,2,1]
 * Step 2: Use monotonic stack from right
 * i=5: stack=[1], result[2]=1
 * i=4: pop 1, stack=[2], result[1]=2
 * i=3: stack=[1,2], result[0]=2
 * i=2: stack=[1,2], result[2]=2
 * i=1: stack=[2], result[1]=-1
 * i=0: stack=[1,2], result[0]=2
 *
 * Output:
 * ```
 * [2,-1,2]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 */

/**
 * Main solution for Problem 503: Next Greater Element II
 *
 * @param {number[]} nums - Circular array
 * @return {number[]} - Next greater element for each position
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];

  // Traverse array twice to handle circular nature
  for (let i = 0; i < 2 * n; i++) {
    const index = i % n;
    const value = nums[index];

    // Pop smaller elements and update their results
    while (stack.length > 0 && nums[stack[stack.length - 1]] < value) {
      const poppedIndex = stack.pop();
      result[poppedIndex] = value;
    }

    // Only push indices in first pass to avoid duplicates
    if (i < n) {
      stack.push(index);
    }
  }

  return result;
}

/**
 * Helper function to compare arrays
 */
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

/**
 * Test cases for Problem 503: Next Greater Element II
 */
function testSolution() {
  console.log("Testing 503. Next Greater Element II");

  // Test case 1: Example from problem
  const result1 = solve([1, 2, 1]);
  const expected1 = [2, -1, 2];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected [${expected1}], got [${result1}]`,
  );

  // Test case 2: Another example
  const result2 = solve([1, 2, 3, 4, 3]);
  const expected2 = [2, 3, 4, -1, 4];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected [${expected2}], got [${result2}]`,
  );

  // Test case 3: All same values
  const result3 = solve([5, 5, 5, 5]);
  const expected3 = [-1, -1, -1, -1];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected [${expected3}], got [${result3}]`,
  );

  // Test case 4: Decreasing sequence
  const result4 = solve([5, 4, 3, 2, 1]);
  const expected4 = [-1, 5, 5, 5, 5];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected [${expected4}], got [${result4}]`,
  );

  // Test case 5: Single element
  const result5 = solve([1]);
  const expected5 = [-1];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected [${expected5}], got [${result5}]`,
  );

  // Test case 6: Two elements
  const result6 = solve([2, 1]);
  const expected6 = [-1, 2];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected [${expected6}], got [${result6}]`,
  );

  console.log("All test cases passed for 503. Next Greater Element II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 503. Next ===");
  console.log("Category: Monotonic Stack");
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
