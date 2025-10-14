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
 * Main solution for Problem 066: Plus One
 *
 * @param {number[]} digits - Array of digits representing a number
 * @return {number[]} - Array of digits after adding one
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) excluding output
 */
function solve(digits) {
    const n = digits.length;

    // Start from the rightmost digit
    for (let i = n - 1; i >= 0; i--) {
        // If digit is less than 9, just add 1 and return
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        // Otherwise, set to 0 and continue (carry over)
        digits[i] = 0;
    }

    // If we're here, all digits were 9s
    // Need to prepend 1 to the array
    return [1, ...digits];
}

/**
 * Test cases for Problem 066: Plus One
 */
function testSolution() {
    console.log('Testing 066. Plus One');

    // Helper function to compare arrays
    const arraysEqual = (a, b) => {
        if (a.length !== b.length) return false;
        return a.every((val, idx) => val === b[idx]);
    };

    // Test case 1: Basic increment
    const result1 = solve([1, 2, 3]);
    const expected1 = [1, 2, 4];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Carry needed
    const result2 = solve([1, 2, 9]);
    const expected2 = [1, 3, 0];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All 9s
    const result3 = solve([9, 9, 9]);
    const expected3 = [1, 0, 0, 0];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single digit (not 9)
    const result4 = solve([5]);
    const expected4 = [6];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single 9
    const result5 = solve([9]);
    const expected5 = [1, 0];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Multiple carries
    const result6 = solve([8, 9, 9]);
    const expected6 = [9, 0, 0];
    console.assert(arraysEqual(result6, expected6), `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 066. Plus One!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 066. Plus ===');
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
