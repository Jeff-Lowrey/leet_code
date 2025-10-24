/**
 * # 0020. Valid Parentheses
 *
 * Difficulty: Easy
 *
 * # Difficulty: Easy
 *
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 *
 * An input string is valid if:
 *
 *
 *
 *
 * Example 1:
 * Input: s = "()"
 * Output: true
 *
 * Example 2:
 * Input: s = "()[]{}"
 * Output: true
 *
 * Example 3:
 * Input: s = "(]"
 * Output: false
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "()</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>Parentheses '()[]{}' are valid (properly closed)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Stack Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(n) - Additional hash map storage

 *
 * ### INTUITION:
 * This is a classic stack problem. When we encounter an opening bracket, we push it onto the stack.
 * When we encounter a closing bracket, we check if it matches the most recent opening bracket (top of stack).
 * If all brackets are properly matched, the stack will be empty at the end.
 *
 * ### APPROACH:
 * 1. **Use a stack** to track opening brackets
 * 2. **Push opening brackets** onto the stack
 * 3. **Pop and check** when encountering closing brackets
 * 4. **Validate matching** bracket types
 * 5. **Check empty stack** at the end
 *
 * ### WHY THIS WORKS:
 * - Stack follows LIFO (Last In, First Out) principle
 * - This naturally handles the "most recent unmatched opening bracket" requirement
 * - Each closing bracket must match the most recent opening bracket
 * - Empty stack at the end means all brackets were properly matched
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "([{}])"
 * ```
 *
 * Steps:
 * Step 1: '(' → push to stack: ['(']
 * Step 2: '[' → push to stack: ['(', '[']
 * Step 3: '{' → push to stack: ['(', '[', '{']
 * Step 4: '}' → pop '{', matches ✓, stack: ['(', '[']
 * Step 5: ']' → pop '[', matches ✓, stack: ['(']
 * Step 6: ')' → pop '(', matches ✓, stack: []
 * Step 7: Result: Empty stack → True
 * 
 * Output:
 * ```
 * Empty stack → True
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Single pass through the string
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional hash map storage
 * Stack can contain up to n/2 opening brackets in worst case
 *
 * ### EDGE CASES:
 * - Empty string: Valid (return True)
 * - Single opening bracket: Invalid
 * - Single closing bracket: Invalid
 * - Odd length string: Invalid (can't have balanced brackets)
 * - Wrong order: "([)]" → Invalid
 *
 * </details>
 */

/**
 * Main solution for Problem 20: Valid Parentheses
 *
 * @param {string} s - String containing only '(', ')', '{', '}', '[', ']'
 * @return {boolean} - True if string has valid parentheses, false otherwise
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function isValid(s) {
  // Early termination: odd length can't be balanced
  if (s.length % 2 === 1) {
    return false;
  }

  // Stack to track opening brackets
  const stack = [];

  // Mapping of closing to opening brackets
  const bracketMap = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let char of s) {
    if (char in bracketMap) {
      // Closing bracket - check if it matches top of stack
      if (stack.length === 0 || stack.pop() !== bracketMap[char]) {
        return false;
      }
    } else {
      // Opening bracket - push to stack
      stack.push(char);
    }
  }

  // Valid if all brackets were matched (empty stack)
  return stack.length === 0;
}

/**
 * Alternative implementation with explicit opening bracket check
 *
 * @param {string} s - Input string
 * @return {boolean} - True if valid parentheses
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function isValidAlternative(s) {
  const stack = [];
  const opening = new Set(["(", "[", "{"]);
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (let char of s) {
    if (opening.has(char)) {
      stack.push(char);
    } else if (char in pairs) {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
    // Ignore other characters (if any)
  }

  return stack.length === 0;
}

/**
 * Alternative iterative replacement approach (less efficient)
 *
 * @param {string} s - Input string
 * @return {boolean} - True if valid parentheses
 *
 * Time Complexity: O(n²) in worst case
 * Space Complexity: O(n)
 */
function isValidIterative(s) {
  // Keep replacing valid pairs until no more changes
  while (s.includes("()") || s.includes("[]") || s.includes("{}")) {
    s = s.replace("()", "").replace("[]", "").replace("{}", "");
  }

  return s === "";
}

/**
 * Factory function that returns the main solution
 * @param {string} s - Input string
 * @return {boolean} - Result
 */
function solve(s) {
  return isValid(s);
}

/**
 * Test cases for Problem 20: Valid Parentheses
 */
function testSolution() {
  console.log("Testing 20. Valid Parentheses");

  // Test case 1: Simple valid cases
  console.assert(isValid("()") === true, "Test 1a failed");
  console.assert(isValid("[]") === true, "Test 1b failed");
  console.assert(isValid("{}") === true, "Test 1c failed");

  // Test case 2: Multiple brackets
  console.assert(isValid("()[]{}") === true, "Test 2a failed");
  console.assert(isValid("([{}])") === true, "Test 2b failed");

  // Test case 3: Invalid cases
  console.assert(isValid("(]") === false, "Test 3a failed");
  console.assert(isValid("([)]") === false, "Test 3b failed");
  console.assert(isValid("((") === false, "Test 3c failed");
  console.assert(isValid("))") === false, "Test 3d failed");

  // Test case 4: Edge cases
  console.assert(isValid("") === true, "Test 4a failed");
  console.assert(isValid("(") === false, "Test 4b failed");
  console.assert(isValid(")") === false, "Test 4c failed");

  // Test case 5: Complex valid case
  console.assert(isValid("((([{}])))") === true, "Test 5a failed");

  // Test case 6: Complex invalid case
  console.assert(isValid("([{}]))]") === false, "Test 6a failed");

  // Test alternative implementations
  console.assert(isValidAlternative("()[]{}") === true, "Alt test failed");
  console.assert(isValidIterative("([{}])") === true, "Iterative test failed");

  console.log("All test cases passed for 20. Valid Parentheses!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 20. Valid Parentheses ===");
  console.log("Category: Stack");
  console.log("Difficulty: Easy");
  console.log("");

  // Example demonstrations
  console.log('Example 1: isValid("()") =', isValid("()"));
  console.log('Example 2: isValid("()[]{}") =', isValid("()[]{}"));
  console.log('Example 3: isValid("(]") =', isValid("(]"));
  console.log('Example 4: isValid("([)]") =', isValid("([)]"));
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  isValid,
  isValidAlternative,
  isValidIterative,
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses classic stack approach for O(n) time complexity
 * - The bracket mapping technique simplifies the matching logic
 * - Critical for understanding stack data structure applications
 * - The approach can be adapted for other matching/pairing problems
 */
