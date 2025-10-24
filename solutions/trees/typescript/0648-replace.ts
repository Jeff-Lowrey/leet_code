/**
 * # Difficulty: Medium
 *
 * # 0648. Replace Words
 *
 * Difficulty: Medium
 *
 * In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word derivative. For example, when the root "help" is followed by the word "ful", we can form a derivative "helpful".
 *
 * Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the derivatives in the sentence with the root forming it. If a derivative can be replaced by more than one root, replace it with the root that has the shortest length.
 *
 * Return the sentence after the replacement.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"</dd>
 * <dt>Output:</dt>
 * <dd>"the cat was rat by the bat"</dd>
 * <dt>Explanation:</dt>
 * <dd>Words are replaced by their shortest root: 'cattle' becomes 'cat', 'ratt' becomes 'rat'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Build Trie of dictionary words. For each word in sentence, find shortest prefix in Trie. If found, replace with shortest; otherwise keep original word.
 *
 * ### APPROACH:
 * 1. **Build trie**: Insert all dictionary words into trie
 * 2. **Define findRoot**: Implement function to find shortest root for a word
 * 3. **Traverse trie**: For each character in word, follow trie path
 * 4. **Found root**: If reach end of word in trie, return prefix
 * 5. **No root**: If path breaks or no root found, return original word
 * 6. **Process sentence**: Split sentence, replace each word using findRoot
 * 7. **Return result**: Join replaced words with spaces
 *
 * ### WHY THIS WORKS:
 * - Trie stores dictionary roots, replace words with shortest matching root
 * - For each word in sentence, search trie while traversing characters
 * - Stop at first matching root (shortest prefix that's a complete word)
 * - If no root found, keep original word
 * - O(m + n*k) time: m total dict length, n words in sentence, k avg word length
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
 * ```
 *
 * Step 1: Build trie from dictionary
 * Insert: cat, bat, rat
 * Step 2: Replace each word with shortest root
 *
 * Steps:
 * Step 1: "cattle" → "cat"
 * Step 2: "rattled" → "rat"
 * Step 3: "battery" → "bat"
 *
 * Output:
 * ```
 * "the cat was rat by the bat"
 * ```

 * ### TIME COMPLEXITY:

 * O(n)

 * - Single pass through the input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  /**
   * Replace longer words in the sentence with their root word from the dictionary
   * if the word starts with the root.
   *
   * Time Complexity: O(m + n * k) where m is total dictionary length,
   *                  n is words in sentence, k is avg word length
   * Space Complexity: O(m) for the root set
   */
  replaceWords(dictionary: string[], sentence: string): string {
    // Edge cases
    if (!dictionary || !sentence) {
      return sentence;
    }

    // Create a set of roots for O(1) lookup
    const rootSet = new Set(dictionary);

    // Split the sentence into words
    const words = sentence.split(" ");

    // Process each word
    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Check all possible prefixes of the current word
      for (let j = 1; j <= word.length; j++) {
        const prefix = word.substring(0, j);

        // If we find a root, replace the word with the root
        if (rootSet.has(prefix)) {
          words[i] = prefix;
          break;
        }
      }
    }

    // Join the words back into a sentence
    return words.join(" ");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.replaceWords(["cat", "bat", "rat"], "the cattle was rattled by the battery");
  console.log(`Test 1: ${result1 === "the cat was rat by the bat" ? "PASS" : "FAIL"}`);

  const result2 = solution.replaceWords([], "hello world");
  console.log(`Test 2: ${result2 === "hello world" ? "PASS" : "FAIL"}`);

  const result3 = solution.replaceWords(["a", "aa", "aaa", "aaaa"], "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa");
  console.log(`Test 3: ${result3 === "a a a a a a a a bbb baba a" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
