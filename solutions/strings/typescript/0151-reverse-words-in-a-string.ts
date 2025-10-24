/**
 * # Difficulty: Medium
 *
 * # 151. Reverse Words In A String
 *
 * Difficulty: Medium
 *
 * This problem demonstrates key concepts in String manipulation and parsing.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"  hello   world  "</dd>
 * <dt>Output:</dt>
 * <dd>"world hello"</dd>
 * <dt>Explanation:</dt>
 * <dd>After reversing words, 'the sky is blue' becomes 'blue is sky the'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Backtracking
 * **Data Structures**: Array, String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * We need to reverse the order of words in a string, where words are separated by spaces. The key
 * challenges are: 1) handling multiple spaces between words, 2) trimming leading/trailing spaces,
 * and 3) reversing the word order while preserving word integrity.
 *
 * ### APPROACH:
 * 1. **Strip leading/trailing spaces**: Remove any whitespace from both ends
 * 2. **Split by whitespace**: Use regex or Python's split() to handle multiple spaces
 * 3. **Reverse the list of words**: Reverse the order of words
 * 4. **Join with single space**: Combine words back with exactly one space between them
 *
 * ### WHY THIS WORKS:
 * - Python's split() without arguments automatically handles multiple spaces
 * - It splits on any whitespace and removes empty strings from the result
 * - Reversing a list in Python is O(n) and very efficient
 * - Joining with a single space ensures proper formatting
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "  hello   world  "
 * s = "a good   example"
 * ```
 *
 * Step 1: Strip: "hello   world"
 * Step 2: Split: ["hello", "world"]
 * Step 3: Reverse: ["world", "hello"]
 * Step 4: Join: "world hello"
 * Step 1: Strip: "a good   example"
 * Step 2: Split: ["a", "good", "example"]
 * Step 3: Reverse: ["example", "good", "a"]
 * Step 4: Join: "example good a"
 *
 * Output:
 * ```
 * "world hello"
 * "example good a"
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Where n is the length of the string. We scan the string once to split, reverse the list (O(n)),
 * and join back (O(n)).
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * We create a list of words and the result string, both proportional to input size.
 *
 * ### EDGE CASES:
 * - Single word: Returns the same word
 * - Empty string: Returns empty string
 * - Only spaces: Returns empty string
 * - Multiple consecutive spaces: Handled by split()
 * - Leading/trailing spaces: Removed by strip() or split()
 *
 * </details>
 */

class Solution {
  /**
   * Reverse the order of words in a string.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  reverseWords(s: string): string {
    return s.trim().split(/\s+/).reverse().join(" ");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.reverseWords("the sky is blue") === "blue is sky the" ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.reverseWords("  hello world  ") === "world hello" ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.reverseWords("a good   example") === "example good a" ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.reverseWords("hello") === "hello" ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.reverseWords("   hello   ") === "hello" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
