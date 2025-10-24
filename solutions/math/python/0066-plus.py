"""
# Difficulty: Medium

# 0066. Plus One

You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>digits = [1,2,3]</dd>
<dt>Output:</dt>
<dd>[1,2,4]
[1,0,0,0]</dd>
<dt>Explanation:</dt>
<dd>Array [1,2,9] plus one is [1,3,0]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Start from rightmost digit. Add 1 to it. Handle carry by propagating to next digit. If all digits are 9, result will need an extra digit at the front.

### APPROACH:
1. **Initialize carry**: Set carry = 1 (we're adding 1)
2. **Iterate from right**: Loop through digits from right to left
3. **Add carry to digit**: digit = digits[i] + carry
4. **Update digit and carry**: digits[i] = digit % 10, carry = digit // 10
5. **Handle carry**: If carry is 0, break early
6. **Handle leading carry**: If carry still 1 after loop, insert 1 at beginning
7. **Return result**: Return modified digits array

### WHY THIS WORKS:
- Iterate from right to left adding 1, track carry
- If digit < 9, increment and return (no carry propagation)
- If digit == 9, set to 0 and continue (carry propagates)
- If carry after loop, prepend 1 to result (e.g., 99 + 1 = 100)
- O(n) time single pass, O(n) space for result array

### EXAMPLE WALKTHROUGH:
Input:
```
digits = [1,2,3]
```

Step 1: Add 1 from rightmost
digits[2] = 3+1 = 4, no carry
Example with carry: [9,9,9]

Steps:
Step 1: digits[2] = 9+1 = 10 → 0, carry=1
Step 2: digits[1] = 9+1 = 10 → 0, carry=1
Step 3: digits[0] = 9+1 = 10 → 0, carry=1
Step 4: Insert 1 at front

Output:
```
[1,2,4]
[1,0,0,0]
```

### TIME COMPLEXITY:
Based on the algorithm implementation


### SPACE COMPLEXITY:
Based on auxiliary data structures used


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        """
        Add one to the number represented by the digits array.

        Args:
            digits (List[int]): Array of digits representing a non-negative integer

        Returns:
            List[int]: Resulting array after adding one to the number

        Time Complexity: O(n) where n is the length of digits
        Space Complexity: O(1) in most cases, O(n) when new digit needs to be added
        """
        n = len(digits)

        # Iterate from right to left
        for i in range(n - 1, -1, -1):
            # If current digit is less than 9, simply increment and return
            if digits[i] < 9:
                digits[i] += 1
                return digits
            # If current digit is 9, set it to 0 and continue to next digit
            digits[i] = 0

        # If we're here, it means we need to add a new digit
        # (e.g., 999 -> 1000)
        return [1] + digits


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.plusOne([1, 2, 3])
    expected = [1, 2, 4]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.plusOne([])
    expected = [1]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.plusOne([1])
    expected = [2]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 066. Plus")
