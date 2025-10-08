/**
 * 435. Non Overlapping Intervals
 * Medium
 *
 * This problem demonstrates key concepts in Interval.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the minimum number of intervals to remove to make the rest non-overlapping.
 * This is equivalent to finding the maximum number of non-overlapping intervals (greedy).
 *
 * APPROACH:
 * 1. **Sort by end time**: Greedy choice - always pick interval ending earliest
 * 2. **Track last end time**: Keep intervals that don't overlap with previous
 * 3. **Count non-overlapping**: Maximum intervals we can keep
 * 4. **Calculate removals**: Total intervals - kept intervals
 *
 * WHY THIS WORKS:
 * - Greedy approach: always choose interval with earliest end time
 * - This leaves maximum room for future intervals
 * - Sorting by end time ensures we make optimal choices
 * - Similar to activity selection problem
 * - Time complexity: O(n log n) for sorting
 * - Space complexity: O(1) excluding sorting
 *
 * TIME COMPLEXITY: O(n log n) - dominated by sorting
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [[1,2],[2,3],[3,4],[1,3]]
Sort by end: [[1,2],[2,3],[1,3],[3,4]]
Pick [1,2]: end=2, count=1
Check [2,3]: 2>=2, pick it, end=3, count=2
Check [1,3]: 1<3, skip (overlaps)
Check [3,4]: 3>=3, pick it, end=4, count=3
Kept: 3, Remove: 4-3=1
Output: 1
```
 *
 * EDGE CASES:
 * - Empty array: return 0
 * - Single interval: return 0
 * - All overlapping: return n-1
 * - No overlapping: return 0
 */

/**
 * Main solution for Problem 435: Non Overlapping Intervals
 *
 * @param {number[][]} intervals - Array of intervals
 * @return {number} - Minimum number of intervals to remove
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(intervals) {
    if (!intervals || intervals.length <= 1) {
        return 0;
    }

    // Sort by end time (greedy choice)
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 1; // Count of non-overlapping intervals
    let end = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        // If current interval starts at or after previous end, keep it
        if (intervals[i][0] >= end) {
            count++;
            end = intervals[i][1];
        }
        // Otherwise, skip this interval (it overlaps)
    }

    // Return number of intervals to remove
    return intervals.length - count;
}

/**
 * Test cases for Problem 435: Non Overlapping Intervals
 */
function testSolution() {
    console.log('Testing 435. Non Overlapping Intervals');

    // Test case 1: Basic overlapping intervals
    const result1 = solve([[1,2],[2,3],[3,4],[1,3]]);
    const expected1 = 1;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Multiple overlaps
    const result2 = solve([[1,2],[1,2],[1,2]]);
    const expected2 = 2;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: No overlaps
    const result3 = solve([[1,2],[2,3]]);
    const expected3 = 0;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single interval
    const result4 = solve([[1,2]]);
    const expected4 = 0;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Empty array
    const result5 = solve([]);
    const expected5 = 0;
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: All overlapping
    const result6 = solve([[1,100],[11,22],[1,11],[2,12]]);
    const expected6 = 2;
    console.assert(result6 === expected6,
        `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 435. Non Overlapping Intervals!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 435. Non Overlapping Intervals ===');
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
