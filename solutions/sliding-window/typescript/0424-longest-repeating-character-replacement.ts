/**
 * # Difficulty: Medium
 *
 * # 424. Longest Repeating Character Replacement
 *
 * You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.
 *
 * Return the length of the longest substring containing the same letter you can get after performing the above operations.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"AABABBA", k = 1</dd>
 * <dt>Output:</dt>
 * <dd>4 (longest valid substring)</dd>
 * <dt>Explanation:</dt>
 * <dd>After replacing at most k=2 characters, the longest repeating substring is 'AAAA' with length 4</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Sliding Window
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Sliding Window Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use sliding window with character counts. Track max frequency in window. If window_size - max_freq <= k, window is valid (k replacements make all same). Expand or shrink to find max valid window.
 *
 * ### APPROACH:
 * 1. **Initialize variables**: Set left = 0, max_count = 0, max_len = 0, char_count = {}
 * 2. **Expand with right**: For right in range(len(s))
 * 3. **Count character**: char_count[s[right]] = char_count.get(s[right], 0) + 1
 * 4. **Track max frequency**: max_count = max(max_count, char_count[s[right]])
 * 5. **Check validity**: If window_size - max_count > k, shrink from left
 * 6. **Shrink window**: Decrement char_count[s[left]], increment left
 * 7. **Update maximum**: max_len = max(max_len, right - left + 1)
 * 8. **Return result**: Return max_len
 *
 * ### WHY THIS WORKS:
 * - Sliding window tracks most frequent char count in current window
 * - Window valid if (window_size - max_freq) <= k (k replacements needed)
 * - Expand right until invalid, contract left to make valid again
 * - Max window size found is answer (can replace k chars to make all same)
 * - O(n) time: each element visited twice at most, O(26) = O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "AABABBA", k = 1
 * Step 1: Expand window
 *   "AA": max_freq=2, changes=0, valid
 *   "AAB": max_freq=2, changes=1, valid
 *   "AABA": max_freq=3, changes=1, valid
 *   "AABAB": max_freq=3, changes=2, invalid
 *
 * Step 2: Contract and continue
 *   "ABAB": max_freq=2, changes=2, invalid
 *   "BAB": max_freq=2, changes=1, valid
 *   Continue...
 *
 * Output: 4 (longest valid substring)
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

class Solution {
  /**
   * Find longest substring with k replacements allowed.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  characterReplacement(s: string, k: number): number {
    const charCount: Map<string, number> = new Map();
    let maxCount = 0;
    let maxLength = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
      charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
      maxCount = Math.max(maxCount, charCount.get(s[right])!);

      while (right - left + 1 - maxCount > k) {
        charCount.set(s[left], charCount.get(s[left])! - 1);
        left++;
      }

      maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.characterReplacement("ABAB", 2) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.characterReplacement("AABABBA", 1) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.characterReplacement("AAAA", 2) === 4 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
