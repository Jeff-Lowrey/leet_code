/**
 * # Difficulty: Medium
 *
 * # 0150. Evaluate Reverse Polish Notation
 *
 * Difficulty: Medium
 *
 * You are given an array of strings tokens that represents an arithmetic expression
 * in Reverse Polish Notation.
 *
 * Evaluate the expression. Return an integer that represents the value of the expression.
 *
 * Note that:
 * - The valid operators are '+', '-', '*', and '/'.
 * - Each operand may be an integer or another expression.
 * - The division between two integers always truncates toward zero.
 * - There will not be any division by zero.
 * - The input represents a valid arithmetic expression in reverse polish notation.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["2","1","+","3","*"]</dd>
 * <dt>Output:</dt>
 * <dd>9</dd>
 * <dt>Explanation:</dt>
 * <dd>Postfix '2 1 + 3 *' evaluates to 9</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Stack Operations
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(n) - Additional set storage

 *
 * ### INTUITION:
 * Reverse Polish Notation (RPN) is perfect for stack-based evaluation. In RPN,
 * operators come after their operands, so we can process left-to-right:
 * push numbers onto stack, and when we see an operator, pop two operands,
 * compute, and push result back.
 *
 * ### APPROACH:
 * 1. **Initialize stack**: Empty stack to store operands
 * 2. **Process tokens**: Iterate through each token
 * 3. **Handle numbers**: Push numbers onto stack
 * 4. **Handle operators**: Pop two operands, compute, push result
 * 5. **Return result**: Final stack should have one element (the answer)
 *
 * ### WHY THIS WORKS:
 * - RPN guarantees operators have their operands available on stack
 * - Stack's LIFO property matches RPN's evaluation order
 * - Each operator consumes exactly two operands and produces one result
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * ["2","1","+","3","*"]
 * ```
 *
 * Stack operations:
 *
 * Steps:
 * Step 1: "2" -> [2]
 * Step 2: "1" -> [2,1]
 * Step 3: "+" -> [3]        (pop 1,2; compute 2+1=3; push 3)
 * Step 4: "3" -> [3,3]
 * Step 5: "*" -> [9]        (pop 3,3; compute 3*3=9; push 9)
 *
 * Output:
 * ```
 * 9
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Where n is the number of tokens - process each token once
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional set storage
 * Stack can hold up to n/2 operands in worst case
 *
 * ### EDGE CASES:
 * - Single number: return that number
 * - Division truncating toward zero
 * - Negative operands and results
 *
 * </details>
 */

/**
 * Main solution for Problem 150: Evaluate Reverse Polish Notation
 *
 * @param {string[]} tokens - Array of numbers and operators in RPN
 * @return {number} - Evaluated result
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(tokens) {
  const stack = [];
  const operators = new Set(["+", "-", "*", "/"]);

  for (const token of tokens) {
    if (operators.has(token)) {
      // Pop two operands (note: order matters for - and /)
      const b = stack.pop();
      const a = stack.pop();

      let result;
      switch (token) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          // Truncate toward zero
          result = Math.trunc(a / b);
          break;
      }

      stack.push(result);
    } else {
      // It's a number
      stack.push(parseInt(token));
    }
  }

  return stack[0];
}

/**
 * Test cases for Problem 150: Evaluate Reverse Polish Notation
 */
function testSolution() {
  console.log("Testing 150. Evaluate Reverse Polish Notation");

  // Test case 1: Basic expression
  const result1 = solve(["2", "1", "+", "3", "*"]);
  const expected1 = 9;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Division with truncation
  const result2 = solve(["4", "13", "5", "/", "+"]);
  const expected2 = 6;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Complex expression
  const result3 = solve([
    "10",
    "6",
    "9",
    "3",
    "+",
    "-11",
    "*",
    "/",
    "*",
    "17",
    "+",
    "5",
    "+",
  ]);
  const expected3 = 22;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Negative division
  const result4 = solve(["4", "-2", "/"]);
  const expected4 = -2;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  console.log(
    "All test cases passed for 150. Evaluate Reverse Polish Notation!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 150. Evaluate Reverse Polish Notation ===");
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
