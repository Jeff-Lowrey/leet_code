"""
# Difficulty: Medium

# 0378. Kth Smallest Element In A Sorted Matrix

Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

You must find a solution with a memory complexity better than O(n²).

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 5, 9]]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>The 8th smallest element in sorted matrix [[1,5,9],[10,11,13],[12,13,15]] is 13</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Set, Array, Heap
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(k log n)
**Space Complexity**: O(n) - Additional set storage

### INTUITION:
This problem involves finding the kth smallest element in a matrix where both rows and columns are sorted. We have multiple approaches: heap-based, binary search, and merge-like. The heap approach treats each row as a sorted list and uses a min-heap to efficiently find the kth smallest element.

### APPROACH:
1. **Initialize min-heap**: Create a heap with the first element (matrix[0][0]) and a visited set to track processed cells
2. **Extract minimum k times**: Pop the smallest element from heap k times to reach the kth smallest
3. **Add neighbors to heap**: For each popped element at position (row, col), add its right neighbor (row, col+1) if not visited
4. **Add bottom neighbor**: Also add the bottom neighbor (row+1, col) if not visited and within bounds
5. **Track visited cells**: Use a visited set to ensure each cell is added to heap only once, preventing duplicates
6. **Return kth element**: After k iterations, the last popped value is the kth smallest element
7. **Alternative binary search**: Search for answer in range [min, max], count elements ≤ mid using sorted property

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
Matrix: [[1,5,9],[10,11,13],[12,13,15]], k=8
```

Step 1: heap = [(1,0,0)] (value, row, col)

Steps:
Step 1: pop 1, add 5 and 10 -> heap = [(5,0,1), (10,1,0)]
Step 2: pop 5, add 9 -> heap = [(9,0,2), (10,1,0)]
Step 3: pop 9 -> heap = [(10,1,0)]
Step 4: pop 10, add 11 and 12 -> heap = [(11,1,1), (12,2,0)]
Step 5: pop 11, add 13 -> heap = [(12,2,0), (13,1,2)]
Step 6: pop 12, add 13 -> heap = [(13,1,2), (13,2,1)]
Step 7: pop 13 (8th smallest) -> return 13

### TIME COMPLEXITY:
O(k log n)
Where n is matrix dimension and k is the target position

### SPACE COMPLEXITY:
O(n)
For the heap storing at most n elements (one from each row)

### EDGE CASES:
- Single element matrix
- k = 1 (smallest element)
- k = n² (largest element)
- Matrix with duplicate values

</details>
"""

import heapq
from typing import Any


class Solution:
    def kthSmallest(self, matrix: list[list[int]], k: int) -> int:
        """
        Find kth smallest element using min-heap approach.

        Args:
            matrix: n x n matrix with sorted rows and columns
            k: Position of element to find (1-indexed)

        Returns:
            The kth smallest element in the matrix

        Time Complexity: O(k log n) where n is matrix dimension
        Space Complexity: O(n) for heap
        """
        n = len(matrix)

        # Min-heap: (value, row, col)
        heap = [(matrix[0][0], 0, 0)]
        visited = {(0, 0)}

        for _ in range(k):
            val, row, col = heapq.heappop(heap)

            # Add right neighbor
            if col + 1 < n and (row, col + 1) not in visited:
                heapq.heappush(heap, (matrix[row][col + 1], row, col + 1))
                visited.add((row, col + 1))

            # Add bottom neighbor
            if row + 1 < n and (row + 1, col) not in visited:
                heapq.heappush(heap, (matrix[row + 1][col], row + 1, col))
                visited.add((row + 1, col))

        return val

    def kthSmallestBinarySearch(self, matrix: list[list[int]], k: int) -> int:
        """
        Find kth smallest using binary search on answer.

        Args:
            matrix: n x n sorted matrix
            k: Target position

        Returns:
            The kth smallest element

        Time Complexity: O(n log(max-min) log n)
        Space Complexity: O(1)
        """

        def count_less_equal(target: Any) -> Any:
            """Count elements <= target using sorted property."""
            count = 0
            row, col = len(matrix) - 1, 0  # Start from bottom-left

            while row >= 0 and col < len(matrix[0]):
                if matrix[row][col] <= target:
                    count += row + 1  # All elements in this column up to row
                    col += 1
                else:
                    row -= 1

            return count

        n = len(matrix)
        left, right = matrix[0][0], matrix[n - 1][n - 1]

        while left < right:
            mid = (left + right) // 2
            if count_less_equal(mid) < k:
                left = mid + 1
            else:
                right = mid

        return left

    def kthSmallestMaxHeap(self, matrix: list[list[int]], k: int) -> int:
        """
        Find kth smallest using max-heap to track k smallest elements.

        Args:
            matrix: n x n sorted matrix
            k: Target position

        Returns:
            The kth smallest element

        Time Complexity: O(n² log k)
        Space Complexity: O(k)
        """
        # Max-heap (negate values for min-heap behavior)
        max_heap: list[Any] = []

        for row in matrix:
            for val in row:
                if len(max_heap) < k:
                    heapq.heappush(max_heap, -val)
                elif -val > max_heap[0]:  # val < -max_heap[0]
                    heapq.heappop(max_heap)
                    heapq.heappush(max_heap, -val)

        return -max_heap[0]

    def kthSmallestMergeRows(self, matrix: list[list[int]], k: int) -> int:
        """
        Find kth smallest by treating rows as sorted lists to merge.

        Args:
            matrix: n x n sorted matrix
            k: Target position

        Returns:
            The kth smallest element

        Time Complexity: O(k log n)
        Space Complexity: O(n)
        """
        n = len(matrix)

        # Initialize heap with first element of each row
        heap: list[Any] = []
        for i in range(n):
            heapq.heappush(heap, (matrix[i][0], i, 0))

        # Extract k-1 elements, then return the kth
        for _ in range(k - 1):
            val, row, col = heapq.heappop(heap)

            # Add next element from the same row if available
            if col + 1 < n:
                heapq.heappush(heap, (matrix[row][col + 1], row, col + 1))

        return heap[0][0]

    def kthSmallestOptimal(self, matrix: list[list[int]], k: int) -> int:
        """
        Optimal solution using binary search with optimized counting.

        Args:
            matrix: n x n sorted matrix
            k: Target position

        Returns:
            The kth smallest element
        """

        def count_less_equal(x: Any) -> Any:
            """Efficiently count elements <= x."""
            count = 0
            n = len(matrix)
            row, col = n - 1, 0  # Start from bottom-left corner

            while row >= 0 and col < n:
                if matrix[row][col] <= x:
                    count += row + 1  # All elements above and including current
                    col += 1
                else:
                    row -= 1

            return count

        n = len(matrix)
        left, right = matrix[0][0], matrix[n - 1][n - 1]

        while left < right:
            mid = left + (right - left) // 2
            count = count_less_equal(mid)

            if count < k:
                left = mid + 1
            else:
                right = mid

        return left


