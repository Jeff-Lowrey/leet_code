/**
 * 326. Power
 * Medium
 *
 * Power of Three - JavaScript Implementation This solution determines if a given number is a power of three. @param {number} n - The number to check @return {boolean} - Returns true if n is a power of three, false otherwise
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Power is to understand the core problem pattern
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
 * Power of Three - JavaScript Implementation
 * This solution determines if a given number is a power of three.
 * 
 * @param {number} n - The number to check
 * @return {boolean} - Returns true if n is a power of three, false otherwise
 */

const isPowerOfThree = function(n) {
    // Handle edge cases
    if (n <= 0) return false;
    if (n === 1) return true;

    // Method 1: Iterative Solution
    function iterativeSolution(num) {
        while (num % 3 === 0) {
            num = num / 3;
        }
        return num === 1;
    }

    // Method 2: Mathematical Solution using logarithm
    function mathematicalSolution(num) {
        // Using Math.log() to calculate if n is a power of 3
        // log3(n) = log(n) / log(3) should be an integer
        const logResult = Math.log(num) / Math.log(3);
        return Math.abs(logResult - Math.round(logResult)) < Number.EPSILON;
    }

    // Method 3: Maximum Power Solution
    function maxPowerSolution(num) {
        // 3^19 = 1162261467 is the largest power of 3 under 2^31
        const maxPowerOfThree = 1162261467;
        return maxPowerOfThree % num === 0;
    }

    // Using the iterative solution as default
    return iterativeSolution(n);
};

// Export the function for use in other modules
module.exports = isPowerOfThree;

// Test cases
function runTests() {
    const testCases = [
        { input: 27, expected: true },
        { input: 0, expected: false },
        { input: 9, expected: true },
        { input: 45, expected: false },
        { input: 1, expected: true },
        { input: -3, expected: false },
    ];

    testCases.forEach((test, index) => {
        const result = isPowerOfThree(test.input);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: ${test.input}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('-------------------');
    });
}

// Uncomment the following line to run tests
// runTests();