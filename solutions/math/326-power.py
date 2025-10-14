"""
# Difficulty: Medium

# 326. Power

Given an integer n, return true if it is a power of three. Otherwise, return false.

An integer n is a power of three, if there exists an integer x such that n == 3^x.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 27</dd>
<dt>Output:</dt>
<dd>True (27 is power of 3)</dd>
<dt>Explanation:</dt>
<dd>Number 27 is a power of 3 (27 = 3³)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Powers of 3 only have 3 in their prime factorization. Find maximum power of 3 in 32-bit range (3^19). Check if n divides it evenly. If yes, n is power of 3.

### APPROACH:
1. **Handle edge cases**: If n == 1, return True; if n <= 0, return False
2. **Iterate while n > 1**: While n is greater than 1
3. **Check divisibility**: If n % 3 != 0, return False
4. **Divide by 3**: n = n // 3
5. **Continue loop**: Repeat until n becomes 1 or indivisible by 3
6. **Return result**: Return True if loop exits with n == 1

### WHY THIS WORKS:
- Power of 3 only has prime factor 3
- Max 32-bit power of 3 is 3^19 = 1162261467
- If n divides max power of 3 evenly, n is power of 3
- Alternative: repeatedly divide by 3, check if result is 1
- O(1) time with division check, O(1) space

### EXAMPLE WALKTHROUGH:
```
Input: n = 27
Step 1: Divide by 3 repeatedly
  27/3 = 9
  9/3 = 3
  3/3 = 1

Step 2: Check if reached 1
  Result is 1, so 27 is power of 3

Counter-example: n = 10
  10/3 = 3 (remainder 1, not divisible)

Output: True (27 is power of 3)
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
    def isPowerOfThree(self, n: int) -> bool:
        """
        Determines if a given number is a power of three.

        Args:
            n (int): The number to check

        Returns:
            bool: True if n is a power of three, False otherwise

        Time Complexity: O(log_3(n))
        Space Complexity: O(1)
        """
        # Handle edge cases
        if n <= 0:
            return False

        # A number is a power of three if it can be divided by 3 repeatedly
        # until reaching 1, with no remainder at each step
        while n > 1:
            if n % 3 != 0:
                return False
            n = n // 3

        return True

    def isPowerOfThreeOptimized(self, n: int) -> bool:
        """
        Alternative implementation using mathematical properties.
        3^19 = 1162261467 is the largest power of 3 that fits in a 32-bit integer.
        If n is a power of 3, it must divide 3^19 evenly.

        Args:
            n (int): The number to check

        Returns:
            bool: True if n is a power of three, False otherwise

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return n > 0 and 1162261467 % n == 0

def test_solution():
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Power of three
    result = solution.isPowerOfThree(27)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Not power of three
    result = solution.isPowerOfThree(0)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: One (3^0)
    result = solution.isPowerOfThree(1)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 326. Power")
