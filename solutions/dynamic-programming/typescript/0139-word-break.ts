/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that dp[i] = whether s[0:i] can be segmented. For each position, check all possible last words ending at i. If s[j:i] is in dict and dp[j] is true, then dp[i] is true.
 *
 * ### APPROACH:
 * 1. **Convert to set**: Create word_set = set(wordDict) for O(1) word lookup
 * 2. **Initialize DP array**: Create dp = [False] * (len(s) + 1) where dp[i] = can segment s[:i]
 * 3. **Set base case**: dp[0] = True (empty string can be segmented)
 * 4. **Iterate positions**: For each end position i from 1 to len(s)+1
 * 5. **Try all splits**: For each start position j from 0 to i, check if dp[j] and s[j:i] in word_set
 * 6. **Mark segmentable**: If valid split found, set dp[i] = True and break inner loop
 * 7. **Return result**: Return dp[len(s)] indicating if entire string can be segmented
 *
 * ### WHY THIS WORKS:
 * - This ensures that dP: dp[i] = true if s[0:i] can be segmented
 * - This ensures that for each position i, check all words: if word matches s[i-len:i] and dp[i-len] true
 * - This ensures that trie optimization: faster word matching than set lookup
 * - This ensures that bottom-up: dp[0] = true (empty string), build up to dp[n]
 * - This ensures that o(n^2 * m) time: n positions, n substrings, m avg word length
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "leetcode", wordDict = ["leet","code"]
 * ```
 *
 * Step 1: Initialize DP
 * dp = [True, False, False, False, False, False, False, False, False]
 * dp[0] = True (empty string)
 * Step 2: Check each position
 * i=4: s[0:4]="leet" in wordDict, dp[4] = True
 * i=8: s[4:8]="code" in wordDict and dp[4]=True, dp[8] = True
 * Step 3: Verify segmentation
 * "leet" + "code" = "leetcode" ✓
 *
 * Output:
 * ```
 * True (can be segmented)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass with **O(1)** hash lookups
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 */

class Solution {
  wordBreak(s: string, wordDict: string[]): boolean {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= s.length; i++) {
      for (let j = 0; j < i; j++) {
        if (dp[j] && wordSet.has(s.substring(j, i))) {
          dp[i] = true;
          break;
        }
      }
    }

    return dp[s.length];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.wordBreak("leetcode", ["leet", "code"]) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.wordBreak("applepenapple", ["apple", "pen"]) === true ? "PASS" : "FAIL"}`);
  console.log(
    `Test 3: ${solution.wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]) === false ? "PASS" : "FAIL"}`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
