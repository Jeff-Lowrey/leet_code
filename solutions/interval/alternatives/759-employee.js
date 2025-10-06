/**
 * 759. Employee
 * Medium
 *
 * Employee Free Time Implementation This solution finds the common free time intervals among multiple employees' schedules. Time Complexity: O(N log N) where N is the total number of intervals Space Complexity: O(N) for storing merged intervals
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Employee is to understand the core problem pattern
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
 * Employee Free Time Implementation
 * 
 * This solution finds the common free time intervals among multiple employees' schedules.
 * Time Complexity: O(N log N) where N is the total number of intervals
 * Space Complexity: O(N) for storing merged intervals
 */

// Definition for an Interval
class Interval {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

/**
 * Finds the free time intervals common to all employees
 * @param {Interval[][]} schedule - Array of employee schedules, each containing intervals
 * @return {Interval[]} - Array of free time intervals
 */
function employeeFreeTime(schedule) {
    if (!schedule || schedule.length === 0) return [];

    // Flatten all intervals into a single array
    const intervals = [];
    for (let employeeSchedule of schedule) {
        for (let interval of employeeSchedule) {
            intervals.push(interval);
        }
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a.start - b.start);

    // Find gaps between merged intervals
    const result = [];
    let prevEnd = intervals[0].end;

    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i];
        
        // If there's a gap between current interval and previous end
        if (curr.start > prevEnd) {
            result.push(new Interval(prevEnd, curr.start));
        }
        
        // Update prevEnd to be the maximum of current values
        prevEnd = Math.max(prevEnd, curr.end);
    }

    return result;
}

/**
 * Helper function to print intervals
 * @param {Interval[]} intervals - Array of intervals to print
 */
function printIntervals(intervals) {
    console.log(intervals.map(interval => `[${interval.start}, ${interval.end}]`).join(' '));
}

// Test cases
function runTests() {
    // Test Case 1
    const schedule1 = [
        [new Interval(1, 2), new Interval(5, 6)],
        [new Interval(1, 3), new Interval(4, 10)]
    ];
    console.log("Test Case 1:");
    console.log("Input Schedule:");
    schedule1.forEach((emp, i) => console.log(`Employee ${i + 1}:`, emp.map(int => `[${int.start}, ${int.end}]`).join(' ')));
    console.log("Free Time Intervals:");
    printIntervals(employeeFreeTime(schedule1));

    // Test Case 2
    const schedule2 = [
        [new Interval(1, 3), new Interval(6, 7)],
        [new Interval(2, 4)],
        [new Interval(2, 5), new Interval(9, 12)]
    ];
    console.log("\nTest Case 2:");
    console.log("Input Schedule:");
    schedule2.forEach((emp, i) => console.log(`Employee ${i + 1}:`, emp.map(int => `[${int.start}, ${int.end}]`).join(' ')));
    console.log("Free Time Intervals:");
    printIntervals(employeeFreeTime(schedule2));
}

// Run the tests
runTests();

// Export the functions for potential external use
module.exports = {
    Interval,
    employeeFreeTime,
    printIntervals
};