/**
 * # 49. Group Anagrams
 *
 * # Difficulty: Medium
 *
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>strs = ["eat","tea","tan","ate","nat","bat"]</dd>
 * <dt>Output:</dt>
 * <dd>[["bat"],["nat","tan"],["ate","eat","tea"]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Grouping strings by their character composition</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Map, Sorting, Character Counting
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Grouping Pattern, Hash Key Generation
 * **Time Complexity**: O(n * k log k) where k is max string length
 * **Space Complexity**: O(n * k)
 *
 * ### INTUITION:
 * Anagrams have the same character composition. We can use this property to create
 * a unique key for each group. Strings with the same key are anagrams.
 *
 * ### APPROACH:
 * 1. **Sorted String as Key**: Sort each string and use sorted version as hash key
 * 2. **Character Count as Key**: Count character frequencies as tuple key
 * 3. **Group by Key**: All strings with same key go into same group
 * 4. **Return Values**: Extract all groups from hash map
 *
 * ### WHY THIS WORKS:
 * Anagrams produce the same sorted string (e.g., "eat" and "tea" both become "aet").
 * By using sorted strings as keys, we automatically group anagrams together.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: ["eat","tea","tan","ate","nat","bat"]
 *
 * Sorting approach:
 * "eat" → "aet" → group 1
 * "tea" → "aet" → group 1
 * "tan" → "ant" → group 2
 * "ate" → "aet" → group 1
 * "nat" → "ant" → group 2
 * "bat" → "abt" → group 3
 *
 * Result: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n * k log k) where n is number of strings, k is max length
 * - Sorting each string takes O(k log k)
 * - Process n strings
 *
 * ### SPACE COMPLEXITY:
 * O(n * k) for hash map storing all strings
 *
 * ### EDGE CASES:
 * - Empty array: return []
 * - Single string: return [[str]]
 * - All same: one group
 * - All different: n groups
 *
 * </details>
 */

class Solution {
  /**
   * Group anagrams using sorted string as key.
   *
   * Time Complexity: O(n * k log k)
   * Space Complexity: O(n * k)
   */
  groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const s of strs) {
      // Use sorted string as key
      const key = s.split("").sort().join("");

      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(s);
    }

    return Array.from(groups.values());
  }

  /**
   * Group anagrams using character count as key.
   *
   * Time Complexity: O(n * k)
   * Space Complexity: O(n * k)
   */
  groupAnagramsCharCount(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const s of strs) {
      // Count characters (26 lowercase letters)
      const count = new Array(26).fill(0);
      for (const char of s) {
        count[char.charCodeAt(0) - "a".charCodeAt(0)]++;
      }

      // Use array as key (convert to string for Map)
      const key = count.join(",");

      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(s);
    }

    return Array.from(groups.values());
  }

  /**
   * Group anagrams using prime number product as key.
   *
   * Time Complexity: O(n * k)
   * Space Complexity: O(n * k)
   */
  groupAnagramsPrime(strs: string[]): string[][] {
    // Prime numbers for a-z
    const primes = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97, 101,
    ];

    const groups = new Map<number, string[]>();

    for (const s of strs) {
      // Calculate product of prime numbers
      let product = 1;
      for (const char of s) {
        product *= primes[char.charCodeAt(0) - "a".charCodeAt(0)];
      }

      if (!groups.has(product)) {
        groups.set(product, []);
      }
      groups.get(product)!.push(s);
    }

    return Array.from(groups.values());
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Helper to compare results
  function sameGroups(result: string[][], expected: string[][]): boolean {
    const resultSorted = result.map((g) => g.sort()).sort();
    const expectedSorted = expected.map((g) => g.sort()).sort();
    return JSON.stringify(resultSorted) === JSON.stringify(expectedSorted);
  }

  const strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
  const expected1 = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]];

  console.log(`Test 1: ${sameGroups(solution.groupAnagrams(strs1), expected1) ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${sameGroups(solution.groupAnagrams([""]), [[""]]) ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${sameGroups(solution.groupAnagrams(["a"]), [["a"]]) ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${sameGroups(solution.groupAnagramsCharCount(strs1), expected1) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
