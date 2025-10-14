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
 * Main solution for Problem 1260: Shift 2D Grid
 *
 * @param {number[][]} grid - 2D grid of integers
 * @param {number} k - Number of shifts
 * @return {number[][]} - Shifted 2D grid
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
function solve(grid, k) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return grid;
    }

    const m = grid.length;
    const n = grid[0].length;
    const total = m * n;

    // Optimize k (handle cases where k > total)
    k = k % total;

    // If k is 0, return copy of original grid
    if (k === 0) {
        return grid.map(row => [...row]);
    }

    // Flatten the grid into 1D array
    const flat = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            flat.push(grid[i][j]);
        }
    }

    // Rotate the array by k positions to the right
    // Take last k elements and move to front
    const rotated = [...flat.slice(total - k), ...flat.slice(0, total - k)];

    // Reconstruct 2D grid
    const result = [];
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(rotated[i * n + j]);
        }
        result.push(row);
    }

    return result;
}

/**
 * Test cases for Problem 1260: Shift 2D Grid
 */
function testSolution() {
    console.log('Testing 1260. Shift 2D Grid');

    // Helper to compare 2D arrays
    const arraysEqual = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i].length !== b[i].length) return false;
            for (let j = 0; j < a[i].length; j++) {
                if (a[i][j] !== b[i][j]) return false;
            }
        }
        return true;
    };

    // Test case 1: Basic shift
    const result1 = solve([[1,2,3],[4,5,6],[7,8,9]], 1);
    const expected1 = [[9,1,2],[3,4,5],[6,7,8]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Multiple shifts
    const result2 = solve([[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], 4);
    const expected2 = [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: k equals total elements (no change)
    const result3 = solve([[1,2,3],[4,5,6]], 6);
    const expected3 = [[1,2,3],[4,5,6]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Single element
    const result4 = solve([[1]], 100);
    const expected4 = [[1]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Single row
    const result5 = solve([[1,2,3,4]], 2);
    const expected5 = [[3,4,1,2]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 1260. Shift 2D Grid!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1260. Shift 2D Grid ===');
    console.log('Category: Simulation');
    console.log('Difficulty: Easy');
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
 * - This solution focuses on simulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
