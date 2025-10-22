/**
 * # 5. Longest Palindrome
 *
 * # Difficulty: Medium
 *
 * Given a string s, return the longest palindromic substring in s.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "babad"</dd>
 * <dt>Output:</dt>
 * <dd>bab"</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest palindromic substring is 'bab' or 'aba'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set, String, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n²) - Nested iteration through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * A palindrome reads the same forwards and backwards. We can find palindromes
 * by expanding around `centers - either` single characters or between characters.
 *
 * ### APPROACH:
 * 1. **Handle edge case**: Return empty string if input is empty
 * 2. **Initialize tracking variables**: Set up variables to track the start position and maximum length of longest palindrome found
 * 3. **Iterate through each character**: For each position i in the string, treat it as a potential palindrome center
 * 4. **Expand around odd-length centers**: Call expand helper with (i, i) to check palindromes with single character center (e.g., "aba")
 * 5. **Expand around even-length centers**: Call expand helper with (i, i+1) to check palindromes with two character center (e.g., "abba")
 * 6. **Update maximum**: For each center, compare the palindrome length found with current maximum, update start and max_len if longer
 * 7. **Return substring**: Extract and return the substring from start position with max_len characters
 *
 * ### WHY THIS WORKS:
 * - Every palindrome has a center
 * - We can check all possible centers systematically
 * - Expanding is more efficient than checking all substrings
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * s = "babad"
 * Centers: b, ba, a, ab, b, ba, a, ad, d
 *
 * Center at 'a' (index 1): expand to "bab"
 * Center at 'a' (index 3): expand to "aba"
 * Both have length 3, return either
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n²)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - **Single character**: Return that character (length 1 palindrome)
 * - **No palindrome > 1**: Return any single character
 * - **Entire string palindrome**: Return entire string
 * - **Even length palindrome**: Expand from between characters
 * - **Odd length palindrome**: Expand from single character
 *
 * </details>
 */

class Solution {
  longestPalindrome(s: string): string {
    if (s.length < 2) return s;

    let start = 0;
    let maxLen = 0;

    for (let i = 0; i < s.length; i++) {
      const len1 = this.expandAroundCenter(s, i, i);
      const len2 = this.expandAroundCenter(s, i, i + 1);
      const len = Math.max(len1, len2);

      if (len > maxLen) {
        maxLen = len;
        start = i - Math.floor((len - 1) / 2);
      }
    }

    return s.substring(start, start + maxLen);
  }

  private expandAroundCenter(s: string, left: number, right: number): number {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.longestPalindrome("babad");
  console.log(`Test 1: ${result1 === "bab" || result1 === "aba" ? "PASS" : "FAIL"}`);

  console.log(`Test 2: ${solution.longestPalindrome("cbbd") === "bb" ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.longestPalindrome("a") === "a" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
