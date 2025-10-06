/**
 * 684. Redundant Connection
 * Medium
 *
 * Redundant Connection - Find the last edge that creates a cycle in an undirected graph @param {number[][]} edges - Array of edges where each edge is [u, v] representing connection between nodes u and v @return {number[]} - Returns the last edge that can be removed to make the graph a tree
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Redundant Connection is to understand the core problem pattern
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
 * Redundant Connection - Find the last edge that creates a cycle in an undirected graph
 * 
 * @param {number[][]} edges - Array of edges where each edge is [u, v] representing connection between nodes u and v
 * @return {number[]} - Returns the last edge that can be removed to make the graph a tree
 */

const findRedundantConnection = function(edges) {
    // Create parent array for Union-Find data structure
    const parent = Array(edges.length + 1).fill(0);
    
    // Initialize each node as its own parent
    for (let i = 1; i <= edges.length; i++) {
        parent[i] = i;
    }
    
    /**
     * Find the root parent of a node using path compression
     * @param {number} node - The node to find the parent for
     * @return {number} - The root parent of the node
     */
    const find = (node) => {
        if (parent[node] !== node) {
            parent[node] = find(parent[node]); // Path compression
        }
        return parent[node];
    };
    
    /**
     * Union two nodes by setting one's parent as the other's root
     * @param {number} node1 - First node
     * @param {number} node2 - Second node
     * @return {boolean} - Returns true if union was successful, false if nodes were already connected
     */
    const union = (node1, node2) => {
        const parent1 = find(node1);
        const parent2 = find(node2);
        
        // If nodes already have same parent, they're already connected
        if (parent1 === parent2) {
            return false;
        }
        
        // Union the nodes by setting parent2 as parent of parent1
        parent[parent1] = parent2;
        return true;
    };
    
    // Process each edge
    for (const [u, v] of edges) {
        // If union returns false, we found a redundant connection
        if (!union(u, v)) {
            return [u, v];
        }
    }
    
    // This line should never be reached given the problem constraints
    return [];
};

// Example test cases
const testCases = [
    [[1,2], [1,3], [2,3]],
    [[1,2], [2,3], [3,4], [1,4], [1,5]],
];

// Run test cases
testCases.forEach((test, index) => {
    console.log(`Test case ${index + 1}:`);
    console.log('Input:', test);
    console.log('Output:', findRedundantConnection(test));
    console.log('---');
});

module.exports = {
    findRedundantConnection
};