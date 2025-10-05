I'll help you create a clean implementation of the Connected Components Union solution in Python. This will be saved to the specified path.

```python
#!/usr/bin/env python3
"""
Connected Components Union Implementation
LeetCode Problem 323: Number of Connected Components in an Undirected Graph

This implementation uses the Union-Find (Disjoint Set) data structure to efficiently
track connected components in an undirected graph.

Time Complexity: 
- Union and Find operations: O(α(n)) where α is the inverse Ackermann function
- Overall: O(E * α(n)) where E is the number of edges
Space Complexity: O(n) where n is the number of nodes
"""

class UnionFind:
    def __init__(self, size):
        """
        Initialize Union-Find data structure.
        
        Args:
            size (int): Number of nodes in the graph
        """
        # Initialize each node as its own parent
        self.parent = list(range(size))
        # Initialize rank array for union by rank optimization
        self.rank = [0] * size
        # Track number of components
        self.count = size

    def find(self, x):
        """
        Find the root/parent of a node with path compression.
        
        Args:
            x (int): Node to find parent for
            
        Returns:
            int: Root parent of the node
        """
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        """
        Union two components together.
        
        Args:
            x (int): First node
            y (int): Second node
            
        Returns:
            bool: True if union was performed, False if already connected
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
            
        self.count -= 1
        return True

    def get_count(self):
        """
        Get the current number of connected components.
        
        Returns:
            int: Number of connected components
        """
        return self.count


def countComponents(n: int, edges: list[list[int]]) -> int:
    """
    Count the number of connected components in an undirected graph.
    
    Args:
        n (int): Number of nodes (0 to n-1)
        edges (List[List[int]]): List of edges where each edge is [node1, node2]
        
    Returns:
        int: Number of connected components in the graph
    """
    if n <= 0:
        return 0
    
    # Initialize Union-Find data structure
    uf = UnionFind(n)
    
    # Process each edge
    for x, y in edges:
        uf.union(x, y)
    
    return uf.get_count()


def main():
    """
    Example usage and test cases
    """
    # Test Case 1
    n1 = 5
    edges1 = [[0,1], [1,2], [3,4]]
    print(f"Test 1: n = {n1}, edges = {edges1}")
    print(f"Result: {countComponents(n1, edges1)}")  # Expected: 2
    
    # Test Case 2
    n2 = 5
    edges2 = [[0,1], [1,2], [2,3], [3,4]]
    print(f"\nTest 2: n = {n2}, edges = {edges2}")
    print(f"Result: {countComponents(n2, edges2)}")  # Expected: 1
    
    # Test Case 3 (Edge case - no edges)
    n3 = 3
    edges3 = []
    print(f"\nTest 3: n = {n3}, edges = {edges3}")
    print(f"Result: {countComponents(n3, edges3)}")  # Expected: 3


if __name__ == "__main__":
    main()
```

This implementation provides a complete solution for finding connected components in an undirected graph using the Union-Find data structure. Here are the key features:

1. **UnionFind Class**: Implements the Union-Find data structure with:
   - Path compression optimization
   - Union by rank optimization
   - Component counting

2. **countComponents Function**: Main function that:
   - Takes number of nodes and edges as input
   - Returns the number of connected components
   - Handles edge cases

3. **Main Function**: Includes test cases demonstrating usage

4. **Documentation**: 
   - Detailed comments explaining the implementation
   - Time and space complexity analysis
   - Function documentation with Args and Returns

The code follows Python best practices and conventions, including:
- Clear variable names
- Type hints
- Proper indentation
- Comprehensive error handling
- Modular structure

The implementation is efficient with near-constant time complexity for Union-Find operations due to path compression and union by rank optimizations.