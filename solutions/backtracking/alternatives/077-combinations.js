/**
 * 77. Combinations
 * Medium
 *
 * @file BT-077-JS_combinations___javascript_implementation.js @description Implementation of combinations algorithm in JavaScript
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Combinations is to understand the core problem pattern
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
 * @file BT-077-JS_combinations___javascript_implementation.js
 * @description Implementation of combinations algorithm in JavaScript
 */

/**
 * Generates all possible combinations of k numbers from range 1 to n
 * @param {number} n - The upper bound of numbers (1 to n)
 * @param {number} k - The size of each combination
 * @return {number[][]} Array of all possible combinations
 */
function combine(n, k) {
    // Input validation
    if (n < 1 || k < 1 || k > n) {
        return [];
    }

    const result = [];

    /**
     * Helper function to generate combinations using backtracking
     * @param {number} start - Starting number for current combination
     * @param {number[]} current - Current combination being built
     */
    function backtrack(start, current) {
        // Base case: if current combination has k elements, add it to result
        if (current.length === k) {
            result.push([...current]);
            return;
        }

        // Try each possible number that can be added to current combination
        for (let i = start; i <= n; i++) {
            // Add current number to combination
            current.push(i);
            
            // Recursively generate combinations with remaining numbers
            backtrack(i + 1, current);
            
            // Backtrack by removing the last added number
            current.pop();
        }
    }

    // Start the combination generation process
    backtrack(1, []);
    return result;
}

/**
 * Test function to verify the implementation
 */
function testCombinations() {
    // Test cases
    const testCases = [
        { n: 4, k: 2 },
        { n: 3, k: 3 },
        { n: 5, k: 3 },
        { n: 1, k: 1 },
        { n: 3, k: 0 },  // Edge case
    ];

    testCases.forEach((test, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`n = ${test.n}, k = ${test.k}`);
        console.log('Result:', combine(test.n, test.k));
        console.log('---');
    });
}

// Export the functions for potential use in other modules
module.exports = {
    combine,
    testCombinations
};

// Run tests if this file is being run directly
if (require.main === module) {
    testCombinations();
}