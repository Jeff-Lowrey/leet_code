"""
# Difficulty: Medium

# 0137. Single Number II

Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[2,2,3,2]</dd>
<dt>Output:</dt>
<dd>3 (single number)</dd>
<dt>Explanation:</dt>
<dd>The single number 3 appears once in [2,2,3,2] (all others appear thrice)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use bit manipulation to count occurrences at each bit position. For each bit, sum all bits at that position mod 3. The result is the bit pattern of the single number appearing once.

### APPROACH:
1. **Initialize counters**: Set ones = 0 and twos = 0 to track bits appearing once and twice
2. **Iterate through numbers**: Loop through each num in nums array
3. **Update twos**: Set twos |= (ones & num) to mark bits that appeared twice
4. **Update ones**: Set ones ^= num to toggle bits appearing odd times
5. **Clear bits appearing thrice**: Compute common = ~(ones & twos) and apply ones &= common, twos &= common
6. **Eliminate triple occurrences**: Bits appearing 3 times are cleared from both ones and twos
7. **Return result**: Return ones which contains the single number appearing exactly once

### WHY THIS WORKS:
- Count bits at each position across all numbers
- If count[i] % 3 != 0, single number has bit i set
# - Build result by setting bits where count % 3 == 1  # Result undefined
- Duplicates contribute 3 to each bit position, single contributes 1
- O(n) time: 32 passes (constant), O(1) space

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
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
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
