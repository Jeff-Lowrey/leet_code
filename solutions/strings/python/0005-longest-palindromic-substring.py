"""
### INTUITION:
The key insight is that a palindrome mirrors around its center. We can expand around each possible center
(each character and between each pair of characters) to find all palindromes.

### APPROACH:
1. **Expand Around Center**: For each position, expand outward while characters match
2. **Two Cases**: Odd-length palindromes (single center) and even-length (two centers)
3. **Track Maximum**: Keep track of longest palindrome found
4. **Alternative - DP**: Build table where dp[i][j] = is s[i:j+1] a palindrome

### WHY THIS WORKS:
By expanding around each possible center, we check all possible palindromes.
A palindrome reads the same forwards and backwards, so we expand while the
characters on both sides match.

### EXAMPLE WALKTHROUGH:
Input:
```
s = "babad"
```

Steps:
Step 1: Center at 'b' (index 0) → expand → "b" (length 1)
Step 2: Center at 'a' (index 1) → expand → "bab" (length 3)
Step 3: Center at 'b' (index 2) → expand → "b" (length 1)
Step 4: Center at 'a' (index 3) → expand → "aba" (length 3)
Step 5: Center at 'd' (index 4) → expand → "d" (length 1)
Step 6: Longest found → length 3

Output:
```
"bab"
```

Note: "aba" is also a valid answer

### TIME COMPLEXITY:
- Expand around center: **O(n²)** - n centers, each expansion **O(n)**
- Dynamic Programming: **O(n²)**
- Manacher's Algorithm: **O(n)** - optimal

### SPACE COMPLEXITY:
- Expand around center: **O(1)**
- Dynamic Programming: **O(n²)**
- Manacher's Algorithm: **O(n)**

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""


class Solution:
    def longestPalindrome(self, s: str) -> str:
        """
        Find longest palindromic substring using expand around center.

        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        if not s:
            return ""

        start = 0
        max_len = 0

        def expand_around_center(left: int, right: int) -> int:
            """Expand around center and return length of palindrome."""
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return right - left - 1

        for i in range(len(s)):
            # Odd length palindrome (single center)
            len1 = expand_around_center(i, i)
            # Even length palindrome (two centers)
            len2 = expand_around_center(i, i + 1)

            # Get maximum length
            length = max(len1, len2)

            # Update if we found longer palindrome
            if length > max_len:
                max_len = length
                # Calculate start position
                start = i - (length - 1) // 2

        return s[start : start + max_len]

    def longestPalindromeDP(self, s: str) -> str:
        """
        Find longest palindromic substring using dynamic programming.

        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        if not s:
            return ""

        n = len(s)
        # dp[i][j] = is s[i:j+1] a palindrome
        dp = [[False] * n for _ in range(n)]

        start = 0
        max_len = 1

        # Every single character is a palindrome
        for i in range(n):
            dp[i][i] = True

        # Check for palindromes of length 2
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                dp[i][i + 1] = True
                start = i
                max_len = 2

        # Check for lengths greater than 2
        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1

                # Check if s[i:j+1] is palindrome
                if s[i] == s[j] and dp[i + 1][j - 1]:
                    dp[i][j] = True
                    start = i
                    max_len = length

        return s[start : start + max_len]

    def longestPalindromeBruteForce(self, s: str) -> str:
        """
        Brute force approach - check all substrings.

        Time Complexity: O(n³)
        Space Complexity: O(1)
        """

        def is_palindrome(sub: str) -> bool:
            return sub == sub[::-1]

        n = len(s)
        longest = ""

        for i in range(n):
            for j in range(i, n):
                substring = s[i : j + 1]
                if is_palindrome(substring) and len(substring) > len(longest):
                    longest = substring

        return longest


def test_solution() -> None:
    """Test cases for 5. Longest Palindromic Substring."""
    solution = Solution()

    # Test cases - expand around center
    assert solution.longestPalindrome("babad") in ["bab", "aba"]
    assert solution.longestPalindrome("cbbd") == "bb"
    assert solution.longestPalindrome("a") == "a"
    assert solution.longestPalindrome("ac") in ["a", "c"]
    assert solution.longestPalindrome("racecar") == "racecar"

    # Test DP approach
    assert solution.longestPalindromeDP("babad") in ["bab", "aba"]
    assert solution.longestPalindromeDP("cbbd") == "bb"

    # Test brute force
    assert solution.longestPalindromeBruteForce("babad") in ["bab", "aba"]

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 5. Longest Palindromic Substring ===")
    test_strings = ["babad", "cbbd", "racecar", "noon", "a"]

    for test_str in test_strings:
        result = solution.longestPalindrome(test_str)
        print(f'"{test_str}" → "result"')
