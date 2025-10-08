/**
 * 436. Find Right Interval
 * Medium
 *
 * This problem demonstrates key concepts in Interval.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * For each interval, find the interval with the smallest start that is >= current end.
 * Use binary search on sorted start times for efficient lookup.
 *
 * APPROACH:
 * 1. **Create index mapping**: Store original indices before sorting
 * 2. **Sort by start time**: Enable binary search
 * 3. **Binary search**: For each interval's end, find smallest valid start
 * 4. **Map back to original**: Use index mapping to return result in original order
 *
 * WHY THIS WORKS:
 * - Sorting start times allows binary search
 * - For each interval end, we binary search for ceiling(end) in starts
 * - Map maintains connection to original indices
 * - Time complexity: O(n log n) for sorting + O(n log n) for n binary searches
 * - Space complexity: O(n) for sorted array and result
 *
 * TIME COMPLEXITY: O(n log n)
 * SPACE COMPLEXITY: O(n)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [[3,4],[2,3],[1,2]]
With indices: [[3,4,0],[2,3,1],[1,2,2]]
Sort by start: [[1,2,2],[2,3,1],[3,4,0]]
For [3,4]: search for start>=4, not found -> -1
For [2,3]: search for start>=3, found [3,4] at index 0 -> 0
For [1,2]: search for start>=2, found [2,3] at index 1 -> 1
Output: [-1,0,1]
```
 *
 * EDGE CASES:
 * - Single interval: return [-1]
 * - No right interval exists: return -1 for that position
 * - All intervals have right intervals: return valid indices
 */

/**
 * Main solution for Problem 436: Find Right Interval
 *
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @return {number[]} - Array of right interval indices
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(intervals) {
    const n = intervals.length;
    const result = new Array(n).fill(-1);

    // Create array with start times and original indices
    const starts = intervals.map((interval, i) => [interval[0], i]);

    // Sort by start time
    starts.sort((a, b) => a[0] - b[0]);

    // For each interval, binary search for right interval
    for (let i = 0; i < n; i++) {
        const end = intervals[i][1];

        // Binary search for smallest start >= end
        let left = 0;
        let right = n - 1;
        let minIndex = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (starts[mid][0] >= end) {
                minIndex = starts[mid][1];
                right = mid - 1; // Look for smaller valid start
            } else {
                left = mid + 1;
            }
        }

        result[i] = minIndex;
    }

    return result;
}

/**
 * Test cases for Problem 436: Find Right Interval
 */
function testSolution() {
    console.log('Testing 436. Find Right Interval');

    // Helper function to compare arrays
    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Basic functionality
    const result1 = solve([[3,4],[2,3],[1,2]]);
    const expected1 = [-1,0,1];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Single interval
    const result2 = solve([[1,2]]);
    const expected2 = [-1];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: No right intervals
    const result3 = solve([[1,4],[2,3],[3,4]]);
    const expected3 = [-1,2,-1];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: All have right intervals
    const result4 = solve([[1,2],[2,3],[3,4]]);
    const expected4 = [1,2,-1];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Same interval can be right interval
    const result5 = solve([[1,12],[2,9],[3,10],[13,14],[15,16],[16,17]]);
    const expected5 = [3,3,3,4,5,-1];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 436. Find Right Interval!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 436. Find Right Interval ===');
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
