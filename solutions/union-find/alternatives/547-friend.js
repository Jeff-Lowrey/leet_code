/**
 * 547. Friend
 * Medium
 *
 * Friend Circles - Solution using Union Find (Disjoint Set) data structure Time Complexity: O(N² α(N)) where α is the inverse Ackermann function Space Complexity: O(N)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Friend is to understand the core problem pattern
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
 * Friend Circles - Solution using Union Find (Disjoint Set) data structure
 * Time Complexity: O(N²*α(N)) where α is the inverse Ackermann function
 * Space Complexity: O(N)
 */

class UnionFind {
    constructor(size) {
        // Initialize parent array where each element is its own parent
        this.parent = Array(size).fill().map((_, i) => i);
        // Initialize rank array for union by rank optimization
        this.rank = Array(size).fill(0);
        // Keep track of number of distinct sets
        this.count = size;
    }

    /**
     * Find the root parent of an element with path compression
     * @param {number} x - The element to find the root parent for
     * @returns {number} - The root parent
     */
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    /**
     * Union two sets together
     * @param {number} x - First element
     * @param {number} y - Second element
     */
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX !== rootY) {
            // Union by rank
            if (this.rank[rootX] < this.rank[rootY]) {
                [rootX, rootY] = [rootY, rootX]; // Swap to ensure rootX has higher rank
            }
            this.parent[rootY] = rootX;
            if (this.rank[rootX] === this.rank[rootY]) {
                this.rank[rootX]++;
            }
            this.count--; // Decrease count when two sets are united
        }
    }

    /**
     * Get the number of distinct sets
     * @returns {number} - Number of distinct sets
     */
    getCount() {
        return this.count;
    }
}

/**
 * Find the number of friend circles in the given matrix
 * @param {number[][]} M - Friendship matrix where M[i][j] = 1 means i and j are friends
 * @returns {number} - Number of friend circles
 */
function findCircleNum(M) {
    if (!M || M.length === 0) return 0;
    
    const n = M.length;
    const uf = new UnionFind(n);

    // Iterate through the upper triangle of the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (M[i][j] === 1) {
                uf.union(i, j);
            }
        }
    }

    return uf.getCount();
}

// Example test cases
const testCases = [
    [
        [1,1,0],
        [1,1,0],
        [0,0,1]
    ],
    [
        [1,1,0],
        [1,1,1],
        [0,1,1]
    ]
];

// Run test cases
testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log('Input:', testCase);
    console.log('Output:', findCircleNum(testCase));
    console.log('---');
});

module.exports = {
    findCircleNum,
    UnionFind
};