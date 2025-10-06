/**
 * 252. Meeting Rooms
 * Medium
 *
 * Meeting Rooms - JavaScript Implementation Problem: Given an array of meeting time intervals where intervals[i] = [startTime, endTime], determine if a person could attend all meetings (i.e., there are no overlapping meetings). @param {number[][]} intervals - Array of meeting intervals, each containing [startTime, endTime] @return {boolean} - Returns true if all meetings can be attended, false otherwise
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Meeting Rooms is to understand the core problem pattern
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
 * Meeting Rooms - JavaScript Implementation
 * 
 * Problem: Given an array of meeting time intervals where intervals[i] = [startTime, endTime],
 * determine if a person could attend all meetings (i.e., there are no overlapping meetings).
 * 
 * @param {number[][]} intervals - Array of meeting intervals, each containing [startTime, endTime]
 * @return {boolean} - Returns true if all meetings can be attended, false otherwise
 */

/**
 * Main function to check if all meetings can be attended
 * Time Complexity: O(n log n) where n is the number of intervals
 * Space Complexity: O(1) as we sort in place
 */
function canAttendMeetings(intervals) {
    // Handle edge cases
    if (!intervals || intervals.length <= 1) {
        return true;
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Check for overlaps between adjacent intervals
    for (let i = 1; i < intervals.length; i++) {
        // If current meeting starts before previous meeting ends, there's an overlap
        if (intervals[i][0] < intervals[i-1][1]) {
            return false;
        }
    }

    return true;
}

/**
 * Helper function to test the implementation
 */
function runTests() {
    // Test cases
    const testCases = [
        {
            intervals: [[0,30], [5,10], [15,20]],
            expected: false,
            description: "Overlapping meetings"
        },
        {
            intervals: [[7,10], [2,4]],
            expected: true,
            description: "Non-overlapping meetings"
        },
        {
            intervals: [],
            expected: true,
            description: "Empty intervals"
        },
        {
            intervals: [[1,2]],
            expected: true,
            description: "Single meeting"
        },
        {
            intervals: [[1,5], [5,10]],
            expected: true,
            description: "Back-to-back meetings"
        }
    ];

    // Run tests
    testCases.forEach((test, index) => {
        const result = canAttendMeetings(test.intervals);
        console.log(`Test ${index + 1} (${test.description}):`);
        console.log(`Input: ${JSON.stringify(test.intervals)}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = {
    canAttendMeetings
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}