/**
 * 452. Minimum Number Of Arrows To Burst Balloons
 * Medium
 *
 * Minimum Arrows to Burst Balloons Problem: Given an array of balloon intervals where intervals[i] = [start, end], find the minimum number of arrows needed to burst all balloons. An arrow can be shot up exactly once at any point and will burst all balloons that contain that point. @param {number[][]} points - Array of balloon intervals [start, end] @return {number} - Minimum number of arrows needed
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Minimum Number Of Arrows To Burst Balloons is to understand the core problem pattern
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
 * Minimum Arrows to Burst Balloons
 * 
 * Problem: Given an array of balloon intervals where intervals[i] = [start, end],
 * find the minimum number of arrows needed to burst all balloons.
 * An arrow can be shot up exactly once at any point and will burst all balloons
 * that contain that point.
 * 
 * @param {number[][]} points - Array of balloon intervals [start, end]
 * @return {number} - Minimum number of arrows needed
 */

const findMinArrowShots = function(points) {
    // Handle edge cases
    if (!points || points.length === 0) {
        return 0;
    }
    
    if (points.length === 1) {
        return 1;
    }

    // Sort points based on end position
    points.sort((a, b) => a[1] - b[1]);
    
    let arrows = 1;  // Start with one arrow
    let currentEnd = points[0][1];  // Track the current arrow position
    
    // Iterate through all points
    for (let i = 1; i < points.length; i++) {
        // If current balloon starts after the last arrow position
        // we need a new arrow
        if (points[i][0] > currentEnd) {
            arrows++;
            currentEnd = points[i][1];
        }
        // Otherwise, current balloon can be burst by the previous arrow
    }
    
    return arrows;
};

// Test cases
const testCases = [
    [[10,16], [2,8], [1,6], [7,12]],
    [[1,2], [3,4], [5,6], [7,8]],
    [[1,2], [2,3], [3,4], [4,5]],
    [],
    [[1,2]]
];

// Run test cases
testCases.forEach((test, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log(`Input: ${JSON.stringify(test)}`);
    console.log(`Output: ${findMinArrowShots(test)}`);
    console.log('---');
});

// Export the function for potential module usage
module.exports = {
    findMinArrowShots
};