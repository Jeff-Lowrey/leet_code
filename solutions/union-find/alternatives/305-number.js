/**
 * 305. Number
 * Medium
 *
 * Number Islands II - Dynamic Island Counter with Union Find Problem: Given an m x n 2D binary grid where each position is either water (0) or land (1), and a list of positions where land will be added, count the number of islands after each addition. @param {number} m - Number of rows @param {number} n - Number of columns @param {number[][]} positions - Array of positions where land will be added @return {number[]} - Array of island counts after each addition
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Number is to understand the core problem pattern
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
 * Number Islands II - Dynamic Island Counter with Union Find
 * 
 * Problem: Given an m x n 2D binary grid where each position is either water (0) 
 * or land (1), and a list of positions where land will be added, count the number 
 * of islands after each addition.
 * 
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @param {number[][]} positions - Array of positions where land will be added
 * @return {number[]} - Array of island counts after each addition
 */

class UnionFind {
    constructor() {
        this.parent = new Map();
        this.rank = new Map();
        this.count = 0;
    }

    /**
     * Adds a new node to the Union Find structure
     * @param {string} x - Node identifier
     */
    add(x) {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
            this.rank.set(x, 0);
            this.count++;
        }
    }

    /**
     * Finds the parent of a node with path compression
     * @param {string} x - Node identifier
     * @returns {string} Parent node identifier
     */
    find(x) {
        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.find(this.parent.get(x)));
        }
        return this.parent.get(x);
    }

    /**
     * Unions two nodes by rank
     * @param {string} x - First node
     * @param {string} y - Second node
     * @returns {boolean} Whether union was performed
     */
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank.get(rootX) < this.rank.get(rootY)) {
                [rootX, rootY] = [rootY, rootX];
            }
            this.parent.set(rootY, rootX);
            if (this.rank.get(rootX) === this.rank.get(rootY)) {
                this.rank.set(rootX, this.rank.get(rootX) + 1);
            }
            this.count--;
            return true;
        }
        return false;
    }

    /**
     * Returns the current count of disjoint sets
     * @returns {number} Count of disjoint sets
     */
    getCount() {
        return this.count;
    }
}

/**
 * Main function to solve Number Islands II problem
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @param {number[][]} positions - Array of positions where land will be added
 * @returns {number[]} Array of island counts after each addition
 */
function numIslands2(m, n, positions) {
    const uf = new UnionFind();
    const result = [];
    const grid = new Set();
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for (let [row, col] of positions) {
        const pos = `${row},${col}`;
        
        // Skip if position already exists
        if (grid.has(pos)) {
            result.push(uf.getCount());
            continue;
        }

        // Add new land position
        grid.add(pos);
        uf.add(pos);

        // Check adjacent positions
        for (let [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            const newPos = `${newRow},${newCol}`;

            // Connect if adjacent land exists
            if (newRow >= 0 && newRow < m && 
                newCol >= 0 && newCol < n && 
                grid.has(newPos)) {
                uf.union(pos, newPos);
            }
        }

        result.push(uf.getCount());
    }

    return result;
}

// Export the function for use in other modules
module.exports = numIslands2;

// Example usage:
/*
const m = 3;
const n = 3;
const positions = [[0,0], [0,1], [1,2], [2,1]];
console.log(numIslands2(m, n, positions)); // [1, 1, 2, 3]
*/