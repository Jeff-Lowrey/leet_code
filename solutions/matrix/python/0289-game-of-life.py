"""
# 0289. Game Of Life

# Difficulty: Medium

According to Wikipedia's article: "The Game of Life, also known simply as Life,
is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an m x `n` `grid` of cells, where each cell has an initial
state: live (represented by a 1) or dead (represented by a 0). Each cell interacts
with its eight neighbors (horizontal, vertical, diagonal) using the following four rules:

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors lives on to the next generation
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)

The next state is created by applying the above rules simultaneously to every cell
in the current state, where births and deaths occur simultaneously.

**Example:**
    
<dl class="example-details">
<dt>Input:</dt>
<dd>board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]</dd>
<dt>Output:</dt>
<dd>[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]</dd>
<dt>Explanation:</dt>
<dd>After one step of Game of Life, the board state updates based on neighbor counts</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Graph Pattern
**Time Complexity**: O(m × n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The challenge is applying rules simultaneously to all cells. Use state encoding to track both current and next states in-place, avoiding extra space while ensuring all decisions are based on the original state.

### APPROACH:
1. **State Encoding**: Use 4 states instead of 2
   - 0: dead → dead
   - 1: live → live
   - 2: live → dead (dying)
   - 3: dead → live (born)
2. **Two Passes**: First pass marks transitions, second pass finalizes states
3. **Neighbor Counting**: Count neighbors considering only original states (0,1 and 2 were originally live)

### WHY THIS WORKS:
The encoding preserves original state information while tracking transitions. During neighbor counting, we can distinguish original live cells (1 or 2) from original dead cells (0 or 3), ensuring correct rule application.

### EXAMPLE WALKTHROUGH:
Input:
```
[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
```

Steps (showing 4 generations with rule application):

Step 1: Initial → Generation 1
  Applying rules to each cell (showing all 8 neighbors):
  - [0,1]=1 has neighbors [0,0]=0, [0,2]=0, [1,0]=0, [1,1]=0, [1,2]=1 → 1 live → dies (underpopulation)
  - [1,2]=1 has neighbors [0,1]=1, [0,2]=0, [1,1]=0, [2,1]=1, [2,2]=1 → 3 live → survives (2-3 neighbors)
  - [2,0]=1 has neighbors [1,0]=0, [1,1]=0, [2,1]=1, [3,0]=0, [3,1]=0 → 1 live → dies (underpopulation)
  - [2,1]=1 has neighbors [1,0]=0, [1,1]=0, [1,2]=1, [2,0]=1, [2,2]=1, [3,0]=0, [3,1]=0, [3,2]=0 → 3 live → survives (2-3 neighbors)
  - [2,2]=1 has neighbors [1,1]=0, [1,2]=1, [2,1]=1, [3,1]=0, [3,2]=0 → 2 live → survives (2-3 neighbors)
  - [1,0]=0 has neighbors [0,0]=0, [0,1]=1, [1,1]=0, [2,0]=1, [2,1]=1 → 3 live → becomes alive (reproduction)
  - [1,1]=0 has neighbors [0,0]=0, [0,1]=1, [0,2]=0, [1,0]=0, [1,2]=1, [2,0]=1, [2,1]=1, [2,2]=1 → 5 live → stays dead (not exactly 3)
  - [3,1]=0 has neighbors [2,0]=1, [2,1]=1, [2,2]=1, [3,0]=0, [3,2]=0 → 3 live → becomes alive (reproduction)
  Result: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]

Step 2: Generation 1 → Generation 2
  Pattern stabilizing, fewer changes
  Result: [[0,0,0],[0,0,1],[0,1,1],[0,1,0]]

Step 3: Generation 2 → Generation 3
  Pattern reached stable state (no changes)
  Result: [[0,0,0],[0,0,1],[0,1,1],[0,1,0]]

Step 4: Generation 3 → Generation 4
  Pattern remains stable
  Result: [[0,0,0],[0,0,1],[0,1,1],[0,1,0]]

Output (after 4 generations):
```
[[0,0,0],[0,0,1],[0,1,1],[0,1,0]]
```

### TIME COMPLEXITY:
O(m × n)

- Based on input size and operations


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- **All dead cells**: Remain dead if no neighbors
- **All live cells**: Most die from overcrowding
- **Single live cell**: Dies (insufficient neighbors)
- **Stable patterns**: Some configurations don't change
- **In-place update**: Use encoding to track current and next state

</details>
"""

import copy
from typing import Any


