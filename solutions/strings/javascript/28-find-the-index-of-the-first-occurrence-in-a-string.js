/**
 * Difficulty: Easy
 *
 * # 28. Find The Index Of The First Occurrence In A String
 *
 * This problem demonstrates key concepts in String matching and pattern searching.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>haystack = "sadbutsad", needle = "sad"</dd>
 * <dt>Output:</dt>
 * <dd>0</dd>
 * <dt>Explanation:</dt>
 * <dd>Needle 'sad' occurs at index 0 in 'sadbutsad'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: String Algorithms, Pattern Matching
 * **Data Structures**: String, Array, Hash Map
 * **Patterns**: String Pattern, Substring Search
 * **Time Complexity**: **O(n * m)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * This is the classic string matching problem (also known as finding a substring). We need to find
 * the first position where the needle (pattern) appears in the haystack (text). The straightforward
 * approach is to check each position in the haystack to see if the needle starts there.
 *
 * ### APPROACH:
 * 1. **Handle edge cases**: If needle is empty, return 0 (convention)
 * 2. **Iterate through valid positions**: Only check positions where needle could fit
 * 3. **Check each position**: For each valid position, compare needle with substring
 * 4. **Return on match**: As soon as we find a match, return the starting index
 * 5. **Return -1 if not found**: If we complete the loop without finding needle
 *
 * ### WHY THIS WORKS:
 * - We systematically check every possible position where needle could start
 * - At each position, we verify if all characters of needle match
 * - We stop early if we find a mismatch at any position within needle
 * - The first match we find is guaranteed to be the earliest occurrence
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: haystack = "sadbutsad", needle = "sad"
 * Step 1: Check position 0: "sad" == "sad" ✓
 * Output: 0
 *
 * Input: haystack = "leetcode", needle = "leeto"
 * Step 1: Check position 0: "leetc" != "leeto" ✗
 * Step 2: Check position 1: "eetco" != "leeto" ✗
 * ...continue checking...
 * Step n: No match found
 * Output: -1
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n * m)
 * Where n is the length of haystack and m is the length of needle. In the worst case, we check
 * every position (n - m + 1) and for each position compare m characters.
 *
 * Note: More advanced algorithms like KMP or Rabin-Karp can achieve O(n + m), but for most
 * practical purposes and typical inputs, the simple approach is sufficient and easier to understand.
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * We only use a few variables regardless of input size.
 *
 * ### EDGE CASES:
 * - Empty needle: Return 0 (convention)
 * - Needle longer than haystack: Return -1
 * - Needle equals haystack: Return 0
 * - Needle not in haystack: Return -1
 * - Multiple occurrences: Return first one
 *
 * </details>
 */

/**
 * Main solution for Problem 28: Find The Index Of The First Occurrence In A String
 *
 * @param {string} haystack - The string to search in
 * @param {string} needle - The substring to find
 * @return {number} - Index of first occurrence, or -1 if not found
 *
 * Time Complexity: O(n * m) where n is haystack length, m is needle length
 * Space Complexity: O(1)
 */
function solve(haystack, needle) {
  // Edge case: empty needle
  if (needle.length === 0) {
    return 0;
  }

  // Check if needle can fit in remaining haystack
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    // Check if substring matches needle
    let match = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      return i;
    }
  }

  return -1;
}

/**
 * Test cases for Problem 28: Find The Index Of The First Occurrence In A String
 */
function testSolution() {
  console.log("Testing 28. Find The Index Of The First Occurrence In A String");

  // Test case 1: Found at index 0
  const result1 = solve("sadbutsad", "sad");
  console.assert(result1 === 0, `Test 1 failed: expected 0, got ${result1}`);

  // Test case 2: Not found
  const result2 = solve("leetcode", "leeto");
  console.assert(result2 === -1, `Test 2 failed: expected -1, got ${result2}`);

  // Test case 3: Found in middle
  const result3 = solve("hello", "ll");
  console.assert(result3 === 2, `Test 3 failed: expected 2, got ${result3}`);

  // Test case 4: Needle equals haystack
  const result4 = solve("a", "a");
  console.assert(result4 === 0, `Test 4 failed: expected 0, got ${result4}`);

  console.log(
    "All test cases passed for 28. Find The Index Of The First Occurrence In A String!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 28. Find The Index Of The First Occurrence In A String ===",
  );
  console.log("Category: Strings");
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
