"""
# 022. Generate Parentheses
**Medium**

Given a problem that demonstrates key concepts in Stack.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages stack principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses stack techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using stack method
3. Return the computed result

</details>
"""

from typing import List


class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        """
        Generate all combinations of well-formed parentheses using backtracking.

        Args:
            n: Number of pairs of parentheses

        Returns:
            List of all valid combinations

        Time Complexity: O(4^n / sqrt(n)) - Catalan number
        Space Complexity: O(n) for recursion stack
        """
        result = []

        def backtrack(current: str, open_count: int, close_count: int):
            """
            Build valid parentheses combinations using backtracking.

            Args:
                current: Current string being built
                open_count: Number of opening parentheses used
                close_count: Number of closing parentheses used
            """
            # Base case: we've used all n pairs
            if len(current) == 2 * n:
                result.append(current)
                return

            # Can add opening parenthesis if we haven't used all n
            if open_count < n:
                backtrack(current + "(", open_count + 1, close_count)

            # Can add closing parenthesis if it won't exceed opening count
            if close_count < open_count:
                backtrack(current + ")", open_count, close_count + 1)

        backtrack("", 0, 0)
        return result

    def solve(self, *args):
        """
        Main solution for 022. Generate Parentheses.

        Args:
            *args: Problem-specific arguments

        Returns:
            List of valid parentheses combinations

        Time Complexity: O(4^n / sqrt(n))
        Space Complexity: O(n)
        """
        return self.generateParenthesis(*args)


def test_solution():
    """
    Test cases for 022. Generate Parentheses.
    """
    solution = Solution()

    # Test case 1: n = 1
    result = solution.generateParenthesis(1)
    expected = ["()"]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    # Test case 2: n = 2
    result = solution.generateParenthesis(2)
    expected = ["(())", "()()"]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    # Test case 3: n = 3
    result = solution.generateParenthesis(3)
    expected = ["((()))", "(()())", "(())()", "()(())", "()()()"]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    # Test case 4: Verify length
    result = solution.generateParenthesis(4)
    # Catalan number for n=4 is 14
    assert len(result) == 14, f"Expected 14 combinations, got {len(result)}"
    # Verify all results have correct length
    assert all(len(s) == 8 for s in result), "All strings should have length 8"

    # Test case 5: Verify all results are valid
    def is_valid(s: str) -> bool:
        """Check if parentheses string is valid."""
        count = 0
        for c in s:
            if c == "(":
                count += 1
            else:
                count -= 1
            if count < 0:
                return False
        return count == 0

    result = solution.generateParenthesis(3)
    assert all(is_valid(s) for s in result), "All results should be valid"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 022. Generate Parentheses")
    for n in [1, 2, 3]:
        result = solution.generateParenthesis(n)
        print(f"n={n}: {result}")
