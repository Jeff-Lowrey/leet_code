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
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 986: Interval List Intersections
 *
 * @param {number[][]} firstList - First sorted list of intervals
 * @param {number[][]} secondList - Second sorted list of intervals
 * @return {number[][]} - List of interval intersections
 *
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function solve(firstList, secondList) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < firstList.length && j < secondList.length) {
        const [start1, end1] = firstList[i];
        const [start2, end2] = secondList[j];

        // Find intersection
        const intersectionStart = Math.max(start1, start2);
        const intersectionEnd = Math.min(end1, end2);

        // Check if there's a valid intersection
        if (intersectionStart <= intersectionEnd) {
            result.push([intersectionStart, intersectionEnd]);
        }

        // Move pointer of interval that ends first
        if (end1 < end2) {
            i++;
        } else {
            j++;
        }
    }

    return result;
}

/**
 * Test cases for Problem 986: Interval List Intersections
 */
function testSolution() {
    console.log('Testing 986. Interval List Intersections');

    // Helper function to compare arrays
    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Basic functionality
    const result1 = solve(
        [[0,2],[5,10],[13,23],[24,25]],
        [[1,5],[8,12],[15,24],[25,26]]
    );
    const expected1 = [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: No intersections
    const result2 = solve([[1,3],[5,9]], [[4,4],[10,12]]);
    const expected2 = [];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Complete overlap
    const result3 = solve([[1,7]], [[3,10]]);
    const expected3 = [[3,7]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Empty lists
    const result4 = solve([], [[1,5]]);
    const expected4 = [];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Touching intervals
    const result5 = solve([[1,3],[5,7]], [[2,4],[6,8]]);
    const expected5 = [[2,3],[6,7]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: One interval contains the other
    const result6 = solve([[1,10]], [[2,3],[4,5],[6,7]]);
    const expected6 = [[2,3],[4,5],[6,7]];
    console.assert(arraysEqual(result6, expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 986. Interval List Intersections!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 986. Interval List Intersections ===');
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
