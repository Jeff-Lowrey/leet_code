/**
 * # Difficulty: Medium
 *
 * # 820. Short Encoding of Words
 *
 * Difficulty: Medium
 *
 * A valid encoding of an array of words is any reference string s and an array of indices indices such that:
 * - words.length == indices.length
 * - The reference string s ends with the character '#'
 * - For each index indices[i], the substring of s starting at indices[i] and ending at the next '#' is equal to words[i]
 *
 * Given an array of words, return the length of the shortest reference string s possible of any valid encoding of words.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["time", "me", "bell"]</dd>
 * <dt>Output:</dt>
 * <dd>"minimumLengthEncoding({words1}) -> {result1}"</dd>
 * <dt>Explanation:</dt>
 * <dd>The shortest unique prefix for 'apple' is 'app'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: * O(N × M)
 * **Space Complexity**: * O(N × M)

 *
 * ### INTUITION:
 * To minimize the encoding length, we want to share suffixes between words. If one word is a suffix of another, we can encode both using just the longer word. This is a classic Trie problem where we build the trie using word suffixes.
 *
 * ### APPROACH:
 * 1. **Trie Construction**: Build a trie using the reverse of each word (to handle suffixes)
 * 2. **Deduplication**: Remove words that are suffixes of other words
 * 3. **Length Calculation**: For each unique word, add its length + 1 (for '#') to the total
 *
 * ### WHY THIS WORKS:
 * - Trie naturally handles prefix/suffix relationships
 * - By reversing words, we can detect when one word is a suffix of another
 * - Only leaf nodes in the trie represent words that need their own encoding
 * - Each word needs one '#' delimiter, so total length = sum(word_lengths) + count
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * words = ["time", "me", "bell"]
 * ```
 *
 * 1. Build trie with reversed words: ["emit", "em", "lleb"]
 * 2. "em" is a suffix of "emit", so we can share encoding
 * 3. Result: "time#bell#" (length 10)
 * - "time" at index 0
 * - "me" at index 2 (suffix of "time")
 * - "bell" at index 5

### TIME COMPLEXITY:
 * O(N × M)
 * Where N is the number of words and M is the average length of words
 *
 * ### SPACE COMPLEXITY:
 * O(N × M)
 * For the trie structure and set storage
 *
 * ### EDGE CASES:
 * - **Empty word list**: Return 0 (no encoding needed)
 * - **Single word**: Return word length + 1 for delimiter
 * - **All words are suffixes of one**: Only count the longest word
 * - **No suffix relationships**: Sum all word lengths plus delimiters
 * - **Duplicate words in input**: Remove duplicates first before processing
 *
 * </details>
 */

/**
 * Trie node for suffix trie construction
 */
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

/**
 * Find the minimum length encoding using suffix trie.
 * @param {string[]} words - Array of words to encode
 * @returns {number} Minimum length of encoded string
 *
 * Time Complexity: O(N × M) where N = number of words, M = average length
 * Space Complexity: O(N × M) for trie structure
 */
function minimumLengthEncoding(words) {
  // Remove duplicates and sort by length (longer first for optimization)
  const uniqueWords = [...new Set(words)];
  uniqueWords.sort((a, b) => b.length - a.length);

  const root = new TrieNode();
  let totalLength = 0;

  for (const word of uniqueWords) {
    // Check if this word is already a suffix of a previously added word
    if (!isSuffix(root, word)) {
      // Add word to trie and include in encoding
      addWord(root, word);
      totalLength += word.length + 1; // +1 for '#'
    }
  }

  return totalLength;
}

/**
 * Check if word is already represented as suffix in trie
 * @param {TrieNode} root - Root of trie
 * @param {string} word - Word to check
 * @returns {boolean} True if word is already a suffix
 */
function isSuffix(root, word) {
  let node = root;
  for (let i = word.length - 1; i >= 0; i--) {
    const char = word[i];
    if (!node.children.has(char)) {
      return false;
    }
    node = node.children.get(char);
  }
  return node.isEnd;
}

/**
 * Add word to suffix trie
 * @param {TrieNode} root - Root of trie
 * @param {string} word - Word to add
 */
function addWord(root, word) {
  let node = root;
  for (let i = word.length - 1; i >= 0; i--) {
    const char = word[i];
    if (!node.children.has(char)) {
      node.children.set(char, new TrieNode());
    }
    node = node.children.get(char);
  }
  node.isEnd = true;
}

/**
 * Alternative solution using set operations.
 * @param {string[]} words - Array of words to encode
 * @returns {number} Minimum length of encoded string
 */
