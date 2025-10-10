"""
# Difficulty: Medium

# 684. Redundant Connection

In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

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
This is a classic Union-Find cycle detection problem. In a tree with n nodes, there should be exactly n-1 edges. When we add one extra edge, it creates a cycle. We need to find the edge that completes this cycle.

### APPROACH:
1. **Use Union-Find**: Track connected components as we process edges
2. **Cycle detection**: If two nodes are already connected and we try to add an edge between them, that edge creates a cycle
3. **Return last occurrence**: The problem asks for the edge that occurs last in input if multiple answers exist

### WHY THIS WORKS:
- Union-Find efficiently tracks connected components
- When we encounter an edge between two nodes already in the same component, that edge creates a cycle
- The first such edge we encounter (processing left to right) is the redundant one
- This edge can be removed while keeping the graph connected

### EXAMPLE WALKTHROUGH:
```
edges = [[1,2],[1,3],[2,3]]

Process edge [1,2]: 1 and 2 not connected → union them
Process edge [1,3]: 1 and 3 not connected → union them
Process edge [2,3]: 2 and 3 are already connected through 1 → redundant!

Return [2,3]
```

### TIME COMPLEXITY:
O(n × α(n))
Where α is the inverse Ackermann function (nearly constant for practical purposes)

### SPACE COMPLEXITY:
O(n)
For the Union-Find parent array

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""

class Solution:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        """
        Find redundant edge using Union-Find cycle detection.

        Args:
            edges: List of edges [u, v] representing undirected graph

        Returns:
            The redundant edge that creates a cycle

        Time Complexity: O(n × α(n)) where α is inverse Ackermann
        Space Complexity: O(n) for Union-Find structure
        """
        n = len(edges)
        uf = UnionFind(n)

        for edge in edges:
            u, v = edge[0], edge[1]

            # If nodes are already connected, this edge creates a cycle
            if not uf.union(u, v):
                return edge

        return []  # Should never reach here if input is valid

    def findRedundantConnectionDFS(self, edges: list[list[int]]) -> list[int]:
        """
        Alternative DFS solution for comparison.

        Args:
            edges: List of edges

        Returns:
            The redundant edge
        """
        graph = {}

        def has_path(source: int, target: int, visited: set) -> bool:
            """Check if path exists between source and target using DFS."""
            if source == target:
                return True

            visited.add(source)

            for neighbor in graph.get(source, []):
                if neighbor not in visited:
                    if has_path(neighbor, target, visited):
                        return True

            return False

        for edge in edges:
            u, v = edge[0], edge[1]

            # Check if u and v are already connected
            if u in graph and v in graph and has_path(u, v, set()):
                return edge

            # Add edge to graph
            if u not in graph:
                graph[u] = []
            if v not in graph:
                graph[v] = []

            graph[u].append(v)
            graph[v].append(u)

        return []

def test_solution():
    """Test cases for Problem 684."""
    solution = Solution()

    # Test case 1: Simple triangle
    edges1 = [[1, 2], [1, 3], [2, 3]]
    result1 = solution.findRedundantConnection(edges1)
    expected1 = [2, 3]  # Last edge that creates cycle
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Larger cycle
    edges2 = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]
    result2 = solution.findRedundantConnection(edges2)
    expected2 = [1, 4]  # Edge that completes cycle 1-2-3-4-1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Linear then cycle
    edges3 = [[1, 2], [2, 3], [3, 4], [2, 5], [5, 4]]
    result3 = solution.findRedundantConnection(edges3)
    expected3 = [5, 4]  # Creates cycle through 2-3-4-5-2
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Simple cycle at end
    edges4 = [[1, 2], [2, 3], [1, 3]]
    result4 = solution.findRedundantConnection(edges4)
    expected4 = [1, 3]  # Last edge creates triangle
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Complex graph
    edges5 = [[2, 7], [7, 8], [3, 6], [2, 3], [6, 7], [2, 8], [1, 8]]
    result5 = solution.findRedundantConnection(edges5)
    # Expected: The first edge that creates a cycle
    print(f"Complex graph result: {result5}")

    # Test DFS approach
    result6 = solution.findRedundantConnectionDFS(edges1)
    assert result6 == expected1, f"DFS: Expected {expected1}, got {result6}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 684. Redundant Connection ===")

    # Example 1
    edges1 = [[1, 2], [1, 3], [2, 3]]
    result1 = solution.findRedundantConnection(edges1)
    print(f"findRedundantConnection({edges1}) -> {result1}")
    print("Explanation: Forms triangle, [2,3] is the last edge\n")

    # Example 2
    edges2 = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]
    result2 = solution.findRedundantConnection(edges2)
    print(f"findRedundantConnection({edges2}) -> {result2}")
    print("Explanation: [1,4] completes cycle 1→2→3→4→1\n")

    print("Key insights:")
    print("1. Tree with n nodes needs exactly n-1 edges")
    print("2. Extra edge creates exactly one cycle")
    print("3. Union-Find detects when nodes are already connected")
    print("4. First cycle-creating edge is the redundant one")
    print("5. Process edges in order for correct 'last occurrence' behavior")
