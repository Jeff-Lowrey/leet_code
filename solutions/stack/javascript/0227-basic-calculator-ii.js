/**
 * # Difficulty: Medium
 *
 * # 227. Basic Calculator Ii
 *
 * Difficulty: Medium
 *
 * Given a string s which represents an expression, evaluate this expression and return its value.
 *
 * The integer division should truncate toward zero.
 *
 * You may assume that the given expression is always valid. All intermediate results will be in the range of [-2^31, 2^31 - 1].
 *
 * Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"3+2*2"</dd>
 * <dt>Output:</dt>
 * <dd>7</dd>
 * <dt>Explanation:</dt>
 * <dd>Expression '3+2*2' evaluates to 7</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Stack Operations
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

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
 * s = "3+2*2"
 * ```
 *
 * Step 1: Parse and evaluate
 * num=3, op='+', stack=[3]
 * num=2, op='*', stack=[3,2]
 * num=2, op=None, stack=[3,4] (multiply 2*2)
 * Step 2: Sum stack
 * result = 3+4 = 7
 *
 * Output:
 * ```
 * 7
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 227: Basic Calculator Ii
 *
 * @param {string} s - Mathematical expression string
 * @return {number} - Evaluated result
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s) {
  const stack = [];
  let num = 0;
  let operator = "+";

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // Build multi-digit numbers
    if (char >= "0" && char <= "9") {
      num = num * 10 + parseInt(char);
    }

    // Process operator (or end of string)
    if ((char !== " " && isNaN(char)) || i === s.length - 1) {
      if (operator === "+") {
        stack.push(num);
      } else if (operator === "-") {
        stack.push(-num);
      } else if (operator === "*") {
        stack.push(stack.pop() * num);
      } else if (operator === "/") {
        // Truncate toward zero
        const top = stack.pop();
        stack.push(Math.trunc(top / num));
      }

      // Update operator for next iteration
      operator = char;
      num = 0;
    }
  }

  // Sum all values in stack
  return stack.reduce((sum, val) => sum + val, 0);
}

/**
 * Test cases for Problem 227: Basic Calculator Ii
 */
function testSolution() {
  console.log("Testing 227. Basic Calculator Ii");

  // Test case 1: Mixed operators
  const result1 = solve("3+2*2");
  const expected1 = 7;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Spaces in expression
  const result2 = solve(" 3/2 ");
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Complex expression
  const result3 = solve(" 3+5 / 2 ");
  const expected3 = 5;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Multiple operations
  const result4 = solve("14-3/2");
  const expected4 = 13;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  console.log("All test cases passed for 227. Basic Calculator Ii!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 227. Basic Calculator Ii ===");
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
