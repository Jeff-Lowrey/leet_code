/**
 * 121. Best Time To Buy And Sell Stock
 * Easy
 *
 * This problem demonstrates key concepts in Sliding Window.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Track the minimum price seen so far and calculate maximum profit at each step.
 * This is essentially a sliding window problem where we track the valley (buy) and peak (sell).
 *
 * APPROACH:
 * 1. **Analyze the problem**: Find maximum profit with one buy and one sell transaction
 * 2. **Choose the right technique**: Single pass tracking minimum and maximum profit
 * 3. **Implement efficiently**: Use two variables - minPrice and maxProfit
 * 4. **Handle edge cases**: Empty array, single element, prices always decreasing
 *
 * WHY THIS WORKS:
 * - We want to buy at the lowest price and sell at the highest price after buying
 * - Keep track of minimum price seen so far (potential buy point)
 * - At each price, calculate profit if we sell now (current - minPrice)
 * - Update maximum profit if current profit is higher
 *
 * TIME COMPLEXITY: O(n) - single pass through array
 * SPACE COMPLEXITY: O(1) - only using two variables
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: prices = [7,1,5,3,6,4]
 * Step 1: day 0, price=7, minPrice=7, maxProfit=0
 * Step 2: day 1, price=1, minPrice=1, maxProfit=0
 * Step 3: day 2, price=5, minPrice=1, maxProfit=4 (5-1)
 * Step 4: day 3, price=3, minPrice=1, maxProfit=4
 * Step 5: day 4, price=6, minPrice=1, maxProfit=5 (6-1)
 * Step 6: day 5, price=4, minPrice=1, maxProfit=5
 * Output: 5
 * ```
 *
 * EDGE CASES:
 * - Empty array or single element: return 0
 * - Prices always decreasing: return 0
 * - Prices always increasing: return last - first
 * - Multiple peaks and valleys: algorithm finds global maximum
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
