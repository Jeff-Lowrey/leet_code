/**
 * ### METADATA:\n**Techniques**: Hash Map Grouping, Sorted String as Key\n**Data Structures**: Hash Map (defaultdict)\n**Time Complexity**: O(n × k log k)\n**Space Complexity**: O(n × k)\n\n### INTUITION:
 * The key insight is that group strings by their "anagram signature" - a canonical representation that's the same for all anagrams. Two common signatures: sorted characters or character frequency count.
 *
 * ### APPROACH:
 * 1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
 * 2. **Compare lengths**: Calculate the length of both the original array and the newly created set
 * 3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
 * 4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
 * 5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set
 *
 * ### WHY THIS WORKS:
 * - This ensures that all anagrams have the same signature (sorted characters or character counts)
 * - This ensures that hash map automatically groups strings with identical signatures
 * - This ensures that different anagrams will have different signatures
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
 *
 * ### TIME COMPLEXITY:
 * O(n × k log k)** - where n is the number of strings and k is the maximum string length. For the sorting approach: we iterate through all n strings (**O(n)**), and for each string we sort its k characters (**O(k log k)**). Total: **O(n × k log k)**. The character counting approach is more efficient at **O(n × k)** since counting characters takes **O(k)** time per string without sorting.
 *
 * ### SPACE COMPLEXITY:
 * O(n × k)** - where n is the number of strings and k is the average string length. We store all n strings in the hash map, each with average length k. The map keys (sorted strings or character counts) also take **O(k)** space per unique anagram group. In the worst case where all strings are unique, we have n groups, each storing one string of length k, giving us **O(n × k)** total space. The character count array uses **O(26)** = **O(1)** space per string, which doesn't affect the overall **O(n × k)** complexity.
 *
 * ### EDGE CASES:
 * - **Empty string array**: Return empty list
 * - **Single string**: Return [[string]]
 * - **No anagrams**: Each string in its own group
 * - **All anagrams of each other**: Return single group with all strings
 * - **Empty strings**: All empty strings grouped together
 *
 * */

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
