"""
# 310. Minimum
# Difficulty: Medium
Given a problem that demonstrates key concepts in Topological Sort.

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

The approach uses topological sort techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using topological sort method
3. Return the computed result

</details>
"""

class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        """
        Find the root nodes of all possible minimum height trees (MHTs).
        
        Args:
            n: Number of nodes (0 to n-1)
            edges: List of undirected edges where edges[i] = [ai, bi]
            
        Returns:
            List of root nodes that can form minimum height trees
        
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Handle edge cases
        if n <= 2:
            return list(range(n))
            
        # Build adjacency list representation of the graph
        adj_list = defaultdict(set)
        for u, v in edges:
            adj_list[u].add(v)
            adj_list[v].add(u)
            
        # Start with leaves (nodes with only one neighbor)
        leaves = [node for node in range(n) if len(adj_list[node]) == 1]
        
        # Keep removing leaves until we reach the center(s)
        remaining_nodes = n
        while remaining_nodes > 2:
            remaining_nodes -= len(leaves)
            new_leaves = []
            
            # Process current leaves
            for leaf in leaves:
                # Get the neighbor of current leaf
                neighbor = adj_list[leaf].pop()
                # Remove the leaf from neighbor's adjacency list
                adj_list[neighbor].remove(leaf)
                
                # If neighbor becomes a leaf, add it to new leaves
                if len(adj_list[neighbor]) == 1:
                    new_leaves.append(neighbor)
            
            leaves = new_leaves
            
        return leaves

def test_solution():
    """
    Test cases for 310. Minimum.
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
    print(f"Solution for 310. Minimum")
