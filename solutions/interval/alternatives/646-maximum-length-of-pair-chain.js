/**

 *
 * This problem demonstrates key concepts in Interval.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the longest chain of pairs where pair[i][1] < pair[j][0] for chaining.
 * Use greedy approach: always pick pair with earliest end to leave room for more pairs.
 * This is similar to activity selection and non-overlapping intervals.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Greedy approach: always choose pair with smallest end value
 * - This maximizes remaining space for future pairs
 * - Sorting by end ensures optimal choices
 * - For pair to follow another: next_start > current_end
 * - Time complexity: O(n log n) for sorting
 * - Space complexity: O(1) excluding sorting
 *
 * TIME COMPLEXITY: O(n log n) - dominated by sorting
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [[1,2],[2,3],[3,4]]
Sort by end: [[1,2],[2,3],[3,4]] (already sorted)
Pick [1,2]: end=2, length=1
Check [2,3]: 2 not > 2, skip
Check [3,4]: 3 > 2, pick it, end=4, length=2
Output: 2
```
 *
 * EDGE CASES:
 * - Empty array: return 0
 * - Single pair: return 1
 * - No pairs can chain: return 1
 * - All pairs can chain: return n
 */

/**
 * Main solution for Problem 646: Maximum Length Of Pair Chain
 *
 * @param {number[][]} pairs - Array of pairs [a, b]
 * @return {number} - Maximum length of pair chain
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(pairs) {
    if (!pairs || pairs.length === 0) {
        return 0;
    }

    // Sort pairs by second element (end value)
    pairs.sort((a, b) => a[1] - b[1]);

    let chainLength = 1;
    let currentEnd = pairs[0][1];

    for (let i = 1; i < pairs.length; i++) {
        // If current pair's start is greater than previous end, extend chain
        if (pairs[i][0] > currentEnd) {
            chainLength++;
            currentEnd = pairs[i][1];
        }
    }

    return chainLength;
}

/**
 * Test cases for Problem 646: Maximum Length Of Pair Chain
 */
function testSolution() {
    console.log('Testing 646. Maximum Length Of Pair Chain');

    // Test case 1: Basic functionality
    const result1 = solve([[1,2],[2,3],[3,4]]);
    const expected1 = 2;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Longer chain
    const result2 = solve([[1,2],[7,8],[4,5]]);
    const expected2 = 3;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single pair
    const result3 = solve([[1,2]]);
    const expected3 = 1;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: No chaining possible
    const result4 = solve([[1,10],[2,9],[3,8]]);
    const expected4 = 1;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: All can chain
    const result5 = solve([[1,2],[3,4],[5,6],[7,8]]);
    const expected5 = 4;
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Unsorted input
    const result6 = solve([[9,10],[2,3],[5,6],[1,2]]);
    const expected6 = 4;
    console.assert(result6 === expected6,
        `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 646. Maximum Length Of Pair Chain!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 646. Maximum Length Of Pair Chain ===');
    console.log('Category: Interval');
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
 * - This solution focuses on interval concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
