/**
 * # 0819. Most Common Word
 *
 * Difficulty: Medium
 *
 * # Difficulty: Easy
 *
 * Given a string paragraph and a string array of the banned words banned, return
 * the most frequent word that is not banned. It is guaranteed there is at least
 * one word that is not banned, and that the answer is unique.
 *
 * The words in paragraph are case-insensitive and the answer should be returned
 * in lowercase.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]</dd>
 * <dt>Output:</dt>
 * <dd>"ball"</dd>
 * <dt>Explanation:</dt>
 * <dd>"hit" occurs 3 times, but is banned. "ball" occurs twice and is not banned</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: String Processing, Frequency Counting, Hash Table
 * **Data Structures**: Hash Map, Set
 * **Patterns**: Frequency Counter Pattern
 * **Time Complexity**: O(n + m) - Process paragraph (n) and banned list (m)
 * **Space Complexity**: O(n + m) - Store word frequencies and banned set
 *
 * ### INTUITION:
 * Parse the paragraph into words, count their frequencies while ignoring banned
 * words, then return the word with the highest frequency. Use a set for O(1)
 * banned word lookups.
 *
 * ### APPROACH:
 * 1. **Convert banned to set**: Enable O(1) lookups for banned words
 * 2. **Parse paragraph**: Extract words, convert to lowercase, remove punctuation
 * 3. **Count frequencies**: Use hash map to count non-banned words
 * 4. **Find maximum**: Return word with highest frequency
 *
 * ### WHY THIS WORKS:
 * - Set lookup for banned words is O(1) vs O(m) for list
 * - Hash map efficiently tracks word frequencies
 * - Single pass through paragraph is optimal
 * - Case-insensitive comparison ensures correct matching
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
 * ```
 *
 * banned = ["hit"]
 * Step 1: Convert banned to set
 * banned_set = {"hit"}
 * Step 2: Parse and count words (lowercase)
 * "bob": 1
 * "hit": 3 (banned - skip)
 * "a": 1
 * "ball": 2 ✓
 * "the": 1
 * "flew": 1
 * "far": 1
 * "after": 1
 * "it": 1
 * "was": 1
 * Step 3: Find maximum non-banned word
 * max_word = "ball" (count = 2)
 *
 * Output:
 * ```
 * "ball"
 * ```

 * ### TIME COMPLEXITY:
 * O(n + m)
 * - Process paragraph (n) and banned list (m)
 *
 * ### SPACE COMPLEXITY:
 * O(n + m)
 * - Store word frequencies and banned set
 *
 * ### EDGE CASES:
 * - **Single word**: Return that word if not banned
 * - **All words banned except one**: Return the one non-banned word
 * - **Punctuation**: Remove all punctuation correctly
 * - **Case sensitivity**: Handle mixed case properly
 *
 * </details>
 */

class Solution {
  /**
   * Find the most frequent non-banned word in paragraph.
   *
   * Time Complexity: O(n + m)
   * Space Complexity: O(n + m)
   */
  mostCommonWord(paragraph: string, banned: string[]): string {
    // Convert banned to set for O(1) lookup
    const bannedSet = new Set(banned);

    // Parse paragraph: extract words, lowercase, remove punctuation
    const words = paragraph.toLowerCase().match(/\w+/g) || [];

    // Count non-banned words
    const wordCount = new Map<string, number>();
    for (const word of words) {
      if (!bannedSet.has(word)) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      }
    }

    // Find maximum
    let maxWord = "";
    let maxCount = 0;
    for (const [word, count] of wordCount) {
      if (count > maxCount) {
        maxCount = count;
        maxWord = word;
      }
    }

    return maxWord;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(
    `Test 1: ${solution.mostCommonWord("Bob hit a ball, the hit BALL flew far after it was hit.", ["hit"])}`
  ); // Expected: "ball"

  console.log(`Test 2: ${solution.mostCommonWord("a.", [])}`); // Expected: "a"

  console.log(`Test 3: ${solution.mostCommonWord("a, a, a, a, b,b,b,c, c", ["a"])}`); // Expected: "b"

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
