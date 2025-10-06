/**
 * 55. Jump Game
 * Medium
 *
 * Jump Game - JavaScript Implementation Problem: Given an array of non-negative integers nums, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Determine if you can reach the last index. @param {number[]} nums - Array of non-negative integers representing maximum jump lengths @return {boolean} - Returns true if last index can be reached, false otherwise
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Jump Game is to understand the core problem pattern
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
 * Jump Game - JavaScript Implementation
 * 
 * Problem: Given an array of non-negative integers nums, you are initially positioned 
 * at the first index of the array. Each element in the array represents your maximum 
 * jump length at that position. Determine if you can reach the last index.
 * 
 * @param {number[]} nums - Array of non-negative integers representing maximum jump lengths
 * @return {boolean} - Returns true if last index can be reached, false otherwise
 */

/**
 * Main function to determine if the last index can be reached
 * Time Complexity: O(n) where n is the length of input array
 * Space Complexity: O(1) as we only use a single variable
 */
function canJump(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) return false;
    if (nums.length === 1) return true;

    // Initialize the maximum reachable position
    let maxReach = 0;

    // Iterate through the array
    for (let i = 0; i <= maxReach; i++) {
        // If we can't reach current position, return false
        if (i > maxReach) return false;

        // Update maximum reachable position
        maxReach = Math.max(maxReach, i + nums[i]);

        // If we can reach the last index, return true
        if (maxReach >= nums.length - 1) return true;
    }

    // If we exit the loop without reaching the end, return false
    return false;
}

/**
 * Alternative implementation using greedy approach from right to left
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function canJumpGreedy(nums) {
    // Start from the second to last position
    let lastGoodPosition = nums.length - 1;

    // Iterate from right to left
    for (let i = nums.length - 2; i >= 0; i--) {
        // If we can reach the last good position from current position
        if (i + nums[i] >= lastGoodPosition) {
            lastGoodPosition = i;
        }
    }

    // If we can reach the start, return true
    return lastGoodPosition === 0;
}

// Test cases
function runTests() {
    const testCases = [
        [2, 3, 1, 1, 4],          // true
        [3, 2, 1, 0, 4],          // false
        [0],                      // true
        [1, 1, 1, 1],            // true
        [0, 2, 3],               // false
    ];

    console.log("Running test cases...");
    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`);
        console.log(`Input: [${test}]`);
        console.log(`Output (iterative): ${canJump(test)}`);
        console.log(`Output (greedy): ${canJumpGreedy(test)}`);
        console.log("---");
    });
}

// Export functions for external use
module.exports = {
    canJump,
    canJumpGreedy
};

// Run tests if file is executed directly
if (require.main === module) {
    runTests();
}