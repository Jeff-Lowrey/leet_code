/**
 * 684. Redundant Connection
 * Medium
 *
 * Redundant Connection Union Implementation LeetCode 684: Find the redundant connection in an undirected graph The problem involves finding an edge that can be removed to make a graph a tree (no cycles). If there are multiple answers, return the last edge that appears in the input.
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
 * Redundant Connection Union Implementation
 * LeetCode 684: Find the redundant connection in an undirected graph
 * 
 * The problem involves finding an edge that can be removed to make a graph
 * a tree (no cycles). If there are multiple answers, return the last edge
 * that appears in the input.
 */

/**
 * Union-Find data structure implementation
 */
class UnionFind {
    constructor(size) {
        // Initialize parent array where each element is its own parent
        this.parent = Array(size).fill(0).map((_, i) => i);
        // Initialize rank array for union by rank optimization
        this.rank = Array(size).fill(0);
    }

    /**
     * Find the root parent of an element with path compression
     * @param {number} x - The element to find the parent for
     * @returns {number} The root parent of the element
     */
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    /**
     * Union two elements by rank
     * @param {number} x - First element
     * @param {number} y - Second element
     * @returns {boolean} True if union was successful, false if already connected
     */
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX === rootY) {
            return false; // Already connected
        }

        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            [rootX, rootY] = [rootY, rootX]; // Swap to ensure rootX has higher rank
        }
        
        this.parent[rootY] = rootX;
        if (this.rank[rootX] === this.rank[rootY]) {
            this.rank[rootX]++;
        }

        return true;
    }
}

/**
 * Find the redundant connection in the graph
 * @param {number[][]} edges - Array of edges where each edge is [u, v]
 * @returns {number[]} The redundant edge
 */
function findRedundantConnection(edges) {
    const uf = new UnionFind(edges.length + 1);
    
    // Process each edge
    for (const [u, v] of edges) {
        // If we can't union these vertices, we've found our redundant connection
        if (!uf.union(u, v)) {
            return [u, v];
        }
    }
    
    return []; // Should never reach here given problem constraints
}

// Example usage and test cases
function runTests() {
    const testCases = [
        [[1,2], [1,3], [2,3]],
        [[1,2], [2,3], [3,4], [1,4], [1,5]],
        [[1,2], [2,3], [3,4], [4,1], [1,5]]
    ];

    for (let i = 0; i < testCases.length; i++) {
        console.log(`Test case ${i + 1}:`);
        console.log('Input:', testCases[i]);
        console.log('Output:', findRedundantConnection(testCases[i]));
        console.log('---');
    }
}

// Run tests if not being imported as a module
if (require.main === module) {
    runTests();
}

// Export for testing
module.exports = {
    findRedundantConnection,
    UnionFind
};