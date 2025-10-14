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
 * - **Empty string:** Handle s.length == 0
 * - **Single character:** Minimal string input
 * - **All same characters:** Check duplicate handling
 * - **Special characters:** Handle non-alphanumeric
 * - **Case sensitivity:** Consider uppercase vs lowercase
 *
 * </details>
 */

/**
 * Main solution for Problem 77: Combinations
 *
 * @param {number} n - Upper bound of range [1, n]
 * @param {number} k - Size of combinations
 * @return {number[][]} - All combinations of k numbers from 1 to n
 *
 * Time Complexity: O(C(n,k) * k)
 * Space Complexity: O(k)
 */
function solve(n, k) {
    const result = [];

    /**
     * Backtracking helper function
     * @param {number} start - Starting number to consider
     * @param {number[]} combination - Current combination being built
     */
    function backtrack(start, combination) {
        // Base case: combination is complete
        if (combination.length === k) {
            result.push([...combination]);
            return;
        }

        // Pruning: if not enough numbers left to complete combination, stop
        const needed = k - combination.length;
        const available = n - start + 1;
        if (available < needed) {
            return;
        }

        // Try each number from start to n
        for (let i = start; i <= n; i++) {
            // Choose: add number to combination
            combination.push(i);

            // Explore: recurse with next number
            backtrack(i + 1, combination);

            // Unchoose: backtrack
            combination.pop();
        }
    }

    // Start backtracking from number 1
    backtrack(1, []);

    return result;
}

/**
 * Test cases for Problem 77: Combinations
 */
function testSolution() {
    console.log('Testing 77. Combinations');

    // Helper function to compare 2D arrays (order doesn't matter)
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = a.map(arr => JSON.stringify([...arr])).sort();
        const sortedB = b.map(arr => JSON.stringify([...arr])).sort();
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }

    // Test case 1: n = 4, k = 2
    const result1 = solve(4, 2);
    const expected1 = [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: n = 1, k = 1
    const result2 = solve(1, 1);
    const expected2 = [[1]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: n = 5, k = 3
    const result3 = solve(5, 3);
    console.assert(result3.length === 10, // C(5,3) = 10
        `Test 3 failed: expected 10 combinations, got ${result3.length}`);

    // Test case 4: k = 0
    const result4 = solve(4, 0);
    const expected4 = [[]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: k = n
    const result5 = solve(3, 3);
    const expected5 = [[1,2,3]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 77. Combinations!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 77. Combinations ===');
    console.log('Category: Recursion');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Input: n = 4, k = 2');
    console.log('Output:', JSON.stringify(solve(4, 2)));
    console.log('');

    console.log('Input: n = 1, k = 1');
    console.log('Output:', JSON.stringify(solve(1, 1)));

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
 * - This is a fundamental backtracking pattern for generating combinations
 * - The pruning optimization significantly reduces unnecessary recursion
 * - Combinations differ from permutations: order doesn't matter
 * - Number of k-combinations from n items: C(n,k) = n! / (k! * (n-k)!)
 */
