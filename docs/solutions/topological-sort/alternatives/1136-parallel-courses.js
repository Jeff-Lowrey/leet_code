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
 * Main solution for Problem 1136: Parallel Courses
 *
 * @param {number} n - Total number of courses
 * @param {number[][]} relations - Array of prerequisite pairs [a, b] where a must be taken before b
 * @return {number} - Minimum number of semesters needed, or -1 if impossible
 *
 * Time Complexity: O(V + E) where V is n and E is relations.length
 * Space Complexity: O(V + E) for adjacency list and in-degree array
 */
function solve(n, relations) {
    // Build adjacency list and in-degree array
    const graph = Array.from({ length: n + 1 }, () => []);
    const inDegree = new Array(n + 1).fill(0);

    // Build the graph (note: courses are 1-indexed)
    for (const [prereq, course] of relations) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    // Initialize queue with courses that have no prerequisites
    const queue = [];
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let semesters = 0;
    let coursesCompleted = 0;

    // Process courses level by level (each level is one semester)
    while (queue.length > 0) {
        const levelSize = queue.length;
        semesters++;

        // Process all courses that can be taken this semester
        for (let i = 0; i < levelSize; i++) {
            const current = queue.shift();
            coursesCompleted++;

            // Reduce in-degree for all neighbors
            for (const neighbor of graph[current]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }
    }

    // If not all courses completed, there's a cycle
    return coursesCompleted === n ? semesters : -1;
}

/**
 * Test cases for Problem 1136: Parallel Courses
 */
function testSolution() {
    console.log('Testing 1136. Parallel Courses');

    // Test case 1: Linear dependency - takes 3 semesters
    const result1 = solve(3, [[1, 3], [2, 3]]);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Cycle exists - impossible
    const result2 = solve(3, [[1, 2], [2, 3], [3, 1]]);
    const expected2 = -1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: No prerequisites - all in one semester
    const result3 = solve(3, []);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Complex dependency
    const result4 = solve(4, [[1, 2], [1, 3], [2, 4], [3, 4]]);
    const expected4 = 3;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 1136. Parallel Courses!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1136. Parallel Courses ===');
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
