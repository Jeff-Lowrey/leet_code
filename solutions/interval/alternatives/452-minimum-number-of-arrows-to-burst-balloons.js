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
 *
 * **Step 1:** [description]
 *
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
 * Main solution for Problem 452: Minimum Number Of Arrows To Burst Balloons
 *
 * @param {number[][]} points - Array of balloon intervals [start, end]
 * @return {number} - Minimum number of arrows needed
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(points) {
    if (!points || points.length === 0) {
        return 0;
    }

    // Sort balloons by end position
    points.sort((a, b) => a[1] - b[1]);

    let arrows = 1;
    let arrowPos = points[0][1]; // Shoot arrow at first balloon's end

    for (let i = 1; i < points.length; i++) {
        // If current balloon starts after arrow position, need new arrow
        if (points[i][0] > arrowPos) {
            arrows++;
            arrowPos = points[i][1]; // Shoot new arrow at this balloon's end
        }
        // Otherwise, current arrow bursts this balloon too
    }

    return arrows;
}

/**
 * Test cases for Problem 452: Minimum Number Of Arrows To Burst Balloons
 */
function testSolution() {
    console.log('Testing 452. Minimum Number Of Arrows To Burst Balloons');

    // Test case 1: Basic functionality
    const result1 = solve([[10,16],[2,8],[1,6],[7,12]]);
    const expected1 = 2;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: All overlapping
    const result2 = solve([[1,2],[3,4],[5,6],[7,8]]);
    const expected2 = 4;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All same balloon
    const result3 = solve([[1,2],[2,3],[3,4],[4,5]]);
    const expected3 = 2;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single balloon
    const result4 = solve([[1,2]]);
    const expected4 = 1;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Empty array
    const result5 = solve([]);
    const expected5 = 0;
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Touching balloons
    const result6 = solve([[1,10],[3,9],[4,11],[6,7],[6,9],[8,12]]);
    const expected6 = 2;
    console.assert(result6 === expected6,
        `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 452. Minimum Number Of Arrows To Burst Balloons!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 452. Minimum Number Of Arrows To Burst Balloons ===');
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
