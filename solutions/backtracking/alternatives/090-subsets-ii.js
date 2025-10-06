/**
 * 90. Subsets Ii
 * Medium
 *
 * Subsets II - Find all possible subsets of an array including duplicates Time Complexity: O(n 2^n) where n is the length of nums Space Complexity: O(n 2^n) to store all subsets @param {number[]} nums - Input array of integers (may contain duplicates) @return {number[][]} - Array of all possible subsets
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Subsets Ii is to understand the core problem pattern
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
 * Subsets II - Find all possible subsets of an array including duplicates
 * Time Complexity: O(n * 2^n) where n is the length of nums
 * Space Complexity: O(n * 2^n) to store all subsets
 * 
 * @param {number[]} nums - Input array of integers (may contain duplicates)
 * @return {number[][]} - Array of all possible subsets
 */
function subsetsWithDup(nums) {
    // Sort the array first to handle duplicates properly
    nums.sort((a, b) => a - b);
    
    // Result array to store all subsets
    const result = [];
    
    /**
     * Backtracking helper function to generate subsets
     * @param {number} start - Starting index for current iteration
     * @param {number[]} current - Current subset being built
     */
    function backtrack(start, current) {
        // Add a copy of the current subset to result
        result.push([...current]);
        
        // Try adding each number after the start index
        for (let i = start; i < nums.length; i++) {
            // Skip duplicates to avoid duplicate subsets
            if (i > start && nums[i] === nums[i - 1]) continue;
            
            // Include current number in subset
            current.push(nums[i]);
            
            // Recursively generate subsets with remaining elements
            backtrack(i + 1, current);
            
            // Backtrack by removing the last added element
            current.pop();
        }
    }
    
    // Start the backtracking process with empty subset
    backtrack(0, []);
    
    return result;
}

/**
 * Test cases
 */
function runTests() {
    // Test Case 1: Array with duplicates
    console.log("Test 1:");
    console.log(subsetsWithDup([1, 2, 2]));
    // Expected: [[], [1], [1,2], [1,2,2], [2], [2,2]]
    
    // Test Case 2: Array with no duplicates
    console.log("\nTest 2:");
    console.log(subsetsWithDup([1, 2, 3]));
    // Expected: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
    
    // Test Case 3: Empty array
    console.log("\nTest 3:");
    console.log(subsetsWithDup([]));
    // Expected: [[]]
    
    // Test Case 4: Array with single element
    console.log("\nTest 4:");
    console.log(subsetsWithDup([1]));
    // Expected: [[], [1]]
    
    // Test Case 5: Array with multiple duplicates
    console.log("\nTest 5:");
    console.log(subsetsWithDup([1, 1, 2, 2]));
    // Expected: [[], [1], [1,1], [1,1,2], [1,1,2,2], [1,2], [1,2,2], [2], [2,2]]
}

// Execute test cases
runTests();

// Export the function for external use
module.exports = {
    subsetsWithDup
};