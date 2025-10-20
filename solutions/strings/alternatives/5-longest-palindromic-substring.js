/**
 * # Difficulty: Medium
 *
 * # 5. Longest Palindromic Substring
 *
 * This problem demonstrates key concepts in String manipulation and Dynamic Programming.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"babad"</dd>
 * <dt>Output:</dt>
 * <dd>"bab" (or "aba")</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest palindromic substring is 'bab' or 'aba'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n²)
**Space Complexity**: * O(1)

 *
 * ### INTUITION:
 * A palindrome reads the same forwards and backwards. To find the longest palindromic substring,
 * we need to consider that palindromes expand around their center. A key insight is that every
 * palindrome has a center - either a single character (odd length) or between two characters
 * (even length). By checking all possible centers, we can find the longest palindrome.
 *
 * ### APPROACH:
 * 1. **Expand around center technique**: For each possible center, expand outwards
 * 2. **Handle both cases**: Check odd-length (single center) and even-length (two centers)
 * 3. **Track maximum**: Keep track of the longest palindrome found so far
 * 4. **Extract substring**: Return the longest palindromic substring at the end
 *
 * ### WHY THIS WORKS:
 * - Every palindrome has a center point
 * - By expanding from each center, we find all palindromes
 * - Comparing characters from center outward ensures palindrome property
 * - Checking all centers guarantees we find the longest one
 * - This avoids checking all O(n²) substrings explicitly
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "babad"
 *
 * Centers to check:
 * - Index 0 ('b'): Expands to "b" (length 1)
 * - Between 0-1: "ba" not palindrome
 * - Index 1 ('a'): Expands to "bab" (length 3) ✓
 * - Between 1-2: "ab" not palindrome
 * - Index 2 ('b'): Expands to "aba" (length 3) ✓
 * - Between 2-3: "ba" not palindrome
 * - Index 3 ('a'): Expands to "a" (length 1)
 * - Between 3-4: "ad" not palindrome
 * - Index 4 ('d'): Expands to "d" (length 1)
 *
 * Longest found: "bab" or "aba" (both length 3)
 * Output: "bab" (or "aba")
 *
 * Input: s = "cbbd"
 * - Index 1 ('b'): Just "b"
 * - Between 1-2 ('bb'): Expands to "bb" (length 2) ✓
 * - This is the longest
 * Output: "bb"
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n²)
 * There are n possible centers (including between characters), and each expansion can take up to
 * O(n) time in the worst case. Total: O(n²).
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * We only store indices and don't create additional data structures proportional to input.
 * The result substring is extracted at the end.
 *
 * ### EDGE CASES:
 * - Single character: Return that character
 * - Empty string: Return empty string
 * - All same characters: Return entire string
 * - No palindrome longer than 1: Return first character
 * - Entire string is palindrome: Return entire string
 *
 * </details>
 */

/**
 * Main solution for Problem 5: Longest Palindromic Substring
 *
 * @param {string} s - The input string
 * @return {string} - The longest palindromic substring
 *
 * Time Complexity: O(n^2) where n is the length of the string
 * Space Complexity: O(1) - only storing indices
 */
function solve(s) {
  if (s.length < 2) return s;

  let start = 0;
  let maxLength = 1;

  // Helper function to expand around center
  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // Return length of palindrome
    return right - left - 1;
  };

  for (let i = 0; i < s.length; i++) {
    // Check for odd-length palindromes (single center)
    const len1 = expandAroundCenter(i, i);
    // Check for even-length palindromes (two centers)
    const len2 = expandAroundCenter(i, i + 1);

    const len = Math.max(len1, len2);

    if (len > maxLength) {
      maxLength = len;
      // Calculate start position
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.substring(start, start + maxLength);
}

/**
 * Test cases for Problem 5: Longest Palindromic Substring
 */
function testSolution() {
  console.log("Testing 5. Longest Palindromic Substring");

  // Test case 1: Odd-length palindrome
  const result1 = solve("babad");
  console.assert(
    result1 === "bab" || result1 === "aba",
    `Test 1 failed: expected "bab" or "aba", got "${result1}"`,
  );

  // Test case 2: Even-length palindrome
  const result2 = solve("cbbd");
  console.assert(
    result2 === "bb",
    `Test 2 failed: expected "bb", got "${result2}"`,
  );

  // Test case 3: Single character
  const result3 = solve("a");
  console.assert(
    result3 === "a",
    `Test 3 failed: expected "a", got "${result3}"`,
  );

  // Test case 4: All same characters
  const result4 = solve("aaaa");
  console.assert(
    result4 === "aaaa",
    `Test 4 failed: expected "aaaa", got "${result4}"`,
  );

  // Test case 5: Entire string is palindrome
  const result5 = solve("racecar");
  console.assert(
    result5 === "racecar",
    `Test 5 failed: expected "racecar", got "${result5}"`,
  );

  console.log("All test cases passed for 5. Longest Palindromic Substring!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 5. Longest Palindromic Substring ===");
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
