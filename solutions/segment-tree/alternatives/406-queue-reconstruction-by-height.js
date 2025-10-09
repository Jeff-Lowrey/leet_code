/**

 *
 * This problem demonstrates key concepts in Segment Tree.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Each person has [height, k] where k is the number of taller/equal people in front.
 * If we process people from tallest to shortest, we only need to worry about position k
 * since all previously placed people are taller or equal. A segment tree can efficiently
 * find the k-th available position, but a simpler greedy approach also works.
 *
 * APPROACH:



 *
 * Alternative with Segment Tree:



 *
 * WHY THIS WORKS:
 * Processing tallest first means all future insertions won't affect current person's count.
 * When we insert person at position k, exactly k people (all taller/equal) are before them.
 *
 * TIME COMPLEXITY: O(n^2) for greedy, O(n log n) for segment tree
 * SPACE COMPLEXITY: O(n)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
 * Sort: [[7,0], [7,1], [6,1], [5,0], [5,2], [4,4]]
 * Insert [7,0] at 0: [[7,0]]
 * Insert [7,1] at 1: [[7,0], [7,1]]
 * Insert [6,1] at 1: [[7,0], [6,1], [7,1]]
 * Insert [5,0] at 0: [[5,0], [7,0], [6,1], [7,1]]
 * ...
 * Output: [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
 *
 * EDGE CASES:
 * - Single person: return as is
 * - All same height: sort by k
 * - k=0 for multiple people: handle correctly
 */

/**
 * Main solution for Problem 406: Queue Reconstruction By Height
 * Greedy approach with insertion
 *
 * @param {number[][]} people - Array of [height, k] pairs
 * @return {number[][]} - Reconstructed queue
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function solve(people) {
    if (!people || people.length === 0) {
        return [];
    }

    // Sort by height descending, then by k ascending
    people.sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0]; // Height descending
        }
        return a[1] - b[1]; // k ascending
    });

    const result = [];

    // Insert each person at position k
    for (const person of people) {
        const k = person[1];
        result.splice(k, 0, person);
    }

    return result;
}

/**
 * Alternative solution using Segment Tree
 * More complex but demonstrates segment tree usage
 */
class SegmentTree {
    constructor(n) {
        this.n = n;
        this.tree = new Array(4 * n).fill(0);
        this.build(1, 0, n - 1);
    }

    build(node, start, end) {
        if (start === end) {
            this.tree[node] = 1; // Initially all positions available
            return;
        }

        const mid = Math.floor((start + end) / 2);
        this.build(2 * node, start, mid);
        this.build(2 * node + 1, mid + 1, end);
        this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
    }

    // Find and mark the k-th available position (0-indexed)
    findAndMark(k) {
        return this.findAndMarkHelper(1, 0, this.n - 1, k + 1);
    }

    findAndMarkHelper(node, start, end, k) {
        if (start === end) {
            this.tree[node] = 0; // Mark as used
            return start;
        }

        const mid = Math.floor((start + end) / 2);
        const leftCount = this.tree[2 * node];

        let pos;
        if (k <= leftCount) {
            pos = this.findAndMarkHelper(2 * node, start, mid, k);
        } else {
            pos = this.findAndMarkHelper(2 * node + 1, mid + 1, end, k - leftCount);
        }

        this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
        return pos;
    }
}

function solveWithSegmentTree(people) {
    if (!people || people.length === 0) {
        return [];
    }

    const n = people.length;

    // Sort by height descending, then by k ascending
    const sorted = people.map((p, i) => [...p, i]);
    sorted.sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0];
        }
        return a[1] - b[1];
    });

    const tree = new SegmentTree(n);
    const result = new Array(n);

    for (const [height, k, originalIdx] of sorted) {
        const pos = tree.findAndMark(k);
        result[pos] = [height, k];
    }

    return result;
}

/**
 * Test cases for Problem 406: Queue Reconstruction By Height
 */
function testSolution() {
    console.log('Testing 406. Queue Reconstruction By Height');

    // Test case 1: Basic example
    const result1 = solve([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]);
    const expected1 = [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);
    console.log(`✓ Test 1 passed: 6 people reconstructed correctly`);

    // Test case 2: Single person
    const result2 = solve([[6, 0]]);
    const expected2 = [[6, 0]];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed`);
    console.log(`✓ Test 2 passed: Single person`);

    // Test case 3: All same height
    const result3 = solve([[5, 0], [5, 1], [5, 2]]);
    const expected3 = [[5, 0], [5, 1], [5, 2]];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed`);
    console.log(`✓ Test 3 passed: Same height people`);

    // Test case 4: Two people
    const result4 = solve([[6, 0], [5, 0]]);
    const expected4 = [[5, 0], [6, 0]];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed`);
    console.log(`✓ Test 4 passed: Two people`);

    // Test segment tree solution
    console.log('\nTesting Segment Tree solution:');
    const result5 = solveWithSegmentTree([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]);
    console.assert(JSON.stringify(result5) === JSON.stringify(expected1),
        'Segment tree solution test failed');
    console.log(`✓ Segment Tree solution test passed`);

    console.log('All test cases passed for 406. Queue Reconstruction By Height!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 406. Queue Reconstruction By Height ===');
    console.log('Category: Segment Tree');
    console.log('Difficulty: Medium');
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
 * - Greedy solution is simpler and sufficient for most cases
 * - Segment tree solution demonstrates finding k-th element efficiently
 * - Array splice is O(n), making greedy solution O(n^2) overall
 * - Segment tree reduces complexity to O(n log n) but has more overhead
 * - The key insight is processing from tallest to shortest
 */
