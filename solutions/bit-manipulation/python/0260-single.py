"""
# Difficulty: Medium

# 0260. Single Number III

Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [1,2,1,3,2,5]</dd>
<dt>Output:</dt>
<dd>[3, 5] (two single numbers)</dd>
<dt>Explanation:</dt>
<dd>Two numbers [3,5] appear once in [1,2,1,3,2,5]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Sorting
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Divide and Conquer
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
XOR all numbers - pairs cancel leaving x^y. Find any set bit in x^y to distinguish them. Partition numbers by this bit and XOR each partition separately to get x and y.

### APPROACH:
1. **XOR all numbers**: Compute xor_all = 0, then xor_all ^= num for each num (pairs cancel, leaving two singles XORed)
2. **Find differentiating bit**: Find rightmost set bit in xor_all using rightmost_bit = xor_all & (-xor_all)
3. **Partition into groups**: This bit is 1 in one single number and 0 in the other
4. **Initialize two results**: Set num1 = 0, num2 = 0 to accumulate XORs for each group
5. **Separate by bit**: For each num, if (num & rightmost_bit), add to num1 group, else num2 group
6. **XOR within groups**: XOR all numbers in each group separately (pairs cancel within groups)
7. **Return both singles**: Return [num1, num2] as the two numbers appearing once

### WHY THIS WORKS:
- XOR all numbers: duplicates cancel, left with xor = a ^ b
- Find any set bit in xor (rightmost set bit: xor & -xor)
- Split numbers into two groups by this bit (one has a, other has b)
- XOR each group separately to find a and b
- O(n) time: two passes, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,2,1,3,2,5]
```

Step 1: XOR all numbers
xor = 1^2^1^3^2^5 = 3^5 = 6 (binary: 110)
Step 2: Find rightmost set bit
rightmost_bit = xor & -xor = 110 & 010 = 010 (bit 1)
Step 3: Partition numbers by rightmost bit

Steps:
Step 1: Group 1 (bit 1 is 0): [1,1,5] → XOR = 5
Step 2: Group 2 (bit 1 is 1): [2,3,2] → XOR = 3

Output:
```
[3, 5] (two single numbers)
```

### TIME COMPLEXITY:
O(n)
- Single pass through input


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        """
        Find two numbers that appear only once in the array.

        Args:
            nums: List of integers where all numbers except two appear twice

        Returns:
            List containing the two numbers that appear only once

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not nums:
            return []

        # Step 1: XOR all numbers together
        # This will give us XOR of two unique numbers (let's call them x and y)
        # because all other numbers appear twice and will cancel out
        xor_result = 0
        for num in nums:
            xor_result ^= num

        # Step 2: Find rightmost set bit in xor_result
        # This bit will be different in x and y
        rightmost_set_bit = 1
        while (xor_result & rightmost_set_bit) == 0:
            rightmost_set_bit <<= 1

        # Step 3: Divide numbers into two groups based on the rightmost set bit
        # One group will contain x and numbers that share same bit value
        # Other group will contain y and numbers that share same bit value
        x = y = 0
        for num in nums:
            if num & rightmost_set_bit:
                x ^= num
            else:
                y ^= num

        return [x, y]


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.singleNumber([1, 2, 1, 3, 2, 5])
    expected = [3, 5]
    assert sorted(result) == sorted(expected), f"Expected expected, got result"

    # Test case 2: Two elements only
    result = solution.singleNumber([1, 2])
    expected = [1, 2]
    assert sorted(result) == sorted(expected), f"Expected expected, got result"

    # Test case 3: Larger example
    result = solution.singleNumber([1, 1, 2, 2, 3, 4, 5, 5])
    expected = [3, 4]
    assert sorted(result) == sorted(expected), f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 260. Single")
