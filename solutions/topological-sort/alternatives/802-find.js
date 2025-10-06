/**
 * 802. Find
 * Medium
 *
 * Find Eventual Safe States Problem: Given a directed graph, find all safe nodes. A node is safe if all possible paths starting from that node lead to a terminal node. A terminal node is a node with no outgoing edges. @param {number[][]} graph - The input graph represented as an adjacency list @return {number[]} - Array of safe nodes in ascending order
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find is to understand the core problem pattern
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
 * Find Eventual Safe States
 * 
 * Problem: Given a directed graph, find all safe nodes.
 * A node is safe if all possible paths starting from that node lead to a terminal node.
 * A terminal node is a node with no outgoing edges.
 * 
 * @param {number[][]} graph - The input graph represented as an adjacency list
 * @return {number[]} - Array of safe nodes in ascending order
 */

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
const eventualSafeNodes = function(graph) {
    // Create array to track node states
    // 0: unvisited, 1: visiting, 2: safe
    const state = new Array(graph.length).fill(0);
    const result = [];

    /**
     * DFS helper function to detect if a node is safe
     * @param {number} node - Current node being visited
     * @return {boolean} - Whether the node is safe
     */
    const isSafe = (node) => {
        // If node is being visited, we found a cycle
        if (state[node] === 1) return false;
        // If node has been fully visited, return its safety status
        if (state[node] === 2) return true;

        // Mark node as being visited
        state[node] = 1;

        // Check all neighbors
        for (const neighbor of graph[node]) {
            // If any neighbor leads to an unsafe path, current node is unsafe
            if (!isSafe(neighbor)) {
                return false;
            }
        }

        // Mark node as safe
        state[node] = 2;
        return true;
    };

    // Check each node in the graph
    for (let i = 0; i < graph.length; i++) {
        if (isSafe(i)) {
            result.push(i);
        }
    }

    return result;
};

// Example usage and test cases
function runTests() {
    const testCases = [
        // Test case 1: Simple graph with safe nodes
        [[1,2], [2,3], [5], [0], [5], [], []],
        
        // Test case 2: Graph with cycle
        [[1,2,3,4], [1,2], [3,4], [0,4], []],
        
        // Test case 3: Empty graph
        [],
        
        // Test case 4: Single node graph
        [[]]
    ];

    for (let i = 0; i < testCases.length; i++) {
        console.log(`Test case ${i + 1}:`);
        console.log('Input:', testCases[i]);
        console.log('Output:', eventualSafeNodes(testCases[i]));
        console.log('---');
    }
}

// Run tests if not in production
if (process.env.NODE_ENV !== 'production') {
    runTests();
}

module.exports = eventualSafeNodes;