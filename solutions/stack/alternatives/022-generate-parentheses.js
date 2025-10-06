/**
 * 22. Generate Parentheses
 * Medium
 *
 * Generate Parentheses - LeetCode #22 Problem: Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses. @param {number} n - Number of pairs of parentheses @return {string[]} - Array of all valid parentheses combinations
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Generate Parentheses is to understand the core problem pattern
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
 * Generate Parentheses - LeetCode #22
 * 
 * Problem: Given n pairs of parentheses, write a function to generate 
 * all combinations of well-formed parentheses.
 * 
 * @param {number} n - Number of pairs of parentheses
 * @return {string[]} - Array of all valid parentheses combinations
 */

/**
 * Main function to generate all valid parentheses combinations
 * @param {number} n - Number of pairs
 * @return {string[]} - Array of valid combinations
 */
function generateParentheses(n) {
    // Edge case handling
    if (n <= 0) return [];
    if (n === 1) return ["()"];

    // Result array to store all valid combinations
    const result = [];

    /**
     * Recursive helper function to generate combinations
     * @param {string} current - Current parentheses string being built
     * @param {number} open - Count of open parentheses
     * @param {number} close - Count of close parentheses
     */
    function backtrack(current, open, close) {
        // Base case: if we've used all parentheses
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        // If we can still add open parentheses
        if (open < n) {
            backtrack(current + "(", open + 1, close);
        }

        // If we can add close parentheses (close must be less than open)
        if (close < open) {
            backtrack(current + ")", open, close + 1);
        }
    }

    // Start the recursive process
    backtrack("", 0, 0);
    return result;
}

/**
 * Test function to verify the implementation
 */
function testGenerateParentheses() {
    const testCases = [
        { input: 1, expected: ["()"] },
        { input: 2, expected: ["(())", "()()"] },
        { input: 3, expected: ["((()))", "(()())", "(())()", "()(())", "()()()"] },
        { input: 0, expected: [] }
    ];

    testCases.forEach((testCase, index) => {
        const result = generateParentheses(testCase.input);
        const passed = JSON.stringify(result.sort()) === JSON.stringify(testCase.expected.sort());
        console.log(`Test case ${index + 1}: ${passed ? 'PASSED' : 'FAILED'}`);
        console.log(`Input: ${testCase.input}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Got: ${result}\n`);
    });
}

// Export the function for use in other modules
module.exports = generateParentheses;

// Run tests if this file is being run directly
if (require.main === module) {
    testGenerateParentheses();
}

/**
 * Example Usage:
 * const result = generateParentheses(3);
 * console.log(result);
 * // Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]
 */