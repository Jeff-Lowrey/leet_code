"""
### INTUITION:
The key insight is that use sliding window of size k. Calculate sum of first window. Then slide: subtract left element, add right element. Track maximum sum. Divide by k for average.

### APPROACH:
1. **Calculate first window**: Compute sum of first k elements as current_sum
2. **Initialize maximum**: Set max_sum = current_sum
3. **Slide window**: For i from k to len(nums)
4. **Update window sum**: current_sum = current_sum - nums[i-k] + nums[i]
5. **Update maximum**: max_sum = max(max_sum, current_sum)
6. **Continue sliding**: Process all possible windows
7. **Calculate average**: Return max_sum / k

### WHY THIS WORKS:
- This ensures that fixed-size sliding window of length k
- This ensures that initial window: sum first k elements
- This ensures that slide: add nums[i+k], remove nums[i] for each position
- This ensures that track maximum sum seen, divide by k at end for average
- This ensures that o(n) time: single pass with constant work per element, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,12,-5,-6,50,3], k = 4
```

Step 1: Calculate first window sum
sum = 1+12+(-5)+(-6) = 2, avg = 0.5
Step 2: Slide window
sum = 2-1+50 = 51, avg = 12.75
sum = 51-12+3 = 42, avg = 10.5

Output:
```
12.75 (maximum average)
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

</details>

"""

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        """
        Find the maximum average value of any contiguous subarray of size k.

        Args:
            nums: List of integers
            k: Size of the subarray

        Returns:
            float: Maximum average value of any contiguous subarray of size k

        Example:
            >>> solution = Solution()
            >>> solution.findMaxAverage([1,12,-5,-6,50,3], 4)
            12.75
        """
        if not nums or k <= 0 or k > len(nums):
            return 0.0

        # Initialize the sum of first k elements
        current_sum = sum(nums[:k])
        max_sum = current_sum

        # Slide the window and keep track of maximum sum
        for i in range(k, len(nums)):
            # Add new element and remove first element of previous window
            current_sum = current_sum + nums[i] - nums[i - k]
            max_sum = max(max_sum, current_sum)

        # Return the maximum average
        return max_sum / k


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.findMaxAverage([1, 2, 3], 2)
    expected = 2.5
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.findMaxAverage([], 0)
    expected = 0.0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 643. Maximum Average Subarray I")
