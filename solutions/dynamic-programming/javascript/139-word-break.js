/**
 * Difficulty: Medium
 *
 * # 139. Word Break
 *
 * Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
 *
 * Note that the same word in the dictionary may be reused multiple times in the segmentation.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["leet","code"]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>String 'leetcode' can be segmented using dictionary ['leet','code']</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: Dynamic Programming, Memoization, Tabulation
 * **Data Structures**: DP Array, Hash Map for Memoization
 * **Patterns**: DP Pattern, Optimal Substructure
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * This problem exhibits optimal substructure and overlapping subproblems, making dynamic programming the ideal approach for avoiding redundant calculations.
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply dynamic programming methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages dynamic programming principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "leetcode", wordDict = ["leet","code"]
 * Step 1: Initialize DP
 *   dp = [True, False, False, False, False, False, False, False, False]
 *   dp[0] = True (empty string)
 *
 * Step 2: Check each position
 *   i=4: s[0:4]="leet" in wordDict, dp[4] = True
 *   i=8: s[4:8]="code" in wordDict and dp[4]=True, dp[8] = True
 *
 * Step 3: Verify segmentation
 *   "leet" + "code" = "leetcode" ✓
 *
 * Output: True (can be segmented)
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
 * Main solution for Problem 139: Word Break
 *
 * @param {string} s - The input string
 * @param {string[]} wordDict - Dictionary of valid words
 * @return {boolean} - True if string can be segmented using dictionary words
 *
 * Time Complexity: O(n^2 * m) where n is string length, m is max word length
 * Space Complexity: O(n)
 */
function solve(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true; // Empty string can always be segmented

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      // If dp[j] is true and substring from j to i is in dictionary
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}

/**
 * Test cases for Problem 139: Word Break
 */
function testSolution() {
  console.log("Testing 139. Word Break");

  // Test case 1: Can be segmented
  const result1 = solve("leetcode", ["leet", "code"]);
  const expected1 = true;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Can be segmented with reuse
  const result2 = solve("applepenapple", ["apple", "pen"]);
  const expected2 = true;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Cannot be segmented
  const result3 = solve("catsandog", ["cats", "dog", "sand", "and", "cat"]);
  const expected3 = false;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  console.log("All test cases passed for 139. Word Break!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 139. Word Break ===");
  console.log("Category: Dynamic Programming");
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
 * - This solution focuses on dynamic programming concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
