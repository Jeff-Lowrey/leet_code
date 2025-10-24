/**
 * # Difficulty: Medium
 *
 * # 22. Generate Parentheses
 *
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["()"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>All combinations of n=3 parentheses: ['((()))','(()())','(())()','()(())','()()()']</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Sorting, Stack Operations
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Backtracking
 * **Time Complexity**: * O(4^n / √n)
 * **Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * Use backtracking to build valid parentheses strings. At each step, we can add '(' if we haven't used all n opening brackets, or ')' if it won't make the string invalid (closing count < opening count).
 *
 * ### APPROACH:
 * 1. **Backtracking**: Build string character by character
 * 2. **Valid Rules**:
 *    - Can add '(' if open_count < n
 *    - Can add ')' if close_count < open_count
 * 3. **Base Case**: When string length = 2n, add to result
 * 4. **Recursive Exploration**: Try adding '(' and ')' at each step
 *
 * ### WHY THIS WORKS:
 * - Opening bracket can be added anytime until we reach n
 * - Closing bracket can only be added if it doesn't exceed opening count
 * - These rules guarantee valid parentheses strings
 * - Backtracking explores all valid combinations
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 3:
 * ```
 *
 * Start: ""
 *
 * Steps:
 * Step 1: ├─ "(" → "(("  → "(((" → "((())" → "((()))"
 * Step 2: │                      → "(()"   → "(()())"
 * Step 3: │                                → "(())()"
 * Step 4: │      → "("   → "()"   → "()((" → "()(())"
 * Step 5: │                       → "()("  → "()()()"
 * Step 6: Result: ["((()))", "(()())", "(())()", "()(())", "()()()"]
 * 
 * Output:
 * ```
 * ["((()))", "(()())", "(())()", "()(())", "()()()"]
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(4^n / √n)
 * Catalan number: C(n) = (2n)! / ((n+1)! * n!)
 * Approximately O(4^n / √n) valid combinations
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * Recursion stack depth is 2n (building string of length 2n)
 *
 * ### EDGE CASES:
 * - n = 0: return [""]
 * - n = 1: return ["()"]
 * - n = 2: return ["(())", "()()"]
 *
 * </details>
 */

/**
 * Main solution for Problem 022: Generate Parentheses
 *
 * @param {number} n - Number of pairs of parentheses
 * @return {string[]} - All valid combinations of parentheses
 *
 * Time Complexity: O(4^n / √n)
 * Space Complexity: O(n)
 */
function solve(n) {
  const result = [];

  function backtrack(current, open, close) {
    // Base case: we've used all n pairs
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    // Add opening parenthesis if we haven't used all n
    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }

    // Add closing parenthesis if it won't create invalid sequence
    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }

  backtrack("", 0, 0);
  return result;
}

/**
 * Test cases for Problem 022: Generate Parentheses
 */
function testSolution() {
  console.log("Testing 022. Generate Parentheses");

  // Test case 1: n = 3
  const result1 = solve(3);
  const expected1 = ["((()))", "(()())", "(())()", "()(())", "()()()"];
  console.assert(
    JSON.stringify(result1.sort()) === JSON.stringify(expected1.sort()),
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: n = 1
  const result2 = solve(1);
  const expected2 = ["()"];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: n = 2
  const result3 = solve(2);
  const expected3 = ["(())", "()()"];
  console.assert(
    JSON.stringify(result3.sort()) === JSON.stringify(expected3.sort()),
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  console.log("All test cases passed for 022. Generate Parentheses!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 022. Generate Parentheses ===");
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
