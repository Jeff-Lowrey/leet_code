/**
 * # 71. Simplify Path
 *
 * Difficulty: Easy
 *
 * # Difficulty: Medium
 *
 * Given a string path, which is an absolute path (starting with a slash '/') to a file or
 * directory in a Unix-style file system, convert it to the simplified canonical path.
 *
 * In a Unix-style file system:
 * - A period '.' refers to the current directory
 * - A double period '..' refers to the directory up a level
 * - Multiple consecutive slashes ('//') are treated as a single slash '/'
 *
 * The canonical path should follow these rules:
 * - Always start with a single slash '/'
 * - Directories are separated by a single slash '/'
 * - No trailing slash (except for root '/')
 * - No '.' or '..' in the path
 *
 * Return the simplified canonical path.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>path = "/home//foo/"</dd>
 * <dt>Output:</dt>
 * <dd>"/home/foo"</dd>
 * <dt>Explanation:</dt>
 * <dd>Simplified path '/a/./b/../../c/' is '/c'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Stack Operations
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Divide and Conquer, Tree Pattern
 * **Time Complexity**: O(n) where n is path length - Single pass through input
 * **Space Complexity**: O(n) for stack and split components
 *
 * ### INTUITION:
 * Use a stack to track the directory hierarchy. Split the path by '/', then process each
 * component: skip '.', pop for '..', push valid directory names. Finally, join with '/'.
 *
 * ### APPROACH:
 * 1. **Split**: Divide path by '/' to get components
 * 2. **Stack**: Use stack to track current directory chain
 * 3. **Process**: For each component:
 *    - Skip empty strings (from consecutive '/')
 *    - Skip '.' (current directory)
 *    - Pop for '..' (go up a level, if possible)
 *    - Push valid directory names
 * 4. **Build**: Join stack with '/' and prepend '/'
 *
 * ### WHY THIS WORKS:
 * Stack naturally handles the hierarchical nature of file paths.
 * Going up (..) is a pop, going down (dirname) is a push.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * path = "/a/./b/../../c/"
 * ```
 *
 * Split: ['', 'a', '.', 'b', '..', '..', 'c', '']
 * Process:
 *
 * Steps:
 * Step 1: '' → skip
 * Step 2: 'a' → push ['a']
 * Step 3: '.' → skip ['a']
 * Step 4: 'b' → push ['a', 'b']
 * Step 5: '..' → pop ['a']
 * Step 6: '..' → pop []
 * Step 7: 'c' → push ['c']
 * Step 8: '' → skip ['c']
 * Step 9: Result: "/" + "c" = "/c"
 * 
 * Output:
 * ```
 * "/" + "c" = "/c"
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n) where n is path length
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(n) for stack and split components
 *
 * ### EDGE CASES:
 * - Root directory: "/" → "/"
 * - Go above root: "/../" → "/"
 * - Hidden files: "/.hidden" → "/.hidden"
 * - Trailing slash: "/a/b/" → "/a/b"
 *
 * </details>
 */

class Solution {
  simplifyPath(path: string): string {
    const stack: string[] = [];
    const parts = path.split("/");

    for (const part of parts) {
      if (part === "" || part === ".") {
        continue;
      } else if (part === "..") {
        if (stack.length > 0) {
          stack.pop();
        }
      } else {
        stack.push(part);
      }
    }

    return "/" + stack.join("/");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.simplifyPath("/home/") === "/home" ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.simplifyPath("/../") === "/" ? "PASS" : "FAIL"}`);
  console.log(
    `Test 3: ${solution.simplifyPath("/home//foo/") === "/home/foo" ? "PASS" : "FAIL"}`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
