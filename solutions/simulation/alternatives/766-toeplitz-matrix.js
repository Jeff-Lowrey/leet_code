/**
 * 766. Toeplitz Matrix
 * Easy
 *
 * This problem demonstrates key concepts in Simulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * A Toeplitz matrix has the property that every diagonal from top-left to bottom-right
 * contains the same element. We can verify this by checking if each element equals the
 * element at position (row-1, col-1).
 *
 * APPROACH:
 * 1. Iterate through the matrix starting from position (1, 1)
 * 2. For each element, compare it with the element diagonally above-left (row-1, col-1)
 * 3. If any element doesn't match its diagonal predecessor, return false
 * 4. If all elements match their diagonal predecessors, return true
 *
 * WHY THIS WORKS:
 * In a Toeplitz matrix, all elements on the same diagonal have the same value. By checking
 * each element against its immediate diagonal predecessor, we effectively verify all elements
 * on each diagonal are equal.
 *
 * TIME COMPLEXITY: O(m × n) - check each element once (excluding first row and column)
 * SPACE COMPLEXITY: O(1) - only constant extra space used
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
 * Check (1,1)=1 vs (0,0)=1 ✓
 * Check (1,2)=2 vs (0,1)=2 ✓
 * Check (2,1)=5 vs (1,0)=5 ✓
 * All checks pass → true
 *
 * EDGE CASES:
 * - Single row or column: Always Toeplitz (true)
 * - Single element: Always Toeplitz (true)
 * - Empty matrix: Return true
 */

/**
 * Main solution for Problem 766: Toeplitz Matrix
 *
 * @param {number[][]} matrix - m x n matrix
 * @return {boolean} - True if matrix is Toeplitz, false otherwise
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(1)
 */
function solve(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return true;
    }

    const m = matrix.length;
    const n = matrix[0].length;

    // Check each element starting from (1, 1)
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // Compare with diagonal predecessor
            if (matrix[i][j] !== matrix[i - 1][j - 1]) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Test cases for Problem 766: Toeplitz Matrix
 */
function testSolution() {
    console.log('Testing 766. Toeplitz Matrix');

    // Test case 1: Valid Toeplitz matrix
    const result1 = solve([[1,2,3,4],[5,1,2,3],[9,5,1,2]]);
    console.assert(result1 === true,
        `Test 1 failed: expected true, got ${result1}`);

    // Test case 2: Not a Toeplitz matrix
    const result2 = solve([[1,2],[2,2]]);
    console.assert(result2 === false,
        `Test 2 failed: expected false, got ${result2}`);

    // Test case 3: Single element
    const result3 = solve([[1]]);
    console.assert(result3 === true,
        `Test 3 failed: expected true, got ${result3}`);

    // Test case 4: Single row (always Toeplitz)
    const result4 = solve([[1,2,3,4,5]]);
    console.assert(result4 === true,
        `Test 4 failed: expected true, got ${result4}`);

    // Test case 5: Single column (always Toeplitz)
    const result5 = solve([[1],[2],[3],[4]]);
    console.assert(result5 === true,
        `Test 5 failed: expected true, got ${result5}`);

    // Test case 6: 2x2 Toeplitz
    const result6 = solve([[1,2],[3,1]]);
    console.assert(result6 === true,
        `Test 6 failed: expected true, got ${result6}`);

    // Test case 7: Larger valid Toeplitz
    const result7 = solve([[1,2,3],[4,1,2],[5,4,1]]);
    console.assert(result7 === true,
        `Test 7 failed: expected true, got ${result7}`);

    console.log('All test cases passed for 766. Toeplitz Matrix!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 766. Toeplitz Matrix ===');
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
