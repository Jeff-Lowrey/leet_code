/**
 * 421. Max
 * Medium
 *
 * Max XOR Implementation This solution finds the maximum XOR value possible between two numbers in an array Time Complexity: O(n) Space Complexity: O(1)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Max is to understand the core problem pattern
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
 * Max XOR Implementation
 * This solution finds the maximum XOR value possible between two numbers in an array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * Finds the maximum XOR value between any two numbers in the given array
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum XOR value possible
 */
function findMaximumXOR(nums) {
    // Handle edge cases
    if (!nums || nums.length < 2) {
        return 0;
    }

    let maxXOR = 0;
    let mask = 0;

    // Process bit by bit from left to right (most significant to least significant)
    // Assuming 32-bit integers
    for (let bit = 31; bit >= 0; bit--) {
        // Update mask by setting current bit
        mask = mask | (1 << bit);
        
        // Store all possible prefixes up to current bit
        const prefixes = new Set();
        
        // Get all prefixes for current numbers
        for (const num of nums) {
            prefixes.add(num & mask);
        }

        // Calculate potential maximum for current bit position
        const potentialMax = maxXOR | (1 << bit);
        
        // Check if we can achieve the potential maximum
        for (const prefix of prefixes) {
            // If we find two numbers whose XOR equals potentialMax,
            // then this bit can be set in our maxXOR
            if (prefixes.has(prefix ^ potentialMax)) {
                maxXOR = potentialMax;
                break;
            }
        }
    }

    return maxXOR;
}

/**
 * Simple implementation to find max XOR (less efficient but more straightforward)
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum XOR value possible
 */
function findMaximumXORSimple(nums) {
    let maxXOR = 0;
    
    // Compare each pair of numbers
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            maxXOR = Math.max(maxXOR, nums[i] ^ nums[j]);
        }
    }
    
    return maxXOR;
}

// Test cases
const testCases = [
    [3, 10, 5, 25, 2, 8],
    [0],
    [1, 2, 3, 4],
    [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]
];

// Run tests
console.log("Testing Max XOR implementations:");
console.log("================================");

testCases.forEach((test, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log("Input:", test);
    console.log("Efficient Implementation Result:", findMaximumXOR(test));
    console.log("Simple Implementation Result:", findMaximumXORSimple(test));
    console.log("--------------------------------");
});

// Export functions for external use
module.exports = {
    findMaximumXOR,
    findMaximumXORSimple
};