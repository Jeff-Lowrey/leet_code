"""
# Difficulty: Medium

# 547. Number of Provinces

There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 1, 0]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Number of friend circles is 2</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n² × α(n))
**Space Complexity**: O(n)

### INTUITION:
This is a classic connected components problem. We need to find how many separate groups of cities exist. Cities in the same group are either directly or indirectly connected. Union-Find is perfect for this as it efficiently manages and counts connected components.

### APPROACH:
1. **Union-Find Structure**: Create a union-find data structure for n cities
2. **Process Connections**: For each connection in the matrix, union the two cities
3. **Count Components**: Count the number of unique root parents (components)
4. **Alternative DFS**: Can also use DFS to mark visited cities in each component

### WHY THIS WORKS:
- Union-Find automatically groups connected cities into components
- Each connected component represents one province
- After processing all connections, count unique roots to get province count
- DFS alternative marks all cities in a component as visited

### EXAMPLE WALKTHROUGH:
```
isConnected = [[1,1,0],
               [1,1,0],
               [0,0,1]]

Cities: 0, 1, 2
Connections: 0-1 (direct), 2 (isolated)

Union-Find process:
1. Initialize: parent = [0,1,2], each city is its own component
2. Process (0,1): union(0,1) → parent = [1,1,2]
3. Process (1,0): already connected, skip
4. Process (2,2): self-connection, skip

Count unique roots: 1 (for cities 0,1) and 2 (for city 2)
Result: 2 provinces
```

### TIME COMPLEXITY:
O(n² × α(n))
Where α is the inverse Ackermann function (nearly constant)

### SPACE COMPLEXITY:
O(n)
For the Union-Find parent and rank arrays

### EDGE CASES:
- **Single city**: Return 1 (one province)
- **All cities connected**: Return 1 (all form single province)
- **All cities isolated**: Return n (each city is its own province)
- **Empty matrix**: Return 0 (no cities)
- **Two separate groups**: Union-find counts distinct components correctly

</details>
"""

from collections import deque
import re




class UnionFind:
    """Union-Find (Disjoint Set Union) data structure."""

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
    def findCircleNum(self, isConnected: list[list[int]]) -> int:
        """
        Find number of provinces using Union-Find.

        Args:
            isConnected: n x n adjacency matrix where isConnected[i][j] = 1
                        means city i and city j are directly connected

        Returns:
            Number of provinces (connected components)

        Time Complexity: O(n² × α(n)) where α is inverse Ackermann
        Space Complexity: O(n) for Union-Find structure
        """
        n = len(isConnected)
        uf = UnionFind(n)

        # Process all connections
        for i in range(n):
            for j in range(i + 1, n):  # Only check upper triangle (symmetric matrix)
                if isConnected[i][j] == 1:
                    uf.union(i, j)

        return uf.components

    def findCircleNumDFS(self, isConnected: list[list[int]]) -> int:
        """
        Alternative DFS solution.

        Args:
            isConnected: Adjacency matrix

        Returns:
            Number of provinces

        Time Complexity: O(n²)
        Space Complexity: O(n) for visited array and recursion stack
        """
        n = len(isConnected)
        visited = [False] * n
        provinces = 0

        def dfs(city: int) -> None:
            """Mark all cities in current province as visited."""
            visited[city] = True
            for neighbor in range(n):
                if isConnected[city][neighbor] == 1 and not visited[neighbor]:
                    dfs(neighbor)

        # Find all provinces
        for i in range(n):
            if not visited[i]:
                # Found a new province
                dfs(i)
                provinces += 1

        return provinces

    def findCircleNumBFS(self, isConnected: list[list[int]]) -> int:
        """
        Alternative BFS solution.

        Args:
            isConnected: Adjacency matrix

        Returns:
            Number of provinces
        """
        n = len(isConnected)
        visited = [False] * n
        provinces = 0

        for i in range(n):
            if not visited[i]:
                # Start BFS for new province
                queue = deque([i])
                visited[i] = True

                while queue:
                    city = queue.popleft()
                    for neighbor in range(n):
                        if isConnected[city][neighbor] == 1 and not visited[neighbor]:
                            visited[neighbor] = True
                            queue.append(neighbor)

                provinces += 1

        return provinces


def test_solution() -> None:
    """Test cases for Problem 547."""
    solution = Solution()

    # Test case 1: Two provinces
    isConnected1 = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
    result1 = solution.findCircleNum(isConnected1)
    expected1 = 2
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Three provinces (all isolated)
    isConnected2 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    result2 = solution.findCircleNum(isConnected2)
    expected2 = 3
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: One province (all connected)
    isConnected3 = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    result3 = solution.findCircleNum(isConnected3)
    expected3 = 1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single city
    isConnected4 = [[1]]
    result4 = solution.findCircleNum(isConnected4)
    expected4 = 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Complex connections
    isConnected5 = [[1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 1, 1], [1, 0, 1, 1]]
    result5 = solution.findCircleNum(isConnected5)
    expected5 = 1  # All cities are connected through paths
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test DFS approach
    result6 = solution.findCircleNumDFS(isConnected1)
    assert result6 == expected1, f"DFS: Expected {expected1}, got {result6}"

    # Test BFS approach
    result7 = solution.findCircleNumBFS(isConnected1)
    assert result7 == expected1, f"BFS: Expected {expected1}, got {result7}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 547. Number of Provinces ===")

    # Example 1: Two provinces
    isConnected1 = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
    result1 = solution.findCircleNum(isConnected1)
    print(f"findCircleNum({isConnected1}) -> {result1}")
    print("Explanation: Cities 0 and 1 form one province, city 2 forms another\n")

    # Example 2: Three isolated cities
    isConnected2 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    result2 = solution.findCircleNum(isConnected2)
    print(f"findCircleNum({isConnected2}) -> {result2}")
    print("Explanation: Each city is its own province\n")

    # Example 3: All connected
    isConnected3 = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    result3 = solution.findCircleNum(isConnected3)
    print(f"findCircleNum({isConnected3}) -> {result3}")
    print("Explanation: All cities form one big province\n")

    # Compare different approaches
    print("Algorithm comparison:")
    approaches = [
        ("Union-Find", solution.findCircleNum),
        ("DFS", solution.findCircleNumDFS),
        ("BFS", solution.findCircleNumBFS),
    ]

    for name, method in approaches:
        result = method(isConnected1)
        print(f"{name}: {result}")

    print("\nKey insights:")
    print("1. Connected components problem - find separate groups")
    print("2. Union-Find efficiently manages component membership")
    print("3. DFS/BFS can mark all cities in a component as visited")
    print("4. Matrix is symmetric (undirected graph)")
    print("5. Count unique components to get number of provinces")
