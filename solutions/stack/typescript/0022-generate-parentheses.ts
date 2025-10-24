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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(4^n / √n)
 * **Space Complexity**: O(n)
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

class Solution {
  generateParenthesis(n: number): string[] {
    const result: string[] = [];

    const backtrack = (current: string, open: number, close: number): void => {
      if (current.length === 2 * n) {
        result.push(current);
        return;
      }

      if (open < n) {
        backtrack(current + "(", open + 1, close);
      }

      if (close < open) {
        backtrack(current + ")", open, close + 1);
      }
    };

    backtrack("", 0, 0);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.generateParenthesis(3);
  console.log(`Test 1: ${result1.length === 5 ? "PASS" : "FAIL"}`);

  const result2 = solution.generateParenthesis(1);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify(["()"]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
