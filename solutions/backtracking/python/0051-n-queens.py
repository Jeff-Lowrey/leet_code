"""
# Difficulty: Hard

# 0051. N Queens

The n-queens puzzle is the problem of placing n queens on an n×n chessboard
such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.
You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement,
where 'Q' and '.' both indicate a queen and an empty space, respectively.

Example 1:
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]

Example 2:
Input: n = 1
Output: [["Q"]]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 4</dd>
<dt>Output:</dt>
<dd>[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]</dd>
<dt>Explanation:</dt>
<dd>For n=4, one valid queen placement is [(0,1),(1,3),(2,0),(3,2)]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Set, Array, String
**Patterns**: Hash Table Pattern, Backtracking
**Time Complexity**: O(N!)
**Space Complexity**: O(N)

### INTUITION:
Place queens one row at a time and backtrack when conflicts arise. Queens attack horizontally, vertically, and diagonally, so we need to ensure no two queens can attack each other.

### APPROACH:
1. **Row by row placement**: Place one queen per row to avoid horizontal conflicts
2. **Column tracking**: Track which columns are occupied to avoid vertical conflicts
3. **Diagonal tracking**: Track both diagonal directions to avoid diagonal conflicts
4. **Backtrack**: When placement impossible, backtrack and try next position
5. **Build solution**: When all queens placed successfully, add board to results

### WHY THIS WORKS:
- Placing one queen per row eliminates horizontal conflicts automatically
- Column and diagonal tracking prevents vertical and diagonal conflicts
- Backtracking explores all valid placements systematically
- Early pruning prevents exploring invalid partial solutions

### EXAMPLE WALKTHROUGH:
Input:
```
n = 4
```

### TIME COMPLEXITY:
O(N!)
- In worst case, we try every possible placement
- First queen has N choices, second has (N-1), etc.
- But pruning significantly reduces actual combinations

### SPACE COMPLEXITY:
O(N)
- Recursion depth is N (one call per row)
- Additional space for tracking columns and diagonals
- Board representation space

### EDGE CASES:
- **n = 1**: Single queen at (0,0), return [["Q"]]
- **n = 2 or n = 3**: No solutions exist, return empty list
- **n = 4**: Two distinct solutions exist
- **Large n values**: Backtracking with pruning handles efficiently
- **All positions conflict**: Backtracking exhausts all possibilities, returns empty

</details>
"""

from typing import Any


class Solution:
    def solveNQueens(self, n: int) -> list[list[str]]:
        """
        Solve N-Queens problem using backtracking with optimized conflict detection.

        Args:
            n: Size of the chessboard (n x n)

        Returns:
            List of all distinct solutions, where each solution is a list of strings
            representing the board configuration

        Time Complexity: O(N!) - trying all possible queen placements with pruning
        Space Complexity: O(N) - recursion depth + conflict tracking sets
        """

        def solve() -> Any:
            # Base case: all queens placed successfully
            if len(queens) == n:
                board: list[Any] = []
                for row in range(n):
                    board_row = ["."] * n
                    board_row[queens[row]] = "Q"
                    board.append("".join(board_row))
                solutions.append(board)
                return

            row = len(queens)
            for col in range(n):
                # Check for conflicts using O(1) set lookups
                if col in cols or (row - col) in diag1 or (row + col) in diag2:
                    continue

                # Place queen and update conflict tracking
                queens.append(col)
                cols.add(col)
                diag1.add(row - col)
                diag2.add(row + col)

                # Recursively solve for next row
                solve()

                # Backtrack: remove queen and conflict markers
                queens.pop()
                cols.remove(col)
                diag1.remove(row - col)
                diag2.remove(row + col)

        solutions: list[Any] = []
        queens: list[int] = []  # queens[i] = column position of queen in row i
        cols: set[Any] = set()
        diag1: set[Any] = set()
        diag2: set[Any] = set()

        solve()
        return solutions

    def solveNQueensCount(self, n: int) -> int:
        """
        Count the number of distinct solutions to N-Queens (for problem 52).

        Returns:
            Number of distinct solutions
        """

        def solve() -> Any:
            if len(queens) == n:
                return 1

            count = 0
            row = len(queens)
            for col in range(n):
                if col in cols or (row - col) in diag1 or (row + col) in diag2:
                    continue

                queens.append(col)
                cols.add(col)
                diag1.add(row - col)
                diag2.add(row + col)

                count += solve()

                queens.pop()
                cols.remove(col)
                diag1.remove(row - col)
                diag2.remove(row + col)

            return count

        queens: list[Any] = []
        cols: set[int] = set()
        diag1: set[int] = set()
        diag2: set[int] = set()

        return solve()


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: N = 4 (should return 2 solutions)
    result = solution.solveNQueens(4)
    assert len(result) == 2, f"Expected 2 solutions, got {len(result)}"
    assert [".Q..", "...Q", "Q...", "..Q."] in result or ["..Q.", "Q...", "...Q", ".Q.."] in result

    # Test case 2: N = 1 (single queen)
    result = solution.solveNQueens(1)
    expected = [["Q"]]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: N = 2 (no solution)
    result = solution.solveNQueens(2)
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Count solutions for N = 4
    result = solution.solveNQueensCount(4)
    expected = 2
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 051. N Queens")
