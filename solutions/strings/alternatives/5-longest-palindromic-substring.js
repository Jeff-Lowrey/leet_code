/**
 * 5. Longest Palindromic Substring
 * Medium
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
 * Main solution for Problem 5: Longest Palindromic Substring
 *
 * @param {string} s - The input string
 * @return {string} - The longest palindromic substring
 *
 * Time Complexity: O(n^2) where n is the length of the string
 * Space Complexity: O(1) - only storing indices
 */
function solve(s) {
    if (s.length < 2) return s;

    let start = 0;
    let maxLength = 1;

    // Helper function to expand around center
    const expandAroundCenter = (left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        // Return length of palindrome
        return right - left - 1;
    };

    for (let i = 0; i < s.length; i++) {
        // Check for odd-length palindromes (single center)
        const len1 = expandAroundCenter(i, i);
        // Check for even-length palindromes (two centers)
        const len2 = expandAroundCenter(i, i + 1);

        const len = Math.max(len1, len2);

        if (len > maxLength) {
            maxLength = len;
            // Calculate start position
            start = i - Math.floor((len - 1) / 2);
        }
    }

    return s.substring(start, start + maxLength);
}

/**
 * Test cases for Problem 5: Longest Palindromic Substring
 */
function testSolution() {
    console.log('Testing 5. Longest Palindromic Substring');

    // Test case 1: Odd-length palindrome
    const result1 = solve("babad");
    console.assert(result1 === "bab" || result1 === "aba",
        `Test 1 failed: expected "bab" or "aba", got "${result1}"`);

    // Test case 2: Even-length palindrome
    const result2 = solve("cbbd");
    console.assert(result2 === "bb",
        `Test 2 failed: expected "bb", got "${result2}"`);

    // Test case 3: Single character
    const result3 = solve("a");
    console.assert(result3 === "a",
        `Test 3 failed: expected "a", got "${result3}"`);

    // Test case 4: All same characters
    const result4 = solve("aaaa");
    console.assert(result4 === "aaaa",
        `Test 4 failed: expected "aaaa", got "${result4}"`);

    // Test case 5: Entire string is palindrome
    const result5 = solve("racecar");
    console.assert(result5 === "racecar",
        `Test 5 failed: expected "racecar", got "${result5}"`);

    console.log('All test cases passed for 5. Longest Palindromic Substring!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 5. Longest Palindromic Substring ===');
    console.log('Category: Strings');
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
