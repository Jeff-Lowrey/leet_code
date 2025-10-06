/**
 * 231. Power
 * Medium
 *
 * Power of Two - JavaScript Implementation This module provides a function to determine if a given number is a power of 2. A number is a power of two if: 1. It's positive 2. It can be expressed as 2^n where n is a non-negative integer Examples: 1(2^0), 2(2^1), 4(2^2), 8(2^3), 16(2^4), etc.
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
 * Power of Two - JavaScript Implementation
 * This module provides a function to determine if a given number is a power of 2.
 * 
 * A number is a power of two if:
 * 1. It's positive
 * 2. It can be expressed as 2^n where n is a non-negative integer
 * Examples: 1(2^0), 2(2^1), 4(2^2), 8(2^3), 16(2^4), etc.
 */

/**
 * Determines if a given number is a power of two
 * @param {number} n - The number to check
 * @returns {boolean} - True if the number is a power of two, false otherwise
 */
function isPowerOfTwo(n) {
    // Handle edge cases
    if (typeof n !== 'number') {
        throw new TypeError('Input must be a number');
    }
    
    // Numbers <= 0 cannot be powers of two
    if (n <= 0) {
        return false;
    }

    // Method 1: Bitwise operation
    // A power of 2 in binary has exactly one '1' bit
    // Example: 8 (1000 in binary)
    // n & (n-1) will always be 0 for powers of 2
    return (n & (n - 1)) === 0;

    // Alternative Method 2: Using Math.log2
    // return Number.isInteger(Math.log2(n));
}

/**
 * Helper function to test the implementation
 * @param {number} n - Number to test
 * @returns {void}
 */
function testPowerOfTwo(n) {
    try {
        const result = isPowerOfTwo(n);
        console.log(`Is ${n} a power of two? ${result}`);
    } catch (error) {
        console.error(`Error testing ${n}: ${error.message}`);
    }
}

// Example usage and tests
function runTests() {
    console.log('Running power of two tests...');
    
    // Test cases
    const testCases = [
        1,      // true (2^0)
        2,      // true (2^1)
        4,      // true (2^2)
        8,      // true (2^3)
        16,     // true (2^4)
        3,      // false
        6,      // false
        0,      // false
        -4,     // false
        1024,   // true (2^10)
    ];

    testCases.forEach(testPowerOfTwo);
}

// Run tests if this file is being executed directly
if (require.main === module) {
    runTests();
}

// Export the function for use in other modules
module.exports = {
    isPowerOfTwo
};