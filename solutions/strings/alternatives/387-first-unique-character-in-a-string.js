/**
 * # Difficulty: Easy
 *
 * # 387. First Unique Character In A String
 *
 * This problem demonstrates key concepts in Hash Tables and String manipulation.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"leetcode"</dd>
 * <dt>Output:</dt>
 * <dd>0</dd>
 * <dt>Explanation:</dt>
 * <dd>The first non-repeating character 'l' is at index 2 in 'leetcode'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * To find the first unique (non-repeating) character in a string, we need to know the frequency
 * of each character. A character is unique if it appears exactly once. We need to return the index
 * of the first such character when reading left to right.
 *
 * ### APPROACH:
 * 1. **Count frequencies**: Build a frequency map of all characters in the string
 * 2. **Find first unique**: Iterate through string again, checking frequency map
 * 3. **Return index**: Return the index of first character with frequency 1
 * 4. **Return -1**: If no unique character exists
 *
 * ### WHY THIS WORKS:
 * - Two-pass approach: first pass counts, second pass finds
 * - Hash map provides O(1) lookup for character frequencies
 * - By iterating left to right in second pass, we find the first unique character
 * - This approach is more efficient than checking each character's uniqueness separately
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "leetcode"
 * Step 1: Count frequencies: {'l':1, 'e':3, 't':1, 'c':1, 'o':1, 'd':1}
 * Step 2: Check s[0]='l': frequency is 1, found first unique!
 * Output: 0
 *
 * Input: s = "loveleetcode"
 * Step 1: Count frequencies: {'l':2, 'o':2, 'v':1, 'e':4, 't':1, 'c':1, 'd':1}
 * Step 2: Check s[0]='l': frequency is 2, not unique
 * Step 3: Check s[1]='o': frequency is 2, not unique
 * Step 4: Check s[2]='v': frequency is 1, found first unique!
 * Output: 2
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * We make two passes through the string: one to count (O(n)) and one to find (O(n)).
 * Total is O(2n) = O(n).
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * Although we use a hash map, since we're limited to lowercase English letters (26 characters),
 * the space is bounded by a constant. For general character sets, it would be O(k) where k is
 * the character set size.
 *
 * ### EDGE CASES:
 * - Empty string: Return -1
 * - Single character: Return 0
 * - No unique characters (all repeated): Return -1
 * - All unique characters: Return 0 (first character)
 * - String with only one unique character at the end: Return its index
 *
 * </details>
 */

/**
 * Main solution for Problem 387: First Unique Character In A String
 *
 * @param {string} s - The input string
 * @return {number} - Index of first unique character, or -1 if none exists
 *
 * Time Complexity: O(n) - two passes through the string
 * Space Complexity: O(1) - limited to 26 lowercase letters
 */
function solve(s) {
    // Count character frequencies
    const charCount = new Map();

    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Find first character with count of 1
    for (let i = 0; i < s.length; i++) {
        if (charCount.get(s[i]) === 1) {
            return i;
        }
    }

    return -1;
}

/**
 * Test cases for Problem 387: First Unique Character In A String
 */
function testSolution() {
    console.log('Testing 387. First Unique Character In A String');

    // Test case 1: First unique is 'l' at index 0
    const result1 = solve("leetcode");
    console.assert(result1 === 0, `Test 1 failed: expected 0, got ${result1}`);

    // Test case 2: First unique is 'v' at index 2
    const result2 = solve("loveleetcode");
    console.assert(result2 === 2, `Test 2 failed: expected 2, got ${result2}`);

    // Test case 3: No unique character
    const result3 = solve("aabb");
    console.assert(result3 === -1, `Test 3 failed: expected -1, got ${result3}`);

    // Test case 4: Single character
    const result4 = solve("z");
    console.assert(result4 === 0, `Test 4 failed: expected 0, got ${result4}`);

    console.log('All test cases passed for 387. First Unique Character In A String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 387. First Unique Character In A String ===');
    console.log('Category: Strings');
    console.log('Difficulty: Easy');
    console.log('');

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
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
