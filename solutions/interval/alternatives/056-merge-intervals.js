/**
 * 056. Merge Intervals
 * Medium
 *
 * This problem demonstrates key concepts in Interval.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Given a collection of intervals, merge all overlapping intervals.
 * The key insight is to sort intervals by start time, then merge consecutive
 * overlapping intervals in a single pass.
 *
 * APPROACH:
 * 1. **Sort intervals**: Sort by start time to process intervals in order
 * 2. **Iterate and merge**: For each interval, check if it overlaps with the last merged interval
 * 3. **Update or add**: If overlapping, extend the last interval; otherwise, add new interval
 * 4. **Handle edge cases**: Empty array, single interval, non-overlapping intervals
 *
 * WHY THIS WORKS:
 * - Sorting ensures we only need to look at the last merged interval
 * - Two intervals overlap if start2 <= end1
 * - Merging takes max of both end times to create combined interval
 * - Time complexity is dominated by sorting: O(n log n)
 * - Space complexity is O(n) for the result array (or O(log n) for sorting)
 *
 * TIME COMPLEXITY: O(n log n) - dominated by sorting
 * SPACE COMPLEXITY: O(n) - for result array
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [[1,3],[2,6],[8,10],[15,18]]
Step 1: Sort by start time (already sorted)
Step 2: Start with [1,3], check [2,6] -> 2 <= 3, merge to [1,6]
Step 3: Check [8,10] -> 8 > 6, add as new interval
Step 4: Check [15,18] -> 15 > 10, add as new interval
Output: [[1,6],[8,10],[15,18]]
```
 *
 * EDGE CASES:
 * - Empty input: return empty array
 * - Single interval: return as-is
 * - No overlapping intervals: return sorted intervals
 * - All intervals overlap: return single merged interval
 */

/**
 * Main solution for Problem 056: Merge Intervals
 *
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @return {number[][]} - Merged intervals
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(intervals) {
    // Edge case: empty array
    if (!intervals || intervals.length === 0) {
        return [];
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Initialize result with first interval
    const merged = [intervals[0]];

    // Iterate through remaining intervals
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];

        // Check if current interval overlaps with last merged interval
        if (current[0] <= lastMerged[1]) {
            // Merge by extending the end time
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // No overlap, add as new interval
            merged.push(current);
        }
    }

    return merged;
}

/**
 * Test cases for Problem 056: Merge Intervals
 */
function testSolution() {
    console.log('Testing 056. Merge Intervals');

    // Helper function to compare arrays
    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Basic overlapping intervals
    const result1 = solve([[1,3],[2,6],[8,10],[15,18]]);
    const expected1 = [[1,6],[8,10],[15,18]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: All intervals merge into one
    const result2 = solve([[1,4],[4,5]]);
    const expected2 = [[1,5]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single interval
    const result3 = solve([[1,4]]);
    const expected3 = [[1,4]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: No overlapping intervals
    const result4 = solve([[1,2],[3,4],[5,6]]);
    const expected4 = [[1,2],[3,4],[5,6]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Unsorted intervals
    const result5 = solve([[1,4],[0,2],[3,5]]);
    const expected5 = [[0,5]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: Empty array
    const result6 = solve([]);
    const expected6 = [];
    console.assert(arraysEqual(result6, expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 056. Merge Intervals!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 056. Merge Intervals ===');
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
