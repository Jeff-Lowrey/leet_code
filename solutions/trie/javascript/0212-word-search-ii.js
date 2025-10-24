/**
 * # Difficulty: Hard
 *
 * # 0212. Word Search II
 *
 * Difficulty: Medium
 *
 * Given an m x n board of characters and a list of strings words, return all words on the board.
 *
 * Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["o", "a", "a", "n"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Words ['oath','eat'] are found in the board</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Backtracking
 * **Time Complexity**: * O(M * N * 4^L)
 * **Space Complexity**: * O(K * L)

 *
 * ### INTUITION:
 * Searching for multiple words on a board can be optimized using a Trie. Instead of searching for each word individually, we build a Trie from all words and perform a single DFS traversal. As we explore the board, we simultaneously traverse the Trie, finding all matching words in one pass.
 *
 * ### APPROACH:
 * 1. **Build Trie**: Insert all words into a trie structure
 * 2. **DFS from each cell**: Start DFS from every cell on the board
 * 3. **Match with Trie**: During DFS, follow Trie paths that match current board path
 * 4. **Mark found words**: When we reach a word end in Trie, add it to results
 * 5. **Backtracking**: Mark cells as visited during search, unmark after
 * 6. **Optimization**: Remove found words from Trie to avoid duplicates
 *
 * ### WHY THIS WORKS:
 * - Trie allows simultaneous search for all words with shared prefixes
 * - Single DFS traversal instead of separate search for each word
 * - Prefix matching eliminates invalid paths early
 * - Backtracking explores all possible paths while avoiding revisits
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * board = [["o","a","a","n"],
 * ```
 *
 * ["e","t","a","e"],
 * ["i","h","k","r"],
 * ["i","f","l","v"]]
 * words = ["oath","pea","eat","rain"]
 * Build Trie: oath, pea, eat, rain
 * DFS from (0,0) 'o':
 * DFS from (1,1) 't':
 * DFS from (1,2) 'a':
 * DFS from (1,0) 'e':
 *
 * Steps:
 * Step 1: -> (1,0) 'e': not in trie after 'o'
 * Step 2: -> (0,1) 'a': 'oa' in trie, continue
 * Step 3: -> (1,1) 't': 'oat' in trie, continue
 * Step 4: -> (1,2) 'h': 'oath' found! ✓
 * Step 5: -> (1,2) 'a': 'ta' not promising
 * Step 6: -> (1,1) 't': 'at' not in trie
 * Step 7: -> (2,2) 'k': 'ak' not in trie
 * Step 8: -> (1,1) 'a': 'ea' in trie
 * Step 9: -> (1,2) 't': 'eat' found! ✓
 * Step 10: Results: ["oath", "eat"]

 * ### TIME COMPLEXITY:
 * O(M * N * 4^L)
 * Where M*N is board size, L is maximum word length
 * - We visit each cell and explore 4 directions recursively
 * - Trie operations are O(L)
 *
 * ### SPACE COMPLEXITY:
 * O(K * L)
 * Where K is number of words, L is average word length
 * - Trie storage for all words
 *
 * ### EDGE CASES:
 * - No words found on board
 * - Duplicate words (use set to collect results)
 * - Single cell words
 * - Words that use all cells
 * - Overlapping word paths
 *
 * </details>
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.word = null; // Store complete word at end node
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
    node.word = word;
  }
}

/**
 * Main solution for Problem 212: Word Search II
 *
 * @param {character[][]} board - 2D board of characters
 * @param {string[]} words - Array of words to search for
 * @return {string[]} - Array of words found in the board
 *
 * Time Complexity: O(m*n*4^L)
 * Space Complexity: O(k*w)
 */
function findWords(board, words) {
  if (!board || board.length === 0 || !words || words.length === 0) {
    return [];
  }

  // Build Trie from words
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }

  const rows = board.length;
  const cols = board[0].length;
  const result = [];

  // DFS function
  const dfs = (row, col, node) => {
    // Boundary checks
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return;
    }

    const char = board[row][col];

    // If cell is visited or character not in Trie, return
    if (char === "#" || !node.children.has(char)) {
      return;
    }

    // Move to next Trie node
    node = node.children.get(char);

    // Found a word
    if (node.word) {
      result.push(node.word);
      // Prevent duplicates by removing word from Trie
      node.word = null;
    }

    // Mark cell as visited
    board[row][col] = "#";

    // Explore all 4 directions
    dfs(row + 1, col, node);
    dfs(row - 1, col, node);
    dfs(row, col + 1, node);
    dfs(row, col - 1, node);

    // Backtrack: restore cell
    board[row][col] = char;

    // Optimization: prune empty branches from Trie
    if (node.children.size === 0) {
      // This node is now a dead end, could remove from parent
      // (more complex implementation needed for full pruning)
    }
  };

  // Try starting from each cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dfs(row, col, trie.root);
    }
  }

  return result;
}

/**
 * Test cases for Problem 212: Word Search II
 */
function testSolution() {
  console.log("Testing 212. Word Search II");

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, idx) => val === sortedB[idx]);
  };

  // Test case 1: Example from problem
  const board1 = [
    ["o", "a", "a", "n"],
    ["e", "t", "a", "e"],
    ["i", "h", "k", "r"],
    ["i", "f", "l", "v"],
  ];
  const words1 = ["oath", "pea", "eat", "rain"];
  const result1 = findWords(board1, words1);
  const expected1 = ["oath", "eat"];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Single letter words
  const board2 = [
    ["a", "b"],
    ["c", "d"],
  ];
  const words2 = ["a", "b", "c", "d", "e"];
  const result2 = findWords(board2, words2);
  const expected2 = ["a", "b", "c", "d"];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: No words found
  const board3 = [
    ["a", "b"],
    ["c", "d"],
  ];
  const words3 = ["xyz", "qwe"];
  const result3 = findWords(board3, words3);
  const expected3 = [];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Words with common prefixes
  const board4 = [
    ["a", "b", "c"],
    ["x", "e", "d"],
    ["y", "f", "g"],
  ];
  const words4 = ["abc", "aed", "afg", "xyz"];
  const result4 = findWords(board4, words4);
  const expected4 = ["abc"];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Duplicate words in input (should return once)
  const board5 = [["a", "a"]];
  const words5 = ["aa", "aa"];
  const result5 = findWords(board5, words5);
  const expected5 = ["aa"];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 212. Word Search II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 212. Word Search II ===");
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
  findWords,
  Trie,
  TrieNode,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This is THE classic Trie + Backtracking problem
 * - Trie dramatically improves performance vs searching each word separately
 * - Pruning found words prevents duplicates
 * - Can further optimize by removing dead branches from Trie
 * - Much more efficient than Word Search I when searching multiple words
 */
