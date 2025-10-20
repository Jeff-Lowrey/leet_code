/**
 *  Difficulty: Medium
 *
 * # 1233. Remove Sub Folders From The Filesystem
 *
 * Given a list of folders, remove all sub-folders in those folders and return the folders in any order.
 *
 * If a folder[i] is located within another folder[j], it is called a sub-folder of it.
 *
 * The format of a path is one or more concatenated strings of the form: '/' followed by one or more lowercase English letters.
 *
 * For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string and "/" are not.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Subfolders are removed: ['/a','/a/b','/c/d'] becomes ['/a','/c/d']</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Trie Operations, Prefix Matching
 * **Data Structures**: Trie (Prefix Tree)
 * **Patterns**: Trie Pattern, Prefix Search
 * **Time Complexity**: **O(N * L * log(N))
 * **Space Complexity**: **O(N * L)

 *
 * ### INTUITION:
 * We need to identify and remove sub-folders from a list of folder paths. A sub-folder is any folder that has another folder as its prefix path. Using a Trie allows us to efficiently detect prefix relationships by building a tree structure where each node represents a path component.
 *
 * ### APPROACH:
 * 1. **Sort paths**: Sort lexicographically to process parent folders before their children
 * 2. **Use Trie structure**: Build a trie where each node represents a folder name
 * 3. **Mark folder ends**: Use a flag to mark where complete folders end
 * 4. **Detect sub-folders**: If we reach a node marked as folder end, any path continuing from there is a sub-folder
 * 5. **Collect results**: Only add paths that aren't sub-folders of previously added paths
 *
 * Alternative: Sort paths and check if each path starts with previous path + '/'
 *
 * ### WHY THIS WORKS:
 * - Sorting ensures parent folders come before children
 * - Trie naturally represents hierarchical structure
 * - Marking folder ends distinguishes complete folders from intermediate path components
 * - When we encounter a folder end marker, we know any continuation is a sub-folder
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
 *
 * After sorting: ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
 *
 * Process "/a":
 *   root -> 'a' (mark as folder end)
 *   Result: ["/a"]
 *
 * Process "/a/b":
 *   root -> 'a' (already folder end, skip!)
 *
 * Process "/c/d":
 *   root -> 'c' -> 'd' (mark as folder end)
 *   Result: ["/a", "/c/d"]
 *
 * Process "/c/d/e":
 *   root -> 'c' -> 'd' (already folder end, skip!)
 *
 * Process "/c/f":
 *   root -> 'c' -> 'f' (mark as folder end)
 *   Result: ["/a", "/c/d", "/c/f"]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(N * L * log(N))
 * Where N is number of folders and L is average path length
 * - Sorting: O(N * L * log(N))
 * - Trie operations: O(N * L)
 *
 * ### SPACE COMPLEXITY:
 * O(N * L)
 * For storing the trie structure
 *
 * ### EDGE CASES:
 * - Single folder
 * - No sub-folders
 * - All folders are sub-folders of one root
 * - Folders with similar prefixes but different paths
 *
 * </details>
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isFolder = false;
  }
}

/**
 * Main solution for Problem 1233: Remove Sub-Folders from the Filesystem
 *
 * @param {string[]} folder - Array of folder paths
 * @return {string[]} - Array of folders after removing sub-folders
 *
 * Time Complexity: O(n * m * log n)
 * Space Complexity: O(n * m)
 */
function removeSubfolders(folder) {
  // Sort folders lexicographically
  folder.sort();

  const root = new TrieNode();
  const result = [];

  for (const path of folder) {
    // Split path into components (skip empty first element from leading '/')
    const parts = path.split("/").filter((p) => p.length > 0);
    let node = root;
    let isSubFolder = false;

    // Traverse/build path in Trie
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // If we encounter a folder marker before reaching the end,
      // this path is a sub-folder
      if (node.isFolder) {
        isSubFolder = true;
        break;
      }

      if (!node.children.has(part)) {
        node.children.set(part, new TrieNode());
      }
      node = node.children.get(part);
    }

    // If not a sub-folder, mark as folder and add to result
    if (!isSubFolder) {
      node.isFolder = true;
      result.push(path);
    }
  }

  return result;
}

/**
 * Alternative solution using simple string prefix checking
 * Simpler but with similar time complexity
 */
function removeSubfoldersSimple(folder) {
  folder.sort();
  const result = [folder[0]];

  for (let i = 1; i < folder.length; i++) {
    const lastFolder = result[result.length - 1];
    // Check if current folder starts with last added folder + '/'
    // This ensures exact folder match (not just string prefix)
    if (!folder[i].startsWith(lastFolder + "/")) {
      result.push(folder[i]);
    }
  }

  return result;
}

/**
 * Test cases for Problem 1233: Remove Sub-Folders from the Filesystem
 */
function testSolution() {
  console.log("Testing 1233. Remove Sub-Folders from the Filesystem");

  // Helper to compare arrays (order-independent)
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, idx) => val === sortedB[idx]);
  };

  // Test case 1: Example from problem
  const result1 = removeSubfolders(["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]);
  const expected1 = ["/a", "/c/d", "/c/f"];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: No sub-folders
  const result2 = removeSubfolders(["/a", "/b", "/c"]);
  const expected2 = ["/a", "/b", "/c"];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: All are sub-folders except one
  const result3 = removeSubfolders(["/a", "/a/b", "/a/b/c", "/a/b/c/d"]);
  const expected3 = ["/a"];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Similar prefixes but different paths
  const result4 = removeSubfolders(["/a/b/c", "/a/b/ca", "/a/b/d"]);
  const expected4 = ["/a/b/c", "/a/b/ca", "/a/b/d"];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Complex hierarchy
  const result5 = removeSubfolders([
    "/aa/ab/ac/ae",
    "/aa/ab/af/ag",
    "/ap/aq/ar/as",
    "/ap/aq/ar",
    "/ap/ax/ay/az",
    "/ap",
    "/ap/aq/ar/at",
    "/aa/ab/af/ah",
    "/aa/ai/aj/ak",
    "/aa",
  ]);
  const expected5 = ["/aa", "/ap"];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test simple solution as well
  const result6 = removeSubfoldersSimple([
    "/a",
    "/a/b",
    "/c/d",
    "/c/d/e",
    "/c/f",
  ]);
  console.assert(
    arraysEqual(result6, expected1),
    `Test 6 (simple) failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result6)}`,
  );

  console.log(
    "All test cases passed for 1233. Remove Sub-Folders from the Filesystem!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1233. Remove Sub-Folders from the Filesystem ===");
  console.log("Category: Trie");
  console.log("Difficulty: Medium");
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  removeSubfolders,
  removeSubfoldersSimple,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - The Trie solution is more educational but the simple solution is more practical
 * - Sorting is key to both approaches - ensures parent folders processed first
 * - String prefix checking with '/' ensures exact folder boundaries
 * - Both solutions have similar time complexity due to sorting
 */
