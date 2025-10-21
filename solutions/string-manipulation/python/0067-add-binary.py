"""
# 67. Add Binary

# Difficulty: Easy

Given two binary strings a and b, return their sum as a binary string.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>a = "11", b = "1"</dd>
<dt>Output:</dt>
<dd>100"</dd>
<dt>Explanation:</dt>
<dd>Binary sum '11'+'1'='100'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(max(m, n))
**Space Complexity**: O(max(m, n))

### INTUITION:
Adding binary numbers is similar to adding decimal numbers, but we work with base 2
instead of base 10. We process digits from right to left, maintaining a carry bit.
When two 1s are added, the result is 0 with a carry of 1. This is a classic simulation
problem that mimics manual binary addition.

### APPROACH:
1. **Initialize Pointers**: Start from the end of both strings (rightmost digits)
2. **Track Carry**: Initialize carry to 0
3. **Process Digits Right to Left**:
   - Get current digit from each string (0 if exhausted)
   - Calculate sum = digit_a + digit_b + carry
   - Current bit = sum % 2
   - New carry = sum // 2
4. **Build Result**: Prepend each bit to result string
5. **Handle Final Carry**: Add carry if non-zero after all digits processed

### WHY THIS WORKS:
- Binary addition follows same principle as decimal: digit-by-digit with carry
- Processing right to left handles varying string lengths naturally
- Using modulo and division correctly splits sum into bit and carry
- Building result from right to left matches addition order

### EXAMPLE WALKTHROUGH:
```
Input: a = "1010", b = "1011"

Process from right to left:

Position 3: 0 + 1 + carry(0) = 1, carry = 0
  Result: "1"

Position 2: 1 + 1 + carry(0) = 2 (10 in binary)
  Bit: 2 % 2 = 0, carry = 2 // 2 = 1
  Result: "01"

Position 1: 0 + 0 + carry(1) = 1, carry = 0
  Result: "101"

Position 0: 1 + 1 + carry(0) = 2 (10 in binary)
  Bit % 2 = 0, carry = 2 // 2 = 1
  Result: "0101"

Final carry: 1
  Result: "10101"
```

### TIME COMPLEXITY:
O(max(m, n))
- m and n are lengths of input strings
- Process each digit once
- Building result string is O(max(m, n))

### SPACE COMPLEXITY:
O(max(m, n))
- Result string length is at most max(m, n) + 1
- Additional variables use O(1) space

### EDGE CASES:
- Different length strings: Handle with pointer bounds checking
- Result longer than inputs: Happens when final carry is 1
- Empty strings: Should be handled (though problem assumes valid input)
- "0" + "0": Returns "0"

</details>
"""


from typing import Any

class Solution:
    def addBinary(self, a: str, b: str) -> str:
        """
        Add two binary strings and return sum as binary string.

        Args:
            a: First binary string
            b: Second binary string

        Returns:
            Sum as binary string

        Time Complexity: O(max(m, n)) where m, n are string lengths
        Space Complexity: O(max(m, n)) for result string
        """
        result: list[Any] = []
        carry = 0
        i, j = len(a) - 1, len(b) - 1

        # Process digits from right to left
        while i >= 0 or j >= 0 or carry:
            # Get current digits (0 if string exhausted)
            digit_a = int(a[i]) if i >= 0 else 0
            digit_b = int(b[j]) if j >= 0 else 0

            # Calculate sum and carry
            total = digit_a + digit_b + carry
            result.append(str(total % 2))
            carry = total // 2

            # Move pointers
            i -= 1
            j -= 1

        # Result is built in reverse order
        return "".join(reversed(result))

    def addBinaryBuiltin(self, a: str, b: str) -> str:
        """
        Using Python's built-in binary conversion.

        Args:
            a: First binary string
            b: Second binary string

        Returns:
            Sum as binary string

        Time Complexity: O(max(m, n))
        Space Complexity: O(max(m, n))
        """
        # Convert binary to int, add, convert back to binary
        return bin(int(a, 2) + int(b, 2))[2:]

    def addBinaryString(self, a: str, b: str) -> str:
        """
        Build result as string (less efficient due to string immutability).

        Args:
            a: First binary string
            b: Second binary string

        Returns:
            Sum as binary string
        """
        result = ""
        carry = 0
        i, j = len(a) - 1, len(b) - 1

        while i >= 0 or j >= 0 or carry:
            digit_a = int(a[i]) if i >= 0 else 0
            digit_b = int(b[j]) if j >= 0 else 0

            total = digit_a + digit_b + carry
            result = str(total % 2) + result
            carry = total // 2

            i -= 1
            j -= 1

        return result

    def addBinaryVerbose(self, a: str, b: str) -> str:
        """
        Verbose implementation with detailed logic.

        Args:
            a: First binary string
            b: Second binary string

        Returns:
            Sum as binary string
        """
        # Make strings same length by padding with zeros
        max_len = max(len(a), len(b))
        a = a.zfill(max_len)
        b = b.zfill(max_len)

        result = []
        carry = 0

        # Process from right to left
        for i in range(max_len - 1, -1, -1):
            bit_a = int(a[i])
            bit_b = int(b[i])

            # Binary addition truth table
            total = bit_a + bit_b + carry

            if total == 0:
                result.append("0")
                carry = 0
            elif total == 1:
                result.append("1")
                carry = 0
            elif total == 2:
                result.append("0")
                carry = 1
            else:  # total == 3
                result.append("1")
                carry = 1

        # Add final carry if present
        if carry:
            result.append("1")

        # Reverse to get correct order
        return "".join(reversed(result))


def test_solution() -> None:
    """Test cases for Problem 67."""
    solution = Solution()

    # Test case 1: Standard case
    result1 = solution.addBinary("11", "1")
    expected1 = "100"
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Different lengths
    result2 = solution.addBinary("1010", "1011")
    expected2 = "10101"
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Same length, no carry
    result3 = solution.addBinary("0", "0")
    expected3 = "0"
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single digits
    result4 = solution.addBinary("1", "1")
    expected4 = "10"
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Large numbers
    result5 = solution.addBinary("1111", "1111")
    expected5 = "11110"
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: One zero
    result6 = solution.addBinary("100", "0")
    expected6 = "100"
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test builtin solution
    result7 = solution.addBinaryBuiltin("11", "1")
    expected7 = "100"
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test string solution
    result8 = solution.addBinaryString("1010", "1011")
    expected8 = "10101"
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test verbose solution
    result9 = solution.addBinaryVerbose("1111", "1")
    expected9 = "10000"
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 67. Add Binary ===")

    test_cases = [("11", "1"), ("1010", "1011"), ("0", "0"), ("1", "1"), ("1111", "1111"), ("100", "110010")]

    for a, b in test_cases:
        result = solution.addBinary(a, b)
        print(f"  {a:>8}")
        print(f"+ {b:>8}")
        print(f"= {result:>8}")
        print()

    # Demonstrate the algorithm
    print("Step-by-step for '1010' + '1011':")
    print("Position 3: 0 + 1 + carry(0) = 1, carry=0 → '1'")
    print("Position 2: 1 + 1 + carry(0) = 2, carry=1 → '0'")
    print("Position 1: 0 + 0 + carry(1) = 1, carry=0 → '1'")
    print("Position 0: 1 + 1 + carry(0) = 2, carry=1 → '0'")
    print("Final carry: 1 → '1'")
    print("Result: '10101'")
