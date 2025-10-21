"""
# Difficulty: Medium

# 371. Sum of Two Integers

Given two integers a and b, return the sum of the two integers without using the operators + and -.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>a = 1, b = 2</dd>
<dt>Output:</dt>
<dd>3 (1 + 2)</dd>
<dt>Explanation:</dt>
<dd>Sum of 1+2 is 3 without using + or - operators</dd>
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
Add two numbers without carry operator. XOR gives sum without carry, AND << 1 gives carry. Repeat until carry is 0. Handle overflow for signed integers.

### APPROACH:
1. **Initialize variables**: Set a and b as the two numbers to add
2. **Loop until no carry**: While b != 0, continue processing carry
3. **Calculate sum without carry**: Compute sum_without_carry = a ^ b (XOR gives sum ignoring carry)
4. **Calculate carry**: Compute carry = (a & b) << 1 (AND finds carry positions, shift left by 1)
5. **Update a and b**: Set a = sum_without_carry, b = carry for next iteration
6. **Repeat until carry is 0**: Continue loop until b becomes 0 (no more carry to propagate)
7. **Return result**: Return a which contains the final sum

### WHY THIS WORKS:
- XOR gives sum without carry, AND gives carry positions
- Repeat: sum = a ^ b, carry = (a & b) << 1
- When carry becomes 0, sum is correct
- Simulates binary addition without arithmetic operators
- O(1) time: at most 32 iterations (bit width), O(1) space

### EXAMPLE WALKTHROUGH:
```
Input: a = 1, b = 2
Step 1: Add without carry
  sum = a ^ b = 001 ^ 010 = 011 = 3

Step 2: Calculate carry
  carry = (a & b) << 1 = (001 & 010) << 1 = 000 << 1 = 0

Step 3: Since carry = 0, done

Example with carry: a = 3, b = 5
  sum = 3 ^ 5 = 011 ^ 101 = 110 = 6
  carry = (3 & 5) << 1 = (011 & 101) << 1 = 001 << 1 = 010 = 2
  Repeat: sum = 6 ^ 2 = 110 ^ 010 = 100 = 4
  carry = (6 & 2) << 1 = (110 & 010) << 1 = 010 << 1 = 100 = 4
  Repeat = 4 ^ 4 = 000 = 0, carry = (4 & 4) << 1 = 1000 = 8

Output: 3 (1 + 2)
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


class Solution:
    def getSum(self, a: int, b: int) -> int:
        """
        Calculate the sum of two integers without using + or - operators.
        Uses bitwise operations to perform addition.

        Args:
            a (int): First integer
            b (int): Second integer

        Returns:
            int: Sum of the two integers

        Example:
            >>> solution = Solution()
            >>> solution.getSum(2, 3)
            5
        """
        # Python handles negative numbers differently with bitwise operations
        # We need to mask to 32 bits to handle negative numbers correctly
        mask = 0xFFFFFFFF

        # While there is a carry
        while b & mask:
            # Calculate carry using AND operation
            carry = (a & b) << 1
            # Calculate sum using XOR operation
            a = a ^ b
            b = carry

            # Handle 32-bit overflow
            a = a & mask
            b = b & mask

        # Handle negative numbers
        if b > 0:
            a = a ^ b

        # If result is negative (32nd bit is 1)
        if (a >> 31) & 1:
            return ~(a ^ mask)

        return a


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.getSum(1, b=2)
    expected = 3
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Negative numbers
    result = solution.getSum(-1, 1)
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 371. Sum")
