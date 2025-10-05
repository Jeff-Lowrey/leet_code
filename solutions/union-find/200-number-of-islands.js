I'll help you create a solution for the Number Islands Union problem using JavaScript. This implementation will use the Union-Find data structure to count the number of islands in a 2D grid.

```javascript
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
```

This implementation includes:

1. A `UnionFind` class that implements the Union-Find data structure with path compression and union by rank optimizations.

2. The main `numIslands` function that:
   - Handles edge cases (empty grid)
   - Creates a UnionFind instance
   - Iterates through the grid
   - Unions adjacent land cells
   - Returns the count of distinct islands

3. Key features:
   - Path compression in the find operation
   - Union by rank optimization
   - Efficient grid traversal
   - Clear handling of directions and boundaries

4. Test cases to verify the implementation

5. Proper exports for module usage

The solution efficiently handles the problem of counting islands in a grid by using the Union-Find data structure, which provides near-constant time operations for union and find operations.

The time complexity is O(m*n) where m is the number of rows and n is the number of columns in the grid. The space complexity is also O(m*n) for storing the parent and rank arrays.