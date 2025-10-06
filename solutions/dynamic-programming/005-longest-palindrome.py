"""
5. Longest Palindromic Substring
Medium

Given a string s, return the longest palindromic substring in s.

Example:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid `answer`.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
A palindrome reads the same forwards and backwards. We can find palindromes
by expanding around `centers - either` single characters or between characters.

### APPROACH (Expand Around Center):
1. For each possible center (`n` + `n-1` centers `total`)
2. Expand outward while characters match
3. Track the longest palindrome found
4. Handle both `odd-length` (`center = char`) and `even-length` (`center = between` chars)

### WHY THIS WORKS:
- Every palindrome has a center
- We can check all possible centers systematically
- Expanding is more efficient than checking all substrings

### EXAMPLE WALKTHROUGH:
```
s = "babad"
Centers: b, ba, a, ab, b, ba, a, ad, d

Center at 'a' (index 1): expand to "bab"
Center at 'a' (index 3): expand to "aba"
Both have length 3, return either
```

### ALTERNATIVE APPROACHES:
- **DP**: O(n²) time, O(n²) space - check all substrings
- **Manacher's**: O(n) time, O(n) space - advanced linear algorithm

### TIME COMPLEXITY: O(n²)
### SPACE COMPLEXITY: O(1)

</details>
"""

class Solution:
    def longestPalindrome(self, s: str) -> str:
        """
        Approach: Expand around center
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        if not s:
            return ""

        def expand_around_center(left: int, right: int) -> int:
            """Expand around center and return length of palindrome"""
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return right - left - 1

        start = 0
        max_len = 0

        for i in range(len(s)):
            # Check for odd-length palindromes (single center)
            len1 = expand_around_center(i, i)
            # Check for even-length palindromes (two centers)
            len2 = expand_around_center(i, i + 1)

            current_len = max(len1, len2)

            if current_len > max_len:
                max_len = current_len
                # Calculate start position
                start = i - (current_len - 1) // 2

        return s[start:start + max_len]

    def longestPalindromeDP(self, s: str) -> str:
        """
        Approach: Dynamic Programming
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        n = len(s)
        if n < 2:
            return s

        # dp[i][j] = True if s[i:j+1] is palindrome
        dp = [[False] * n for _ in range(n)]
        start = 0
        max_len = 1

        # All single characters are palindromes
        for i in range(n):
            dp[i][i] = True

        # Check for two-character palindromes
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                dp[i][i + 1] = True
                start = i
                max_len = 2

        # Check for palindromes of length 3 or more
        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1

                if s[i] == s[j] and dp[i + 1][j - 1]:
                    dp[i][j] = True
                    start = i
                    max_len = length

        return s[start:start + max_len]

    def longestPalindromeManacher(self, s: str) -> str:
        """
        Approach: Manacher's Algorithm
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Transform string to avoid even/odd length issues
        T = '#'.join(f'^{s}$')
        n = len(T)
        P = [0] * n
        C = R = 0

        for i in range(1, n - 1):
            # Mirror of i with respect to center C
            i_mirror = 2 * C - i

            if i < R:
                P[i] = min(R - i, P[i_mirror])

            # Expand around i
            while T[i + 1 + P[i]] == T[i - 1 - P[i]]:
                P[i] += 1

            # Update center and right boundary if needed
            if i + P[i] > R:
                C, R = i, i + P[i]

        # Find the longest palindrome
        max_len = 0
        center_index = 0
        for i in range(1, n - 1):
            if P[i] > max_len:
                max_len = P[i]
                center_index = i

        start = (center_index - max_len) // 2
        return s[start:start + max_len]


"""
647. Palindromic Substrings
Medium

Given a string s, return the number of palindromic substrings in it.

Example:
Input: s = "abc"
Output: 3
Explanation: Three palindromic substrings: "a", "b", "c".
"""

class SolutionCount:
    def countSubstrings(self, s: str) -> int:
        """
        Approach: Expand around center
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        def count_palindromes(left: int, right: int) -> int:
            count = 0
            while left >= 0 and right < len(s) and s[left] == s[right]:
                count += 1
                left -= 1
                right += 1
            return count

        result = 0
        for i in range(len(s)):
            # Odd-length palindromes
            result += count_palindromes(i, i)
            # Even-length palindromes
            result += count_palindromes(i, i + 1)

        return result

    def countSubstringsDP(self, s: str) -> int:
        """
        Approach: Dynamic Programming
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        n = len(s)
        dp = [[False] * n for _ in range(n)]
        count = 0

        # Single characters
        for i in range(n):
            dp[i][i] = True
            count += 1

        # Two characters
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                dp[i][i + 1] = True
                count += 1

        # Three or more characters
        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                if s[i] == s[j] and dp[i + 1][j - 1]:
                    dp[i][j] = True
                    count += 1

        return count


"""
409. Longest Palindrome
Easy

Given a string s which consists of lowercase or uppercase letters, return the
length of the longest palindrome that can be built with those letters.

Example:
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
"""

class SolutionBuild:
    def longestPalindrome(self, s: str) -> int:
        """
        Approach: Character frequency count
        Time Complexity: O(n)
        Space Complexity: O(1) - at most 52 characters
        """
        from collections import Counter

        char_count = Counter(s)
        length = 0
        odd_found = False

        for count in char_count.values():
            if count % 2 == 0:
                length += count
            else:
                length += count - 1
                odd_found = True

        # Add one odd character in the middle if found
        return length + (1 if odd_found else 0)

    def longestPalindromeSet(self, s: str) -> int:
        """
        Approach: Using set to track odd occurrences
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        odd_chars = set()

        for char in s:
            if char in odd_chars:
                odd_chars.remove(char)
            else:
                odd_chars.add(char)

        # Length is total chars minus odd chars (except one can be in middle)
        return len(s) - len(odd_chars) + (1 if odd_chars else 0)


# Test cases
if __name__ == "__main__":
    # Test Longest Palindromic Substring
    solution = Solution()

    test_cases = ["babad", "cbbd", "racecar", "noon", "abcdef"]

    print("Longest Palindromic Substring:")
    for test in test_cases:
        result = solution.longestPalindrome(test)
        print(f"Input: '{test}' -> Output: '{result}'")

    print("\n" + "="*50 + "\n")

    # Test Palindromic Substrings Count
    solution_count = SolutionCount()

    test_cases_count = ["abc", "aaa", "racecar"]

    print("Count Palindromic Substrings:")
    for test in test_cases_count:
        result = solution_count.countSubstrings(test)
        print(f"Input: '{test}' -> Count: {result}")

    print("\n" + "="*50 + "\n")

    # Test Build Longest Palindrome
    solution_build = SolutionBuild()

    test_cases_build = ["abccccdd", "a", "bb", "ccc"]

    print("Build Longest Palindrome Length:")
    for test in test_cases_build:
        result = solution_build.longestPalindrome(test)
        print(f"Input: '{test}' -> Max Length: {result}")
