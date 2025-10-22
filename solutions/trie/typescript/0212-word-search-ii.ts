/**
 * # Difficulty: Hard
 *
 * # 212. Word Search II
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Backtracking
 * **Time Complexity**: O(M * N * 4^L)
 * **Space Complexity**: O(K * L)
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
 * ```
 * board = [["o","a","a","n"],
 *          ["e","t","a","e"],
 *          ["i","h","k","r"],
 *          ["i","f","l","v"]]
 * words = ["oath","pea","eat","rain"]
 *
 * Build Trie: oath, pea, eat, rain
 *
 * DFS from (0,0) 'o':
 *   -> (1,0) 'e': not in trie after 'o'
 *   -> (0,1) 'a': 'oa' in trie, continue
 *     -> (1,1) 't': 'oat' in trie, continue
 *       -> (1,2) 'h': 'oath' found! ✓
 *
 * DFS from (1,1) 't':
 *   -> (1,2) 'a': 'ta' not promising
 *
 * DFS from (1,2) 'a':
 *   -> (1,1) 't': 'at' not in trie
 *   -> (2,2) 'k': 'ak' not in trie
 *
 * DFS from (1,0) 'e':
 *   -> (1,1) 'a': 'ea' in trie
 *     -> (1,2) 't': 'eat' found! ✓
 *
 * Results: ["oath", "eat"]
 * ```
 *
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
  children: Map<string, TrieNode> = new Map();
  word: string | null = null;
}

class Solution {
  findWords(board: string[][], words: string[]): string[] {
    if (!board || !board[0] || !words.length) return [];

    const root = new TrieNode();
    for (const word of words) {
      let node = root;
      for (const char of word) {
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
        node = node.children.get(char)!;
      }
      node.word = word;
    }

    const m = board.length;
    const n = board[0].length;
    const result: string[] = [];

    const dfs = (row: number, col: number, node: TrieNode): void => {
      if (row < 0 || row >= m || col < 0 || col >= n) return;

      const char = board[row][col];
      if (char === "#" || !node.children.has(char)) return;

      node = node.children.get(char)!;

      if (node.word) {
        result.push(node.word);
        node.word = null;
      }

      board[row][col] = "#";

      dfs(row + 1, col, node);
      dfs(row - 1, col, node);
      dfs(row, col + 1, node);
      dfs(row, col - 1, node);

      board[row][col] = char;
    };

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        dfs(i, j, root);
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

  const board1 = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]];
  const result1 = solution.findWords(board1, ["oath", "pea", "eat", "rain"]);
  console.log(`Test 1: ${result1.includes("oath") && result1.includes("eat") ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
