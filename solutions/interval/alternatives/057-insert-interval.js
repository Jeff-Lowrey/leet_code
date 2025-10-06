/**
 * 57. Insert Interval
 * Medium
 *
 * Insert Interval - LeetCode 57 Problem: Given a set of non-overlapping intervals and a new interval to insert, merge all overlapping intervals and return the final set of non-overlapping intervals. @param {number[][]} intervals - Array of intervals where each interval is [start, end] @param {number[]} newInterval - New interval to insert [start, end] @return {number[][]} - Merged intervals including the new interval
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Insert Interval is to understand the core problem pattern
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
 * Insert Interval - LeetCode 57
 * 
 * Problem: Given a set of non-overlapping intervals and a new interval to insert,
 * merge all overlapping intervals and return the final set of non-overlapping intervals.
 * 
 * @param {number[][]} intervals - Array of intervals where each interval is [start, end]
 * @param {number[]} newInterval - New interval to insert [start, end]
 * @return {number[][]} - Merged intervals including the new interval
 */

/**
 * Main function to insert and merge intervals
 */
function insert(intervals, newInterval) {
    // Handle empty intervals case
    if (intervals.length === 0) {
        return [newInterval];
    }

    const result = [];
    let i = 0;
    const n = intervals.length;

    // Add all intervals that end before newInterval starts
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Merge overlapping intervals
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);

    // Add remaining intervals
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}

/**
 * Helper function to test the implementation
 */
function runTests() {
    // Test cases
    const testCases = [
        {
            intervals: [[1,3], [6,9]],
            newInterval: [2,5],
            expected: [[1,5], [6,9]]
        },
        {
            intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]],
            newInterval: [4,8],
            expected: [[1,2], [3,10], [12,16]]
        },
        {
            intervals: [],
            newInterval: [5,7],
            expected: [[5,7]]
        },
        {
            intervals: [[1,5]],
            newInterval: [2,3],
            expected: [[1,5]]
        }
    ];

    // Run tests
    testCases.forEach((test, index) => {
        const result = insert(test.intervals, test.newInterval);
        console.log(`Test ${index + 1}:`);
        console.log('Input intervals:', test.intervals);
        console.log('New interval:', test.newInterval);
        console.log('Result:', result);
        console.log('Expected:', test.expected);
        console.log('Passed:', JSON.stringify(result) === JSON.stringify(test.expected));
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = insert;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}