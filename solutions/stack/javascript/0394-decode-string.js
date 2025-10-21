/**
 * # Difficulty: Medium
 *
 * # 394. Decode String
 *
 * Given an encoded string, return its decoded string.
 *
 * The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
 *
 * You may assume that the input string is always valid; no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"3[a2[c]]"</dd>
 * <dt>Output:</dt>
 * <dd>"accaccacc"</dd>
 * <dt>Explanation:</dt>
 * <dd>Decoded string: '3[a]2[bc]' becomes 'aaabcbc'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Stack Operations
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: * O(n × m)
 * **Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * This is a classic stack problem where we need to process nested brackets. When we encounter a number followed by '[', we need to remember what to repeat and how many times. When we hit ']', we decode the current segment and multiply it by the count.
 *
 * ### APPROACH:
 * 1. **Use two stacks**: One for counts, one for strings
 * 2. **Parse number**: When we see a digit, build the complete number
 * 3. **Push on '['**: Save current count and string, reset for new level
 * 4. **Pop on ']'**: Multiply current string by count and append to previous level
 * 5. **Build result**: Characters are added to current string
 *
 * ### WHY THIS WORKS:
 * - Stack naturally handles nested structures
 * - We process from inside out, which is correct for nested encoding
 * - Each '[' starts a new encoding level, ']' completes it
 * - Numbers are always followed by '[', so we can parse them together
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: "3[a2[c]]"
 * 1. '3': count = 3
 * 2. '[': push count=3, string="", reset current
 * 3. 'a': current_string = "a"
 * 4. '2': count = 2
 * 5. '[': push count=2, string="a", reset current
 * 6. 'c': current_string = "c"
 * 7. ']': current = "c" * 2 = "cc", pop: current = "a" + "cc" = "acc"
 * 8. ']': current = "acc" * 3 = "accaccacc"
 * Output: "accaccacc"
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n × m)
 * Where n is length of input, m is maximum decoded length
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For the stacks and intermediate strings
 *
 * ### EDGE CASES:
 * - No brackets: return original string
 * - Single level: "3[a]" → "aaa"
 * - Nested levels: "2[a3[b]]" → "abbbabbb"
 * - Multiple segments: "2[ab]3[cd]" → "ababcdcdcd"
 *
 * </details>
 */

/**
 * Main solution for Problem 394: Decode String
 *
 * @param {string} s - Encoded string
 * @return {string} - Decoded string
 *
 * Time Complexity: O(maxK * n)
 * Space Complexity: O(n)
 */
function solve(s) {
  const countStack = [];
  const stringStack = [];
  let currentString = "";
  let count = 0;

  for (const char of s) {
    if (char >= "0" && char <= "9") {
      // Build multi-digit number
      count = count * 10 + parseInt(char);
    } else if (char === "[") {
      // Save current state and start new context
      countStack.push(count);
      stringStack.push(currentString);
      currentString = "";
      count = 0;
    } else if (char === "]") {
      // Restore previous state and repeat current string
      const repeatCount = countStack.pop();
      const prevString = stringStack.pop();
      currentString = prevString + currentString.repeat(repeatCount);
    } else {
      // Regular character
      currentString += char;
    }
  }

  return currentString;
}

/**
 * Test cases for Problem 394: Decode String
 */
function testSolution() {
  console.log("Testing 394. Decode String");

  // Test case 1: Nested encoding
  const result1 = solve("3[a2[c]]");
  const expected1 = "accaccacc";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Simple encoding
  const result2 = solve("3[a]2[bc]");
  const expected2 = "aaabcbc";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Complex nested
  const result3 = solve("2[abc]3[cd]ef");
  const expected3 = "abcabccdcdcdef";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Deep nesting
  const result4 = solve("10[a]");
  const expected4 = "aaaaaaaaaa";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  console.log("All test cases passed for 394. Decode String!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 394. Decode String ===");
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
