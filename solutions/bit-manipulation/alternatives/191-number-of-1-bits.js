/**

 *
 * This problem demonstrates key concepts in Bit Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Count the number of '1' bits in the binary representation of an unsigned integer.
 * Brian Kernighan's algorithm provides an elegant solution: n & (n-1) always clears
 * the rightmost set bit, so we can count how many times we can do this until n becomes 0.
 *
 * APPROACH:


 *    - Set n = n & (n-1) to clear the rightmost 1 bit
 *    - Increment count

 *
 * WHY THIS WORKS:
 * - n & (n-1) clears the least significant 1 bit
 * - Example: 12 (1100) & 11 (1011) = 8 (1000)
 * - We only iterate as many times as there are 1 bits
 * - More efficient than checking all 32 bits
 *
 * TIME COMPLEXITY: O(k) where k is the number of 1 bits
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: 11 (binary: 00000000000000000000000000001011)
 * Step 1: 11 & 10 = 10 (1010), count = 1
 * Step 2: 10 & 9 = 8 (1000), count = 2
 * Step 3: 8 & 7 = 0 (0000), count = 3
 * Output: 3
 *
 * EDGE CASES:
 * - Zero: returns 0
 * - All bits set (0xFFFFFFFF): returns 32
 * - Single bit set: returns 1
 */

/**
 * Main solution for Problem 191: Number Of 1 Bits (Hamming Weight)
 *
 * @param {number} n - A 32-bit unsigned integer
 * @return {number} - The number of '1' bits
 *
 * Time Complexity: O(k) where k is the number of 1 bits
 * Space Complexity: O(1)
 */
function solve(n) {
    let count = 0;

    // Brian Kernighan's Algorithm
    // n & (n-1) clears the least significant 1 bit
    while (n !== 0) {
        n &= (n - 1);
        count++;
    }

    return count;
}

/**
 * Test cases for Problem 191: Number Of 1 Bits
 */
function testSolution() {
    console.log('Testing 191. Number Of 1 Bits');

    // Test case 1: Three 1 bits
    const result1 = solve(0b00000000000000000000000000001011);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single 1 bit
    const result2 = solve(0b00000000000000000000000010000000);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Many 1 bits
    const result3 = solve(0b11111111111111111111111111111101);
    const expected3 = 31;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Zero
    const result4 = solve(0);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: All ones
    const result5 = solve(0xFFFFFFFF);
    const expected5 = 32;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 191. Number Of 1 Bits!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 191. Number Of 1 Bits ===');
    console.log('Category: Bit Manipulation');
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
 * - This solution focuses on bit manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
