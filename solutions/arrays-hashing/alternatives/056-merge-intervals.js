/**
 * 56. Merge Intervals
 * Medium
 *
 * Merge Intervals - JavaScript Implementation This solution merges overlapping intervals in an array of interval pairs. Time Complexity: O(n log n) due to sorting Space Complexity: O(n) to store the result @param {number[][]} intervals - Array of interval pairs [[start1, end1], [start2, end2], ...] @returns {number[][]} - Merged intervals
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Merge Intervals is to understand the core problem pattern
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
 * Merge Intervals - JavaScript Implementation
 * 
 * This solution merges overlapping intervals in an array of interval pairs.
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(n) to store the result
 * 
 * @param {number[][]} intervals - Array of interval pairs [[start1, end1], [start2, end2], ...]
 * @returns {number[][]} - Merged intervals
 */

const mergeIntervals = function(intervals) {
    // Handle edge cases
    if (!intervals || intervals.length === 0) {
        return [];
    }
    
    if (intervals.length === 1) {
        return intervals;
    }

    // Sort intervals based on start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Initialize result array with first interval
    const result = [intervals[0]];
    
    // Iterate through remaining intervals
    for (let i = 1; i < intervals.length; i++) {
        // Get the last interval from result and current interval
        const currentInterval = intervals[i];
        const lastMergedInterval = result[result.length - 1];
        
        // Check if current interval overlaps with last merged interval
        if (currentInterval[0] <= lastMergedInterval[1]) {
            // Merge overlapping intervals by updating the end time
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            // If no overlap, add current interval to result
            result.push(currentInterval);
        }
    }
    
    return result;
};

/**
 * Helper function to test the implementation
 * @param {number[][]} intervals - Test input
 */
function testMergeIntervals(intervals) {
    console.log('Input:', intervals);
    console.log('Output:', mergeIntervals(intervals));
    console.log('---');
}

// Test cases
function runTests() {
    testMergeIntervals([[1,3], [2,6], [8,10], [15,18]]);
    // Expected output: [[1,6], [8,10], [15,18]]
    
    testMergeIntervals([[1,4], [4,5]]);
    // Expected output: [[1,5]]
    
    testMergeIntervals([[1,4], [2,3]]);
    // Expected output: [[1,4]]
    
    testMergeIntervals([]);
    // Expected output: []
    
    testMergeIntervals([[1,5]]);
    // Expected output: [[1,5]]
    
    testMergeIntervals([[1,4], [0,4]]);
    // Expected output: [[0,4]]
}

// Export the function for use in other modules
module.exports = {
    mergeIntervals
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}