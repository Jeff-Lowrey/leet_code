/**
 * # 20. Valid Parentheses
 *
 * # Difficulty: Easy
 *
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "()[]{}"</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>All brackets are properly matched and in correct order</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Stack, String Matching
 * **Data Structures**: Stack
 * **Patterns**: Stack Pattern, Bracket Matching
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * Bracket matching follows LIFO (Last In First Out) pattern - the most recent
 * opening bracket should be closed first. A stack is perfect for this.
 *
 * ### APPROACH:
 * 1. **Use stack**: Push opening brackets onto stack
 * 2. **Match closing brackets**: When encountering closing bracket, check if
 *    it matches the top of stack (most recent opening bracket)
 * 3. **Final check**: Stack should be empty if all brackets matched
 * 4. **Early exit**: If closing bracket doesn't match or stack is empty, invalid
 *
 * ### WHY THIS WORKS:
 * The stack maintains the order of unclosed opening brackets. Each closing bracket
 * must match the most recent unclosed opening bracket (top of stack). If all
 * brackets are properly matched, the stack will be empty at the end.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "({[]})"
 *
 * Step 1: '(' → push to stack: ['(']
 * Step 2: '{' → push to stack: ['(', '{']
 * Step 3: '[' → push to stack: ['(', '{', '[']
 * Step 4: ']' → matches '[', pop: ['(', '{']
 * Step 5: '}' → matches '{', pop: ['(']
 * Step 6: ')' → matches '(', pop: []
 *
 * Stack empty → true
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n) where n is the length of the string
 *
 * ### SPACE COMPLEXITY:
 * O(n) for the stack in worst case (all opening brackets)
 *
 * ### EDGE CASES:
 * - Empty string: valid (true)
 * - Single bracket: invalid (false)
 * - Only opening brackets: invalid (false)
 * - Only closing brackets: invalid (false)
 * - Mismatched types: e.g., "([)]" → false
 *
 * </details>
 */

class Solution {
  /**
   * Check if parentheses are valid using stack.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  isValid(s: string): boolean {
    // Mapping of closing to opening brackets
    const bracketMap: Record<string, string> = { ")": "(", "}": "{", "]": "[" };
    const stack: string[] = [];

    for (const char of s) {
      // If it's a closing bracket
      if (char in bracketMap) {
        // Check if stack has matching opening bracket
        if (stack.length === 0 || stack[stack.length - 1] !== bracketMap[char]) {
          return false;
        }
        stack.pop();
      } else {
        // It's an opening bracket, push to stack
        stack.push(char);
      }
    }

    // Valid if all brackets matched (stack is empty)
    return stack.length === 0;
  }

  /**
   * Alternative implementation with explicit opening check.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  isValidAlternative(s: string): boolean {
    const stack: string[] = [];
    const opening = new Set(["(", "{", "["]);
    const pairs: Record<string, string> = { "(": ")", "{": "}", "[": "]" };

    for (const char of s) {
      if (opening.has(char)) {
        stack.push(char);
      } else {
        // Closing bracket
        if (stack.length === 0) {
          return false;
        }
        if (pairs[stack[stack.length - 1]] !== char) {
          return false;
        }
        stack.pop();
      }
    }

    return stack.length === 0;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isValid("()") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isValid("()[]{}") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isValid("(]") === false ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.isValid("([)]") === false ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.isValid("{[]}") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.isValid("") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 7: ${solution.isValidAlternative("()[]{}") === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
