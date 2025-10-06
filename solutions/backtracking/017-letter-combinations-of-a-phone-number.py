"""
# 017. Letter Combinations Of A Phone Number
**Medium**

Given a string containing digits from 2-9 inclusive, return all possible letter
combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below:
2: ABC, 3: DEF, 4: GHI, 5: JKL, 6: MNO, 7: PQRS, 8: TUV, 9: WXYZ

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic backtracking problem where we need to generate all possible
combinations. Each digit maps to multiple letters, creating a decision tree
where we explore all paths.

### APPROACH:
1. **Map digits to letters**: Create a lookup table for phone mappings
2. **Use backtracking**: Build combinations character by character
3. **Recursive exploration**: For each digit, try all possible letters
4. **Base case**: When we've processed all digits, add the combination

### WHY THIS WORKS:
- Backtracking explores all possible paths systematically
- We build combinations incrementally and backtrack when needed
- Each recursive call handles one digit at a time

### TIME COMPLEXITY: O(3^N × 4^M)
Where N is number of digits mapping to 3 letters, M is digits mapping to 4 letters

### SPACE COMPLEXITY: O(3^N × 4^M)
For storing all possible combinations

### EXAMPLE WALKTHROUGH:
```
Input: "23"
Step 1: digit '2' -> try 'a', 'b', 'c'
Step 2: For each letter from '2', try letters from '3' -> 'd', 'e', 'f'
Result: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### EDGE CASES:
- Empty string returns empty list
- Single digit returns all its mapped letters
- Invalid digits (0, 1) are ignored

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses backtracking to generate all combinations by:
1. Creating a phone mapping dictionary
2. Using recursive backtracking to build combinations
3. Adding complete combinations to result list

### Algorithm Steps:
1. Handle edge case of empty input
2. Create digit-to-letters mapping
3. Use backtracking helper function
4. For each digit, try all its letters
5. Recursively process remaining digits
6. Add complete combinations to result

</details>
"""

class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        """
        Generate all possible letter combinations for given phone digits.

        Args:
            digits: String of digits from 2-9

        Returns:
            List of all possible letter combinations

        Time Complexity: O(3^N × 4^M)
        Space Complexity: O(3^N × 4^M)
        """
        if not digits:
            return []

        # Phone digit to letters mapping
        phone_map = {
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

        def backtrack(index: int, current_combination: str):
            """
            Backtracking helper to build combinations.

            Args:
                index: Current digit index being processed
                current_combination: Current letter combination built so far
            """
            # Base case: processed all digits
            if index == len(digits):
                result.append(current_combination)
                return

            # Get current digit and its possible letters
            current_digit = digits[index]
            letters = phone_map[current_digit]

            # Try each letter for current digit
            for letter in letters:
                # Choose: add letter to combination
                backtrack(index + 1, current_combination + letter)
                # Backtrack happens automatically when recursion returns

        backtrack(0, "")
        return result

    def solve(self, digits: str) -> list[str]:
        """Legacy method for compatibility."""
        return self.letterCombinations(digits)

def test_solution():
    """
    Test cases for 017. Letter Combinations Of A Phone Number.
    """
    solution = Solution()

    # Test case 1: Basic functionality - two digits
    result = solution.letterCombinations("23")
    expected = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    # Test case 2: Single digit
    result = solution.letterCombinations("2")
    expected = ["a", "b", "c"]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    # Test case 3: Empty string
    result = solution.letterCombinations("")
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Longer combination
    result = solution.letterCombinations("234")
    assert len(result) == 3 * 3 * 3, f"Expected 27 combinations, got {len(result)}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 017. Letter Combinations Of A Phone Number ===")
    print(f"Input: '23' -> Output: {solution.letterCombinations('23')}")
    print(f"Input: '2' -> Output: {solution.letterCombinations('2')}")
    print(f"Input: '' -> Output: {solution.letterCombinations('')}")
