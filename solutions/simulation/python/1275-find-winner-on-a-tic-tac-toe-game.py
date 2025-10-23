"""
# 1275. Find Winner On A Tic Tac Toe Game

LeetCode Problem 1275: Find Winner on a Tic Tac Toe Game
Difficulty: Easy
Category: Simulation

Problem Description:
Tic-tac-toe is played by two players A and B on a 3 x 3 grid. The rules are:
- Players take turns placing characters into empty squares ' '.
- The first player A always places 'X' characters, while the second player B places 'O'.
- 'X' and 'O' characters are always placed into empty squares, never on filled ones.
- The game ends when there are three of the same (non-empty) character filling any row, column, or diagonal.
- The game also ends if all squares are non-empty.
- No more moves can be played if the game is over.

Given a 2D integer array moves where moves[i] = [rowi, coli] indicates that the ith move will be
played on grid[rowi][coli]. Return the winner of the game if it exists (A or B). In case the game
ends in a draw return "Draw". If there are still movements to play return "Pending".

Example 1:
Input: moves = [[0,0],[2,0],[1,1],[2,1],[2,2]]
Output: "A"

Example 2:
Input: moves = [[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]]
Output: "B"

Example 3:
Input: moves = [[0,0],[1,1],[2,0],[1,0],[1,2],[2,1],[0,1],[0,2],[2,2]]
Output: "Draw"

Constraints:
- 1 <= moves.length <= 9
- moves[i].length == 2
- 0 <= rowi, coli <= 2
- There are no repeated moves.

METADATA:
Techniques: Simulation, Game state checking
Data Structures: 2D array
Patterns: Win condition checking
Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


def tictactoe(moves: List[List[int]]) -> str:
    """Determine tic-tac-toe game winner."""
    board = [['' for _ in range(3)] for _ in range(3)]

    # Place moves alternating between A and B
    for i, (row, col) in enumerate(moves):
        board[row][col] = 'X' if i % 2 == 0 else 'O'

    # Check winner
    def check_winner(player: str) -> bool:
        """Check if player has won."""
        # Check rows
        for row in board:
            if all(cell == player for cell in row):
                return True
        # Check columns
        for col in range(3):
            if all(board[row][col] == player for row in range(3)):
                return True
        # Check diagonals
        if all(board[i][i] == player for i in range(3)):
            return True
        if all(board[i][2 - i] == player for i in range(3)):
            return True
        return False

    if check_winner('X'):
        return "A"
    if check_winner('O'):
        return "B"
    if len(moves) == 9:
        return "Draw"
    return "Pending"


if __name__ == "__main__":
    test_cases = [
        ([[0, 0], [2, 0], [1, 1], [2, 1], [2, 2]], "A"),
        ([[0, 0], [1, 1], [0, 1], [0, 2], [1, 0], [2, 0]], "B"),
        ([[0, 0], [1, 1], [2, 0], [1, 0], [1, 2], [2, 1], [0, 1], [0, 2], [2, 2]], "Draw"),
        ([[0, 0], [1, 1]], "Pending"),
    ]

    print("Testing tictactoe:")
    for moves, expected in test_cases:
        result = tictactoe(moves)
        status = "✓" if result == expected else "✗"
        print(f"{status} tictactoe({moves}) = {result}, expected = {expected}")
