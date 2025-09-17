"""
131. Palindrome Partitioning
Medium

Given a string s, partition s such that every substring of the partition is a
palindrome. Return all possible palindrome partitioning of s.

Example:
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
"""

class Solution:
    def partition(self, s: str) -> list[list[str]]:
        """
        Approach: Backtracking with palindrome checking
        Time Complexity: O(n * 2^n)
        Space Complexity: O(n) for recursion
        """
        result = []

        def is_palindrome(string: str) -> bool:
            return string == string[::-1]

        def backtrack(start: int, path: list):
            # If we've reached the end, add current partition
            if start == len(s):
                result.append(path[:])
                return

            # Try all possible substrings starting from 'start'
            for end in range(start + 1, len(s) + 1):
                substring = s[start:end]
                if is_palindrome(substring):
                    path.append(substring)
                    backtrack(end, path)
                    path.pop()

        backtrack(0, [])
        return result

    def partitionDP(self, s: str) -> list[list[str]]:
        """
        Approach: Dynamic Programming + Backtracking
        Time Complexity: O(n * 2^n)
        Space Complexity: O(n²) for DP table
        """
        n = len(s)
        # Build palindrome DP table
        dp = [[False] * n for _ in range(n)]

        # Every single character is a palindrome
        for i in range(n):
            dp[i][i] = True

        # Check for palindromes of length 2
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                dp[i][i + 1] = True

        # Check for palindromes of length 3+
        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                if s[i] == s[j] and dp[i + 1][j - 1]:
                    dp[i][j] = True

        result = []

        def backtrack(start: int, path: list):
            if start == n:
                result.append(path[:])
                return

            for end in range(start, n):
                if dp[start][end]:
                    path.append(s[start:end + 1])
                    backtrack(end + 1, path)
                    path.pop()

        backtrack(0, [])
        return result


"""
132. Palindrome Partitioning II
Hard

Given a string s, partition s such that every substring of the partition is a
palindrome. Return the minimum cuts needed for a palindrome partitioning of s.

Example:
Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
"""

class SolutionMinCuts:
    def minCut(self, s: str) -> int:
        """
        Approach: Dynamic Programming
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        n = len(s)

        # Build palindrome DP table
        is_palindrome = [[False] * n for _ in range(n)]

        for end in range(n):
            for start in range(end + 1):
                if s[start] == s[end] and (end - start <= 2 or is_palindrome[start + 1][end - 1]):
                    is_palindrome[start][end] = True

        # min_cuts[i] = minimum cuts needed for s[0:i+1]
        min_cuts = [float('inf')] * n

        for end in range(n):
            # If s[0:end+1] is palindrome, no cuts needed
            if is_palindrome[0][end]:
                min_cuts[end] = 0
            else:
                # Try all possible last palindrome positions
                for start in range(1, end + 1):
                    if is_palindrome[start][end]:
                        min_cuts[end] = min(min_cuts[end], min_cuts[start - 1] + 1)

        return min_cuts[n - 1]

    def minCutOptimized(self, s: str) -> int:
        """
        Approach: Optimized DP with expansion
        Time Complexity: O(n²)
        Space Complexity: O(n)
        """
        n = len(s)
        # min_cuts[i] = minimum cuts for s[0:i]
        min_cuts = list(range(-1, n))

        for center in range(n):
            # Odd length palindromes
            left = right = center
            while left >= 0 and right < n and s[left] == s[right]:
                min_cuts[right + 1] = min(min_cuts[right + 1], min_cuts[left] + 1)
                left -= 1
                right += 1

            # Even length palindromes
            left = center
            right = center + 1
            while left >= 0 and right < n and s[left] == s[right]:
                min_cuts[right + 1] = min(min_cuts[right + 1], min_cuts[left] + 1)
                left -= 1
                right += 1

        return min_cuts[n]


"""
516. Longest Palindromic Subsequence
Medium

Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by deleting
some or no elements without changing the order of the remaining elements.

Example:
Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".
"""

class SolutionSubsequence:
    def longestPalindromeSubseq(self, s: str) -> int:
        """
        Approach: Dynamic Programming
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        n = len(s)
        # dp[i][j] = longest palindrome subsequence in s[i:j+1]
        dp = [[0] * n for _ in range(n)]

        # Single characters
        for i in range(n):
            dp[i][i] = 1

        # Build table
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1

                if s[i] == s[j]:
                    dp[i][j] = dp[i + 1][j - 1] + 2
                else:
                    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])

        return dp[0][n - 1]

    def longestPalindromeSubseqOptimized(self, s: str) -> int:
        """
        Approach: Space-optimized DP
        Time Complexity: O(n²)
        Space Complexity: O(n)
        """
        n = len(s)
        dp = [1] * n

        for i in range(n - 2, -1, -1):
            prev = 0
            for j in range(i + 1, n):
                temp = dp[j]
                if s[i] == s[j]:
                    dp[j] = prev + 2
                else:
                    dp[j] = max(dp[j], dp[j - 1])
                prev = temp

        return dp[n - 1]

    def longestPalindromeSubseqMemo(self, s: str) -> int:
        """
        Approach: Top-down DP with memoization
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        memo = {}

        def dp(i: int, j: int) -> int:
            if i > j:
                return 0
            if i == j:
                return 1

            if (i, j) in memo:
                return memo[(i, j)]

            if s[i] == s[j]:
                result = dp(i + 1, j - 1) + 2
            else:
                result = max(dp(i + 1, j), dp(i, j - 1))

            memo[(i, j)] = result
            return result

        return dp(0, len(s) - 1)


# Test cases
if __name__ == "__main__":
    # Test Palindrome Partitioning
    solution = Solution()

    print("Palindrome Partitioning:")
    test_cases = ["aab", "a", "aba", "abcba"]
    for test in test_cases:
        result = solution.partition(test)
        print(f"Input: '{test}'")
        print(f"Partitions: {result}\n")

    print("="*50 + "\n")

    # Test Minimum Cuts
    solution_cuts = SolutionMinCuts()

    print("Minimum Palindrome Cuts:")
    test_cases_cuts = ["aab", "a", "ab", "abcba"]
    for test in test_cases_cuts:
        result = solution_cuts.minCut(test)
        print(f"Input: '{test}' -> Min Cuts: {result}")

    print("\n" + "="*50 + "\n")

    # Test Longest Palindromic Subsequence
    solution_subseq = SolutionSubsequence()

    print("Longest Palindromic Subsequence:")
    test_cases_subseq = ["bbbab", "cbbd", "abcdef"]
    for test in test_cases_subseq:
        result = solution_subseq.longestPalindromeSubseq(test)
        print(f"Input: '{test}' -> Length: {result}")
