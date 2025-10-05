I'll help you create a JavaScript implementation for checking non-overlapping intervals. I'll create a complete solution with comments and proper error handling.

```javascript
/**
 * Non-Overlapping Intervals Implementation
 * This module provides functionality to work with intervals and determine if they overlap
 * 
 * @author AI Assistant
 * @date 2024
 */

/**
 * Represents an Interval with start and end points
 */
class Interval {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

/**
 * Determines the minimum number of intervals that need to be removed to make the remaining intervals non-overlapping
 * @param {Array<Array<number>>} intervals - Array of intervals where each interval is [start, end]
 * @returns {number} Minimum number of intervals to remove
 */
function eraseOverlapIntervals(intervals) {
    // Handle edge cases
    if (!intervals || intervals.length <= 1) {
        return 0;
    }

    // Sort intervals by end time
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;
    let prevEnd = intervals[0][1];

    // Iterate through intervals to find overlaps
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            // Overlap found, increment count
            count++;
        } else {
            // No overlap, update prevEnd
            prevEnd = intervals[i][1];
        }
    }

    return count;
}

/**
 * Checks if two intervals overlap
 * @param {Interval} interval1 - First interval
 * @param {Interval} interval2 - Second interval
 * @returns {boolean} True if intervals overlap, false otherwise
 */
function doIntervalsOverlap(interval1, interval2) {
    if (!interval1 || !interval2) {
        throw new Error('Invalid intervals provided');
    }

    return !(interval1.end <= interval2.start || interval2.end <= interval1.start);
}

/**
 * Merges non-overlapping intervals
 * @param {Array<Array<number>>} intervals - Array of intervals to merge
 * @returns {Array<Array<number>>} Merged intervals
 */
function mergeNonOverlapping(intervals) {
    if (!intervals || intervals.length <= 1) {
        return intervals || [];
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const lastMerged = result[result.length - 1];
        const current = intervals[i];

        if (current[0] <= lastMerged[1]) {
            // Merge overlapping intervals
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // Add non-overlapping interval
            result.push(current);
        }
    }

    return result;
}

// Export the functions for use in other modules
module.exports = {
    Interval,
    eraseOverlapIntervals,
    doIntervalsOverlap,
    mergeNonOverlapping
};

// Example usage and tests
function runTests() {
    // Test 1: Basic overlap check
    const interval1 = new Interval(1, 4);
    const interval2 = new Interval(3, 6);
    console.log('Test 1:', doIntervalsOverlap(interval1, interval2)); // Should return true

    // Test 2: Minimum intervals to remove
    const intervals = [[1,2], [2,3], [3,4], [1,3]];
    console.log('Test 2:', eraseOverlapIntervals(intervals)); // Should return 1

    // Test 3: Merge non-overlapping intervals
    const intervalsToMerge = [[1,3], [2,6], [8,10], [15,18]];
    console.log('Test 3:', mergeNonOverlapping(intervalsToMerge));
    // Should return [[1,6], [8,10], [15,18]]
}

// Uncomment to run tests
// runTests();
```

This implementation provides a complete solution for working with non-overlapping intervals in JavaScript. Here's what's included:

1. An `Interval` class to represent intervals with start and end points
2. `eraseOverlapIntervals` function to find the minimum number of intervals to remove to make the set non-overlapping
3. `doIntervalsOverlap` function to check if two intervals overlap
4. `mergeNonOverlapping` function to merge overlapping intervals
5. Test cases and example usage
6. Proper error handling and edge cases
7. Clear comments and documentation

The code follows JavaScript best practices and conventions, including:
- ES6+ syntax
- Proper error handling
- Clear variable naming
- Efficient algorithms
- Modular design
- Export statements for use in other modules

The implementation is complete and can be used as a standalone module or integrated into a larger project. The test cases demonstrate the functionality of each method.