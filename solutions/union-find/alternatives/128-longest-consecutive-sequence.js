/**
 * 128. Longest Consecutive Sequence
 * Medium
 *
 * Union-Find data structure implementation for finding longest consecutive sequence File: UF-128-JS_longest_consecutive_union___javascript_implementation.js
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Longest Consecutive Sequence is to understand the core problem pattern
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
 * Union-Find data structure implementation for finding longest consecutive sequence
 * File: UF-128-JS_longest_consecutive_union___javascript_implementation.js
 */

class UnionFind {
    constructor() {
        this.parent = new Map();
        this.rank = new Map();
        this.size = new Map();
    }

    /**
     * Finds the parent of a node with path compression
     * @param {number} x - The node to find parent for
     * @returns {number} - The parent node
     */
    find(x) {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
            this.rank.set(x, 0);
            this.size.set(x, 1);
            return x;
        }

        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.find(this.parent.get(x)));
        }
        return this.parent.get(x);
    }

    /**
     * Unions two sets together
     * @param {number} x - First number
     * @param {number} y - Second number
     */
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank.get(rootX) < this.rank.get(rootY)) {
                [rootX, rootY] = [rootY, rootX];
            }
            this.parent.set(rootY, rootX);
            this.size.set(rootX, this.size.get(rootX) + this.size.get(rootY));
            
            if (this.rank.get(rootX) === this.rank.get(rootY)) {
                this.rank.set(rootX, this.rank.get(rootX) + 1);
            }
        }
    }

    /**
     * Gets the size of the set containing x
     * @param {number} x - The number to get set size for
     * @returns {number} - Size of the set
     */
    getSize(x) {
        return this.size.get(this.find(x));
    }
}

/**
 * Finds the longest consecutive sequence in an array
 * @param {number[]} nums - Array of numbers
 * @returns {number} - Length of longest consecutive sequence
 */
function longestConsecutive(nums) {
    if (!nums || nums.length === 0) return 0;
    
    const uf = new UnionFind();
    const numSet = new Set(nums);
    
    // Union consecutive numbers
    for (const num of numSet) {
        if (numSet.has(num + 1)) {
            uf.union(num, num + 1);
        }
    }
    
    // Find the largest set
    let maxLength = 1;
    for (const num of numSet) {
        maxLength = Math.max(maxLength, uf.getSize(num));
    }
    
    return maxLength;
}

// Example usage and test cases
function runTests() {
    const testCases = [
        [100, 4, 200, 1, 3, 2],          // Expected: 4 (1,2,3,4)
        [0, 3, 7, 2, 5, 8, 4, 6, 1],     // Expected: 9 (0,1,2,3,4,5,6,7,8)
        [],                               // Expected: 0
        [1],                              // Expected: 1
        [1, 2, 4, 8, 16, 32],            // Expected: 2 (1,2)
    ];

    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`);
        console.log(`Input: [${test}]`);
        console.log(`Output: ${longestConsecutive(test)}`);
        console.log('---');
    });
}

// Run the tests
runTests();

// Export for external use
module.exports = {
    longestConsecutive,
    UnionFind
};