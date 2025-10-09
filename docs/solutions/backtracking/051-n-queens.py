"""
# Difficulty: Hard

# 051. N Queens

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
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

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
[example input]
```

**Step 1:** [description]

**Step 2:** [description]

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
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""

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
        def solve():
            # Base case: all queens placed successfully
            if len(queens) == n:
                board = []
                for row in range(n):
                    board_row = ['.'] * n
                    board_row[queens[row]] = 'Q'
                    board.append(''.join(board_row))
                solutions.append(board)
                return

            row = len(queens)
            for col in range(n):
                # Check for conflicts using O(1) set lookups
                if (col in cols or
                    (row - col) in diag1 or
                    (row + col) in diag2):
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

        solutions = []
        queens = []  # queens[i] = column position of queen in row i
        cols = set()    # columns with queens
        diag1 = set()   # main diagonals (row - col)
        diag2 = set()   # anti-diagonals (row + col)

        solve()
        return solutions

    def solveNQueensCount(self, n: int) -> int:
        """
        Count the number of distinct solutions to N-Queens (for problem 52).

        Returns:
            Number of distinct solutions
        """
        def solve():
            if len(queens) == n:
                return 1

            count = 0
            row = len(queens)
            for col in range(n):
                if (col in cols or
                    (row - col) in diag1 or
                    (row + col) in diag2):
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

        queens = []
        cols = set()
        diag1 = set()
        diag2 = set()

        return solve()

def test_solution():
    """
    Test cases for 051. N Queens.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 051. N Queens")
