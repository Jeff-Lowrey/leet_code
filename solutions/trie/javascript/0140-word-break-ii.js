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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Dynamic Programming
 * **Time Complexity**: * O(N^3 + M*L)
 * **Space Complexity**: * O(M*L + N^2)

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
 * Input:
 * ```
 * s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
 * ```
 *
 * Build Trie with: cat, cats, and, sand, dog
 * At position 0 "catsanddog":
 *
 * Steps:
 * Step 1: Match "cat" -> recurse on "sanddog"
 * Step 2: Match "sand" -> recurse on "dog"
 * Step 3: Match "dog" -> return ["dog"]
 * Step 4: Return ["sand dog"]
 * Step 5: Return ["cat sand dog"]
 * Step 6: Match "cats" -> recurse on "anddog"
 * Step 7: Match "and" -> recurse on "dog"
 * Step 8: Match "dog" -> return ["dog"]
 * Step 9: Return ["and dog"]
 * Step 10: Return ["cats and dog"]
 * Step 11: Final: ["cat sand dog", "cats and dog"]

### TIME COMPLEXITY:
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

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isWord = true;
  }

  /**
   * Find all words in Trie that match string starting from index
   */
  findWords(s, start) {
    const words = [];
    let node = this.root;

    for (let i = start; i < s.length; i++) {
      const char = s[i];
      if (!node.children.has(char)) {
        break;
      }
      node = node.children.get(char);
      if (node.isWord) {
        words.push(s.substring(start, i + 1));
      }
    }

    return words;
  }
}

/**
 * Main solution for Problem 140: Word Break II
 *
 * @param {string} s - The input string
 * @param {string[]} wordDict - Dictionary of words
 * @return {string[]} - All possible word break sentences
 *
 * Time Complexity: O(n^3) with memoization
 * Space Complexity: O(n * 2^n)
 */
function wordBreak(s, wordDict) {
  const trie = new Trie();
  for (const word of wordDict) {
    trie.insert(word);
  }

  // Memoization cache: index -> list of sentences
  const memo = new Map();

  const dfs = (start) => {
    // Base case: reached end of string
    if (start === s.length) {
      return [""];
    }

    // Check memoization
    if (memo.has(start)) {
      return memo.get(start);
    }

    const sentences = [];

    // Find all words that start from current position
    const words = trie.findWords(s, start);

    for (const word of words) {
      // Recurse for remaining string
      const subSentences = dfs(start + word.length);

      // Combine current word with sub-sentences
      for (const subSentence of subSentences) {
        if (subSentence) {
          sentences.push(word + " " + subSentence);
        } else {
          sentences.push(word);
        }
      }
    }

    memo.set(start, sentences);
    return sentences;
  };

  return dfs(0);
}

/**
 * Alternative solution without Trie (using Set)
 */
function wordBreakSet(s, wordDict) {
  const wordSet = new Set(wordDict);
  const memo = new Map();

  const dfs = (start) => {
    if (start === s.length) {
      return [""];
    }

    if (memo.has(start)) {
      return memo.get(start);
    }

    const sentences = [];

    // Try all possible word lengths from current position
    for (let end = start + 1; end <= s.length; end++) {
      const word = s.substring(start, end);

      if (wordSet.has(word)) {
        const subSentences = dfs(end);

        for (const subSentence of subSentences) {
          if (subSentence) {
            sentences.push(word + " " + subSentence);
          } else {
            sentences.push(word);
          }
        }
      }
    }

    memo.set(start, sentences);
    return sentences;
  };

  return dfs(0);
}

/**
 * Test cases for Problem 140: Word Break II
 */
function testSolution() {
  console.log("Testing 140. Word Break II");

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, idx) => val === sortedB[idx]);
  };

  // Test case 1: Multiple solutions
  const result1 = wordBreak("catsanddog", [
    "cat",
    "cats",
    "and",
    "sand",
    "dog",
  ]);
  const expected1 = ["cat sand dog", "cats and dog"];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: No solution
  const result2 = wordBreak("pineapplepenapple", [
    "apple",
    "pen",
    "applepen",
    "pine",
    "pineapple",
  ]);
  const expected2 = [
    "pine apple pen apple",
    "pine applepen apple",
    "pineapple pen apple",
  ];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: No valid break
  const result3 = wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]);
  const expected3 = [];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Single word
  const result4 = wordBreak("cat", ["cat"]);
  const expected4 = ["cat"];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Set-based solution
  const result5 = wordBreakSet("catsanddog", [
    "cat",
    "cats",
    "and",
    "sand",
    "dog",
  ]);
  console.assert(
    arraysEqual(result5, expected1),
    `Test 5 (Set) failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Overlapping words
  const result6 = wordBreak("aaaa", ["a", "aa", "aaa"]);
  const expected6 = [
    "a a a a",
    "a a aa",
    "a aa a",
    "a aaa",
    "aa a a",
    "aa aa",
    "aaa a",
  ];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  console.log("All test cases passed for 140. Word Break II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 140. Word Break II ===");
  console.log("Category: Trie / Dynamic Programming / Backtracking");
  console.log("Difficulty: Hard");
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  wordBreak,
  wordBreakSet,
  Trie,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Trie optimization helps when dictionary is large
 * - Memoization is crucial to avoid exponential time complexity
 * - Set-based solution is simpler and often faster for small dictionaries
 * - Consider early termination if checking if ANY solution exists first
 * - This is a combination of backtracking and dynamic programming
 */
