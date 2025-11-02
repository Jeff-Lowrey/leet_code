/**
 * # Difficulty: Medium
 *
 * # 0151. Reverse Words In A String
 *
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
 * ### METADATA:
 * **Techniques**: Array Traversal
 * **Data Structures**: String
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

/**
 * Main solution for Problem 151: Reverse Words In A String
 *
 * @param {string} s - The input string with words
 * @return {string} - The string with words in reverse order
 *
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(n) for the result string
 */
function solve(s) {
  // Split by whitespace, filter out empty strings, reverse, and join
  return s.trim().split(/\s+/).reverse().join(" ");
}

/**
 * Test cases for Problem 151: Reverse Words In A String
 */
function testSolution() {
  console.log("Testing 151. Reverse Words In A String");

  // Test case 1: Basic with multiple spaces
  const result1 = solve("the sky is blue");
  console.assert(
    result1 === "blue is sky the",
    `Test 1 failed: expected "blue is sky the", got "${result1}"`,
  );

  // Test case 2: Leading and trailing spaces
  const result2 = solve("  hello world  ");
  console.assert(
    result2 === "world hello",
    `Test 2 failed: expected "world hello", got "${result2}"`,
  );

  // Test case 3: Multiple spaces between words
  const result3 = solve("a good   example");
  console.assert(
    result3 === "example good a",
    `Test 3 failed: expected "example good a", got "${result3}"`,
  );

  // Test case 4: Single word
  const result4 = solve("hello");
  console.assert(
    result4 === "hello",
    `Test 4 failed: expected "hello", got "${result4}"`,
  );

  console.log("All test cases passed for 151. Reverse Words In A String!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 151. Reverse Words In A String ===");
  console.log("Category: Strings");
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
