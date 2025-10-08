/**
 * 986. Interval List Intersections
 * Medium
 *
 * This problem demonstrates key concepts in Interval.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Given two sorted lists of closed intervals, find their intersections.
 * Use two pointers to traverse both lists simultaneously.
 *
 * APPROACH:
 * 1. **Two-pointer technique**: Track current position in both lists
 * 2. **Find intersection**: For each pair, check if they overlap
 * 3. **Calculate overlap**: Intersection is [max(start1,start2), min(end1,end2)]
 * 4. **Move pointer**: Advance pointer of interval that ends first
 *
 * WHY THIS WORKS:
 * - Both lists are sorted, so we can process in linear time
 * - Two intervals overlap if max(start1,start2) <= min(end1,end2)
 * - The overlap is always [max(starts), min(ends)]
 * - Move pointer of interval ending first (it can't intersect with future intervals)
 * - Time complexity: O(m + n) where m, n are list lengths
 * - Space complexity: O(1) excluding output
 *
 * TIME COMPLEXITY: O(m + n)
 * SPACE COMPLEXITY: O(1) - excluding output array
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: A = [[0,2],[5,10],[13,23],[24,25]]
       B = [[1,5],[8,12],[15,24],[25,26]]
Compare [0,2] and [1,5]: overlap [1,2], advance A
Compare [5,10] and [1,5]: overlap [5,5], advance B
Compare [5,10] and [8,12]: overlap [8,10], advance A
Compare [13,23] and [8,12]: overlap [13,12] invalid, advance B
Compare [13,23] and [15,24]: overlap [15,23], advance A
Compare [24,25] and [15,24]: overlap [24,24], advance A
Compare done, B has [25,26] but A exhausted
Output: [[1,2],[5,5],[8,10],[15,23],[24,24]]
```
 *
 * EDGE CASES:
 * - Empty list(s): return []
 * - No intersections: return []
 * - Complete overlap: return smaller interval
 * - Touching intervals (end1 == start2): valid intersection
 */

/**
 * Main solution for Problem 986: Interval List Intersections
 *
 * @param {number[][]} firstList - First sorted list of intervals
 * @param {number[][]} secondList - Second sorted list of intervals
 * @return {number[][]} - List of interval intersections
 *
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function solve(firstList, secondList) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < firstList.length && j < secondList.length) {
        const [start1, end1] = firstList[i];
        const [start2, end2] = secondList[j];

        // Find intersection
        const intersectionStart = Math.max(start1, start2);
        const intersectionEnd = Math.min(end1, end2);

        // Check if there's a valid intersection
        if (intersectionStart <= intersectionEnd) {
            result.push([intersectionStart, intersectionEnd]);
        }

        // Move pointer of interval that ends first
        if (end1 < end2) {
            i++;
        } else {
            j++;
        }
    }

    return result;
}

/**
 * Test cases for Problem 986: Interval List Intersections
 */
function testSolution() {
    console.log('Testing 986. Interval List Intersections');

    // Helper function to compare arrays
    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Basic functionality
    const result1 = solve(
        [[0,2],[5,10],[13,23],[24,25]],
        [[1,5],[8,12],[15,24],[25,26]]
    );
    const expected1 = [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: No intersections
    const result2 = solve([[1,3],[5,9]], [[4,4],[10,12]]);
    const expected2 = [];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Complete overlap
    const result3 = solve([[1,7]], [[3,10]]);
    const expected3 = [[3,7]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Empty lists
    const result4 = solve([], [[1,5]]);
    const expected4 = [];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Touching intervals
    const result5 = solve([[1,3],[5,7]], [[2,4],[6,8]]);
    const expected5 = [[2,3],[6,7]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: One interval contains the other
    const result6 = solve([[1,10]], [[2,3],[4,5],[6,7]]);
    const expected6 = [[2,3],[4,5],[6,7]];
    console.assert(arraysEqual(result6, expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 986. Interval List Intersections!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 986. Interval List Intersections ===');
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
