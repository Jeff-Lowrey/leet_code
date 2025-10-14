"""
# Difficulty: Medium

# 5. Longest Palindromic Substring

This problem demonstrates key concepts in String manipulation and Dynamic Programming.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"babad"</dd>
<dt>Output:</dt>
<dd>"bab" (or "aba")</dd>
<dt>Explanation:</dt>
<dd>Longest palindromic substring is 'bab' or 'aba'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
A palindrome reads the same forwards and backwards. To find the longest palindromic substring,
we need to consider that palindromes expand around their center. A key insight is that every
palindrome has a center - either a single character (odd length) or between two characters
(even length). By checking all possible centers, we can find the longest palindrome.

### APPROACH:
1. **Expand around center technique**: For each possible center, expand outwards
2. **Handle both cases**: Check odd-length (single center) and even-length (two centers)
3. **Track maximum**: Keep track of the longest palindrome found so far
4. **Extract substring**: Return the longest palindromic substring at the end

### WHY THIS WORKS:
- Every palindrome has a center point
- By expanding from each center, we find all palindromes
- Comparing characters from center outward ensures palindrome property
- Checking all centers guarantees we find the longest one
- This avoids checking all O(n²) substrings explicitly

### EXAMPLE WALKTHROUGH:
```
Input: s = "babad"

Centers to check:
- Index 0 ('b'): Expands to "b" (length 1)
- Between 0-1: "ba" not palindrome
- Index 1 ('a'): Expands to "bab" (length 3) ✓
- Between 1-2: "ab" not palindrome
- Index 2 ('b'): Expands to "aba" (length 3) ✓
- Between 2-3: "ba" not palindrome
- Index 3 ('a'): Expands to "a" (length 1)
- Between 3-4: "ad" not palindrome
- Index 4 ('d'): Expands to "d" (length 1)

Longest found: "bab" or "aba" (both length 3)
Output: "bab" (or "aba")

Input: s = "cbbd"
- Index 1 ('b'): Just "b"
- Between 1-2 ('bb'): Expands to "bb" (length 2) ✓
- This is the longest
Output: "bb"
```

### TIME COMPLEXITY:
O(n²)
There are n possible centers (including between characters), and each expansion can take up to
O(n) time in the worst case. Total: O(n²).

### SPACE COMPLEXITY:
O(1)
We only store indices and don't create additional data structures proportional to input.
The result substring is extracted at the end.

### EDGE CASES:
- Single character: Return that character
- Empty string: Return empty string
- All same characters: Return entire string
- No palindrome longer than 1: Return first character
- Entire string is palindrome: Return entire string

</details>
"""

class Solution:
    def solve(self, s: str) -> str:
        """
        Find the longest palindromic substring.

        Args:
            s: Input string

        Returns:
            The longest palindromic substring

        Time Complexity: O(n²) where n is the length of the string
        Space Complexity: O(1) - only storing indices
        """
        if len(s) < 2:
            return s

        start = 0
        max_length = 1

        def expand_around_center(left: int, right: int) -> int:
            """
            Expand around the center and return the length of palindrome.

            Args:
                left: Left pointer
                right: Right pointer

            Returns:
                Length of the palindrome
            """
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            # Return length (right - left - 1)
            return right - left - 1

        for i in range(len(s)):
            # Check for odd-length palindromes (single center)
            len1 = expand_around_center(i, i)

            # Check for even-length palindromes (two centers)
            len2 = expand_around_center(i, i + 1)

            # Get the longer one
            current_length = max(len1, len2)

            # Update if we found a longer palindrome
            if current_length > max_length:
                max_length = current_length
                # Calculate the starting position
                # For odd length: i - (len-1)//2
                # For even length: i - (len-2)//2 = i - len//2 + 1
                # General formula works for both:
                start = i - (current_length - 1) // 2

        return s[start:start + max_length]

    def solve_dp(self, s: str) -> str:
        """
        Dynamic Programming solution.

        Uses a 2D table where dp[i][j] indicates if s[i:j+1] is a palindrome.

        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        if len(s) < 2:
            return s

        n = len(s)
        # dp[i][j] = True if s[i:j+1] is a palindrome
        dp = [[False] * n for _ in range(n)]

        start = 0
        max_length = 1

        # Every single character is a palindrome
        for i in range(n):
            dp[i][i] = True

        # Check for two-character palindromes
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                dp[i][i + 1] = True
                start = i
                max_length = 2

        # Check for palindromes of length 3 or more
        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1

                # Check if s[i:j+1] is palindrome
                if s[i] == s[j] and dp[i + 1][j - 1]:
                    dp[i][j] = True
                    start = i
                    max_length = length

        return s[start:start + max_length]

def test_solution():
    """
    Test cases for 5. Longest Palindromic Substring.
    """
    solution = Solution()

    # Test case 1: Odd-length palindrome
    result1 = solution.solve("babad")
    assert result1 in ["bab", "aba"], f"Test 1 failed: expected 'bab' or 'aba', got '{result1}'"

    # Test case 2: Even-length palindrome
    result2 = solution.solve("cbbd")
    assert result2 == "bb", f"Test 2 failed: expected 'bb', got '{result2}'"

    # Test case 3: Single character
    result3 = solution.solve("a")
    assert result3 == "a", f"Test 3 failed: expected 'a', got '{result3}'"

    # Test case 4: All same characters
    result4 = solution.solve("aaaa")
    assert result4 == "aaaa", f"Test 4 failed: expected 'aaaa', got '{result4}'"

    # Test case 5: Entire string is palindrome
    result5 = solution.solve("racecar")
    assert result5 == "racecar", f"Test 5 failed: expected 'racecar', got '{result5}'"

    # Test case 6: No palindrome longer than 1
    result6 = solution.solve("abc")
    assert len(result6) == 1, f"Test 6 failed: expected length 1, got '{result6}'"

    # Test case 7: Palindrome at the end
    result7 = solution.solve("abcdcba")
    assert result7 == "abcdcba", f"Test 7 failed: expected 'abcdcba', got '{result7}'"

    # Test case 8: Long string with palindrome in middle
    result8 = solution.solve("abcdefggfedxyz")
    assert result8 == "defggfed", f"Test 8 failed: expected 'defggfed', got '{result8}'"

    # Test DP solution
    result9 = solution.solve_dp("babad")
    assert result9 in ["bab", "aba"], f"Test 9 (DP) failed: expected 'bab' or 'aba', got '{result9}'"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    print(f"Longest palindrome in 'babad': '{solution.solve('babad')}'")
    print(f"Longest palindrome in 'cbbd': '{solution.solve('cbbd')}'")
    print(f"Longest palindrome in 'racecar': '{solution.solve('racecar')}'")
