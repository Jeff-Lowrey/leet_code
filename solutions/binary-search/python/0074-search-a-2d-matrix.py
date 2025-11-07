"""
### INTUITION:
The key insight is that treat the 2D matrix as a flattened 1D sorted array. Use binary search on a virtual index, converting it to row/col using row = mid // n_cols and col = mid % n_cols. This achieves O(log(m*n)) time complexity.

### APPROACH:
1. **Treat as 1D array**: Conceptualize the m×n matrix as a sorted 1D array of length m*n
2. **Initialize binary search**: Set left = 0, right = m*n - 1
3. **Calculate mid**: In each iteration, compute mid = (left + right) // 2
4. **Convert to 2D indices**: Calculate row = mid // n, col = mid % n to access matrix[row][col]
5. **Compare with target**: If matrix[row][col] == target, return True
6. **Adjust search space**: If matrix[row][col] < target, set left = mid + 1; else set right = mid - 1
7. **Continue until found**: Repeat steps 3-6 while left <= right
8. **Return False**: If loop completes without finding target, return False

### WHY THIS WORKS:
- This ensures that treat 2D matrix as flattened 1D array for binary search
- This ensures that convert mid to (row, col): row = mid // n, col = mid % n
- This ensures that apply standard binary search: compare matrix[row][col] with target
- This ensures that matrix properties (sorted rows + first element of row > last of previous) enable this
- This ensures that o(log(m*n)) time, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
```

Step 1: Treat as 1D array
rows = 3, cols = 4, total = 12 elements
left = 0, right = 11
Step 2: Binary search
mid = 5: row = 5//4 = 1, col = 5%4 = 1

Steps:
Step 1: matrix[1][1] = 11 > 3, right = 4
Step 2: mid = 2: row = 2//4 = 0, col = 2%4 = 2
Step 3: matrix[0][2] = 5 > 3, right = 1
Step 4: mid = 0: row = 0//4 = 0, col = 0%4 = 0
Step 5: matrix[0][0] = 1 < 3, left = 1
Step 6: mid = 1: row = 1//4 = 0, col = 1%4 = 1
Step 7: matrix[0][1] = 3 == 3 ✓

Output:
```
True (target found)
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        """
        Search for a target value in a sorted 2D matrix.

        Args:
            matrix: A 2D matrix where rows are sorted and first element of each row
                   is greater than last element of previous row
            target: The value to search for

        Returns:
            bool: True if target is found, False otherwise
        """
        if not matrix or not matrix[0]:
            return False

        rows, cols = len(matrix), len(matrix[0])
        left, right = 0, rows * cols - 1

        # Perform binary search on the matrix as if it were a 1D sorted array
        while left <= right:
            mid = (left + right) // 2
            # Convert mid index to matrix coordinates
            row = mid // cols
            col = mid % cols

            current = matrix[row][col]

            if current == target:
                return True
            elif current < target:
                left = mid + 1
            else:
                right = mid - 1

        return False


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3)
    expected = True
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.searchMatrix([], 0)
    expected = False
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 074. Search A 2D Matrix")
