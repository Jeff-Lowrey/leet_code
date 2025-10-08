/**
 * 003. Longest Substring Without Repeating Characters
 * Medium
 *
 * This problem demonstrates key concepts in Sliding Window.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * The key insight is to use a sliding window with a hash map to track characters.
 * We expand the window when characters are unique and shrink it when duplicates appear.
 *
 * APPROACH:
 * 1. **Analyze the problem**: Find the longest substring without repeating characters
 * 2. **Choose the right technique**: Variable-size sliding window with hash map
 * 3. **Implement efficiently**: Use Map to track last seen index of each character
 * 4. **Handle edge cases**: Empty string, single character, all unique, all same
 *
 * WHY THIS WORKS:
 * - The sliding window expands by moving right pointer
 * - When duplicate found, left pointer jumps to position after last occurrence
 * - Map stores the most recent index of each character for O(1) lookup
 * - We track maximum length throughout the process
 *
 * TIME COMPLEXITY: O(n) - single pass through string
 * SPACE COMPLEXITY: O(min(n, m)) where m is charset size (at most 128 for ASCII)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "abcabcbb"
 * Step 1: left=0, right=0, char='a', map={'a':0}, maxLen=1
 * Step 2: left=0, right=1, char='b', map={'a':0,'b':1}, maxLen=2
 * Step 3: left=0, right=2, char='c', map={'a':0,'b':1,'c':2}, maxLen=3
 * Step 4: left=1, right=3, char='a' (duplicate), left moves to 1, maxLen=3
 * Step 5: Continue until right=7, maxLen remains 3
 * Output: 3
 * ```
 *
 * EDGE CASES:
 * - Empty string: return 0
 * - Single character: return 1
 * - All unique characters: return string length
 * - All same characters: return 1
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
    console.log('Testing 003. Longest Substring Without Repeating Characters');

    // Test case 1: Basic example with repeating characters
    const result1 = solve("abcabcbb");
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: "abcabcbb" -> ${result1}`);

    // Test case 2: All same characters
    const result2 = solve("bbbbb");
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: "bbbbb" -> ${result2}`);

    // Test case 3: All unique characters
    const result3 = solve("pwwkew");
    const expected3 = 3;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: "pwwkew" -> ${result3}`);

    // Test case 4: Empty string
    const result4 = solve("");
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: "" -> ${result4}`);

    // Test case 5: Single character
    const result5 = solve("a");
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: "a" -> ${result5}`);

    // Test case 6: No repeating characters
    const result6 = solve("abcdef");
    const expected6 = 6;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);
    console.log(`Test 6 passed: "abcdef" -> ${result6}`);

    // Test case 7: Complex case
    const result7 = solve("dvdf");
    const expected7 = 3;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);
    console.log(`Test 7 passed: "dvdf" -> ${result7}`);

    console.log('All test cases passed for 003. Longest Substring Without Repeating Characters!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 003. Longest Substring Without Repeating Characters ===');
    console.log('Category: Sliding Window');
    console.log('Difficulty: Medium');
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
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
