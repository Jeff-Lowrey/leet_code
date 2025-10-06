/**
 * 133. Clone Graph
 * Medium
 *
 * Definition for a Node. function Node(val, neighbors) { this.val = val === undefined ? 0 : val; this.neighbors = neighbors === undefined ? [] : neighbors; };
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Clone Graph is to understand the core problem pattern
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
 * Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * Clone Graph - Creates a deep copy of a connected undirected graph
 * @param {Node} node - The root node of the graph to be cloned
 * @return {Node} - The root node of the cloned graph
 */
function cloneGraph(node) {
    // Handle edge case: if input node is null
    if (!node) {
        return null;
    }

    // Map to store visited nodes and their clones
    // Key: original node, Value: cloned node
    const visited = new Map();

    /**
     * Helper function to perform DFS and create clones
     * @param {Node} currentNode - Current node being processed
     * @return {Node} - Cloned node
     */
    function dfs(currentNode) {
        // If node has already been cloned, return its clone
        if (visited.has(currentNode)) {
            return visited.get(currentNode);
        }

        // Create new node with same value
        const cloneNode = new Node(currentNode.val);
        
        // Add to visited map before processing neighbors
        // This prevents infinite loops in cyclic graphs
        visited.set(currentNode, cloneNode);

        // Process all neighbors
        for (const neighbor of currentNode.neighbors) {
            // Recursively clone neighbors and add them to the clone's neighbor list
            cloneNode.neighbors.push(dfs(neighbor));
        }

        return cloneNode;
    }

    // Start DFS from the input node
    return dfs(node);
}

/**
 * Node class definition (for reference)
 */
class Node {
    constructor(val, neighbors) {
        this.val = val === undefined ? 0 : val;
        this.neighbors = neighbors === undefined ? [] : neighbors;
    }
}

/**
 * Example usage:
 * 
 * // Create test graph
 * const node1 = new Node(1);
 * const node2 = new Node(2);
 * const node3 = new Node(3);
 * const node4 = new Node(4);
 * 
 * node1.neighbors = [node2, node4];
 * node2.neighbors = [node1, node3];
 * node3.neighbors = [node2, node4];
 * node4.neighbors = [node1, node3];
 * 
 * const clonedGraph = cloneGraph(node1);
 */

// Export the function for use in other modules
module.exports = cloneGraph;