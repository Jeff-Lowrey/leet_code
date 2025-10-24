"""
# Difficulty: Medium

# 009. Palindrome Number

Given an integer x, return true if x is a palindrome, and false otherwise.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>x = 121</dd>
<dt>Output:</dt>
<dd>True (is palindrome)</dd>
<dt>Explanation:</dt>
<dd>Number 121 is a palindrome</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Standard Algorithm
**Data Structures**: String
**Patterns**: Iterative Solution
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Extract first and last digits. Compare them. If different, not palindrome. Remove first and last digits by dividing by 10^(digits-1) and mod 10^(digits-1). Repeat.

### APPROACH:
1. **Handle negatives**: If x < 0, return False
2. **Handle edge cases**: If x ends in 0 and x != 0, return False
3. **Reverse half**: Initialize reversed_half = 0
4. **Build reversed half**: While x > reversed_half
5. **Extract digit**: reversed_half = reversed_half * 10 + x % 10, x //= 10
6. **Compare halves**: Check if x == reversed_half or x == reversed_half // 10
7. **Return result**: Return True if palindrome, False otherwise

### WHY THIS WORKS:
- Reverse second half of number, compare with first half
- Negative numbers not palindromes (leading minus sign)
- Build reversed number: rev = rev * 10 + x % 10, then x /= 10
- Compare original with reversed: x == rev or x == rev // 10 (odd length)
- O(log n) time: number of digits, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
x = 121
```

Step 1: Reverse half of the number
original = 121, reversed = 0
reversed = 0*10 + 1 = 1, x = 12
reversed = 1*10 + 2 = 12, x = 1
Step 2: Compare
x = 1, reversed = 12
12/10 = 1, equals x

Output:
```
True (is palindrome)
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
    def isPalindrome(self, x: int) -> bool:
        """
        Determines if the given integer is a palindrome.

        Args:
            x (int): The number to check

        Returns:
            bool: True if the number is a palindrome, False otherwise
        """
        # Negative numbers are not palindromes
        if x < 0:
            return False

        # Single digit numbers are palindromes
        if x < 10:
            return True

        # Numbers ending with 0 are not palindromes (except 0 itself)
        if x % 10 == 0 and x != 0:
            return False

        # Convert to string and check if it equals its reverse
        # This is a simple and readable solution
        return str(x) == str(x)[::-1]

    def isPalindrome_mathematical(self, x: int) -> bool:
        """
        Alternative implementation using mathematical approach without string conversion.

        Args:
            x (int): The number to check

        Returns:
            bool: True if the number is a palindrome, False otherwise
        """
        # Handle edge cases
        if x < 0:
            return False
        if x < 10:
            return True
        if x % 10 == 0 and x != 0:
            return False

        reversed_num = 0
        original = x

        # Reverse the number
        while x > 0:
            digit = x % 10
            reversed_num = (reversed_num * 10) + digit
            x = x // 10

        return original == reversed_num


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Positive palindrome
    result = solution.isPalindrome(121)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Negative number
    result = solution.isPalindrome(-121)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Non-palindrome
    result = solution.isPalindrome(10)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 009. Palindrome")
