/**

 *
 * This problem demonstrates key concepts in Interval.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Given meeting time intervals, determine if a person can attend all meetings.
 * A person cannot attend all meetings if any two meetings overlap.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Sorting ensures we only need to check consecutive intervals
 * - Two intervals overlap if the second starts before the first ends
 * - If start2 < end1, there's an overlap
 * - Time complexity is O(n log n) for sorting
 * - Space complexity is O(1) or O(log n) for sorting
 *
 * TIME COMPLEXITY: O(n log n) - dominated by sorting
 * SPACE COMPLEXITY: O(1) - excluding sorting space
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [[0,30],[5,10],[15,20]]
Step 1: Sort by start time (already sorted)
Step 2: Check [0,30] and [5,10]: 5 < 30 -> overlap found!
Output: false
```
 *
 * EDGE CASES:
 * - Empty input: return true (no meetings to conflict)
 * - Single meeting: return true (no conflicts)
 * - All non-overlapping: return true
 * - Adjacent meetings (end1 == start2): return true (no overlap)
 */

/**
 * Main solution for Problem 252: Meeting Rooms
 *
 * @param {number[][]} intervals - Array of meeting time intervals [start, end]
 * @return {boolean} - True if person can attend all meetings
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(intervals) {
    // Edge cases
    if (!intervals || intervals.length <= 1) {
        return true;
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Check for overlaps in consecutive intervals
    for (let i = 1; i < intervals.length; i++) {
        // If current meeting starts before previous ends, there's overlap
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false;
        }
    }

    return true;
}

/**
 * Test cases for Problem 252: Meeting Rooms
 */
function testSolution() {
    console.log('Testing 252. Meeting Rooms');

    // Test case 1: Overlapping meetings
    const result1 = solve([[0,30],[5,10],[15,20]]);
    const expected1 = false;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Non-overlapping meetings
    const result2 = solve([[7,10],[2,4]]);
    const expected2 = true;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Adjacent meetings (no overlap)
    const result3 = solve([[1,5],[5,10],[10,15]]);
    const expected3 = true;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single meeting
    const result4 = solve([[1,5]]);
    const expected4 = true;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Empty array
    const result5 = solve([]);
    const expected5 = true;
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Multiple overlapping
    const result6 = solve([[1,10],[2,5],[3,7]]);
    const expected6 = false;
    console.assert(result6 === expected6,
        `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 252. Meeting Rooms!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 252. Meeting Rooms ===');
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
