/**
 * 46. Permutations
 * Medium
 *
 * @file BT-046-JS_permutations___javascript_implementation.js @description Implementation of permutations algorithm in JavaScript
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Permutations is to understand the core problem pattern
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
 * @file BT-046-JS_permutations___javascript_implementation.js
 * @description Implementation of permutations algorithm in JavaScript
 */

/**
 * Generates all possible permutations of an array of numbers
 * @param {number[]} nums - Array of numbers to generate permutations for
 * @return {number[][]} - Array containing all possible permutations
 */
function permute(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) return [];
    if (nums.length === 1) return [nums];
    
    const result = [];
    
    /**
     * Helper function to generate permutations using backtracking
     * @param {number[]} current - Current permutation being built
     * @param {Set} remaining - Set of remaining numbers to use
     */
    function backtrack(current, remaining) {
        // If current permutation is complete, add it to results
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        // Try each remaining number as the next element
        for (const num of remaining) {
            // Add current number to permutation
            current.push(num);
            
            // Create new set of remaining numbers excluding current number
            const newRemaining = new Set(remaining);
            newRemaining.delete(num);
            
            // Recursively generate permutations with remaining numbers
            backtrack(current, newRemaining);
            
            // Backtrack by removing the last added number
            current.pop();
        }
    }
    
    // Start backtracking with empty current array and all numbers in remaining set
    backtrack([], new Set(nums));
    
    return result;
}

/**
 * Example usage and test cases
 */
function runTests() {
    // Test case 1: Basic example
    console.log('Test 1:', permute([1, 2, 3]));
    // Expected: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
    
    // Test case 2: Single element
    console.log('Test 2:', permute([1]));
    // Expected: [[1]]
    
    // Test case 3: Two elements
    console.log('Test 3:', permute([1, 2]));
    // Expected: [[1,2], [2,1]]
    
    // Test case 4: Empty array
    console.log('Test 4:', permute([]));
    // Expected: []
}

// Export the function for use in other modules
module.exports = {
    permute
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}