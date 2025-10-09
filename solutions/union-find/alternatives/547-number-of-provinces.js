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
 * Union-Find data structure for tracking connected components
 */
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.components = n;
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
     * Union by rank. Returns true if union occurred
     * @param {number} x
     * @param {number} y
     * @returns {boolean} True if union occurred
     */
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return false; // Already connected
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

        this.components--;
        return true;
    }
}

/**
 * Find number of provinces using Union-Find
 * @param {number[][]} isConnected - n x n adjacency matrix where isConnected[i][j] = 1 means city i and city j are directly connected
 * @returns {number} Number of provinces (connected components)
 *
 * Time Complexity: O(n² × α(n)) where α is inverse Ackermann
 * Space Complexity: O(n) for Union-Find structure
 */
function findCircleNum(isConnected) {
    const n = isConnected.length;
    const uf = new UnionFind(n);

    // Process all connections
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) { // Only check upper triangle (symmetric matrix)
            if (isConnected[i][j] === 1) {
                uf.union(i, j);
            }
        }
    }

    return uf.components;
}

/**
 * Alternative DFS solution
 * @param {number[][]} isConnected - Adjacency matrix
 * @returns {number} Number of provinces
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(n) for visited array and recursion stack
 */
function findCircleNumDFS(isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false);
    let provinces = 0;

    /**
     * Mark all cities in current province as visited
     * @param {number} city
     */
    function dfs(city) {
        visited[city] = true;
        for (let neighbor = 0; neighbor < n; neighbor++) {
            if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }

    // Find all provinces
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            // Found a new province
            dfs(i);
            provinces++;
        }
    }

    return provinces;
}

/**
 * Alternative BFS solution
 * @param {number[][]} isConnected - Adjacency matrix
 * @returns {number} Number of provinces
 */
function findCircleNumBFS(isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false);
    let provinces = 0;

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            // Start BFS for new province
            const queue = [i];
            visited[i] = true;

            while (queue.length > 0) {
                const city = queue.shift();
                for (let neighbor = 0; neighbor < n; neighbor++) {
                    if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
                        visited[neighbor] = true;
                        queue.push(neighbor);
                    }
                }
            }

            provinces++;
        }
    }

    return provinces;
}

/**
 * Test cases for Problem 547: Number of Provinces
 */
function testSolution() {
    console.log('Testing 547. Number of Provinces');

    // Test case 1: Two provinces
    const isConnected1 = [[1,1,0],[1,1,0],[0,0,1]];
    const result1 = findCircleNum(isConnected1);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Three provinces (all isolated)
    const isConnected2 = [[1,0,0],[0,1,0],[0,0,1]];
    const result2 = findCircleNum(isConnected2);
    const expected2 = 3;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: One province (all connected)
    const isConnected3 = [[1,1,1],[1,1,1],[1,1,1]];
    const result3 = findCircleNum(isConnected3);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single city
    const isConnected4 = [[1]];
    const result4 = findCircleNum(isConnected4);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Complex connections
    const isConnected5 = [[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]];
    const result5 = findCircleNum(isConnected5);
    const expected5 = 1; // All cities are connected through paths
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test DFS approach
    const result6 = findCircleNumDFS(isConnected1);
    console.assert(result6 === expected1, `DFS test failed: expected ${expected1}, got ${result6}`);

    // Test BFS approach
    const result7 = findCircleNumBFS(isConnected1);
    console.assert(result7 === expected1, `BFS test failed: expected ${expected1}, got ${result7}`);

    console.log('All test cases passed for 547. Number of Provinces!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 547. Number of Provinces ===');
    console.log('Category: Union Find');
    console.log('Difficulty: Medium');
    console.log('');

    // Example 1: Two provinces
    console.log('Example 1: Two provinces');
    const isConnected1 = [[1,1,0],[1,1,0],[0,0,1]];
    const result1 = findCircleNum(isConnected1);
    console.log(`findCircleNum(${JSON.stringify(isConnected1)}) -> ${result1}`);
    console.log('Explanation: Cities 0 and 1 form one province, city 2 forms another\n');

    // Example 2: Three isolated cities
    console.log('Example 2: Three isolated cities');
    const isConnected2 = [[1,0,0],[0,1,0],[0,0,1]];
    const result2 = findCircleNum(isConnected2);
    console.log(`findCircleNum(${JSON.stringify(isConnected2)}) -> ${result2}`);
    console.log('Explanation: Each city is its own province\n');

    // Example 3: All connected
    console.log('Example 3: All connected');
    const isConnected3 = [[1,1,1],[1,1,1],[1,1,1]];
    const result3 = findCircleNum(isConnected3);
    console.log(`findCircleNum(${JSON.stringify(isConnected3)}) -> ${result3}`);
    console.log('Explanation: All cities form one big province\n');

    // Compare different approaches
    console.log('Algorithm comparison:');
    const approaches = [
        ['Union-Find', findCircleNum],
        ['DFS', findCircleNumDFS],
        ['BFS', findCircleNumBFS]
    ];

    for (const [name, method] of approaches) {
        const result = method(isConnected1);
        console.log(`${name}: ${result}`);
    }

    console.log('\nKey insights:');
    console.log('1. Connected components problem - find separate groups');
    console.log('2. Union-Find efficiently manages component membership');
    console.log('3. DFS/BFS can mark all cities in a component as visited');
    console.log('4. Matrix is symmetric (undirected graph)');
    console.log('5. Count unique components to get number of provinces');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    findCircleNum,
    findCircleNumDFS,
    findCircleNumBFS,
    UnionFind,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses Union-Find with path compression and union by rank
 * - Time complexity is nearly O(n²) due to inverse Ackermann function
 * - Alternative DFS/BFS approaches also solve in O(n²) time
 * - The problem reduces to counting connected components in an undirected graph
 * - Essential insight: each connected component represents one province
 * - Union-Find provides optimal solution for dynamic connectivity queries
 */
