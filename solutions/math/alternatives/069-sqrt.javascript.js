I'll help you create a solution for the Square Root (Sqrt X) implementation in JavaScript. I'll create a complete, well-documented solution that follows best practices.

```javascript
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
```

This implementation includes:

1. A main `mySqrt` function that calculates the square root using binary search
2. Comprehensive error handling for edge cases
3. Efficient binary search algorithm implementation
4. Test cases to verify the functionality
5. Proper documentation and comments
6. Module exports for use in other files
7. Automatic test execution when run directly

The solution uses binary search to efficiently find the square root, with a time complexity of O(log n). It handles all edge cases and returns the floor value of the square root as required.

Key features:
- Handles inputs from 0 to 2^31 - 1
- Returns floor value of square root
- Efficient binary search implementation
- Comprehensive test cases
- Clean code structure with proper documentation

To use this code:
1. Save it to the specified path
2. Run it directly to execute tests: `node MT-069-JS_sqrt_x___javascript_implementation.js`
3. Import it into other files using require: `const mySqrt = require('./MT-069-JS_sqrt_x___javascript_implementation.js')`