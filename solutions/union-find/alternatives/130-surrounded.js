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
 * **Step 1:** [description]
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

class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false;

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

    isConnected(x, y) {
        return this.find(x) === this.find(y);
    }
}

/**
 * Main solution for Problem 130: Surrounded Regions
 *
 * @param {character[][]} board - 2D board of 'X' and 'O'
 * @return {void} - Modifies board in-place
 *
 * Time Complexity: O(m * n * α(m*n))
 * Space Complexity: O(m * n)
 */
function solve(board) {
    if (!board || board.length === 0 || board[0].length === 0) return;

    const m = board.length;
    const n = board[0].length;
    const dummyNode = m * n; // Extra node for border-connected regions

    const uf = new UnionFind(m * n + 1);

    // Helper to convert 2D coordinates to 1D index
    const getIndex = (row, col) => row * n + col;

    // Directions for adjacent cells (up, down, left, right)
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // Process all cells
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') {
                const currentIndex = getIndex(i, j);

                // If on border, union with dummy node
                if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
                    uf.union(currentIndex, dummyNode);
                }

                // Union with adjacent 'O' cells
                for (const [di, dj] of directions) {
                    const ni = i + di;
                    const nj = j + dj;

                    if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj] === 'O') {
                        uf.union(currentIndex, getIndex(ni, nj));
                    }
                }
            }
        }
    }

    // Flip 'O's that are not connected to border (dummy node)
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O' && !uf.isConnected(getIndex(i, j), dummyNode)) {
                board[i][j] = 'X';
            }
        }
    }
}

/**
 * Test cases for Problem 130: Surrounded Regions
 */
function testSolution() {
    console.log('Testing 130. Surrounded Regions');

    // Helper to compare 2D arrays
    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Example from LeetCode
    const board1 = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
    solve(board1);
    const expected1 = [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]];
    console.assert(arraysEqual(board1, expected1), `Test 1 failed`);
    console.log('Test 1 passed');

    // Test case 2: Single cell
    const board2 = [["X"]];
    solve(board2);
    const expected2 = [["X"]];
    console.assert(arraysEqual(board2, expected2), `Test 2 failed`);
    console.log('Test 2 passed');

    // Test case 3: All O's on border
    const board3 = [["O","O","O"],["O","O","O"],["O","O","O"]];
    solve(board3);
    const expected3 = [["O","O","O"],["O","O","O"],["O","O","O"]];
    console.assert(arraysEqual(board3, expected3), `Test 3 failed`);
    console.log('Test 3 passed');

    // Test case 4: Surrounded region
    const board4 = [["X","X","X"],["X","O","X"],["X","X","X"]];
    solve(board4);
    const expected4 = [["X","X","X"],["X","X","X"],["X","X","X"]];
    console.assert(arraysEqual(board4, expected4), `Test 4 failed`);
    console.log('Test 4 passed');

    // Test case 5: Complex pattern
    const board5 = [["O","X","X","O","X"],["X","O","O","X","O"],["X","O","X","O","X"],["O","X","O","O","O"],["X","X","O","X","O"]];
    solve(board5);
    const expected5 = [["O","X","X","O","X"],["X","X","X","X","O"],["X","X","X","O","X"],["O","X","O","O","O"],["X","X","O","X","O"]];
    console.assert(arraysEqual(board5, expected5), `Test 5 failed`);
    console.log('Test 5 passed');

    console.log('All test cases passed for 130. Surrounded Regions!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 130. Surrounded ===');
    console.log('Category: Union Find');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on union find concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
