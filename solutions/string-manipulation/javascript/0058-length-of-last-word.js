/**
 * # Difficulty: Easy
 *
 * Given a string s consisting of words and spaces, return the length of the last word
 * in the string.
 *
 * A word is a maximal substring consisting of non-space characters only.
 *
 * Example:
 * Input: s = "Hello World"
 * Output: 5
 * Explanation: The last word is "World" with length 5.
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n)
**Space Complexity**: * O(1)

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
 * ```
 * Input: "Hello World"
 *
 * Method 1 (Strip and Count):
 * 1. Strip: "Hello World" (no trailing spaces)
 * 2. Start from end at 'd', count = 0
 * 3. Count: d(1), l(2), r(3), o(4), W(5)
 * 4. Hit space, stop
 * Result: 5
 *
 * Input: "   fly me   to   the moon  "
 *
 * Method 1:
 * 1. Strip: "   fly me   to   the moon"
 * 2. Count from 'n': n(1), o(2), o(3), m(4)
 * 3. Hit space, stop
 * Result: 4
 * ```
 *
 * ### TIME COMPLEXITY:
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

/**
 * Main solution for Problem 58: Length Of Last Word
 *
 * @param {string} s - Input string
 * @return {number} - Length of the last word
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
  let length = 0;
  let i = s.length - 1;

  // Skip trailing spaces
  while (i >= 0 && s[i] === " ") {
    i--;
  }

  // Count characters in the last word
  while (i >= 0 && s[i] !== " ") {
    length++;
    i--;
  }

  return length;
}

/**
 * Test cases for Problem 58: Length Of Last Word
 */
function testSolution() {
  console.log("Testing 58. Length Of Last Word");

  // Test case 1: Basic functionality
  const result1 = solve("Hello World");
  const expected1 = 5;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Trailing spaces
  const result2 = solve("   fly me   to   the moon  ");
  const expected2 = 4;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single word
  const result3 = solve("luffy");
  const expected3 = 5;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single word with spaces
  const result4 = solve("   word   ");
  const expected4 = 4;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Two words
  const result5 = solve("a b");
  const expected5 = 1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 58. Length Of Last Word!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 58. Length Of Last Word ===");
  console.log("Category: String Manipulation");
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
