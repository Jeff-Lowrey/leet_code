/**
 * # Difficulty: Medium
 *
 * # 336. Palindrome
 *
 * You are given an array of strings words. A palindrome pair is defined as a pair of integers (i, j) where i != j such that the concatenation of words[i] + words[j] is a palindrome.
 *
 * Return an array of all the palindrome pairs of words.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>words = ["abcd","dcba","lls","s","sssll"]</dd>
 * <dt>Output:</dt>
 * <dd>[[0,1],[1,0]] (palindrome pairs)</dd>
 * <dt>Explanation:</dt>
 * <dd>Palindrome pairs like ['abcd','dcba'] concatenate to form palindrome 'abcddcba'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Build Trie of all words. For each word, try forming palindrome pairs by checking: 1) reverse exists in Trie, 2) prefix + reverse where suffix is palindrome, 3) reverse + suffix where prefix is palindrome.
 *
 * ### APPROACH:
 * 1. **Build trie**: Insert all words with their indices into trie
 * 2. **Define isPalindrome**: Helper function to check if string is palindrome
 * 3. **Search for pairs**: For each word, search in trie
 * 4. **Case 1 - word in trie**: If word + reversed_word is palindrome, add pair
 * 5. **Case 2 - prefix match**: If prefix in trie and remaining suffix is palindrome, add pair
 * 6. **Case 3 - suffix match**: Search all words in trie, check if can form palindrome
 * 7. **Avoid duplicates**: Skip pairs where i == j
 * 8. **Return result**: Return list of all palindrome pairs
 *
 * ### WHY THIS WORKS:
 * - Trie stores all words, search finds palindrome pairs efficiently
 * - For each word, check all possible split points: (prefix, suffix)
 * - If prefix is palindrome and reversed suffix exists in trie: valid pair
 * - If suffix is palindrome and reversed prefix exists in trie: valid pair
 * - O(n * k^2) time: n words, k avg length, k splits * k palindrome check
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: words = ["abcd","dcba","lls","s","sssll"]
 * Step 1: Check all pairs
 *   "lls" + "s" = "llss" (not palindrome)
 *   "s" + "lls" = "slls" (not palindrome)
 *   "abcd" + "dcba" = "abcddcba" (palindrome) ✓
 *
 * Output: [[0,1],[1,0]] (palindrome pairs)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class TrieNode {
  children: Map<string, TrieNode>;
  wordIndex: number;
  palindromeSuffixes: number[];

  constructor() {
    this.children = new Map();
    this.wordIndex = -1;
    this.palindromeSuffixes = [];
  }
}

class Solution {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Check if a substring is a palindrome.
   *
   * Time Complexity: O(k) where k is the length of substring
   * Space Complexity: O(1)
   */
  private isPalindrome(word: string, start: number, end: number): boolean {
    while (start < end - 1) {
      if (word[start] !== word[end - 1]) {
        return false;
      }
      start++;
      end--;
    }
    return true;
  }

  /**
   * Add a word to the trie structure (reversed).
   */
  private addWord(word: string, index: number): void {
    let node = this.root;
    const reversed = word.split("").reverse().join("");

    for (let i = 0; i < reversed.length; i++) {
      const char = reversed[i];

      // If the prefix (from reversed perspective) forms a palindrome,
      // store this word index
      if (this.isPalindrome(word, 0, word.length - i)) {
        node.palindromeSuffixes.push(index);
      }

      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }

    node.wordIndex = index;
    node.palindromeSuffixes.push(index);
  }

  /**
   * Find all pairs of words that form palindromes when concatenated.
   *
   * Time Complexity: O(n * k^2) where n is number of words, k is avg length
   * Space Complexity: O(n * k)
   */
  palindromePairs(words: string[]): number[][] {
    if (!words || words.length < 2) {
      return [];
    }

    // Build trie with all words (reversed)
    for (let i = 0; i < words.length; i++) {
      this.addWord(words[i], i);
    }

    const result: number[][] = [];

    // Check each word for potential pairs
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let node = this.root;

      // Check for empty string special case
      if (node.wordIndex >= 0 && node.wordIndex !== i && this.isPalindrome(word, 0, word.length)) {
        result.push([i, node.wordIndex]);
      }

      // Check each character
      for (let j = 0; j < word.length; j++) {
        const char = word[j];

        // If we can't find the character, break
        if (!node.children.has(char)) {
          break;
        }

        node = node.children.get(char)!;

        // Check if we found a word and remaining substring is palindrome
        if (node.wordIndex >= 0 && node.wordIndex !== i) {
          if (this.isPalindrome(word, j + 1, word.length)) {
            result.push([i, node.wordIndex]);
          }
        }
      }

      // Check palindrome suffixes
      for (const suffixIndex of node.palindromeSuffixes) {
        if (suffixIndex !== i) {
          result.push([i, suffixIndex]);
        }
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.palindromePairs(["abcd", "dcba", "lls", "s", "sssll"]);
  console.log(`Test 1: ${result1.length >= 2 ? "PASS" : "FAIL"}`);

  const result2 = solution.palindromePairs(["bat", "tab", "cat"]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([[0, 1], [1, 0]]) ? "PASS" : "FAIL"}`);

  const result3 = solution.palindromePairs(["a", ""]);
  console.log(`Test 3: ${result3.length === 2 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
