I'll help you implement a solution for the Longest Consecutive Union problem. This solution will use a Union-Find data structure to find the longest consecutive sequence in a given array of numbers.

```python
from typing import List

class UnionFind:
    """
    Union-Find (Disjoint Set) data structure implementation
    with path compression and union by rank optimizations
    """
    def __init__(self, size):
        # Initialize parent array where each element points to itself
        self.parent = list(range(size))
        # Initialize rank array for union by rank optimization
        self.rank = [0] * size
        # Track size of each set
        self.size = [1] * size
        # Track the maximum set size
        self.max_size = 1

    def find(self, x: int) -> int:
        """Find the root/parent of element x with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> None:
        """Union two sets containing elements x and y"""
        px, py = self.find(x), self.find(y)
        
        if px == py:
            return

        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        
        self.parent[py] = px
        self.size[px] += self.size[py]
        
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        
        # Update maximum size
        self.max_size = max(self.max_size, self.size[px])

def longest_consecutive(nums: List[int]) -> int:
    """
    Find the length of the longest consecutive sequence in nums
    
    Args:
        nums: List of integers
    
    Returns:
        Length of the longest consecutive sequence
    """
    if not nums:
        return 0

    # Create mapping from number to index
    num_to_idx = {}
    uf = UnionFind(len(nums))

    for i, num in enumerate(nums):
        # Skip if number already processed
        if num in num_to_idx:
            continue
            
        num_to_idx[num] = i

        # Check and union with consecutive numbers
        if num - 1 in num_to_idx:
            uf.union(i, num_to_idx[num - 1])
        if num + 1 in num_to_idx:
            uf.union(i, num_to_idx[num + 1])

    return uf.max_size

def main():
    """Main function to test the implementation"""
    # Test cases
    test_cases = [
        [100, 4, 200, 1, 3, 2],  # Expected: 4
        [0, 3, 7, 2, 5, 8, 4, 6, 1],  # Expected: 9
        [],  # Expected: 0
        [1],  # Expected: 1
        [1, 2, 0, 1],  # Expected: 3
    ]

    for nums in test_cases:
        result = longest_consecutive(nums)
        print(f"Input: {nums}")
        print(f"Longest consecutive sequence length: {result}")
        print()

if __name__ == "__main__":
    main()
```

This implementation provides a solution to find the longest consecutive sequence in an array using a Union-Find data structure. Here's how it works:

1. The `UnionFind` class implements the Union-Find data structure with:
   - Path compression optimization in the `find` method
   - Union by rank optimization in the `union` method
   - Size tracking for each set
   - Maximum size tracking across all sets

2. The `longest_consecutive` function:
   - Creates a mapping from numbers to their indices
   - Uses Union-Find to connect consecutive numbers
   - Returns the size of the largest connected component

3. The solution handles edge cases:
   - Empty input array
   - Single element array
   - Duplicate numbers
   - Non-consecutive sequences

4. The main function includes test cases to demonstrate the functionality

The time complexity is O(N * α(N)) where N is the length of the input array and α is the inverse Ackermann function (which grows very slowly and is effectively constant). The space complexity is O(N) for storing the Union-Find data structure and the number-to-index mapping.

This implementation follows Python best practices, includes type hints, and provides clear documentation through comments and docstrings.