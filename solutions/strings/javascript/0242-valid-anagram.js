/**
 * # 242. Valid Anagram
 *
 * # Difficulty: Easy
 *
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

class Solution {
  /**
   * Check if two strings are anagrams using hash map.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  isAnagram(s, t) {
    // Early exit: different lengths can't be anagrams
    if (s.length !== t.length) {
      return false;
    }

    // Count character frequencies
    const charCount = {};

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
  isAnagramSorting(s, t) {
    return s.split("").sort().join("") === t.split("").sort().join("");
  }

  /**
   * Check using Map.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  isAnagramMap(s, t) {
    if (s.length !== t.length) {
      return false;
    }

    const charCount = new Map();

    for (const char of s) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    for (const char of t) {
      if (!charCount.has(char)) {
        return false;
      }
      charCount.set(char, charCount.get(char) - 1);
      if (charCount.get(char) < 0) {
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
  isAnagramArray(s, t) {
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

function runTests() {
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
