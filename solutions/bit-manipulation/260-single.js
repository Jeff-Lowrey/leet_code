I'll help you create a solution for the Single Number III problem. I'll write a complete JavaScript implementation that finds two numbers that appear only once in an array where all other numbers appear exactly twice.

```javascript
/**
 * Single Number III - Find two numbers that appear only once in an array
 * where all other numbers appear exactly twice.
 *
 * @param {number[]} nums - Array of integers
 * @return {number[]} - Array containing the two numbers that appear only once
 */

const singleNumberIII = function(nums) {
    // Edge case: if array is empty or has less than 2 elements
    if (!nums || nums.length < 2) {
        return [];
    }

    // Step 1: XOR all numbers together
    // This will give us XOR of the two unique numbers (call them x and y)
    let xorResult = 0;
    for (let num of nums) {
        xorResult ^= num;
    }

    // Step 2: Find rightmost set bit in xorResult
    // This bit will be different in x and y
    let rightmostSetBit = 1;
    while ((xorResult & rightmostSetBit) === 0) {
        rightmostSetBit <<= 1;
    }

    // Step 3: Divide numbers into two groups based on the rightmost set bit
    // One group will contain x, other will contain y
    let x = 0, y = 0;
    for (let num of nums) {
        if (num & rightmostSetBit) {
            // Group 1: numbers with the bit set
            x ^= num;
        } else {
            // Group 2: numbers with the bit not set
            y ^= num;
        }
    }

    return [x, y];
};

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [1, 2, 1, 3, 2, 5],
            expected: [3, 5],
            description: "Basic test case"
        },
        {
            input: [-1, 0],
            expected: [-1, 0],
            description: "Two different numbers"
        },
        {
            input: [1, 1, 2, 2, 3, 4],
            expected: [3, 4],
            description: "Numbers at the end"
        }
    ];

    for (let test of testCases) {
        const result = singleNumberIII(test.input);
        const sortedResult = result.sort((a, b) => a - b);
        const sortedExpected = test.expected.sort((a, b) => a - b);
        
        console.log(`Test: ${test.description}`);
        console.log(`Input: [${test.input}]`);
        console.log(`Expected: [${sortedExpected}]`);
        console.log(`Got: [${sortedResult}]`);
        console.log(`Result: ${JSON.stringify(sortedResult) === JSON.stringify(sortedExpected) ? 'PASS' : 'FAIL'}`);
        console.log('---');
    }
}

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}

// Export the function for use in other files
module.exports = singleNumberIII;
```

This implementation solves the Single Number III problem with the following features:

1. **Efficient Solution**: Uses XOR operations to find the two unique numbers in O(n) time complexity and O(1) space complexity.

2. **Algorithm Explanation**:
   - First XORs all numbers together to get XOR of the two unique numbers
   - Finds the rightmost set bit in the XOR result
   - Uses this bit to separate numbers into two groups
   - XORs each group separately to find the two unique numbers

3. **Error Handling**:
   - Handles edge cases like empty arrays or arrays with insufficient elements
   - Returns empty array for invalid inputs

4. **Testing**:
   - Includes comprehensive test cases
   - Tests different scenarios including basic cases and edge cases
   - Provides clear test output

5. **Code Structure**:
   - Clean, well-commented code
   - Follows JavaScript best practices
   - Modular design with proper exports
   - Includes both implementation and testing

6. **Documentation**:
   - Clear function documentation with JSDoc comments
   - Explains parameters and return values
   - Includes algorithm explanation in comments

The solution can be used both as a standalone script (with tests) or imported as a module in other files.