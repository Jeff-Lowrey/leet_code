I'll help you create a solution for the Single Number II problem in JavaScript. This implementation will find the number that appears only once in an array where all other numbers appear exactly three times.

```javascript
/**
 * Single Number II - Find the element that appears once in an array where all other elements appear three times
 * 
 * @param {number[]} nums - Array of integers where all elements appear three times except for one
 * @return {number} - The element that appears only once
 */
function singleNumber(nums) {
    // Edge case: empty array or invalid input
    if (!nums || nums.length === 0) {
        return 0;
    }

    // Initialize an array to count bits at each position (32 bits for integers)
    let bits = new Array(32).fill(0);

    // Count the bits at each position for all numbers
    for (let num of nums) {
        for (let i = 0; i < 32; i++) {
            // Add the i-th bit of current number to bits array
            bits[i] += (num >> i) & 1;
        }
    }

    // Initialize result
    let result = 0;

    // Construct the single number from the bits
    for (let i = 0; i < 32; i++) {
        // If the sum of bits at position i is not divisible by 3,
        // it means the single number has a 1 at this position
        if (bits[i] % 3 !== 0) {
            result |= (1 << i);
        }
    }

    // Handle negative numbers (two's complement)
    if (bits[31] % 3 !== 0) {
        // If the 32nd bit is set, the number is negative
        result = result - Math.pow(2, 32);
    }

    return result;
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [2, 2, 3, 2],
            expected: 3,
            description: "Basic test case with positive numbers"
        },
        {
            input: [0, 1, 0, 1, 0, 1, 99],
            expected: 99,
            description: "Test case with zeros and ones"
        },
        {
            input: [-2, -2, 1, -2],
            expected: 1,
            description: "Test case with negative numbers"
        },
        {
            input: [1],
            expected: 1,
            description: "Single element array"
        }
    ];

    for (let test of testCases) {
        const result = singleNumber(test.input);
        console.log(`Test: ${test.description}`);
        console.log(`Input: [${test.input}]`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Result: ${result === test.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    }
}

// Export the function for use in other modules
module.exports = singleNumber;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}
```

This implementation provides a solution to the Single Number II problem with the following features:

1. **Main Algorithm**: Uses a bit manipulation approach to find the single number
2. **Time Complexity**: O(n * 32) = O(n), where n is the length of the input array
3. **Space Complexity**: O(1) as we use a fixed-size array of 32 bits
4. **Handling Edge Cases**: 
   - Empty array or invalid input
   - Negative numbers
   - Single element arrays
5. **Test Cases**: Includes comprehensive test cases covering various scenarios
6. **Documentation**: Clear comments explaining the implementation
7. **Module Export**: Exports the function for use in other modules
8. **Test Runner**: Includes a test runner that executes when the file is run directly

The algorithm works by:
1. Counting the bits at each position for all numbers
2. Using the fact that all numbers appear exactly three times except one
3. Finding the bits that don't appear in multiples of 3 to construct the single number
4. Handling negative numbers using two's complement representation

The implementation follows JavaScript best practices and includes proper error handling and testing capabilities.