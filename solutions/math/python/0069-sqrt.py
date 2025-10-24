"""
# Difficulty: Medium

# 069. Sqrt(x)

Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>x = 8</dd>
<dt>Output:</dt>
<dd>2 (floor of sqrt(8))</dd>
<dt>Explanation:</dt>
<dd>Integer square root of 8 is 2</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Two Pointers, Binary Search
**Data Structures**: Hash Set, Tree
**Patterns**: Two Pointers Pattern, Binary Search Pattern
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use binary search on the range [0, x]. For mid, check if mid * mid <= x. If yes, mid could be answer; try larger. If no, try smaller. Converge to floor(sqrt(x)).

### APPROACH:
1. **Handle edge cases**: If x == 0 or x == 1, return x
2. **Initialize binary search**: Set left = 1, right = x // 2
3. **Binary search loop**: While left <= right, calculate mid
4. **Check if perfect square**: If mid * mid == x, return mid
5. **Search right half**: If mid * mid < x, set left = mid + 1, store mid
6. **Search left half**: If mid * mid > x, set right = mid - 1
7. **Return result**: Return stored result (largest integer whose square <= x)

### WHY THIS WORKS:
- Binary search on range [0, x] for answer
- If mid * mid == x, found exact square root
- If mid * mid < x, answer might be mid or higher (left = mid + 1)
- If mid * mid > x, answer is lower (right = mid - 1)
- O(log x) time binary search, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
x = 8
```

Step 1: Binary search
left=0, right=8
mid=4: 4*4=16 > 8, right=3
mid=1: 1*1=1 < 8, left=2
mid=2: 2*2=4 < 8, left=3
mid=3: 3*3=9 > 8, right=2
left > right, return 2

Output:
```
2 (floor of sqrt(8))
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


class Solution:
    def mySqrt(self, x: int) -> int:
        """
        Calculate the square root of a non-negative integer x.

        Args:
            x (int): Non-negative integer input

        Returns:
            int: Floor value of the square root of x

        Examples:
            >>> solution = Solution()
            >>> solution.mySqrt(4)
            2
            >>> solution.mySqrt(8)
            2
            >>> solution.mySqrt(0)
            0
        """
        # Handle edge cases
        if x == 0:
            return 0
        if x == 1:
            return 1

        # Use binary search to find the square root
        left, right = 1, x

        while left <= right:
            mid = (left + right) // 2

            # Calculate square of middle point
            square = mid * mid

            if square == x:
                return mid
            elif square < x:
                # If square is less than x, search in right half
                left = mid + 1
                # Keep track of the floor value
                result = mid
            else:
                # If square is greater than x, search in left half
                right = mid - 1

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.mySqrt(8)
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Perfect square
    result = solution.mySqrt(4)
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Zero
    result = solution.mySqrt(0)
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 069. Sqrt")
