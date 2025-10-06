/**
 * 56. Merge Intervals
 * Medium
 *
 * Merge Intervals - JavaScript Implementation Problem: Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input. Time Complexity: O(n log n) due to sorting Space Complexity: O(n) to store the result
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
 * Problem: Given an array of intervals where intervals[i] = [starti, endi],
 * merge all overlapping intervals and return an array of the non-overlapping
 * intervals that cover all the intervals in the input.
 * 
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(n) to store the result
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    // Handle edge cases
    if (!intervals || intervals.length <= 1) {
        return intervals;
    }

    // Sort intervals based on start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Initialize result array with first interval
    const result = [intervals[0]];

    // Iterate through remaining intervals
    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        const lastMergedInterval = result[result.length - 1];

        // Check if current interval overlaps with last merged interval
        if (currentInterval[0] <= lastMergedInterval[1]) {
            // Merge intervals by updating end time
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            // No overlap, add current interval to result
            result.push(currentInterval);
        }
    }

    return result;
}

// Test cases
function runTestCases() {
    const testCases = [
        {
            input: [[1,3],[2,6],[8,10],[15,18]],
            expected: [[1,6],[8,10],[15,18]],
            description: "Multiple intervals with overlap"
        },
        {
            input: [[1,4],[4,5]],
            expected: [[1,5]],
            description: "Adjacent intervals"
        },
        {
            input: [[1,4]],
            expected: [[1,4]],
            description: "Single interval"
        },
        {
            input: [[1,4],[2,3]],
            expected: [[1,4]],
            description: "Contained interval"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = merge(testCase.input);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        console.log(`Test case ${index + 1} (${testCase.description}): ${passed ? 'PASSED' : 'FAILED'}`);
        console.log(`Input: ${JSON.stringify(testCase.input)}`);
        console.log(`Expected: ${JSON.stringify(testCase.expected)}`);
        console.log(`Got: ${JSON.stringify(result)}\n`);
    });
}

// Export the function for use in other modules
module.exports = merge;

// Run test cases if this file is being run directly
if (require.main === module) {
    runTestCases();
}