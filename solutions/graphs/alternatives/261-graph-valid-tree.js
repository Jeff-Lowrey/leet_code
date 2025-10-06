/**
 * 261. Graph Valid Tree
 * Medium
 *
 * Graph Valid Tree - JavaScript Implementation Problem: Given n nodes labeled from 0 to n-1 and a list of undirected edges, determine if these edges form a valid tree. A valid tree has: 1. No cycles 2. All nodes are connected 3. Number of edges = number of nodes - 1
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Graph Valid Tree is to understand the core problem pattern
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
 * Graph Valid Tree - JavaScript Implementation
 * 
 * Problem: Given n nodes labeled from 0 to n-1 and a list of undirected edges,
 * determine if these edges form a valid tree.
 * 
 * A valid tree has:
 * 1. No cycles
 * 2. All nodes are connected
 * 3. Number of edges = number of nodes - 1
 */

/**
 * Determines if a graph is a valid tree
 * @param {number} n - Number of nodes
 * @param {number[][]} edges - Array of edge pairs
 * @return {boolean} - True if the graph forms a valid tree, false otherwise
 */
function validTree(n, edges) {
    // Quick check: A tree must have n-1 edges
    if (edges.length !== n - 1) return false;

    // Create adjacency list representation of the graph
    const adjList = new Map();
    for (let i = 0; i < n; i++) {
        adjList.set(i, []);
    }

    // Build the adjacency list
    for (const [u, v] of edges) {
        adjList.get(u).push(v);
        adjList.get(v).push(u);
    }

    // Set to keep track of visited nodes
    const visited = new Set();

    /**
     * DFS helper function to detect cycles and check connectivity
     * @param {number} node - Current node
     * @param {number} parent - Parent node
     * @return {boolean} - True if no cycle is found
     */
    function dfs(node, parent) {
        visited.add(node);

        // Check all neighbors
        for (const neighbor of adjList.get(node)) {
            // Skip the parent node
            if (neighbor === parent) continue;

            // If we've already visited this neighbor, we found a cycle
            if (visited.has(neighbor)) return false;

            // Recursively check the neighbor
            if (!dfs(neighbor, node)) return false;
        }

        return true;
    }

    // Start DFS from node 0
    if (!dfs(0, -1)) return false;

    // Check if all nodes are connected
    // If the graph is a valid tree, we should have visited all nodes
    return visited.size === n;
}

// Test cases
function runTests() {
    const testCases = [
        {
            n: 5,
            edges: [[0,1], [0,2], [0,3], [1,4]],
            expected: true
        },
        {
            n: 5,
            edges: [[0,1], [1,2], [2,3], [1,3], [1,4]],
            expected: false
        },
        {
            n: 4,
            edges: [[0,1], [2,3]],
            expected: false
        },
        {
            n: 1,
            edges: [],
            expected: true
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const { n, edges, expected } = testCases[i];
        const result = validTree(n, edges);
        console.log(`Test case ${i + 1}:`);
        console.log(`Input: n = ${n}, edges = ${JSON.stringify(edges)}`);
        console.log(`Expected: ${expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    }
}

// Run the tests
runTests();

// Export the function for use in other modules
module.exports = validTree;