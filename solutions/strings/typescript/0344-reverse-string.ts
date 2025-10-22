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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
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

class Solution {
  /**
   * Reverse string in-place using two-pointer technique.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  reverseString(s: string[]): void {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
      [s[left], s[right]] = [s[right], s[left]];
      left++;
      right--;
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const test1 = ["h", "e", "l", "l", "o"];
  solution.reverseString(test1);
  console.log(`Test 1: ${JSON.stringify(test1) === JSON.stringify(["o", "l", "l", "e", "h"]) ? "PASS" : "FAIL"}`);

  const test2 = ["H", "a", "n", "n", "a", "h"];
  solution.reverseString(test2);
  console.log(`Test 2: ${JSON.stringify(test2) === JSON.stringify(["h", "a", "n", "n", "a", "H"]) ? "PASS" : "FAIL"}`);

  const test3 = ["a"];
  solution.reverseString(test3);
  console.log(`Test 3: ${JSON.stringify(test3) === JSON.stringify(["a"]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
