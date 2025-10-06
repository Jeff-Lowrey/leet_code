/**
 * 323. Number Of Connected Components In An Undirected Graph
 * Medium
 *
 * Connected Components Union Implementation This implementation uses the Union-Find (Disjoint Set) data structure to efficiently handle connected components in an undirected graph.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Number Of Connected Components In An Undirected Graph is to understand the core problem pattern
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
 * Connected Components Union Implementation
 * This implementation uses the Union-Find (Disjoint Set) data structure
 * to efficiently handle connected components in an undirected graph.
 */

class UnionFind {
    /**
     * Initialize Union-Find data structure with n nodes
     * @param {number} n - Number of nodes
     */
    constructor(n) {
        this.parent = new Array(n);
        this.rank = new Array(n).fill(0);
        this.count = n; // Track number of components

        // Initialize each node as its own parent
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }
    }

    /**
     * Find the root/parent of a node with path compression
     * @param {number} x - Node to find parent of
     * @returns {number} Root parent of the node
     */
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    /**
     * Union two components together
     * @param {number} x - First node
     * @param {number} y - Second node
     * @returns {boolean} True if union was performed, false if already connected
     */
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX === rootY) {
            return false; // Already in the same component
        }

        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            [rootX, rootY] = [rootY, rootX]; // Swap to ensure rootX has higher rank
        }
        
        this.parent[rootY] = rootX;
        if (this.rank[rootX] === this.rank[rootY]) {
            this.rank[rootX]++;
        }

        this.count--; // Decrease number of components
        return true;
    }

    /**
     * Check if two nodes are connected
     * @param {number} x - First node
     * @param {number} y - Second node
     * @returns {boolean} True if nodes are connected, false otherwise
     */
    connected(x, y) {
        return this.find(x) === this.find(y);
    }

    /**
     * Get the current number of components
     * @returns {number} Number of components
     */
    getCount() {
        return this.count;
    }
}

/**
 * Solution class for handling graph connectivity problems
 */
class Solution {
    /**
     * Count the number of connected components in an undirected graph
     * @param {number} n - Number of nodes
     * @param {number[][]} edges - Array of edge connections
     * @returns {number} Number of connected components
     */
    countComponents(n, edges) {
        // Handle edge cases
        if (n <= 0) return 0;
        if (!edges || edges.length === 0) return n;

        // Initialize Union-Find structure
        const uf = new UnionFind(n);

        // Process all edges
        for (const [u, v] of edges) {
            uf.union(u, v);
        }

        return uf.getCount();
    }
}

// Example usage and test cases
function runTests() {
    const solution = new Solution();
    
    // Test Case 1
    console.log(solution.countComponents(5, [[0,1], [1,2], [3,4]])); // Expected: 2
    
    // Test Case 2
    console.log(solution.countComponents(5, [[0,1], [1,2], [2,3], [3,4]])); // Expected: 1
    
    // Test Case 3
    console.log(solution.countComponents(5, [])); // Expected: 5
    
    // Test Case 4
    console.log(solution.countComponents(1, [])); // Expected: 1
}

// Uncomment to run tests
// runTests();

module.exports = {
    Solution,
    UnionFind
};