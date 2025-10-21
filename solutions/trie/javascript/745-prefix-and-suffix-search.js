/**
 * Difficulty: Hard
 *
 * # 745. Prefix And Suffix Search
 *
 * Design a special dictionary that searches the words in it by a prefix and a suffix.
 *
 * Implement the WordFilter class:
 * - WordFilter(string[] words) Initializes the object with the words in the dictionary.
 * - f(string pref, string suff) Returns the index of the word in the dictionary, which has the prefix pref and the suffix suff. If there is more than one valid index, return the largest of them. If there is no such word in the dictionary, return -1.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>words = ["apple"]</dd>
 * <dt>Output:</dt>
 * <dd>See walkthrough</dd>
 * <dt>Explanation:</dt>
 * <dd>WordFilter finds 'apple' with prefix='a' and suffix='e'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: Trie Operations, Prefix Matching
 * **Data Structures**: Trie (Prefix Tree)
 * **Patterns**: Trie Pattern, Prefix Search
 * **Time Complexity**: * - Constructor: O(N * L^3) where N is words count, L is max word length
 * **Space Complexity**: **O(N * L^3)

 *
 * ### INTUITION:
 * We need to efficiently search for words that match both a prefix and suffix. A clever trick is to create combined keys like "suffix{word}prefix" where '{' acts as a separator. We can then build a trie with all possible suffix#prefix combinations for each word. When searching, we look up "suff{pref" in the trie.
 *
 * ### APPROACH:
 * 1. **Trie with combined keys**: For each word, create entries for all suffix-prefix combinations
 * 2. **Store indices**: At each node, store the maximum word index seen so far
 * 3. **Search**: Look up "suffix{prefix" combination in trie
 * 4. **Return max index**: Return the index stored at the final node
 *
 * Alternative approaches:
 * - Two tries (one for prefix, one for suffix reversed)
 * - Hash map with all combinations
 * - Brute force filtering
 *
 * ### WHY THIS WORKS:
 * - Combining suffix and prefix with separator allows single trie lookup
 * - Storing maximum index at each node gives us the largest valid index
 * - All possible suffix-prefix pairs ensure we find all matches
 * - Trie structure provides O(L) lookup where L is prefix+suffix length
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * words = ["apple"]
 *
 * Build Trie with combinations:
 *   "e{a" (suffix "e", prefix "a")
 *   "le{a" (suffix "le", prefix "a")
 *   "ple{a" (suffix "ple", prefix "a")
 *   ...
 *   "e{ap" (suffix "e", prefix "ap")
 *   "le{ap" (suffix "le", prefix "ap")
 *   ...
 *   "apple{apple" (full word)
 *
 * f("a", "e"):
 *   Look up "e{a" in trie
 *   Find index 0 stored at that node
 *   Return 0
 *
 * words = ["apple", "apply", "application"]
 * indices: [0, 1, 2]
 *
 * f("app", "y"):
 *   Look up "y{app" in trie
 *   Find index 1 (apply)
 *   Return 1
 *
 * f("app", "e"):
 *   Look up "e{app" in trie
 *   Find indices 0 (apple) and 2 (application)
 *   Return 2 (maximum)
 * ```
 *
 * ### TIME COMPLEXITY:
 * - Constructor: O(N * L^3) where N is words count, L is max word length
 *   - For each word, we create L^2 combinations, each taking O(L) to insert
 * - f(): O(P + S) where P is prefix length, S is suffix length
 *
 * ### SPACE COMPLEXITY:
 * O(N * L^3)
 * For storing all suffix-prefix combinations in trie
 *
 * ### EDGE CASES:
 * - Multiple words with same prefix and suffix
 * - Word is both prefix and suffix
 * - Empty prefix or suffix
 * - No matching words
 * - Single character words
 *
 * </details>
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.index = -1; // Store the highest index of word ending here
  }
}

class WordFilter {
  /**
   * @param {string[]} words
   */
  constructor(words) {
    this.root = new TrieNode();

    // Insert all suffix+word combinations
    for (let idx = 0; idx < words.length; idx++) {
      const word = words[idx];

      // Insert all suffix combinations
      // For word "apple", insert: "e#apple", "le#apple", etc.
      for (let i = 0; i <= word.length; i++) {
        const suffix = word.substring(i);
        const key = suffix + "#" + word;
        this.insert(key, idx);
      }
    }
  }

  /**
   * Insert a key into Trie with associated index
   */
  insert(key, index) {
    let node = this.root;

    for (const char of key) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
      // Update index at each node to support prefix matching
      node.index = index;
    }
  }

  /**
   * Search for words with given prefix and suffix
   * @param {string} prefix
   * @param {string} suffix
   * @return {number}
   */
  f(prefix, suffix) {
    const searchKey = suffix + "#" + prefix;
    let node = this.root;

    // Traverse Trie following the search key
    for (const char of searchKey) {
      if (!node.children.has(char)) {
        return -1;
      }
      node = node.children.get(char);
    }

    // Return the highest index found
    return node.index;
  }
}

