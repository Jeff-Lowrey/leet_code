/**
 * 45. Jump Game Ii
 * Medium
 *
 * Jump Game II - Solution Problem: Given an array of non-negative integers nums, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Your goal is to reach the last index in the minimum number of jumps. @param {number[]} nums - Array of non-negative integers representing maximum jump lengths @return {number} - Minimum number of jumps needed to reach the last index
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Jump Game Ii is to understand the core problem pattern
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
 * Jump Game II - Solution
 * 
 * Problem: Given an array of non-negative integers nums, you are initially positioned 
 * at the first index of the array. Each element in the array represents your maximum 
 * jump length at that position. Your goal is to reach the last index in the minimum 
 * number of jumps.
 * 
 * @param {number[]} nums - Array of non-negative integers representing maximum jump lengths
 * @return {number} - Minimum number of jumps needed to reach the last index
 */

const jump = function(nums) {
    // Handle edge cases
    if (!nums || nums.length <= 1) return 0;
    
    let jumps = 0;          // Count of jumps taken
    let maxReach = 0;       // Maximum index that can be reached
    let currentEnd = 0;     // End of current jump range
    
    // Iterate through the array (except last element as we don't need to jump from there)
    for (let i = 0; i < nums.length - 1; i++) {
        // Update the farthest index we can reach
        maxReach = Math.max(maxReach, i + nums[i]);
        
        // If we've reached the end of current jump range
        if (i === currentEnd) {
            jumps++;                // Take a jump
            currentEnd = maxReach;  // Update the end of new jump range
            
            // If we can already reach the last index, no need to continue
            if (currentEnd >= nums.length - 1) {
                break;
            }
        }
    }
    
    return jumps;
};

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [2,3,1,1,4],
            expected: 2,
            description: "Basic test case"
        },
        {
            input: [2,3,0,1,4],
            expected: 2,
            description: "Test case with zero"
        },
        {
            input: [1],
            expected: 0,
            description: "Single element array"
        },
        {
            input: [1,2,3],
            expected: 2,
            description: "Small array"
        }
    ];

    testCases.forEach((test, index) => {
        const result = jump(test.input);
        console.log(`Test ${index + 1} (${test.description}):`);
        console.log(`Input: [${test.input}]`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('------------------------');
    });
}

// Export the function for use in other modules
module.exports = jump;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}