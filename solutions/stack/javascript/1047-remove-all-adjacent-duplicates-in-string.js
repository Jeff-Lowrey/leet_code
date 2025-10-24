/**
 * # Difficulty: Easy
 *
 * # 1047. Remove All Adjacent Duplicates In String
 *
 * Difficulty: Medium
 *
 * You are given a string s consisting of lowercase English letters. A duplicate removal
 * consists of choosing two adjacent and equal characters and removing them.
 *
 * We repeatedly make duplicate removals on s until we no longer can.
 *
 * Return the final string after all such duplicate removals have been made. It can be
 * proven that the answer is unique.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"abbaca"</dd>
 * <dt>Output:</dt>
 * <dd>"ca"</dd>
 * <dt>Explanation:</dt>
 * <dd>After removing adjacent duplicates, 'abbaca' becomes 'ca'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal, Stack Operations
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n)

 *
 * ### INTUITION:
 * Use a stack to efficiently track characters. When we see a character that matches
 * the top of the stack, we've found an adjacent duplicate pair - pop the stack.
 * Otherwise, push the character onto the stack.
 *
 * ### APPROACH:
 * 1. Use stack to track characters we've seen
 * 2. For each character:
 *    - If it matches stack top: pop (remove duplicate pair)
 *    - Otherwise: push character onto stack
 * 3. Join stack elements to form final string
 *
 * ### WHY THIS WORKS:
 * - Stack naturally maintains adjacency (top element is most recent)
 * - Removing duplicates as we go handles cascading removals
 * - Single pass is sufficient since we process left-to-right
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "abbaca"
 * ```
 *
 * Step 1: Use stack
 * 'a': stack=['a']
 * 'b': stack=['a','b']
 * 'b': stack=['a'] (removed duplicate)
 * 'a': stack=[] (removed duplicate)
 * 'c': stack=['c']
 * 'a': stack=['c','a']
 *
 * Output:
 * ```
 * "ca"
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Single pass through string with O(1) stack operations
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * Stack stores up to n characters in worst case (no duplicates)
 *
 * ### EDGE CASES:
 * - Empty string: returns empty string
 * - No duplicates: returns original string
 * - All characters form duplicate pairs: returns empty string
 * - Cascading removals: "abccba" → "abba" → "aa" → ""
 *
 * </details>
 */

/**
 * Main solution for Problem 1047: Remove All Adjacent Duplicates In String
 *
 * @param {string} s - Input string
 * @return {string} - String after removing all adjacent duplicates
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s) {
  const stack = [];

  for (const char of s) {
    // If current char matches top of stack, remove the pair
    if (stack.length > 0 && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      // Otherwise, add current char to stack
      stack.push(char);
    }
  }

  return stack.join("");
}

/**
 * Test cases for Problem 1047: Remove All Adjacent Duplicates In String
 */
function testSolution() {
  console.log("Testing 1047. Remove All Adjacent Duplicates In String");

  // Test case 1: Basic with cascading removals
  const result1 = solve("abbaca");
  const expected1 = "ca";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: All duplicates removed
  const result2 = solve("azxxzy");
  const expected2 = "ay";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: No duplicates
  const result3 = solve("abc");
  const expected3 = "abc";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Empty after all removals
  const result4 = solve("aa");
  const expected4 = "";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  console.log(
    "All test cases passed for 1047. Remove All Adjacent Duplicates In String!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 1047. Remove All Adjacent Duplicates In String ===",
  );
  console.log("Category: Stack");
  console.log("Difficulty: Easy");
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
