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
 * Main solution for Problem 121: Best Time To Buy And Sell Stock
 *
 * @param {number[]} prices - Array of stock prices where prices[i] is price on day i
 * @return {number} - Maximum profit achievable
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(prices) {
    if (!prices || prices.length < 2) return 0;

    let minPrice = Infinity;
    let maxProfit = 0;

    for (const price of prices) {
        // Update minimum price if current price is lower
        if (price < minPrice) {
            minPrice = price;
        }
        // Calculate profit if we sell at current price
        else {
            const profit = price - minPrice;
            maxProfit = Math.max(maxProfit, profit);
        }
    }

    return maxProfit;
}

/**
 * Test cases for Problem 121: Best Time To Buy And Sell Stock
 */
function testSolution() {
    console.log('Testing 121. Best Time To Buy And Sell Stock');

    // Test case 1: Basic example with clear buy and sell points
    const result1 = solve([7, 1, 5, 3, 6, 4]);
    const expected1 = 5;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: [7,1,5,3,6,4] -> ${result1}`);

    // Test case 2: Prices always decreasing
    const result2 = solve([7, 6, 4, 3, 1]);
    const expected2 = 0;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: [7,6,4,3,1] -> ${result2}`);

    // Test case 3: Single transaction at end
    const result3 = solve([2, 4, 1]);
    const expected3 = 2;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: [2,4,1] -> ${result3}`);

    // Test case 4: Empty array
    const result4 = solve([]);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: [] -> ${result4}`);

    // Test case 5: Single element
    const result5 = solve([5]);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: [5] -> ${result5}`);

    // Test case 6: Two elements - profit possible
    const result6 = solve([1, 5]);
    const expected6 = 4;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);
    console.log(`Test 6 passed: [1,5] -> ${result6}`);

    // Test case 7: Two elements - no profit
    const result7 = solve([5, 1]);
    const expected7 = 0;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);
    console.log(`Test 7 passed: [5,1] -> ${result7}`);

    // Test case 8: Prices always increasing
    const result8 = solve([1, 2, 3, 4, 5]);
    const expected8 = 4;
    console.assert(result8 === expected8, `Test 8 failed: expected ${expected8}, got ${result8}`);
    console.log(`Test 8 passed: [1,2,3,4,5] -> ${result8}`);

    console.log('All test cases passed for 121. Best Time To Buy And Sell Stock!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 121. Best Time To Buy And Sell Stock ===');
    console.log('Category: Sliding Window');
    console.log('Difficulty: Easy');
    console.log('');

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
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
