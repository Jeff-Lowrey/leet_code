"""
### INTUITION:
The key insight is that build reverse graph (who reaches who). Use Kahn's algorithm. Nodes with out-degree 0 are safe (reach terminal). Process in reverse topological order to find all safe nodes.

### APPROACH:
1. **Build graph**: Create adjacency list from graph edges
2. **Track colors**: Use colors array: 0 = unvisited, 1 = visiting, 2 = visited
3. **Define DFS**: Implement dfs(node) to detect cycles
4. **Check visiting**: If colors[node] == 1, cycle detected, return False
5. **Check visited**: If colors[node] == 2, already safe, return True
6. **Mark visiting**: Set colors[node] = 1, explore all neighbors
7. **Mark visited**: If all neighbors safe, set colors[node] = 2
8. **Find safe nodes**: Return nodes where dfs(node) returns True

### WHY THIS WORKS:
- This ensures that reverse graph, find nodes from which all paths lead to terminals
- This ensures that color nodes: 0=unvisited, 1=visiting, 2=safe
- This ensures that dFS: if all neighbors are safe, current node is safe
- This ensures that if reaches cycle (visiting node), not safe
- This ensures that o(V + E) time: DFS visits each node/edge once, O(V) space

### EXAMPLE WALKTHROUGH:
Input:
```
graph = [[1,2],[2,3],[5],[0],[5],[],[]]
```

Step 1: Find nodes with cycles

Steps:
Step 1: 0→1→2→3→0 (cycle)
Step 2: Find terminal nodes
Step 3: Nodes: 5,6
Step 4: Check which nodes reach only terminal
Step 5: Check each node's reachability

Output:
```
[2,4,5,6] (safe nodes)
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        """
        Find all safe nodes in a directed graph.
        A safe node is a node that eventually leads to a terminal node (node with no outgoing edges)
        and doesn't participate in any cycles.

        Args:
            graph: List of lists where graph[i] contains nodes that node i connects to

        Returns:
            List of safe nodes in ascending order
        """

        def is_safe(node: int, visited: set[int], safe: set[int], cycle: set[int]) -> bool:
            """
            DFS helper function to determine if a node is safe.

            Args:
                node: Current node being processed
                visited: Set of nodes visited in current DFS path
                safe: Set of nodes known to be safe
                cycle: Set of nodes currently being explored (for cycle detection)

            Returns:
                Boolean indicating if the node is safe
            """
            # If node is already known to be safe
            if node in safe:
                return True

            # If node is in current path, we found a cycle
            if node in cycle:
                return False

            # If node was previously visited and not marked safe, it's part of a cycle
            if node in visited:
                return False

            # Mark node as being explored
            cycle.add(node)
            visited.add(node)

            # Check all neighbors
            for neighbor in graph[node]:
                if not is_safe(neighbor, visited, safe, cycle):
                    return False

            # Remove node from cycle set as we're done exploring it
            cycle.remove(node)
            # Mark node as safe
            safe.add(node)
            return True

        n = len(graph)
        visited: set[Any] = set()
        safe: set[Any] = set()

        # Check each unvisited node
        for node in range(n):
            if node not in visited:
                is_safe(node, visited, safe, set())

        # Return sorted list of safe nodes
        return sorted(list(safe))


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.eventualSafeNodes([[1, 2], [2, 3], [5], [0], [5], [], []])
    expected: list[Any] = [2, 4, 5, 6]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: All nodes are safe (no cycles)
    result = solution.eventualSafeNodes([[1], [2], [3], []])
    expected = [0, 1, 2, 3]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: All nodes have cycles
    result = solution.eventualSafeNodes([[1], [0]])
    expected = []
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Empty input
    result = solution.eventualSafeNodes([])
    expected = []
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Single terminal node
    result = solution.eventualSafeNodes([[]])
    expected = [0]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 802. Find")
