/**
### INTUITION:
[This problem requires understanding of stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- This ensures that the solution leverages stack principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
Input:
```
path = "/a/./b/../../c/"
```

Step 1: Split by '/' and process
parts = ['', 'a', '.', 'b', '..', '..', 'c', '']
Step 2: Use stack
'a': stack=['a']
'.': skip
'b': stack=['a','b']
'..': pop, stack=['a']
'..': pop, stack=[]
'c': stack=['c']

Output:
```
"/c"
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

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