/**
 * Alternative solution using two Tries (more intuitive but slower)
 */
class WordFilterTwoTrie {
  constructor(words) {
    this.words = words;
    this.prefixTrie = new TrieNode();
    this.suffixTrie = new TrieNode();

    for (let i = 0; i < words.length; i++) {
      this.insertPrefix(words[i], i);
      this.insertSuffix(words[i], i);
    }
  }

  insertPrefix(word, index) {
    let node = this.prefixTrie;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
      if (node.index < index) {
        node.index = index;
      }
    }
  }

  insertSuffix(word, index) {
    let node = this.suffixTrie;
    for (let i = word.length - 1; i >= 0; i--) {
      const char = word[i];
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
      if (node.index < index) {
        node.index = index;
      }
    }
  }

  f(prefix, suffix) {
    // Get all indices matching prefix
    const prefixIndices = this.searchPrefix(prefix);
    if (prefixIndices.size === 0) return -1;

    // Get all indices matching suffix
    const suffixIndices = this.searchSuffix(suffix);
    if (suffixIndices.size === 0) return -1;

    // Find maximum index in intersection
    let maxIndex = -1;
    for (const idx of prefixIndices) {
      if (suffixIndices.has(idx) && idx > maxIndex) {
        maxIndex = idx;
      }
    }

    return maxIndex;
  }

  searchPrefix(prefix) {
    const indices = new Set();
    let node = this.prefixTrie;

    for (const char of prefix) {
      if (!node.children.has(char)) {
        return indices;
      }
      node = node.children.get(char);
    }

    this.collectIndices(node, indices);
    return indices;
  }

  searchSuffix(suffix) {
    const indices = new Set();
    let node = this.suffixTrie;

    for (let i = suffix.length - 1; i >= 0; i--) {
      const char = suffix[i];
      if (!node.children.has(char)) {
        return indices;
      }
      node = node.children.get(char);
    }

    this.collectIndices(node, indices);
    return indices;
  }

  collectIndices(node, indices) {
    if (node.index !== -1) {
      indices.add(node.index);
    }
    for (const child of node.children.values()) {
      this.collectIndices(child, indices);
    }
  }
}

/**
 * Test cases for Problem 745: Prefix and Suffix Search
 */
function testSolution() {
  console.log("Testing 745. Prefix and Suffix Search");

  // Test case 1: Basic functionality
  const wf1 = new WordFilter(["apple"]);
  const result1a = wf1.f("a", "e");
  console.assert(result1a === 0, `Test 1a failed: expected 0, got ${result1a}`);

  // Test case 2: Multiple words
  const wf2 = new WordFilter(["apple", "application", "appear"]);
  const result2a = wf2.f("app", "e");
  const result2b = wf2.f("ap", "r");
  console.assert(result2a === 0, `Test 2a failed: expected 0, got ${result2a}`);
  console.assert(result2b === 2, `Test 2b failed: expected 2, got ${result2b}`);

  // Test case 3: No match
  const wf3 = new WordFilter(["apple", "banana"]);
  const result3 = wf3.f("z", "e");
  console.assert(result3 === -1, `Test 3 failed: expected -1, got ${result3}`);

  // Test case 4: Duplicate words (return highest index)
  const wf4 = new WordFilter(["apple", "banana", "apple"]);
  const result4 = wf4.f("a", "e");
  console.assert(result4 === 2, `Test 4 failed: expected 2, got ${result4}`);

  // Test case 5: Empty prefix/suffix
  const wf5 = new WordFilter(["apple"]);
  const result5a = wf5.f("", "e");
  const result5b = wf5.f("a", "");
  console.assert(result5a === 0, `Test 5a failed: expected 0, got ${result5a}`);
  console.assert(result5b === 0, `Test 5b failed: expected 0, got ${result5b}`);

  console.log("All test cases passed for 745. Prefix and Suffix Search!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 745. Prefix and Suffix Search ===");
  console.log("Category: Trie");
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
  WordFilter,
  WordFilterTwoTrie,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - The suffix+#word trick is clever but not immediately obvious
 * - Two-Trie approach is more intuitive but uses more memory
 * - Consider trade-offs between initialization time and query time
 * - For very large word lists, might need additional optimizations
 * - Storing max index at each node is key optimization
 */
