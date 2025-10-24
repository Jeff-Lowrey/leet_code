/**
 * # Difficulty: Medium
 *
 * # 676. Implement Magic Dictionary
 *
 * Difficulty: Medium
 *
 * Design a data structure that is initialized with a list of different words. Provided a string, you should determine if you can change exactly one character in this string to match any word in the data structure.
 *
 * Implement the MagicDictionary class:
 * - MagicDictionary() Initializes the object.
 * - void buildDict(String[] dictionary) Sets the data structure with an array of distinct strings dictionary.
 * - bool search(String searchWord) Returns true if you can change exactly one character in searchWord to match any string in the data structure, otherwise returns false.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Dictionary: ["hello", "leetcode"]</dd>
 * <dt>Output:</dt>
 * <dd>Search: "hhllo"</dd>
 * <dt>Explanation:</dt>
 * <dd>The magic dictionary finds 'hello' matches 'hallo' with one character different</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Graph Pattern
 * **Time Complexity**: * - Build: O(n × l) where n is number of words, l is average length
 * **Space Complexity**: * O(n × l)

 *
 * ### INTUITION:
 * We need to find if we can change exactly one character in a search word to match any word in the dictionary. A trie is perfect for this as it allows efficient prefix matching and we can use DFS to explore all possible single-character changes.
 *
 * ### APPROACH:
 * 1. **Build Trie**: Store all dictionary words in a trie structure
 * 2. **DFS Search**: For each search, use DFS to explore all paths with exactly one character change
 * 3. **Track Changes**: Use a flag to track if we've used our one allowed change
 * 4. **Exact Match**: Must reach end of both search word and trie path with exactly one change
 *
 * ### WHY THIS WORKS:
 * - Trie structure enables efficient prefix matching
 * - DFS allows exploring all possible single character changes
 * - By tracking changes used, we ensure exactly one modification
 * - Early termination when more than one change is needed
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Dictionary: ["hello", "leetcode"]
 * ```
 *
 * Search: "hhllo"
 * DFS Process:
 * 1. Start at root, search word "hhllo"
 *
 * Steps:
 * Step 1: At position 0: 'h' matches 'h' in "hello" path → continue
 * Step 2: At position 1: 'h' doesn't match 'e' in "hello" → use one change, continue
 * Step 3: At position 2: 'l' matches 'l' → continue
 * Step 4: At position 3: 'l' matches 'l' → continue
 * Step 5: At position 4: 'o' matches 'o' → continue
 * Step 6: Reached end with exactly one change → return True

### TIME COMPLEXITY:
 * - Build: O(n × l) where n is number of words, l is average length
 * - Search: O(26 × l) in worst case, but typically much better due to pruning
 *
 * ### SPACE COMPLEXITY:
 * O(n × l)
 * For the trie structure storing all dictionary words
 *
 * ### EDGE CASES:
 * - **Exact match in dictionary**: Return False (need exactly one change)
 * - **Word length mismatch**: No match possible, return False
 * - **Multiple possible changes**: Only one change allowed, continue searching
 * - **Empty dictionary**: Return False for any search
 * - **Single character words**: Check all 26 possible substitutions
 *
 * </details>
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class MagicDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Build the dictionary with given words
   * @param {string[]} dictionary - Array of words
   */
  buildDict(dictionary) {
    this.root = new TrieNode(); // Reset

    for (const word of dictionary) {
      let node = this.root;
      for (const char of word) {
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
        node = node.children.get(char);
      }
      node.isWord = true;
    }
  }

  /**
   * Search for a word with exactly one character change
   * @param {string} searchWord - Word to search for
   * @return {boolean} - True if word can be formed with exactly one change
   */
  search(searchWord) {
    function dfs(node, index, usedChange) {
      // Reached end of search word
      if (index === searchWord.length) {
        // Must be a valid word AND must have used exactly one change
        return node.isWord && usedChange;
      }

      const char = searchWord[index];

      // Try all possible characters at this position
      for (const [trieChar, childNode] of node.children) {
        if (trieChar === char) {
          // Character matches, continue without using change
          if (dfs(childNode, index + 1, usedChange)) {
            return true;
          }
        } else {
          // Character differs
          if (!usedChange) {
            // Use our one change allowance
            if (dfs(childNode, index + 1, true)) {
              return true;
            }
          }
          // If already used change, can't take this path
        }
      }

      return false;
    }

    return dfs(this.root, 0, false);
  }
}

