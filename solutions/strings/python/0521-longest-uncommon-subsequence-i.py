"""
LeetCode Problem 521: Longest Uncommon Subsequence I
Difficulty: Easy
Category: Strings

Problem Description:
Given two strings a and b, return the length of the longest uncommon subsequence between a and b.
If no such uncommon subsequence exists, return -1.

An uncommon subsequence between two strings is a string that is a subsequence of exactly one of them.

Example 1:
Input: a = "aba", b = "cdc"
Output: 3
Explanation: One longest uncommon subsequence is "aba" because "aba" is a subsequence of "aba" but not "cdc".

Example 2:
Input: a = "aaa", b = "bbb"
Output: 3

Example 3:
Input: a = "aaa", b = "aaa"
Output: -1

Constraints:
- 1 <= a.length, b.length <= 100
- a and b consist of lower-case English letters.

METADATA:
Techniques:
- String comparison
- Logical reasoning
- Edge case analysis

Data Structures:
- String

Patterns:
- Brainteaser
- Problem simplification

Time Complexity: O(min(n, m)) where n, m are string lengths (for comparison)
Space Complexity: O(1)

Intuition:
This is a brainteaser problem. The key insight is that if the two strings are different,
the longer string (or either if equal length) cannot be a subsequence of the other, making
it an uncommon subsequence. If the strings are identical, any subsequence of one is also
a subsequence of the other, so there's no uncommon subsequence.

Approach:
1. If a == b, return -1 (no uncommon subsequence exists)
2. Otherwise, return max(len(a), len(b))

Why This Works:
If a != b, then the entire string a is a subsequence of a but not of b (since they're different),
and vice versa. The longest such uncommon subsequence is simply the longer of the two strings.

Example Walkthrough:
a = "aba", b = "cdc"
- a != b, so both are uncommon subsequences
- max(3, 3) = 3

a = "aaa", b = "aaa"
- a == b, so no uncommon subsequence exists
- return -1
"""


def findLUSlength(a: str, b: str) -> int:
    """
    Find the length of the longest uncommon subsequence.

    Args:
        a: First string
        b: Second string

    Returns:
        Length of longest uncommon subsequence, or -1 if none exists
    """
    # If strings are equal, no uncommon subsequence exists
    if a == b:
        return -1

    # Otherwise, the longer string is the longest uncommon subsequence
    return max(len(a), len(b))


if __name__ == "__main__":
    test_cases = [
        ("aba", "cdc", 3),
        ("aaa", "bbb", 3),
        ("aaa", "aaa", -1),
        ("a", "aa", 2),
        ("abc", "abc", -1),
        ("abc", "def", 3)
    ]

    print("Testing findLUSlength:")
    for a, b, expected in test_cases:
        result = findLUSlength(a, b)
        status = "✓" if result == expected else "✗"
        print(f"{status} findLUSlength(\"{a}\", \"{b}\") = {result}, expected = {expected}")
