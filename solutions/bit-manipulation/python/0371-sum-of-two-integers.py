"""
# 371. Sum of Two Integers

# Difficulty: Medium

Given two integers a and b, return the sum of the two integers without using
the operators + and -.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>a = 1, b = 2</dd>
<dt>Output:</dt>
<dd>3</dd>
<dt>Explanation:</dt>
<dd>1 + 2 = 3 using bitwise operations</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Bit Manipulation, XOR, AND, Bit Shifting
**Data Structures**: None
**Patterns**: Bitwise Addition Simulation
**Time Complexity**: O(1) - Fixed number of iterations (32 bits for integers)
**Space Complexity**: O(1) - Only storing intermediate values

### INTUITION:
Addition can be broken down into two parts:
1. XOR gives sum without carry (1+1=0, 1+0=1, 0+0=0)
2. AND then left shift gives the carry (1+1 produces carry to next position)
Repeat until there's no carry.

### APPROACH:
1. **XOR operation**: Calculate sum without carry (a ^ b)
2. **AND operation**: Find carry bits (a & b)
3. **Left shift**: Move carry to next position ((a & b) << 1)
4. **Repeat**: Continue until carry becomes 0
5. **Handle negatives**: Mask to handle Python's arbitrary precision

### WHY THIS WORKS:
- XOR: Adds bits without considering carry (0+0=0, 0+1=1, 1+0=1, 1+1=0)
- AND then shift: Finds where both bits are 1 (produces carry)
- Iterating combines partial sums with carries until no carry remains
- Works for both positive and negative numbers

### EXAMPLE WALKTHROUGH:
Input:
```
a = 1, b = 2
```

Binary: a = 001, b = 010
Iteration 1:
sum = 001 ^ 010 = 011 (3)
carry = (001 & 010) << 1 = 000 << 1 = 000
carry = 0, done!

Output:
```
3
```

### TIME COMPLEXITY:
O(1) - At most 32 iterations for 32-bit integers

### SPACE COMPLEXITY:
O(1) - Constant space for variables

### EDGE CASES:
- **Both zero**: Return 0
- **Negative numbers**: Handle with mask for 32-bit range
- **Overflow**: Python handles arbitrary precision, but mask to 32-bit range
- **Opposite signs**: XOR and AND operations handle correctly

</details>
"""


class Solution:
    def getSum(self, a: int, b: int) -> int:
        """
        Add two integers using bitwise operations.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        # Mask to get 32-bit integers
        mask = 0xFFFFFFFF

        # Process until no carry
        while b != 0:
            # Calculate sum without carry and carry
            sum_without_carry = (a ^ b) & mask
            carry = ((a & b) << 1) & mask

            a = sum_without_carry
            b = carry

        # Handle negative numbers (convert from 32-bit to Python int)
        return a if a <= 0x7FFFFFFF else ~(a ^ mask)


if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    print(f"Test 1: {solution.getSum(1, 2)}")  # Expected: 3

    # Test case 2
    print(f"Test 2: {solution.getSum(2, 3)}")  # Expected: 5

    # Test case 3
    print(f"Test 3: {solution.getSum(-2, 3)}")  # Expected: 1

    # Test case 4
    print(f"Test 4: {solution.getSum(-1, 1)}")  # Expected: 0

    print("\nAll test cases completed!")
