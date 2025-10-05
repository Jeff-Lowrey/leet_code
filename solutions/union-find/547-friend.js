I'll help you create a solution for the Friend Circles problem in JavaScript. I'll implement it using a Union-Find (Disjoint Set) data structure, which is particularly efficient for this type of problem.

```javascript
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
```

This implementation provides a solution to the Friend Circles problem using the Union-Find data structure. Here's a breakdown of the key components:

1. `UnionFind` class:
   - Implements the disjoint set data structure
   - Uses path compression and union by rank optimizations
   - Keeps track of the number of distinct sets

2. `findCircleNum` function:
   - Takes a friendship matrix as input
   - Uses UnionFind to group friends together
   - Returns the number of distinct friend circles

3. Optimizations:
   - Path compression in find operation
   - Union by rank to keep the tree balanced
   - Only iterates through half of the matrix (since it's symmetric)

4. Test cases:
   - Includes example test cases to demonstrate usage
   - Provides clear output formatting

The code handles edge cases (empty input, null input) and follows JavaScript best practices. The solution is efficient with a time complexity of O(N²*α(N)) where α is the inverse Ackermann function (which grows very slowly and is effectively constant for all practical values of N).

The code can be run directly or imported as a module in other files. The test cases demonstrate how the solution works with different input scenarios.