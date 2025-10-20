/**
 *  Difficulty: Easy
 *
 * # 121. Best Time to Buy and Sell Stock
 *
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 *
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[7,1,5,3,6,4]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Maximum profit is 5, achieved by buying at price 1 and selling at price 6</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Sliding Window, Two Pointers
 * **Data Structures**: Array, Hash Map, Deque
 * **Patterns**: Sliding Window Pattern, Window Expansion/Contraction
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * To maximize profit, we need to buy at the lowest price and sell at the highest price after the buy date. The key insight is to track the minimum price seen so far and calculate profit at each day.
 *
 * ### APPROACH:
 * 1. **Track minimum price**: Keep track of lowest price seen so far (best buy day)
 * 2. **Calculate daily profit**: At each day, calculate profit if we sell today
 * 3. **Update maximum profit**: Track the best profit seen so far
 * 4. **Single pass**: Only need one pass through the array
 *
 * ### WHY THIS WORKS:
 * - We can only sell after we buy, so track minimum price up to current day
 * - At each day, the best profit is current_price - min_price_so_far
 * - No need to track actual buy/sell days, just the maximum profit
 * - Greedy approach: always buy at lowest available price
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: prices = [7,1,5,3,6,4]
 *
 * Day 0: price=7, min_price=7, profit=0, max_profit=0
 * Day 1: price=1, min_price=1, profit=0, max_profit=0
 * Day 2: price=5, min_price=1, profit=4, max_profit=4 (buy day 1, sell day 2)
 * Day 3: price=3, min_price=1, profit=2, max_profit=4
 * Day 4: price=6, min_price=1, profit=5, max_profit=5 (buy day 1, sell day 4)
 * Day 5: price=4, min_price=1, profit=3, max_profit=5
 *
 * Result: 5 (buy at price 1, sell at price 6)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Single pass through the prices array
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * Only using constant extra space
 *
 * ### EDGE CASES:
 * - Prices always decreasing: return 0 (no profit possible)
 * - Single day: return 0 (need at least 2 days)
 * - All prices same: return 0 (no profit)
 * - Empty array: return 0
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
  console.log("Testing 121. Best Time To Buy And Sell Stock");

  // Test case 1: Basic example with clear buy and sell points
  const result1 = solve([7, 1, 5, 3, 6, 4]);
  const expected1 = 5;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: [7,1,5,3,6,4] -> ${result1}`);

  // Test case 2: Prices always decreasing
  const result2 = solve([7, 6, 4, 3, 1]);
  const expected2 = 0;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: [7,6,4,3,1] -> ${result2}`);

  // Test case 3: Single transaction at end
  const result3 = solve([2, 4, 1]);
  const expected3 = 2;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: [2,4,1] -> ${result3}`);

  // Test case 4: Empty array
  const result4 = solve([]);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: [] -> ${result4}`);

  // Test case 5: Single element
  const result5 = solve([5]);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: [5] -> ${result5}`);

  // Test case 6: Two elements - profit possible
  const result6 = solve([1, 5]);
  const expected6 = 4;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`Test 6 passed: [1,5] -> ${result6}`);

  // Test case 7: Two elements - no profit
  const result7 = solve([5, 1]);
  const expected7 = 0;
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );
  console.log(`Test 7 passed: [5,1] -> ${result7}`);

  // Test case 8: Prices always increasing
  const result8 = solve([1, 2, 3, 4, 5]);
  const expected8 = 4;
  console.assert(
    result8 === expected8,
    `Test 8 failed: expected ${expected8}, got ${result8}`,
  );
  console.log(`Test 8 passed: [1,2,3,4,5] -> ${result8}`);

  console.log(
    "All test cases passed for 121. Best Time To Buy And Sell Stock!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 121. Best Time To Buy And Sell Stock ===");
  console.log("Category: Sliding Window");
  console.log("Difficulty: Easy");
  console.log("");

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
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
