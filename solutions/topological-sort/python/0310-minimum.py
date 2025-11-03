"""
### INTUITION:
The key insight is that remove leaf nodes iteratively. Leaves have degree 1. After removing, new leaves may form. Repeat until <= 2 nodes remain. These are the MHT roots (centers of tree).

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
- This ensures that remove leaf nodes iteratively, process like topological sort
- This ensures that tree's center (1 or 2 nodes) are minimum height roots
- This ensures that bFS from leaves inward, last 1-2 nodes remaining are centers
- This ensures that in tree, at most 2 nodes can be minimum height roots
- This ensures that o(n) time: process each node once, O(n) space for adjacency list

### EXAMPLE WALKTHROUGH:
Input:
```
n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
```

Step 1: Build adjacency list
Degrees: [1,1,1,4,2,1]
Step 2: Remove leaves layer by layer
Remove 0,1,2,5: leaves=[3,4]
These are minimum height tree roots

Output:
```
[3,4]
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

</details>

"""

from collections import defaultdict

from typing import Any, List, Optional, Dict, Tuple


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
        adj_list: dict[Any, set[Any]] = defaultdict(set)
        for u, v in edges:
            adj_list[u].add(v)
            adj_list[v].add(u)

        # Start with leaves (nodes with only one neighbor)
        leaves = [node for node in range(n) if len(adj_list[node]) == 1]

        # Keep removing leaves until we reach the center(s)
        remaining_nodes = n
        while remaining_nodes > 2:
            remaining_nodes -= len(leaves)
            new_leaves: list[Any] = []

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


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findMinHeightTrees(6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]])
    expected = [3, 4]
    assert sorted(result) == sorted(expected), f"Expected expected, got result"

    # Test case 2: Line graph
    result = solution.findMinHeightTrees(4, [[1, 0], [1, 2], [1, 3]])
    expected = [1]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single node
    result = solution.findMinHeightTrees(1, [])
    expected = [0]
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Two nodes
    result = solution.findMinHeightTrees(2, [[0, 1]])
    expected = [0, 1]
    assert sorted(result) == sorted(expected), f"Expected expected, got result"

    # Test case 5: Star graph
    result = solution.findMinHeightTrees(5, [[0, 1], [0, 2], [0, 3], [0, 4]])
    expected = [0]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 310. Minimum")
