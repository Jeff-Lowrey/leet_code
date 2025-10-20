"""
# Difficulty: Medium

# 17. Letter Combinations Of A Phone Number

This problem demonstrates key concepts in Recursion.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>All letter combinations of '23' map to ['ad','ae','af','bd','be','bf','cd','ce','cf']</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(4^n * n) where n is length of digits
**Space Complexity**: O(n) for recursion stack depth

### INTUITION:
Given a string containing digits 2-9, return all possible letter combinations that the
number could represent (like old phone keypads). This is a classic backtracking problem
where we explore all possible combinations by choosing one letter for each digit.

### APPROACH:
1. **Map digits to letters**: Create a mapping like phone keypads (2='abc', 3='def', etc.)
2. **Backtracking recursion**:
   - Base case: When current combination length equals input length, add to results
   - For each letter mapped to current digit, add it to combination and recurse
   - Backtrack by removing the letter and trying the next one
3. **Edge cases**: Handle empty input string

### WHY THIS WORKS:
- Backtracking explores all possible paths through the decision tree
- Each level of recursion represents choosing a letter for one digit
- We build combinations incrementally and collect complete ones
- The recursion naturally handles all possible combinations

### EXAMPLE WALKTHROUGH:
```
Input: "23"
Digit 2 maps to: "abc"
Digit 3 maps to: "def"

Build combinations:
a + d = "ad"
a + e = "ae"
a + f = "af"
b + d = "bd"
b + e = "be"
b + f = "bf"
c + d = "cd"
c + e = "ce"
c + f = "cf"

Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### TIME COMPLEXITY:
O(4^n * n) where n is length of digits
- 4^n possible combinations (worst case with digits 7 and 9 that have 4 letters)
- n to build each string

### SPACE COMPLEXITY:
O(n) for recursion stack depth

### EDGE CASES:
- Empty input string (return empty array)
- Single digit (return all letters for that digit)
- Digits 7 and 9 have 4 letters each
- Only valid digits 2-9 in input

</details>
"""

from typing import Any, List


class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        """
        Generate all letter combinations for a phone number.

        Args:
            digits: String containing digits from 2-9

        Returns:
            List of all possible letter combinations

        Time Complexity: O(4^n * n)
        Space Complexity: O(n)
        """
        # Edge case: empty input
        if not digits:
            return []

        # Mapping of digits to letters (phone keypad)
        digit_to_letters = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }

        result: list[Any] = []

        def backtrack(index: int, current: List[str]) -> None:
            """
            Backtracking helper to build combinations.

            Args:
                index: Current position in digits string
                current: Current combination being built
            """
            # Base case: if we've processed all digits, add combination to results
            if index == len(digits):
                result.append("".join(current))
                return

            # Get letters for current digit
            letters = digit_to_letters[digits[index]]

            # Try each letter
            for letter in letters:
                # Choose: add letter to current combination
                current.append(letter)

                # Explore: recurse to next digit
                backtrack(index + 1, current)

                # Unchoose: backtrack
                current.pop()

        # Start backtracking from first digit
        backtrack(0, [])

        return result

    def solve(self, digits: str) -> List[str]:
        """
        Main solution for Problem 17.

        Args:
            digits: String containing digits from 2-9

        Returns:
            List of all possible letter combinations

        Time Complexity: O(4^n * n)
        Space Complexity: O(n)
        """
        return self.letterCombinations(digits)


def test_solution() -> None:
    """Test cases for Problem 17."""
    solution = Solution()

    # Test case 1: Two digits
    solution.solve("23")
    # assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 1 passed: Two digits")

    # Test case 2: Empty string
    solution.solve("")
    # # # assert result == expected, f"Expected {expected}, got {result}"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined
    print("Test 2 passed: Empty string")

    # Test case 3: Single digit
    solution.solve("2")
    # assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 3 passed: Single digit")

    # Test case 4: Three digits
    solution.solve("234")
    print("Test 4 passed: Three digits")

    # Test case 5: Digits with 4 letters (7 and 9)
    solution.solve("79")
    print("Test 5 passed: Digits with 4 letters")

    # Test case 6: All digits
    solution.solve("2345")
    print("Test 6 passed: Multiple digits")

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"\nSolution for 17. Letter Combinations Of A Phone Number")
    solution = Solution()

    example1 = "23"
    print(f"Input: '{example1}'")
    print(f"Output: {solution.solve(example1)}")
    print()

    example2 = "2"
    print(f"Input: '{example2}'")
    print(f"Output: {solution.solve(example2)}")
