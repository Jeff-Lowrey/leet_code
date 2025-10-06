/**
 * 40. Combination Sum Ii
 * Medium
 *
 * Combination Sum II - Find all unique combinations of candidates where chosen numbers sum to target @param {number[]} candidates - Array of candidate numbers @param {number} target - Target sum @return {number[][]} - Array of all unique combinations that sum to target
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Combination Sum Ii is to understand the core problem pattern
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
 * Combination Sum II - Find all unique combinations of candidates where chosen numbers sum to target
 * 
 * @param {number[]} candidates - Array of candidate numbers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of all unique combinations that sum to target
 */
function combinationSum2(candidates, target) {
    // Sort the candidates array to handle duplicates and enable early termination
    candidates.sort((a, b) => a - b);
    
    // Result array to store all valid combinations
    const result = [];
    
    /**
     * Recursive backtracking function to find combinations
     * @param {number} remain - Remaining sum to reach target
     * @param {number[]} current - Current combination being built
     * @param {number} start - Starting index for considering candidates
     */
    function backtrack(remain, current, start) {
        // Base case: if remaining sum is 0, we found a valid combination
        if (remain === 0) {
            result.push([...current]);
            return;
        }
        
        // Iterate through candidates starting from 'start' index
        for (let i = start; i < candidates.length; i++) {
            // Skip duplicates to avoid duplicate combinations
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            
            // If current candidate is greater than remaining sum, break
            // (since array is sorted, all following numbers will be too large)
            if (candidates[i] > remain) break;
            
            // Include current candidate in combination
            current.push(candidates[i]);
            
            // Recursively find combinations with remaining sum
            // Note: i + 1 ensures we don't reuse the same element
            backtrack(remain - candidates[i], current, i + 1);
            
            // Backtrack: remove current candidate to try next possibility
            current.pop();
        }
    }
    
    // Start backtracking with initial values
    backtrack(target, [], 0);
    
    return result;
}

/**
 * Example usage and test cases
 */
function runTests() {
    // Test Case 1
    console.log("Test 1:");
    console.log(combinationSum2([10,1,2,7,6,1,5], 8));
    // Expected: [[1,1,6], [1,2,5], [1,7], [2,6]]
    
    // Test Case 2
    console.log("\nTest 2:");
    console.log(combinationSum2([2,5,2,1,2], 5));
    // Expected: [[1,2,2], [5]]
    
    // Test Case 3: Empty array
    console.log("\nTest 3:");
    console.log(combinationSum2([], 1));
    // Expected: []
    
    // Test Case 4: No possible combinations
    console.log("\nTest 4:");
    console.log(combinationSum2([1], 2));
    // Expected: []
}

// Export the function for potential module usage
module.exports = {
    combinationSum2
};

// Run tests if file is executed directly
if (require.main === module) {
    runTests();
}