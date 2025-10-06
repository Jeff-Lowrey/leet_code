/**
 * 128. Longest Consecutive Sequence
 * Medium
 *
 * @file Longest Consecutive Sequence Implementation @description Finds the length of the longest consecutive sequence in an unsorted array
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Longest Consecutive Sequence is to understand the core problem pattern
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
 * @file Longest Consecutive Sequence Implementation
 * @description Finds the length of the longest consecutive sequence in an unsorted array
 */

/**
 * @param {number[]} nums - Array of numbers
 * @return {number} - Length of longest consecutive sequence
 */
function longestConsecutive(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) {
        return 0;
    }

    // Create a Set for O(1) lookup
    const numSet = new Set(nums);
    let maxLength = 0;

    // Iterate through each number in the array
    for (const num of numSet) {
        // Only start checking sequences from the smallest number in the sequence
        // If num-1 exists, this isn't the start of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;

            // Count consecutive numbers
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }

            // Update maxLength if current sequence is longer
            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;
}

// Test cases
const testCases = [
    [100, 4, 200, 1, 3, 2],           // Expected: 4 (1,2,3,4)
    [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],   // Expected: 9 (0,1,2,3,4,5,6,7,8)
    [],                                // Expected: 0
    [1],                               // Expected: 1
    [1, 2, 0, 1]                      // Expected: 3 (0,1,2)
];

// Run test cases
testCases.forEach((test, index) => {
    console.log(`Test ${index + 1}:`);
    console.log(`Input: [${test}]`);
    console.log(`Output: ${longestConsecutive(test)}`);
    console.log('---');
});

// Export the function for potential module usage
module.exports = longestConsecutive;