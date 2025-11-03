"""
### INTUITION:
We need to calculate scores based on nesting depth and adjacency. Key insights:
- "()" = 1 point
- Adjacent groups add their scores: "()()" = 1 + 1 = 2
- Nested groups multiply by 2: "(())" = 2 * 1 = 2
- Deep nesting: "((()))" = 2 * 2 * 1 = 4

### APPROACH:
1. **Stack method**: Use stack to track scores at each nesting level
2. **Depth method**: Track current depth and count "()" pairs
3. **Each '(' opens new level**: Push 0 to stack for new score tracking
4. **Each ')' closes level**: Pop and either add 1 (for "()") or multiply by 2

### WHY THIS WORKS:
- This ensures that stack naturally handles nesting levels
- This ensures that when we see "()", we add 1 to current level
- This ensures that when we close a level, we either get 1 (empty) or double the inner score
- This ensures that adjacent groups at same level add together

### EXAMPLE WALKTHROUGH:
Input:
```
"(()(()))"
```

Stack: [0]
'(': stack = [0, 0]
'(': stack = [0, 0, 0]
')': empty level, stack = [0, 1]
'(': stack = [0, 1, 0]
'(': stack = [0, 1, 0, 0]
')': empty level, stack = [0, 1, 1]
')': inner=1, stack = [0, 1+2*1] = [0, 3]
')': inner=3, stack = [0+2*3] = [6]

Output:
```
6
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n)**
Single pass through the string

### SPACE COMPLEXITY:
**O(n)**
Stack can grow to depth of nesting

### EDGE CASES:
- **Empty string**: Return 0 (no score)
- **Single pair ()**: Return 1 (base case)
- **Nested pairs ((()))**: Doubling rule applies recursively
- **Concatenated pairs ()()**: Addition rule applies
- **Deep nesting**: Stack depth tracks nesting level

"""

from typing import Any


class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        """
        Calculate score using stack to track nesting levels.

        Args:
            s: Balanced parentheses string

        Returns:
            Score based on nesting and adjacency rules

        Time Complexity: O(n)
        Space Complexity: O(n) for stack
        """
        stack = [0]  # Initialize with 0 for base level

        for char in s:
            if char == "(":
                # Start new nesting level
                stack.append(0)
            else:  # char == ')'
                # Close current level
                inner_score = stack.pop()
                if inner_score == 0:
                    # This was an empty pair "()", worth 1 point
                    stack[-1] += 1
                else:
                    # This had nested content, double it
                    stack[-1] += 2 * inner_score

        return stack[0]

    def scoreOfParenthesesDepth(self, s: str) -> int:
        """
        Alternative solution using depth counting.

        Args:
            s: Balanced parentheses string

        Returns:
            Score based on depth calculation

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        score = 0
        depth = 0

        for i, char in enumerate(s):
            if char == "(":
                depth += 1
            else:  # char == ')'
                depth -= 1
                # If this closes a "()" pair, add 2^depth points
                if s[i - 1] == "(":
                    score += 1 << depth  # Same as 2^depth

        return score

    def scoreOfParenthesesRecursive(self, s: str) -> int:
        """
        Recursive solution parsing the string.

        Args:
            s: Balanced parentheses string

        Returns:
            Score calculated recursively
        """

        def parse(index: Any) -> Any:
            score = 0
            while index < len(s):
                if s[index] == "(":
                    if s[index + 1] == ")":
                        # Found "()", add 1 and skip both chars
                        score += 1
                        index += 2
                    else:
                        # Found nested structure, parse recursively
                        inner_score, next_index = parse(index + 1)
                        score += 2 * inner_score
                        index = next_index + 1  # Skip the closing ')'
                else:  # s[index] == ')'
                    # Return to previous level
                    return score, index
            return score, index

        return parse(0)[0]


def test_solution() -> None:
    """Test cases for Problem 856."""
    solution = Solution()

    # Test case 1: Simple pair
    result1 = solution.scoreOfParentheses("()")
    expected1 = 1
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Adjacent pairs
    result2 = solution.scoreOfParentheses("()()")
    expected2 = 2
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Nested pair
    result3 = solution.scoreOfParentheses("(())")
    expected3 = 2
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Complex nesting
    result4 = solution.scoreOfParentheses("(()(()))")
    expected4 = 6
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Deep nesting
    result5 = solution.scoreOfParentheses("((()))")
    expected5 = 4
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Complex structure
    result6 = solution.scoreOfParentheses("()(())()")
    expected6 = 4  # 1 + 2 + 1
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test depth method
    result7 = solution.scoreOfParenthesesDepth("(()(()))")
    expected7 = 6
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test recursive method
    result8 = solution.scoreOfParenthesesRecursive("(()(()))")
    expected8 = 6
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 856. Score Of Parentheses ===")
    print(f"scoreOfParentheses('()') -> {solution.scoreOfParentheses('()')}")
    print(f"scoreOfParentheses('()()') -> {solution.scoreOfParentheses('()()')}")
    print(f"scoreOfParentheses('(())') -> {solution.scoreOfParentheses('(())')}")
    print(f"scoreOfParentheses('(()(()))') -> {solution.scoreOfParentheses('(()(()))')}")
