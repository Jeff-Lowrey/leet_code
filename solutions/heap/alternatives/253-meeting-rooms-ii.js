/**
 * 253. Meeting Rooms Ii
 * Medium
 *
 * Meeting Rooms II Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...], find the minimum number of conference rooms required. @param {number[][]} intervals - Array of meeting intervals where each interval is [start, end] @return {number} - Minimum number of meeting rooms required
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Meeting Rooms Ii is to understand the core problem pattern
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
 * Meeting Rooms II
 * 
 * Given an array of meeting time intervals consisting of start and end times 
 * [[s1,e1],[s2,e2],...], find the minimum number of conference rooms required.
 * 
 * @param {number[][]} intervals - Array of meeting intervals where each interval is [start, end]
 * @return {number} - Minimum number of meeting rooms required
 */

/**
 * Main function to find minimum number of meeting rooms required
 * Time Complexity: O(n log n) where n is the number of intervals
 * Space Complexity: O(n)
 */
function minMeetingRooms(intervals) {
    // Handle edge cases
    if (!intervals || intervals.length === 0) {
        return 0;
    }
    
    if (intervals.length === 1) {
        return 1;
    }

    // Separate start and end times
    const startTimes = intervals.map(interval => interval[0]).sort((a, b) => a - b);
    const endTimes = intervals.map(interval => interval[1]).sort((a, b) => a - b);

    let rooms = 0;        // Current number of rooms
    let maxRooms = 0;     // Maximum rooms needed at any point
    let startPtr = 0;     // Pointer for start times
    let endPtr = 0;       // Pointer for end times

    // Process all start and end times in chronological order
    while (startPtr < intervals.length && endPtr < intervals.length) {
        // If the next start time is less than the next end time
        // we need a new room
        if (startTimes[startPtr] < endTimes[endPtr]) {
            rooms++;
            startPtr++;
        }
        // If a meeting ends, we can free up a room
        else {
            rooms--;
            endPtr++;
        }

        // Keep track of maximum rooms needed
        maxRooms = Math.max(maxRooms, rooms);
    }

    return maxRooms;
}

/**
 * Helper function to validate input intervals
 * @param {number[][]} intervals
 * @return {boolean}
 */
function validateIntervals(intervals) {
    if (!Array.isArray(intervals)) {
        return false;
    }

    return intervals.every(interval => 
        Array.isArray(interval) && 
        interval.length === 2 &&
        Number.isInteger(interval[0]) &&
        Number.isInteger(interval[1]) &&
        interval[0] <= interval[1]
    );
}

// Export the function for testing purposes
module.exports = {
    minMeetingRooms,
    validateIntervals
};

// Example usage:
const testCases = [
    [[0, 30], [5, 10], [15, 20]],
    [[7, 10], [2, 4]],
    [[1, 5], [8, 9], [8, 10]],
    []
];

console.log("Test Cases Results:");
testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}:`, minMeetingRooms(testCase));
});

/* Expected Output:
Test 1: 2 (We need two rooms for overlapping meetings)
Test 2: 1 (Meetings don't overlap)
Test 3: 2 (We need two rooms for overlapping meetings)
Test 4: 0 (No meetings)
*/