/**
 *  Difficulty: Easy
 *
 * # 409. Longest Palindrome
 *
 * Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.
 *
 * Letters are case sensitive, for example, "Aa" is not considered a palindrome here.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Input: "abccccdd"</dd>
 * <dt>Output:</dt>
 * <dd>Character counts:</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest palindrome that can be built is 7 from letters 'abccccdd'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Greedy Algorithm, Optimization
 * **Data Structures**: Array, Priority Queue
 * **Patterns**: Greedy Pattern, Local Optimization
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * A palindrome reads the same forwards and backwards. To maximize the palindrome length, we should use as many character pairs as possible, plus at most one character with odd count (which goes in the center).
 *
 * ### APPROACH:
 * 1. **Count character frequencies**: Count how many times each character appears
 * 2. **Use pairs greedily**: Each pair of characters contributes 2 to palindrome length
 * 3. **Handle odd counts**: If any character has odd count, we can place one in center
 * 4. **Calculate result**: Sum of all pairs × 2, plus 1 if any odd count exists
 *
 * ### WHY THIS WORKS:
 * Using two pointers from both ends, we compare characters while moving inward. If all corresponding characters match, the string is a palindrome. Skipping non-alphanumeric characters and handling case-insensitivity ensures we only compare relevant characters. The pointers meeting in the middle confirms the entire string is symmetric.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: "abccccdd"
 * Character counts:
 * a: 1, b: 1, c: 4, d: 2
 *
 * Pairs available:
 * a: 0 pairs (1//2 = 0)
 * b: 0 pairs (1//2 = 0)
 * c: 2 pairs (4//2 = 2)
 * d: 1 pair (2//2 = 1)
 *
 * Total pairs: 0 + 0 + 2 + 1 = 3
 * Pairs contribute: 3 × 2 = 6 characters
 *
 * Odd counts exist: a=1, b=1 (both odd)
 * Can use one character in center: +1
 *
 * Result: 6 + 1 = 7
 * Possible palindrome: "dccaccd"
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Single pass to count characters
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * At most 128 ASCII characters or 52 letters (constant space)
 *
 * ### EDGE CASES:
 * - Empty string: length 0
 * - All characters have even counts: use all characters
 * - All characters have count 1: length = 1 (any single character)
 *
 * </details>
 */

/**
 * Main solution for Problem 409: Longest Palindrome
 *
 * @param {string} s - Input string
 * @return {number} - Length of longest palindrome that can be built
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
  const charSet = new Set();
  let length = 0;

  // Count pairs using a set
  for (const char of s) {
    if (charSet.has(char)) {
      // Found a pair, add 2 to length
      length += 2;
      charSet.delete(char);
    } else {
      // Add to set, waiting for pair
      charSet.add(char);
    }
  }

  // If there are any unpaired characters, we can use one in the middle
  if (charSet.size > 0) {
    length += 1;
  }

  return length;
}

/**
 * Test cases for Problem 409: Longest Palindrome
 */
function testSolution() {
  console.log("Testing 409. Longest Palindrome");

  // Test case 1: Example from problem
  const result1 = solve("abccccdd");
  const expected1 = 7;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Single character
  const result2 = solve("a");
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: All unique characters
  const result3 = solve("abcdef");
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All same character (even count)
  const result4 = solve("aaaa");
  const expected4 = 4;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: All same character (odd count)
  const result5 = solve("aaaaa");
  const expected5 = 5;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Mixed case
  const result6 = solve("Aa");
  const expected6 = 1;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log("All test cases passed for 409. Longest Palindrome!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 409. Longest Palindrome ===");
  console.log("Category: Greedy");
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
