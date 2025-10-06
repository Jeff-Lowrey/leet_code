/**
 * 986. Interval List Intersections
 * Medium
 *
 * Interval List Intersections Given two lists of closed intervals, returns the intersection of these two interval lists. Each list of intervals is pairwise disjoint and sorted. @param {number[][]} firstList - First list of intervals, each interval is [start, end] @param {number[][]} secondList - Second list of intervals, each interval is [start, end] @return {number[][]} - List of intersection intervals
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Interval List Intersections is to understand the core problem pattern
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
 * Interval List Intersections
 * 
 * Given two lists of closed intervals, returns the intersection of these two interval lists.
 * Each list of intervals is pairwise disjoint and sorted.
 * 
 * @param {number[][]} firstList - First list of intervals, each interval is [start, end]
 * @param {number[][]} secondList - Second list of intervals, each interval is [start, end]
 * @return {number[][]} - List of intersection intervals
 */

const intervalIntersection = function(firstList, secondList) {
    // Handle edge cases
    if (!firstList || !secondList || firstList.length === 0 || secondList.length === 0) {
        return [];
    }

    const result = [];
    let i = 0;  // pointer for firstList
    let j = 0;  // pointer for secondList

    // Iterate through both lists simultaneously
    while (i < firstList.length && j < secondList.length) {
        // Get current intervals from both lists
        const [start1, end1] = firstList[i];
        const [start2, end2] = secondList[j];

        // Find the intersection if it exists
        const intersectionStart = Math.max(start1, start2);
        const intersectionEnd = Math.min(end1, end2);

        // If there is a valid intersection, add it to result
        if (intersectionStart <= intersectionEnd) {
            result.push([intersectionStart, intersectionEnd]);
        }

        // Move the pointer of the interval that ends earlier
        if (end1 < end2) {
            i++;
        } else {
            j++;
        }
    }

    return result;
};

/**
 * Example usage and test cases
 */
function runTests() {
    // Test Case 1: Basic intersection
    const test1FirstList = [[0,2],[5,10],[13,23],[24,25]];
    const test1SecondList = [[1,5],[8,12],[15,24],[25,26]];
    console.log("Test 1:", intervalIntersection(test1FirstList, test1SecondList));
    // Expected: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

    // Test Case 2: No intersection
    const test2FirstList = [[1,3],[5,7]];
    const test2SecondList = [[2,4],[6,8]];
    console.log("Test 2:", intervalIntersection(test2FirstList, test2SecondList));
    // Expected: [[2,3],[6,7]]

    // Test Case 3: Empty lists
    console.log("Test 3:", intervalIntersection([], []));
    // Expected: []

    // Test Case 4: Single interval lists
    const test4FirstList = [[1,4]];
    const test4SecondList = [[2,3]];
    console.log("Test 4:", intervalIntersection(test4FirstList, test4SecondList));
    // Expected: [[2,3]]
}

// Export the function for use in other modules
module.exports = {
    intervalIntersection
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}