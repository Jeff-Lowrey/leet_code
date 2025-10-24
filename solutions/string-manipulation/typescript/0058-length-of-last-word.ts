/**
 * # 58. Length Of Last Word
 *
 * Difficulty: Easy
 *
 * # Difficulty: Easy
 *
 * Given a string s consisting of words and spaces, return the length of the last word
 * in the string.
 *
 * A word is a maximal substring consisting of non-space characters only.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "Hello World"</dd>
 * <dt>Output:</dt>
 * <dd>5</dd>
 * <dt>Explanation:</dt>
 * <dd>Length of last word in 'Hello World' is 5</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: String, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * We need to find the last word in a string and return its length. The key challenge
 * is handling trailing spaces. The simplest approach is to strip trailing spaces and
 * then count backwards until we hit a space or the beginning of the string.
 *
 * ### APPROACH:
 * 1. **Strip Trailing Spaces**: Remove spaces from the end
 * 2. **Count Backwards**: Start from end and count characters until space or start
 * 3. **Return Count**: The number of characters counted
 *
 * Alternative approaches:
 * - **Split and Take Last**: Split by spaces and get last element's length
 * - **Right to Left Scan**: Scan from right, skip spaces, then count letters
 * - **Built-in Methods**: Use split() and access last element
 *
 * ### WHY THIS WORKS:
 * - Stripping trailing spaces ensures we start counting from actual last word
 * - Counting backwards from end is efficient (O(k) where k is last word length)
 * - Stops at first space encountered, which marks word boundary
 * - Handles edge cases like multiple trailing spaces
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * "Hello World"
 * "   fly me   to   the moon  "
 * ```
 *
 * Method 1 (Strip and Count):
 * 1. Strip: "Hello World" (no trailing spaces)
 * 2. Start from end at 'd', count = 0
 * 3. Count: d(1), l(2), r(3), o(4), W(5)
 * 4. Hit space, stop
 * Result: 5
 * Method 1:
 * 1. Strip: "   fly me   to   the moon"
 * 2. Count from 'n': n(1), o(2), o(3), m(4)
 * 3. Hit space, stop
 * Result: 4

### TIME COMPLEXITY:
 * O(n)
 * - In worst case (no spaces), we scan the entire string
 * - Typically much faster as we only process the last word
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Only using a counter variable
 * - No additional data structures needed
 * - If using split(), space becomes O(n) for storing words
 *
 * ### EDGE CASES:
 * - Empty string: Return 0
 * - String with only spaces: Return 0
 * - Single word no spaces: Return word length
 * - Trailing spaces: Strip handles this
 * - Multiple spaces between words: Doesn't affect result
 *
 * </details>
 */

class Solution {
  /**
   * Return length of last word in string.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  lengthOfLastWord(s: string): number {
    // Strip trailing spaces
    s = s.trimEnd();
    let count = 0;

    // Count backwards from end until we hit a space or reach the start
    for (let i = s.length - 1; i >= 0; i--) {
      if (s[i] === " ") {
        break;
      }
      count++;
    }

    return count;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.lengthOfLastWord("Hello World") === 5 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.lengthOfLastWord("   fly me   to   the moon  ") === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.lengthOfLastWord("luffy") === 5 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.lengthOfLastWord("a") === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
