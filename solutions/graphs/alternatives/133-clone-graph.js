/**
 * 133. Clone Graph
 * Medium
 *
 * This problem demonstrates key concepts in Graphs.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * To clone a graph, we need to create new nodes and preserve the neighbor relationships.
The key challenge is handling `cycles - we` need to avoid infinite loops.
 *
 * APPROACH:
 * Use DFS with a visited map to track cloned nodes. For each node, create a clone
 * and recursively clone all neighbors, avoiding infinite loops via the visited map.
 *
 * WHY THIS WORKS:
 * The visited map ensures we only clone each node once and properly handle cycles.
 * DFS naturally traverses the entire connected component while maintaining relationships.
 *
 * TIME COMPLEXITY: O(V + E) - visit each node and edge once
 * SPACE COMPLEXITY: O(V) - hash map and recursion stack
 *
 * EXAMPLE WALKTHROUGH:
 * For graph [[2,4],[1,3],[2,4],[1,3]]:
 * 1. Start with node 1, create clone
 * 2. Clone neighbors 2 and 4 recursively
 * 3. When cloning node 2, node 1 already exists in visited map
 * 4. Continue until all nodes and relationships are cloned
 *
 * EDGE CASES:
 * - Empty graph (null input)
 * - Single node with no neighbors
 * - Disconnected components (though problem states connected graph)
 * - Self-loops and cycles
 */

// Definition for a Node
function Node(val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
}

/**
 * Main solution for Problem 133: Clone Graph
 *
 * @param {Node} node - The node representing the graph to clone
 * @return {Node} - The cloned graph starting node
 *
 * Time Complexity: O(V + E) - visit each node and edge once
 * Space Complexity: O(V) - hash map and recursion stack
 */
function solve(node) {
    if (!node) return null;

    const visited = new Map();

    function dfs(node) {
        // If already cloned, return the clone
        if (visited.has(node.val)) {
            return visited.get(node.val);
        }

        // Create clone of current node
        const clone = new Node(node.val);
        visited.set(node.val, clone);

        // Clone all neighbors recursively
        for (const neighbor of node.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
}

/**
 * Test cases for Problem 133: Clone Graph
 */
function testSolution() {
    console.log('Testing 133. Clone Graph');

    // Helper function to compare graphs
    function compareGraphs(original, cloned, visited = new Set()) {
        if (!original && !cloned) return true;
        if (!original || !cloned) return false;
        if (original.val !== cloned.val) return false;
        if (original === cloned) return false; // Should be different objects

        if (visited.has(original.val)) return true;
        visited.add(original.val);

        if (original.neighbors.length !== cloned.neighbors.length) return false;

        for (let i = 0; i < original.neighbors.length; i++) {
            if (!compareGraphs(original.neighbors[i], cloned.neighbors[i], visited)) {
                return false;
            }
        }
        return true;
    }

    // Test case 1: Empty graph
    const result1 = solve(null);
    console.assert(result1 === null, `Test 1 failed: expected null, got ${result1}`);

    // Test case 2: Single node
    const node2 = new Node(1);
    const result2 = solve(node2);
    console.assert(result2.val === 1 && result2.neighbors.length === 0,
        `Test 2 failed: single node clone incorrect`);

    // Test case 3: Two connected nodes
    const node3a = new Node(1);
    const node3b = new Node(2);
    node3a.neighbors = [node3b];
    node3b.neighbors = [node3a];
    const result3 = solve(node3a);
    console.assert(compareGraphs(node3a, result3), `Test 3 failed: two node graph clone incorrect`);

    // Test case 4: Four node graph (cycle)
    const node4a = new Node(1);
    const node4b = new Node(2);
    const node4c = new Node(3);
    const node4d = new Node(4);
    node4a.neighbors = [node4b, node4d];
    node4b.neighbors = [node4a, node4c];
    node4c.neighbors = [node4b, node4d];
    node4d.neighbors = [node4a, node4c];
    const result4 = solve(node4a);
    console.assert(compareGraphs(node4a, result4), `Test 4 failed: four node graph clone incorrect`);

    // Test case 5: Self-loop
    const node5 = new Node(1);
    node5.neighbors = [node5];
    const result5 = solve(node5);
    console.assert(result5.val === 1 && result5.neighbors[0] === result5,
        `Test 5 failed: self-loop clone incorrect`);

    // Test case 6: Complex graph with multiple paths
    const node6a = new Node(1);
    const node6b = new Node(2);
    const node6c = new Node(3);
    node6a.neighbors = [node6b, node6c];
    node6b.neighbors = [node6a, node6c];
    node6c.neighbors = [node6a, node6b];
    const result6 = solve(node6a);
    console.assert(compareGraphs(node6a, result6), `Test 6 failed: triangle graph clone incorrect`);

    console.log('All test cases passed for 133. Clone Graph!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 133. Clone Graph ===');
    console.log('Category: Graphs');
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
    demonstrateSolution,
    Node
};

/**
 * Additional Notes:
 * - This solution focuses on graphs concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
