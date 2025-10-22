/**
 * # 20. Valid Parentheses
 *
 * # Difficulty: Easy
 *
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 *
 * @param {string} s
 * @return {boolean}
 */

class Solution {
  /**
   * Check if parentheses are valid using stack.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  isValid(s) {
    // Mapping of closing to opening brackets
    const bracketMap = { ")": "(", "}": "{", "]": "[" };
    const stack = [];

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
  isValidAlternative(s) {
    const stack = [];
    const opening = new Set(["(", "{", "["]);
    const pairs = { "(": ")", "{": "}", "[": "]" };

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

function runTests() {
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
