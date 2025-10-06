/**
 * 260. Single
 * Medium
 *
 * Single Number III - Find two numbers that appear only once in an array where all other numbers appear exactly twice. @param {number[]} nums - Array of integers @return {number[]} - Array containing the two numbers that appear only once
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Single is to understand the core problem pattern
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