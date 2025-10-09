"""
# Difficulty: Easy

# 680. Valid Palindrome II

Given a string s, return true if the s can be palindrome after deleting at most one character from it.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We can use a two-pointer approach to check if a string is a palindrome. When we find a mismatch, we have two options: skip the left character or skip the right character. If either option results in a valid palindrome for the remaining substring, then the original string can be made a palindrome by deleting at most one character.

### APPROACH:
1. **Two pointers**: Start from both ends of the string
2. **Match characters**: Move pointers inward while characters match
3. **Handle mismatch**: When mismatch found, try two options:
   - Skip left character and check remaining substring
   - Skip right character and check remaining substring
4. **Return result**: True if either option results in palindrome

### WHY THIS WORKS:
- If string is already palindrome, we return true immediately
- When first mismatch occurs, exactly one deletion can potentially fix it
- We only need to check the remaining substring after skipping one character
- Two-pointer palindrome check is efficient and straightforward

### EXAMPLE WALKTHROUGH:
```
Input: "aba"
left=0, right=2: s[0]='a' == s[2]='a' ✓
left=1, right=1: pointers meet, palindrome found
Result: True (already palindrome)

Input: "abca"
left=0, right=3: s[0]='a' == s[3]='a' ✓
left=1, right=2: s[1]='b' != s[2]='c' ✗
Try skip left (delete 'b'): check "aca" → palindrome ✓
Result: True
```

### TIME COMPLEXITY:
O(n)
In worst case, we check the string twice (once normally, once after skip)

### SPACE COMPLEXITY:
O(1)
Only using constant extra space for pointers

### EDGE CASES:
- Empty string: palindrome
- Single character: palindrome
- Already palindrome: return true immediately
- Multiple mismatches: cannot be fixed with one deletion

</details>
"""

class Solution:
    def validPalindrome(self, s: str) -> bool:
        """
        Check if string can be palindrome after deleting at most one character.

        Args:
            s: Input string

        Returns:
            True if can be palindrome with at most one deletion, False otherwise

        Time Complexity: O(n) - at most two passes through string
        Space Complexity: O(1) - constant extra space
        """

        def is_palindrome(left: int, right: int) -> bool:
            """Check if substring s[left:right+1] is palindrome."""
            while left < right:
                if s[left] != s[right]:
                    return False
                left += 1
                right -= 1
            return True

        left, right = 0, len(s) - 1

        while left < right:
            if s[left] != s[right]:
                # Try skipping either left or right character
                return is_palindrome(left + 1, right) or is_palindrome(left, right - 1)
            left += 1
            right -= 1

        # No mismatches found, already a palindrome
        return True

    def validPalindromeRecursive(self, s: str) -> bool:
        """
        Recursive solution with deletion tracking.

        Args:
            s: Input string

        Returns:
            True if can be palindrome with at most one deletion
        """

        def can_be_palindrome(left: int, right: int, deletions_used: int) -> bool:
            """Check palindrome with deletion tracking."""
            while left < right:
                if s[left] == s[right]:
                    left += 1
                    right -= 1
                else:
                    if deletions_used >= 1:
                        return False
                    # Try deleting either character
                    return can_be_palindrome(left + 1, right, deletions_used + 1) or can_be_palindrome(
                        left, right - 1, deletions_used + 1
                    )
            return True

        return can_be_palindrome(0, len(s) - 1, 0)

    def validPalindromeVerbose(self, s: str) -> bool:
        """
        More verbose implementation with detailed logic.

        Args:
            s: Input string

        Returns:
            True if can be palindrome with at most one deletion
        """
        if len(s) <= 1:
            return True

        def check_palindrome(string: str, start: int, end: int) -> bool:
            """Check if substring is palindrome."""
            while start < end:
                if string[start] != string[end]:
                    return False
                start += 1
                end -= 1
            return True

        left, right = 0, len(s) - 1

        while left < right:
            if s[left] == s[right]:
                left += 1
                right -= 1
            else:
                # Found mismatch - try both deletion options
                # Option 1: Delete character at left position
                option1 = check_palindrome(s, left + 1, right)

                # Option 2: Delete character at right position
                option2 = check_palindrome(s, left, right - 1)

                return option1 or option2

        return True  # String is already palindrome

    def validPalindromeAlternative(self, s: str) -> bool:
        """
        Alternative implementation using string slicing.

        Args:
            s: Input string

        Returns:
            True if can be palindrome with at most one deletion

        Time Complexity: O(n)
        Space Complexity: O(n) - for string slicing
        """

        def is_palindrome(string: str) -> bool:
            """Check if string is palindrome."""
            return string == string[::-1]

        # Check if already palindrome
        if is_palindrome(s):
            return True

        n = len(s)
        for i in range(n):
            # Try removing character at position i
            modified = s[:i] + s[i + 1 :]
            if is_palindrome(modified):
                return True

        return False

def test_solution():
    """Test cases for Problem 680."""
    solution = Solution()

    # Test case 1: Can be palindrome by deleting one character
    result1 = solution.validPalindrome("aba")
    expected1 = True
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Delete 'c' to make "aba"
    result2 = solution.validPalindrome("abca")
    expected2 = True
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Cannot be palindrome with one deletion
    result3 = solution.validPalindrome("abc")
    expected3 = False
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Already palindrome
    result4 = solution.validPalindrome("racecar")
    expected4 = True
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Empty string
    result5 = solution.validPalindrome("")
    expected5 = True
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Single character
    result6 = solution.validPalindrome("a")
    expected6 = True
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Two characters, different
    result7 = solution.validPalindrome("ab")
    expected7 = True
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test case 8: Complex case
    result8 = solution.validPalindrome("deeee")
    expected8 = True
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test recursive solution
    result9 = solution.validPalindromeRecursive("abca")
    expected9 = True
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test verbose solution
    result10 = solution.validPalindromeVerbose("abc")
    expected10 = False
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    # Test alternative solution
    result11 = solution.validPalindromeAlternative("racecar")
    expected11 = True
    assert result11 == expected11, f"Expected {expected11}, got {result11}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 680. Valid Palindrome II ===")

    test_cases = ["aba", "abca", "abc", "racecar", "deeee"]
    for test in test_cases:
        result = solution.validPalindrome(test)
        print(f"validPalindrome('{test}') -> {result}")

    # Demonstrate the logic
    print("\nDetailed example for 'abca':")
    s = "abca"
    print(f"String: {s}")
    print("Checking from both ends:")
    print("a == a ✓, b != c ✗")
    print("Try deleting 'b': 'aca' is palindrome ✓")
    print("Try deleting 'c': 'aba' is palindrome ✓")
    print(f"Result: {solution.validPalindrome(s)}")
