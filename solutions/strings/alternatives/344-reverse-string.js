/**
 * # Difficulty: Easy
 *
 * # 344. Reverse String
 *
 * This problem demonstrates key concepts in Strings.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["h", "e", "l", "l", "o"]</dd>
 * <dt>Output:</dt>
 * <dd>"Before: {example}"</dd>
 * <dt>Explanation:</dt>
 * <dd>The string ['h','e','l','l','o'] is reversed in-place to ['o','l','l','e','h']</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n)
**Space Complexity**: * O(1)

 *
 * ### INTUITION:
 * The problem asks us to reverse a string (represented as a list of characters) in-place, meaning we
 * must modify the original array without using extra space for another array. The most intuitive
 * approach is to use two pointers - one at the start and one at the end - and swap elements as we
 * move towards the center.
 *
 * ### APPROACH:
 * 1. **Initialize two pointers**: One at the start (left) and one at the end (right)
 * 2. **Swap and move**: While left < right, swap elements at left and right positions
 * 3. **Increment/Decrement**: Move left pointer forward and right pointer backward
 * 4. **Continue until pointers meet**: When left >= right, all elements have been swapped
 *
 * ### WHY THIS WORKS:
 * - By swapping elements from both ends moving towards the center, we reverse the array
 * - Each element is only touched once, making it efficient
 * - No additional space is needed beyond the two pointer variables
 * - The algorithm naturally handles both odd and even length arrays
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: ["h","e","l","l","o"]
 * Step 1: Swap positions 0 and 4: ["o","e","l","l","h"]
 * Step 2: Swap positions 1 and 3: ["o","l","l","e","h"]
 * Step 3: Position 2 is the center, done
 * Output: ["o","l","l","e","h"]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * We iterate through half the array (n/2 swaps), which is O(n).
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * Only two pointer variables are used, regardless of input size.
 *
 * ### EDGE CASES:
 * - Empty array: No swaps needed
 * - Single element: No swaps needed
 * - Two elements: Single swap
 * - Array already reversed: Still performs swaps (idempotent)
 *
 * </details>
 */

/**
 * Main solution for Problem 344: Reverse String
 *
 * @param {string[]} s - Array of characters to reverse in-place
 * @return {void} - Modifies array in-place, returns nothing
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
  // Use two pointers to swap characters from both ends
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Swap characters at left and right pointers
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }

  // No return value - modifies array in-place
}

/**
 * Test cases for Problem 344: Reverse String
 */
function testSolution() {
  console.log("Testing 344. Reverse String");

  // Test case 1: Basic functionality
  const test1 = ["h", "e", "l", "l", "o"];
  solve(test1);
  console.assert(
    JSON.stringify(test1) === JSON.stringify(["o", "l", "l", "e", "h"]),
    `Test 1 failed: expected ["o","l","l","e","h"], got ${JSON.stringify(test1)}`,
  );

  // Test case 2: Single character
  const test2 = ["a"];
  solve(test2);
  console.assert(
    JSON.stringify(test2) === JSON.stringify(["a"]),
    `Test 2 failed: expected ["a"], got ${JSON.stringify(test2)}`,
  );

  // Test case 3: Two characters
  const test3 = ["H", "a", "n", "n", "a", "h"];
  solve(test3);
  console.assert(
    JSON.stringify(test3) === JSON.stringify(["h", "a", "n", "n", "a", "H"]),
    `Test 3 failed: expected ["h","a","n","n","a","H"], got ${JSON.stringify(test3)}`,
  );

  console.log("All test cases passed for 344. Reverse String!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 344. Reverse String ===");
  console.log("Category: Strings");
  console.log("Difficulty: Easy");
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
