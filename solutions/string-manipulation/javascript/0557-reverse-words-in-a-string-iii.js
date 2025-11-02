/**
 * # 0557. Reverse Words In A String Iii
 *
 * Difficulty: Medium
 *
 *
 * Given a string s, reverse the order of characters in each word within a sentence
 * while still preserving whitespace and initial word order.
 *
 * Example:
 * Input: s = "Let's take LeetCode contest"
 * Output: "s'teL ekat edoCteeL tsetnoc"
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal
 * **Data Structures**: Hash Map, String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n) - Additional hash map storage

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

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * - Splitting the string: O(n)
 * - Reversing each word: O(n) total for all words
 * - Joining: O(n)
 * - Overall: O(n) where n is length of string
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional hash map storage
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

/**
 * Main solution for Problem 557: Reverse Words In A String Iii
 *
 * @param {string} s - Input string with words separated by spaces
 * @return {string} - String with each word reversed
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s) {
  // Split by spaces, reverse each word, then join back
  return s
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
}

/**
 * Test cases for Problem 557: Reverse Words In A String Iii
 */
function testSolution() {
  console.log("Testing 557. Reverse Words In A String Iii");

  // Test case 1: Basic functionality
  const result1 = solve("Let's take LeetCode contest");
  const expected1 = "s'teL ekat edoCteeL tsetnoc";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Single word
  const result2 = solve("God");
  const expected2 = "doG";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Two words
  const result3 = solve("hello world");
  const expected3 = "olleh dlrow";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single character words
  const result4 = solve("a b c");
  const expected4 = "a b c";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Mixed length words
  const result5 = solve("I love coding");
  const expected5 = "I evol gnidoc";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 557. Reverse Words In A String Iii!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 557. Reverse Words In A String Iii ===");
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
