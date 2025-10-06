/**
 * 310. Minimum
 * Medium
 *
 * Find the roots of minimum height trees (MHT) in an undirected graph @param {number} n - Number of nodes in the graph (labeled from 0 to n-1) @param {number[][]} edges - Array of edges, where each edge is [node1, node2] @return {number[]} - Array of root nodes that result in minimum height trees
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Minimum is to understand the core problem pattern
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
 * Find the roots of minimum height trees (MHT) in an undirected graph
 * @param {number} n - Number of nodes in the graph (labeled from 0 to n-1)
 * @param {number[][]} edges - Array of edges, where each edge is [node1, node2]
 * @return {number[]} - Array of root nodes that result in minimum height trees
 */
function findMinHeightTrees(n, edges) {
    // Handle edge cases
    if (n === 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    // Create adjacency list representation of the graph
    const adjList = new Array(n).fill(0).map(() => new Set());
    
    // Build the adjacency list from edges
    for (const [u, v] of edges) {
        adjList[u].add(v);
        adjList[v].add(u);
    }

    // Start with leaves (nodes with only one neighbor)
    let leaves = [];
    for (let i = 0; i < n; i++) {
        if (adjList[i].size === 1) {
            leaves.push(i);
        }
    }

    // Keep removing leaves until we reach the center(s)
    let remainingNodes = n;
    while (remainingNodes > 2) {
        remainingNodes -= leaves.length;
        const newLeaves = [];

        // Process current leaves
        for (const leaf of leaves) {
            // Get the neighbor of current leaf
            const neighbor = Array.from(adjList[leaf])[0];
            // Remove the leaf from neighbor's adjacency list
            adjList[neighbor].delete(leaf);
            // If neighbor becomes a leaf, add it to new leaves
            if (adjList[neighbor].size === 1) {
                newLeaves.push(neighbor);
            }
        }

        // Update leaves for next iteration
        leaves = newLeaves;
    }

    return leaves;
}

/**
 * Helper function to test the implementation
 * @param {number} n - Number of nodes
 * @param {number[][]} edges - Array of edges
 */
function testMHT(n, edges) {
    console.log(`Input: n = ${n}, edges = ${JSON.stringify(edges)}`);
    const result = findMinHeightTrees(n, edges);
    console.log(`Output: ${JSON.stringify(result)}\n`);
}

// Test cases
function runTests() {
    // Test Case 1
    testMHT(4, [[1,0],[1,2],[1,3]]);
    
    // Test Case 2
    testMHT(6, [[3,0],[3,1],[3,2],[3,4],[5,4]]);
    
    // Test Case 3
    testMHT(1, []);
    
    // Test Case 4
    testMHT(2, [[0,1]]);
}

// Run the tests
runTests();

module.exports = {
    findMinHeightTrees
};