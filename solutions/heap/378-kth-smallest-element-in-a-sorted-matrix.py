I'll help you create a solution for finding the kth smallest element in a matrix. I'll implement this using both a heap-based approach and a binary search approach, with clear comments and proper structure.

```python
#!/usr/bin/env python3
"""
Kth Smallest Matrix Implementation

This module provides solutions for finding the kth smallest element in a sorted matrix
where each row and column is sorted in ascending order.

Two implementations are provided:
1. Heap-based approach
2. Binary search approach
"""

import heapq
from typing import List


class Solution:
    def kthSmallest_heap(self, matrix: List[List[int]], k: int) -> int:
        """
        Find the kth smallest element in the matrix using a min-heap approach.
        
        Args:
            matrix: A n x n matrix where both rows and columns are sorted in ascending order
            k: The k-th smallest element to find (1-based)
            
        Returns:
            The kth smallest element in the matrix
            
        Time Complexity: O(k * log(n))
        Space Complexity: O(n)
        """
        if not matrix or not matrix[0]:
            return 0
            
        n = len(matrix)
        min_heap = []
        
        # Add the first element from each row to the min heap
        # Store (value, row, col) tuples
        for i in range(n):
            heapq.heappush(min_heap, (matrix[i][0], i, 0))
            
        # Pop k-1 elements from the heap
        for _ in range(k - 1):
            val, row, col = heapq.heappop(min_heap)
            
            # If we haven't reached the end of this row, add the next element
            if col + 1 < n:
                heapq.heappush(min_heap, (matrix[row][col + 1], row, col + 1))
                
        # The kth element will be at the top of the heap
        return min_heap[0][0]

    def kthSmallest_binary(self, matrix: List[List[int]], k: int) -> int:
        """
        Find the kth smallest element in the matrix using binary search approach.
        
        Args:
            matrix: A n x n matrix where both rows and columns are sorted in ascending order
            k: The k-th smallest element to find (1-based)
            
        Returns:
            The kth smallest element in the matrix
            
        Time Complexity: O(n * log(max-min))
        Space Complexity: O(1)
        """
        if not matrix or not matrix[0]:
            return 0
            
        n = len(matrix)
        left = matrix[0][0]  # Smallest element
        right = matrix[n-1][n-1]  # Largest element
        
        while left < right:
            mid = (left + right) // 2
            count = self._count_less_equal(matrix, mid)
            
            if count < k:
                left = mid + 1
            else:
                right = mid
                
        return left
    
    def _count_less_equal(self, matrix: List[List[int]], target: int) -> int:
        """
        Helper function to count numbers less than or equal to target in matrix.
        
        Args:
            matrix: The input matrix
            target: The target value
            
        Returns:
            Count of numbers less than or equal to target
        """
        n = len(matrix)
        count = 0
        row, col = n - 1, 0
        
        while row >= 0 and col < n:
            if matrix[row][col] <= target:
                count += row + 1
                col += 1
            else:
                row -= 1
                
        return count


def test_kth_smallest():
    """Test function to verify the implementation"""
    # Test cases
    solution = Solution()
    
    # Test case 1
    matrix1 = [
        [1, 5, 9],
        [10, 11, 13],
        [12, 13, 15]
    ]
    assert solution.kthSmallest_heap(matrix1, 8) == 13
    assert solution.kthSmallest_binary(matrix1, 8) == 13
    
    # Test case 2
    matrix2 = [[-5]]
    assert solution.kthSmallest_heap(matrix2, 1) == -5
    assert solution.kthSmallest_binary(matrix2, 1) == -5
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_kth_smallest()
```

This implementation provides two different approaches to solve the kth smallest element problem in a sorted matrix:

1. **Heap-based approach** (`kthSmallest_heap`):
   - Uses a min-heap to keep track of the smallest elements
   - Time complexity: O(k * log(n))
   - Space complexity: O(n)

2. **Binary search approach** (`kthSmallest_binary`):
   - Uses binary search on the range of possible values
   - Time complexity: O(n * log(max-min))
   - Space complexity: O(1)

The code includes:
- Type hints for better code readability
- Comprehensive comments explaining the implementation
- Helper functions where needed
- Test cases to verify the implementation
- Proper error handling for edge cases
- Clean code structure following Python conventions

Both implementations are efficient and handle edge cases appropriately. The heap-based approach is more intuitive but uses more space, while the binary search approach is more space-efficient but might be slightly harder to understand.