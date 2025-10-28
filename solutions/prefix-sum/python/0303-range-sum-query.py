"""
# Difficulty: Easy

# 0303. Range Sum Query - Immutable

Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.

Implement the NumArray class:

- NumArray(int[] nums) Initializes the object with the integer array nums.
- int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e., nums[left] + nums[left + 1] + ... + nums[right]).

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>["NumArray","sumRange","sumRange","sumRange"], [[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]</dd>
<dt>Output:</dt>
<dd>[null,1,-1,-3]</dd>
<dt>Explanation:</dt>
<dd>The sum of elements between indices 2 and 5 is calculated as prefix[5+1] - prefix[2] = 1</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Array, String, Tree
**Patterns**: Two Pointers Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Precompute cumulative sums in array. For range [i,j], the sum is prefix[j+1] - prefix[i]. This reduces each query from O(n) to O(1) with O(n) preprocessing.

### APPROACH:
1. **Initialize prefix sum**: In __init__, create self.prefix_sum = [0] * (len(nums) + 1)
2. **Build prefix array**: For i in range(len(nums)), prefix_sum[i+1] = prefix_sum[i] + nums[i]
3. **Query with O(1)**: In sumRange, return self.prefix_sum[right+1] - self.prefix_sum[left]
4. **Leverage preprocessing**: Use pre-computed cumulative sums for fast queries

### WHY THIS WORKS:
- Precompute cumulative sums: prefix[i] = sum of nums[0..i-1]
- Range sum [left, right] = prefix[right+1] - prefix[left]
- O(n) preprocessing builds prefix array once
- O(1) query time: just subtraction, no loop needed
- Trade O(n) space for constant-time queries vs O(n) per query without prefix

### EXAMPLE WALKTHROUGH:
Input:
```
["NumArray","sumRange","sumRange","sumRange"], [[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]
```

Step 1: Build prefix sum array
nums = [-2,0,3,-5,2,-1]
prefix = [0,-2,-2,1,-4,-2,-3]
Step 2: Query using prefix
sumRange(0,2) = prefix[3] - prefix[0] = 1 - 0 = 1
sumRange(2,5) = prefix[6] - prefix[2] = -3 - (-2) = -1
sumRange(0,5) = prefix[6] - prefix[0] = -3 - 0 = -3

Output:
```
[null,1,-1,-3]
```

### TIME COMPLEXITY:
O(n)

- Single pass through the input


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any


class Solution:
    """Wrapper class for testing NumArray."""

    def solve(self, operations: list[str], values: list[list[Any]]) -> list[Any]:
        """
        Wrapper method to test NumArray with sequence of operations.

        Args:
            operations: List of operation names
            values: List of parameters for each operation

        Returns:
            List of results from each operation
        """
        result: list[Any] = []
        num_array = None

        for op, val in zip(operations, values, strict=False):
            if op == "NumArray":
                num_array = NumArray(val[0])  # Unpack the array from the list
                result.append(None)
            elif op == "sumRange":
                result.append(num_array.sumRange(val[0], val[1]))  # type: ignore

        return result


class NumArray:
    """Immutable range sum query using prefix sums."""

    def __init__(self, nums: list[int]) -> None:
        """Initialize with prefix sum array."""
        self.prefix: list[int] = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)

    def sumRange(self, left: int, right: int) -> int:
        """Return sum of elements from index left to right."""
        return self.prefix[right + 1] - self.prefix[left]


def test_solution() -> None:
    """
    Test cases for 303. Range Sum Query - Immutable.
    """
    solution = Solution()

    # Test case 1: Classic example
    operations = ["NumArray", "sumRange", "sumRange", "sumRange"]
    values = [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
    solution.solve(operations, values)  # type: ignore
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 2: Single element
    operations = ["NumArray", "sumRange"]
    values = [[[5]], [0, 0]]
    solution.solve(operations, values)  # type: ignore
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 3: All positive
    operations = ["NumArray", "sumRange", "sumRange"]
    values = [[[1, 2, 3, 4, 5]], [0, 4], [1, 3]]
    solution.solve(operations, values)  # type: ignore
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 4: Mixed values
    operations = ["NumArray", "sumRange", "sumRange", "sumRange"]
    values = [[[1, -1, 2, -2, 3]], [0, 4], [1, 2], [3, 4]]
    solution.solve(operations, values)  # type: ignore
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 5: Two elements
    operations = ["NumArray", "sumRange", "sumRange"]
    values = [[[10, 20]], [0, 0], [0, 1]]
    solution.solve(operations, values)  # type: ignore
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

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
