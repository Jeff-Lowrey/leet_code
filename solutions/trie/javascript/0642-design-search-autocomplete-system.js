/**
 * # Difficulty: Hard
 *
 * # 642. Design Search Autocomplete System
 *
 * Difficulty: Medium
 *
 * Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character '#').
 *
 * You are given a string array sentences and an integer array times both of length n where sentences[i] is a previously typed sentence and times[i] is the corresponding number of times the sentence has been typed. For each input character except '#', return the top 3 historical hot sentences that have the same prefix as the part of the sentence already typed.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>sentences = ["i love you", "island", "iroman", "i love leetcode"]</dd>
 * <dt>Output:</dt>
 * <dd>times = [5, 3, 2, 2]</dd>
 * <dt>Explanation:</dt>
 * <dd>AutocompleteSystem returns top 3 sentences by frequency</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: * - Constructor: O(N * L) where N is sentences count, L is average length
 * **Space Complexity**: * O(N * L)

 *
 * ### INTUITION:
 * This is an advanced autocomplete system that needs to track search frequency and return top results. We use a Trie to organize sentences by prefixes, and at each node, we maintain a list of sentences that pass through it along with their frequencies. When a character is typed, we navigate to that node and return top 3 by frequency.
 *
 * ### APPROACH:
 * 1. **Build Trie with frequency**: Each node stores sentences passing through it with their counts
 * 2. **Track current input**: Maintain current search string as user types
 * 3. **Navigate on input**: For each character, move to corresponding child node
 * 4. **Return top 3**: Sort sentences by frequency (descending) and lexicographically
 * 5. **Save on '#'**: When '#' received, save current sentence and reset
 * 6. **Update counts**: Increment count for saved sentences
 *
 * ### WHY THIS WORKS:
 * - Trie organizes sentences by prefixes efficiently
 * - Storing sentences at each node enables quick retrieval
 * - Sorting by frequency and lexicographically gives desired ranking
 * - Current input tracking allows stateful interaction
 * - Reset on '#' prepares for next query
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * sentences = ["i love you", "island", "iroman", "i love leetcode"]
 * ```
 *
 * times = [5, 3, 2, 2]
 * Build Trie:
 * Input 'i':
 * Input ' ':
 * Input 'a':
 * Input '#':
 *
 * Steps:
 * Step 1: root -> 'i' -> sentences: [("i love you", 5), ("island", 3), ...]
 * Step 2: -> 'l' -> sentences: [("i love you", 5), ("i love leetcode", 2)]
 * Step 3: Navigate to 'i' node
 * Step 4: Return top 3: ["i love you", "island", "i love leetcode"]
 * Step 5: Navigate to ' ' node under 'i'
 * Step 6: Return: ["i love you", "i love leetcode"]
 * Step 7: Navigate to 'a' node - doesn't exist
 * Step 8: Return: []
 * Step 9: Save "i a" with frequency 1
 * Step 10: Reset current input
 * 
 * Output:
 * ```
 * ["i love you", "i love leetcode"]
 * ```
 * 
 * ### TIME COMPLEXITY:
 * - Constructor: O(N * L) where N is sentences count, L is average length
 * - Input: O(P * M * log M) where P is prefix length, M is matching sentences
 * - Sorting dominates input complexity
 *
 * ### SPACE COMPLEXITY:
 * O(N * L)
 * For trie storage with all sentences
 *
 * ### EDGE CASES:
 * - Fewer than 3 matching sentences
 * - No matches for prefix
 * - Updating existing sentence frequency
 * - Same frequency (use lexicographic order)
 * - Empty initial history
 *
 * </details>
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.sentences = new Map(); // sentence -> frequency
  }
}

class AutocompleteSystem {
  /**
   * @param {string[]} sentences
   * @param {number[]} times
   */
  constructor(sentences, times) {
    this.root = new TrieNode();
    this.currentPrefix = "";

    // Build initial Trie
    for (let i = 0; i < sentences.length; i++) {
      this.addSentence(sentences[i], times[i]);
    }
  }

  /**
   * Add sentence to Trie with frequency
   */
  addSentence(sentence, frequency) {
    let node = this.root;

    // For each prefix of the sentence, store the complete sentence
    for (let i = 0; i < sentence.length; i++) {
      const char = sentence[i];

      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);

      // Add/update sentence frequency at this prefix
      const currentFreq = node.sentences.get(sentence) || 0;
      node.sentences.set(sentence, currentFreq + frequency);
    }
  }

  /**
   * Get top 3 sentences for current prefix
   */
  getTop3(node) {
    if (!node) return [];

    // Get all sentences with their frequencies
    const sentenceList = Array.from(node.sentences.entries());

    // Sort by frequency (desc), then lexicographically (asc)
    sentenceList.sort((a, b) => {
      if (a[1] !== b[1]) {
        return b[1] - a[1]; // Higher frequency first
      }
      return a[0].localeCompare(b[0]); // Lexicographic order
    });

    // Return top 3 sentences (without frequencies)
    return sentenceList.slice(0, 3).map((item) => item[0]);
  }

  /**
   * Process input character
   * @param {character} c
   * @return {string[]}
   */
  input(c) {
    if (c === "#") {
      // Save current sentence
      if (this.currentPrefix) {
        this.addSentence(this.currentPrefix, 1);
      }
      this.currentPrefix = "";
      return [];
    }

    // Add character to current prefix
    this.currentPrefix += c;

    // Navigate to current prefix in Trie
    let node = this.root;
    for (const char of this.currentPrefix) {
      if (!node.children.has(char)) {
        return []; // No matching sentences
      }
      node = node.children.get(char);
    }

    // Return top 3 sentences
    return this.getTop3(node);
  }
}

