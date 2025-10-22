/**
 * # 242. Valid Anagram
 *
 * # Difficulty: Easy
 *
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "anagram", t = "nagaram"</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>Both strings contain the same characters with the same frequencies</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Map, Sorting, Character Counting
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Frequency Counter Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - limited to 26 characters
 *
 * ### INTUITION:
 * Two strings are anagrams if they contain the same characters with the same frequencies.
 * We can use a hash map to count character frequencies or simply sort both strings.
 *
 * ### APPROACH:
 * 1. **Hash Map Approach**: Count character frequencies in both strings and compare
 * 2. **Sorting Approach**: Sort both strings and check if they're equal
 * 3. **Array Counter**: Use array of size 26 for lowercase English letters
 * 4. **Early Exit**: Check length first - different lengths can't be anagrams
 *
 * ### WHY THIS WORKS:
 * An anagram must have the exact same character composition. By counting frequencies,
 * we verify that every character appears the same number of times in both strings.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "anagram", t = "nagaram"
 *
 * Frequency count for s:
 * a: 3, n: 1, g: 1, r: 1, m: 1
 *
 * Frequency count for t:
 * n: 1, a: 3, g: 1, r: 1, m: 1
 *
 * Both have same frequencies → true
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n) where n is the length of the strings
 *
 * ### SPACE COMPLEXITY:
 * O(1) - hash map has at most 26 keys for English lowercase letters
 *
 * ### EDGE CASES:
 * - Empty strings: both empty → true
 * - Different lengths: → false
 * - Single character: check equality
 * - All same character: check counts match
 *
 * </details>
 */

class Solution {
  /**
   * Check if two strings are anagrams using hash map.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  isAnagram(s: string, t: string): boolean {
    // Early exit: different lengths can't be anagrams
    if (s.length !== t.length) {
      return false;
    }

    // Count character frequencies
    const charCount: Record<string, number> = {};

    for (const char of s) {
      charCount[char] = (charCount[char] || 0) + 1;
    }

    for (const char of t) {
      if (!charCount[char]) {
        return false;
      }
      charCount[char]--;
      if (charCount[char] < 0) {
        return false;
      }
    }

    return Object.values(charCount).every((count) => count === 0);
  }

  /**
   * Check using sorting approach.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  isAnagramSorting(s: string, t: string): boolean {
    return s.split("").sort().join("") === t.split("").sort().join("");
  }

  /**
   * Check using Map.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  isAnagramMap(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }

    const charCount = new Map<string, number>();

    for (const char of s) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    for (const char of t) {
      if (!charCount.has(char)) {
        return false;
      }
      charCount.set(char, charCount.get(char)! - 1);
      if (charCount.get(char)! < 0) {
        return false;
      }
    }

    for (const count of charCount.values()) {
      if (count !== 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check using array for lowercase English letters only.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  isAnagramArray(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }

    const counts = new Array(26).fill(0);
    const aCode = "a".charCodeAt(0);

    for (let i = 0; i < s.length; i++) {
      counts[s.charCodeAt(i) - aCode]++;
      counts[t.charCodeAt(i) - aCode]--;
    }

    return counts.every((count) => count === 0);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isAnagram("anagram", "nagaram") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isAnagram("rat", "car") === false ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isAnagram("", "") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.isAnagram("a", "a") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.isAnagramSorting("listen", "silent") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.isAnagramArray("anagram", "nagaram") === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
