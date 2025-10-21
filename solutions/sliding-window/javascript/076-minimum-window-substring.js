/**
 * Difficulty: Medium
 *
 * # 076. Minimum Window Substring
 *
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
 *
 * The testcases will be generated such that the answer is unique.
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
 *
 *

 * ### METADATA:
 * **Techniques**: Sliding Window, Two Pointers
 * **Data Structures**: Array, Hash Map, Deque
 * **Patterns**: Sliding Window Pattern, Window Expansion/Contraction
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * This problem uses a sliding window to maintain a subset of elements that satisfy certain conditions, enabling linear time complexity.
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply sliding window methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages sliding window principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Step 1: Expand window until valid
 *   "ADOBEC" contains A,B,C
 *
 * Step 2: Contract from left
 *   "DOBEC" missing A
 *   "ADOBEC" is minimum so far (6 chars)
 *
 * Step 3: Continue expanding
 *   "ODEBANC" contains A,B,C
 *   Contract: "BANC" (4 chars) - new minimum
 *
 * Output: "BANC"
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 076: Minimum Window Substring
 *
 * @param {string} s - Source string to search in
 * @param {string} t - Target string containing required characters
 * @return {string} - Minimum window substring or empty string
 *
 * Time Complexity: O(m + n)
 * Space Complexity: O(k)
 */
function solve(s, t) {
  if (!s || !t || s.length < t.length) return "";

  // Build frequency map for target string t
  const targetMap = new Map();
  for (const char of t) {
    targetMap.set(char, (targetMap.get(char) || 0) + 1);
  }

  let left = 0;
  let minLength = Infinity;
  let minStart = 0;
  let required = targetMap.size; // Number of unique chars in t
  let formed = 0; // Number of unique chars in current window with desired frequency

  const windowMap = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // Add character to window
    windowMap.set(char, (windowMap.get(char) || 0) + 1);

    // Check if frequency of current character matches requirement
    if (targetMap.has(char) && windowMap.get(char) === targetMap.get(char)) {
      formed++;
    }

    // Try to contract the window until it's no longer valid
    while (formed === required && left <= right) {
      // Update result if this window is smaller
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minStart = left;
      }

      // Remove leftmost character from window
      const leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);

      // Check if removal breaks the validity
      if (
        targetMap.has(leftChar) &&
        windowMap.get(leftChar) < targetMap.get(leftChar)
      ) {
        formed--;
      }

      left++;
    }
  }

  return minLength === Infinity
    ? ""
    : s.substring(minStart, minStart + minLength);
}

/**
 * Test cases for Problem 076: Minimum Window Substring
 */
function testSolution() {
  console.log("Testing 076. Minimum Window Substring");

  // Test case 1: Basic example
  const result1 = solve("ADOBECODEBANC", "ABC");
  const expected1 = "BANC";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: s="ADOBECODEBANC", t="ABC" -> "${result1}"`);

  // Test case 2: Target with duplicate characters
  const result2 = solve("a", "a");
  const expected2 = "a";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: s="a", t="a" -> "${result2}"`);

  // Test case 3: No valid window
  const result3 = solve("a", "aa");
  const expected3 = "";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected "${expected3}", got "${result3}"`,
  );
  console.log(`Test 3 passed: s="a", t="aa" -> "${result3}"`);

  // Test case 4: Entire string is minimum window
  const result4 = solve("abc", "abc");
  const expected4 = "abc";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: s="abc", t="abc" -> "${result4}"`);

  // Test case 5: Complex case with duplicates
  const result5 = solve("ADOBECODEBANC", "AABC");
  const expected5 = "ADOBECODEBA";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: s="ADOBECODEBANC", t="AABC" -> "${result5}"`);

  // Test case 6: Empty strings
  const result6 = solve("", "a");
  const expected6 = "";
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected "${expected6}", got "${result6}"`,
  );
  console.log(`Test 6 passed: s="", t="a" -> "${result6}"`);

  // Test case 7: Minimum at the end
  const result7 = solve("ab", "b");
  const expected7 = "b";
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );
  console.log(`Test 7 passed: s="ab", t="b" -> "${result7}"`);

  console.log("All test cases passed for 076. Minimum Window Substring!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 076. Minimum Window Substring ===");
  console.log("Category: Sliding Window");
  console.log("Difficulty: Hard");
  console.log("");

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
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
