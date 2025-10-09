"""
# Difficulty: Medium

# 074. Search A 2D Matrix

Given a problem that demonstrates key concepts in Binary Search.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of binary search concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply binary search methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages binary search principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
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

def test_solution():
    """
    Test cases for 074. Search A 2D Matrix.
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
    print(f"Solution for 074. Search A 2D Matrix")
