I'll help you implement a solution for finding eventual safe states. I'll create a clean, well-commented solution that uses depth-first search to identify nodes that are eventually safe (nodes that don't participate in any cycles and lead to terminal nodes).

```python
from typing import List

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
        
        def is_safe(node: int, visited: set, safe: set, cycle: set) -> bool:
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
        visited = set()
        safe = set()
        
        # Check each unvisited node
        for node in range(n):
            if node not in visited:
                is_safe(node, visited, safe, set())
        
        # Return sorted list of safe nodes
        return sorted(list(safe))


def test_solution():
    """
    Test cases to verify the solution
    """
    solution = Solution()
    
    # Test case 1
    graph1 = [[1,2],[2,3],[5],[0],[5],[],[]]
    assert solution.eventualSafeNodes(graph1) == [2,4,5,6]
    
    # Test case 2
    graph2 = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
    assert solution.eventualSafeNodes(graph2) == [4]
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()
```

This implementation includes:

1. A main `Solution` class with the `eventualSafeNodes` method that solves the problem
2. A helper DFS function `is_safe` that determines if a node is safe
3. Proper type hints and documentation
4. Test cases to verify the solution
5. Efficient handling of cycles using sets
6. Clear comments explaining the logic

The solution uses a depth-first search approach with the following key concepts:
- A node is safe if all paths starting from it lead to terminal nodes
- We use three sets to track:
  - visited nodes (nodes we've seen)
  - safe nodes (nodes we know are safe)
  - cycle nodes (nodes in current DFS path)
- We detect cycles by checking if a node is already in our current path

The time complexity is O(V + E) where V is the number of vertices and E is the number of edges.
The space complexity is O(V) for the various sets we maintain.

The code handles edge cases such as:
- Empty graphs
- Graphs with cycles
- Graphs with no safe nodes
- Graphs where all nodes are safe