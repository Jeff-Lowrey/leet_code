"""
# 17. Letter Combinations Of A Phone Number
# Difficulty: Medium
This problem demonstrates key concepts in Recursion.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

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

### TIME COMPLEXITY: O(4^n * n) where n is length of digits
- 4^n possible combinations (worst case with digits 7 and 9 that have 4 letters)
- n to build each string

### SPACE COMPLEXITY: O(n) for recursion stack depth

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

### EDGE CASES:
- Empty input string (return empty array)
- Single digit (return all letters for that digit)
- Digits 7 and 9 have 4 letters each
- Only valid digits 2-9 in input

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses backtracking to systematically explore all possible letter combinations.
Each digit maps to a set of letters, and we recursively build combinations by choosing
one letter at a time from each digit's mapping.

### Algorithm Steps:
1. Create digit-to-letter mapping (phone keypad)
2. Use backtracking to build combinations
3. At each step, try all letters for current digit
4. When combination is complete, add to results

</details>
"""

from typing import List

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
            '2': 'abc',
            '3': 'def',
            '4': 'ghi',
            '5': 'jkl',
            '6': 'mno',
            '7': 'pqrs',
            '8': 'tuv',
            '9': 'wxyz'
        }

        result = []

        def backtrack(index: int, current: List[str]) -> None:
            """
            Backtracking helper to build combinations.

            Args:
                index: Current position in digits string
                current: Current combination being built
            """
            # Base case: if we've processed all digits, add combination to results
            if index == len(digits):
                result.append(''.join(current))
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

def test_solution():
    """Test cases for Problem 17."""
    solution = Solution()

    # Test case 1: Two digits
    result = solution.solve("23")
    expected = ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"
    print("Test 1 passed: Two digits")

    # Test case 2: Empty string
    result = solution.solve("")
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"
    print("Test 2 passed: Empty string")

    # Test case 3: Single digit
    result = solution.solve("2")
    expected = ["a", "b", "c"]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"
    print("Test 3 passed: Single digit")

    # Test case 4: Three digits
    result = solution.solve("234")
    assert len(result) == 27, f"Expected 27 combinations, got {len(result)}"  # 3 * 3 * 3
    print("Test 4 passed: Three digits")

    # Test case 5: Digits with 4 letters (7 and 9)
    result = solution.solve("79")
    assert len(result) == 16, f"Expected 16 combinations, got {len(result)}"  # 4 * 4
    print("Test 5 passed: Digits with 4 letters")

    # Test case 6: All digits
    result = solution.solve("2345")
    assert len(result) == 81, f"Expected 81 combinations, got {len(result)}"  # 3 * 3 * 3 * 3
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
