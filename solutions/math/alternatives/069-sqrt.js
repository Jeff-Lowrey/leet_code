/**
 * 69. Sqrt
 * Medium
 *
 * @file MT-069-JS_sqrt_x___javascript_implementation.js @description Implementation of square root calculation without using built-in Math.sqrt()
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Sqrt is to understand the core problem pattern
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
 * @file MT-069-JS_sqrt_x___javascript_implementation.js
 * @description Implementation of square root calculation without using built-in Math.sqrt()
 */

/**
 * Calculates the square root of a non-negative integer x
 * Returns the floor value of the square root
 * Uses Binary Search approach for efficient calculation
 * 
 * @param {number} x - Non-negative integer input
 * @return {number} - Floor value of square root of x
 */
function mySqrt(x) {
    // Handle edge cases
    if (x === 0) return 0;
    if (x === 1) return 1;

    // Use binary search to find the square root
    let left = 1;
    let right = Math.floor(x / 2) + 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;
        
        // Found exact square root
        if (square === x) {
            return mid;
        }
        
        // If square is greater, search in left half
        if (square > x) {
            right = mid - 1;
        }
        // If square is smaller, search in right half
        else {
            left = mid + 1;
        }
    }
    
    // Return the floor value of the square root
    return right;
}

/**
 * Test cases to verify the implementation
 */
function runTests() {
    const testCases = [
        { input: 4, expected: 2 },
        { input: 8, expected: 2 },
        { input: 0, expected: 0 },
        { input: 1, expected: 1 },
        { input: 16, expected: 4 },
        { input: 100, expected: 10 },
        { input: 2147483647, expected: 46340 }
    ];

    console.log("Running test cases...");
    testCases.forEach((test, index) => {
        const result = mySqrt(test.input);
        const passed = result === test.expected;
        console.log(
            `Test ${index + 1}: sqrt(${test.input}) = ${result}`,
            passed ? '✓' : `✗ (expected ${test.expected})`
        );
    });
}

// Export the function for use in other modules
module.exports = mySqrt;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}