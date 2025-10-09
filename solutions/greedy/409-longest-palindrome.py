"""
# Difficulty: Easy

# 409. Longest Palindrome

Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

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
A palindrome reads the same forwards and backwards. To maximize the palindrome length, we should use as many character pairs as possible, plus at most one character with odd count (which goes in the center).

### APPROACH:
1. **Count character frequencies**: Count how many times each character appears
2. **Use pairs greedily**: Each pair of characters contributes 2 to palindrome length
3. **Handle odd counts**: If any character has odd count, we can place one in center
4. **Calculate result**: Sum of all pairs × 2, plus 1 if any odd count exists

### WHY THIS WORKS:
- [Explanation of correctness]

### EXAMPLE WALKTHROUGH:
```
Input: "abccccdd"
Character counts:
a: 1, b: 1, c: 4, d: 2

Pairs available:
a: 0 pairs (1//2 = 0)
b: 0 pairs (1//2 = 0)
c: 2 pairs (4//2 = 2)
d: 1 pair (2//2 = 1)

Total pairs: 0 + 0 + 2 + 1 = 3
Pairs contribute: 3 × 2 = 6 characters

Odd counts exist: a=1, b=1 (both odd)
Can use one character in center: +1

Result: 6 + 1 = 7
Possible palindrome: "dccaccd"
```

### TIME COMPLEXITY:
O(n)
Single pass to count characters

### SPACE COMPLEXITY:
O(1)
At most 128 ASCII characters or 52 letters (constant space)

### EDGE CASES:
- Empty string: length 0
- All characters have even counts: use all characters
- All characters have count 1: length = 1 (any single character)

</details>
"""

class Solution:
    def longestPalindrome(self, s: str) -> int:
        """
        Find the length of the longest palindrome that can be built.

        Args:
            s: Input string consisting of letters

        Returns:
            Maximum length of palindrome that can be built

        Time Complexity: O(n) - count characters once
        Space Complexity: O(1) - fixed size for character counts
        """
        from collections import Counter

        # Count frequency of each character
        char_counts = Counter(s)

        # Calculate pairs and check for odd counts
        pairs = 0
        has_odd = False

        for count in char_counts.values():
            pairs += count // 2  # Number of pairs for this character
            if count % 2 == 1:   # Check if count is odd
                has_odd = True

        # Total length = pairs × 2 + (1 if any odd count exists)
        return pairs * 2 + (1 if has_odd else 0)

    def longestPalindromeManual(self, s: str) -> int:
        """
        Alternative implementation using manual counting.

        Args:
            s: Input string

        Returns:
            Maximum palindrome length
        """
        # Manual character counting
        char_count = {}
        for char in s:
            char_count[char] = char_count.get(char, 0) + 1

        palindrome_length = 0
        has_odd = False

        for count in char_count.values():
            palindrome_length += (count // 2) * 2  # Add even part
            if count % 2 == 1:
                has_odd = True

        # Add center character if any odd count exists
        if has_odd:
            palindrome_length += 1

        return palindrome_length

    def longestPalindromeArray(self, s: str) -> int:
        """
        Implementation using array for ASCII characters.

        Args:
            s: Input string

        Returns:
            Maximum palindrome length

        Time Complexity: O(n)
        Space Complexity: O(1) - fixed size array
        """
        # Array for 128 ASCII characters
        counts = [0] * 128

        # Count character frequencies
        for char in s:
            counts[ord(char)] += 1

        pairs = 0
        has_odd = False

        for count in counts:
            if count > 0:
                pairs += count // 2
                if count % 2 == 1:
                    has_odd = True

        return pairs * 2 + (1 if has_odd else 0)

    def longestPalindromeOneLiner(self, s: str) -> int:
        """
        Concise one-liner solution.

        Args:
            s: Input string

        Returns:
            Maximum palindrome length
        """
        from collections import Counter
        counts = Counter(s)
        return sum(count // 2 for count in counts.values()) * 2 + \
               (1 if any(count % 2 for count in counts.values()) else 0)

def test_solution():
    """Test cases for Problem 409."""
    solution = Solution()

    # Test case 1: Mixed case with pairs and singles
    result1 = solution.longestPalindrome("abccccdd")
    expected1 = 7
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Single character
    result2 = solution.longestPalindrome("a")
    expected2 = 1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: All pairs
    result3 = solution.longestPalindrome("aabbcc")
    expected3 = 6
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: All unique characters
    result4 = solution.longestPalindrome("abcdef")
    expected4 = 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Empty string
    result5 = solution.longestPalindrome("")
    expected5 = 0
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: All same character
    result6 = solution.longestPalindrome("aaaa")
    expected6 = 4
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Case sensitivity
    result7 = solution.longestPalindrome("Aa")
    expected7 = 1
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test alternative implementations
    result8 = solution.longestPalindromeManual("abccccdd")
    expected8 = 7
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    result9 = solution.longestPalindromeArray("abccccdd")
    expected9 = 7
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    result10 = solution.longestPalindromeOneLiner("abccccdd")
    expected10 = 7
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 409. Longest Palindrome ===")
    print(f"longestPalindrome('abccccdd') -> {solution.longestPalindrome('abccccdd')}")
    print(f"longestPalindrome('a') -> {solution.longestPalindrome('a')}")
    print(f"longestPalindrome('aabbcc') -> {solution.longestPalindrome('aabbcc')}")
    print(f"longestPalindrome('abcdef') -> {solution.longestPalindrome('abcdef')}")
