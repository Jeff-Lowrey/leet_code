/**
 * # Difficulty: Hard
 *
 * # 76. Minimum Window Substring
 *
 * This problem demonstrates key concepts in Sliding Window and Hash Tables.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"ADOBECODEBANC", t = "ABC"</dd>
 * <dt>Output:</dt>
 * <dd>"BANC"</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum window containing all chars of t='ABC' is 'BANC'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(|s| + |t|)
**Space Complexity**: * O(|s| + |t|)

 *
 * ### INTUITION:
 * We need to find the smallest substring of `s` that contains all characters from `t` (including
 * duplicates). This is a classic sliding window problem. The key insight is to use two pointers
 * to create a window, expand it to include all required characters, then contract it to find the
 * minimum window.
 *
 * ### APPROACH:
 * 1. **Count target characters**: Build frequency map of characters in `t`
 * 2. **Expand window**: Move right pointer to include characters until window is valid
 * 3. **Contract window**: Move left pointer to shrink window while keeping it valid
 * 4. **Track minimum**: Record the smallest valid window found
 * 5. **Return result**: Extract and return the minimum window substring
 *
 * ### WHY THIS WORKS:
 * - Sliding window technique efficiently explores all possible windows
 * - Hash maps provide O(1) character frequency tracking
 * - "formed" counter tracks how many unique characters have required frequency
 * - By expanding then contracting, we find all valid windows
 * - Only the minimum valid window is kept
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "ADOBECODEBANC", t = "ABC"
 *
 * Step 1: Count target: {'A':1, 'B':1, 'C':1}, required = 3
 *
 * Step 2: Expand window
 * - Window "ADOBEC": has A, B, C (valid) ✓
 * - Try to contract from left
 *
 * Step 3: Contract window
 * - Remove "A": "DOBEC" (invalid, missing A)
 * - Can't contract more
 *
 * Step 4: Continue expanding
 * - Window "ADOBECODEBANC": still valid
 * - Contract: "ODEBANC" (invalid)
 * - Continue...
 *
 * Step 5: Find minimum
 * - Smallest valid window: "BANC"
 *
 * Output: "BANC"
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(|s| + |t|)
 * We iterate through `s` at most twice (once with right pointer, once with left pointer).
 * Building the target frequency map takes O(|t|). Total is O(|s| + |t|).
 *
 * ### SPACE COMPLEXITY:
 * O(|s| + |t|)
 * In the worst case, all characters in `s` and `t` are unique, so our hash maps store O(|s| + |t|)
 * entries. In practice, for limited character sets (like ASCII), this is O(1).
 *
 * ### EDGE CASES:
 * - Empty `s` or `t`: Return empty string
 * - `t` longer than `s`: Return empty string
 * - No valid window exists: Return empty string
 * - Entire `s` is the minimum window: Return `s`
 * - Multiple minimum windows: Return any one (first found)
 *
 * </details>
 */

/**
 * Main solution for Problem 76: Minimum Window Substring
 *
 * @param {string} s - The source string to search in
 * @param {string} t - The target string to find
 * @return {string} - Minimum window substring containing all characters of t
 *
 * Time Complexity: O(m + n) where m is s length, n is t length
 * Space Complexity: O(k) where k is the number of unique characters in t
 */
function solve(s, t) {
  if (s.length === 0 || t.length === 0 || s.length < t.length) {
    return "";
  }

  // Count characters in target string
  const targetCount = new Map();
  for (const char of t) {
    targetCount.set(char, (targetCount.get(char) || 0) + 1);
  }

  let required = targetCount.size;
  let formed = 0;
  const windowCounts = new Map();

  let left = 0;
  let right = 0;
  let minLength = Infinity;
  let minLeft = 0;

  while (right < s.length) {
    // Add character from right to window
    const char = s[right];
    windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

    // Check if current character frequency matches target
    if (
      targetCount.has(char) &&
      windowCounts.get(char) === targetCount.get(char)
    ) {
      formed++;
    }

    // Try to contract window from left
    while (left <= right && formed === required) {
      // Update minimum window
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minLeft = left;
      }

      // Remove character from left
      const leftChar = s[left];
      windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);

      if (
        targetCount.has(leftChar) &&
        windowCounts.get(leftChar) < targetCount.get(leftChar)
      ) {
        formed--;
      }

      left++;
    }

    right++;
  }

  return minLength === Infinity
    ? ""
    : s.substring(minLeft, minLeft + minLength);
}

/**
 * Test cases for Problem 76: Minimum Window Substring
 */
function testSolution() {
  console.log("Testing 76. Minimum Window Substring");

  // Test case 1: Basic case
  const result1 = solve("ADOBECODEBANC", "ABC");
  console.assert(
    result1 === "BANC",
    `Test 1 failed: expected "BANC", got "${result1}"`,
  );

  // Test case 2: Single character
  const result2 = solve("a", "a");
  console.assert(
    result2 === "a",
    `Test 2 failed: expected "a", got "${result2}"`,
  );

  // Test case 3: No valid window
  const result3 = solve("a", "aa");
  console.assert(
    result3 === "",
    `Test 3 failed: expected "", got "${result3}"`,
  );

  // Test case 4: Entire string is minimum window
  const result4 = solve("ab", "ab");
  console.assert(
    result4 === "ab",
    `Test 4 failed: expected "ab", got "${result4}"`,
  );

  // Test case 5: Multiple occurrences
  const result5 = solve("aaaaaaaaaaaabbbbbcdd", "abcdd");
  console.assert(
    result5 === "abbbbbcdd",
    `Test 5 failed: expected "abbbbbcdd", got "${result5}"`,
  );

  console.log("All test cases passed for 76. Minimum Window Substring!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 76. Minimum Window Substring ===");
  console.log("Category: Strings");
  console.log("Difficulty: Hard");
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
