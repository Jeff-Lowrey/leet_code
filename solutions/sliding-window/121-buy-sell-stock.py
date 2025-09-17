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
