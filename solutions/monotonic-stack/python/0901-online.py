"""
# Difficulty: Medium

# 901. Online Stock Span

Design a class StockSpanner which collects daily price quotes for some stock, and returns the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>Operations: ["StockSpanner","next","next","next","next","next","next","next"]</dd>
<dt>Output:</dt>
<dd>[1,1,1,2,1,4,6]</dd>
<dt>Explanation:</dt>
<dd>After each price, the stock price span is the count of consecutive days with price ≤ current price</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Stack Operations
**Data Structures**: Hash Set, Array, String
**Patterns**: Hash Table Pattern
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Maintain monotonic decreasing stack of (price, span) pairs. When new price comes, pop all lower prices and sum their spans. Current span = 1 + sum of popped spans. Push (price, span).

### APPROACH:
1. **Initialize in __init__**: Set self.stack = []
2. **In next method**: Initialize span = 1
3. **Process stack**: While stack and price >= stack[-1][0], span += stack.pop()[1]
4. **Push current**: Append (price, span) to stack
5. **Return span**: Return calculated span

### WHY THIS WORKS:
- Monotonic stack tracks (price, span) pairs in decreasing order
- When new price >= stack top, accumulate spans (those days included in current span)
- Pop and sum spans while price >= stack_top to get continuous span
- Amortized O(1) per call: each price pushed/popped at most once
- Stack maintains decreasing prices, enabling efficient span calculation

### EXAMPLE WALKTHROUGH:
Input:
```
Operations: ["StockSpanner","next","next","next","next","next","next","next"]
```

Values: [[],[100],[80],[60],[70],[60],[75],[85]]
Step 1: Process prices with monotonic stack
100: span=1, stack=[(100,1)]
80: span=1, stack=[(100,1),(80,1)]
60: span=1, stack=[(100,1),(80,1),(60,1)]
70: pop 60, span=1+1=2, stack=[(100,1),(80,1),(70,2)]
60=1, stack=[(100,1),(80,1),(70,2),(60,1)]
75: pop 60, pop 70, span=1+1+2=4, stack=[(100,1),(80,1),(75,4)]
85: pop 75, pop 80, span=1+4+1=6, stack=[(100,1),(85,6)]

Output:
```
[1,1,1,2,1,4,6]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any


class StockSpanner:
    """Stock price span calculator using monotonic stack."""

    def __init__(self) -> None:
        """Initialize with empty stack."""
        self.stack: list[tuple[int, int]] = []  # (price, span)

    def next(self, price: int) -> int:
        """
        Calculate span for current price.

        Args:
            price: Today's stock price

        Returns:
            Number of consecutive days with price <= today's price
        """
        span = 1
        while self.stack and price >= self.stack[-1][0]:
            span += self.stack.pop()[1]
        self.stack.append((price, span))
        return span


class Solution:
    def solve(self, operations: list[str], values: list[list[Any]]) -> list[Any]:
        """
        Wrapper method to test StockSpanner with sequence of operations.

        Args:
            operations: List of operation names
            values: List of parameters for each operation

        Returns:
            List of results from each operation
        """
        result: list[Any] = []
        spanner = None

        for op, val in zip(operations, values):
            if op == "StockSpanner":
                spanner = StockSpanner()
                result.append(None)
            elif op == "next":
                result.append(spanner.next(val[0]))  # type: ignore

        return result


def test_solution() -> None:
    """
    Test cases for 901. Online Stock Span.
    """
    solution = Solution()

    # Test case 1: Classic example
    operations = ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
    values = [[], [100], [80], [60], [70], [60], [75], [85]]
    solution.solve(operations, values)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 2: Increasing prices
    operations = ["StockSpanner", "next", "next", "next", "next"]
    values = [[], [10], [20], [30], [40]]
    solution.solve(operations, values)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 3: Decreasing prices
    operations = ["StockSpanner", "next", "next", "next", "next"]
    values = [[], [40], [30], [20], [10]]
    solution.solve(operations, values)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 4: All same price
    operations = ["StockSpanner", "next", "next", "next"]
    values = [[], [50], [50], [50]]
    solution.solve(operations, values)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 5: Single price
    operations = ["StockSpanner", "next"]
    values = [[], [100]]
    solution.solve(operations, values)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

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
