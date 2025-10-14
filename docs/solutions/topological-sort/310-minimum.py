"""
# Difficulty: Medium

# 310. Minimum

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h)) are called minimum height trees (MHTs).

Return a list of all MHTs' root labels. You can return the answer in any order.

The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]</dd>
<dt>Output:</dt>
<dd>[3,4]</dd>
<dt>Explanation:</dt>
<dd>Minimum height tree roots are [0,1] for graph with edges [[0,1],[0,2],[0,3]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Remove leaf nodes iteratively. Leaves have degree 1. After removing, new leaves may form. Repeat until <= 2 nodes remain. These are the MHT roots (centers of tree).

### APPROACH:
1. **Handle edge cases**: If n <= 2, return list(range(n))
2. **Build adjacency list**: Create graph with edges
3. **Initialize leaves**: Find all nodes with degree 1
4. **Trim leaves iteratively**: While n > 2, process current leaves
5. **Remove leaves**: For each leaf, decrement neighbors' degrees
6. **Find new leaves**: Add neighbors with degree 1 to new_leaves
7. **Update n and leaves**: n -= len(leaves), leaves = new_leaves
8. **Return result**: Return remaining nodes as MHT roots

### WHY THIS WORKS:
- Remove leaf nodes iteratively, process like topological sort
- Tree's center (1 or 2 nodes) are minimum height roots
- BFS from leaves inward, last 1-2 nodes remaining are centers
- In tree, at most 2 nodes can be minimum height roots
- O(n) time: process each node once, O(n) space for adjacency list

### EXAMPLE WALKTHROUGH:
```
Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Step 1: Build adjacency list
  Degrees: [1,1,1,4,2,1]

Step 2: Remove leaves layer by layer
  Remove 0,1,2,5: leaves=[3,4]

  These are minimum height tree roots

Output: [3,4]
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

from collections import defaultdict

from typing import List, Optional, Dict, Tuple

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
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]])
    expected = [3,4]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    # Test case 2: Line graph
    result = solution.findMinHeightTrees(4, [[1,0],[1,2],[1,3]])
    expected = [1]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single node
    result = solution.findMinHeightTrees(1, [])
    expected = [0]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Two nodes
    result = solution.findMinHeightTrees(2, [[0,1]])
    expected = [0,1]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    # Test case 5: Star graph
    result = solution.findMinHeightTrees(5, [[0,1],[0,2],[0,3],[0,4]])
    expected = [0]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 310. Minimum")
