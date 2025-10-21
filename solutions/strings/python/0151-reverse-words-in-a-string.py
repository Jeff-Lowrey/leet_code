"""
# Difficulty: Medium

# 151. Reverse Words In A String

This problem demonstrates key concepts in String manipulation and parsing.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"  hello   world  "</dd>
<dt>Output:</dt>
<dd>"world hello"</dd>
<dt>Explanation:</dt>
<dd>After reversing words, 'the sky is blue' becomes 'blue is sky the'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Backtracking
**Data Structures**: Array, String
**Patterns**: Iterative Solution
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(n)

### INTUITION:
We need to reverse the order of words in a string, where words are separated by spaces. The key
challenges are: 1) handling multiple spaces between words, 2) trimming leading/trailing spaces,
and 3) reversing the word order while preserving word integrity.

### APPROACH:
1. **Strip leading/trailing spaces**: Remove any whitespace from both ends
2. **Split by whitespace**: Use regex or Python's split() to handle multiple spaces
3. **Reverse the list of words**: Reverse the order of words
4. **Join with single space**: Combine words back with exactly one space between them

### WHY THIS WORKS:
- Python's split() without arguments automatically handles multiple spaces
- It splits on any whitespace and removes empty strings from the result
- Reversing a list in Python is O(n) and very efficient
- Joining with a single space ensures proper formatting

### EXAMPLE WALKTHROUGH:
```
Input: s = "  hello   world  "
Step 1: Strip: "hello   world"
Step 2: Split: ["hello", "world"]
Step 3: Reverse: ["world", "hello"]
Step 4: Join: "world hello"
Output: "world hello"

Input: s = "a good   example"
Step 1: Strip: "a good   example"
Step 2: Split: ["a", "good", "example"]
Step 3: Reverse: ["example", "good", "a"]
Step 4: Join: "example good a"
Output: "example good a"
```

### TIME COMPLEXITY:
O(n)
Where n is the length of the string. We scan the string once to split, reverse the list (O(n)),
and join back (O(n)).

### SPACE COMPLEXITY:
O(n)
We create a list of words and the result string, both proportional to input size.

### EDGE CASES:
- Single word: Returns the same word
- Empty string: Returns empty string
- Only spaces: Returns empty string
- Multiple consecutive spaces: Handled by split()
- Leading/trailing spaces: Removed by strip() or split()

</details>
"""

import re


class Solution:
    def solve(self, s: str) -> str:
        """
        Reverse the order of words in a string.

        Args:
            s: Input string with words separated by spaces

        Returns:
            String with words in reverse order, single space separated

        Time Complexity: O(n) where n is the length of the string
        Space Complexity: O(n) for the list of words and result string
        """
        # Split by whitespace (automatically handles multiple spaces)
        # Reverse the list, and join with single space
        return " ".join(s.split()[::-1])

    def solve_manual(self, s: str) -> str:
        """
        Manual solution using explicit steps.

        More verbose but clearer for understanding the algorithm.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Strip leading/trailing whitespace
        s = s.strip()

        # Split by whitespace
        words = s.split()

        # Reverse the list
        words.reverse()

        # Join with single space
        return " ".join(words)

    def solve_regex(self, s: str) -> str:
        """
        Solution using regex for explicit multi-space handling.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Split by one or more whitespace characters
        words = re.split(r"\s+", s.strip())

        # Reverse and join
        return " ".join(reversed(words))


def test_solution() -> None:
    """
    Test cases for 151. Reverse Words In A String.
    """
    solution = Solution()

    # Test case 1: Basic with single spaces
    solution.solve("the sky is blue")

    # Test case 2: Leading and trailing spaces
    solution.solve("  hello world  ")

    # Test case 3: Multiple spaces between words
    solution.solve("a good   example")

    # Test case 4: Single word
    solution.solve("hello")

    # Test case 5: Two words
    solution.solve("hello world")

    # Test case 6: Single word with spaces
    solution.solve("   hello   ")

    # Test case 7: Complex spacing
    solution.solve("  Bob    Loves  Alice   ")

    # Test manual solution
    result8 = solution.solve_manual("the sky is blue")
    assert result8 == "blue is sky the", f"Test 8 (manual) failed: expected 'blue is sky the', got '{result8}'"

    # Test regex solution
    result9 = solution.solve_regex("a good   example")
    assert result9 == "example good a", f"Test 9 (regex) failed: expected 'example good a', got '{result9}'"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    print(f"Input: 'the sky is blue'")
    print(f"Output: '{solution.solve('the sky is blue')}'")
    print(f"\nInput: '  hello world  '")
    print(f"Output: '{solution.solve('  hello world  ')}'")
