/**
 * 371. Sum
 * Medium
 *
 * Sum Two Integers - JavaScript Implementation This implementation adds two integers without using the + or - operators using bitwise operations instead. @param {number} a - First integer @param {number} b - Second integer @return {number} - Sum of the two integers
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Sum is to understand the core problem pattern
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
 * Sum Two Integers - JavaScript Implementation
 * This implementation adds two integers without using the + or - operators
 * using bitwise operations instead.
 * 
 * @param {number} a - First integer
 * @param {number} b - Second integer
 * @return {number} - Sum of the two integers
 */

const getSum = function(a, b) {
    // Handle edge cases
    if (a === 0) return b;
    if (b === 0) return a;
    
    // Continue adding until there's no carry left
    while (b !== 0) {
        // Carry contains common set bits of a and b
        const carry = a & b;
        
        // Sum of bits of a and b where at least one of the bits is not set
        a = a ^ b;
        
        // Carry is shifted by one so that adding it to a gives the required sum
        b = carry << 1;
    }
    
    return a;
};

/**
 * Alternative implementation using recursive approach
 * 
 * @param {number} a - First integer
 * @param {number} b - Second integer
 * @return {number} - Sum of the two integers
 */
const getSumRecursive = function(a, b) {
    if (b === 0) return a;
    return getSumRecursive(a ^ b, (a & b) << 1);
};

// Test cases
const testCases = [
    { a: 1, b: 2, expected: 3 },
    { a: -2, b: 3, expected: 1 },
    { a: 0, b: 5, expected: 5 },
    { a: -1, b: -1, expected: -2 },
    { a: 10, b: 20, expected: 30 }
];

// Run test cases
console.log("Testing iterative implementation:");
testCases.forEach((test, index) => {
    const result = getSum(test.a, test.b);
    console.log(`Test ${index + 1}: ${test.a} + ${test.b} = ${result} (Expected: ${test.expected})`);
    console.log(`Test ${index + 1} ${result === test.expected ? 'PASSED' : 'FAILED'}`);
});

console.log("\nTesting recursive implementation:");
testCases.forEach((test, index) => {
    const result = getSumRecursive(test.a, test.b);
    console.log(`Test ${index + 1}: ${test.a} + ${test.b} = ${result} (Expected: ${test.expected})`);
    console.log(`Test ${index + 1} ${result === test.expected ? 'PASSED' : 'FAILED'}`);
});

// Export functions for external use
module.exports = {
    getSum,
    getSumRecursive
};