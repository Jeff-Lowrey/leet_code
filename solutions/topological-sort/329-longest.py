"""
# Difficulty: Medium

# 329. Longest

Given a problem that demonstrates key concepts in Topological Sort.

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
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        """
        Find the longest increasing path in a matrix where you can move in four directions
        (up, down, left, right).
        
        Args:
            matrix: 2D list of integers representing the matrix
            
        Returns:
            int: Length of the longest increasing path
        """
        if not matrix or not matrix[0]:
            return 0
        
        rows, cols = len(matrix), len(matrix[0])
        # Cache to store computed results for each cell
        memo = {}
        
        def dfs(row: int, col: int, prev_val: int) -> int:
            """
            Depth-first search helper function to explore paths.
            
            Args:
                row: Current row position
                col: Current column position
                prev_val: Value of the previous cell
                
            Returns:
                int: Length of the longest path starting from current position
            """
            # Check boundaries and if current value is less than previous
            if (row < 0 or row >= rows or 
                col < 0 or col >= cols or 
                matrix[row][col] <= prev_val):
                return 0
            
            # If result is cached, return it
            if (row, col) in memo:
                return memo[(row, col)]
            
            current = matrix[row][col]
            
            # Explore all four directions
            up = dfs(row - 1, col, current)
            down = dfs(row + 1, col, current)
            left = dfs(row, col - 1, current)
            right = dfs(row, col + 1, current)
            
            # Store the maximum path length starting from current cell
            memo[(row, col)] = 1 + max(up, down, left, right)
            return memo[(row, col)]
        
        # Try starting from each cell and find the maximum path length
        max_path = 0
        for i in range(rows):
            for j in range(cols):
                max_path = max(max_path, dfs(i, j, float('-inf')))
        
        return max_path

def test_solution():
    """
    Test cases for 329. Longest.
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
    print(f"Solution for 329. Longest")
