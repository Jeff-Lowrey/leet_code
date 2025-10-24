"""
# 38. Count And Say

# Difficulty: Medium

The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
- countAndSay(1) = "1"
- countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1),
  which is then converted into a different digit string.

To determine how you "say" a digit string, split it into the minimal number of substrings
such that each substring contains exactly one unique digit. Then for each substring,
say the number of digits, then say the digit. Finally, concatenate every said digit.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 4</dd>
<dt>Output:</dt>
<dd>1211"</dd>
<dt>Explanation:</dt>
<dd>4th count-and-say term is '1211'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Map Storage, Array Traversal, Two Pointers
**Data Structures**: Array, String, Stack
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n * m)
**Space Complexity**: O(m)

### INTUITION:
The count-and-say sequence is built iteratively where each term describes the previous term
by counting consecutive identical digits. We read the previous result from left to right,
counting how many times each digit appears consecutively, then building a new string.

### APPROACH:
1. **Base Case**: Start with "1" for n=1
2. **Iterative Building**: For each iteration from 2 to n:
   - Read through the previous string
   - Count consecutive occurrences of each digit
   - Build new string by appending count + digit
3. **Two-Pointer Technique**: Use two pointers to identify runs of same digits
4. **String Construction**: Use list for efficient string building

### WHY THIS WORKS:
- Each term is uniquely determined by the previous term
- We process left to right, counting consecutive identical digits
- The pattern is deterministic and follows a clear rule
- Building with a list and joining is efficient in Python

### EXAMPLE WALKTHROUGH:
Input:
```
n = 5:
```

1. "1"
2. "11" (one 1)
3. "21" (two 1s)
4. "1211" (one 2, one 1)
5. "111221" (one 1, one 2, two 1s)

Steps:
Step 1: For "1211" → "111221":
Step 2: - Read '1' once: "11"
Step 3: - Read '2' once: "12"
Step 4: - Read '1' twice: "21"
Step 5: - Result: "111221"

### TIME COMPLEXITY:
O(n * m)
- n iterations to build up to the nth term
- m is the length of the string at each iteration (grows exponentially)
- Each iteration processes the entire string once

### SPACE COMPLEXITY:
O(m)
- m is the length of the current string
- We store the result string which grows with each iteration

### EDGE CASES:
- n = 1: Return "1" directly
- Long sequences: String grows exponentially
- All same digits: Still processed character by character

</details>
"""

from itertools import groupby
from typing import Any


class Solution:
    def countAndSay(self, n: int) -> str:
        """
        Generate the nth term of the count-and-say sequence.

        Args:
            n: The position in the sequence (1-indexed)

        Returns:
            The nth count-and-say string

        Time Complexity: O(n * m) where m is string length at iteration
        Space Complexity: O(m) for storing the result string
        """
        if n == 1:
            return "1"

        # Start with the first term
        result = "1"

        # Build up to the nth term
        for _ in range(n - 1):
            result = self._say_number(result)

        return result

    def _say_number(self, s: str) -> str:
        """
        Convert a number string to its count-and-say form.

        Args:
            s: Input digit string

        Returns:
            Count-and-say representation
        """
        if not s:
            return ""

        result: list[Any] = []
        i = 0

        while i < len(s):
            digit = s[i]
            count = 1

            # Count consecutive occurrences of the same digit
            while i + count < len(s) and s[i + count] == digit:
                count += 1

            # Append count and digit
            result.append(str(count))
            result.append(digit)

            # Move to the next different digit
            i += count

        return "".join(result)

    def countAndSayRecursive(self, n: int) -> str:
        """
        Recursive implementation of count-and-say.

        Args:
            n: The position in the sequence

        Returns:
            The nth count-and-say string

        Time Complexity: O(2^n) - exponential due to recursion
        Space Complexity: O(n) - recursion stack depth
        """
        # Base case
        if n == 1:
            return "1"

        # Get previous term recursively
        prev = self.countAndSayRecursive(n - 1)

        # Build current term
        result = []
        i = 0

        while i < len(prev):
            digit = prev[i]
            count = 1

            while i + count < len(prev) and prev[i + count] == digit:
                count += 1

            result.append(str(count) + digit)
            i += count

        return "".join(result)

    def countAndSayGroupBy(self, n: int) -> str:
        """
        Implementation using groupby from itertools.

        Args:
            n: The position in the sequence

        Returns:
            The nth count-and-say string
        """
        result = "1"

        for _ in range(n - 1):
            # Group consecutive identical digits
            result = "".join(str(len(list(group))) + digit for digit, group in groupby(result))

        return result


def test_solution() -> None:
    """Test cases for Problem 38."""
    solution = Solution()

    # Test case 1: Base case
    result1 = solution.countAndSay(1)
    expected1 = "1"
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Second term
    result2 = solution.countAndSay(2)
    expected2 = "11"
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Third term
    result3 = solution.countAndSay(3)
    expected3 = "21"
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Fourth term
    result4 = solution.countAndSay(4)
    expected4 = "1211"
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Fifth term
    result5 = solution.countAndSay(5)
    expected5 = "111221"
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Sixth term
    result6 = solution.countAndSay(6)
    expected6 = "312211"
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test recursive solution
    result7 = solution.countAndSayRecursive(4)
    expected7 = "1211"
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test groupby solution
    result8 = solution.countAndSayGroupBy(5)
    expected8 = "111221"
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 38. Count and Say ===")
    print("\nFirst 10 terms of count-and-say sequence:")
    for i in range(1, 11):
        result = solution.countAndSay(i)
        print(f"countAndSay({i}) = '{result}'")

    # Demonstrate the logic
    print("\nDetailed walkthrough for n=4:")
    print("1. Start: '1'")
    print("2. Say '1': one 1 → '11'")
    print("3. Say '11': two 1s → '21'")
    print("4. Say '21': one 2, one 1 → '1211'")
