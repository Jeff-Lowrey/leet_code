"""
1312. Minimum Insertion Steps to Make a String Palindrome
Hard

Given a string s, return the minimum number of insertions needed to make s a palindrome.

A palindrome is a string that reads the same forward and backward.

Example:
Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already a palindrome.

Example:
Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".

Example:
Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".
"""

class Solution:
    def minInsertions(self, s: str) -> int:
        """
        Approach: Dynamic Programming - Longest Palindromic Subsequence
        The minimum insertions = length - LPS
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        n = len(s)

        # Find longest palindromic subsequence
        # dp[i][j] = LPS length in s[i:j+1]
        dp = [[0] * n for _ in range(n)]

        # Single characters are palindromes
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

        # Minimum insertions = string length - LPS length
        return n - dp[0][n - 1]

    def minInsertionsOptimized(self, s: str) -> int:
        """
        Approach: Space-optimized DP
        Time Complexity: O(n²)
        Space Complexity: O(n)
        """
        n = len(s)
        prev = [0] * n
        curr = [0] * n

        # Single character base case
        for i in range(n):
            prev[i] = 1

        # Build table using only two rows
        for i in range(n - 2, -1, -1):
            curr[i] = 1  # Single character

            for j in range(i + 1, n):
                if s[i] == s[j]:
                    curr[j] = prev[j - 1] + 2
                else:
                    curr[j] = max(prev[j], curr[j - 1])

            prev, curr = curr, prev

        return n - prev[n - 1]

    def minInsertionsRecursive(self, s: str) -> int:
        """
        Approach: Recursive with memoization
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        memo = {}

        def helper(i: int, j: int) -> int:
            # Base case: single character or empty
            if i >= j:
                return 0

            if (i, j) in memo:
                return memo[(i, j)]

            if s[i] == s[j]:
                result = helper(i + 1, j - 1)
            else:
                # Insert at beginning or end
                result = 1 + min(helper(i + 1, j), helper(i, j - 1))

            memo[(i, j)] = result
            return result

        return helper(0, len(s) - 1)


"""
Alternative formulation: Direct DP approach
Instead of using LPS, directly calculate minimum insertions
"""

class SolutionDirect:
    def minInsertions(self, s: str) -> int:
        """
        Direct DP approach
        dp[i][j] = minimum insertions to make s[i:j+1] palindrome
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        n = len(s)
        dp = [[0] * n for _ in range(n)]

        # Build table for increasing lengths
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1

                if s[i] == s[j]:
                    dp[i][j] = dp[i + 1][j - 1]
                else:
                    # Insert s[j] at beginning or s[i] at end
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j - 1])

        return dp[0][n - 1]

    def minInsertionsWithPath(self, s: str) -> tuple[int, str]:
        """
        Returns both minimum insertions and one possible palindrome
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        n = len(s)
        dp = [[0] * n for _ in range(n)]

        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1

                if s[i] == s[j]:
                    dp[i][j] = dp[i + 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j - 1])

        # Reconstruct palindrome
        def build_palindrome(i: int, j: int) -> str:
            if i > j:
                return ""
            if i == j:
                return s[i]

            if s[i] == s[j]:
                return s[i] + build_palindrome(i + 1, j - 1) + s[j]

            if dp[i + 1][j] < dp[i][j - 1]:
                # Insert s[i] at end
                return s[i] + build_palindrome(i + 1, j) + s[i]
            else:
                # Insert s[j] at beginning
                return s[j] + build_palindrome(i, j - 1) + s[j]

        palindrome = build_palindrome(0, n - 1)
        return dp[0][n - 1], palindrome


"""
Related Problem: Minimum deletions to make palindrome
This is equivalent to finding minimum insertions
"""

class SolutionDeletions:
    def minDeletions(self, s: str) -> int:
        """
        Minimum deletions = length - LPS
        Same as minimum insertions
        Time Complexity: O(n²)
        Space Complexity: O(n²)
        """
        return Solution().minInsertions(s)


# Test cases
if __name__ == "__main__":
    solution = Solution()
    solution_direct = SolutionDirect()

    test_cases = [
        "zzazz",      # Already palindrome
        "mbadm",      # 2 insertions
        "leetcode",   # 5 insertions
        "a",          # Already palindrome
        "ab",         # 1 insertion
        "abc",        # 2 insertions
        "racecar",    # Already palindrome
        "abcba",      # Already palindrome
        "abcde",      # 4 insertions
    ]

    print("Minimum Insertions to Make Palindrome:\n")

    for s in test_cases:
        result1 = solution.minInsertions(s)
        result2 = solution_direct.minInsertions(s)

        print(f"Input: '{s}'")
        print(f"Minimum insertions: {result1}")

        # Get one possible palindrome
        if len(s) <= 10:  # Only for small strings
            _, palindrome = solution_direct.minInsertionsWithPath(s)
            print(f"Possible palindrome: '{palindrome}'")

        print()

    print("="*50 + "\n")

    # Performance comparison for larger strings
    import time

    print("Performance Test:")
    test_string = "a" * 100 + "b" * 100

    start = time.time()
    result_dp = solution.minInsertions(test_string)
    time_dp = time.time() - start

    start = time.time()
    result_opt = solution.minInsertionsOptimized(test_string)
    time_opt = time.time() - start

    print(f"String length: {len(test_string)}")
    print(f"Result: {result_dp} insertions")
    print(f"Standard DP time: {time_dp:.4f}s")
    print(f"Optimized DP time: {time_opt:.4f}s")
