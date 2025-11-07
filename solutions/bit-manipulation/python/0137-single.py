"""
### INTUITION:
The key insight is that use bit manipulation to count occurrences at each bit position. For each bit, sum all bits at that position mod 3. The result is the bit pattern of the single number appearing once.

### APPROACH:
1. **Initialize counters**: Set ones = 0 and twos = 0 to track bits appearing once and twice
2. **Iterate through numbers**: Loop through each num in nums array
3. **Update twos**: Set twos |= (ones & num) to mark bits that appeared twice
4. **Update ones**: Set ones ^= num to toggle bits appearing odd times
5. **Clear bits appearing thrice**: Compute common = ~(ones & twos) and apply ones &= common, twos &= common
6. **Eliminate triple occurrences**: Bits appearing 3 times are cleared from both ones and twos
7. **Return result**: Return ones which contains the single number appearing exactly once

### WHY THIS WORKS:
- This ensures that count bits at each position across all numbers
- This ensures that if count[i] % 3 != 0, single number has bit i set
# - Build result by setting bits where count % 3 == 1  # Result undefined
- This ensures that duplicates contribute 3 to each bit position, single contributes 1
- This ensures that o(n) time: 32 passes (constant), O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [2,2,3,2]
```

Step 1: Count bits at each position
Binary representations:
2 = 010
2 = 010
3 = 011
2 = 010

Steps:
Step 1: Bit 0: appears 1 time → 1 % 3 = 1
Step 2: Bit 1: appears 4 times → 4 % 3 = 1
Step 3: Bit 2: appears 0 times → 0 % 3 = 0
Step 4: Build result from remaining bits
Step 5: result = 011 (binary) = 3 (decimal)

Output:
```
3 (single number)
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

from typing import List, Optional, Dict, Tuple


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        """
        Find the single number that appears only once while others appear three times.

        Args:
            nums: List of integers where all numbers except one appear three times

        Returns:
            The number that appears only once

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Initialize ones and twos for bit manipulation
        ones = 0
        twos = 0

        for num in nums:
            # First appearance: add to ones
            # Second appearance: remove from ones, add to twos
            # Third appearance: remove from twos
            ones = (ones ^ num) & ~twos
            twos = (twos ^ num) & ~ones

        return ones


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.singleNumber([2, 2, 3, 2])
    expected = 3
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Single element
    result = solution.singleNumber([1])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Larger example
    result = solution.singleNumber([0, 1, 0, 1, 0, 1, 99])
    expected = 99
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 137. Single")
