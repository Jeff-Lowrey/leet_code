"""
# Difficulty: Easy

# 231. Power of Two

Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2^x.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1, 2, 3, 4, 16, 17, 1024]</dd>
<dt>Output:</dt>
<dd>"Solution for 231. Power of Two:"</dd>
<dt>Explanation:</dt>
<dd>Number 16 is a power of 2 (16 = 2^4)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Powers of 2 have exactly one bit set. Check if n > 0 and n & (n-1) == 0. The expression n & (n-1) removes the rightmost set bit.

### APPROACH:
1. **Check if positive**: If n <= 0, return False immediately (powers of 2 are positive)
2. **Use bit manipulation trick**: Check if n & (n - 1) == 0
3. **Understand the property**: Powers of 2 have exactly one bit set (e.g., 4 = 100, 8 = 1000)
4. **Apply n-1 trick**: Subtracting 1 from power of 2 flips all bits after the single set bit
5. **Verify with AND**: n & (n-1) clears the rightmost set bit; equals 0 only for powers of 2
6. **Return result**: Return True if condition holds, False otherwise

### WHY THIS WORKS:
- Power of 2 has exactly one bit set in binary
- n & (n-1) removes rightmost set bit
- If result is 0, n had only one bit set (power of 2)
- Edge case: n must be positive (negative can't be power of 2)
- O(1) time: single operation, O(1) space

### EXAMPLE WALKTHROUGH:
```
Input: n = 16
Step 1: Check if n is power of 2
  Binary: 16 = 10000 (only one bit set)
  16 - 1 = 15 = 01111 (all bits after position 4 are set)

Step 2: Apply bit trick
  16 & 15 = 10000 & 01111 = 00000 = 0
  Since result is 0, n is power of 2

Counter-example: n = 18
  Binary: 18 = 10010 (two bits set)
  18 & 17 = 10010 & 10001 = 10000 ≠ 0

Output: True (16 is power of 2)
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
    def isPowerOfTwo(self, n: int) -> bool:
        """
        Check if a number is a power of two using bit manipulation.

        Args:
            n: Integer to check

        Returns:
            True if n is a power of 2, False otherwise

        Time Complexity: O(1) - constant time bit operations
        Space Complexity: O(1) - no extra space needed
        """
        # Power of 2 has exactly one bit set
        # n & (n-1) removes the rightmost set bit
        # For power of 2, this should result in 0
        return n > 0 and (n & (n - 1)) == 0

    def solve(self, n: int) -> bool:
        """Wrapper method for consistency with template."""
        return self.isPowerOfTwo(n)

def test_solution():
    """
    Test cases for 231. Power of Two.
    """
    solution = Solution()

    # Test case 1: Power of 2 - 1
    result = solution.solve(1)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Power of 2 - 16
    result = solution.solve(16)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Not power of 2 - 3
    result = solution.solve(3)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Power of 2 - 4
    result = solution.solve(4)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Not power of 2 - 5
    result = solution.solve(5)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Power of 2 - 1024
    result = solution.solve(1024)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: Negative number
    result = solution.solve(-16)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 8: Zero
    result = solution.solve(0)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 9: Power of 2 - 2
    result = solution.solve(2)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    test_values = [1, 2, 3, 4, 16, 17, 1024]
    print(f"Solution for 231. Power of Two:")
    for val in test_values:
        result = solution.solve(val)
        print(f"{val}: {result}")
