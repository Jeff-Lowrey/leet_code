/**
 * # Difficulty: Medium
 *
 * # 1233. Remove Sub Folders From The Filesystem
 *
 * Difficulty: Medium
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(N * L * log(N))
 * **Space Complexity**: O(N * L)
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
 * Input:
 * ```
 * ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
 * ```
 *
 * After sorting: ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
 * Process "/a":
 * Process "/a/b":
 * Process "/c/d":
 * Process "/c/d/e":
 * Process "/c/f":
 *
 * Steps:
 * Step 1: root -> 'a' (mark as folder end)
 * Step 2: Result: ["/a"]
 * Step 3: root -> 'a' (already folder end, skip!)
 * Step 4: root -> 'c' -> 'd' (mark as folder end)
 * Step 5: Result: ["/a", "/c/d"]
 * Step 6: root -> 'c' -> 'd' (already folder end, skip!)
 * Step 7: root -> 'c' -> 'f' (mark as folder end)
 * Step 8: Result: ["/a", "/c/d", "/c/f"]
 * 
 * Output:
 * ```
 * ["/a"]
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

class Solution {
  removeSubfolders(folder: string[]): string[] {
    folder.sort();
    const result: string[] = [];

    for (const path of folder) {
      if (result.length === 0 || !path.startsWith(result[result.length - 1] + "/")) {
        result.push(path);
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

  const result1 = solution.removeSubfolders(["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]);
  const expected1 = ["/a", "/c/d", "/c/f"];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
