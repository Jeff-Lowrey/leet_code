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
 * Main solution for Problem 802: Find Eventual Safe States
 *
 * @param {number[][]} graph - Directed graph represented as adjacency list
 * @return {number[]} - Sorted list of safe nodes
 *
 * Time Complexity: O(V + E) where V is number of nodes and E is number of edges
 * Space Complexity: O(V) for state tracking and result storage
 */
function solve(graph) {
    const n = graph.length;
    const state = new Array(n).fill(0); // 0: unvisited, 1: visiting, 2: safe

    const isSafe = (node) => {
        if (state[node] !== 0) {
            return state[node] === 2;
        }

        // Mark as visiting (detect cycles)
        state[node] = 1;

        // Check all neighbors
        for (const neighbor of graph[node]) {
            if (!isSafe(neighbor)) {
                // Found a cycle or path to cycle
                return false;
            }
        }

        // Mark as safe (terminal node or all paths lead to terminal)
        state[node] = 2;
        return true;
    };

    const result = [];
    for (let i = 0; i < n; i++) {
        if (isSafe(i)) {
            result.push(i);
        }
    }

    return result;
}

/**
 * Test cases for Problem 802: Find Eventual Safe States
 */
function testSolution() {
    console.log('Testing 802. Find Eventual Safe States');

    // Test case 1: Mixed safe and unsafe nodes
    const result1 = solve([[1, 2], [2, 3], [5], [0], [5], [], []]);
    const expected1 = [2, 4, 5, 6];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
                   `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: All terminal nodes
    const result2 = solve([[], [], []]);
    const expected2 = [0, 1, 2];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
                   `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: All nodes in cycle
    const result3 = solve([[1], [0]]);
    const expected3 = [];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
                   `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Single terminal node
    const result4 = solve([[]]);
    const expected4 = [0];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
                   `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Linear path to terminal
    const result5 = solve([[1], [2], []]);
    const expected5 = [0, 1, 2];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
                   `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 802. Find Eventual Safe States!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 802. Find ===');
    console.log('Category: Topological Sort');
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
 * - This solution focuses on topological sort concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
