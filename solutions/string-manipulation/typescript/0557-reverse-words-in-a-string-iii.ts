/**
 * # 557. Reverse Words In A String Iii
 *
 * # Difficulty: Easy
 *
 * Given a string s, reverse the order of characters in each word within a sentence
 * while still preserving whitespace and initial word order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "Let's take LeetCode contest"</dd>
 * <dt>Output:</dt>
 * <dd>s'teL ekat edoCteeL tsetnoc"</dd>
 * <dt>Explanation:</dt>
 * <dd>Reverse each word: 'Let's take LeetCode contest' becomes 's'teL ekat edoCteeL tsetnoc'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Two Pointers Pattern, Divide and Conquer
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n) - Additional set storage
 *
 * ### INTUITION:
 * We need to reverse each word individually while keeping the words in the same order
 * and preserving spaces. This is straightforward: split the string by spaces, reverse
 * each word, and join them back together with spaces.
 *
 * ### APPROACH:
 * 1. **Split by Spaces**: Divide string into individual words
 * 2. **Reverse Each Word**: Apply string reversal to each word independently
 * 3. **Join with Spaces**: Combine reversed words back with spaces
 *
 * Alternative approaches:
 * - **Two-pointer method**: Find word boundaries and reverse in-place
 * - **List comprehension**: Concise Python-style solution
 * - **Manual iteration**: Process character by character
 *
 * ### WHY THIS WORKS:
 * - Splitting by spaces naturally identifies word boundaries
 * - Python's string slicing [::-1] efficiently reverses strings
 * - Joining preserves the original spacing structure
 * - Each word is processed independently
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * "Let's take LeetCode contest"
 * ```
 *
 * Split: ["Let's", "take", "LeetCode", "contest"]
 * Reverse each:
 *
 * Steps:
 * Step 1: - "Let's" -> "s'teL"
 * Step 2: - "take" -> "ekat"
 * Step 3: - "LeetCode" -> "edoCteeL"
 * Step 4: - "contest" -> "tsetnoc"
 * Step 5: Join: "s'teL ekat edoCteeL tsetnoc"

### TIME COMPLEXITY:
 * O(n)
 * - Splitting the string: O(n)
 * - Reversing each word: O(n) total for all words
 * - Joining: O(n)
 * - Overall: O(n) where n is length of string
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Storing split words: O(n)
 * - Creating result string: O(n)
 * - Overall: O(n)
 *
 * ### EDGE CASES:
 * - Empty string: Return empty
 * - Single word: Return reversed word
 * - Single character words: Return unchanged
 * - Multiple spaces: Handled by split() method
 * - Leading/trailing spaces: Preserved if using split(' ') vs split()
 *
 * </details>
 */

class Solution {
  /**
   * Reverse characters in each word while preserving word order.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  reverseWords(s: string): string {
    return s
      .split(" ")
      .map((word) => word.split("").reverse().join(""))
      .join(" ");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.reverseWords("Let's take LeetCode contest");
  console.log(`Test 1: ${result1 === "s'teL ekat edoCteeL tsetnoc" ? "PASS" : "FAIL"}`);

  const result2 = solution.reverseWords("God");
  console.log(`Test 2: ${result2 === "doG" ? "PASS" : "FAIL"}`);

  const result3 = solution.reverseWords("Hello World");
  console.log(`Test 3: ${result3 === "olleH dlroW" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
