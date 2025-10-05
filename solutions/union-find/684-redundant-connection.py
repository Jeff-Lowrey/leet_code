I'll help you implement a solution for the Redundant Connection Union problem using Python. Here's the complete implementation:

```python
#!/usr/bin/env python3
"""
Redundant Connection Union Implementation
LeetCode Problem 684: Find the redundant connection in an undirected graph

This solution uses Union-Find (Disjoint Set) data structure to detect the redundant edge
that creates a cycle in the graph.
"""

from typing import List


class UnionFind:
    """
    UnionFind (Disjoint Set) data structure implementation with path compression
    and union by rank optimizations.
    """
    
    def __init__(self, size: int):
        """Initialize UnionFind data structure with given size."""
        self.parent = list(range(size))
        self.rank = [0] * size
    
    def find(self, x: int) -> int:
        """
        Find the root/parent of element x with path compression.
        
        Args:
            x: The element to find the root for
            
        Returns:
            The root/parent of element x
        """
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x: int, y: int) -> bool:
        """
        Union two elements x and y. Returns False if they're already connected.
        
        Args:
            x: First element
            y: Second element
            
        Returns:
            True if union was successful, False if elements were already connected
        """
        px, py = self.find(x), self.find(y)
        
        if px == py:
            return False
        
        # Union by rank
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        
        return True


class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        """
        Find the last edge that creates a cycle in the graph.
        
        Args:
            edges: List of edges where each edge is [u, v] representing
                  an undirected edge between nodes u and v
                  
        Returns:
            The last edge that creates a cycle
        """
        # Initialize UnionFind with size n+1 (as nodes are 1-indexed)
        n = len(edges)
        uf = UnionFind(n + 1)
        
        # Process each edge
        for edge in edges:
            u, v = edge
            # If union returns False, we found a cycle
            if not uf.union(u, v):
                return edge
        
        return []  # Should never reach here given problem constraints


def test_solution():
    """Test cases for the solution."""
    solution = Solution()
    
    # Test case 1: Simple cycle
    assert solution.findRedundantConnection([[1,2], [1,3], [2,3]]) == [2,3]
    
    # Test case 2: More complex graph
    assert solution.findRedundantConnection([[1,2], [2,3], [3,4], [1,4], [1,5]]) == [1,4]
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()
```

This implementation provides a solution to the Redundant Connection problem using the Union-Find data structure. Here's a breakdown of the key components:

1. `UnionFind` class:
   - Implements the Union-Find data structure with path compression and union by rank optimizations
   - Provides `find` and `union` operations for managing disjoint sets

2. `Solution` class:
   - Contains the main solution method `findRedundantConnection`
   - Uses UnionFind to detect the redundant edge that creates a cycle

3. Test cases:
   - Includes basic test cases to verify the solution
   - Tests both simple and more complex graph scenarios

The solution has the following characteristics:
- Time Complexity: O(N * α(N)) where N is the number of edges and α is the inverse Ackermann function
- Space Complexity: O(N) for the UnionFind data structure
- Handles 1-indexed nodes as specified in the problem
- Includes proper error handling and edge cases
- Follows Python best practices and includes comprehensive comments

The code is structured as a complete, runnable file with proper imports and can be executed directly to run the test cases.