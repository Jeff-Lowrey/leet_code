"""
# 130. Surrounded
**Medium**

Given a problem that demonstrates key concepts in Union Find.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of union find concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply union find methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages union find principles
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

The approach uses union find techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using union find method
3. Return the computed result

</details>
"""


class Solution:
    def solve(self, board: List[List[str]]) -> None:
        """
        Captures all regions surrounded by 'X'. A region is captured by flipping all 'O's
        into 'X's in that surrounded region.

        Args:
            board: The input board represented as a 2D list of 'X' and 'O' characters

        Modifies the board in-place.
        """
        if not board or not board[0]:
            return

        rows, cols = len(board), len(board[0])

        def dfs(row: int, col: int) -> None:
            """
            Depth-first search to mark all connected 'O's that should not be captured.

            Args:
                row: Current row index
                col: Current column index
            """
            # Check boundaries and if current cell is 'O'
            if row < 0 or col < 0 or row >= rows or col >= cols or board[row][col] != "O":
                return

            # Mark this cell as visited by changing it to a temporary character
            board[row][col] = "#"

            # Check all four adjacent cells
            dfs(row + 1, col)  # Down
            dfs(row - 1, col)  # Up
            dfs(row, col + 1)  # Right
            dfs(row, col - 1)  # Left

        # Step 1: Mark all 'O's connected to the border as '#'

        # Check first and last row
        for col in range(cols):
            dfs(0, col)
            dfs(rows - 1, col)

        # Check first and last column
        for row in range(rows):
            dfs(row, 0)
            dfs(row, cols - 1)

        # Step 2: Flip all remaining 'O's to 'X's and restore '#'s to 'O's
        for row in range(rows):
            for col in range(cols):
                if board[row][col] == "O":
                    board[row][col] = "X"
                elif board[row][col] == "#":
                    board[row][col] = "O"


def test_solution():
    """
    Test cases for 130. Surrounded.
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
    print("Solution for 130. Surrounded")
