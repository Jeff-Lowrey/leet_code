/**
 * 330. Patching Array
 * Medium
 *
 * Patching Array - Finds minimum number of patches needed to cover range [1, n] @param {number[]} nums - Array of positive integers @param {number} n - Target number to cover up to @return {number} - Minimum number of patches needed
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Patching Array is to understand the core problem pattern
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
 * Patching Array - Finds minimum number of patches needed to cover range [1, n]
 * 
 * @param {number[]} nums - Array of positive integers
 * @param {number} n - Target number to cover up to
 * @return {number} - Minimum number of patches needed
 */
function minPatches(nums, n) {
    let patches = 0;      // Count of patches needed
    let i = 0;           // Current index in nums array
    let miss = 1;        // Smallest sum we can't create yet
    
    // Continue until we can create all sums up to n
    while (miss <= n) {
        // If we have a number in array that we can use
        if (i < nums.length && nums[i] <= miss) {
            miss += nums[i];  // Add to our reachable sum
            i++;
        }
        // We need to patch the array
        else {
            miss += miss;     // Add missing number to our reachable sum
            patches++;        // Increment patch count
        }
    }
    
    return patches;
}

/**
 * Test cases to verify the implementation
 */
function runTests() {
    const testCases = [
        {
            nums: [1, 3],
            n: 6,
            expected: 1
        },
        {
            nums: [1, 5, 10],
            n: 20,
            expected: 2
        },
        {
            nums: [],
            n: 7,
            expected: 3
        }
    ];

    testCases.forEach((test, index) => {
        const result = minPatches(test.nums, test.n);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: nums = [${test.nums}], n = ${test.n}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Export the function for potential module usage
module.exports = {
    minPatches,
    runTests
};

// Run tests if file is executed directly
if (require.main === module) {
    runTests();
}