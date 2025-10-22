/**
 * # 49. Group Anagrams
 *
 * # Difficulty: Medium
 *
 * Given an array of strings strs, group the anagrams together.
 *
 * @param {string[]} strs
 * @return {string[][]}
 */

class Solution {
  /**
   * Group anagrams using sorted string as key.
   *
   * Time Complexity: O(n * k log k)
   * Space Complexity: O(n * k)
   */
  groupAnagrams(strs) {
    const groups = new Map();

    for (const s of strs) {
      // Use sorted string as key
      const key = s.split("").sort().join("");

      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(s);
    }

    return Array.from(groups.values());
  }

  /**
   * Group anagrams using character count as key.
   *
   * Time Complexity: O(n * k)
   * Space Complexity: O(n * k)
   */
  groupAnagramsCharCount(strs) {
    const groups = new Map();

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
      groups.get(key).push(s);
    }

    return Array.from(groups.values());
  }

  /**
   * Group anagrams using prime number product as key.
   *
   * Time Complexity: O(n * k)
   * Space Complexity: O(n * k)
   */
  groupAnagramsPrime(strs) {
    // Prime numbers for a-z
    const primes = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97, 101,
    ];

    const groups = new Map();

    for (const s of strs) {
      // Calculate product of prime numbers
      let product = 1;
      for (const char of s) {
        product *= primes[char.charCodeAt(0) - "a".charCodeAt(0)];
      }

      if (!groups.has(product)) {
        groups.set(product, []);
      }
      groups.get(product).push(s);
    }

    return Array.from(groups.values());
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
  const solution = new Solution();

  // Helper to compare results
  function sameGroups(result, expected) {
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
