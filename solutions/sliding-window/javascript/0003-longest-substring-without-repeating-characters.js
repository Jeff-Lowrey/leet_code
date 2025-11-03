/**
 * # Difficulty: Medium
 *
 * # 0003. Longest Substring Without Repeating Characters
 *
 *
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"abcabcbb"</dd>
 * <dt>Output:</dt>
 * <dd>3 (substring "abc")</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest substring without repeating characters is 'abc' with length 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, String
 * **Patterns**: Sliding Window Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of sliding window concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply sliding window methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- This ensures that the solution leverages sliding window principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "abcabcbb"
 * ```
 *
 * Step 1: char='a', pos=0
 * char_position = {'a': 0}, start = 0
 * max_length = 1
 * Step 2: char='b', pos=1
 * char_position = {'a': 0, 'b': 1}, start = 0
 * max_length = 2
 * Step 3: char='c', pos=2
 * char_position = {'a': 0, 'b': 1, 'c': 2}, start = 0
 * max_length = 3
 * Step 4: char='a', pos=3 (repeat!)
 * 'a' at position 0 >= start, so update start = 0 + 1 = 1
 * char_position = {'a': 3, 'b': 1, 'c': 2}
 * Step 5: char='b', pos=4 (repeat!)
 * 'b' at position 1 >= start, so update start = 1 + 1 = 2
 * char_position = {'a': 3, 'b': 4, 'c': 2}
 * Step 6: char='c', pos=5 (repeat!)
 * 'c' at position 2 >= start, so update start = 2 + 1 = 3
 * char_position = {'a': 3, 'b': 4, 'c': 5}
 * Step 7: char='b', pos=6 (repeat!)
 * 'b' at position 4 >= start, so update start = 4 + 1 = 5
 * Step 8: char='b', pos=7 (repeat!)
 * 'b' at position 6 >= start, so update start = 6 + 1 = 7
 *
 * Output:
 * ```
 * 3 (substring "abc")
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

/**
 * Main solution for Problem 003: Longest Substring Without Repeating Characters
 *
 * @param {string} s - Input string
 * @return {number} - Length of longest substring without repeating characters
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, m)) where m is charset size
 */
function solve(s) {
  if (!s || s.length === 0) return 0;
  if (s.length === 1) return 1;

  const charMap = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    // If character already exists in window, move left pointer
    if (charMap.has(currentChar) && charMap.get(currentChar) >= left) {
      left = charMap.get(currentChar) + 1;
    }

    // Update character's most recent index
    charMap.set(currentChar, right);

    // Update maximum length
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

/**
 * Test cases for Problem 003: Longest Substring Without Repeating Characters
 */
function testSolution() {
  console.log("Testing 003. Longest Substring Without Repeating Characters");

  // Test case 1: Basic example with repeating characters
  const result1 = solve("abcabcbb");
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: "abcabcbb" -> ${result1}`);

  // Test case 2: All same characters
  const result2 = solve("bbbbb");
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: "bbbbb" -> ${result2}`);

  // Test case 3: All unique characters
  const result3 = solve("pwwkew");
  const expected3 = 3;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: "pwwkew" -> ${result3}`);

  // Test case 4: Empty string
  const result4 = solve("");
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: "" -> ${result4}`);

  // Test case 5: Single character
  const result5 = solve("a");
  const expected5 = 1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: "a" -> ${result5}`);

  // Test case 6: No repeating characters
  const result6 = solve("abcdef");
  const expected6 = 6;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`Test 6 passed: "abcdef" -> ${result6}`);

  // Test case 7: Complex case
  const result7 = solve("dvdf");
  const expected7 = 3;
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );
  console.log(`Test 7 passed: "dvdf" -> ${result7}`);

  console.log(
    "All test cases passed for 003. Longest Substring Without Repeating Characters!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 003. Longest Substring Without Repeating Characters ===",
  );
  console.log("Category: Sliding Window");
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
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
