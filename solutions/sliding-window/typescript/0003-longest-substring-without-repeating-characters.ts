/**
 * # Difficulty: Medium
 *
 * # 003. Longest Substring Without Repeating Characters
 *
 * Difficulty: Easy
 *
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"abcabcbb"</dd>
 * <dt>Output:</dt>
 * <dd>3 (substring "abc")</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest substring without repeating characters is 'abc' with length 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, String
 * **Patterns**: Sliding Window Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use sliding window with hash set. Expand right pointer and add characters. When duplicate found, shrink from left until duplicate removed. Track maximum window size.
 *
 * ### APPROACH:
 * 1. **Initialize variables**: Set max_length = 0, left = 0, char_set = set()
 * 2. **Iterate with right pointer**: For right in range(len(s))
 * 3. **Handle duplicates**: While s[right] in char_set, remove s[left] from set and increment left
 * 4. **Add current character**: Add s[right] to char_set
 * 5. **Update maximum**: max_length = max(max_length, right - left + 1)
 * 6. **Continue scanning**: Process all characters
 * 7. **Return result**: Return max_length
 *
 * ### WHY THIS WORKS:
 * - Sliding window maintains valid substring by moving start when duplicate found
 * - Hash map stores character positions for O(1) duplicate detection
 * - When duplicate found, jump start to (last position + 1) instead of incrementing by 1
 * - Each character visited at most twice (once by right, once by start jump)
 * - O(n) time with O(min(n, m)) space where m is charset size (typically 128 or 256)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "abcabcbb"
 * ```
 *
 * Step 1: char='a', pos=0
 * char_position = {'a': 0}, start = 0
 * max_length = 1
 * Step 2: char='b', pos=1
 * char_position = {'a': 0, 'b': 1}, start = 0
 * max_length = 2
 * Step 3: char='c', pos=2
 * char_position = {'a': 0, 'b': 1, 'c': 2}, start = 0
 * max_length = 3
 * Step 4: char='a', pos=3 (repeat!)
 * 'a' at position 0 >= start, so update start = 0 + 1 = 1
 * char_position = {'a': 3, 'b': 1, 'c': 2}
 * Step 5: char='b', pos=4 (repeat!)
 * 'b' at position 1 >= start, so update start = 1 + 1 = 2
 * char_position = {'a': 3, 'b': 4, 'c': 2}
 * Step 6: char='c', pos=5 (repeat!)
 * 'c' at position 2 >= start, so update start = 2 + 1 = 3
 * char_position = {'a': 3, 'b': 4, 'c': 5}
 * Step 7: char='b', pos=6 (repeat!)
 * 'b' at position 4 >= start, so update start = 4 + 1 = 5
 * Step 8: char='b', pos=7 (repeat!)
 * 'b' at position 6 >= start, so update start = 6 + 1 = 7
 *
 * Output:
 * ```
 * 3 (substring "abc")
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
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
   * Find length of longest substring without repeating characters.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(min(n, m)) where m is charset size
   */
  lengthOfLongestSubstring(s: string): number {
    const charMap: Map<string, number> = new Map();
    let maxLength = 0;
    let start = 0;

    for (let right = 0; right < s.length; right++) {
      const char = s[right];

      if (charMap.has(char) && charMap.get(char)! >= start) {
        start = charMap.get(char)! + 1;
      }

      charMap.set(char, right);
      maxLength = Math.max(maxLength, right - start + 1);
    }

    return maxLength;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.lengthOfLongestSubstring("abcabcbb") === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.lengthOfLongestSubstring("bbbbb") === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.lengthOfLongestSubstring("pwwkew") === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.lengthOfLongestSubstring("") === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.lengthOfLongestSubstring("dvdf") === 3 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
