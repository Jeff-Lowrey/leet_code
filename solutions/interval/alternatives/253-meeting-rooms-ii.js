/**
 * 253. Meeting Rooms Ii
 * Medium
 *
 * Meeting Rooms II Given an array of meeting time intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required. @param {number[][]} intervals - Array of meeting intervals where each interval is [start, end] @return {number} - Minimum number of meeting rooms required
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
 * Given an array of meeting time intervals where intervals[i] = [starti, endi],
 * return the minimum number of conference rooms required.
 * 
 * @param {number[][]} intervals - Array of meeting intervals where each interval is [start, end]
 * @return {number} - Minimum number of meeting rooms required
 */
function minMeetingRooms(intervals) {
    // Handle edge cases
    if (!intervals || intervals.length === 0) {
        return 0;
    }
    
    // Extract start and end times into separate arrays
    const startTimes = intervals.map(interval => interval[0]);
    const endTimes = intervals.map(interval => interval[1]);
    
    // Sort both arrays
    startTimes.sort((a, b) => a - b);
    endTimes.sort((a, b) => a - b);
    
    let rooms = 0;        // Current number of rooms needed
    let maxRooms = 0;     // Maximum rooms needed at any point
    let startPtr = 0;     // Pointer for start times
    let endPtr = 0;       // Pointer for end times
    
    // Process all meetings
    while (startPtr < intervals.length) {
        // If the earliest start time is less than earliest end time
        // We need a new room
        if (startTimes[startPtr] < endTimes[endPtr]) {
            rooms++;
            startPtr++;
        }
        // If a meeting has ended, we can reuse that room
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
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [[0, 30], [5, 10], [15, 20]],
            expected: 2,
            description: "Test Case 1: Overlapping meetings"
        },
        {
            input: [[7, 10], [2, 4]],
            expected: 1,
            description: "Test Case 2: Non-overlapping meetings"
        },
        {
            input: [[1, 5], [8, 9], [8, 9]],
            expected: 2,
            description: "Test Case 3: Simultaneous meetings"
        },
        {
            input: [],
            expected: 0,
            description: "Test Case 4: Empty input"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = minMeetingRooms(testCase.input);
        console.log(`${testCase.description}:`);
        console.log(`Input: ${JSON.stringify(testCase.input)}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// Run the test cases
runTests();

// Export the function for potential use in other modules
module.exports = minMeetingRooms;