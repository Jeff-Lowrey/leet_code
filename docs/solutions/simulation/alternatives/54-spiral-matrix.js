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
 * - **Pointers meet:** Handle when left == right
 * - **Empty input:** Check for null or empty arrays
 * - **Single element:** One pointer scenario
 * - **All duplicates:** Pointer movement with same values
 * - **Boundary crossing:** Prevent left > right
 *
 * </details>
 */

/**
 * Main solution for Problem 54: Spiral Matrix
 *
 * @param {number[][]} matrix - m x n matrix
 * @return {number[]} - Elements in spiral order
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(1) excluding output
 */
function solve(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return [];
    }

    const result = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // Traverse right along top row
        for (let col = left; col <= right; col++) {
            result.push(matrix[top][col]);
        }
        top++;

        // Traverse down along right column
        for (let row = top; row <= bottom; row++) {
            result.push(matrix[row][right]);
        }
        right--;

        // Traverse left along bottom row (if still valid)
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                result.push(matrix[bottom][col]);
            }
            bottom--;
        }

        // Traverse up along left column (if still valid)
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                result.push(matrix[row][left]);
            }
            left++;
        }
    }

    return result;
}

/**
 * Test cases for Problem 54: Spiral Matrix
 */
function testSolution() {
    console.log('Testing 54. Spiral Matrix');

    // Helper function to compare arrays
    const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, idx) => val === arr2[idx]);
    };

    // Test case 1: 3x3 matrix
    const result1 = solve([[1,2,3],[4,5,6],[7,8,9]]);
    const expected1 = [1,2,3,6,9,8,7,4,5];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: 3x4 matrix
    const result2 = solve([[1,2,3,4],[5,6,7,8],[9,10,11,12]]);
    const expected2 = [1,2,3,4,8,12,11,10,9,5,6,7];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single row
    const result3 = solve([[1,2,3,4]]);
    const expected3 = [1,2,3,4];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single column
    const result4 = solve([[1],[2],[3]]);
    const expected4 = [1,2,3];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single element
    const result5 = solve([[5]]);
    const expected5 = [5];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 54. Spiral Matrix!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 54. Spiral Matrix ===');
    console.log('Category: Simulation');
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
 * - This solution focuses on simulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
