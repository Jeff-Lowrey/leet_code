"""
### INTUITION:
The key insight is that reverse bits by extracting each bit from the right (n & 1), shifting result left, and adding the bit. Process all 32 bits by shifting n right each iteration.

### APPROACH:
1. **Initialize result**: Set result = 0 to build the reversed bits
2. **Loop 32 times**: Iterate for each of the 32 bits in the integer
3. **Extract rightmost bit**: Use (n & 1) to get the current rightmost bit of n
4. **Shift result left**: Left-shift result by 1 to make room for the new bit (result <<= 1)
5. **Add bit to result**: Use result |= (n & 1) to add the extracted bit to result
6. **Shift n right**: Right-shift n by 1 to process the next bit (n >>= 1)
7. **Return result**: After 32 iterations, return result with all bits reversed

### WHY THIS WORKS:
- This ensures that process 32 bits: shift result left, add rightmost bit of n, shift n right
- This ensures that result = (result << 1) | (n & 1), then n >>= 1
- This ensures that each iteration moves one bit from n to result in reverse position
- This ensures that repeat 32 times for all bits
- This ensures that o(1) time: fixed 32 iterations, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
n = 00000010100101000001111010011100 (43261596)
```

Step 1: Reverse bits one by one
Step 2: Detailed process for first few bits
n = 43261596, result = 0
- Extract bit 0 (0), shift result left, add bit
- Extract bit 1 (0), shift result left, add bit
- Continue for all 32 bits

result = 0, iterate 32 times:
```
Bit 0: n & 1 = 0, result = 0
Bit 1: n & 1 = 0, result = 0
...
Bit 31: n & 1 = 0, result = 964176192
```

Output:
```
964176192 (00111001011110000010100101000000)
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


class Solution:
    def reverseBits(self, n: int) -> int:
        """
        Reverses the bits of a given 32-bit unsigned integer.

        Args:
            n: An integer representing a 32-bit unsigned number

        Returns:
            The integer with all bits reversed

        Time Complexity: O(1) - always processes 32 bits
        Space Complexity: O(1) - uses constant extra space
        """
        result = 0

        # Process all 32 bits
        for i in range(32):
            # Get the least significant bit of n
            bit = n & 1

            # Left shift result and add the current bit
            result = (result << 1) | bit

            # Right shift n to process next bit
            n = n >> 1

        return result

    def reverseBits_optimized(self, n: int) -> int:
        """
        An optimized version using bit manipulation tricks.

        This implementation uses divide and conquer approach by swapping
        bits in groups of increasing sizes.

        Args:
            n: An integer representing a 32-bit unsigned number

        Returns:
            The integer with all bits reversed
        """
        # Swap bits in groups of 1
        n = ((n & 0xAAAAAAAA) >> 1) | ((n & 0x55555555) << 1)
        # Swap bits in groups of 2
        n = ((n & 0xCCCCCCCC) >> 2) | ((n & 0x33333333) << 2)
        # Swap bits in groups of 4
        n = ((n & 0xF0F0F0F0) >> 4) | ((n & 0x0F0F0F0F) << 4)
        # Swap bits in groups of 8
        n = ((n & 0xFF00FF00) >> 8) | ((n & 0x00FF00FF) << 8)
        # Swap bits in groups of 16
        n = ((n & 0xFFFF0000) >> 16) | ((n & 0x0000FFFF) << 16)

        return n


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.reverseBits(43261596)
    expected = 964176192
    assert result == expected, f"Expected expected, got result"

    # Test case 2: All zeros except one bit
    result = solution.reverseBits(1)
    expected = 2147483648  # 1 << 31
    assert result == expected, f"Expected expected, got result"

    # Test case 3: All ones (max 32-bit unsigned)
    result = solution.reverseBits(4294967295)
    expected = 4294967295
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 190. Reverse")
