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
 *
 * **Step 1:** [description]
 *
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
 * Union-Find data structure with path compression and union by rank
 */
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n + 1}, (_, i) => i); // 1-indexed
        this.rank = new Array(n + 1).fill(0);
    }

    /**
     * Find root with path compression
     * @param {number} x
     * @returns {number} Root of x
     */
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    /**
     * Union by rank. Returns true if union occurred, false if already connected
     * @param {number} x
     * @param {number} y
     * @returns {boolean} True if union occurred, False if already connected
     */
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return false; // Already connected - would create cycle
        }

        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        return true;
    }
}

/**
 * Find redundant edge using Union-Find cycle detection
 * @param {number[][]} edges - List of edges [u, v] representing undirected graph
 * @returns {number[]} The redundant edge that creates a cycle
 *
 * Time Complexity: O(n × α(n)) where α is inverse Ackermann
 * Space Complexity: O(n) for Union-Find structure
 */
function findRedundantConnection(edges) {
    const n = edges.length;
    const uf = new UnionFind(n);

    for (const edge of edges) {
        const [u, v] = edge;

        // If nodes are already connected, this edge creates a cycle
        if (!uf.union(u, v)) {
            return edge;
        }
    }

    return []; // Should never reach here if input is valid
}

/**
 * Alternative DFS solution for comparison
 * @param {number[][]} edges - List of edges
 * @returns {number[]} The redundant edge
 */
function findRedundantConnectionDFS(edges) {
    const graph = new Map();

    /**
     * Check if path exists between source and target using DFS
     * @param {number} source
     * @param {number} target
     * @param {Set} visited
     * @returns {boolean}
     */
    function hasPath(source, target, visited) {
        if (source === target) {
            return true;
        }

        visited.add(source);

        for (const neighbor of (graph.get(source) || [])) {
            if (!visited.has(neighbor)) {
                if (hasPath(neighbor, target, visited)) {
                    return true;
                }
            }
        }

        return false;
    }

    for (const edge of edges) {
        const [u, v] = edge;

        // Check if u and v are already connected
        if (graph.has(u) && graph.has(v) && hasPath(u, v, new Set())) {
            return edge;
        }

        // Add edge to graph
        if (!graph.has(u)) {
            graph.set(u, []);
        }
        if (!graph.has(v)) {
            graph.set(v, []);
        }

        graph.get(u).push(v);
        graph.get(v).push(u);
    }

    return [];
}

/**
 * Test cases for Problem 684: Redundant Connection
 */
function testSolution() {
    console.log('Testing 684. Redundant Connection');

    // Test case 1: Simple triangle
    const edges1 = [[1,2],[1,3],[2,3]];
    const result1 = findRedundantConnection(edges1);
    const expected1 = [2,3]; // Last edge that creates cycle
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Larger cycle
    const edges2 = [[1,2],[2,3],[3,4],[1,4],[1,5]];
    const result2 = findRedundantConnection(edges2);
    const expected2 = [1,4]; // Edge that completes cycle 1-2-3-4-1
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Linear then cycle
    const edges3 = [[1,2],[2,3],[3,4],[2,5],[5,4]];
    const result3 = findRedundantConnection(edges3);
    const expected3 = [5,4]; // Creates cycle through 2-3-4-5-2
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Simple cycle at end
    const edges4 = [[1,2],[2,3],[1,3]];
    const result4 = findRedundantConnection(edges4);
    const expected4 = [1,3]; // Last edge creates triangle
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Complex graph
    const edges5 = [[2,7],[7,8],[3,6],[2,3],[6,7],[2,8],[1,8]];
    const result5 = findRedundantConnection(edges5);
    console.log(`Complex graph result: ${JSON.stringify(result5)}`);

    // Test DFS approach
    const result6 = findRedundantConnectionDFS(edges1);
    console.assert(JSON.stringify(result6) === JSON.stringify(expected1),
        `DFS test failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 684. Redundant Connection!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 684. Redundant Connection ===');
    console.log('Category: Union Find');
    console.log('Difficulty: Medium');
    console.log('');

    // Example 1
    console.log('Example 1: Simple triangle');
    const edges1 = [[1,2],[1,3],[2,3]];
    const result1 = findRedundantConnection(edges1);
    console.log(`findRedundantConnection(${JSON.stringify(edges1)}) -> ${JSON.stringify(result1)}`);
    console.log('Explanation: Forms triangle, [2,3] is the last edge\n');

    // Example 2
    console.log('Example 2: Larger cycle');
    const edges2 = [[1,2],[2,3],[3,4],[1,4],[1,5]];
    const result2 = findRedundantConnection(edges2);
    console.log(`findRedundantConnection(${JSON.stringify(edges2)}) -> ${JSON.stringify(result2)}`);
    console.log('Explanation: [1,4] completes cycle 1→2→3→4→1\n');

    // Example 3: Alternative approach
    console.log('Example 3: Using DFS approach');
    const result3 = findRedundantConnectionDFS(edges1);
    console.log(`findRedundantConnectionDFS(${JSON.stringify(edges1)}) -> ${JSON.stringify(result3)}`);
    console.log('Explanation: DFS detects existing path before adding edge\n');

    console.log('Key insights:');
    console.log('1. Tree with n nodes needs exactly n-1 edges');
    console.log('2. Extra edge creates exactly one cycle');
    console.log('3. Union-Find detects when nodes are already connected');
    console.log('4. First cycle-creating edge is the redundant one');
    console.log('5. Process edges in order for correct "last occurrence" behavior');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    findRedundantConnection,
    findRedundantConnectionDFS,
    UnionFind,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses Union-Find with path compression and union by rank
 * - Time complexity is nearly O(n) due to inverse Ackermann function
 * - Alternative DFS approach has O(V + E) complexity per edge check
 * - The problem reduces to detecting the first cycle-creating edge
 * - Essential insight: in a tree, any extra edge creates exactly one cycle
 */
