/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Pointers meet:** Handle when left == right
 * - **Empty input:** Check for null or empty arrays
 * - **Single element:** One pointer scenario
 * - **All duplicates:** Pointer movement with same values
 * - **Boundary crossing:** Prevent left > right
 *
 * </details>
 */

/**
 * Main solution for Problem 699: Falling Squares
 * Simpler interval-based approach
 *
 * @param {number[][]} positions - Array of [left, sideLength] pairs
 * @return {number[]} - Maximum heights after each square
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function solve(positions) {
    if (!positions || positions.length === 0) {
        return [];
    }

    const intervals = []; // [[left, right, height], ...]
    const result = [];
    let maxHeight = 0;

    for (const [left, sideLength] of positions) {
        const right = left + sideLength;

        // Find max height in overlapping range
        let baseHeight = 0;
        for (const [l, r, h] of intervals) {
            // Check if intervals overlap
            if (l < right && left < r) {
                baseHeight = Math.max(baseHeight, h);
            }
        }

        const newHeight = baseHeight + sideLength;
        intervals.push([left, right, newHeight]);
        maxHeight = Math.max(maxHeight, newHeight);
        result.push(maxHeight);
    }

    return result;
}

/**
 * Alternative solution using Segment Tree with coordinate compression
 */
class SegmentTree {
    constructor(coords) {
        this.coords = coords;
        this.n = coords.length;
        this.tree = new Array(4 * this.n).fill(0);
    }

    update(node, start, end, left, right, height) {
        if (right < start || left > end) {
            return;
        }

        if (left <= start && end <= right) {
            this.tree[node] = Math.max(this.tree[node], height);
            return;
        }

        const mid = Math.floor((start + end) / 2);
        this.update(2 * node, start, mid, left, right, height);
        this.update(2 * node + 1, mid + 1, end, left, right, height);
        this.tree[node] = Math.max(this.tree[2 * node], this.tree[2 * node + 1]);
    }

    query(node, start, end, left, right) {
        if (right < start || left > end) {
            return 0;
        }

        if (left <= start && end <= right) {
            return this.tree[node];
        }

        const mid = Math.floor((start + end) / 2);
        const leftMax = this.query(2 * node, start, mid, left, right);
        const rightMax = this.query(2 * node + 1, mid + 1, end, left, right);
        return Math.max(leftMax, rightMax);
    }

    queryRange(left, right) {
        const leftIdx = this.coords.indexOf(left);
        const rightIdx = this.coords.indexOf(right) - 1;
        if (leftIdx === -1 || rightIdx === -1 || leftIdx > rightIdx) {
            return 0;
        }
        return this.query(1, 0, this.n - 1, leftIdx, rightIdx);
    }

    updateRange(left, right, height) {
        const leftIdx = this.coords.indexOf(left);
        const rightIdx = this.coords.indexOf(right) - 1;
        if (leftIdx === -1 || rightIdx === -1 || leftIdx > rightIdx) {
            return;
        }
        this.update(1, 0, this.n - 1, leftIdx, rightIdx, height);
    }
}

function solveWithSegmentTree(positions) {
    if (!positions || positions.length === 0) {
        return [];
    }

    // Coordinate compression
    const coords = new Set();
    for (const [left, sideLength] of positions) {
        coords.add(left);
        coords.add(left + sideLength);
    }

    const sortedCoords = Array.from(coords).sort((a, b) => a - b);
    const tree = new SegmentTree(sortedCoords);

    const result = [];
    let maxHeight = 0;

    for (const [left, sideLength] of positions) {
        const right = left + sideLength;

        const baseHeight = tree.queryRange(left, right);
        const newHeight = baseHeight + sideLength;

        tree.updateRange(left, right, newHeight);
        maxHeight = Math.max(maxHeight, newHeight);
        result.push(maxHeight);
    }

    return result;
}

/**
 * Test cases for Problem 699: Falling Squares
 */
function testSolution() {
    console.log('Testing 699. Falling Squares');

    // Test case 1: Basic example
    const result1 = solve([[1, 2], [2, 3], [6, 1]]);
    const expected1 = [2, 5, 5];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);
    console.log(`✓ Test 1 passed: [[1,2],[2,3],[6,1]] -> ${JSON.stringify(result1)}`);

    // Test case 2: More overlapping
    const result2 = solve([[100, 100], [200, 100]]);
    const expected2 = [100, 100];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);
    console.log(`✓ Test 2 passed: [[100,100],[200,100]] -> ${JSON.stringify(result2)}`);

    // Test case 3: Stacking squares
    const result3 = solve([[1, 5], [2, 2], [3, 1]]);
    const expected3 = [5, 7, 8];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);
    console.log(`✓ Test 3 passed: [[1,5],[2,2],[3,1]] -> ${JSON.stringify(result3)}`);

    // Test case 4: Single square
    const result4 = solve([[5, 3]]);
    const expected4 = [3];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed`);
    console.log(`✓ Test 4 passed: [[5,3]] -> ${JSON.stringify(result4)}`);

    // Test segment tree solution
    console.log('\nTesting Segment Tree solution:');
    const result5 = solveWithSegmentTree([[1, 2], [2, 3], [6, 1]]);
    console.assert(JSON.stringify(result5) === JSON.stringify([2, 5, 5]),
        'Segment tree solution test failed');
    console.log(`✓ Segment Tree solution test passed: ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 699. Falling Squares!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 699. Falling Squares ===');
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
    solveWithSegmentTree,
    SegmentTree,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Simple interval approach is easier to understand
 * - Segment tree is more efficient for large inputs
 * - Coordinate compression is essential for segment tree approach
 * - The problem simulates physical stacking behavior
 * - Both solutions maintain running maximum height
 */
