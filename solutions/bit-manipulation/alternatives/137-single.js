/**
 * # Difficulty: Medium
 *
 * # 137. Single Number II
 *
 * Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it.
 *
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2,2,3,2]</dd>
 * <dt>Output:</dt>
 * <dd>3 (single number)</dd>
 * <dt>Explanation:</dt>
 * <dd>The single number 3 appears once in [2,2,3,2] (all others appear thrice)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [This problem requires understanding of bit manipulation concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply bit manipulation methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages bit manipulation principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [2,2,3,2]
 * Step 1: Count bits at each position
 *   Binary representations:
 *   2 = 010
 *   2 = 010
 *   3 = 011
 *   2 = 010
 *
 *   Bit 0: appears 1 time → 1 % 3 = 1
 *   Bit 1: appears 4 times → 4 % 3 = 1
 *   Bit 2: appears 0 times → 0 % 3 = 0
 *
 * Step 2: Build result from remaining bits
 *   result = 011 (binary) = 3 (decimal)
 *
 * Output: 3 (single number)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 137: Single Number II
 *
 * @param {number[]} nums - Array where every element appears 3 times except one
 * @return {number} - The single number that appears only once
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    // Count bits at each position
    // For numbers appearing 3 times, bit counts are divisible by 3
    // The remainder gives us the single number's bit
    let ones = 0;  // Bits appearing 1 time (mod 3)
    let twos = 0;  // Bits appearing 2 times (mod 3)

    for (const num of nums) {
        // Update twos: add bits that were in ones and are now appearing again
        twos |= ones & num;

        // Update ones: XOR with current number
        ones ^= num;

        // Remove bits that appear 3 times from both ones and twos
        const threes = ones & twos;
        ones &= ~threes;
        twos &= ~threes;
    }

    return ones;
}

/**
 * Test cases for Problem 137: Single
 */
function testSolution() {
    console.log('Testing 137. Single');

    // Test case 1: Basic case
    const result1 = solve([2, 2, 3, 2]);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single at beginning
    const result2 = solve([0, 1, 0, 1, 0, 1, 99]);
    const expected2 = 99;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single element
    const result3 = solve([1]);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Negative numbers
    const result4 = solve([-2, -2, 1, -2]);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Larger array
    const result5 = solve([1, 1, 1, 2, 2, 2, 3]);
    const expected5 = 3;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 137. Single!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 137. Single ===');
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
