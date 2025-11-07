"""
### INTUITION:
The key insight is that for each operator in the expression, we can split the expression at that operator and recursively compute all possible results for the left and right sub-expressions. Then we combine these results using the current operator. This generates all possible ways to parenthesize the expression.

### APPROACH:
1. We use divide and conquer with recursion.
2. For the given expression, we iterate through each character.
3. When we find an operator (+, -, *), we recursively compute all possible results for the left substring and all possible results for the right substring.
4. For each pair of left and right results, we apply the current operator to generate a new result.
5. We collect all such results in a list.
6. The base case is when the expression contains no operators, in which case we return a list containing just the number itself.
7. We can optimize this with memoization by caching results for each unique sub-expression to avoid recomputing the same sub-problems.

### WHY THIS WORKS:
- Every valid parenthesization corresponds to choosing some operator as the last operation
- Recursively solving left and right gives all possible values for each side
- Combining all pairs with the operator generates all possible results for this split
- Trying all operators as the last operation covers all possible parenthesizations

### EXAMPLE WALKTHROUGH:
Input:
```
expression = "2-1-1"
```

**Step 1:** Try first '-' as last op: left="2", right="1-1"

**Step 2:** Recursively solve: left=[2], right=[0, 2]

**Step 3:** Combine: 2-0=2, 2-2=0 → [2, 0]

**Step 4:** Try second '-' as last op: left="2-1", right="1"

**Step 5:** Recursively solve: left=[1], right=[1]

**Step 6:** Combine: 1-1=0 → [0]

**Step 7:** Collect all results: [2, 0, 0] → unique: [0, 2]

Output:
```
[0, 2]
```

### TIME COMPLEXITY:
**O(4^n / n^(3/2))** - The number of ways to parenthesize n operators grows as the nth Catalan number, which is approximately 4^n / n^(3/2). We compute each unique sub-expression once with memoization.

### SPACE COMPLEXITY:
**O(4^n / n^(3/2))** - We store all possible results for each sub-expression, plus the recursion call stack depth of **O(n)**.

### EDGE CASES:
- **Single number:** "10" → [10]
- **Single operator:** "2+3" → [5]
- **All same operator:** "1+1+1" → [3] (associative, only one unique result)
- **Mixed operators:** Creates multiple different results due to different groupings
- **Negative numbers in result:** Handled correctly by operator application

"""

from typing import List


class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        """
        Approach: Divide and conquer with memoization
        Time Complexity: O(4^n / n^(3/2))
        Space Complexity: O(4^n / n^(3/2))

        Args:
            expression: String containing numbers and operators

        Returns:
            List of all possible computation results
        """
        # Memoization cache
        memo = {}

        def compute(expr: str) -> List[int]:
            # Check cache
            if expr in memo:
                return memo[expr]

            results = []

            # Try each operator as the last operation
            for i, char in enumerate(expr):
                if char in "+-*":
                    # Split at this operator
                    left = expr[:i]
                    right = expr[i + 1 :]

                    # Recursively compute all possible results for left and right
                    left_results = compute(left)
                    right_results = compute(right)

                    # Combine all pairs with current operator
                    for left_val in left_results:
                        for right_val in right_results:
                            if char == "+":
                                results.append(left_val + right_val)
                            elif char == "-":
                                results.append(left_val - right_val)
                            elif char == "*":
                                results.append(left_val * right_val)

            # Base case: no operators, expression is just a number
            if not results:
                results.append(int(expr))

            # Cache and return
            memo[expr] = results
            return results

        return compute(expression)


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1: Example from problem
    expr1 = "2-1-1"
    expected1 = [0, 2]
    result1 = sorted(solution.diffWaysToCompute(expr1))
    print(f'Input: "{expr1}"')
    print(f"Output: {result1}")
    print(f"Expected: {sorted(expected1)}")
    print(f"Pass: {result1 == sorted(expected1)}")
    print()

    # Test case 2: Multiple operators
    expr2 = "2*3-4*5"
    expected2 = [-34, -14, -10, -10, 10]
    result2 = sorted(solution.diffWaysToCompute(expr2))
    print(f'Input: "{expr2}"')
    print(f"Output: {result2}")
    print(f"Expected: {sorted(expected2)}")
    print(f"Pass: {result2 == sorted(expected2)}")
    print()

    # Test case 3: Single number
    expr3 = "10"
    expected3 = [10]
    result3 = solution.diffWaysToCompute(expr3)
    print(f'Input: "{expr3}"')
    print(f"Output: {result3}")
    print(f"Expected: {expected3}")
    print(f"Pass: {result3 == expected3}")
    print()

    # Test case 4: Simple operation
    expr4 = "2+3"
    expected4 = [5]
    result4 = solution.diffWaysToCompute(expr4)
    print(f'Input: "{expr4}"')
    print(f"Output: {result4}")
    print(f"Expected: {expected4}")
    print(f"Pass: {result4 == expected4}")
    print()
