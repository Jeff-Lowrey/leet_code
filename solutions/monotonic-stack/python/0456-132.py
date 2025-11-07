"""
### INTUITION:
The key insight is that track minimum values seen so far from left. Use decreasing stack from right to find first element < stack top. The 132 pattern means min < nums[j] < nums[k] where i < j < k.

### APPROACH:
1. **Initialize variables**: Set s3 = float('-inf'), stack = []
2. **Iterate backward**: For i in range(len(nums)-1, -1, -1)
3. **Check pattern**: If nums[i] < s3, return True
4. **Update s3**: While stack and nums[i] > stack[-1], s3 = stack.pop()
5. **Push to stack**: Append nums[i] to stack
6. **Continue scanning**: Process all elements
7. **Return False**: If loop completes without finding pattern

### WHY THIS WORKS:
- Find 132 pattern: nums[i] < nums[k] < nums[j] where i < j < k
- Monotonic stack tracks potential nums[k], maintain max nums[k] found
- Traverse right-to-left: if current < nums[k], found 132 pattern
- Stack maintains decreasing sequence, pops when larger element found
- O(n) time single pass, O(n) space for stack

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [3,1,4,2]
```

Step 1: Find 132 pattern
i=0, j=2, k=3: nums[0]=3, nums[2]=4, nums[3]=2
Check: 3 < 4 and 2 < 4 and 3 > 2? Yes

Output:
```
True (132 pattern exists)
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        """
        Determines if the given array contains a 132 pattern.

        Args:
            nums: List of integers to check for the pattern

        Returns:
            bool: True if a 132 pattern exists, False otherwise
        """
        if len(nums) < 3:
            return False

        # Stack to keep track of potential "2" values
        stack: list[Any] = []

        # Initialize the "2" value (nums[k]) as negative infinity
        s3 = float("-inf")

        # Iterate through the array from right to left
        for num in reversed(nums):
            # If current number is less than s3, we found a 132 pattern
            if num < s3:
                return True

            # While stack is not empty and current number is greater than top of stack
            while stack and stack[-1] < num:
                # Update s3 (potential "2" value)
                s3 = stack.pop()

            # Add current number to stack as potential "3" value
            stack.append(num)

        return False


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.find132pattern([1, 2, 3])
    expected = False
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.find132pattern([])
    expected = False
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.find132pattern([1])
    expected = False
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 456. 132")
