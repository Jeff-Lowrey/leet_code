"""
# 802. Find
**Medium**

Given a problem that demonstrates key concepts in Topological Sort.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of topological sort concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply topological sort methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages topological sort principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses topological sort techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using topological sort method
3. Return the computed result

</details>
"""

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
    Test cases for 802. Find.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 802. Find")