/**
 * Alternative implementation with sentence collection at end nodes only
 */
class AutocompleteSystemAlt {
  constructor(sentences, times) {
    this.root = new TrieNode();
    this.currentPrefix = "";
    this.sentenceFreq = new Map();

    for (let i = 0; i < sentences.length; i++) {
      this.sentenceFreq.set(sentences[i], times[i]);
      this.insertSentence(sentences[i]);
    }
  }

  insertSentence(sentence) {
    let node = this.root;
    for (const char of sentence) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.sentence = sentence;
  }

  collectSentences(node, sentences) {
    if (node.sentence) {
      sentences.push(node.sentence);
    }
    for (const child of node.children.values()) {
      this.collectSentences(child, sentences);
    }
  }

  input(c) {
    if (c === "#") {
      if (this.currentPrefix) {
        const freq = this.sentenceFreq.get(this.currentPrefix) || 0;
        this.sentenceFreq.set(this.currentPrefix, freq + 1);
        this.insertSentence(this.currentPrefix);
      }
      this.currentPrefix = "";
      return [];
    }

    this.currentPrefix += c;

    let node = this.root;
    for (const char of this.currentPrefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char);
    }

    const sentences = [];
    this.collectSentences(node, sentences);

    // Sort and return top 3
    sentences.sort((a, b) => {
      const freqA = this.sentenceFreq.get(a) || 0;
      const freqB = this.sentenceFreq.get(b) || 0;
      if (freqA !== freqB) {
        return freqB - freqA;
      }
      return a.localeCompare(b);
    });

    return sentences.slice(0, 3);
  }
}

/**
 * Test cases for Problem 642: Design Search Autocomplete System
 */
function testSolution() {
  console.log("Testing 642. Design Search Autocomplete System");

  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Basic functionality
  const ac1 = new AutocompleteSystem(
    ["i love you", "island", "iroman", "i love leetcode"],
    [5, 3, 2, 2],
  );

  let result = ac1.input("i");
  console.assert(
    arraysEqual(result, ["i love you", "island", "i love leetcode"]),
    `Test 1a failed: expected ["i love you","island","i love leetcode"], got ${JSON.stringify(result)}`,
  );

  result = ac1.input(" ");
  console.assert(
    arraysEqual(result, ["i love you", "i love leetcode"]),
    `Test 1b failed: expected ["i love you","i love leetcode"], got ${JSON.stringify(result)}`,
  );

  result = ac1.input("a");
  console.assert(
    arraysEqual(result, []),
    `Test 1c failed: expected [], got ${JSON.stringify(result)}`,
  );

  result = ac1.input("#");
  console.assert(
    arraysEqual(result, []),
    `Test 1d failed: expected [], got ${JSON.stringify(result)}`,
  );

  // Test case 2: New sentence added
  const ac2 = new AutocompleteSystem(["i love you"], [5]);
  ac2.input("i");
  ac2.input(" ");
  ac2.input("a");
  ac2.input("#");

  result = ac2.input("i");
  result = ac2.input(" ");
  result = ac2.input("a");
  console.assert(
    arraysEqual(result, ["i a"]),
    `Test 2 failed: expected ["i a"], got ${JSON.stringify(result)}`,
  );

  // Test case 3: Lexicographic ordering with same frequency
  const ac3 = new AutocompleteSystem(["abc", "abd", "abe"], [1, 1, 1]);
  result = ac3.input("a");
  result = ac3.input("b");
  console.assert(
    arraysEqual(result, ["abc", "abd", "abe"]),
    `Test 3 failed: expected ["abc","abd","abe"], got ${JSON.stringify(result)}`,
  );

  // Test case 4: Less than 3 results
  const ac4 = new AutocompleteSystem(["hello"], [10]);
  result = ac4.input("h");
  console.assert(
    arraysEqual(result, ["hello"]),
    `Test 4 failed: expected ["hello"], got ${JSON.stringify(result)}`,
  );

  console.log(
    "All test cases passed for 642. Design Search Autocomplete System!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 642. Design Search Autocomplete System ===");
  console.log("Category: Trie / Design");
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
  AutocompleteSystem,
  AutocompleteSystemAlt,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Storing sentences at each prefix node trades space for time
 * - Alternative: Store only at leaf nodes and DFS collect (saves space)
 * - Consider using min-heap for top-k instead of full sort
 * - Real systems might cache results for common prefixes
 * - Could optimize by limiting stored sentences per node
 */
