"""
# 76. Minimum Window Substring
# Difficulty: Hard
This problem demonstrates key concepts in Sliding Window and Hash Tables.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to find the smallest substring of `s` that contains all characters from `t` (including
duplicates). This is a classic sliding window problem. The key insight is to use two pointers
to create a window, expand it to include all required characters, then contract it to find the
minimum window.

### APPROACH:
1. **Count target characters**: Build frequency map of characters in `t`
2. **Expand window**: Move right pointer to include characters until window is valid
3. **Contract window**: Move left pointer to shrink window while keeping it valid
4. **Track minimum**: Record the smallest valid window found
5. **Return result**: Extract and return the minimum window substring

### WHY THIS WORKS:
- Sliding window technique efficiently explores all possible windows
- Hash maps provide O(1) character frequency tracking
- "formed" counter tracks how many unique characters have required frequency
- By expanding then contracting, we find all valid windows
- Only the minimum valid window is kept

### TIME COMPLEXITY: O(|s| + |t|)
We iterate through `s` at most twice (once with right pointer, once with left pointer).
Building the target frequency map takes O(|t|). Total is O(|s| + |t|).

### SPACE COMPLEXITY: O(|s| + |t|)
In the worst case, all characters in `s` and `t` are unique, so our hash maps store O(|s| + |t|)
entries. In practice, for limited character sets (like ASCII), this is O(1).

### EXAMPLE WALKTHROUGH:
```
Input: s = "ADOBECODEBANC", t = "ABC"

Step 1: Count target: {'A':1, 'B':1, 'C':1}, required = 3

Step 2: Expand window
- Window "ADOBEC": has A, B, C (valid) ✓
- Try to contract from left

Step 3: Contract window
- Remove "A": "DOBEC" (invalid, missing A)
- Can't contract more

Step 4: Continue expanding
- Window "ADOBECODEBANC": still valid
- Contract: "ODEBANC" (invalid)
- Continue...

Step 5: Find minimum
- Smallest valid window: "BANC"

Output: "BANC"
```

### EDGE CASES:
- Empty `s` or `t`: Return empty string
- `t` longer than `s`: Return empty string
- No valid window exists: Return empty string
- Entire `s` is the minimum window: Return `s`
- Multiple minimum windows: Return any one (first found)

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses the sliding window technique with two pointers and frequency maps.

### Algorithm Steps:
1. Build frequency map for target string `t`
2. Initialize two pointers (left, right) and tracking variables
3. Expand window by moving right pointer:
   - Add character to window
   - If character frequency matches target, increment "formed" counter
4. When window is valid (formed == required):
   - Try to contract by moving left pointer
   - Update minimum window if current is smaller
5. Return the minimum window substring

### Key Variables:
- `target_count`: Frequency map of characters in `t`
- `window_counts`: Frequency map of characters in current window
- `required`: Number of unique characters in `t` that must be in window
- `formed`: Number of unique characters in window with desired frequency

</details>
"""

from collections import Counter

class Solution:
    def solve(self, s: str, t: str) -> str:
        """
        Find minimum window substring of s that contains all characters from t.

        Args:
            s: Source string to search in
            t: Target string with required characters

        Returns:
            Minimum window substring, or empty string if none exists

        Time Complexity: O(|s| + |t|) where |s| and |t| are string lengths
        Space Complexity: O(|s| + |t|) for hash maps
        """
        if not s or not t or len(s) < len(t):
            return ""

        # Count characters in target string
        target_count = Counter(t)
        required = len(target_count)  # Number of unique chars in t

        # Window tracking
        left = 0
        right = 0
        formed = 0  # Number of unique chars in window with desired frequency
        window_counts = {}

        # Result tracking (length, left, right)
        result = float('inf'), None, None

        while right < len(s):
            # Add character from right to window
            char = s[right]
            window_counts[char] = window_counts.get(char, 0) + 1

            # Check if frequency of current char matches desired frequency
            if char in target_count and window_counts[char] == target_count[char]:
                formed += 1

            # Try to contract the window from left
            while left <= right and formed == required:
                # Update result if this window is smaller
                if right - left + 1 < result[0]:
                    result = (right - left + 1, left, right)

                # Remove character from left of window
                left_char = s[left]
                window_counts[left_char] -= 1

                # Check if this breaks the window validity
                if left_char in target_count and window_counts[left_char] < target_count[left_char]:
                    formed -= 1

                left += 1

            right += 1

        # Return the minimum window or empty string
        return "" if result[0] == float('inf') else s[result[1]:result[2] + 1]

def test_solution():
    """
    Test cases for 76. Minimum Window Substring.
    """
    solution = Solution()

    # Test case 1: Basic case
    result1 = solution.solve("ADOBECODEBANC", "ABC")
    assert result1 == "BANC", f"Test 1 failed: expected 'BANC', got '{result1}'"

    # Test case 2: Single character
    result2 = solution.solve("a", "a")
    assert result2 == "a", f"Test 2 failed: expected 'a', got '{result2}'"

    # Test case 3: No valid window
    result3 = solution.solve("a", "aa")
    assert result3 == "", f"Test 3 failed: expected '', got '{result3}'"

    # Test case 4: Entire string is minimum window
    result4 = solution.solve("ab", "ab")
    assert result4 == "ab", f"Test 4 failed: expected 'ab', got '{result4}'"

    # Test case 5: Target with duplicates
    result5 = solution.solve("aaaaaaaaaaaabbbbbcdd", "abcdd")
    assert result5 == "abbbbbcdd", f"Test 5 failed: expected 'abbbbbcdd', got '{result5}'"

    # Test case 6: Window at the beginning
    result6 = solution.solve("abc", "abc")
    assert result6 == "abc", f"Test 6 failed: expected 'abc', got '{result6}'"

    # Test case 7: Target longer than source
    result7 = solution.solve("a", "ab")
    assert result7 == "", f"Test 7 failed: expected '', got '{result7}'"

    # Test case 8: Complex case
    result8 = solution.solve("bba", "ab")
    assert result8 == "ba", f"Test 8 failed: expected 'ba', got '{result8}'"

    # Test case 9: Case sensitivity
    result9 = solution.solve("Aa", "Aa")
    assert result9 == "Aa", f"Test 9 failed: expected 'Aa', got '{result9}'"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    print(f"Minimum window in 'ADOBECODEBANC' for 'ABC': '{solution.solve('ADOBECODEBANC', 'ABC')}'")
    print(f"Minimum window in 'a' for 'a': '{solution.solve('a', 'a')}'")
    print(f"Minimum window in 'a' for 'aa': '{solution.solve('a', 'aa')}'")
