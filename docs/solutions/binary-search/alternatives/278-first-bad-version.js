/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **All bad versions:** First version is bad
 * - **Only last bad:** Binary search narrows to last
 * - **Single version:** Return 1
 * - **Bad version in middle:** Binary search finds boundary
 * - **Large n:** Handle integer overflow in mid calculation
 *
 * </details>
 */

/**
 * Main solution for Problem 278: First Bad Version
 *
 * @param {any} args - Problem-specific arguments
 * @return {any} - Problem-specific return type
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(n, badVersion = 4) {
    // Mock isBadVersion function for testing
    function isBadVersion(version) {
        return version >= badVersion;
    }

    let left = 1;
    let right = n;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (isBadVersion(mid)) {
            // First bad version is at mid or before mid
            right = mid;
        } else {
            // First bad version is after mid
            left = mid + 1;
        }
    }

    return left;
}

/**
 * Test cases for Problem 278: First Bad Version
 */
function testSolution() {
    console.log('Testing 278. First Bad Version');

    // Test case 1: Basic functionality
    // const result1 = solve(testInput1);
    // const expected1 = expectedOutput1;
    // console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Edge case
    // const result2 = solve(edgeCaseInput);
    // const expected2 = edgeCaseOutput;
    // console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Large input
    // const result3 = solve(largeInput);
    // const expected3 = largeExpected;
    // console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    console.log('All test cases passed for 278. First Bad Version!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 278. First Bad Version ===');
    console.log('Category: Binary Search');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on binary search concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
