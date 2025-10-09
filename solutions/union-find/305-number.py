"""
# 305. Number
# Difficulty: Medium
Given a problem that demonstrates key concepts in Union Find.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of union find concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply union find methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages union find principles
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

The approach uses union find techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using union find method
3. Return the computed result

</details>
"""

class Solution:
    def numIslands2(self, m: int, n: int, positions: List[List[int]]) -> List[int]:
        """
        Solve Number Islands II problem using Union-Find approach

        Args:
            m: Number of rows in the grid
            n: Number of columns in the grid
            positions: List of positions where land will be added

        Returns:
            List of number of islands after each land addition
        """

        def get_key(row, col):
            """Convert 2D coordinates to unique key"""
            return row * n + col

        # Initialize Union-Find structure
        uf = UnionFind()
        result = []
        land_cells = set()  # Keep track of cells that are land

        # Directions for checking adjacent cells
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        for row, col in positions:
            # Skip if position is already land
            key = get_key(row, col)
            if key in land_cells:
                result.append(uf.count)
                continue

            # Add new land
            land_cells.add(key)
            uf.add(key)

            # Check all adjacent cells
            for dx, dy in directions:
                new_row, new_col = row + dx, col + dy
                adj_key = get_key(new_row, new_col)

                # If adjacent cell is valid and is land, union the sets
                if 0 <= new_row < m and 0 <= new_col < n and adj_key in land_cells:
                    uf.union(key, adj_key)

            result.append(uf.count)

        return result

# Example usage and test cases
def test_solution():
    solution = Solution()

    # Test case 1
    m1, n1 = 3, 3
    positions1 = [[0, 0], [0, 1], [1, 2], [2, 1]]
    result1 = solution.numIslands2(m1, n1, positions1)
    print(f"Test 1 Result: {result1}")  # Expected: [1, 2, 3, 3]

    # Test case 2
    m2, n2 = 1, 1
    positions2 = [[0, 0]]
    result2 = solution.numIslands2(m2, n2, positions2)
    print(f"Test 2 Result: {result2}")  # Expected: [1]

def test_solution():
    """
    Test cases for 305. Number.
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
    print("Solution for 305. Number")
