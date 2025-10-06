/**
 * 136. Single
 * Medium
 *
 * Single Number - JavaScript Implementation Problem: Given a non-empty array of integers where every element appears twice except for one element which appears only once, find that single element. Time Complexity: O(n) Space Complexity: O(1)
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
 * Single Number - JavaScript Implementation
 * 
 * Problem: Given a non-empty array of integers where every element appears twice
 * except for one element which appears only once, find that single element.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * Finds the single number in an array where all other numbers appear twice
 * @param {number[]} nums - Array of integers
 * @return {number} - The single number that appears only once
 */
function singleNumber(nums) {
    // Using XOR operation:
    // - XOR of a number with itself is 0
    // - XOR of a number with 0 is the number itself
    // - XOR is associative and commutative
    
    if (!nums || nums.length === 0) {
        return 0; // Handle empty array case
    }
    
    let result = 0;
    
    // XOR all numbers in the array
    for (let num of nums) {
        result ^= num;
    }
    
    return result;
}

// Test cases
function runTests() {
    const testCases = [
        {
            input: [2, 2, 1],
            expected: 1,
            description: "Basic case with three numbers"
        },
        {
            input: [4, 1, 2, 1, 2],
            expected: 4,
            description: "Case with five numbers"
        },
        {
            input: [1],
            expected: 1,
            description: "Single element array"
        },
        {
            input: [-1, -1, 2],
            expected: 2,
            description: "Array with negative numbers"
        }
    ];

    let allTestsPassed = true;
    
    testCases.forEach((testCase, index) => {
        const result = singleNumber(testCase.input);
        const passed = result === testCase.expected;
        
        console.log(`Test ${index + 1} (${testCase.description}):`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Status: ${passed ? 'PASSED' : 'FAILED'}`);
        console.log('------------------------');
        
        if (!passed) allTestsPassed = false;
    });

    console.log(`Overall Test Status: ${allTestsPassed ? 'ALL PASSED' : 'SOME FAILED'}`);
}

// Export the function for use in other modules
module.exports = {
    singleNumber
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}