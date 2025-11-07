"""
### INTUITION:
This is a classic Union-Find problem for counting connected components. Each connected component is a set of nodes that can reach each other through edges. Union-Find efficiently groups nodes into components and counts distinct groups.

### APPROACH:
1. **Initialize Union-Find**: Each node starts as its own component
2. **Process edges**: Union connected nodes, reducing component count
3. **Count components**: Count number of distinct parent nodes

### WHY THIS WORKS:
- Union-Find maintains disjoint sets (connected components)
- Each union operation merges two components into one
- Final count of root nodes = number of connected components
- Path compression and union by rank ensure efficient operations

### EXAMPLE WALKTHROUGH:
Input:
```
n = 5, edges = [[0,1],[1,2],[3,4]]
```

Steps:
Step 1: Initial: {0}, {1}, {2}, {3}, {4} → 5 components
Step 2: Union(0,1): {0,1}, {2}, {3}, {4} → 4 components
Step 3: Union(1,2): {0,1,2}, {3}, {4} → 3 components
Step 4: Union(3,4): {0,1,2}, {3,4} → 2 components
Step 5: Result: 2 connected components

Output:
```
2 connected components
```

### TIME COMPLEXITY:
**O(E × α(N)**)
Where E is edges, N is nodes, α is inverse Ackermann (nearly constant)

### SPACE COMPLEXITY:
**O(N)**
For parent and rank arrays

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from collections import deque
from typing import Any


class Solution:
    def countComponents(self, n: int, edges: list[list[int]]) -> int:
        """
        Count connected components using Union-Find.

        Args:
            n: Number of nodes (0 to n-1)
            edges: List of undirected edges [u, v]

        Returns:
            Number of connected components

        Time Complexity: O(E × α(N)) where E is edges, N is nodes
        Space Complexity: O(N) for Union-Find structure
        """
        # Union-Find with path compression and union by rank
        parent = list(range(n))
        rank = [0] * n
        components = n  # Initially each node is its own component

        def find(x: Any) -> Any:
            """Find root with path compression."""
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x: Any, y: Any) -> Any:
            """Union by rank, return True if components were merged."""
            px, py = find(x), find(y)
            if px == py:
                return False  # Already in same component

            # Union by rank: attach smaller tree to larger tree
            if rank[px] < rank[py]:
                px, py = py, px

            parent[py] = px
            if rank[px] == rank[py]:
                rank[px] += 1

            return True

        # Process all edges
        for u, v in edges:
            if union(u, v):
                components -= 1

        return components

    def countComponentsDFS(self, n: int, edges: list[list[int]]) -> int:
        """
        Alternative solution using DFS.

        Args:
            n: Number of nodes
            edges: List of edges

        Returns:
            Number of connected components

        Time Complexity: O(N + E)
        Space Complexity: O(N + E) for adjacency list and visited array
        """
        # Build adjacency list
        graph: list[list[int]] = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        visited = [False] * n
        components = 0

        def dfs(node: Any) -> Any:
            """DFS to mark all nodes in current component."""
            visited[node] = True
            for neighbor in graph[node]:
                if not visited[neighbor]:
                    dfs(neighbor)

        # Find all connected components
        for i in range(n):
            if not visited[i]:
                dfs(i)
                components += 1

        return components

    def countComponentsBFS(self, n: int, edges: list[list[int]]) -> int:
        """
        BFS solution for connected components.

        Args:
            n: Number of nodes
            edges: List of edges

        Returns:
            Number of connected components
        """
        # Build adjacency list
        graph: list[list[int]] = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        visited = [False] * n
        components = 0

        for i in range(n):
            if not visited[i]:
                # BFS from unvisited node
                queue = deque([i])
                visited[i] = True

                while queue:
                    node = queue.popleft()
                    for neighbor in graph[node]:
                        if not visited[neighbor]:
                            visited[neighbor] = True
                            queue.append(neighbor)

                components += 1

        return components


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.countComponents(5, [[0, 1], [1, 2], [3, 4]])
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 2: No edges
    result = solution.countComponents(3, [])
    expected = 3
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("Solution for 323. Number Of Connected Components In An Undirected Graph")
