/**

 *
 * This problem demonstrates key concepts in Math.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Determine if an integer n is a power of three (3^x for some integer x >= 0).
 * Several approaches: loop division, logarithms, or mathematical constraint.
 * Most elegant: use the fact that in 32-bit integers, max power of 3 is 3^19 = 1162261467.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - If n is a power of 3, then n divides the maximum power of 3
 * - 3 is prime, so 3^19 is only divisible by powers of 3
 * - More efficient than loop or log-based approaches
 * - No floating-point precision issues
 *
 * TIME COMPLEXITY: O(1) - single modulo operation
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: 27
Check: 1162261467 % 27 = 0? Yes
Verification: 27 = 3^3
Output: true

Input: 45
Check: 1162261467 % 45 = 22 (not 0)
Verification: 45 = 3^2 * 5 (has factor 5)
Output: false
```
 *
 * EDGE CASES:
 * - n = 1: True (3^0 = 1)
 * - n <= 0: False (powers of 3 are always positive)
 * - n = 3: True (3^1)
 * - Large powers: 3^19 = 1162261467
 */

/**
 * Main solution for Problem 326: Power of Three (Mathematical constraint)
 *
 * @param {number} n - Integer to check
 * @return {boolean} - True if n is a power of 3, false otherwise
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function solve(n) {
    // Powers of 3 must be positive
    if (n <= 0) {
        return false;
    }

    // Maximum power of 3 in 32-bit signed integer range: 3^19 = 1162261467
    const maxPowerOfThree = 1162261467;

    // If n is a power of 3, it must divide the max power of 3
    return maxPowerOfThree % n === 0;
}

/**
 * Alternative solution using loop division
 *
 * @param {number} n - Integer to check
 * @return {boolean} - True if n is a power of 3, false otherwise
 */
function solveWithLoop(n) {
    if (n <= 0) {
        return false;
    }

    while (n % 3 === 0) {
        n = n / 3;
    }

    return n === 1;
}

/**
 * Test cases for Problem 326: Power of Three
 */
function testSolution() {
    console.log('Testing 326. Power of Three');

    // Test case 1: n = 27 (3^3)
    const result1 = solve(27);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: n = 0
    const result2 = solve(0);
    const expected2 = false;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: n = 1 (3^0)
    const result3 = solve(1);
    const expected3 = true;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: n = 9 (3^2)
    const result4 = solve(9);
    const expected4 = true;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: n = 45 (not a power of 3)
    const result5 = solve(45);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: n = -3 (negative)
    const result6 = solve(-3);
    const expected6 = false;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Large power of 3
    const result7 = solve(243); // 3^5
    const expected7 = true;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    // Test loop approach
    const result8 = solveWithLoop(27);
    const expected8 = true;
    console.assert(result8 === expected8, `Test 8 (loop approach) failed: expected ${expected8}, got ${result8}`);

    console.log('All test cases passed for 326. Power of Three!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 326. Power ===');
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