class Solution:
    def gameOfLife(self, board: list[list[int]]) -> None:
        """
        Approach: In-place with state encoding
        Time Complexity: O(m * n)
        Space Complexity: O(1)

        State encoding:
        0: dead -> dead
        1: live -> live
        2: live -> dead
        3: dead -> live
        """
        if not board or not board[0]:
            return

        m, n = len(board), len(board[0])

        def count_live_neighbors(r: Any, c: Any) -> Any:
            count = 0
            directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    # Check if neighbor was originally alive
                    if board[nr][nc] in [1, 2]:
                        count += 1

            return count

        # First pass: mark the state changes
        for i in range(m):
            for j in range(n):
                live_neighbors = count_live_neighbors(i, j)

                if board[i][j] == 1:  # Currently alive
                    if live_neighbors < 2 or live_neighbors > 3:
                        board[i][j] = 2  # Mark as live -> dead
                else:  # Currently dead
                    if live_neighbors == 3:
                        board[i][j] = 3  # Mark as dead -> live

        # Second pass: update to final state
        for i in range(m):
            for j in range(n):
                if board[i][j] == 2:
                    board[i][j] = 0
                elif board[i][j] == 3:
                    board[i][j] = 1

    def gameOfLifeInfinite(self, board: list[list[int]]) -> list[list[int]]:
        """
        Approach for infinite board: Use set to store live cells
        Time Complexity: O(live_cells)
        Space Complexity: O(live_cells)
        """
        live: set[Any] = set()
        m, n = len(board), len(board[0])

        # Store all live cells
        for i in range(m):
            for j in range(n):
                if board[i][j] == 1:
                    live.add((i, j))

        def get_neighbors(cell: Any) -> Any:
            r, c = cell
            neighbors: list[Any] = []
            for dr in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    if dr == 0 and dc == 0:
                        continue
                    neighbors.append((r + dr, c + dc))
            return neighbors

        # Count neighbors for all cells that could change
        neighbor_counts: dict[Any, Any] = {}
        for cell in live:
            for neighbor in get_neighbors(cell):
                neighbor_counts[neighbor] = neighbor_counts.get(neighbor, 0) + 1

        # Apply rules
        new_live: set[Any] = set()
        for cell, count in neighbor_counts.items():
            if count == 3 or (count == 2 and cell in live):
                new_live.add(cell)

        # Update board
        result = [[0] * n for _ in range(m)]
        for r, c in new_live:
            if 0 <= r < m and 0 <= c < n:
                result[r][c] = 1

        return result


"""
54. Spiral Matrix (Already exists, adding another simulation problem)

419. Battleships in a Board
Given an m x n matrix board where each cell is a battleship 'X' or empty '.',
return the number of the battleships on board.

Battleships can only be placed horizontally or vertically on board. In other words,
they can only be made of the shape 1 x k (1 row, k columns) or k x 1 (k rows, 1 column),
where k can be of any size. At least one horizontal or vertical cell separates
between two battleships (i.e., there are no adjacent battleships).

Example:
Input: board = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]
Output: 2
"""


class SolutionBattleships:
    def countBattleships(self, board: list[list[str]]) -> int:
        """
        Approach: Count only battleship heads
        Time Complexity: O(m * n)
        Space Complexity: O(1)
        """
        if not board or not board[0]:
            return 0

        m, n = len(board), len(board[0])
        count = 0

        for i in range(m):
            for j in range(n):
                if board[i][j] == "X":
                    # Check if it's the head of a battleship
                    # (no X above or to the left)
                    if (i == 0 or board[i - 1][j] == ".") and (j == 0 or board[i][j - 1] == "."):
                        count += 1

        return count

    def countBattleshipsDFS(self, board: list[list[str]]) -> int:
        """
        Approach: DFS to mark visited battleships
        Time Complexity: O(m * n)
        Space Complexity: O(m * n) for recursion
        """
        if not board or not board[0]:
            return 0

        m, n = len(board), len(board[0])

        def dfs(i: Any, j: Any) -> Any:
            if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != "X":
                return

            board[i][j] = "."  # Mark as visited
            dfs(i + 1, j)
            dfs(i - 1, j)
            dfs(i, j + 1)
            dfs(i, j - 1)

        count = 0
        for i in range(m):
            for j in range(n):
                if board[i][j] == "X":
                    count += 1
                    dfs(i, j)

        return count


# Test cases
if __name__ == "__main__":
    # Test Game of Life
    solution = Solution()

    print("Game of Life:")
    test_boards = [[[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]], [[1, 1], [1, 0]]]

    for board in test_boards:
        original = copy.deepcopy(board)
        solution.gameOfLife(board)

        print("Original board:")
        for row in original:
            print(row)
        print("\nNext generation:")
        for row in board:
            print(row)
        print("\n" + "=" * 30 + "\n")

    # Test Battleships
    solution_ships = SolutionBattleships()

    print("Battleships in a Board:")
    ship_boards = [
        [["X", ".", ".", "X"], [".", ".", ".", "X"], [".", ".", ".", "X"]],
        [["X", ".", ".", "X"], [".", ".", ".", "X"], ["X", ".", ".", "X"]],
    ]

    for board in ship_boards:
        # Use copy for DFS method as it modifies the board
        count = solution_ships.countBattleships([ship_row[:] for ship_row in board])
        print("Board:")
        for ship_row in board:
            print(ship_row)
        print(f"Number of battleships: {count}\n")
