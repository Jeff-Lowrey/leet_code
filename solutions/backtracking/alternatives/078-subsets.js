/**
 * 78. Subsets
 * Medium
 *
 * @file BT-078-JS_subsets___javascript_implementation.js @description Implementation of generating all possible subsets of a given array
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Subsets is to understand the core problem pattern
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
 * @file BT-078-JS_subsets___javascript_implementation.js
 * @description Implementation of generating all possible subsets of a given array
 */

/**
 * Generates all possible subsets of the given array using iterative approach
 * @param {number[]} nums - Input array of integers
 * @return {number[][]} - Array containing all possible subsets
 */
function subsets(nums) {
    // Initialize result array with empty subset
    const result = [[]];
    
    // Handle edge case of empty input
    if (!nums || nums.length === 0) {
        return result;
    }

    // Iterate through each number in the input array
    for (let num of nums) {
        // Get current length of result array
        const currentLength = result.length;
        
        // For each existing subset, create a new subset by adding current number
        for (let i = 0; i < currentLength; i++) {
            // Create new subset by copying existing subset and adding current number
            const newSubset = [...result[i], num];
            result.push(newSubset);
        }
    }

    return result;
}

/**
 * Alternative implementation using backtracking (recursive approach)
 * @param {number[]} nums - Input array of integers
 * @return {number[][]} - Array containing all possible subsets
 */
function subsetsBacktracking(nums) {
    const result = [];
    
    /**
     * Helper function to perform backtracking
     * @param {number[]} current - Current subset being built
     * @param {number} start - Starting index for consideration
     */
    function backtrack(current, start) {
        // Add copy of current subset to result
        result.push([...current]);
        
        // Try adding each remaining number to current subset
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(current, i + 1);
            current.pop();
        }
    }
    
    backtrack([], 0);
    return result;
}

// Example usage and test cases
function runTests() {
    const testCases = [
        [],
        [1],
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4]
    ];

    console.log("Testing iterative approach:");
    for (const test of testCases) {
        console.log(`Input: [${test}]`);
        console.log(`Output:`, subsets(test));
        console.log("---");
    }

    console.log("\nTesting backtracking approach:");
    for (const test of testCases) {
        console.log(`Input: [${test}]`);
        console.log(`Output:`, subsetsBacktracking(test));
        console.log("---");
    }
}

// Export functions for external use
module.exports = {
    subsets,
    subsetsBacktracking
};

// Run tests if file is executed directly
if (require.main === module) {
    runTests();
}