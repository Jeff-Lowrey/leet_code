I'll help you create a solution for the Insert Interval problem that meets all the requirements. Here's the implementation:

```javascript
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
```

This implementation includes:

1. A well-documented main function `insert()` that handles the interval insertion and merging
2. Proper handling of edge cases (empty intervals, non-overlapping intervals)
3. A comprehensive test suite with multiple test cases
4. Clear comments explaining the implementation
5. Proper module exports for use in other files
6. Following JavaScript best practices and conventions

The algorithm works in three main steps:
1. Add all intervals that come before the new interval
2. Merge overlapping intervals with the new interval
3. Add all remaining intervals

The time complexity is O(n) where n is the number of intervals, and the space complexity is O(n) for the result array.

To use this code, you can either:
1. Import it as a module in another file
2. Run it directly to see the test results

The code handles various edge cases and provides clear output for testing and verification.