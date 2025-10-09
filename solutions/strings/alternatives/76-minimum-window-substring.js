/**

 *
 * This problem demonstrates key concepts in Strings.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This problem requires understanding of strings concepts.
 *
 * APPROACH:
 * Apply strings methodology to solve efficiently.
 *
 * WHY THIS WORKS:
 * The solution leverages strings principles for optimal performance.
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [example input]\nStep 1: [explain first step]\nOutput: [expected output]
 *
 * EDGE CASES:
 * - Empty input handling\n- Single element cases\n- Large input considerations
 */

/**
 * Main solution for Problem 76: Minimum Window Substring
 *
 * @param {string} s - The source string to search in
 * @param {string} t - The target string to find
 * @return {string} - Minimum window substring containing all characters of t
 *
 * Time Complexity: O(m + n) where m is s length, n is t length
 * Space Complexity: O(k) where k is the number of unique characters in t
 */
function solve(s, t) {
    if (s.length === 0 || t.length === 0 || s.length < t.length) {
        return "";
    }

    // Count characters in target string
    const targetCount = new Map();
    for (const char of t) {
        targetCount.set(char, (targetCount.get(char) || 0) + 1);
    }

    let required = targetCount.size;
    let formed = 0;
    const windowCounts = new Map();

    let left = 0;
    let right = 0;
    let minLength = Infinity;
    let minLeft = 0;

    while (right < s.length) {
        // Add character from right to window
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

        // Check if current character frequency matches target
        if (targetCount.has(char) && windowCounts.get(char) === targetCount.get(char)) {
            formed++;
        }

        // Try to contract window from left
        while (left <= right && formed === required) {
            // Update minimum window
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minLeft = left;
            }

            // Remove character from left
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);

            if (targetCount.has(leftChar) && windowCounts.get(leftChar) < targetCount.get(leftChar)) {
                formed--;
            }

            left++;
        }

        right++;
    }

    return minLength === Infinity ? "" : s.substring(minLeft, minLeft + minLength);
}

/**
 * Test cases for Problem 76: Minimum Window Substring
 */
function testSolution() {
    console.log('Testing 76. Minimum Window Substring');

    // Test case 1: Basic case
    const result1 = solve("ADOBECODEBANC", "ABC");
    console.assert(result1 === "BANC",
        `Test 1 failed: expected "BANC", got "${result1}"`);

    // Test case 2: Single character
    const result2 = solve("a", "a");
    console.assert(result2 === "a",
        `Test 2 failed: expected "a", got "${result2}"`);

    // Test case 3: No valid window
    const result3 = solve("a", "aa");
    console.assert(result3 === "",
        `Test 3 failed: expected "", got "${result3}"`);

    // Test case 4: Entire string is minimum window
    const result4 = solve("ab", "ab");
    console.assert(result4 === "ab",
        `Test 4 failed: expected "ab", got "${result4}"`);

    // Test case 5: Multiple occurrences
    const result5 = solve("aaaaaaaaaaaabbbbbcdd", "abcdd");
    console.assert(result5 === "abbbbbcdd",
        `Test 5 failed: expected "abbbbbcdd", got "${result5}"`);

    console.log('All test cases passed for 76. Minimum Window Substring!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 76. Minimum Window Substring ===');
    console.log('Category: Strings');
    console.log('Difficulty: Hard');
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
