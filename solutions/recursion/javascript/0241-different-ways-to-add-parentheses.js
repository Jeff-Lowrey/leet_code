/**
 * Difficulty: Medium
 *
 * Given a string `expression` of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.
 *
 * The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed 10^4.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>expression = "2-1-1"</dd>
 * <dt>Output:</dt>
 * <dd>[0,2]</dd>
 * <dt>Explanation:</dt>
 * <dd>((2-1)-1) = 0, (2-(1-1)) = 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Recursion, Divide and Conquer, Memoization
 * **Data Structures**: List, Hash Map, String
 * **Patterns**: Divide and Conquer, Dynamic Programming
 * **Time Complexity**: O(4^n / n^(3/2)) - Catalan number growth, exponential in expression length
 * **Space Complexity**: O(4^n / n^(3/2)) - Storing all possible results plus recursion stack
 *
 * ### INTUITION:
The key insight is that for each operator in the expression, we can split the expression at that operator and recursively compute all possible results for the left and right sub-expressions. Then we combine these results using the current operator. This generates all possible ways to parenthesize the expression.

### APPROACH:
1. We use divide and conquer with recursion.
2. For the given expression, we iterate through each character.
3. When we find an operator (+, -, *), we recursively compute all possible results for the left substring and all possible results for the right substring.
4. For each pair of left and right results, we apply the current operator to generate a new result.
5. We collect all such results in a list.
6. The base case is when the expression contains no operators, in which case we return a list containing just the number itself.
7. We can optimize this with memoization by caching results for each unique sub-expression to avoid recomputing the same sub-problems.

### WHY THIS WORKS:
 * - Every valid parenthesization corresponds to choosing some operator as the last operation
 * - Recursively solving left and right gives all possible values for each side
 * - Combining all pairs with the operator generates all possible results for this split
 * - Trying all operators as the last operation covers all possible parenthesizations
 *
 * ### EXAMPLE WALKTHROUGH:
Input:
```
expression = "2-1-1"
```

*Step 1:** Try first '-' as last op: left="2", right="1-1"

*Step 2:** Recursively solve: left=[2], right=[0, 2]

*Step 3:** Combine: 2-0=2, 2-2=0 → [2, 0]

*Step 4:** Try second '-' as last op: left="2-1", right="1"

*Step 5:** Recursively solve: left=[1], right=[1]

*Step 6:** Combine: 1-1=0 → [0]

*Step 7:** Collect all results: [2, 0, 0] → unique: [0, 2]

Output:
```
[0, 2]
```

### TIME COMPLEXITY:
 * **O(4^n / n^(3/2))** - The number of ways to parenthesize n operators grows as the nth Catalan number, which is approximately 4^n / n^(3/2). We compute each unique sub-expression once with memoization.
 *
 * ### SPACE COMPLEXITY:
 * **O(4^n / n^(3/2))** - We store all possible results for each sub-expression, plus the recursion call stack depth of O(n).
 *
 * ### EDGE CASES:
 * - **Single number:** "10" → [10]
 * - **Single operator:** "2+3" → [5]
 * - **All same operator:** "1+1+1" → [3] (associative, only one unique result)
 * - **Mixed operators:** Creates multiple different results due to different groupings
 * - **Negative numbers in result:** Handled correctly by operator application
 *
 * </details>
 */

class Solution {
  /**
   * Main solution method
   * @param {string} expression - String containing numbers and operators
   * @return {number[]} - List of all possible computation results
   *
   * Approach: Divide and conquer with memoization
   * Time Complexity: O(4^n / n^(3/2))
   * Space Complexity: O(4^n / n^(3/2))
   */
  diffWaysToCompute(expression) {
    const memo = new Map();

    const compute = (expr) => {
      // Check cache
      if (memo.has(expr)) {
        return memo.get(expr);
      }

      const results = [];

      // Try each operator as the last operation
      for (let i = 0; i < expr.length; i++) {
        const char = expr[i];

        if (char === "+" || char === "-" || char === "*") {
          // Split at this operator
          const left = expr.substring(0, i);
          const right = expr.substring(i + 1);

          // Recursively compute all possible results for left and right
          const leftResults = compute(left);
          const rightResults = compute(right);

          // Combine all pairs with current operator
          for (const leftVal of leftResults) {
            for (const rightVal of rightResults) {
              if (char === "+") {
                results.push(leftVal + rightVal);
              } else if (char === "-") {
                results.push(leftVal - rightVal);
              } else if (char === "*") {
                results.push(leftVal * rightVal);
              }
            }
          }
        }
      }

      // Base case: no operators, expression is just a number
      if (results.length === 0) {
        results.push(parseInt(expr));
      }

      // Cache and return
      memo.set(expr, results);
      return results;
    };

    return compute(expression);
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

// Run tests
function runTests() {
  const solution = new Solution();

  // Test case 1: Example from problem
  console.log("Test Case 1:");
  const expr1 = "2-1-1";
  const expected1 = [0, 2];
  const result1 = solution.diffWaysToCompute(expr1).sort((a, b) => a - b);
  console.log(`Input: "${expr1}"`);
  console.log(`Output: ${JSON.stringify(result1)}`);
  console.log(`Expected: ${JSON.stringify(expected1.sort((a, b) => a - b))}`);
  console.log(
    `Pass: ${JSON.stringify(result1) === JSON.stringify(expected1.sort((a, b) => a - b))}`,
  );
  console.log();

  // Test case 2: Multiple operators
  console.log("Test Case 2:");
  const expr2 = "2*3-4*5";
  const expected2 = [-34, -14, -10, -10, 10];
  const result2 = solution.diffWaysToCompute(expr2).sort((a, b) => a - b);
  console.log(`Input: "${expr2}"`);
  console.log(`Output: ${JSON.stringify(result2)}`);
  console.log(`Expected: ${JSON.stringify(expected2.sort((a, b) => a - b))}`);
  console.log();

  // Test case 3: Single number
  console.log("Test Case 3 (Edge Case):");
  const expr3 = "10";
  const expected3 = [10];
  const result3 = solution.diffWaysToCompute(expr3);
  console.log(`Input: "${expr3}"`);
  console.log(`Output: ${JSON.stringify(result3)}`);
  console.log(`Expected: ${JSON.stringify(expected3)}`);
  console.log(
    `Pass: ${JSON.stringify(result3) === JSON.stringify(expected3)}`,
  );
  console.log();

  // Test case 4: Simple operation
  console.log("Test Case 4:");
  const expr4 = "2+3";
  const expected4 = [5];
  const result4 = solution.diffWaysToCompute(expr4);
  console.log(`Input: "${expr4}"`);
  console.log(`Output: ${JSON.stringify(result4)}`);
  console.log(`Expected: ${JSON.stringify(expected4)}`);
  console.log(
    `Pass: ${JSON.stringify(result4) === JSON.stringify(expected4)}`,
  );
  console.log();
}

// Run tests if executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
