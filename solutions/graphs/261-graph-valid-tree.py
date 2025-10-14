"""
# Difficulty: Medium

# 261. Graph Valid Tree

You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

Return true if the edges of the given graph make up a valid tree, and false otherwise.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[0,1]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>Graph edges form a valid tree if connected and has n-1 edges</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
A valid tree has exactly n-1 edges and is fully connected with no cycles. Use Union-Find to detect cycles and count components. Valid if no cycles and all nodes in one component.

### APPROACH:
1. **Check edge count**: If edges != n-1, return False
2. **Build adjacency list**: Create graph as defaultdict(list), add edges in both directions
3. **Initialize visited set**: Create empty set to track visited nodes
4. **Define DFS function**: Implement dfs(node, parent) to traverse graph
5. **Check for cycles**: In DFS, if neighbor is visited and not parent, cycle detected
6. **Mark as visited**: Add current node to visited set, recurse on unvisited neighbors
7. **Check connectivity**: After DFS from node 0, verify len(visited) == n
8. **Return result**: Return True if no cycles and all nodes visited, else False

### WHY THIS WORKS:
- Tree properties: n nodes, n-1 edges, all nodes connected, no cycles
- Check edge count == n-1 (necessary but not sufficient)
- DFS/BFS from any node: all nodes should be visited (connected)
- Union-find alternative: no cycles means each edge connects different components
- O(n + e) time: DFS/BFS, O(n) space for visited array

### EXAMPLE WALKTHROUGH:
```
Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Step 1: Check edge count
  n-1 = 4 edges (necessary for tree) ✓

Step 2: Build adjacency list
  {0: [1,2,3], 1: [0,4], 2: [0], 3: [0], 4: [1]}

Step 3: DFS to check connectivity
  Visit 0 → mark visited
  Visit 1 → mark visited
  Visit 4 → mark visited
  Visit 2 → mark visited
  Visit 3 → mark visited

Step 4: Verify all nodes visited
  visited = {0,1,2,3,4}, count = 5 = n ✓

Output: True (forms valid tree)
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

from collections import defaultdict, deque

from typing import List, Optional, Dict, Tuple

class Solution:
    """
    Solution class for determining if a graph is a valid tree.
    A valid tree must:
    1. Be fully connected (all nodes can be reached)
    2. Have no cycles
    3. Have n-1 edges for n nodes
    """
    
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        """
        Determines if the given graph represents a valid tree.
        
        Args:
            n: Number of nodes (labeled from 0 to n-1)
            edges: List of edges, where each edge is [node1, node2]
            
        Returns:
            bool: True if the graph is a valid tree, False otherwise
        """
        # First check: A tree with n nodes must have exactly n-1 edges
        if len(edges) != n - 1:
            return False
            
        # Create adjacency list representation of the graph
        adj_list = defaultdict(list)
        for u, v in edges:
            adj_list[u].append(v)
            adj_list[v].append(u)
            
        # Use BFS to check if the graph is fully connected and has no cycles
        visited = set()
        queue = deque([0])  # Start from node 0
        
        while queue:
            node = queue.popleft()
            visited.add(node)
            
            for neighbor in adj_list[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        # If we visited all nodes, and we already verified we have n-1 edges,
        # then this must be a valid tree
        return len(visited) == n

    def validTree_dfs(self, n: int, edges: List[List[int]]) -> bool:
        """
        Alternative implementation using DFS.
        
        Args:
            n: Number of nodes (labeled from 0 to n-1)
            edges: List of edges, where each edge is [node1, node2]
            
        Returns:
            bool: True if the graph is a valid tree, False otherwise
        """
        if len(edges) != n - 1:
            return False
            
        # Create adjacency list
        adj_list = defaultdict(list)
        for u, v in edges:
            adj_list[u].append(v)
            adj_list[v].append(u)
            
        visited = set()
        
        def dfs(node: int, parent: int) -> bool:
            visited.add(node)
            
            for neighbor in adj_list[node]:
                if neighbor == parent:
                    continue
                if neighbor in visited:
                    return False
                if not dfs(neighbor, node):
                    return False
            return True
            
        return dfs(0, -1) and len(visited) == n

def test_solution():
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Valid tree
    result = solution.validTree(5, [[0,1],[0,2],[0,3],[1,4]])
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Has cycle (not a tree)
    result = solution.validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single node (valid tree)
    result = solution.validTree(1, [])
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Disconnected graph (not a tree)
    result = solution.validTree(4, [[0,1],[2,3]])
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Using DFS version
    result = solution.validTree_dfs(5, [[0,1],[0,2],[0,3],[1,4]])
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 261. Graph Valid Tree")
