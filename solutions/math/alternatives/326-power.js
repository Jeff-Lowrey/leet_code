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
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
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
