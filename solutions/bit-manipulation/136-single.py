"""
# Difficulty: Easy

# 136. Single Number

Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[4,1,2,1,2]</dd>
<dt>Output:</dt>
<dd>4 (single number)</dd>
<dt>Explanation:</dt>
<dd>The single number 4 appears once in [2,2,1,4,1] (all others appear twice)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
XOR has the property that a^a=0 and a^0=a. XOR all numbers together - pairs cancel out to 0, leaving only the single number that appears once.

### APPROACH:
1. **Initialize result**: Set result = 0 to accumulate XOR values
2. **Iterate through array**: Loop through each number in nums
3. **Apply XOR operation**: For each num, compute result ^= num
4. **Leverage XOR properties**: Use the fact that a^a=0 (duplicate pairs cancel) and a^0=a (identity)
5. **Pairs cancel out**: All numbers appearing twice XOR to 0
6. **Single number remains**: The number appearing once remains after all XORs
7. **Return result**: Return the final result value

### WHY THIS WORKS:
- XOR all numbers: duplicates cancel (a ^ a = 0), leaving single number
- XOR properties: commutative, associative, identity is 0
- Single pass accumulating XOR values
- Final result is the single non-duplicate number
- O(n) time, O(1) space

### EXAMPLE WALKTHROUGH:
```
Input: nums = [4,1,2,1,2]
Step 1: XOR all numbers
  result = 0
  result ^= 4 → result = 4 (binary: 100)
  result ^= 1 → result = 5 (binary: 101)
  result ^= 2 → result = 7 (binary: 111)
  result ^= 1 → result = 6 (binary: 110)
  result ^= 2 → result = 4 (binary: 100)

Step 2: All duplicate numbers cancel out (a^a=0)
  Pairs: (1^1)=0, (2^2)=0
  Remaining: 4

Output: 4 (single number)
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
        Find the single number in an array where all other numbers appear twice.

        Args:
            nums (List[int]): Array of integers where all numbers except one appear twice

        Returns:
            int: The number that appears only once

        Example:
            >>> solution = Solution()
            >>> solution.singleNumber([2,2,1])
            1
            >>> solution.singleNumber([4,1,2,1,2])
            4
        """
        # Using XOR operation:
        # - XOR of a number with itself is 0
        # - XOR of a number with 0 is the number itself
        # - XOR is associative and commutative
        result = 0
        for num in nums:
            result ^= num
        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.singleNumber([4, 1, 2, 1, 2])
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Single element
    result = solution.singleNumber([1])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Negative numbers
    result = solution.singleNumber([-1, -2, -3, -2, -1])
    expected = -3
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 136. Single")
