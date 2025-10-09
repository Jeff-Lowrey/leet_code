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
 * Main solution for Problem 851: Loud and Rich
 *
 * @param {number[][]} richer - Array of [a, b] where person a has more money than person b
 * @param {number[]} quiet - Array where quiet[i] is the quietness of person i
 * @return {number[]} - Array where answer[i] is the quietest person among all who are at least as rich as person i
 *
 * Time Complexity: O(V + E) where V is number of people and E is richer.length
 * Space Complexity: O(V + E) for graph and answer array
 */
function solve(richer, quiet) {
    const n = quiet.length;

    // Build graph: graph[i] contains people who are poorer than person i
    const graph = Array.from({ length: n }, () => []);
    for (const [richerPerson, poorerPerson] of richer) {
        graph[poorerPerson].push(richerPerson);
    }

    // Answer array: answer[i] = quietest person among all at least as rich as i
    const answer = new Array(n).fill(-1);

    const dfs = (person) => {
        // If already computed, return cached result
        if (answer[person] !== -1) {
            return answer[person];
        }

        // Start with the person themselves
        answer[person] = person;

        // Check all richer people
        for (const richerPerson of graph[person]) {
            const candidate = dfs(richerPerson);

            // Update if we found someone quieter
            if (quiet[candidate] < quiet[answer[person]]) {
                answer[person] = candidate;
            }
        }

        return answer[person];
    };

    // Compute answer for each person
    for (let i = 0; i < n; i++) {
        dfs(i);
    }

    return answer;
}

/**
 * Test cases for Problem 851: Loud and Rich
 */
function testSolution() {
    console.log('Testing 851. Loud and Rich');

    // Test case 1: Standard case
    const result1 = solve(
        [[1, 0], [2, 1], [3, 1], [3, 7], [4, 3], [5, 3], [6, 3]],
        [3, 2, 5, 4, 6, 1, 7, 0]
    );
    const expected1 = [5, 5, 2, 5, 4, 5, 6, 7];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
                   `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: No richer relationships
    const result2 = solve([], [0, 1, 2]);
    const expected2 = [0, 1, 2];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
                   `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Linear hierarchy
    // Person 0 (richest, quiet=2): answer is 0 (themselves, quietest they know)
    // Person 1 (middle, quiet=1): answer is 1 (0 is richer but louder)
    // Person 2 (poorest, quiet=0): answer is 2 (themselves, quietest overall)
    const result3 = solve([[0, 1], [1, 2]], [2, 1, 0]);
    const expected3 = [0, 1, 2];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
                   `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Single person
    const result4 = solve([], [5]);
    const expected4 = [0];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
                   `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    console.log('All test cases passed for 851. Loud and Rich!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 851. Loud And Rich ===');
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
