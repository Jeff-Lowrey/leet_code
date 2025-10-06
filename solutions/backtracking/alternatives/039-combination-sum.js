/**
 * 39. Combination Sum
 * Medium
 *
 * Combination Sum - Problem Solution Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Combination Sum is to understand the core problem pattern
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
 * Combination Sum - Problem Solution
 * 
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen numbers sum to target.
 * You may return the combinations in any order.
 * 
 * The same number may be chosen from candidates an unlimited number of times.
 */

/**
 * @param {number[]} candidates - Array of distinct integers
 * @param {number} target - Target sum to achieve
 * @return {number[][]} - Array of combinations that sum to target
 */
function combinationSum(candidates, target) {
    // Sort candidates array for optimization
    candidates.sort((a, b) => a - b);
    
    // Result array to store all valid combinations
    const result = [];
    
    /**
     * Helper function to find combinations using backtracking
     * @param {number[]} current - Current combination being built
     * @param {number} remainingTarget - Remaining sum to achieve
     * @param {number} startIndex - Starting index in candidates array
     */
    function backtrack(current, remainingTarget, startIndex) {
        // Base case: if remaining target is 0, we found a valid combination
        if (remainingTarget === 0) {
            result.push([...current]);
            return;
        }
        
        // Try each candidate from startIndex
        for (let i = startIndex; i < candidates.length; i++) {
            // If current candidate is greater than remaining target, break
            // (since array is sorted, all following numbers will be too large)
            if (candidates[i] > remainingTarget) break;
            
            // Add current candidate to combination
            current.push(candidates[i]);
            
            // Recursively find combinations with updated remaining target
            // We can reuse current index since numbers can be used multiple times
            backtrack(current, remainingTarget - candidates[i], i);
            
            // Backtrack: remove the last added number
            current.pop();
        }
    }
    
    // Start backtracking with empty combination
    backtrack([], target, 0);
    
    return result;
}

// Example test cases
const testCases = [
    {
        candidates: [2, 3, 6, 7],
        target: 7
    },
    {
        candidates: [2, 3, 5],
        target: 8
    },
    {
        candidates: [2],
        target: 1
    }
];

// Run test cases
testCases.forEach((test, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log('Candidates:', test.candidates);
    console.log('Target:', test.target);
    console.log('Result:', combinationSum(test.candidates, test.target));
    console.log('---');
});

// Export the function for potential module usage
module.exports = combinationSum;