/**
 * # 0227. Basic Calculator Ii
 *
 * Difficulty: Medium
 *
 *
 * # 0227. Basic Calculator Ii
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Stack Operations
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: **O(n)** - Single pass through input
 * **Space Complexity**: **O(1)** - Constant extra space
 *
 * ### INTUITION:
 * Use stack to handle operators. Scan number by number. For +/- push to stack. For * or / pop, compute with previous, push result. Finally sum stack for result.
 *
 * ### APPROACH:
 * 1. **Initialize variables**: Set stack = [], num = 0, sign = '+'
 * 2. **Iterate through string**: For i, char in enumerate(s)
 * 3. **Build number**: If char.isdigit(), num = num * 10 + int(char)
 * 4. **Process operator**: If char is an operator or last character
 * 5. **Handle signs**: If sign is +, push num; if -, push -num; if *, push stack.pop() times num; if /, push int(stack.pop() divided by num)
 * 6. **Update sign**: Set sign = char, reset num = 0
 * 7. **Sum stack**: Return sum(stack) as final result
 *
 * ### WHY THIS WORKS:
 * - Stack handles operator precedence: multiply/divide evaluated immediately, add/subtract pushed to stack
 * - Track last operator, current number being built
 * - When + or -, push to stack (signed number)
 * - When * or /, pop and compute with current number, push result
 * - Sum stack at end for final result
 * - O(n) time: single pass, O(n) space for stack
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
 *
 * ### TIME COMPLEXITY:

 * O(n)

 * - Single pass through the input
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

class Solution {
  calculate(s: string): number {
    const stack: number[] = [];
    let num = 0;
    let operation = "+";

    for (let i = 0; i < s.length; i++) {
      const char = s[i];

      if (char >= "0" && char <= "9") {
        num = num * 10 + parseInt(char);
      }

      if ((char !== " " && isNaN(parseInt(char))) || i === s.length - 1) {
        if (operation === "+") {
          stack.push(num);
        } else if (operation === "-") {
          stack.push(-num);
        } else if (operation === "*") {
          stack.push(stack.pop()! * num);
        } else if (operation === "/") {
          stack.push(Math.trunc(stack.pop()! / num));
        }
        operation = char;
        num = 0;
      }
    }

    return stack.reduce((sum, n) => sum + n, 0);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.calculate("3+2*2") === 7 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.calculate(" 3/2 ") === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.calculate(" 3+5 / 2 ") === 5 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
