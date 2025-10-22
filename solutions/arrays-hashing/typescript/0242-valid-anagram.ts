/**
 * # 242. Valid Anagram
 *
 * # Difficulty: Easy
 *
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different
 * word or phrase, typically using all the original letters exactly once.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "anagram", t = "nagaram"</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>The strings 'anagram' and 'nagaram' are anagrams (same character counts)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass with O(1) hash lookups
 * **Space Complexity**: O(1) - at most 26 lowercase letters
 *
 * ### INTUITION:
 * Two strings are anagrams if they contain the exact same characters with the same frequencies. We can verify this by counting character frequencies in both strings.
 *
 * ### APPROACH:
 * 1. **Length check**: If strings have different lengths, they can't be anagrams
 * 2. **Count characters**: Use a hash map or array to count frequency of each character
 * 3. **Compare counts**: Both strings should have identical character frequency distributions
 *
 * ### WHY THIS WORKS:
 * - Anagrams are rearrangements of the same letters
 * - Character frequency is invariant under rearrangement
 * - If two strings have the same character frequencies, they must be anagrams
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * s = "anagram", t = "nagaram"
 *
 * Character counts for s:
 * a: 3, n: 1, g: 1, r: 1, m: 1
 *
 * Character counts for t:
 * n: 1, a: 3, g: 1, r: 1, m: 1
 *
 * Both have identical counts → True
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1) - at most 26 lowercase letters
 *
 * ### EDGE CASES:
 * - Empty strings → True (both empty)
 * - Different lengths → False immediately
 * - Single character → direct comparison
 *
 * </details>
 */

class Solution {
  /**
   * Approach: Character frequency counter
   * Time Complexity: O(n)
   * Space Complexity: O(1) - at most 26 characters
   */
  isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }

    const count = new Map<string, number>();

    // Count characters in s
    for (const char of s) {
      count.set(char, (count.get(char) || 0) + 1);
    }

    // Subtract counts for t
    for (const char of t) {
      if (!count.has(char)) {
        return false;
      }
      count.set(char, count.get(char)! - 1);
      if (count.get(char)! < 0) {
        return false;
      }
    }

    // Check all counts are zero
    for (const value of count.values()) {
      if (value !== 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Manual counting approach using object
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  isAnagramManual(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }

    const count: { [key: string]: number } = {};

    // Count characters in s
    for (const char of s) {
      count[char] = (count[char] || 0) + 1;
    }

    // Subtract counts for t
    for (const char of t) {
      if (!(char in count)) {
        return false;
      }
      count[char]--;
      if (count[char] < 0) {
        return false;
      }
    }

    return Object.values(count).every((v) => v === 0);
  }

  /**
   * Sorting approach
   * Time Complexity: O(n log n)
   * Space Complexity: O(1)
   */
  isAnagramSort(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }

    return s.split("").sort().join("") === t.split("").sort().join("");
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1
  const s1 = "anagram";
  const t1 = "nagaram";
  console.log(`s: '${s1}', t: '${t1}'`);
  console.log(`Output: ${solution.isAnagram(s1, t1)}`); // true

  // Test case 2
  const s2 = "rat";
  const t2 = "car";
  console.log(`s: '${s2}', t: '${t2}'`);
  console.log(`Output: ${solution.isAnagram(s2, t2)}`); // false
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