def test_solution() -> None:
    """Test cases for Problem 378."""
    solution = Solution()

    # Test case 1: Basic 3x3 matrix
    matrix1 = [[1, 5, 9], [10, 11, 13], [12, 13, 15]]
    result1 = solution.kthSmallest(matrix1, 8)
    expected1 = 13
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Matrix with duplicates
    matrix2 = [[1, 2], [1, 3]]
    result2 = solution.kthSmallest(matrix2, 2)
    expected2 = 1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single element
    matrix3 = [[1]]
    result3 = solution.kthSmallest(matrix3, 1)
    expected3 = 1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: First element (k=1)
    matrix4 = [[1, 5, 9], [10, 11, 13], [12, 13, 15]]
    result4 = solution.kthSmallest(matrix4, 1)
    expected4 = 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Last element (k=n²)
    matrix5 = [[1, 5, 9], [10, 11, 13], [12, 13, 15]]
    result5 = solution.kthSmallest(matrix5, 9)
    expected5 = 15
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: 2x2 matrix
    matrix6 = [[1, 3], [2, 4]]
    result6 = solution.kthSmallest(matrix6, 3)
    expected6 = 3
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test binary search approach
    result7 = solution.kthSmallestBinarySearch(matrix1, 8)
    expected7 = 13
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test max heap approach
    result8 = solution.kthSmallestMaxHeap(matrix1, 8)
    expected8 = 13
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test merge rows approach
    result9 = solution.kthSmallestMergeRows(matrix1, 8)
    expected9 = 13
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test optimal approach
    result10 = solution.kthSmallestOptimal(matrix1, 8)
    expected10 = 13
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    # Test case 7: Larger matrix
    matrix7 = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]]
    result11 = solution.kthSmallest(matrix7, 5)
    expected11 = 5
    assert result11 == expected11, f"Expected {expected11}, got {result11}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 378. Kth Smallest Element In A Sorted Matrix ===")

    # Test different approaches
    matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]]
    k = 8

    print(f"Matrix: {matrix}")
    print(f"k = {k}")
    print()

    result1 = solution.kthSmallest(matrix, k)
    result2 = solution.kthSmallestBinarySearch(matrix, k)
    result3 = solution.kthSmallestMaxHeap(matrix, k)
    result4 = solution.kthSmallestMergeRows(matrix, k)
    result5 = solution.kthSmallestOptimal(matrix, k)

    print(f"Min-heap approach:     {result1}")
    print(f"Binary search:         {result2}")
    print(f"Max-heap approach:     {result3}")
    print(f"Merge rows:            {result4}")
    print(f"Optimal binary search: {result5}")

    # Show all elements in sorted order for verification
    all_elements: list[Any] = []
    for row in matrix:
        all_elements.extend(row)
    all_elements.sort()
    print(f"\nAll elements sorted: {all_elements}")
    print(f"8th smallest (index 7): {all_elements[k - 1]}")

    # Performance comparison
    print(f"\nApproach complexities:")
    print(f"Min-heap:     O(k log n) time, O(n) space")
    print(f"Binary search: O(n log(max-min) log n) time, O(1) space")
    print(f"Max-heap:     O(n² log k) time, O(k) space")
    print(f"Merge rows:   O(k log n) time, O(n) space")
