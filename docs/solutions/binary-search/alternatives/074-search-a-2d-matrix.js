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
 * - **Target in first row:** Check boundary conditions
 * - **Target in last row:** Check boundary conditions
 * - **Target not in matrix:** Return false
 * - **Single element matrix:** Handle 1x1 matrix
 * - **Empty matrix:** Return false
 *
 * </details>
 */

/**
 * Main solution for Problem 074: Search A 2D Matrix
 *
 * @param {number[][]} matrix - 2D matrix with sorted properties
 * @param {number} target - Target value to search for
 * @return {boolean} - True if target found, false otherwise
 *
 * Time Complexity: O(log(m * n))
 * Space Complexity: O(1)
 */
function solve(matrix, target) {
    // Handle edge cases
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    const totalElements = rows * cols;

    let left = 0;
    let right = totalElements - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Convert 1D index to 2D coordinates
        const row = Math.floor(mid / cols);
        const col = mid % cols;
        const midValue = matrix[row][col];

        if (midValue === target) {
            return true;
        } else if (midValue < target) {
            // Target is in the right half
            left = mid + 1;
        } else {
            // Target is in the left half
            right = mid - 1;
        }
    }

    // Target not found
    return false;
}

/**
 * Test cases for Problem 074: Search A 2D Matrix
 */
function testSolution() {
    console.log('Testing 074. Search A 2D Matrix');

    // Test case 1: Target found in matrix
    const result1 = solve([[1,4,7,11],[15,16,17,18],[23,24,25,26]], 16);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Target not found
    const result2 = solve([[1,4,7,11],[15,16,17,18],[23,24,25,26]], 13);
    const expected2 = false;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single element found
    const result3 = solve([[1]], 1);
    const expected3 = true;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single element not found
    const result4 = solve([[1]], 2);
    const expected4 = false;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Empty matrix
    const result5 = solve([], 1);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Target at first position
    const result6 = solve([[1,4,7,11],[15,16,17,18],[23,24,25,26]], 1);
    const expected6 = true;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Target at last position
    const result7 = solve([[1,4,7,11],[15,16,17,18],[23,24,25,26]], 26);
    const expected7 = true;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    // Test case 8: Single row matrix
    const result8 = solve([[1,3,5,7]], 3);
    const expected8 = true;
    console.assert(result8 === expected8, `Test 8 failed: expected ${expected8}, got ${result8}`);

    console.log('All test cases passed for 074. Search A 2D Matrix!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 074. Search A 2D Matrix ===');
    console.log('Category: Binary Search');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Example 1:');
    console.log('Input: matrix = [[1,4,7,11],[15,16,17,18],[23,24,25,26]], target = 16');
    console.log('Output:', solve([[1,4,7,11],[15,16,17,18],[23,24,25,26]], 16));
    console.log('');

    console.log('Example 2:');
    console.log('Input: matrix = [[1,4,7,11],[15,16,17,18],[23,24,25,26]], target = 13');
    console.log('Output:', solve([[1,4,7,11],[15,16,17,18],[23,24,25,26]], 13));
    console.log('');

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
 * - The key insight is treating the 2D matrix as a conceptual 1D sorted array
 * - Index conversion formulas: row = Math.floor(index / cols), col = index % cols
 * - This approach works because of the specific matrix properties in the problem
 * - Alternative approach: binary search on rows first, then columns (also O(log m + log n))
 * - The 1D conversion approach is more elegant and easier to implement correctly
 */
