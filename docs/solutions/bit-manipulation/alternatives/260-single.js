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
 * - **Empty array:** Handle nums.length == 0
 * - **Single element:** Special case for minimal input
 * - **All same values:** Check for duplicate handling
 * - **Negative numbers:** Ensure algorithm works with negatives
 * - **Large arrays:** Consider O(n) vs O(n²) performance
 *
 * </details>
 */

/**
 * Main solution for Problem 260: Single Number III
 *
 * @param {number[]} nums - Array where two elements appear once, rest appear twice
 * @return {number[]} - Array of the two single numbers
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    // Step 1: XOR all numbers to get XOR of the two unique numbers
    let xor = 0;
    for (const num of nums) {
        xor ^= num;
    }

    // Step 2: Find a bit that is set in xor (differs between the two numbers)
    // This isolates the rightmost set bit
    const rightmostBit = xor & (-xor);

    // Step 3: Separate numbers into two groups based on this bit
    let num1 = 0;
    let num2 = 0;

    for (const num of nums) {
        if (num & rightmostBit) {
            num1 ^= num;
        } else {
            num2 ^= num;
        }
    }

    return [num1, num2];
}

/**
 * Test cases for Problem 260: Single
 */
function testSolution() {
    console.log('Testing 260. Single');

    // Test case 1: Basic case
    const result1 = solve([1, 2, 1, 3, 2, 5]);
    const expected1 = [3, 5];
    const matches1 = (result1.includes(3) && result1.includes(5)) ||
                     (result1[0] === 5 && result1[1] === 3);
    console.assert(matches1, `Test 1 failed: expected [3, 5], got [${result1}]`);

    // Test case 2: Negative numbers
    const result2 = solve([-1, 0]);
    const matches2 = (result2.includes(-1) && result2.includes(0));
    console.assert(matches2, `Test 2 failed: expected [-1, 0], got [${result2}]`);

    // Test case 3: Mix of positives
    const result3 = solve([1, 2, 3, 4, 1, 2]);
    const matches3 = (result3.includes(3) && result3.includes(4));
    console.assert(matches3, `Test 3 failed: expected [3, 4], got [${result3}]`);

    // Test case 4: Large numbers
    const result4 = solve([100, 200, 100, 300]);
    const matches4 = (result4.includes(200) && result4.includes(300));
    console.assert(matches4, `Test 4 failed: expected [200, 300], got [${result4}]`);

    console.log('All test cases passed for 260. Single!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 260. Single ===');
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
