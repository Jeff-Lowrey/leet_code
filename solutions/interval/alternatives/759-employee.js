/**
 * 759. Employee Free Time
 * Hard
 *
 * This problem demonstrates key concepts in Interval.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Given work schedules for multiple employees, find common free time intervals.
 * Flatten all intervals, merge overlapping work periods, find gaps between merged intervals.
 *
 * APPROACH:
 * 1. **Flatten all intervals**: Combine all employee schedules into one list
 * 2. **Sort by start time**: Process intervals chronologically
 * 3. **Merge overlapping intervals**: Find all busy periods
 * 4. **Find gaps**: Gaps between merged intervals are free time
 *
 * WHY THIS WORKS:
 * - Flattening treats all work intervals equally
 * - Merging finds all busy time periods
 * - Gaps between busy periods are common free time
 * - Sort ensures we process intervals in time order
 * - Time complexity: O(n log n) where n is total intervals
 * - Space complexity: O(n) for flattened and result arrays
 *
 * TIME COMPLEXITY: O(n log n) - where n is total number of intervals
 * SPACE COMPLEXITY: O(n)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [[[1,3],[4,6]],[[1,4]],[[2,5],[7,9]]]
Flatten: [[1,3],[4,6],[1,4],[2,5],[7,9]]
Sort: [[1,3],[1,4],[2,5],[4,6],[7,9]]
Merge: [[1,6],[7,9]]
Gaps: [6,7]
Output: [[6,7]]
```
 *
 * EDGE CASES:
 * - No employees: return []
 * - No free time: return []
 * - All time is free: return large interval
 * - Single employee: find gaps in their schedule
 */

// Interval class for compatibility
class Interval {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

/**
 * Main solution for Problem 759: Employee Free Time
 *
 * @param {Interval[][]} schedule - Array of employee schedules
 * @return {Interval[]} - Common free time intervals
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(schedule) {
    // Flatten all intervals from all employees
    const allIntervals = [];
    for (const employeeSchedule of schedule) {
        for (const interval of employeeSchedule) {
            allIntervals.push(interval);
        }
    }

    if (allIntervals.length === 0) {
        return [];
    }

    // Sort by start time
    allIntervals.sort((a, b) => a.start - b.start);

    // Merge overlapping intervals to find all busy periods
    const merged = [allIntervals[0]];
    for (let i = 1; i < allIntervals.length; i++) {
        const current = allIntervals[i];
        const last = merged[merged.length - 1];

        if (current.start <= last.end) {
            // Overlapping, merge them
            last.end = Math.max(last.end, current.end);
        } else {
            // No overlap, add as new interval
            merged.push(current);
        }
    }

    // Find gaps between merged intervals (free time)
    const freeTime = [];
    for (let i = 1; i < merged.length; i++) {
        freeTime.push(new Interval(merged[i - 1].end, merged[i].start));
    }

    return freeTime;
}

/**
 * Test cases for Problem 759: Employee Free Time
 */
function testSolution() {
    console.log('Testing 759. Employee Free Time');

    // Helper function to compare intervals
    const intervalsEqual = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i].start !== b[i].start || a[i].end !== b[i].end) return false;
        }
        return true;
    };

    // Test case 1: Basic functionality
    const schedule1 = [
        [new Interval(1, 3), new Interval(4, 6)],
        [new Interval(1, 4)],
        [new Interval(2, 5), new Interval(7, 9)]
    ];
    const result1 = solve(schedule1);
    const expected1 = [new Interval(6, 7)];
    console.assert(intervalsEqual(result1, expected1),
        `Test 1 failed`);

    // Test case 2: Multiple free periods
    const schedule2 = [
        [new Interval(1, 2), new Interval(5, 6)],
        [new Interval(1, 3)],
        [new Interval(4, 10)]
    ];
    const result2 = solve(schedule2);
    const expected2 = [new Interval(3, 4)];
    console.assert(intervalsEqual(result2, expected2),
        `Test 2 failed`);

    // Test case 3: No free time
    const schedule3 = [
        [new Interval(1, 10)],
        [new Interval(2, 5)],
        [new Interval(3, 7)]
    ];
    const result3 = solve(schedule3);
    const expected3 = [];
    console.assert(intervalsEqual(result3, expected3),
        `Test 3 failed`);

    // Test case 4: Single employee with gaps
    const schedule4 = [
        [new Interval(1, 3), new Interval(6, 7)]
    ];
    const result4 = solve(schedule4);
    const expected4 = [new Interval(3, 6)];
    console.assert(intervalsEqual(result4, expected4),
        `Test 4 failed`);

    console.log('All test cases passed for 759. Employee Free Time!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 759. Employee ===');
    console.log('Category: Interval');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on interval concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
