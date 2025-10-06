/**
 * 435. Non Overlapping Intervals
 * Medium
 *
 * Non-Overlapping Intervals Given an array of intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping. @param {number[][]} intervals - Array of interval pairs @return {number} - Minimum number of intervals to remove
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Non Overlapping Intervals is to understand the core problem pattern
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
 * Non-Overlapping Intervals
 * 
 * Given an array of intervals where intervals[i] = [starti, endi], 
 * return the minimum number of intervals you need to remove to make 
 * the rest of the intervals non-overlapping.
 * 
 * @param {number[][]} intervals - Array of interval pairs
 * @return {number} - Minimum number of intervals to remove
 */

function eraseOverlapIntervals(intervals) {
    // Handle edge cases
    if (!intervals || intervals.length <= 1) {
        return 0;
    }

    // Sort intervals by end time
    // This helps in making greedy choice by considering intervals
    // that end earlier first
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;          // Count of intervals to remove
    let prevEnd = -Infinity; // End time of previous non-overlapping interval

    // Iterate through sorted intervals
    for (const [start, end] of intervals) {
        // If current interval starts before or at previous end,
        // we have an overlap and need to remove one interval
        if (start < prevEnd) {
            count++;
        } else {
            // No overlap, update prevEnd to current interval's end
            prevEnd = end;
        }
    }

    return count;
}

/**
 * Test cases to verify the implementation
 */
function runTests() {
    const testCases = [
        {
            input: [[1,2], [2,3], [3,4], [1,3]],
            expected: 1,
            description: "Test case 1: Basic overlapping intervals"
        },
        {
            input: [[1,2], [1,2], [1,2]],
            expected: 2,
            description: "Test case 2: Multiple identical intervals"
        },
        {
            input: [[1,2], [2,3]],
            expected: 0,
            description: "Test case 3: Non-overlapping intervals"
        },
        {
            input: [],
            expected: 0,
            description: "Test case 4: Empty array"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = eraseOverlapIntervals(testCase.input);
        console.log(`${testCase.description}`);
        console.log(`Input: ${JSON.stringify(testCase.input)}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Test ${result === testCase.expected ? 'PASSED' : 'FAILED'}\n`);
    });
}

// Export the function for potential use in other modules
module.exports = {
    eraseOverlapIntervals
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}