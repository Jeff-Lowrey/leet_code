"""
# 901. Online
# Difficulty: Medium
Given a problem that demonstrates key concepts in Monotonic Stack.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply monotonic stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages monotonic stack principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses monotonic stack techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using monotonic stack method
3. Return the computed result

</details>
"""

class StockSpanner:
    """
    Online stock span calculator using monotonic stack.
    Calculates the span of stock's price for the current day.
    Span = number of consecutive days (including today) where price <= today's price.
    """

    def __init__(self):
        """
        Initialize the stock spanner with an empty monotonic decreasing stack.
        Stack stores pairs of (price, span).

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.stack = []  # Monotonic decreasing stack: (price, span)

    def next(self, price: int) -> int:
        """
        Calculate span for the current price.

        Args:
            price: Today's stock price

        Returns:
            Number of consecutive days with price <= today's price

        Time Complexity: O(1) amortized - each element pushed/popped once
        Space Complexity: O(n) - stack can hold all prices in worst case
        """
        span = 1

        # Pop all smaller or equal prices and accumulate their spans
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]

        # Push current price with its span
        self.stack.append((price, span))

        return span

class Solution:
    def solve(self, operations: list[str], values: list[list]) -> list:
        """
        Wrapper method to test StockSpanner with sequence of operations.

        Args:
            operations: List of operation names
            values: List of parameters for each operation

        Returns:
            List of results from each operation
        """
        result = []
        spanner = None

        for op, val in zip(operations, values):
            if op == "StockSpanner":
                spanner = StockSpanner()
                result.append(None)
            elif op == "next":
                result.append(spanner.next(val[0]))

        return result

def test_solution():
    """
    Test cases for 901. Online Stock Span.
    """
    solution = Solution()

    # Test case 1: Classic example
    operations = ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
    values = [[], [100], [80], [60], [70], [60], [75], [85]]
    result = solution.solve(operations, values)
    expected = [None, 1, 1, 1, 2, 1, 4, 6]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Increasing prices
    operations = ["StockSpanner", "next", "next", "next", "next"]
    values = [[], [10], [20], [30], [40]]
    result = solution.solve(operations, values)
    expected = [None, 1, 2, 3, 4]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Decreasing prices
    operations = ["StockSpanner", "next", "next", "next", "next"]
    values = [[], [40], [30], [20], [10]]
    result = solution.solve(operations, values)
    expected = [None, 1, 1, 1, 1]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: All same price
    operations = ["StockSpanner", "next", "next", "next"]
    values = [[], [50], [50], [50]]
    result = solution.solve(operations, values)
    expected = [None, 1, 2, 3]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Single price
    operations = ["StockSpanner", "next"]
    values = [[], [100]]
    result = solution.solve(operations, values)
    expected = [None, 1]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    spanner = StockSpanner()
    print(f"Solution for 901. Online Stock Span:")
    print(f"Price 100: Span {spanner.next(100)}")
    print(f"Price 80: Span {spanner.next(80)}")
    print(f"Price 60: Span {spanner.next(60)}")
    print(f"Price 70: Span {spanner.next(70)}")
    print(f"Price 60: Span {spanner.next(60)}")
    print(f"Price 75: Span {spanner.next(75)}")
    print(f"Price 85: Span {spanner.next(85)}")
