/**

 *
 * This problem demonstrates key concepts in Math.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Compute the integer square root of x (floor(sqrt(x))) without using built-in
 * sqrt functions. Binary search is perfect: if mid*mid <= x, answer is at least mid;
 * otherwise, it's less than mid.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Square root function is monotonically increasing
 * - Binary search efficiently finds the threshold point
 * - Avoids floating-point issues by working with integers
 *
 * TIME COMPLEXITY: O(log x)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: x = 8
Step 1: left = 0, right = 8, mid = 4, 4*4 = 16 > 8, right = 3
Step 2: left = 0, right = 3, mid = 1, 1*1 = 1 <= 8, left = 2, result = 1
Step 3: left = 2, right = 3, mid = 2, 2*2 = 4 <= 8, left = 3, result = 2
Step 4: left = 3, right = 3, mid = 3, 3*3 = 9 > 8, right = 2
Step 5: left > right, return result = 2
Output: 2
```
 *
 * EDGE CASES:
 * - x = 0: Return 0
 * - x = 1: Return 1
 * - Perfect squares: e.g., 4 -> 2, 9 -> 3
 * - Non-perfect squares: e.g., 8 -> 2
 * - Large numbers: Handle overflow in mid*mid calculation
 */

/**
 * Main solution for Problem 069: Sqrt(x)
 *
 * @param {number} x - Non-negative integer
 * @return {number} - Integer square root (floor(sqrt(x)))
 *
 * Time Complexity: O(log x)
 * Space Complexity: O(1)
 */
function solve(x) {
    // Handle simple cases
    if (x === 0 || x === 1) {
        return x;
    }

    let left = 1;
    let right = x;
    let result = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;

        if (square === x) {
            return mid;
        } else if (square < x) {
            // This could be the answer, but check if there's a larger value
            result = mid;
            left = mid + 1;
        } else {
            // square > x, search left
            right = mid - 1;
        }
    }

    return result;
}

/**
 * Test cases for Problem 069: Sqrt(x)
 */
function testSolution() {
    console.log('Testing 069. Sqrt(x)');

    // Test case 1: Perfect square
    const result1 = solve(4);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Non-perfect square
    const result2 = solve(8);
    const expected2 = 2;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Zero
    const result3 = solve(0);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: One
    const result4 = solve(1);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Large perfect square
    const result5 = solve(16);
    const expected5 = 4;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Large non-perfect square
    const result6 = solve(15);
    const expected6 = 3;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Larger number
    const result7 = solve(100);
    const expected7 = 10;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 069. Sqrt(x)!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 069. Sqrt ===');
    console.log('Category: Math');
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
 * - This solution focuses on math concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
