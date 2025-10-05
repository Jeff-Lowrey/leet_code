I'll help you create a solution for the N Queens problem that meets all the requirements. Here's the complete implementation:

```python
#!/usr/bin/env python3
"""
N Queens Problem Implementation
This solution finds all possible ways to place N queens on an NxN chessboard
such that no two queens threaten each other.
"""

from typing import List


class NQueensSolver:
    def __init__(self):
        """Initialize the N Queens solver."""
        self.solutions = []

    def solve_n_queens(self, n: int) -> List[List[str]]:
        """
        Solve the N Queens problem for a given board size.
        
        Args:
            n: The size of the board (n x n) and number of queens to place
            
        Returns:
            List of all valid board configurations
        """
        if n <= 0:
            return []
            
        self.solutions = []
        self._backtrack([], n)
        return self._format_solutions()

    def _is_safe(self, queens: List[int], row: int, col: int) -> bool:
        """
        Check if it's safe to place a queen at the given position.
        
        Args:
            queens: List of column positions for queens already placed
            row: Current row being considered
            col: Current column being considered
            
        Returns:
            Boolean indicating if the position is safe
        """
        for queen_row, queen_col in enumerate(queens):
            # Check if queens threaten each other
            if queen_col == col:  # Same column
                return False
            if queen_row - queen_col == row - col:  # Same diagonal
                return False
            if queen_row + queen_col == row + col:  # Same anti-diagonal
                return False
        return True

    def _backtrack(self, queens: List[int], n: int) -> None:
        """
        Recursively try different queen placements using backtracking.
        
        Args:
            queens: Current arrangement of queens (column positions)
            n: Board size
        """
        row = len(queens)
        if row == n:  # Found a valid solution
            self.solutions.append(queens[:])
            return

        for col in range(n):
            if self._is_safe(queens, row, col):
                queens.append(col)
                self._backtrack(queens, n)
                queens.pop()

    def _format_solutions(self) -> List[List[str]]:
        """
        Format the solutions into the required string representation.
        
        Returns:
            List of board configurations where each queen's position is marked with 'Q'
        """
        formatted_solutions = []
        for solution in self.solutions:
            board = []
            for col in solution:
                row = ['.'] * len(solution)
                row[col] = 'Q'
                board.append(''.join(row))
            formatted_solutions.append(board)
        return formatted_solutions


def main():
    """
    Main function to demonstrate the N Queens solver.
    """
    solver = NQueensSolver()
    
    # Example with n = 4
    n = 4
    solutions = solver.solve_n_queens(n)
    
    print(f"Found {len(solutions)} solutions for {n}-Queens problem:")
    for i, solution in enumerate(solutions, 1):
        print(f"\nSolution {i}:")
        for row in solution:
            print(row)


if __name__ == "__main__":
    main()
```

This implementation includes:

1. A complete `NQueensSolver` class that handles the N Queens problem
2. Proper type hints and documentation
3. Clear method organization and separation of concerns
4. Efficient backtracking algorithm
5. Input validation and edge case handling
6. A main function for demonstration
7. Comprehensive comments explaining the implementation

The solution uses a backtracking approach to find all possible arrangements of N queens on an N×N chessboard where no two queens threaten each other. The board is represented using strings where:
- '.' represents an empty square
- 'Q' represents a queen's position

The code handles the following aspects:
- Checks for valid queen placements (horizontal, vertical, and diagonal conflicts)
- Generates all possible solutions
- Formats the output as required
- Includes error handling for invalid inputs

You can run this file directly to see a demonstration with a 4×4 board, or import the `NQueensSolver` class to use it with any board size.