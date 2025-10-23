/**
 * # 541. Reverse String Ii
 *
 * # Difficulty: Easy
 *
 * Given a string s and an integer k, reverse the first k characters for every 2k
 * characters counting from the start of the string.
 *
 * If there are fewer than k characters left, reverse all of them.
 * If there are less than 2k but greater than or equal to k characters, then reverse
 * the first k characters and leave the other as original.
 *
 * Example:
 * Input: s = "abcdefg", k = 2
 * Output: "bacdfeg"
 * Explanation:
 * - First 2k (4) characters: "abcd" -> reverse first k (2): "bacd"
 * - Next 2k (4) characters: "efg" -> reverse first k (2): "feg" (only 3 left)
 * Result: "bacdfeg"
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "abcdefg", k = 2</dd>
 * <dt>Output:</dt>
 * <dd>bacdfeg"</dd>
 * <dt>Explanation:</dt>
 * <dd>Reverse first k=2 chars in each 2k group: 'abcdefg' becomes 'bacdfeg'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Greedy Selection
 * **Data Structures**: Array, String, Tree
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * We need to process the string in chunks of 2k characters. For each chunk, we reverse
 * the first k characters and leave the rest unchanged. This pattern repeats throughout
 * the string. The key is to iterate by steps of 2k and handle edge cases where fewer
 * characters remain.
 *
 * ### APPROACH:
 * 1. **Convert to List**: Strings are immutable in Python, convert to list
 * 2. **Iterate by 2k Steps**: Process string in chunks of 2k characters
 * 3. **Reverse First k**: For each chunk, reverse the first k characters
 * 4. **Handle Edge Cases**:
 *    - If < k characters left: reverse all
 *    - If k to 2k-1 characters left: reverse first k only
 * 5. **Join Result**: Convert list back to string
 *
 * ### WHY THIS WORKS:
 * - Processing in 2k chunks ensures we reverse the right segments
 * - Two-pointer reversal is efficient and in-place
 * - Range with step=2k automatically handles chunking
 * - Edge cases are naturally handled by min(i+k, len(s))
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "abcdefg", k = 2
 *
 * Chunks of 2k = 4:
 * 1. i=0: Process chars[0:4] = "abcd"
 *    - Reverse chars[0:2] = "ab" → "ba"
 *    - Result: "bacd"
 *
 * 2. i=4: Process chars[4:8] = "efg"
 *    - Reverse chars[4:6] = "ef" → "fe"
 *    - Result: "feg"
 *
 * Final: "bacd" + "feg" = "bacdfeg"
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * - Visit each character once during iteration
 * - Reversing k characters per 2k chunk is O(k) but amortized O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Converting string to list requires O(n) space
 * - Python strings are immutable, so this is necessary
 *
 * ### EDGE CASES:
 * - s length < k: Reverse entire string
 * - s length = k: Reverse entire string
 * - s length between k and 2k: Reverse first k only
 * - k = 1: No actual reversal needed (each char is its own segment)
 *
 * </details>
 */

/**
 * Main solution for Problem 541: Reverse String Ii
 *
 * @param {string} s - Input string
 * @param {number} k - Number of characters to reverse in each 2k chunk
 * @return {string} - Modified string
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s, k) {
  // Convert to array for easier manipulation
  const arr = s.split("");

  // Process in chunks of 2k
  for (let i = 0; i < arr.length; i += 2 * k) {
    // Reverse first k characters (or remaining if less than k)
    let left = i;
    let right = Math.min(i + k - 1, arr.length - 1);

    // Reverse the substring
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr.join("");
}

/**
 * Test cases for Problem 541: Reverse String Ii
 */
function testSolution() {
  console.log("Testing 541. Reverse String Ii");

  // Test case 1: Basic functionality
  const result1 = solve("abcdefg", 2);
  const expected1 = "bacdfeg";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: k equals string length
  const result2 = solve("abcd", 2);
  const expected2 = "bacd";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: k = 1
  const result3 = solve("abcdefg", 1);
  const expected3 = "abcdefg";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: String shorter than k
  const result4 = solve("ab", 4);
  const expected4 = "ba";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Exact multiple of 2k
  const result5 = solve("abcdefgh", 2);
  const expected5 = "bacdfegh";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 541. Reverse String Ii!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 541. Reverse String Ii ===");
  console.log("Category: String Manipulation");
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
