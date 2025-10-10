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
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 310: Minimum Height Trees
 *
 * @param {number} n - Number of nodes in the tree
 * @param {number[][]} edges - Array of edges connecting nodes
 * @return {number[]} - Root nodes that result in minimum height trees
 *
 * Time Complexity: O(V + E) where V is n and E is edges.length
 * Space Complexity: O(V + E) for adjacency list
 */
function solve(n, edges) {
    // Edge case: single node
    if (n === 1) return [0];

    // Build adjacency list
    const graph = Array.from({ length: n }, () => []);
    const degree = new Array(n).fill(0);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
        degree[u]++;
        degree[v]++;
    }

    // Start with leaf nodes (degree = 1)
    let queue = [];
    for (let i = 0; i < n; i++) {
        if (degree[i] === 1) {
            queue.push(i);
        }
    }

    let remainingNodes = n;

    // Trim leaves layer by layer
    while (remainingNodes > 2) {
        const leavesCount = queue.length;
        remainingNodes -= leavesCount;
        const nextQueue = [];

        for (let i = 0; i < leavesCount; i++) {
            const leaf = queue[i];

            for (const neighbor of graph[leaf]) {
                degree[neighbor]--;
                if (degree[neighbor] === 1) {
                    nextQueue.push(neighbor);
                }
            }
        }

        queue = nextQueue;
    }

    // Remaining nodes are the centroids
    return queue.length > 0 ? queue : [0];
}

/**
 * Test cases for Problem 310: Minimum Height Trees
 */
function testSolution() {
    console.log('Testing 310. Minimum Height Trees');

    // Test case 1: Tree with 4 nodes
    const result1 = solve(4, [[1, 0], [1, 2], [1, 3]]);
    console.assert(JSON.stringify(result1.sort()) === JSON.stringify([1]),
                   `Test 1 failed: expected [1], got ${JSON.stringify(result1)}`);

    // Test case 2: Tree with 6 nodes - two centroids
    const result2 = solve(6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]);
    console.assert(JSON.stringify(result2.sort()) === JSON.stringify([3, 4]),
                   `Test 2 failed: expected [3,4], got ${JSON.stringify(result2)}`);

    // Test case 3: Single node
    const result3 = solve(1, []);
    console.assert(JSON.stringify(result3) === JSON.stringify([0]),
                   `Test 3 failed: expected [0], got ${JSON.stringify(result3)}`);

    // Test case 4: Two nodes
    const result4 = solve(2, [[0, 1]]);
    console.assert(JSON.stringify(result4.sort()) === JSON.stringify([0, 1]),
                   `Test 4 failed: expected [0,1], got ${JSON.stringify(result4)}`);

    console.log('All test cases passed for 310. Minimum Height Trees!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 310. Minimum ===');
    console.log('Category: Topological Sort');
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
 * - This solution focuses on topological sort concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
