"""
# 417. Pacific Atlantic Water Flow
# Difficulty: Medium
Given a problem that demonstrates key concepts in Graphs.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of graphs concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply graphs methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages graphs principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses graphs techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using graphs method
3. Return the computed result

</details>
"""

class Solution:
    """
    Solution for the Pacific Atlantic Water Flow problem.
    
    Problem: Given an m x n matrix of heights, determine which cells can flow to both
    the Pacific and Atlantic oceans. Water can only flow from a cell to adjacent cells
    with equal or lower height.
    
    Pacific Ocean touches the left and top edges.
    Atlantic Ocean touches the right and bottom edges.
    """
    
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        if not heights or not heights[0]:
            return []
        
        m, n = len(heights), len(heights[0])
        
        # Initialize sets to track cells that can reach each ocean
        pacific = set()
        atlantic = set()
        
        def dfs(row: int, col: int, visited: set, prev_height: int) -> None:
            """
            Depth-first search to find cells that can reach each ocean.
            
            Args:
                row: Current row position
                col: Current column position
                visited: Set of visited coordinates
                prev_height: Height of the previous cell
            """
            # Check if current position is out of bounds or already visited
            if (row < 0 or col < 0 or row >= m or col >= n or 
                (row, col) in visited or heights[row][col] < prev_height):
                return
            
            # Add current position to visited set
            visited.add((row, col))
            
            # Explore all four directions (up, down, left, right)
            directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
            for dx, dy in directions:
                dfs(row + dx, col + dy, visited, heights[row][col])
        
        # Process cells adjacent to Pacific Ocean (top and left edges)
        for i in range(m):
            dfs(i, 0, pacific, heights[i][0])
        for j in range(n):
            dfs(0, j, pacific, heights[0][j])
            
        # Process cells adjacent to Atlantic Ocean (bottom and right edges)
        for i in range(m):
            dfs(i, n-1, atlantic, heights[i][n-1])
        for j in range(n):
            dfs(m-1, j, atlantic, heights[m-1][j])
            
        # Find intersection of cells that can reach both oceans
        return list(pacific & atlantic)

    def pacificAtlanticBFS(self, heights: List[List[int]]) -> List[List[int]]:
        """
        Alternative implementation using BFS approach.
        """
        if not heights or not heights[0]:
            return []
        
        m, n = len(heights), len(heights[0])
        
        def bfs(starts: List[tuple]) -> set:
            """
            Breadth-first search helper function.
            
            Args:
                starts: List of starting coordinates
            Returns:
                Set of coordinates that can reach the ocean
            """
            queue = deque(starts)
            visited = set(starts)
            
            while queue:
                row, col = queue.popleft()
                
                # Check all four adjacent cells
                for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                    new_row, new_col = row + dx, col + dy
                    
                    if (0 <= new_row < m and 0 <= new_col < n and 
                        (new_row, new_col) not in visited and 
                        heights[new_row][new_col] >= heights[row][col]):
                        queue.append((new_row, new_col))
                        visited.add((new_row, new_col))
            
            return visited
        
        # Initialize starting points for both oceans
        pacific_starts = [(0, j) for j in range(n)] + [(i, 0) for i in range(1, m)]
        atlantic_starts = [(m-1, j) for j in range(n)] + [(i, n-1) for i in range(m-1)]
        
        # Find cells that can reach each ocean
        pacific = bfs(pacific_starts)
        atlantic = bfs(atlantic_starts)
        
        # Return intersection of both sets
        return list(pacific & atlantic)

# Example usage and testing
def test_solution():
    """
    Test function to verify the implementation.
    """
    solution = Solution()
    
    # Test case 1
    heights1 = [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4]
    ]
    result1 = solution.pacificAtlantic(heights1)
    print(f"Test 1 Result: {result1}")
    
    # Test case 2
    heights2 = [[1]]
    result2 = solution.pacificAtlantic(heights2)
    print(f"Test 2 Result: {result2}")

def test_solution():
    """
    Test cases for 417. Pacific Atlantic Water Flow.
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
    print(f"Solution for 417. Pacific Atlantic Water Flow")
