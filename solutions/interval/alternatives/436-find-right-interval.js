/**
 * 436. Find Right Interval
 * Medium
 *
 * Find Right Interval - JavaScript Implementation Problem: Given an array of intervals, for each interval i, find the index of the rightmost interval j such that intervals[j].start >= intervals[i].end. If no such interval exists, return -1 for that interval. @param {number[][]} intervals - Array of intervals where each interval is [start, end] @return {number[]} - Array containing the indices of right intervals
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find Right Interval is to understand the core problem pattern
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
 * Find Right Interval - JavaScript Implementation
 * 
 * Problem: Given an array of intervals, for each interval i, find the index of the 
 * rightmost interval j such that intervals[j].start >= intervals[i].end.
 * If no such interval exists, return -1 for that interval.
 * 
 * @param {number[][]} intervals - Array of intervals where each interval is [start, end]
 * @return {number[]} - Array containing the indices of right intervals
 */

/**
 * Binary search helper function to find the rightmost interval
 * @param {Array} starts - Array of start points and their indices
 * @param {number} target - Target value to search for
 * @return {number} - Index of the rightmost interval or -1 if not found
 */
function binarySearch(starts, target) {
    let left = 0;
    let right = starts.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (starts[mid][0] >= target) {
            result = starts[mid][1]; // Store the current valid index
            right = mid - 1; // Continue searching left for potentially smaller start point
        } else {
            left = mid + 1;
        }
    }

    return result;
}

/**
 * Main function to find right intervals
 * @param {number[][]} intervals - Array of intervals
 * @return {number[]} - Array of indices for right intervals
 */
function findRightInterval(intervals) {
    // Handle edge cases
    if (!intervals || intervals.length === 0) {
        return [];
    }
    
    if (intervals.length === 1) {
        return [-1];
    }

    // Create array of start points with their original indices
    const starts = intervals.map((interval, index) => [interval[0], index]);
    
    // Sort starts array based on start points
    starts.sort((a, b) => a[0] - b[0]);

    // Result array to store right interval indices
    const result = new Array(intervals.length);

    // For each interval, find the rightmost interval
    for (let i = 0; i < intervals.length; i++) {
        const endPoint = intervals[i][1];
        result[i] = binarySearch(starts, endPoint);
    }

    return result;
}

// Export the function for use in other modules
module.exports = findRightInterval;

// Example test cases
const testCases = [
    [[1,2]],                          // Expected: [-1]
    [[3,4], [2,3], [1,2]],           // Expected: [-1, 0, 1]
    [[1,4], [2,3], [3,4]],           // Expected: [-1, 2, -1]
];

// Run test cases
testCases.forEach((intervals, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log('Input:', intervals);
    console.log('Output:', findRightInterval(intervals));
    console.log('---');
});