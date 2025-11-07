"""
### INTUITION:
To maximize profit, we need to buy at the lowest price and sell at the highest price after the buy date. The key insight is to track the minimum price seen so far and calculate profit at each day.

### APPROACH:
1. **Track minimum price**: Keep track of lowest price seen so far (best buy day)
2. **Calculate daily profit**: At each day, calculate profit if we sell today
3. **Update maximum profit**: Track the best profit seen so far
4. **Single pass**: Only need one pass through the array

### WHY THIS WORKS:
- We can only sell after we buy, so track minimum price up to current day
- At each day, the best profit is current_price - min_price_so_far
- No need to track actual buy/sell days, just the maximum profit
- Greedy approach: always buy at lowest available price

### EXAMPLE WALKTHROUGH:
Input:
```
prices = [7,1,5,3,6,4]
```

Day 0: price=7, min_price=7, profit=0, max_profit=0
Day 1: price=1, min_price=1, profit=0, max_profit=0
Day 2: price=5, min_price=1, profit=4, max_profit=4 (buy day 1, sell day 2)
Day 3: price=3, min_price=1, profit=2, max_profit=4
Day 4: price=6, min_price=1, profit=5, max_profit=5 (buy day 1, sell day 4)
Day 5: price=4, min_price=1, profit=3, max_profit=5
Result: 5 (buy at price 1, sell at price 6)

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n)**
Single pass through the prices array

### SPACE COMPLEXITY:
**O(1)**
Only using constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import Any


class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        """
        Find maximum profit from single buy-sell transaction.

        Args:
            prices: Array of stock prices by day

        Returns:
            Maximum profit achievable

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not prices or len(prices) < 2:
            return 0

        min_price = prices[0]
        max_profit = 0

        for price in prices[1:]:
            # Update maximum profit if selling today
            max_profit = max(max_profit, price - min_price)
            # Update minimum price for future transactions
            min_price = min(min_price, price)

        return max_profit

    def maxProfitTwoPointers(self, prices: list[int]) -> int:
        """
        Two-pointer approach: buy pointer and sell pointer.

        Args:
            prices: Stock prices

        Returns:
            Maximum profit

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not prices or len(prices) < 2:
            return 0

        left = 0  # Buy pointer
        right = 1  # Sell pointer
        max_profit = 0

        while right < len(prices):
            # If we can make a profit
            if prices[left] < prices[right]:
                profit = prices[right] - prices[left]
                max_profit = max(max_profit, profit)
            else:
                # Move buy pointer to current sell position (better buy day)
                left = right

            right += 1

        return max_profit

    def maxProfitKadane(self, prices: list[int]) -> int:
        """
        Kadane's algorithm variation: find maximum subarray sum.

        Args:
            prices: Stock prices

        Returns:
            Maximum profit

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not prices or len(prices) < 2:
            return 0

        max_profit = 0
        current_profit = 0

        for i in range(1, len(prices)):
            # Daily change in price
            daily_change = prices[i] - prices[i - 1]
            # Either extend current profit or start new (reset to 0)
            current_profit = max(0, current_profit + daily_change)
            # Update maximum profit seen
            max_profit = max(max_profit, current_profit)

        return max_profit


def test_solution() -> None:
    """
    Test cases for 121. Best Time to Buy and Sell Stock.
    """
    solution = Solution()

    # Test case 1: Example case
    prices1 = [7, 1, 5, 3, 6, 4]
    result1 = solution.maxProfit(prices1)
    expected1 = 5  # Buy at 1, sell at 6
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: No profit possible
    prices2 = [7, 6, 4, 3, 1]
    result2 = solution.maxProfit(prices2)
    expected2 = 0  # Prices only decrease
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single day
    prices3 = [1]
    result3 = solution.maxProfit(prices3)
    expected3 = 0  # Can't sell on same day
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Two days profit
    prices4 = [1, 5]
    result4 = solution.maxProfit(prices4)
    expected4 = 4  # Buy at 1, sell at 5
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Empty array
    prices5: list[Any] = []
    result5 = solution.maxProfit(prices5)
    expected5 = 0
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test two-pointer approach
    result6 = solution.maxProfitTwoPointers(prices1)
    assert result6 == expected1, f"Two-pointer: Expected {expected1}, got {result6}"

    # Test Kadane's algorithm approach
    result7 = solution.maxProfitKadane(prices1)
    assert result7 == expected1, f"Kadane's: Expected {expected1}, got {result7}"

    print("All test cases passed!")


def analyze_stock_example(prices: list[int]) -> None:
    """Analyze a stock price example step by step."""
    print(f"\nAnalyzing prices: {prices}")

    if not prices or len(prices) < 2:
        print("Not enough data for analysis")
        return

    min_price = prices[0]
    max_profit = 0
    best_buy_day = 0
    best_sell_day = 0

    print(f"\nDay-by-day analysis:")
    for i, price in enumerate(prices):
        if i == 0:
            print(f"Day {i}: price=${price}, min_price=${min_price}, profit=0, max_profit=${max_profit}")
            continue

        current_profit = price - min_price

        if current_profit > max_profit:
            max_profit = current_profit
            best_sell_day = i
            best_buy_day = prices.index(min_price)

        print(f"Day {i}: price=${price}, min_price=${min_price}, profit=${current_profit}, max_profit=${max_profit}")

        if price < min_price:
            min_price = price

    print(f"\nOptimal strategy:")
    if max_profit > 0:
        print(f"Buy on day {best_buy_day} at ${prices[best_buy_day]}")
        print(f"Sell on day {best_sell_day} at ${prices[best_sell_day]}")
        print(f"Maximum profit: ${max_profit}")
    else:
        print(f"No profitable transaction possible")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()

    print(f"=== 121. Best Time to Buy and Sell Stock ===")

    # Example 1: Classic case
    print(f"\nExample 1: Classic profitable case")
    prices1 = [7, 1, 5, 3, 6, 4]
    profit1 = solution.maxProfit(prices1)
    print(f"Prices: {prices1}")
    print(f"Maximum profit: ${profit1}")
    analyze_stock_example(prices1)

    # Example 2: Declining prices
    print(f"\nExample 2: Declining prices (no profit)")
    prices2 = [7, 6, 4, 3, 1]
    profit2 = solution.maxProfit(prices2)
    print(f"Prices: {prices2}")
    print(f"Maximum profit: ${profit2}")
    analyze_stock_example(prices2)

    # Compare different approaches
    print(f"\nAlgorithm comparison for {prices1}:")
    approaches = [
        ("Greedy (min price tracking)", solution.maxProfit),
        ("Two pointers", solution.maxProfitTwoPointers),
        ("Kadane's algorithm", solution.maxProfitKadane),
    ]

    for name, method in approaches:
        profit = method(prices1)
        print(f"{name}: ${profit}")

    print(f"\nKey insights:")
    print(f"1. Track the minimum price seen so far")
    print(f"2. At each day, calculate profit if selling today")
    print(f"3. Update maximum profit seen")
    print(f"4. This ensures we buy low and sell high")
    print(f"5. Time: O(n), Space: O(1) - optimal solution")
