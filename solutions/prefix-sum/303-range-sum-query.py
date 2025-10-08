"""
# 303. Range Sum Query
**Preprocessing**

Given a problem that demonstrates key concepts in Prefix Sum.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of prefix sum concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply prefix sum methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages prefix sum principles
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

The approach uses prefix sum techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using prefix sum method
3. Return the computed result

</details>
"""


class NumArray:
    """
    Range Sum Query using prefix sum preprocessing.
    """

    def __init__(self, nums: list[int]):
        """
        Initialize with array and compute prefix sums.

        Args:
            nums: Input array of integers

        Time Complexity: O(n) - compute prefix sum array
        Space Complexity: O(n) - store prefix sum array
        """
        # Build prefix sum array
        # prefix[i] = sum of nums[0:i]
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)

    def sumRange(self, left: int, right: int) -> int:
        """
        Calculate sum of elements from index left to right (inclusive).

        Args:
            left: Left boundary (inclusive)
            right: Right boundary (inclusive)

        Returns:
            Sum of elements in range [left, right]

        Time Complexity: O(1) - constant time lookup
        Space Complexity: O(1) - no extra space
        """
        return self.prefix[right + 1] - self.prefix[left]


class Solution:
    def solve(self, operations: list[str], values: list[list]) -> list:
        """
        Wrapper method to test NumArray with sequence of operations.

        Args:
            operations: List of operation names
            values: List of parameters for each operation

        Returns:
            List of results from each operation
        """
        result = []
        num_array = None

        for op, val in zip(operations, values, strict=False):
            if op == "NumArray":
                num_array = NumArray(val[0])  # Unpack the array from the list
                result.append(None)
            elif op == "sumRange":
                result.append(num_array.sumRange(val[0], val[1]))

        return result


def test_solution():
    """
    Test cases for 303. Range Sum Query - Immutable.
    """
    solution = Solution()

    # Test case 1: Classic example
    operations = ["NumArray", "sumRange", "sumRange", "sumRange"]
    values = [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
    result = solution.solve(operations, values)
    expected = [None, 1, -1, -3]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Single element
    operations = ["NumArray", "sumRange"]
    values = [[[5]], [0, 0]]
    result = solution.solve(operations, values)
    expected = [None, 5]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: All positive
    operations = ["NumArray", "sumRange", "sumRange"]
    values = [[[1, 2, 3, 4, 5]], [0, 4], [1, 3]]
    result = solution.solve(operations, values)
    expected = [None, 15, 9]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Mixed values
    operations = ["NumArray", "sumRange", "sumRange", "sumRange"]
    values = [[[1, -1, 2, -2, 3]], [0, 4], [1, 2], [3, 4]]
    result = solution.solve(operations, values)
    expected = [None, 3, 1, 1]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Two elements
    operations = ["NumArray", "sumRange", "sumRange"]
    values = [[[10, 20]], [0, 0], [0, 1]]
    result = solution.solve(operations, values)
    expected = [None, 10, 30]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    nums = [-2, 0, 3, -5, 2, -1]
    num_array = NumArray(nums)
    print("Solution for 303. Range Sum Query - Immutable:")
    print(f"Sum of range [0, 2]: {num_array.sumRange(0, 2)}")
    print(f"Sum of range [2, 5]: {num_array.sumRange(2, 5)}")
    print(f"Sum of range [0, 5]: {num_array.sumRange(0, 5)}")
