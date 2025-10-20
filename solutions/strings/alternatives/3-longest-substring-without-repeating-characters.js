/**
 * # Difficulty: Medium
 *
 * # 3. Longest Substring Without Repeating Characters
 *
 * This problem demonstrates key concepts in Sliding Window and Hash Tables.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"abcabcbb"</dd>
 * <dt>Output:</dt>
 * <dd>3 (from "abc")</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest substring without repeating characters is 'abc' with length 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n)
**Space Complexity**: * O(min(n, m))

 *
 * ### INTUITION:
 * We need to find the longest substring where all characters are unique (no repeating characters).
 * The key insight is to use a sliding window approach: as we expand the window by adding characters,
 * if we encounter a duplicate, we shrink the window from the left until the duplicate is removed.
 *
 * ### APPROACH:
 * 1. **Use sliding window**: Maintain a window of unique characters
 * 2. **Track character positions**: Use hash map to store the most recent index of each character
 * 3. **Expand window**: Add characters from the right
 * 4. **Handle duplicates**: When a duplicate is found, move left pointer past the previous occurrence
 * 5. **Track maximum**: Keep track of the longest valid window seen
 *
 * ### WHY THIS WORKS:
 * - Hash map provides O(1) lookup for checking if a character was seen
 * - Storing character indices allows us to quickly jump past duplicates
 * - Left pointer only moves forward, never backward
 * - Each character is visited at most twice (once by right, once by left)
 * - This efficiently finds the longest substring without checking all substrings
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "abcabcbb"
 *
 * right=0, left=0: 'a' -> window="a", max_length=1
 *   map: {'a':0}
 *
 * right=1, left=0: 'b' -> window="ab", max_length=2
 *   map: {'a':0, 'b':1}
 *
 * right=2, left=0: 'c' -> window="abc", max_length=3
 *   map: {'a':0, 'b':1, 'c':2}
 *
 * right=3, left=0: 'a' (duplicate!)
 *   - 'a' was at index 0
 *   - Move left to 1 (past the duplicate)
 *   - window="bca", max_length=3
 *   map: {'a':3, 'b':1, 'c':2}
 *
 * right=4, left=1: 'b' (duplicate!)
 *   - 'b' was at index 1
 *   - Move left to 2 (past the duplicate)
 *   - window="cab", max_length=3
 *   map: {'a':3, 'b':4, 'c':2}
 *
 * right=5, left=2: 'c' (duplicate!)
 *   - 'c' was at index 2
 *   - Move left to 3 (past the duplicate)
 *   - window="abc", max_length=3
 *   map: {'a':3, 'b':4, 'c':5}
 *
 * right=6, left=3: 'b' (duplicate!)
 *   - 'b' was at index 4
 *   - Move left to 5
 *   - window="cb", max_length=3
 *   map: {'a':3, 'b':6, 'c':5}
 *
 * right=7, left=5: 'b' (duplicate!)
 *   - 'b' was at index 6
 *   - Move left to 7
 *   - window="b", max_length=3
 *   map: {'a':3, 'b':7, 'c':5}
 *
 * Output: 3 (from "abc")
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * We iterate through the string once with the right pointer, and the left pointer moves at most n
 * times total. Each character is processed at most twice. Total: O(2n) = O(n).
 *
 * ### SPACE COMPLEXITY:
 * O(min(n, m))
 * Where n is the string length and m is the character set size. In the worst case (all unique
 * characters), the hash map stores n entries. For ASCII (128 chars) or Unicode subsets, space
 * is bounded by the character set size.
 *
 * ### EDGE CASES:
 * - Empty string: Return 0
 * - Single character: Return 1
 * - All unique characters: Return length of string
 * - All same characters: Return 1
 * - Two characters alternating: Return 2
 *
 * </details>
 */

/**
 * Main solution for Problem 3: Longest Substring Without Repeating Characters
 *
 * @param {string} s - The input string
 * @return {number} - Length of the longest substring without repeating characters
 *
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(min(n, m)) where m is the character set size
 */
function solve(s) {
  const charIndex = new Map();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If character is already in window, move left pointer
    if (charIndex.has(char) && charIndex.get(char) >= left) {
      left = charIndex.get(char) + 1;
    }

    // Update character index
    charIndex.set(char, right);

    // Update max length
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

/**
 * Test cases for Problem 3: Longest Substring Without Repeating Characters
 */
function testSolution() {
  console.log("Testing 3. Longest Substring Without Repeating Characters");

  // Test case 1: "abc" has length 3
  const result1 = solve("abcabcbb");
  console.assert(result1 === 3, `Test 1 failed: expected 3, got ${result1}`);

  // Test case 2: All same characters
  const result2 = solve("bbbbb");
  console.assert(result2 === 1, `Test 2 failed: expected 1, got ${result2}`);

  // Test case 3: "wke" has length 3
  const result3 = solve("pwwkew");
  console.assert(result3 === 3, `Test 3 failed: expected 3, got ${result3}`);

  // Test case 4: Empty string
  const result4 = solve("");
  console.assert(result4 === 0, `Test 4 failed: expected 0, got ${result4}`);

  // Test case 5: All unique characters
  const result5 = solve("abcdef");
  console.assert(result5 === 6, `Test 5 failed: expected 6, got ${result5}`);

  console.log(
    "All test cases passed for 3. Longest Substring Without Repeating Characters!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 3. Longest Substring Without Repeating Characters ===",
  );
  console.log("Category: Strings");
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
