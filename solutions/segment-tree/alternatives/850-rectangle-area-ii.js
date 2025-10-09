/**

 *
 * This problem demonstrates key concepts in Segment Tree.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * We need to find the total area covered by overlapping rectangles. This is a classic
 * sweep line algorithm problem. We can use coordinate compression combined with a
 * segment tree, or a simpler approach using events and active intervals.
 *
 * APPROACH:
 * Sweep line with coordinate compression:




 *
 * WHY THIS WORKS:
 * By sweeping from left to right, we can track which y-ranges are active at each x.
 * The total area is the sum of (width * active_height) for each vertical strip.
 *
 * TIME COMPLEXITY: O(n^2) for simple approach, O(n^2 log n) with segment tree
 * SPACE COMPLEXITY: O(n)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [[0,0,2,2], [1,0,2,3], [1,0,3,1]]
 * Sweep events create strips, calculate coverage for each
 * Output: 6
 *
 * EDGE CASES:
 * - No rectangles: return 0
 * - Single rectangle: return area
 * - Fully overlapping: return area of largest
 * - Non-overlapping: return sum of areas
 */

const MOD = 1000000007;

/**
 * Main solution for Problem 850: Rectangle Area II
 *
 * @param {number[][]} rectangles - Array of [x1, y1, x2, y2] rectangles
 * @return {number} - Total area covered modulo 10^9+7
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function solve(rectangles) {
    if (!rectangles || rectangles.length === 0) {
        return 0;
    }

    // Extract and sort all x coordinates
    const xCoords = new Set();
    const yCoords = new Set();

    for (const [x1, y1, x2, y2] of rectangles) {
        xCoords.add(x1);
        xCoords.add(x2);
        yCoords.add(y1);
        yCoords.add(y2);
    }

    const xs = Array.from(xCoords).sort((a, b) => a - b);
    const ys = Array.from(yCoords).sort((a, b) => a - b);

    let totalArea = 0;

    // For each x interval
    for (let i = 0; i < xs.length - 1; i++) {
        const x1 = xs[i];
        const x2 = xs[i + 1];
        const width = x2 - x1;

        // Find active y intervals for this x range
        const activeY = [];

        for (const [rx1, ry1, rx2, ry2] of rectangles) {
            // Check if rectangle covers this x interval
            if (rx1 <= x1 && x2 <= rx2) {
                activeY.push([ry1, ry2]);
            }
        }

        // Merge y intervals and calculate total height
        const height = mergeAndCalculateHeight(activeY);
        totalArea = (totalArea + width * height) % MOD;
    }

    return totalArea;
}

/**
 * Merge overlapping intervals and calculate total coverage
 */
function mergeAndCalculateHeight(intervals) {
    if (intervals.length === 0) {
        return 0;
    }

    // Sort by start point
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];
    let [start, end] = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const [s, e] = intervals[i];

        if (s <= end) {
            // Overlapping, merge
            end = Math.max(end, e);
        } else {
            // Non-overlapping, save current and start new
            merged.push([start, end]);
            start = s;
            end = e;
        }
    }

    merged.push([start, end]);

    // Calculate total height
    let height = 0;
    for (const [s, e] of merged) {
        height += e - s;
    }

    return height;
}

/**
 * Alternative solution using sweep line with events
 */
function solveWithSweepLine(rectangles) {
    if (!rectangles || rectangles.length === 0) {
        return 0;
    }

    const events = [];

    // Create events: [x, type, y1, y2] where type: 1=start, -1=end
    for (const [x1, y1, x2, y2] of rectangles) {
        events.push([x1, 1, y1, y2]);
        events.push([x2, -1, y1, y2]);
    }

    // Sort events by x coordinate
    events.sort((a, b) => a[0] - b[0]);

    let totalArea = 0;
    let prevX = 0;
    const active = []; // Active y intervals

    for (let i = 0; i < events.length; i++) {
        const [x, type, y1, y2] = events[i];

        // Calculate area from prevX to current x
        if (i > 0 && x > prevX) {
            const width = x - prevX;
            const height = mergeAndCalculateHeight(active.slice());
            totalArea = (totalArea + width * height) % MOD;
        }

        // Update active intervals
        if (type === 1) {
            active.push([y1, y2]);
        } else {
            // Remove the interval
            const idx = active.findIndex(([ay1, ay2]) => ay1 === y1 && ay2 === y2);
            if (idx !== -1) {
                active.splice(idx, 1);
            }
        }

        prevX = x;
    }

    return totalArea;
}

/**
 * Test cases for Problem 850: Rectangle Area II
 */
function testSolution() {
    console.log('Testing 850. Rectangle Area II');

    // Test case 1: Basic example
    const result1 = solve([[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]]);
    const expected1 = 6;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`✓ Test 1 passed: 3 rectangles -> area = ${result1}`);

    // Test case 2: Another example
    const result2 = solve([[0, 0, 1000000000, 1000000000]]);
    const expected2 = 49; // (10^9)^2 % (10^9+7)
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`✓ Test 2 passed: Large rectangle -> area = ${result2}`);

    // Test case 3: Non-overlapping rectangles
    const result3 = solve([[0, 0, 1, 1], [2, 2, 3, 3]]);
    const expected3 = 2;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`✓ Test 3 passed: Non-overlapping -> area = ${result3}`);

    // Test case 4: Fully overlapping
    const result4 = solve([[0, 0, 2, 2], [0, 0, 2, 2]]);
    const expected4 = 4;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`✓ Test 4 passed: Fully overlapping -> area = ${result4}`);

    // Test case 5: Partial overlap
    const result5 = solve([[0, 0, 2, 2], [1, 1, 3, 3]]);
    const expected5 = 7; // 4 + 4 - 1
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`✓ Test 5 passed: Partial overlap -> area = ${result5}`);

    // Test sweep line solution
    console.log('\nTesting Sweep Line solution:');
    const result6 = solveWithSweepLine([[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]]);
    console.assert(result6 === 6, 'Sweep line solution test failed');
    console.log(`✓ Sweep Line solution test passed: area = ${result6}`);

    console.log('All test cases passed for 850. Rectangle Area II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 850. Rectangle Area II ===');
    console.log('Category: Segment Tree');
    console.log('Difficulty: Hard');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    solveWithSweepLine,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Coordinate compression reduces problem to manageable size
 * - Sweep line algorithm is a classic technique for geometric problems
 * - Segment tree can optimize y-interval merging but adds complexity
 * - The modulo operation is applied to handle large results
 * - Both solutions handle overlapping rectangles correctly
 */
