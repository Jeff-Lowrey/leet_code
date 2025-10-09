"""
# Difficulty: Medium

# 261. Graph Valid Tree

Given a problem that demonstrates key concepts in Graphs.

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
    """
    Solution class for determining if a graph is a valid tree.
    A valid tree must:
    1. Be fully connected (all nodes can be reached)
    2. Have no cycles
    3. Have n-1 edges for n nodes
    """
    
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        """
        Determines if the given graph represents a valid tree.
        
        Args:
            n: Number of nodes (labeled from 0 to n-1)
            edges: List of edges, where each edge is [node1, node2]
            
        Returns:
            bool: True if the graph is a valid tree, False otherwise
        """
        # First check: A tree with n nodes must have exactly n-1 edges
        if len(edges) != n - 1:
            return False
            
        # Create adjacency list representation of the graph
        adj_list = defaultdict(list)
        for u, v in edges:
            adj_list[u].append(v)
            adj_list[v].append(u)
            
        # Use BFS to check if the graph is fully connected and has no cycles
        visited = set()
        queue = deque([0])  # Start from node 0
        
        while queue:
            node = queue.popleft()
            visited.add(node)
            
            for neighbor in adj_list[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        # If we visited all nodes, and we already verified we have n-1 edges,
        # then this must be a valid tree
        return len(visited) == n

    def validTree_dfs(self, n: int, edges: List[List[int]]) -> bool:
        """
        Alternative implementation using DFS.
        
        Args:
            n: Number of nodes (labeled from 0 to n-1)
            edges: List of edges, where each edge is [node1, node2]
            
        Returns:
            bool: True if the graph is a valid tree, False otherwise
        """
        if len(edges) != n - 1:
            return False
            
        # Create adjacency list
        adj_list = defaultdict(list)
        for u, v in edges:
            adj_list[u].append(v)
            adj_list[v].append(u)
            
        visited = set()
        
        def dfs(node: int, parent: int) -> bool:
            visited.add(node)
            
            for neighbor in adj_list[node]:
                if neighbor == parent:
                    continue
                if neighbor in visited:
                    return False
                if not dfs(neighbor, node):
                    return False
            return True
            
        return dfs(0, -1) and len(visited) == n

def test_solution():
    """
    Test cases for 261. Graph Valid Tree.
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
    print(f"Solution for 261. Graph Valid Tree")
