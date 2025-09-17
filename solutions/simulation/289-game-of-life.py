"""
289. Game of Life
Medium

According to Wikipedia's article: "The Game of Life, also known simply as Life,
is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an m x n grid of cells, where each cell has an initial
state: live (represented by a 1) or dead (represented by a 0). Each cell interacts
with its eight neighbors (horizontal, vertical, diagonal) using the following four rules:

1. Any live cell with fewer than two live neighbors dies as if caused by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by over-population.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The next state is created by applying the above rules simultaneously to every cell
in the current state, where births and deaths occur simultaneously.

Example:
Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
"""

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

        def count_live_neighbors(r, c):
            count = 0
            directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1),
                         (0, 1), (1, -1), (1, 0), (1, 1)]

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
        live = set()
        m, n = len(board), len(board[0])

        # Store all live cells
        for i in range(m):
            for j in range(n):
                if board[i][j] == 1:
                    live.add((i, j))

        def get_neighbors(cell):
            r, c = cell
            neighbors = []
            for dr in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    if dr == 0 and dc == 0:
                        continue
                    neighbors.append((r + dr, c + dc))
            return neighbors

        # Count neighbors for all cells that could change
        neighbor_counts = {}
        for cell in live:
            for neighbor in get_neighbors(cell):
                neighbor_counts[neighbor] = neighbor_counts.get(neighbor, 0) + 1

        # Apply rules
        new_live = set()
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
Medium

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
                if board[i][j] == 'X':
                    # Check if it's the head of a battleship
                    # (no X above or to the left)
                    if (i == 0 or board[i-1][j] == '.') and \
                       (j == 0 or board[i][j-1] == '.'):
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

        def dfs(i, j):
            if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != 'X':
                return

            board[i][j] = '.'  # Mark as visited
            dfs(i + 1, j)
            dfs(i - 1, j)
            dfs(i, j + 1)
            dfs(i, j - 1)

        count = 0
        for i in range(m):
            for j in range(n):
                if board[i][j] == 'X':
                    count += 1
                    dfs(i, j)

        return count


# Test cases
if __name__ == "__main__":
    # Test Game of Life
    solution = Solution()

    print("Game of Life:")
    test_boards = [
        [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]],
        [[1, 1], [1, 0]]
    ]

    for board in test_boards:
        import copy
        original = copy.deepcopy(board)
        solution.gameOfLife(board)

        print("Original board:")
        for row in original:
            print(row)
        print("\nNext generation:")
        for row in board:
            print(row)
        print("\n" + "="*30 + "\n")

    # Test Battleships
    solution_ships = SolutionBattleships()

    print("Battleships in a Board:")
    ship_boards = [
        [["X", ".", ".", "X"], [".", ".", ".", "X"], [".", ".", ".", "X"]],
        [["X", ".", ".", "X"], [".", ".", ".", "X"], ["X", ".", ".", "X"]]
    ]

    for board in ship_boards:
        # Use copy for DFS method as it modifies the board
        count = solution_ships.countBattleships([row[:] for row in board])
        print("Board:")
        for row in board:
            print(row)
        print(f"Number of battleships: {count}\n")
