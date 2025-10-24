/**
 * # 49. Group Anagrams
 *
 * Difficulty: Easy
 *
 * # Difficulty: Medium
 *
 * Given an array of strings strs, group the anagrams together. You can return the
 * `answer` in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different
 * word or phrase, typically using all the original letters exactly once.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>strs = ["eat","tea","tan","ate","nat","bat"]</dd>
 * <dt>Output:</dt>
 * <dd>[["bat"],["nat","tan"],["ate","eat","tea"]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Words ['eat','tea','ate'] are anagrams grouped together, as are ['tan','nat'], and ['bat'] alone</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Sorting
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: - **Sorting approach**: O(n × k log k) where n = number of strings, k = max string length
 * **Space Complexity**: O(n × k)
 *
 * ### INTUITION:
 * Group strings by their "anagram signature" - a canonical representation that's the same for all anagrams. Two common signatures: sorted characters or character frequency count.
 *
 * ### APPROACH:
 * 1. **Create signature**: For each string, generate a canonical form (sorted chars or char counts)
 * 2. **Group by signature**: Use a hash map where signature is key, list of anagrams is value
 * 3. **Return groups**: Extract all value lists from the hash map
 *
 * ### WHY THIS WORKS:
 * - All anagrams have the same signature (sorted characters or character counts)
 * - Hash map automatically groups strings with identical signatures
 * - Different anagrams will have different signatures
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * ["eat","tea","tan","ate","nat","bat"]
 * ```
 *
 * Using sorted string as key:
 *
 * Steps:
 * Step 1: "eat" → key "aet" → group 1
 * Step 2: "tea" → key "aet" → group 1
 * Step 3: "tan" → key "ant" → group 2
 * Step 4: "ate" → key "aet" → group 1
 * Step 5: "nat" → key "ant" → group 2
 * Step 6: "bat" → key "abt" → group 3
 *
 * Final groups:
 * ```
 * "aet": ["eat", "tea", "ate"]
 * "ant": ["tan", "nat"]
 * "abt": ["bat"]
 * ```
 *
 * Output:
 * ```
 * [["eat","tea","ate"], ["tan","nat"], ["bat"]]
 * ```

### TIME COMPLEXITY:
 * - **Sorting approach**: O(n × k log k) where n = number of strings, k = max string length
 * - **Counting approach**: O(n × k) - more efficient
 *
 * ### SPACE COMPLEXITY:
 * O(n × k)
 *
 * ### EDGE CASES:
 * - **Empty string array**: Return empty list
 * - **Single string**: Return [[string]]
 * - **No anagrams**: Each string in its own group
 * - **All anagrams of each other**: Return single group with all strings
 * - **Empty strings**: All empty strings grouped together
 *
 * </details>
 */

class Solution {
  /**
   * Approach: Hash map with sorted string as key
   * Time Complexity: O(n * k log k) where n is number of strings, k is max length
   * Space Complexity: O(n * k)
   */
  groupAnagrams(strs: string[]): string[][] {
    const anagrams = new Map<string, string[]>();

    for (const s of strs) {
      // Sort string to create key
      const key = s.split("").sort().join("");

      if (!anagrams.has(key)) {
        anagrams.set(key, []);
      }
      anagrams.get(key)!.push(s);
    }

    return Array.from(anagrams.values());
  }

  /**
   * Approach: Character count as tuple key
   * Time Complexity: O(n * k) where n is number of strings, k is max length
   * Space Complexity: O(n * k)
   */
  groupAnagramsOptimal(strs: string[]): string[][] {
    const anagrams = new Map<string, string[]>();

    for (const s of strs) {
      // Count characters
      const count = new Array(26).fill(0);
      for (const char of s) {
        count[char.charCodeAt(0) - "a".charCodeAt(0)]++;
      }

      // Use string representation of counts as key
      const key = count.join(",");

      if (!anagrams.has(key)) {
        anagrams.set(key, []);
      }
      anagrams.get(key)!.push(s);
    }

    return Array.from(anagrams.values());
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1
  const strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
  console.log(`Input: ${JSON.stringify(strs1)}`);
  console.log(`Output: ${JSON.stringify(solution.groupAnagrams(strs1))}`);

  // Test case 2
  const strs2 = [""];
  console.log(`Input: ${JSON.stringify(strs2)}`);
  console.log(`Output: ${JSON.stringify(solution.groupAnagrams(strs2))}`);

  // Test case 3
  const strs3 = ["a"];
  console.log(`Input: ${JSON.stringify(strs3)}`);
  console.log(`Output: ${JSON.stringify(solution.groupAnagrams(strs3))}`);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
