"""
# Difficulty: Medium

# 0022. Generate Parentheses

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>["()"]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>All combinations of n=3 parentheses: ['((()))','(()())','(())()','()(())','()()()']</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Array, String, Stack
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(4^n / √n)
**Space Complexity**: O(n)

### INTUITION:
The key insight is that use backtracking to build valid parentheses strings. At each step, we can add '(' if we haven't used all n opening brackets, or ')' if it won't make the string invalid (closing count < opening count).

### APPROACH:
1. **Backtracking**: Build string character by character
2. **Valid Rules**:
   - Can add '(' if open_count < n
   - Can add ')' if close_count < open_count
3. **Base Case**: When string length = 2n, add to result
4. **Recursive Exploration**: Try adding '(' and ')' at each step

### WHY THIS WORKS:
- Opening bracket can be added anytime until we reach n
- Closing bracket can only be added if it doesn't exceed opening count
- These rules guarantee valid parentheses strings
- Backtracking explores all valid combinations

### EXAMPLE WALKTHROUGH:
Input:
```
["()"]
```

Input:
```
n = 3:
```

Start: ""

Steps:
Step 1: ├─ "(" → "(("  → "(((" → "((())" → "((()))"
Step 2: │                      → "(()"   → "(()())"
Step 3: │                                → "(())()"
Step 4: │      → "("   → "()"   → "()((" → "()(())"
Step 5: │                       → "()("  → "()()()"
Step 6: Result: ["((()))", "(()())", "(())()", "()(())", "()()()"]

Output:
```
["((()))", "(()())", "(())()", "()(())", "()()()"]
```

### TIME COMPLEXITY:
O(4^n / √n)
Catalan number: C(n) = (2n)! / ((n+1)! * n!)
Approximately O(4^n / √n) valid combinations

### SPACE COMPLEXITY:
O(n)
Recursion stack depth is 2n (building string of length 2n)

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

from typing import Any


class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        """
        Generate all valid combinations of n pairs of parentheses.

        Args:
            n: Number of pairs of parentheses

        Returns:
            List of all valid parentheses combinations

        Time Complexity: O(4^n / √n) - Catalan number
        Space Complexity: O(n) - recursion depth
        """
        result: list[Any] = []

        def backtrack(current: str, open_count: int, close_count: int) -> None:
            # Base case: valid string complete
            if len(current) == 2 * n:
                result.append(current)
                return

            # Add opening bracket if we haven't used all n
            if open_count < n:
                backtrack(current + "(", open_count + 1, close_count)

            # Add closing bracket if it won't exceed opening count
            if close_count < open_count:
                backtrack(current + ")", open_count, close_count + 1)

        backtrack("", 0, 0)
        return result

    def generateParenthesisIterative(self, n: int) -> list[str]:
        """
        Iterative approach using a stack (explicit backtracking).

        Args:
            n: Number of pairs of parentheses

        Returns:
            List of all valid parentheses combinations

        Time Complexity: O(4^n / √n)
        Space Complexity: O(4^n / √n) - all results
        """
        result = []
        stack = [("", 0, 0)]  # (current_string, open_count, close_count)

        while stack:
            current, open_count, close_count = stack.pop()

            # Valid string complete
            if len(current) == 2 * n:
                result.append(current)
                continue

            # Add closing bracket
            if close_count < open_count:
                stack.append((current + ")", open_count, close_count + 1))

            # Add opening bracket
            if open_count < n:
                stack.append((current + "(", open_count + 1, close_count))

        return result

    def generateParenthesisDP(self, n: int) -> list[str]:
        """
        Dynamic programming approach building from smaller solutions.

        Args:
            n: Number of pairs of parentheses

        Returns:
            List of all valid parentheses combinations

        Time Complexity: O(4^n / √n)
        Space Complexity: O(4^n / √n)
        """
        if n == 0:
            return [""]

        # dp[i] = all valid combinations with i pairs
        dp: list[list[str]] = [[] for _ in range(n + 1)]
        dp[0] = [""]

        for i in range(1, n + 1):
            for j in range(i):
                # Split i pairs into: j pairs inside first (), and (i-1-j) pairs after
                for left in dp[j]:
                    for right in dp[i - 1 - j]:
                        dp[i].append(f"({left}){right}")

        return dp[n]

    def generateParenthesisList(self, n: int) -> list[str]:
        """
        Alternative backtracking using list instead of string concatenation.
        More efficient for string building.

        Args:
            n: Number of pairs of parentheses

        Returns:
            List of all valid parentheses combinations

        Time Complexity: O(4^n / √n)
        Space Complexity: O(n)
        """
        result = []

        def backtrack(path: list[str], open_count: int, close_count: int) -> None:
            if len(path) == 2 * n:
                result.append("".join(path))
                return

            if open_count < n:
                path.append("(")
                backtrack(path, open_count + 1, close_count)
                path.pop()

            if close_count < open_count:
                path.append(")")
                backtrack(path, open_count, close_count + 1)
                path.pop()

        backtrack([], 0, 0)
        return result


def test_solution() -> None:
    """Test cases for Problem 22."""
    solution = Solution()

    # Test case 1: n = 1
    result1 = solution.generateParenthesis(1)
    expected1 = ["()"]
    assert sorted(result1) == sorted(expected1), f"Expected {expected1}, got {result1}"
    print("Test case 1 passed")

    # Test case 2: n = 2
    result2 = solution.generateParenthesis(2)
    expected2 = ["(())", "()()"]
    assert sorted(result2) == sorted(expected2), f"Expected {expected2}, got {result2}"
    print("Test case 2 passed")

    # Test case 3: n = 3
    result3 = solution.generateParenthesis(3)
    expected3 = ["((()))", "(()())", "(())()", "()(())", "()()()"]
    assert sorted(result3) == sorted(expected3), f"Expected {expected3}, got {result3}"
    print("Test case 3 passed")

    # Test case 4: n = 0
    result4 = solution.generateParenthesis(0)
    expected4 = [""]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"
    print("Test case 4 passed")

    # Test case 5: n = 4 (count only)
    result5 = solution.generateParenthesis(4)
    assert len(result5) == 14  # Catalan number C(4) = 14
    print("Test case 5 passed: n=4 has 14 combinations")

    # Test iterative approach
    result6 = solution.generateParenthesisIterative(3)
    assert sorted(result6) == sorted(expected3)
    print("Test case 6 passed: Iterative approach")

    # Test DP approach
    result7 = solution.generateParenthesisDP(3)
    assert sorted(result7) == sorted(expected3)
    print("Test case 7 passed: DP approach")

    # Test list-based approach
    result8 = solution.generateParenthesisList(3)
    assert sorted(result8) == sorted(expected3)
    print("Test case 8 passed: List-based approach")

    # Validate all strings are valid parentheses
    def is_valid(s: str) -> bool:
        count = 0
        for char in s:
            count += 1 if char == "(" else -1
            if count < 0:
                return False
        return count == 0

    for s in result3:
        assert is_valid(s), f"Invalid parentheses: {s}"
    print("Test case 9 passed: All strings are valid")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\n=== 22. Generate Parentheses ===")

    for n in range(1, 5):
        result = solution.generateParenthesis(n)
        print(f"\nn = n ({len(result)} combinations):")
        for combo in result:
            print(f"  {combo}")

    # Compare approaches
    print("\n\nComparing approaches for n=3:")
    print(f"Recursive:  {solution.generateParenthesis(3)}")
    print(f"Iterative:  {solution.generateParenthesisIterative(3)}")
    print(f"DP:         {solution.generateParenthesisDP(3)}")
    print(f"List-based: {solution.generateParenthesisList(3)}")
