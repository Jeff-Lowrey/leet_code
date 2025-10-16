/**
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
 * Example:
 * Input: path = "/home//foo/"
 * Output: "/home/foo"
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>path = "/home//foo/"</dd>
 * <dt>Output:</dt>
 * <dd>/home/foo"</dd>
 * <dt>Explanation:</dt>
 * <dd>Simplified path '/a/./b/../../c/' is '/c'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
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
 * ```
 * path = "/a/./b/../../c/"
 * Split: ['', 'a', '.', 'b', '..', '..', 'c', '']
 *
 * Process:
 * '' → skip
 * 'a' → push ['a']
 * '.' → skip ['a']
 * 'b' → push ['a', 'b']
 * '..' → pop ['a']
 * '..' → pop []
 * 'c' → push ['c']
 * '' → skip ['c']
 *
 * Result: "/" + "c" = "/c"
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n) where n is path length
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

/**
 * Main solution for Problem 71: Simplify Path
 *
 * @param {string} path - Unix-style file path
 * @return {string} - Simplified canonical path
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(path) {
  const stack = [];
  const components = path.split("/");

  for (const component of components) {
    // Skip empty strings and current directory
    if (component === "" || component === ".") {
      continue;
    }

    // Go up one directory (if possible)
    if (component === "..") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      // Valid directory name
      stack.push(component);
    }
  }

  // Build canonical path
  return "/" + stack.join("/");
}

/**
 * Test cases for Problem 71: Simplify Path
 */
function testSolution() {
  console.log("Testing 71. Simplify Path");

  // Test case 1: Basic with dots and double dots
  const result1 = solve("/a/./b/../../c/");
  const expected1 = "/c";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Root path
  const result2 = solve("/../");
  const expected2 = "/";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Multiple slashes
  const result3 = solve("/home//foo/");
  const expected3 = "/home/foo";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Complex path
  const result4 = solve("/a/../../b/../c//.//");
  const expected4 = "/c";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  console.log("All test cases passed for 71. Simplify Path!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 71. Simplify Path ===");
  console.log("Category: Stack");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
