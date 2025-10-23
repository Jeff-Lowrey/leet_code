/**
 * # 14. Longest Common Prefix
 *
 * # Difficulty: Easy
 *
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 *
 * Example:
 * Input: strs = ["flower","flow","flight"]
 * Output: "fl"
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>strs = ["flower","flow","flight"]</dd>
 * <dt>Output:</dt>
 * <dd>fl"</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest common prefix of ['flower','flow','flight'] is 'fl'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal
 * **Data Structures**: Array, String, Trie
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(S)
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * The longest common prefix is the sequence of characters that all strings share from the beginning. We can find this by comparing characters at each position across all strings until we find a mismatch.
 *
 * ### APPROACH:
 * 1. **Vertical Scanning**: Compare characters at the same position across all strings
 * 2. Start from position 0 and check if all strings have the same character at that position
 * 3. Continue until we find a mismatch or reach the end of any string
 * 4. Return the prefix found so far
 *
 * ### WHY THIS WORKS:
 * Since we're looking for a common prefix, all strings must have identical characters at each position from the start. The moment any string differs or ends, we've found the longest possible common prefix.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For strs = ["flower","flow","flight"]:
 * 1. Position 0: 'f', 'f', 'f' → all match
 * 2. Position 1: 'l', 'l', 'l' → all match
 * 3. Position 2: 'o', 'o', 'i' → mismatch found
 * 4. Return "fl"
 *
 * ### TIME COMPLEXITY:
 * O(S)
 * - S is the sum of all characters in all strings
 * - In worst case, we examine every character once
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Only using constant extra space for variables
 *
 * ### EDGE CASES:
 * - Empty array: return ""
 * - Empty string in array: return ""
 * - Single string: return the string itself
 * - No common prefix: return ""
 *
 * </details>
 */

/**
 * Main solution for Problem 014: Longest Common Prefix
 *
 * @param {any} args - Problem-specific arguments
 * @return {any} - Problem-specific return type
 *
 * Time Complexity: O(S)
 * - S is the sum of all characters in all strings
 * - In worst case, we examine every character once
 * Space Complexity: O(1)
 * - Only using constant extra space for variables
 */
function solve(strs) {
  // Handle edge cases
  if (!strs || strs.length === 0) return "";
  if (strs.length === 1) return strs[0];

  // Use the first string as a reference
  let prefix = strs[0];

  // Compare with each subsequent string
  for (let i = 1; i < strs.length; i++) {
    // Reduce prefix until it matches the start of current string
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

/**
 * Test cases for Problem 014: Longest Common Prefix
 */
function testSolution() {
  console.log("Testing 014. Longest Common Prefix");

  // Test case 1: Basic functionality
  const result1 = solve(["flower", "flow", "flight"]);
  const expected1 = "fl";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: No common prefix
  const result2 = solve(["dog", "racecar", "car"]);
  const expected2 = "";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single string
  const result3 = solve(["alone"]);
  const expected3 = "alone";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All same strings
  const result4 = solve(["test", "test", "test"]);
  const expected4 = "test";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Empty array
  const result5 = solve([]);
  const expected5 = "";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 014. Longest Common Prefix!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 014. Longest Common Prefix ===");
  console.log("Category: String Manipulation");
  console.log("Difficulty: Trie");
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
