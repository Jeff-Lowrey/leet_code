/**
 * 209. Minimum Size Subarray Sum
 * Medium
 *
 * Minimum Size Subarray Sum Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead. @param {number} target - The target sum to reach @param {number[]} nums - Array of positive integers @return {number} - Minimal length of subarray that sums to >= target
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Minimum Size Subarray Sum is to understand the core problem pattern
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
 * Minimum Size Subarray Sum
 * 
 * Given an array of positive integers nums and a positive integer target,
 * return the minimal length of a contiguous subarray whose sum is greater than or equal to target.
 * If there is no such subarray, return 0 instead.
 * 
 * @param {number} target - The target sum to reach
 * @param {number[]} nums - Array of positive integers
 * @return {number} - Minimal length of subarray that sums to >= target
 */
function minSubArrayLen(target, nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) {
        return 0;
    }
    
    let minLength = Infinity;  // Track minimum length found
    let currentSum = 0;        // Track current window sum
    let left = 0;             // Left pointer of window
    
    // Iterate through array using right pointer
    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        
        // While window sum is >= target, try to minimize window
        while (currentSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            currentSum -= nums[left];
            left++;
        }
    }
    
    // Return 0 if no valid subarray found, otherwise return minLength
    return minLength === Infinity ? 0 : minLength;
}

// Test cases
function runTests() {
    const testCases = [
        {
            target: 7,
            nums: [2,3,1,2,4,3],
            expected: 2
        },
        {
            target: 4,
            nums: [1,4,4],
            expected: 1
        },
        {
            target: 11,
            nums: [1,1,1,1,1,1,1,1],
            expected: 0
        },
        {
            target: 15,
            nums: [5,1,3,5,10,7,4,9,2,8],
            expected: 2
        }
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const { target, nums, expected } = testCases[i];
        const result = minSubArrayLen(target, nums);
        console.log(`Test case ${i + 1}:`);
        console.log(`Input: target = ${target}, nums = [${nums}]`);
        console.log(`Expected: ${expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    }
}

// Run the test cases
runTests();

// Export the function for potential use in other modules
module.exports = minSubArrayLen;