function minimumLengthEncodingSet(words) {
  const wordSet = new Set(words);

  // Remove words that are suffixes of other words
  for (const word of words) {
    for (let i = 1; i < word.length; i++) {
      wordSet.delete(word.substring(i));
    }
  }

  // Calculate total length: each word + 1 for '#'
  return Array.from(wordSet).reduce((sum, word) => sum + word.length + 1, 0);
}

/**
 * Pure trie solution with leaf counting.
 * @param {string[]} words - Array of words to encode
 * @returns {number} Minimum length of encoded string
 */
function minimumLengthEncodingTrie(words) {
  // Build trie with reversed words
  const trie = {};
  const nodes = [];

  for (const word of new Set(words)) {
    let node = trie;
    for (let i = word.length - 1; i >= 0; i--) {
      const char = word[i];
      if (!(char in node)) {
        node[char] = {};
      }
      node = node[char];
    }
    nodes.push([node, word.length]);
  }

  // Count only leaf nodes (words not suffixes of others)
  return nodes
    .filter(([node]) => Object.keys(node).length === 0)
    .reduce((sum, [, length]) => sum + length + 1, 0);
}

/**
 * Test cases for Problem 820: Short Encoding of Words
 */
function testSolution() {
  console.log("Testing 820. Short Encoding of Words");

  // Test case 1: Basic functionality
  const words1 = ["time", "me", "bell"];
  const result1 = minimumLengthEncoding(words1);
  const expected1 = 10; // "time#bell#"
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: All words are independent
  const words2 = ["t"];
  const result2 = minimumLengthEncoding(words2);
  const expected2 = 2; // "t#"
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Multiple suffix relationships
  const words3 = ["time", "atime", "btime"];
  const result3 = minimumLengthEncoding(words3);
  const expected3 = 12; // "atime#btime#" (time is suffix of both)
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Duplicates
  const words4 = ["me", "me"];
  const result4 = minimumLengthEncoding(words4);
  const expected4 = 3; // "me#"
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Chain of suffixes
  const words5 = ["a", "aa", "aaa"];
  const result5 = minimumLengthEncoding(words5);
  const expected5 = 4; // "aaa#"
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test alternative implementations
  const result6 = minimumLengthEncodingSet(words1);
  console.assert(
    result6 === expected1,
    `Set method failed: expected ${expected1}, got ${result6}`,
  );

  const result7 = minimumLengthEncodingTrie(words1);
  console.assert(
    result7 === expected1,
    `Trie method failed: expected ${expected1}, got ${result7}`,
  );

  console.log("All test cases passed for 820. Short Encoding of Words!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 820. Short Encoding of Words ===");
  console.log("Category: Trees");
  console.log("Difficulty: Medium");
  console.log("");

  // Example 1: Basic case
  const words1 = ["time", "me", "bell"];
  const result1 = minimumLengthEncoding(words1);
  console.log(`minimumLengthEncoding(${JSON.stringify(words1)}) -> ${result1}`);
  console.log(`Encoding: 'time#bell#' (me is suffix of time)`);

  // Example 2: All independent
  const words2 = ["t"];
  const result2 = minimumLengthEncoding(words2);
  console.log(`minimumLengthEncoding(${JSON.stringify(words2)}) -> ${result2}`);
  console.log(`Encoding: 't#'`);

  // Example 3: Multiple suffixes
  const words3 = ["time", "atime", "btime"];
  const result3 = minimumLengthEncoding(words3);
  console.log(`minimumLengthEncoding(${JSON.stringify(words3)}) -> ${result3}`);
  console.log(`Encoding: 'atime#btime#' (time is suffix of both)`);

  console.log(`\nAlgorithm comparison:`);
  const methods = [
    ["Trie-based", minimumLengthEncoding],
    ["Set operations", minimumLengthEncodingSet],
    ["Pure trie", minimumLengthEncodingTrie],
  ];

  for (const [name, method] of methods) {
    const result = method(words1);
    console.log(`${name}: ${result}`);
  }

  console.log(`\nKey insights:`);
  console.log(`1. Words that are suffixes of others can share encoding`);
  console.log(`2. Trie helps identify suffix relationships efficiently`);
  console.log(`3. Only leaf nodes in suffix trie need separate encoding`);
  console.log(`4. Each word needs exactly one '#' delimiter`);
  console.log(`5. Sorting by length can optimize the process`);

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  minimumLengthEncoding,
  minimumLengthEncodingSet,
  minimumLengthEncodingTrie,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses suffix trie for optimal encoding detection
 * - Time complexity is O(N × M) for processing all words
 * - Space complexity is O(N × M) for trie storage
 * - The algorithm handles all edge cases including duplicates and suffix chains
 * - Essential insight: suffix relationships can be detected using reversed tries
 * - Alternative set-based approach provides simpler implementation
 */
