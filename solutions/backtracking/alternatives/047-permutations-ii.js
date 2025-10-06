/**
 * 47. Permutations Ii
 * Medium
 *
 * Permutations II - Find all unique permutations in an array that may contain duplicates @param {number[]} nums - Input array of numbers (may contain duplicates) @return {number[][]} - Array of all unique permutations
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Permutations Ii is to understand the core problem pattern
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
 * Permutations II - Find all unique permutations in an array that may contain duplicates
 * 
 * @param {number[]} nums - Input array of numbers (may contain duplicates)
 * @return {number[][]} - Array of all unique permutations
 */
function permuteUnique(nums) {
    // Edge case: empty array
    if (!nums || nums.length === 0) {
        return [];
    }

    // Sort the array first to handle duplicates efficiently
    nums.sort((a, b) => a - b);
    const result = [];
    const used = new Array(nums.length).fill(false);
    
    /**
     * Backtracking helper function to generate permutations
     * @param {number[]} current - Current permutation being built
     */
    function backtrack(current) {
        // Base case: if current permutation length equals input array length
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            // Skip if number is already used in current permutation
            if (used[i]) continue;

            // Skip duplicates to avoid duplicate permutations
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

            // Include current number in permutation
            used[i] = true;
            current.push(nums[i]);

            // Recursive call to generate next number in permutation
            backtrack(current);

            // Backtrack: remove current number and mark as unused
            current.pop();
            used[i] = false;
        }
    }

    // Start backtracking with empty permutation
    backtrack([]);
    return result;
}

// Example usage and test cases
function runTests() {
    const testCases = [
        [1, 1, 2],
        [1, 2, 3],
        [1],
        [1, 1, 1],
        []
    ];

    console.log("Running test cases for permuteUnique:");
    testCases.forEach((test, index) => {
        console.log(`\nTest case ${index + 1}:`);
        console.log("Input:", test);
        console.log("Output:", permuteUnique(test));
    });
}

// Export the function for potential module usage
module.exports = {
    permuteUnique
};

// Run tests if not being imported as a module
if (require.main === module) {
    runTests();
}