/**
 * 200. Number Of Islands
 * Medium
 *
 * Number of Islands - Union Find Implementation Time Complexity: O(m n) where m is number of rows and n is number of columns Space Complexity: O(m n) for the parent array
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Number Of Islands is to understand the core problem pattern
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
 * Number of Islands - Union Find Implementation
 * Time Complexity: O(m*n) where m is number of rows and n is number of columns
 * Space Complexity: O(m*n) for the parent array
 */

class UnionFind {
    constructor(grid) {
        this.count = 0;
        const m = grid.length;
        const n = grid[0].length;
        
        // Initialize parent array and count islands
        this.parent = new Array(m * n);
        this.rank = new Array(m * n).fill(0);
        
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === '1') {
                    this.parent[i * n + j] = i * n + j;
                    this.count++;
                }
            }
        }
    }
    
    // Find parent with path compression
    find(i) {
        if (this.parent[i] !== i) {
            this.parent[i] = this.find(this.parent[i]);
        }
        return this.parent[i];
    }
    
    // Union by rank
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            this.count--;
        }
    }
    
    // Get number of islands
    getCount() {
        return this.count;
    }
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const m = grid.length;
    const n = grid[0].length;
    
    // Create UnionFind instance
    const uf = new UnionFind(grid);
    
    // Directions for adjacent cells
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    // Iterate through grid and union adjacent lands
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                // Mark current cell as visited
                grid[i][j] = '0';
                
                // Check all adjacent cells
                for (const [dx, dy] of directions) {
                    const newX = i + dx;
                    const newY = j + dy;
                    
                    // If adjacent cell is valid and is land, union them
                    if (newX >= 0 && newX < m && newY >= 0 && newY < n && 
                        grid[newX][newY] === '1') {
                        uf.union(i * n + j, newX * n + newY);
                    }
                }
            }
        }
    }
    
    return uf.getCount();
};

// Test cases
const test1 = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
];

const test2 = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
];

console.log("Test Case 1:", numIslands(test1)); // Expected output: 1
console.log("Test Case 2:", numIslands(test2)); // Expected output: 3

module.exports = {
    numIslands,
    UnionFind
};