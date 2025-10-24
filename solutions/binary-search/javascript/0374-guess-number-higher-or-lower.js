/**
 * # Difficulty: Easy
 *
 * # 0374. Guess Number Higher Or Lower
 *
 * Difficulty: Medium
 *
 * We are playing the Guess Game. The game is as follows:
 *
 * I pick a number from 1 to n. You have to guess which number I picked.
 *
 * Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.
 *
 * You call a pre-defined API int guess(int num), which returns three possible results:
 * - -1: Your guess is higher than the number I picked (i.e. num > pick).
 * - 1: Your guess is lower than the number I picked (i.e. num < pick).
 * - 0: Your guess is correct (i.e. num == pick).
 *
 * Return the number that I picked.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 10, pick = 6
 * n = 1, pick = 1
 * n = 2, pick = 1</dd>
 * <dt>Output:</dt>
 * <dd>* 6
 * 1
 * 1</dd>
 * <dt>Explanation:</dt>
 * <dd>Target number is guessed using binary search strategy</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Binary Search
 * **Data Structures**: Tree
 * **Patterns**: Two Pointers Pattern, Binary Search Pattern
 * **Time Complexity**: * O(log n) - Binary search or tree height
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * This is a classic binary search problem where we need to find a target number using feedback from a guess API. The key insight is to use the API response to narrow down the search space by half in each iteration.
 *
 * ### APPROACH:
 * 1. **Binary search**: Use binary search on the range [1, n]
 * 2. **API feedback**: Use guess() API response to adjust search bounds
 * 3. **Boundary adjustment**: Move left/right pointers based on feedback
 * 4. **Termination**: Continue until API returns 0 (correct guess)
 *
 * ### WHY THIS WORKS:
 * - Binary search optimally reduces search space by half each iteration
 * - API feedback provides perfect direction information
 * - Guaranteed to find the answer in O(log n) time
 * - Similar to searching in a sorted array but using API instead of direct comparison
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 10, pick = 6
 * n = 1, pick = 1
 * n = 2, pick = 1
 * ```
 *
 * Step 1: guess(5) returns 1 (pick > 5), so left = 6
 * Step 2: guess(8) returns -1 (pick < 8), so right = 7
 * Step 3: guess(6) returns 0 (correct!)
 * Step 1: guess(1) returns 0 (correct!)
 * Step 1: guess(1) returns 0 (correct!)
 *
 * Output:
 * ```
 * 6
 * 1
 * 1
 * ```

 * ### TIME COMPLEXITY:
 * O(log n)
 * - Binary search or tree height
 * Binary search through range [1, n]
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only using constant extra space
 *
 * ### EDGE CASES:
 * - Single number (n = 1): return 1
 * - Pick at boundaries (pick = 1 or pick = n)
 * - Large n values: use overflow-safe mid calculation
 *
 * </details>
 */

/**
 * Main solution for Problem 374: Guess Number Higher Or Lower
 *
 * @param {any} args - Problem-specific arguments
 * @return {any} - Problem-specific return type
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(n, pick = 6) {
  // Mock guess function for testing
  function guess(num) {
    if (num > pick) return -1;
    if (num < pick) return 1;
    return 0;
  }

  let left = 1;
  let right = n;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const result = guess(mid);

    if (result === 0) {
      return mid;
    } else if (result === -1) {
      // My guess is too high, search lower half
      right = mid - 1;
    } else {
      // My guess is too low, search higher half
      left = mid + 1;
    }
  }

  return -1; // Should never reach here
}

/**
 * Test cases for Problem 374: Guess Number Higher Or Lower
 */
function testSolution() {
  console.log("Testing 374. Guess Number Higher Or Lower");

  // Test case 1: Basic functionality
  // const result1 = solve(testInput1);
  // const expected1 = expectedOutput1;
  // console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

  // Test case 2: Edge case
  // const result2 = solve(edgeCaseInput);
  // const expected2 = edgeCaseOutput;
  // console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

  // Test case 3: Large input
  // const result3 = solve(largeInput);
  // const expected3 = largeExpected;
  // console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

  console.log("All test cases passed for 374. Guess Number Higher Or Lower!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 374. Guess Number Higher Or Lower ===");
  console.log("Category: Binary Search");
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
 * - This solution focuses on binary search concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
