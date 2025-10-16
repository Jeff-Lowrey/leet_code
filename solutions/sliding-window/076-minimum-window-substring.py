"""
# Difficulty: Medium

# 076. Minimum Window Substring

Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"ADOBECODEBANC", t = "ABC"</dd>
<dt>Output:</dt>
<dd>"BANC"</dd>
<dt>Explanation:</dt>
<dd>Minimum window containing all chars of t='ABC' is 'BANC'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use sliding window with character counts. Expand right until window contains all t characters. Then shrink left while maintaining validity. Track minimum window. Use two frequency maps for comparison.

### APPROACH:
1. **Count target characters**: Use Counter(t) to get required character frequencies
2. **Initialize window variables**: Set left = 0, min_len = float('inf'), required = len(t_count), formed = 0
3. **Expand window with right**: For right in range(len(s)), add s[right] to window_counts
4. **Track formation**: If window_counts[char] == t_count[char], increment formed
5. **Contract window**: While formed == required, try shrinking from left
6. **Update minimum**: If current window smaller, update min_len and min_start
7. **Remove from left**: Remove s[left] from window, increment left
8. **Return result**: Return s[min_start:min_start+min_len] if found, else empty string

### WHY THIS WORKS:
- Expanding window until all t chars included, then contract to minimize
- Two frequency maps: need (from t) and window (current counts)
- Have/need counters track how many unique chars satisfy frequency
- When have == need, try contracting left to find minimum
- O(m + n) time: scan s once, O(1) space for fixed alphabet

### EXAMPLE WALKTHROUGH:
```
Input: s = "ADOBECODEBANC", t = "ABC"
Step 1: Expand window until valid
  "ADOBEC" contains A,B,C

Step 2: Contract from left
  "DOBEC" missing A
  "ADOBEC" is minimum so far (6 chars)

Step 3: Continue expanding
  "ODEBANC" contains A,B,C
  Contract: "BANC" (4 chars) - new minimum

Output: "BANC"
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

from typing import List, Optional, Dict, Tuple


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        """
        Find the minimum window substring in s that contains all characters from t.

        Args:
            s: The source string to search in
            t: The target string containing characters to find

        Returns:
            The minimum window substring containing all characters from t,
            or empty string if no such window exists
        """
        if not s or not t:
            return ""

        # Initialize character frequency maps
        target_chars: Dict[str, int] = Counter(t)
        window_chars: Dict[str, int] = {}

        # Initialize variables for tracking
        required = len(target_chars)
        current = 0
        left = 0
        min_length = float("inf")
        result = ""

        # Iterate through the string using sliding window
        for right in range(len(s)):
            # Add current character to window
            char = s[right]
            window_chars[char] = window_chars.get(char, 0) + 1

            # Check if current character helps form a valid window
            if char in target_chars and window_chars[char] == target_chars[char]:
                current += 1

            # Try to minimize window by moving left pointer
            while current == required:
                # Update result if current window is smaller
                window_size = right - left + 1
                if window_size < min_length:
                    min_length = window_size
                    result = s[left : right + 1]

                # Remove leftmost character from window
                left_char = s[left]
                window_chars[left_char] -= 1

                # Check if removing character breaks the window
                if left_char in target_chars and window_chars[left_char] < target_chars[left_char]:
                    current -= 1

                left += 1

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.minWindow("ADOBECODEBANC", "ABC")
    expected = "BANC"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.minWindow("", "A")
    expected = ""
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 076. Minimum Window Substring")