/**
 * Factory function for creating MagicDictionary instances
 * This is the main solve function for testing
 *
 * @return {MagicDictionary} - New MagicDictionary instance
 */
function solve() {
  return new MagicDictionary();
}

/**
 * Test cases for Problem 676: Implement Magic Dictionary
 */
function testSolution() {
  console.log("Testing 676. Implement Magic Dictionary");

  // Test case 1: Basic functionality
  const dict1 = new MagicDictionary();
  dict1.buildDict(["hello", "leetcode"]);

  const result1a = dict1.search("hello");
  console.assert(
    result1a === false,
    `Test 1a failed: expected false (exact match), got ${result1a}`,
  );

  const result1b = dict1.search("hhllo");
  console.assert(
    result1b === true,
    `Test 1b failed: expected true (one char diff), got ${result1b}`,
  );

  const result1c = dict1.search("hell");
  console.assert(
    result1c === false,
    `Test 1c failed: expected false (different length), got ${result1c}`,
  );

  const result1d = dict1.search("leetcoded");
  console.assert(
    result1d === false,
    `Test 1d failed: expected false (different length), got ${result1d}`,
  );

  // Test case 2: One character difference
  const dict2 = new MagicDictionary();
  dict2.buildDict(["hello", "hallo", "leetcode"]);

  const result2a = dict2.search("hello");
  console.assert(
    result2a === true,
    `Test 2a failed: expected true ("hello" -> "hallo"), got ${result2a}`,
  );

  const result2b = dict2.search("hhllo");
  console.assert(
    result2b === true,
    `Test 2b failed: expected true (one char diff), got ${result2b}`,
  );

  const result2c = dict2.search("hell");
  console.assert(
    result2c === false,
    `Test 2c failed: expected false (different length), got ${result2c}`,
  );

  // Test case 3: Single character words
  const dict3 = new MagicDictionary();
  dict3.buildDict(["a", "b"]);

  const result3a = dict3.search("a");
  console.assert(
    result3a === true,
    `Test 3a failed: expected true ("a" -> "b"), got ${result3a}`,
  );

  const result3b = dict3.search("c");
  console.assert(
    result3b === true,
    `Test 3b failed: expected true ("c" can become "a" or "b"), got ${result3b}`,
  );

  const result3c = dict3.search("ab");
  console.assert(
    result3c === false,
    `Test 3c failed: expected false (different length), got ${result3c}`,
  );

  // Test case 4: Multiple words same length
  const dict4 = new MagicDictionary();
  dict4.buildDict(["abc", "abd", "xyz"]);

  const result4a = dict4.search("abc");
  console.assert(
    result4a === true,
    `Test 4a failed: expected true ("abc" -> "abd"), got ${result4a}`,
  );

  const result4b = dict4.search("aaa");
  console.assert(
    result4b === false,
    `Test 4b failed: expected false (two chars diff), got ${result4b}`,
  );

  console.log("All test cases passed for 676. Implement Magic Dictionary!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 676. Implement Magic Dictionary ===");
  console.log("Category: Trees/Trie");
  console.log("Difficulty: Medium");
  console.log("");

  console.log("Example:");
  const magicDict = new MagicDictionary();
  magicDict.buildDict(["hello", "leetcode"]);

  console.log('Dictionary: ["hello", "leetcode"]');
  console.log(
    'search("hello"):',
    magicDict.search("hello"),
    "(exact match, no change)",
  );
  console.log(
    'search("hhllo"):',
    magicDict.search("hhllo"),
    "(one char different)",
  );
  console.log(
    'search("hell"):',
    magicDict.search("hell"),
    "(different length)",
  );
  console.log(
    'search("leetcoded"):',
    magicDict.search("leetcoded"),
    "(different length)",
  );
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  MagicDictionary,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses Trie with DFS for flexible one-character matching
 * - DFS explores all paths while tracking whether we've used our one change
 * - Must use exactly one change (not zero, not two or more)
 * - Alternative: Store words by length in HashMap, compare each (less efficient)
 * - Trie approach scales well with large dictionaries and frequent searches
 */
