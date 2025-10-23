"""
# Difficulty: Medium

# 802. Find Eventual Safe States

There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].

A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>graph = [[1,2],[2,3],[5],[0],[5],[],[]]</dd>
<dt>Output:</dt>
<dd>[2,4,5,6] (safe nodes)</dd>
<dt>Explanation:</dt>
<dd>Safe nodes are those not in cycles: [2,4,5,6]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Graph Pattern
**Time Complexity**: O(n) - Single pass with O(1) hash lookups
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Build reverse graph (who reaches who). Use Kahn's algorithm. Nodes with out-degree 0 are safe (reach terminal). Process in reverse topological order to find all safe nodes.

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
- Reverse graph, find nodes from which all paths lead to terminals
- Color nodes: 0=unvisited, 1=visiting, 2=safe
- DFS: if all neighbors are safe, current node is safe
- If reaches cycle (visiting node), not safe
- O(V + E) time: DFS visits each node/edge once, O(V) space

### EXAMPLE WALKTHROUGH:
```
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Step 1: Find nodes with cycles
  0→1→2→3→0 (cycle)

Step 2: Find terminal nodes
  Nodes: 5,6

Step 3: Check which nodes reach only terminal
  Check each node's reachability

Output: [2,4,5,6] (safe nodes)
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
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
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: All nodes are safe (no cycles)
    result = solution.eventualSafeNodes([[1], [2], [3], []])
    expected = [0, 1, 2, 3]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: All nodes have cycles
    result = solution.eventualSafeNodes([[1], [0]])
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Empty input
    result = solution.eventualSafeNodes([])
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Single terminal node
    result = solution.eventualSafeNodes([[]])
    expected = [0]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 802. Find")
