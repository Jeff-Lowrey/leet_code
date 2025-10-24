"""
# Difficulty: Medium

# 567. Permutation In String

Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s1 = "ab", s2 = "eidbaooo"</dd>
<dt>Output:</dt>
<dd>True</dd>
<dt>Explanation:</dt>
<dd>The permutation of s2='ab' exists in s1 starting at index 1 ('ba' is a permutation of 'ab')</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Sliding Window
**Data Structures**: Array, String
**Patterns**: Sliding Window Pattern, Hash Table Pattern
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use sliding window with character frequency. Window is valid if it contains permutation of s1 (same character counts). Check each window of size len(s1) by maintaining character counts.

### APPROACH:
1. **Count s1 characters**: Use Counter(s1) to get character frequencies
2. **Initialize window**: Create window counter for first len(s1) characters of s2
3. **Check first window**: If window == s1_count, return True
4. **Slide window**: For i from len(s1) to len(s2)
5. **Add new character**: window[s2[i]] += 1
6. **Remove old character**: window[s2[i-len(s1)]] -= 1
7. **Check match**: If window == s1_count, return True
8. **Return False**: If loop completes without match

### WHY THIS WORKS:
- Sliding window of length len(s1) checks if character frequencies match
- Track frequency differences: matches counts how many chars have correct frequency
- When matches == 26 (all alphabet chars match), found permutation
- Slide window: update frequency for outgoing and incoming characters
- O(n) time for s2 length n, O(1) space for fixed alphabet size

### EXAMPLE WALKTHROUGH:
Input:
```
s1 = "ab", s2 = "eidbaooo"
```

Step 1: Check each window of size 2
"ei": not permutation
"id": not permutation
"db": not permutation
"ba": is permutation of "ab" ✓

Output:
```
True
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

from collections import Counter


class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        """
        Determines if any permutation of s1 is a substring of s2.

        Args:
            s1 (str): The string whose permutation we're looking for
            s2 (str): The string we're searching in

        Returns:
            bool: True if any permutation of s1 is found in s2, False otherwise
        """
        # Handle edge cases
        if len(s1) > len(s2):
            return False

        # Initialize character count arrays for both strings
        s1_count = [0] * 26
        window_count = [0] * 26

        # Fill initial character counts for s1
        for char in s1:
            s1_count[ord(char) - ord("a")] += 1

        # Initialize the first window in s2
        window_size = len(s1)
        for i in range(window_size):
            window_count[ord(s2[i]) - ord("a")] += 1

        # Check if initial window is a permutation
        if s1_count == window_count:
            return True

        # Slide the window through s2
        for i in range(window_size, len(s2)):
            # Remove leftmost character from window
            window_count[ord(s2[i - window_size]) - ord("a")] -= 1
            # Add new character to window
            window_count[ord(s2[i]) - ord("a")] += 1

            # Check if current window is a permutation
            if s1_count == window_count:
                return True

        return False

    def checkInclusion_optimized(self, s1: str, s2: str) -> bool:
        """
        Alternative implementation using a single counter for optimization.

        Args:
            s1 (str): The string whose permutation we're looking for
            s2 (str): The string we're searching in

        Returns:
            bool: True if any permutation of s1 is found in s2, False otherwise
        """
        if len(s1) > len(s2):
            return False

        # Initialize counter array
        counter = [0] * 26

        # Process first window
        for i in range(len(s1)):
            counter[ord(s1[i]) - ord("a")] += 1
            counter[ord(s2[i]) - ord("a")] -= 1

        # Check if first window is a permutation
        if all(count == 0 for count in counter):
            return True

        # Slide window
        for i in range(len(s1), len(s2)):
            # Update counter for sliding window
            counter[ord(s2[i]) - ord("a")] -= 1
            counter[ord(s2[i - len(s1)]) - ord("a")] += 1

            # Check if current window is a permutation
            if all(count == 0 for count in counter):
                return True

        return False


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.checkInclusion("ab", "eidbaooo")
    expected = True
    assert result == expected, f"Expected expected, got result"

    # Test case 2: No permutation found
    result = solution.checkInclusion("ab", "eidboaoo")
    expected = False
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 567. Permutation In String")
