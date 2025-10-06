/**
 * 91. Decode Ways
 * Medium
 *
 * Decode Ways - Dynamic Programming Solution Problem: Given a string containing digits, determine the number of ways to decode it into letters where 'A' -> "1", 'B' -> "2", ..., 'Z' -> "26" @param {string} s - Input string containing digits @return {number} - Number of possible decodings
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Decode Ways is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Decode Ways - Dynamic Programming Solution
 * 
 * Problem: Given a string containing digits, determine the number of ways to decode it into letters
 * where 'A' -> "1", 'B' -> "2", ..., 'Z' -> "26"
 * 
 * @param {string} s - Input string containing digits
 * @return {number} - Number of possible decodings
 */

/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = function(s) {
    // Handle edge cases
    if (!s || s.length === 0 || s[0] === '0') {
        return 0;
    }

    // Initialize dynamic programming array
    const dp = new Array(s.length + 1).fill(0);
    dp[0] = 1;  // Empty string has one way to decode
    dp[1] = s[0] === '0' ? 0 : 1;  // First character

    // Iterate through the string
    for (let i = 2; i <= s.length; i++) {
        // Get current and previous digits
        const oneDigit = parseInt(s[i - 1]);
        const twoDigits = parseInt(s.substring(i - 2, i));

        // Check if single digit decode is possible
        if (oneDigit >= 1 && oneDigit <= 9) {
            dp[i] += dp[i - 1];
        }

        // Check if two digit decode is possible
        if (twoDigits >= 10 && twoDigits <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[s.length];
};

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        { input: "12", expected: 2 },
        { input: "226", expected: 3 },
        { input: "06", expected: 0 },
        { input: "27", expected: 1 },
        { input: "1201234", expected: 3 }
    ];

    for (const test of testCases) {
        const result = numDecodings(test.input);
        console.log(`Input: "${test.input}"`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Test ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    }
}

// Export the function for use in other modules
module.exports = numDecodings;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}