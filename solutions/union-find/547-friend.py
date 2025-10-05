I'll help you create a solution for the Friend Circles problem. I'll implement it using a Union-Find (Disjoint Set) data structure, which is particularly efficient for this type of problem.

```python
#!/usr/bin/env python3
"""
Friend Circles - Solution using Union Find data structure
LeetCode Problem 547: https://leetcode.com/problems/friend-circles/

This implementation uses a Union-Find (Disjoint Set) data structure to efficiently
find the number of friend circles in a group of students.

Time Complexity: O(N²*α(N)) where α is the inverse Ackermann function
Space Complexity: O(N) for the parent array
"""

from typing import List


class UnionFind:
    """UnionFind (Disjoint Set) data structure implementation"""
    
    def __init__(self, size: int):
        """Initialize UnionFind data structure with given size
        
        Args:
            size: Number of elements in the set
        """
        self.parent = list(range(size))  # Each element is its own parent initially
        self.rank = [0] * size  # Track tree height for union by rank
        self.count = size  # Number of distinct sets
        
    def find(self, x: int) -> int:
        """Find the parent of element x with path compression
        
        Args:
            x: Element to find parent for
            
        Returns:
            Parent of element x
        """
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x: int, y: int) -> None:
        """Unite two elements x and y
        
        Args:
            x: First element
            y: Second element
        """
        px, py = self.find(x), self.find(y)
        if px == py:
            return
        
        # Union by rank
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        
        self.count -= 1  # Decrease count when two sets are united


class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        """
        Find the number of friend circles in the given adjacency matrix.
        
        Args:
            isConnected: N x N matrix where isConnected[i][j] = 1 if student i
                        and j are direct friends, else 0
        
        Returns:
            Number of friend circles
        """
        if not isConnected or not isConnected[0]:
            return 0
        
        n = len(isConnected)
        uf = UnionFind(n)
        
        # Process each friendship relation
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j] == 1:
                    uf.union(i, j)
        
        return uf.count


def test_friend_circles():
    """Test cases for friend circles implementation"""
    solution = Solution()
    
    # Test case 1: Basic example
    test1 = [[1,1,0],
             [1,1,0],
             [0,0,1]]
    assert solution.findCircleNum(test1) == 2, "Test case 1 failed"
    
    # Test case 2: All connected
    test2 = [[1,1,1],
             [1,1,1],
             [1,1,1]]
    assert solution.findCircleNum(test2) == 1, "Test case 2 failed"
    
    # Test case 3: No connections
    test3 = [[1,0,0],
             [0,1,0],
             [0,0,1]]
    assert solution.findCircleNum(test3) == 3, "Test case 3 failed"
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_friend_circles()
```

This implementation includes:

1. A complete `UnionFind` class implementation with path compression and union by rank optimizations
2. The main `Solution` class with the `findCircleNum` method to solve the friend circles problem
3. Comprehensive comments explaining the implementation details
4. Test cases to verify the solution
5. Type hints for better code readability and IDE support
6. Proper error handling and edge cases
7. Time and space complexity analysis in the docstring

The solution uses the Union-Find data structure to efficiently group friends into circles. When two students are friends, their respective sets are united. The final number of distinct sets represents the number of friend circles.

The implementation is efficient with near-linear time complexity due to the optimizations in the Union-Find data structure (path compression and union by rank).

You can run this file directly to execute the test cases, or import the Solution class to use it in other parts of your project.