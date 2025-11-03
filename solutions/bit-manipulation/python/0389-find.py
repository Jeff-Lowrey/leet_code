"""
### INTUITION:
The key insight is that xOR both arrays together. The result is the character that appears different number of times in s vs t, which is the added character.

### APPROACH:
1. **Initialize result**: Set result = 0 to accumulate XOR values
2. **XOR all characters in s**: Loop through each character in s and compute result ^= ord(char)
3. **XOR all characters in t**: Loop through each character in t and compute result ^= ord(char)
4. **Leverage XOR cancellation**: Matching characters from both strings cancel out (char ^ char = 0)
5. **Added character remains**: Only the extra character in t doesn't have a pair to cancel
6. **Convert to character**: Use chr(result) to convert the ASCII value back to character
7. **Return result**: Return the character that was added to t

### WHY THIS WORKS:
- This ensures that xOR all characters in both strings
- This ensures that duplicates cancel out, leaving only the added character
- This ensures that alternative: sum character codes, difference is added char
- This ensures that xOR handles any character set, sum might overflow
- This ensures that o(n) time: single pass, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
s = "abcd", t = "abcde"
```

Step 1: XOR all characters
result = 0
XOR s: result ^= ord('a') ^= ord('b') ^= ord('c') ^= ord('d')
XOR t: result ^= ord('a') ^= ord('b') ^= ord('c') ^= ord('d') ^= ord('e')
Step 2: Duplicate characters cancel out
All characters in s cancel with t
Remaining: ord('e')
Step 3: Convert back to character

Steps:
Step 1: result = ord('e') → 'e'

Output:
```
'e' (the added character)
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
    def findTheDifference(self, s: str, t: str) -> str:
        """
        Find the character that was added to string t that's not in string s.

        Args:
            s (str): The original string
            t (str): The modified string with one extra character

        Returns:
            str: The extra character in string t

        Time Complexity: O(n) where n is the length of the longer string
        Space Complexity: O(1) as we use fixed size arrays
        """
        # Method 1: Using XOR operation
        result = 0

        # XOR all characters in both strings
        # Since XOR of same characters cancels out,
        # we'll be left with the extra character
        for char in s:
            result ^= ord(char)
        for char in t:
            result ^= ord(char)

        return chr(result)

    def findTheDifference_counter(self, s: str, t: str) -> str:
        """
        Alternative implementation using character counting.

        Args:
            s (str): The original string
            t (str): The modified string with one extra character

        Returns:
            str: The extra character in string t
        """
        # Initialize counter array for all possible characters (256 ASCII)
        counter = [0] * 256

        # Count characters in first string
        for char in s:
            counter[ord(char)] += 1

        # Subtract counts for second string
        for char in t:
            counter[ord(char)] -= 1
            if counter[ord(char)] < 0:
                return char

        return ""


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findTheDifference("abcd", "abcde")
    expected = "e"
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Single character added
    result = solution.findTheDifference("", "y")
    expected = "y"
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 389. Find")
