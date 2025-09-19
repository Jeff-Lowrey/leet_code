"""
121. Best Time to Buy and Sell Stock
Easy

You are given an array prices where prices[i] is the price of a given stock on
the ith day.

You want to maximize your profit by choosing a single day to buy one stock and
choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot
achieve any profit, return 0.

Example:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
To maximize profit, we need to buy at the lowest price and sell at the highest price that comes after the buy date. This suggests tracking the minimum price seen so far and calculating potential profit at each step.

### APPROACH:
1. Keep track of the minimum price encountered so far
2. For each price, calculate the profit if we sell at that price
3. Update the maximum profit found
4. Return the maximum profit

### WHY THIS WORKS:
By maintaining the minimum price seen so far, we ensure we're always considering the best possible buy price for any sell price. Since we can only sell after buying, processing prices left to right naturally handles the timing constraint.

### TIME COMPLEXITY: O(n)
- Single pass through the prices array

### SPACE COMPLEXITY: O(1)
- Only using constant extra space

### EXAMPLE WALKTHROUGH:
For prices = [7,1,5,3,6,4]:
1. Day 0: min_price=7, profit=0, max_profit=0
2. Day 1: min_price=1, profit=0, max_profit=0
3. Day 2: min_price=1, profit=4, max_profit=4
4. Day 3: min_price=1, profit=2, max_profit=4
5. Day 4: min_price=1, profit=5, max_profit=5
6. Day 5: min_price=1, profit=3, max_profit=5

### EDGE CASES:
- Empty array: return 0
- Prices always decreasing: return 0 (no profit possible)
- Single price: return 0 (need at least 2 days to trade)

### ALTERNATIVE APPROACH:
Two pointers approach where left pointer tracks buy day and right pointer tracks sell day, moving left pointer when a lower price is found.

</details>

class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        """
        Approach: Sliding Window / One Pass
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not prices:
            return 0

        min_price = float('inf')
        max_profit = 0

        for price in prices:
            # Update minimum price seen so far
            min_price = min(min_price, price)
            # Calculate profit if we sell at current price
            profit = price - min_price
            # Update maximum profit
            max_profit = max(max_profit, profit)

        return max_profit

    def maxProfitTwoPointers(self, prices: list[int]) -> int:
        """
        Approach: Two Pointers
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not prices:
            return 0

        left = 0  # Buy
        right = 1  # Sell
        max_profit = 0

        while right < len(prices):
            if prices[left] < prices[right]:
                profit = prices[right] - prices[left]
                max_profit = max(max_profit, profit)
            else:
                left = right

            right += 1

        return max_profit


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    prices1 = [7, 1, 5, 3, 6, 4]
    print(f"Input: {prices1}")
    print(f"Output: {solution.maxProfit(prices1)}")  # 5

    # Test case 2
    prices2 = [7, 6, 4, 3, 1]
    print(f"Input: {prices2}")
    print(f"Output: {solution.maxProfit(prices2)}")  # 0
