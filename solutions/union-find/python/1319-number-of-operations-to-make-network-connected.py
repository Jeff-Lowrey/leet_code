"""
# Difficulty: Medium

# 1319. Number Of Operations To Make Network Connected

You are given n computers numbered from 0 to n - 1 connected by ethernet cables connections forming a network where connections[i] = [ai, bi] connects computers ai and bi.

Any computer can reach any other computer directly or indirectly through the network.

You are given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return the minimum number of times you need to do this to make all the computers connected. If it is not possible, return -1.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 4, connections = [[0,1],[0,2],[1,2],[1,3]]</dd>
<dt>Output:</dt>
<dd>Total cables: 4, Need: 3, Spare: 1</dd>
<dt>Explanation:</dt>
<dd>Operations to make network connected is 1</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Set, Array, Tree
**Patterns**: Hash Table Pattern, Divide and Conquer
**Time Complexity**: O(n × α(n))
**Space Complexity**: O(n) - Additional set storage

### INTUITION:
This is a classic Union-Find problem about connecting components. Key insights:
- To connect n computers, we need at least n-1 cables
- Extra cables can be moved to connect separate components
- Count disconnected components and check if we have enough spare cables

### APPROACH:
1. **Check minimum cables**: Need at least n-1 cables total
2. **Union-Find**: Group computers into connected components
3. **Count components**: Find number of separate groups
4. **Calculate operations**: (components - 1) operations needed to connect all

### WHY THIS WORKS:
- Union-Find efficiently tracks connected components
- Each component merge requires exactly 1 cable
- Spare cables = total_cables - (n - components)
- Need (components - 1) cables to connect all components

### EXAMPLE WALKTHROUGH:
Input:
```
n = 4, connections = [[0,1],[0,2],[1,2],[1,3]]
```

Total cables: 4, Need: 3, Spare: 1
Union-Find process:
- Connect 0-1: components = {0,1}, {2}, {3}
- Connect 0-2: components = {0,1,2}, {3}
- Connect 1-2: redundant (already connected)
- Connect 1-3: components = {0,1,2,3}
Components: 1, Operations needed: 0

### TIME COMPLEXITY:
O(n × α(n))
Where α is the inverse Ackermann function (nearly constant)

### SPACE COMPLEXITY:
O(n)
For Union-Find parent and rank arrays

### EDGE CASES:
- Not enough cables: return -1
- Already connected: return 0
- Multiple components with spare cables

</details>
"""

from typing import Any


class UnionFind:
    """..."""

    def __init__(self, n: int) -> None:
        """Initialize with n elements."""
        self.parent = list(range(n))
        self.rank = [0] * n

    @property
    def components(self) -> int:
        """Return number of connected components."""
        return len(set(self.find(i) for i in range(len(self.parent))))

    def find(self, x: int) -> int:
        """Find root of element x with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """Union two sets. Returns True if they were in different sets."""
        px, py = self.find(x), self.find(y)
        if px == py:
            return False

        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1

        return True

    def connected(self, x: int, y: int) -> bool:
        """Check if two elements are in the same set."""
        return self.find(x) == self.find(y)


class Solution:
    def makeConnected(self, n: int, connections: list[list[int]]) -> int:
        """
        Find minimum operations to connect all computers using Union-Find.

        Args:
            n: Number of computers (0 to n-1)
            connections: List of [a, b] cable connections

        Returns:
            Minimum operations needed, or -1 if impossible

        Time Complexity: O(n × α(n)) where α is inverse Ackermann
        Space Complexity: O(n) for Union-Find structure
        """
        # Need at least n-1 cables to connect n computers
        if len(connections) < n - 1:
            return -1

        # Build Union-Find and connect components
        uf = UnionFind(n)

        for a, b in connections:
            uf.union(a, b)

        # Each operation connects two components into one
        # So we need (components - 1) operations to make 1 component
        return uf.components - 1

    def makeConnectedAlternative(self, n: int, connections: list[list[int]]) -> int:
        """
        Alternative solution using manual component counting.

        Args:
            n: Number of computers
            connections: Cable connections

        Returns:
            Minimum operations needed, or -1 if impossible
        """
        # Check if we have enough cables
        if len(connections) < n - 1:
            return -1

        # Build adjacency graph
        graph: list[list[int]] = [[] for _ in range(n)]
        for a, b in connections:
            graph[a].append(b)
            graph[b].append(a)

        # Count connected components using DFS
        visited = [False] * n
        components = 0

        def dfs(node: Any) -> Any:
            visited[node] = True
            for neighbor in graph[node]:
                if not visited[neighbor]:
                    dfs(neighbor)

        for i in range(n):
            if not visited[i]:
                dfs(i)
                components += 1

        # Need (components - 1) operations to connect all
        return components - 1


def test_solution() -> None:
    """Test cases for Problem 1319."""
    solution = Solution()

    # Test case 1: Can connect all
    result1 = solution.makeConnected(4, [[0, 1], [0, 2], [1, 2], [1, 3]])
    expected1 = 0
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Need 1 operation
    result2 = solution.makeConnected(6, [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]])
    expected2 = 2
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Not enough cables
    result3 = solution.makeConnected(6, [[0, 1], [0, 2], [0, 3], [1, 2]])
    expected3 = -1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Already connected
    result4 = solution.makeConnected(5, [[0, 1], [0, 2], [1, 2], [1, 3], [1, 4]])
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Multiple components
    result5 = solution.makeConnected(
        12, [[1, 5], [1, 7], [1, 2], [1, 4], [3, 7], [4, 7], [3, 5], [0, 6], [0, 1], [0, 4], [2, 6], [0, 3], [0, 2]]
    )
    expected5 = 4
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test alternative solution
    result6 = solution.makeConnectedAlternative(4, [[0, 1], [0, 2], [1, 2], [1, 3]])
    expected6 = 0
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 1319. Number Of Operations To Make Network Connected ===")
    print(
        f"makeConnected(4, [[0,1],[0,2],[1,2],[1,3]]) -> {solution.makeConnected(4, [[0, 1], [0, 2], [1, 2], [1, 3]])}"
    )
    print(
        f"makeConnected(6, [[0,1],[0,2],[0,3],[1,2],[1,3]]) -> {solution.makeConnected(6, [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]])}"
    )
    print(
        f"makeConnected(6, [[0,1],[0,2],[0,3],[1,2]]) -> {solution.makeConnected(6, [[0, 1], [0, 2], [0, 3], [1, 2]])}"
    )
