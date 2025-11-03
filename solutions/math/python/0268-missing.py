"""
### INTUITION:
The key insight is that the missing number is the difference between expected sum (n*(n+1)/2) and actual sum. Alternatively, XOR all numbers and all indices to cancel pairs, leaving missing number.

### APPROACH:
1. **Calculate expected sum**: expected = n * (n + 1) // 2
2. **Calculate actual sum**: actual = sum(nums)
3. **Find difference**: missing = expected - actual
4. **Return result**: Return missing number

### WHY THIS WORKS:
- This ensures that xOR all numbers 0..n and all array elements
- This ensures that duplicate numbers XOR to 0, leaving only missing number
- This ensures that alternative: expected sum - actual sum = missing (Gauss formula)
- This ensures that xOR approach avoids integer overflow issues
- This ensures that o(n) time, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [3,0,1]
```

Step 1: Calculate expected sum
expected = 0+1+2+3 = 6
Step 2: Calculate actual sum
actual = 3+0+1 = 4
Step 3: Find difference
missing = 6 - 4 = 2

Output:
```
2 (missing number)
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

from typing import List, Optional, Dict, Tuple


class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        """
        Find the missing number in a sequence of n numbers from 0 to n.

        This implementation uses the mathematical formula for sum of first n numbers
        and subtracts the sum of given numbers to find the missing one.
        Time Complexity: O(n)
        Space Complexity: O(1)

        Args:
            nums: List of integers containing n numbers from 0 to n with one missing

        Returns:
            The missing number in the sequence
        """
        n = len(nums)
        # Expected sum of numbers from 0 to n
        expected_sum = (n * (n + 1)) // 2
        # Actual sum of numbers in the array
        actual_sum = sum(nums)
        # The difference is the missing number
        return expected_sum - actual_sum

    def missingNumber_xor(self, nums: List[int]) -> int:
        """
        Alternative implementation using XOR operation.

        This method uses the property that a^a = 0 and a^0 = a
        Time Complexity: O(n)
        Space Complexity: O(1)

        Args:
            nums: List of integers containing n numbers from 0 to n with one missing

        Returns:
            The missing number in the sequence
        """
        result = len(nums)
        for i in range(len(nums)):
            result ^= i ^ nums[i]
        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.missingNumber([1, 2, 3])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.missingNumber([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.missingNumber([1])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 268. Missing")
