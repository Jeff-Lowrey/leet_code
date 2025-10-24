/**
 * # Difficulty: Easy
 *
 * # 0028. Find The Index Of The First Occurrence In A String
 *
 *
 * This problem demonstrates key concepts in String matching and pattern searching.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>haystack = "sadbutsad", needle = "sad"</dd>
 * <dt>Output:</dt>
 * <dd>0</dd>
 * <dt>Explanation:</dt>
 * <dd>Needle 'sad' occurs at index 0 in 'sadbutsad'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Stack Operations
 * **Data Structures**: String, Stack
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n * m)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * This is the classic string matching problem (also known as finding a substring). We need to find
 * the first position where the needle (pattern) appears in the haystack (text). The straightforward
 * approach is to check each position in the haystack to see if the needle starts there.
 *
 * ### APPROACH:
 * 1. **Handle edge cases**: If needle is empty, return 0 (convention)
 * 2. **Iterate through valid positions**: Only check positions where needle could fit
 * 3. **Check each position**: For each valid position, compare needle with substring
 * 4. **Return on match**: As soon as we find a match, return the starting index
 * 5. **Return -1 if not found**: If we complete the loop without finding needle
 *
 * ### WHY THIS WORKS:
 * - We systematically check every possible position where needle could start
 * - At each position, we verify if all characters of needle match
 * - We stop early if we find a mismatch at any position within needle
 * - The first match we find is guaranteed to be the earliest occurrence
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * haystack = "sadbutsad", needle = "sad"
 * haystack = "leetcode", needle = "leeto"
 * ```
 *
 * Step 1: Check position 0: "sad" == "sad" ✓
 * Step 1: Check position 0: "leetc" != "leeto" ✗
 * Step 2: Check position 1: "eetco" != "leeto" ✗
 * ...continue checking...
 * Step n: No match found
 *
 * Output:
 * ```
 * 0
 * -1
 * ```

 * ### TIME COMPLEXITY:
 * O(n * m)
 * Where n is the length of haystack and m is the length of needle. In the worst case, we check
 * every position (n - m + 1) and for each position compare m characters.
 *
 * Note: More advanced algorithms like KMP or Rabin-Karp can achieve O(n + m), but for most
 * practical purposes and typical inputs, the simple approach is sufficient and easier to understand.
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * We only use a few variables regardless of input size.
 *
 * ### EDGE CASES:
 * - Empty needle: Return 0 (convention)
 * - Needle longer than haystack: Return -1
 * - Needle equals haystack: Return 0
 * - Needle not in haystack: Return -1
 * - Multiple occurrences: Return first one
 *
 * </details>
 */

class Solution {
  /**
   * Find the index of the first occurrence of needle in haystack.
   *
   * Time Complexity: O(n * m)
   * Space Complexity: O(1)
   */
  strStr(haystack: string, needle: string): number {
    if (!needle) {
      return 0;
    }

    if (needle.length > haystack.length) {
      return -1;
    }

    for (let i = 0; i <= haystack.length - needle.length; i++) {
      let match = true;
      for (let j = 0; j < needle.length; j++) {
        if (haystack[i + j] !== needle[j]) {
          match = false;
          break;
        }
      }

      if (match) {
        return i;
      }
    }

    return -1;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.strStr("sadbutsad", "sad") === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.strStr("leetcode", "leeto") === -1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.strStr("hello", "ll") === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.strStr("a", "a") === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.strStr("hello", "") === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
