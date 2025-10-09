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
 * Main solution for Problem 190: Reverse Bits
 *
 * @param {number} n - A 32-bit unsigned integer
 * @return {number} - The reversed 32-bit unsigned integer
 *
 * Time Complexity: O(1) - always 32 iterations
 * Space Complexity: O(1)
 */
function solve(n) {
    let result = 0;

    // Process all 32 bits
    for (let i = 0; i < 32; i++) {
        // Shift result left to make room for next bit
        result <<= 1;

        // Add the least significant bit of n to result
        result |= (n & 1);

        // Shift n right to process next bit
        n >>>= 1;
    }

    // Use unsigned right shift to ensure positive result
    return result >>> 0;
}

/**
 * Test cases for Problem 190: Reverse
 */
function testSolution() {
    console.log('Testing 190. Reverse');

    // Test case 1: Basic case
    const result1 = solve(0b00000010100101000001111010011100);
    const expected1 = 964176192;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: All ones reversed
    const result2 = solve(0b11111111111111111111111111111101);
    const expected2 = 3221225471;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Zero
    const result3 = solve(0);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single bit set
    const result4 = solve(1);
    const expected4 = 2147483648;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Pattern
    const result5 = solve(0b10101010101010101010101010101010);
    const expected5 = 0b01010101010101010101010101010101;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 190. Reverse!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 190. Reverse ===');
    console.log('Category: Bit Manipulation');
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
 * - This solution focuses on bit manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
