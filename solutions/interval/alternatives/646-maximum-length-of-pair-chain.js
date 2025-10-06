/**
 * 646. Maximum Length Of Pair Chain
 * Medium
 *
 * Maximum Length Chain Implementation Time Complexity: O(n log n) due to sorting Space Complexity: O(1) as we sort in place
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Maximum Length Of Pair Chain is to understand the core problem pattern
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
 * Maximum Length Chain Implementation
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(1) as we sort in place
 */

/**
 * @param {number[][]} pairs - Array of pairs where each pair is [a, b]
 * @return {number} - Length of the longest possible chain
 */
function findLongestChain(pairs) {
    // Handle edge cases
    if (!pairs || pairs.length === 0) {
        return 0;
    }
    if (pairs.length === 1) {
        return 1;
    }

    // Sort pairs based on the second element
    // This is crucial for greedy approach to work
    pairs.sort((a, b) => a[1] - b[1]);

    let chainLength = 1;  // Start with first pair
    let currentEnd = pairs[0][1];  // Track the current chain's end

    // Iterate through sorted pairs to build chain
    for (let i = 1; i < pairs.length; i++) {
        // If current pair's first element is greater than previous pair's second element
        // we can add it to our chain
        if (pairs[i][0] > currentEnd) {
            chainLength++;
            currentEnd = pairs[i][1];
        }
    }

    return chainLength;
}

/**
 * Test cases to verify the implementation
 */
function runTests() {
    // Test Case 1: Basic case
    console.log('Test 1:', findLongestChain([[1,2], [2,3], [3,4]]));  // Expected: 2

    // Test Case 2: Overlapping pairs
    console.log('Test 2:', findLongestChain([[1,2], [7,8], [4,5]]));  // Expected: 3

    // Test Case 3: Single pair
    console.log('Test 3:', findLongestChain([[1,2]]));  // Expected: 1

    // Test Case 4: Empty array
    console.log('Test 4:', findLongestChain([]));  // Expected: 0

    // Test Case 5: Complex case
    console.log('Test 5:', findLongestChain([[3,4], [1,2], [2,3], [5,6]]));  // Expected: 3

    // Test Case 6: Overlapping complex case
    console.log('Test 6:', findLongestChain([[1,5], [2,3], [3,4], [4,6]]));  // Expected: 3
}

// Export the function for potential use in other modules
module.exports = {
    findLongestChain
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}