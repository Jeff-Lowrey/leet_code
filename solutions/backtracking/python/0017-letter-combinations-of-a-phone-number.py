"""
# Difficulty: Medium

# 0017. Letter Combinations Of A Phone Number

Given a string containing digits from 2-9 inclusive, return all possible letter
combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below:
2: ABC, 3: DEF, 4: GHI, 5: JKL, 6: MNO, 7: PQRS, 8: TUV, 9: WXYZ

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"23"</dd>
<dt>Output:</dt>
<dd>{solution.letterCombinations('23')}")</dd>
<dt>Explanation:</dt>
<dd>All letter combinations of '23' map to ['ad','ae','af','bd','be','bf','cd','ce','cf']</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Backtracking
**Time Complexity**: O(3^N × 4^M)
**Space Complexity**: O(3^N × 4^M)

### INTUITION:
The key insight is that this is a classic backtracking problem where we need to generate all possible
combinations. Each digit maps to multiple letters, creating a decision tree
where we explore all paths.

### APPROACH:
1. **Map digits to letters**: Create a lookup table for phone mappings
2. **Use backtracking**: Build combinations character by character
3. **Recursive exploration**: For each digit, try all possible letters
4. **Base case**: When we've processed all digits, add the combination

### WHY THIS WORKS:
- This ensures that backtracking explores all possible paths systematically
- This ensures that we build combinations incrementally and backtrack when needed
- This ensures that each recursive call handles one digit at a time

### EXAMPLE WALKTHROUGH:
Input:
```
"23"
```

Steps:
Step 1: digit '2' -> try 'a', 'b', 'c'
Step 2: For each letter from '2', try letters from '3' -> 'd', 'e', 'f'
Step 3: Result: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Output:
```
["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### TIME COMPLEXITY:
**O(3^N × 4^M)** - where N is the number of digits mapping to 3 letters (digits 2-6, 8) and M is the number of digits mapping to 4 letters (digits 7, 9). We generate all possible combinations by exploring every path in the decision tree. Each digit can map to 3 or 4 letters, creating a tree where each node branches into 3 or 4 children. The total number of combinations is the product of the number of letters each digit maps to. For example, "23" gives 3 × 3 = 9 combinations. The time to generate each combination is proportional to its length (the number of digits), so total time is O(3^N × 4^M) × O(N+M) ≈ O(3^N × 4^M) since the exponential term dominates.

### SPACE COMPLEXITY:
**O(3^N × 4^M)** - We store all generated combinations in the result list. Each combination is a string of length (N+M) where N is the count of digits mapping to 3 letters and M is the count of digits mapping to 4 letters. The total number of combinations is 3^N × 4^M, and each combination takes O(N+M) space. Therefore, the total space complexity is O(3^N × 4^M) × O(N+M). Additionally, the recursion call stack can go as deep as the number of digits, which is O(N+M), but this is dominated by the space needed to store all combinations.

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

from typing import Any


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
        phone_map = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl", "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}

        result: list[Any] = []

        def backtrack(index: int, current_combination: str) -> None:
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


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.letterCombinations("23")
    expected = ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.letterCombinations("")
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single digit
    result = solution.letterCombinations("2")
    expected = ["a", "b", "c"]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 017. Letter Combinations Of A Phone Number ===")
    print(f"Input: '23' -> Output: {solution.letterCombinations('23')}")
    print(f"Input: '2' -> Output: {solution.letterCombinations('2')}")
    print(f"Input: '' -> Output: {solution.letterCombinations('')}")
