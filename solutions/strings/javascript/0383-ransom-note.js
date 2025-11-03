/**
 * # Difficulty: Easy
 *
 * # 0383. Ransom Note
 *
 *
 * This problem demonstrates key concepts in Strings and Hash Tables.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>ransomNote = "aa", magazine = "aab"</dd>
 * <dt>Output:</dt>
 * <dd>True</dd>
 * <dt>Explanation:</dt>
 * <dd>The ransom note 'aa' cannot be constructed from magazine 'ab' (not enough 'a's)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, String
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(m + n)
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
The key insight is that to construct a ransom note from magazine letters, we need to ensure that the magazine contains
at least as many of each character as required by the ransom note. This is essentially checking
if one string's character frequencies are a subset of another's character frequencies.

### APPROACH:
1. **Count magazine characters**: Build a frequency map of all characters in the magazine
2. **Verify ransom note**: For each character in ransom note, check if available in magazine
3. **Decrement counts**: As we use characters from magazine, decrease their counts
4. **Return result**: If we can construct entire ransom note, return True; otherwise False

### WHY THIS WORKS:
 * - Hash map provides O(1) lookup for character availability
 * - By counting magazine characters first, we know what's available
 * - Decrementing counts as we consume characters ensures we don't reuse
 * - If any character is unavailable or exhausted, we return False immediately
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * ransomNote = "aa", magazine = "aab"
 * ransomNote = "aa", magazine = "ab"
 * ```
 *
 * Step 1: Count magazine chars: {'a': 2, 'b': 1}
 * Step 2: Check 'a' (first): count is 2, decrement to 1
 * Step 3: Check 'a' (second): count is 1, decrement to 0
 * Step 4: All characters available
 * Step 1: Count magazine chars: {'a': 1, 'b': 1}
 * Step 2: Check 'a' (first): count is 1, decrement to 0
 * Step 3: Check 'a' (second): count is 0, not available
 *
 * Output:
 * ```
 * True
 * False
 * ```

 * ### TIME COMPLEXITY:
 * O(m + n)
 * Where m is the length of magazine and n is the length of ransomNote. We iterate through both
 * strings once.
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Although we use a hash map, since we're limited to lowercase English letters (26 characters),
 * the space is bounded by a constant.
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

/**
 * Main solution for Problem 383: Ransom Note
 *
 * @param {string} ransomNote - The ransom note to construct
 * @param {string} magazine - The magazine to cut letters from
 * @return {boolean} - True if ransom note can be constructed from magazine
 *
 * Time Complexity: O(m + n) where m is magazine length, n is ransomNote length
 * Space Complexity: O(1) - limited to 26 lowercase letters
 */
function solve(ransomNote, magazine) {
  // Count character frequencies in magazine
  const charCount = new Map();

  for (const char of magazine) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Check if we can construct the ransom note
  for (const char of ransomNote) {
    const count = charCount.get(char) || 0;
    if (count === 0) {
      return false;
    }
    charCount.set(char, count - 1);
  }

  return true;
}

/**
 * Test cases for Problem 383: Ransom Note
 */
function testSolution() {
  console.log("Testing 383. Ransom Note");

  // Test case 1: Cannot construct - not enough 'a'
  const result1 = solve("a", "b");
  console.assert(
    result1 === false,
    `Test 1 failed: expected false, got ${result1}`,
  );

  // Test case 2: Cannot construct - not enough of each letter
  const result2 = solve("aa", "ab");
  console.assert(
    result2 === false,
    `Test 2 failed: expected false, got ${result2}`,
  );

  // Test case 3: Can construct
  const result3 = solve("aa", "aab");
  console.assert(
    result3 === true,
    `Test 3 failed: expected true, got ${result3}`,
  );

  // Test case 4: Empty ransom note
  const result4 = solve("", "abc");
  console.assert(
    result4 === true,
    `Test 4 failed: expected true, got ${result4}`,
  );

  console.log("All test cases passed for 383. Ransom Note!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 383. Ransom Note ===");
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
