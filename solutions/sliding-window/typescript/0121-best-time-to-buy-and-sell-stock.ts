/**
 * # Difficulty: Easy
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
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

class Solution {
  /**
   * Find maximum profit from single buy-sell transaction.
   *
   *         Args:
   *             prices: Array of stock prices by day
   *
   *         Returns:
   *             Maximum profit achievable
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(1)
   */
  maxProfit(prices: number[]): number {
    // Implementation
    if not prices or prices.length < 2:
    return 0
    min_price = prices.get(0)
    max_profit = 0
    for price in prices.get(1:):
    max_profit = max(max_profit, price - min_price)
  }

  /**
   * Two-pointer approach: buy pointer and sell pointer.
   *
   *         Args:
   *             prices: Stock prices
   *
   *         Returns:
   *             Maximum profit
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(1)
   */
  maxProfitTwoPointers(prices: number[]): number {
    // Implementation
    if not prices or prices.length < 2:
    return 0
    left = 0  # Buy pointer
    right = 1  # Sell pointer
    max_profit = 0
    while right < prices.length:
    if prices.get(left) < prices.get(right):
  }

  /**
   * Kadane's algorithm variation: find maximum subarray sum.
   *
   *         Args:
   *             prices: Stock prices
   *
   *         Returns:
   *             Maximum profit
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(1)
   */
  maxProfitKadane(prices: number[]): number {
    // Implementation
    if not prices or prices.length < 2:
    return 0
    max_profit = 0
    current_profit = 0
    for (let i = 0; i < 1, prices.length; i++) {
    daily_change = prices.get(i) - prices.get(i - 1)
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log(`=== 121. Best Time to Buy and Sell Stock ===`)
  # Example 1: Classic case
  console.log(`\nExample 1: Classic profitable case`)
  prices1 = [7, 1, 5, 3, 6, 4]
  profit1 = solution.maxProfit(prices1)
  console.log(`Prices: {prices1}`)
  console.log(`Maximum profit: ${profit1}`)
  analyze_stock_example(prices1)
  # Example 2: Declining prices
  console.log(`\nExample 2: Declining prices (no profit)`)
  prices2 = [7, 6, 4, 3, 1]
  profit2 = solution.maxProfit(prices2)
  console.log(`Prices: {prices2}`)
  console.log(`Maximum profit: ${profit2}`)
  analyze_stock_example(prices2)
  # Compare different approaches
  console.log(`\nAlgorithm comparison for {prices1}:`)
  approaches = [
  ("Greedy (min price tracking)", solution.maxProfit),
  ("Two pointers", solution.maxProfitTwoPointers),
  ("Kadane's algorithm", solution.maxProfitKadane),
  ]
  for name, method in approaches:
  profit = method(prices1)
  console.log(`{name}: ${profit}`)
  console.log(`\nKey insights:`)
  console.log(`1. Track the minimum price seen so far`)
  console.log(`2. At each day, calculate profit if selling today`)
  console.log(`3. Update maximum profit seen`)
  console.log(`4. This ensures we buy low and sell high`)
  console.log(`5. Time: O(n), Space: O(1) - optimal solution`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;