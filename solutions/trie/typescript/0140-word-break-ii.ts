/**
 * # Difficulty: Hard
 *
 * # 140. Word Break II
 *
 * Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.
 *
 * Note that the same word in the dictionary may be reused multiple times in the segmentation.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["cat", "cats", "and", "sand", "dog"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Word break II splits 'catsanddog' into ['cats and dog', 'cat sand dog']</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Dynamic Programming
 * **Time Complexity**: O(N^3 + M*L)
 * **Space Complexity**: O(M*L + N^2)
 *
 * ### INTUITION:
 * This problem requires finding all possible ways to break a string into valid words. Using a Trie helps efficiently check if a prefix exists in the dictionary, and backtracking explores all possible segmentations. Memoization prevents redundant computation for the same substring.
 *
 * ### APPROACH:
 * 1. **Build Trie**: Insert all dictionary words into a trie for efficient prefix checking
 * 2. **Backtracking**: Try to match prefixes at each position
 * 3. **Memoization**: Cache results for each starting position to avoid recomputation
 * 4. **Collect sentences**: Build valid sentences by combining matched words
 *
 * Alternative: Use recursion with memoization without Trie (checking against word set)
 *
 * ### WHY THIS WORKS:
 * - Trie enables efficient prefix matching as we scan through the string
 * - Backtracking explores all possible word boundaries
 * - Memoization prevents exponential time by caching substring results
 * - When we find a word end in trie, we recursively solve for remaining string
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
 *
 * Build Trie with: cat, cats, and, sand, dog
 *
 * At position 0 "catsanddog":
 *   Match "cat" -> recurse on "sanddog"
 *     Match "sand" -> recurse on "dog"
 *       Match "dog" -> return ["dog"]
 *     Return ["sand dog"]
 *   Return ["cat sand dog"]
 *
 *   Match "cats" -> recurse on "anddog"
 *     Match "and" -> recurse on "dog"
 *       Match "dog" -> return ["dog"]
 *     Return ["and dog"]
 *   Return ["cats and dog"]
 *
 * Final: ["cat sand dog", "cats and dog"]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(N^3 + M*L)
 * Where N is string length, M is number of words, L is average word length
 * - Trie building: O(M*L)
 * - Backtracking with memoization: O(N^3) in worst case
 *
 * ### SPACE COMPLEXITY:
 * O(M*L + N^2)
 * - Trie storage: O(M*L)
 * - Memoization cache: O(N^2) for storing results
 *
 * ### EDGE CASES:
 * - No valid segmentation exists
 * - Multiple segmentations possible
 * - String is a single word
 * - Empty string
 * - Words can be reused
 *
 * </details>
 */

class Solution {
  wordBreak(s: string, wordDict: string[]): string[] {
    const wordSet = new Set(wordDict);
    const memo = new Map<number, string[]>();

    const backtrack = (start: number): string[] => {
      if (start === s.length) return [""];

      if (memo.has(start)) return memo.get(start)!;

      const result: string[] = [];

      for (let end = start + 1; end <= s.length; end++) {
        const word = s.substring(start, end);

        if (wordSet.has(word)) {
          const subSentences = backtrack(end);

          for (const sentence of subSentences) {
            result.push(sentence ? word + " " + sentence : word);
          }
        }
      }

      memo.set(start, result);
      return result;
    };

    return backtrack(0);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]);
  console.log(`Test 1: ${result1.length === 2 ? "PASS" : "FAIL"}`);

  const result2 = solution.wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]);
  console.log(`Test 2: ${result2.length === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
