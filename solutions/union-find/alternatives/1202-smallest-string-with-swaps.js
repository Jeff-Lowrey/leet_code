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
}

/**
 * Main solution for Problem 1202: Smallest String With Swaps
 *
 * @param {string} s - Input string
 * @param {number[][]} pairs - Array of index pairs that can be swapped
 * @return {string} - Lexicographically smallest string
 *
 * Time Complexity: O(n log n + m * α(n))
 * Space Complexity: O(n)
 */
function solve(s, pairs) {
    const n = s.length;
    if (n <= 1 || pairs.length === 0) return s;

    // Initialize Union-Find
    const uf = new UnionFind(n);

    // Union all connected indices
    for (const [i, j] of pairs) {
        uf.union(i, j);
    }

    // Group indices by their root parent (connected component)
    const components = new Map();
    for (let i = 0; i < n; i++) {
        const root = uf.find(i);
        if (!components.has(root)) {
            components.set(root, []);
        }
        components.get(root).push(i);
    }

    // Build result array
    const result = s.split('');

    // For each component, sort characters and place them back
    for (const indices of components.values()) {
        // Get characters at these indices
        const chars = indices.map(i => s[i]);

        // Sort both indices and characters
        indices.sort((a, b) => a - b);
        chars.sort();

        // Place sorted characters back into sorted indices
        for (let i = 0; i < indices.length; i++) {
            result[indices[i]] = chars[i];
        }
    }

    return result.join('');
}

/**
 * Test cases for Problem 1202: Smallest String With Swaps
 */
function testSolution() {
    console.log('Testing 1202. Smallest String With Swaps');

    // Test case 1: Example from LeetCode
    const result1 = solve("dcab", [[0,3],[1,2]]);
    const expected1 = "bacd";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: "${result1}"`);

    // Test case 2: All connected
    const result2 = solve("dcab", [[0,3],[1,2],[0,2]]);
    const expected2 = "abcd";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: "${result2}"`);

    // Test case 3: No pairs
    const result3 = solve("abc", []);
    const expected3 = "abc";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: "${result3}"`);

    // Test case 4: Single character
    const result4 = solve("a", []);
    const expected4 = "a";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: "${result4}"`);

    // Test case 5: Complex case
    const result5 = solve("cba", [[0,1],[1,2]]);
    const expected5 = "abc";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: "${result5}"`);

    console.log('All test cases passed for 1202. Smallest String With Swaps!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1202. Smallest String With Swaps ===');
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
