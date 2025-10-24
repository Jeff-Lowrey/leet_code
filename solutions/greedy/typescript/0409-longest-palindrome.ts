/**
 * # Difficulty: Easy
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
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
 * Input:
 * ```
 * "abccccdd"
 * ```
 *
 * Character counts:
 * a: 1, b: 1, c: 4, d: 2
 * Pairs available:
 * a: 0 pairs (1//2 = 0)
 * b: 0 pairs (1//2 = 0)
 * c: 2 pairs (4//2 = 2)
 * d: 1 pair (2//2 = 1)
 * Total pairs: 0 + 0 + 2 + 1 = 3
 * Pairs contribute: 3 × 2 = 6 characters
 * Odd counts exist: a=1, b=1 (both odd)
 * Can use one character in center: +1
 * Result: 6 + 1 = 7
 * Possible palindrome: "dccaccd"

### TIME COMPLEXITY:
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

class Solution {
  longestPalindrome(s: string): number {
    const charCount = new Map<string, number>();

    for (const char of s) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    let length = 0;
    let hasOdd = false;

    for (const count of charCount.values()) {
      if (count % 2 === 0) {
        length += count;
      } else {
        length += count - 1;
        hasOdd = true;
      }
    }

    return hasOdd ? length + 1 : length;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.longestPalindrome("abccccdd") === 7 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.longestPalindrome("a") === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.longestPalindrome("bb") === 2 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
