/**
 * # Difficulty: Medium
 *
 * # 0071. Simplify Path
 *
 *
 * Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.
 *
 * In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.
 *
 * The canonical path should have the following format:
 *
 * - The path starts with a single slash '/'.
 * - Any two directories are separated by a single slash '/'.
 * - The path does not end with a trailing '/'.
 * - The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period '.' or double period '..')
 *
 * Return the simplified canonical path.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>path = "/a/./b/../../c/"</dd>
 * <dt>Output:</dt>
 * <dd>"/c"</dd>
 * <dt>Explanation:</dt>
 * <dd>Simplified path '/a/./b/../../c/' is '/c'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal, Stack Operations
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of stack concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply stack methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages stack principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * path = "/a/./b/../../c/"
 * ```
 *
 * Step 1: Split by '/' and process
 * parts = ['', 'a', '.', 'b', '..', '..', 'c', '']
 * Step 2: Use stack
 * 'a': stack=['a']
 * '.': skip
 * 'b': stack=['a','b']
 * '..': pop, stack=['a']
 * '..': pop, stack=[]
 * 'c': stack=['c']
 *
 * Output:
 * ```
 * "/c"
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 071: Simplify Path
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
 * Test cases for Problem 071: Simplify Path
 */
function testSolution() {
  console.log("Testing 071. Simplify Path");

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

  console.log("All test cases passed for 071. Simplify Path!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 071. Simplify Path ===");
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
