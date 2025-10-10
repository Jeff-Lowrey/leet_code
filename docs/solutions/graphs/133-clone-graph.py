"""
# Difficulty: Medium

Given a reference of a node in a connected undirected graph, return a deep copy
(clone) of the graph.

Each `node` in the graph contains a value (int) and a list (List[Node]) of its neighbors.

Example:
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]

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
To clone a graph, we need to create new nodes and preserve the neighbor relationships.
The key challenge is handling `cycles - we` need to avoid infinite loops.

### APPROACH:
[Detailed explanation of the solution approach]

### WHY THIS WORKS:
- [Explanation of correctness]

### EXAMPLE WALKTHROUGH:
Input:
```
[example input]
```

**Step 1:** [description]

**Step 2:** [description]

### TIME COMPLEXITY:
O(V + E) - visit each node and edge once

### SPACE COMPLEXITY:
O(V) - hash map and recursion stack

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        """
        Approach: DFS with hash map
        Time Complexity: O(V + E)
        Space Complexity: O(V)
        """
        if not node:
            return None

        visited = {}

        def dfs(node):
            if node in visited:
                return visited[node]

            # Create clone
            clone = Node(node.val)
            visited[node] = clone

            # Clone neighbors
            for neighbor in node.neighbors:
                clone.neighbors.append(dfs(neighbor))

            return clone

        return dfs(node)

    def cloneGraphBFS(self, node: 'Node') -> 'Node':
        """
        Approach: BFS with hash map
        Time Complexity: O(V + E)
        Space Complexity: O(V)
        """
        if not node:
            return None

        visited = {node: Node(node.val)}
        queue = deque([node])

        while queue:
            current = queue.popleft()

            for neighbor in current.neighbors:
                if neighbor not in visited:
                    visited[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)

                visited[current].neighbors.append(visited[neighbor])

        return visited[node]

"""
417. Pacific Atlantic Water Flow
# Difficulty: Medium
There is an m x n rectangular island that borders both the Pacific Ocean and
Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and
the Atlantic Ocean touches the island's right and bottom edges.

You are given an m x n integer matrix heights where heights[r][c] represents
the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring
cells directly north, south, east, and west if the neighboring cell's height is
less than or equal to the current cell's height.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes
that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

Example:
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
"""

class SolutionWaterFlow:
    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:
        """
        Approach: DFS from ocean borders
        Time Complexity: O(m * n)
        Space Complexity: O(m * n)
        """
        if not heights or not heights[0]:
            return []

        m, n = len(heights), len(heights[0])
        pacific = set()
        atlantic = set()

        def dfs(r, c, visited, prev_height):
            if (r, c) in visited:
                return
            if r < 0 or r >= m or c < 0 or c >= n:
                return
            if heights[r][c] < prev_height:
                return

            visited.add((r, c))

            # Visit all 4 directions
            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                dfs(r + dr, c + dc, visited, heights[r][c])

        # Start from Pacific edges (top and left)
        for c in range(n):
            dfs(0, c, pacific, heights[0][c])
        for r in range(m):
            dfs(r, 0, pacific, heights[r][0])

        # Start from Atlantic edges (bottom and right)
        for c in range(n):
            dfs(m - 1, c, atlantic, heights[m - 1][c])
        for r in range(m):
            dfs(r, n - 1, atlantic, heights[r][n - 1])

        # Find intersection
        return [[r, c] for r, c in pacific & atlantic]

"""
79. Word Search
# Difficulty: Medium
Given an m x n grid of characters board and a string word, return true if word
exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where
adjacent cells are horizontally or vertically neighboring. The same letter cell
may not be used more than once.

Example:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
"""

class SolutionWordSearch:
    def exist(self, board: list[list[str]], word: str) -> bool:
        """
        Approach: DFS with backtracking
        Time Complexity: O(m * n * 4^L) where L is word length
        Space Complexity: O(L) for recursion
        """
        if not board or not board[0]:
            return False

        m, n = len(board), len(board[0])

        def dfs(r, c, index):
            if index == len(word):
                return True

            if (r < 0 or r >= m or c < 0 or c >= n or
                board[r][c] != word[index]):
                return False

            # Mark as visited
            temp = board[r][c]
            board[r][c] = '#'

            # Explore all 4 directions
            found = (dfs(r + 1, c, index + 1) or
                    dfs(r - 1, c, index + 1) or
                    dfs(r, c + 1, index + 1) or
                    dfs(r, c - 1, index + 1))

            # Restore
            board[r][c] = temp

            return found

        for r in range(m):
            for c in range(n):
                if board[r][c] == word[0]:
                    if dfs(r, c, 0):
                        return True

        return False

"""
323. Number of Connected Components in an Undirected Graph
# Difficulty: Medium
You have a graph of n nodes. You are given an integer n and an array edges where
edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.

Example:
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
"""

class SolutionComponents:
    def countComponents(self, n: int, edges: list[list[int]]) -> int:
        """
        Approach: Union Find
        Time Complexity: O(E * α(n))
        Space Complexity: O(n)
        """
        parent = list(range(n))
        rank = [0] * n

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x, y):
            px, py = find(x), find(y)
            if px == py:
                return False

            if rank[px] < rank[py]:
                parent[px] = py
            elif rank[px] > rank[py]:
                parent[py] = px
            else:
                parent[py] = px
                rank[px] += 1

            return True

        components = n
        for u, v in edges:
            if union(u, v):
                components -= 1

        return components

    def countComponentsDFS(self, n: int, edges: list[list[int]]) -> int:
        """
        Approach: DFS
        Time Complexity: O(V + E)
        Space Complexity: O(V + E)
        """
        from collections import defaultdict

        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        visited = set()
        components = 0

        def dfs(node):
            visited.add(node)
            for neighbor in graph[node]:
                if neighbor not in visited:
                    dfs(neighbor)

        for node in range(n):
            if node not in visited:
                components += 1
                dfs(node)

        return components

# Test cases
if __name__ == "__main__":
    # Test Pacific Atlantic Water Flow
    solution_water = SolutionWaterFlow()

    print("Pacific Atlantic Water Flow:")
    heights = [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4]
    ]
    result = solution_water.pacificAtlantic(heights)
    print("Heights matrix:")
    for row in heights:
        print(row)
    print(f"Cells reaching both oceans: {result}\n")

    # Test Word Search
    solution_word = SolutionWordSearch()

    print("Word Search:")
    board = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"]
    ]
    words = ["ABCCED", "SEE", "ABCB"]

    for word in words:
        result = solution_word.exist(board, word)
        print(f"Word: '{word}' -> Found: {result}")

    print("\n" + "="*50 + "\n")

    # Test Number of Components
    solution_comp = SolutionComponents()

    print("Number of Connected Components:")
    test_cases = [
        (5, [[0, 1], [1, 2], [3, 4]]),
        (5, [[0, 1], [1, 2], [2, 3], [3, 4]]),
        (4, [[0, 1], [2, 3]])
    ]

    for n, edges in test_cases:
        result = solution_comp.countComponents(n, edges)
        print(f"n={n}, edges={edges}")
        print(f"Components: {result}\n")
