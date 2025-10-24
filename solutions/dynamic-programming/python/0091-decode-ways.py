"""
# Difficulty: Medium

# 0091. Decode Ways

A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1", 'B' -> "2", ..., 'Z' -> "26"

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways).

Given a string s containing only digits, return the number of ways to decode it.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"226"</dd>
<dt>Output:</dt>
<dd>3 (number of ways to decode)</dd>
<dt>Explanation:</dt>
<dd>String '226' decodes 3 ways: '2-2-6', '22-6', '2-26'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Set, Array, String
**Patterns**: Dynamic Programming
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
dp[i] = number of ways to decode s[0:i]. For each position, add ways from i-1 (if valid single digit) and i-2 (if valid two digits). Handle edge cases for 0.

### APPROACH:
1. **Check invalid start**: If s[0] == '0', return 0 immediately (no valid decoding)
2. **Initialize DP array**: Create dp array where dp[i] = number of ways to decode s[:i]
3. **Set base cases**: dp[0] = 1 (empty string), dp[1] = 1 (first character if not '0')
4. **Iterate through string**: For each position i from 2 to len(s)+1
5. **Check single digit**: If s[i-1] != '0', add dp[i-1] to dp[i] (decode last character alone)
6. **Check two digits**: If s[i-2:i] is valid (10-26), add dp[i-2] to dp[i] (decode last two together)
7. **Return result**: Return dp[len(s)] as total decoding ways for entire string

### WHY THIS WORKS:
- DP: dp[i] = number of ways to decode s[0:i]
- Single digit 1-9: add dp[i-1] ways
- Two digits 10-26: add dp[i-2] ways
- Invalid codes (0, 00, >26): contribute 0 ways
- O(n) time, O(1) space with two variables instead of array

### EXAMPLE WALKTHROUGH:
Input:
```
s = "226"
```

Step 1: Initialize DP
dp[0] = 1 (empty string)

Steps:
Step 1: dp[1] = 1 ("2" → "B")
Step 2: Process each digit
Step 3: i=2: s[1]="2"
Step 4: Single: "2" → "B", dp[2] += dp[1] = 1
Step 5: Double: "22" → "V", dp[2] += dp[0] = 1
Step 6: dp[2] = 2
Step 7: i=3: s[2]="6"
Step 8: Single: "6" → "F", dp[3] += dp[2] = 2
Step 9: Double: "26" → "Z", dp[3] += dp[1] = 1
Step 10: dp[3] = 3
Step 11: Decodings are "BBF", "BZ", "VF"

Output:
```
3 (number of ways to decode)
```

### TIME COMPLEXITY:
Based on the algorithm implementation


### SPACE COMPLEXITY:
Based on auxiliary data structures used


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""


class Solution:
    def numDecodings(self, s: str) -> int:
        """
        Determines the number of ways a string of digits can be decoded into letters.

        Args:
            s: A string containing only digits

        Returns:
            int: The number of possible ways to decode the string

        Time Complexity: O(n) where n is the length of the string
        Space Complexity: O(1) as we only use two variables for DP
        """
        # Handle edge cases
        if not s or s[0] == "0":
            return 0

        n = len(s)

        # Initialize DP variables
        # dp2: ways to decode string ending at i-2
        # dp1: ways to decode string ending at i-1
        dp2, dp1 = 1, 1

        # Iterate through the string starting from second character
        for i in range(1, n):
            current = 0

            # Check if single digit decode is possible
            if s[i] != "0":
                current += dp1

            # Check if two digit decode is possible
            two_digit = int(s[i - 1 : i + 1])
            if 10 <= two_digit <= 26:
                current += dp2

            # Update DP variables
            dp2 = dp1
            dp1 = current

            # If no valid decodings found, return 0
            if current == 0:
                return 0

        return dp1

    def _is_valid_input(self, s: str) -> bool:
        """
        Validates if the input string contains only digits.

        Args:
            s: Input string to validate

        Returns:
            bool: True if input is valid, False otherwise
        """
        return s.isdigit()


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem - "226" can be decoded as "BZ"(2 26), "VF"(22 6), or "BBF"(2 2 6)
    result = solution.numDecodings("226")
    expected = 3
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Single digit
    result = solution.numDecodings("1")
    expected = 1
    assert result == expected, f"Expected expected, got result"

    # Test case 3: String with leading zero - invalid
    result = solution.numDecodings("06")
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 091. Decode Ways")
