/**
 * 137. Single Number II
 * Medium
 *
 * This problem demonstrates key concepts in Bit Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Given an array where every element appears three times except for one element which appears once,
 * find that single element. We need to track bits that appear 1, 2, or 3 times using bit manipulation.
 *
 * APPROACH:
 * 1. Use two variables: ones (bits appearing 1 time mod 3) and twos (bits appearing 2 times mod 3)
 * 2. For each number, update twos with bits that were in ones and are appearing again
 * 3. Update ones by XORing with the current number
 * 4. Clear bits that appear 3 times from both ones and twos
 * 5. Return ones (the single number)
 *
 * WHY THIS WORKS:
 * - ones tracks bits that appear 1 time (mod 3)
 * - twos tracks bits that appear 2 times (mod 3)
 * - When a bit appears 3 times, we clear it from both
 * - After processing all numbers, ones contains the single number
 *
 * TIME COMPLEXITY: O(n) - single pass through array
 * SPACE COMPLEXITY: O(1) - only two variables
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [2,2,3,2]
Step 1: Process 2: ones=2, twos=0
Step 2: Process 2: ones=0, twos=2
Step 3: Process 3: ones=3, twos=2
Step 4: Process 2: ones=3, twos=0 (2 appeared 3 times, cleared)
Output: 3
```
 *
 * EDGE CASES:
 * - Single element array: returns that element
 * - All elements appear exactly 3 times except one
 * - Negative numbers are handled correctly
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
