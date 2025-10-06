/**
 * 376. Wiggle Subsequence
 * Medium
 *
 * Wiggle Subsequence A wiggle sequence is a sequence where the differences between successive numbers strictly alternate between positive and negative. @param {number[]} nums - Array of numbers @return {number} - Length of the longest wiggle subsequence
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Wiggle Subsequence is to understand the core problem pattern
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
 * Wiggle Subsequence
 * 
 * A wiggle sequence is a sequence where the differences between successive numbers
 * strictly alternate between positive and negative.
 * 
 * @param {number[]} nums - Array of numbers
 * @return {number} - Length of the longest wiggle subsequence
 */
function wiggleMaxLength(nums) {
    // Handle edge cases
    if (nums.length < 2) {
        return nums.length;
    }

    // Initialize variables to track the lengths of sequences
    // up[i] represents the length of wiggle subsequence ending at index i with an up movement
    // down[i] represents the length of wiggle subsequence ending at index i with a down movement
    let up = 1;
    let down = 1;

    // Iterate through the array starting from index 1
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            // Current number is greater than previous - up movement
            // We can extend a down sequence with an up movement
            up = down + 1;
        } else if (nums[i] < nums[i - 1]) {
            // Current number is less than previous - down movement
            // We can extend an up sequence with a down movement
            down = up + 1;
        }
        // If numbers are equal, we can't extend either sequence
    }

    // Return the maximum of up and down sequences
    return Math.max(up, down);
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [1,7,4,9,2,5],
            expected: 6,
            description: "Regular wiggle sequence"
        },
        {
            input: [1,17,5,10,13,15,10,5,16,8],
            expected: 7,
            description: "Longer sequence with multiple possibilities"
        },
        {
            input: [1,2,3,4,5],
            expected: 2,
            description: "Monotonically increasing sequence"
        },
        {
            input: [1],
            expected: 1,
            description: "Single element"
        },
        {
            input: [],
            expected: 0,
            description: "Empty array"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = wiggleMaxLength(testCase.input);
        console.log(`Test ${index + 1} (${testCase.description}):`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === testCase.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = {
    wiggleMaxLength
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}