"""
### INTUITION:
The key insight is that process the string character by character following a strict sequence: skip whitespace, read optional sign, accumulate digits until non-digit found, handle overflow by clamping to 32-bit integer range.

### APPROACH:
1. We use a state machine approach to parse the string step by step.
2. First, we skip any leading whitespace characters.
3. Next, we check for an optional sign character ('+' or '-') and record whether the result should be negative.
4. Then, we iterate through the remaining characters, processing only digits.
5. For each digit character, we multiply our current result by 10 and add the digit value.
6. Before each multiplication, we check if the operation would cause overflow beyond the 32-bit signed integer range (INT_MIN = -2^31, INT_MAX = 2^31 - 1).
7. If overflow would occur, we immediately return the clamped value.
8. We stop processing as soon as we encounter a non-digit character or reach the end of the string.
9. If no digits were processed, we return 0.

### WHY THIS WORKS:
- Sequential processing handles all required steps in correct order
- Early termination on non-digit prevents invalid parsing
- Overflow detection before multiplication prevents integer overflow
- Clamping ensures result stays within valid 32-bit range

### EXAMPLE WALKTHROUGH:
Input:
```
s = "   -42"
```

**Step 1:** Skip whitespace: index moves from 0 to 3

**Step 2:** Read sign: '-' found, set negative flag

**Step 3:** Process digit '4': result = 0 * 10 + 4 = 4

**Step 4:** Process digit '2': result = 4 * 10 + 2 = 42

**Step 5:** Apply sign: result = -42

Output:
```
-42
```

### TIME COMPLEXITY:
**O(n)** - We iterate through the string once, where n is the length of the string. Each character is processed at most once.

### SPACE COMPLEXITY:
**O(1)** - We only use a fixed number of variables (result, sign, index) regardless of input size.

### EDGE CASES:
- **Only whitespace:** "   " → 0
- **No digits after sign:** "+-12" → 0 (stops at second sign)
- **Overflow positive:** "2147483648" → 2147483647 (INT_MAX)
- **Overflow negative:** "-2147483649" → -2147483648 (INT_MIN)
- **Words with numbers:** "words and 987" → 0 (stops at 'w')
- **Empty string:** "" → 0

"""

from typing import Any


class Solution:
    def myAtoi(self, s: str) -> int:
        """
        Approach: State machine with sequential processing
        Time Complexity: O(n)
        Space Complexity: O(1)

        Args:
            s: String to convert to integer

        Returns:
            32-bit signed integer result
        """
        if not s:
            return 0

        # Constants for 32-bit signed integer range
        INT_MAX = 2**31 - 1
        INT_MIN = -(2**31)

        # Initialize variables
        index = 0
        n = len(s)
        sign = 1
        result = 0

        # Step 1: Skip leading whitespace
        while index < n and s[index] == " ":
            index += 1

        # Step 2: Check for sign
        if index < n and (s[index] == "+" or s[index] == "-"):
            sign = -1 if s[index] == "-" else 1
            index += 1

        # Step 3: Read digits and build number
        while index < n and s[index].isdigit():
            digit = int(s[index])

            # Check for overflow before multiplication
            if result > (INT_MAX - digit) // 10:
                return INT_MAX if sign == 1 else INT_MIN

            result = result * 10 + digit
            index += 1

        # Step 4: Apply sign and return
        return sign * result


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1: Basic positive number
    s1 = "42"
    expected1 = 42
    result1 = solution.myAtoi(s1)
    print(f'Input: "{s1}"')
    print(f"Output: {result1}")
    print(f"Expected: {expected1}")
    print(f"Pass: {result1 == expected1}")
    print()

    # Test case 2: Negative with whitespace
    s2 = "   -42"
    expected2 = -42
    result2 = solution.myAtoi(s2)
    print(f'Input: "{s2}"')
    print(f"Output: {result2}")
    print(f"Expected: {expected2}")
    print(f"Pass: {result2 == expected2}")
    print()

    # Test case 3: With words after
    s3 = "4193 with words"
    expected3 = 4193
    result3 = solution.myAtoi(s3)
    print(f'Input: "{s3}"')
    print(f"Output: {result3}")
    print(f"Expected: {expected3}")
    print(f"Pass: {result3 == expected3}")
    print()

    # Test case 4: Overflow positive
    s4 = "91283472332"
    expected4 = 2147483647  # INT_MAX
    result4 = solution.myAtoi(s4)
    print(f'Input: "{s4}"')
    print(f"Output: {result4}")
    print(f"Expected: {expected4}")
    print(f"Pass: {result4 == expected4}")
    print()

    # Test case 5: Words before numbers
    s5 = "words and 987"
    expected5 = 0
    result5 = solution.myAtoi(s5)
    print(f'Input: "{s5}"')
    print(f"Output: {result5}")
    print(f"Expected: {expected5}")
    print(f"Pass: {result5 == expected5}")
    print()
