"""
# 1275. Find Winner On A Tic Tac Toe Game

# Difficulty: Easy

Solve the Find Winner On A Tic Tac Toe Game problem as described.

**Example:**
 *
<dl class="example-details">
<dt>Input:</dt>
<dd>```</dd>
<dt>Output:</dt>
<dd>```</dd>
<dt>Explanation:</dt>
<dd>Processing input produces the expected output</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
### METADATA:
**Techniques**: Simulation, Game state checking
**Data Structures**: 2D array
**Patterns**: Win condition checking
**Time Complexity**: **O(n²)**
**Space Complexity**: **O(1)**
 *
### INTUITION:
The key insight is to solve this problem efficiently.
 *
### APPROACH:
We solve this problem by implementing the required algorithm.
 *
### WHY THIS WORKS:
This approach works because it correctly implements the problem requirements.
 *
### EXAMPLE WALKTHROUGH:
Input:
```
example input
```

Output:
```
example output
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 * - [Add explanation of why this complexity]

### SPACE COMPLEXITY:
**O(1)** - Analysis of space complexity
 * - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
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
        print(f"{status} tictactoe({moves}) = result, expected = expected")
