"""
# Difficulty: Hard

In a directed graph, return an edge that can be removed so that the resulting graph is a tree.
If there are multiple answers, return the answer that occurs last in the given input.

The input is a 2D array edges where each edges[i] = [ui, vi] represents a directed edge from ui to vi.

Example:
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Explanation: Removing [2,3] creates a valid tree.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>edges = [[1,2],[1,3],[2,3]]</dd>
<dt>Output:</dt>
<dd>[2,3]</dd>
<dt>Explanation:</dt>
<dd>Redundant directed edge that makes graph invalid</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n α(n))
**Space Complexity**: O(n)

### INTUITION:
A rooted tree has exactly one root (no parent) and all other nodes have exactly one parent.
Invalid scenarios: (1) node with 2 parents, (2) cycle. Use union-find to detect these.

### APPROACH:
1. **Find node with 2 parents**: If exists, one of those edges is redundant
2. **Try removing each candidate**: Check if remaining graph is valid tree
3. **Use Union-Find**: Detect cycles in directed graph
4. **Priority**: If both edges from 2-parent node cause issues, remove the later one

### WHY THIS WORKS:
Valid tree requires: (1) all nodes have ≤1 parent, (2) no cycles.
When a node has 2 parents, one must be removed. Union-find detects cycles.

### EXAMPLE WALKTHROUGH:
```
Input: edges = [[1,2],[1,3],[2,3]]
Step 1: Find node with 2 parents
  Node 3 has parents 1 and 2

Step 2: Try removing each edge to node 3
  Remove [1,3]: still cycle exists
  Remove [2,3]: forms valid tree ✓

Output: [2,3]
```

### TIME COMPLEXITY:
O(n α(n))

### SPACE COMPLEXITY:
O(n)

### EDGE CASES:
- **Node with two parents, no cycle**: Remove the later edge to that node
- **Node with two parents and cycle**: Remove the edge that breaks both issues
- **Cycle without two parents**: Return the last edge that creates the cycle
- **All edges form valid tree except one**: Union-find detects the redundant edge
- **Single edge graph**: Return that edge if it creates self-loop

</details>
"""
import re




class UnionFind:
    """Union-Find (Disjoint Set Union) data structure."""

    def __init__(self, n: int) -> None:
        """Initialize with n elements."""
        self.parent = list(range(n))
        self.rank = [0] * n


    @property
    def components(self) -> int:
        """Return number of connected components."""
        return len(set(self.find(i) for i in range(len(self.parent))))

    def find(self, x: int) -> int:
        """Find root of element x with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """Union two sets. Returns True if they were in different sets."""
        px, py = self.find(x), self.find(y)
        if px == py:
            return False

        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1

        return True

    def connected(self, x: int, y: int) -> bool:
        """Check if two elements are in the same set."""
        return self.find(x) == self.find(y)


class Solution:
    def findRedundantDirectedConnection(self, edges: list[list[int]]) -> list[int]:
        """
        Approach: Union-Find with parent tracking
        Time Complexity: O(n α(n))
        Space Complexity: O(n)
        """
        n = len(edges)
        parent: dict[int, int] = {}
        candidate1 = candidate2 = None

        # Find node with two parents
        for u, v in edges:
            if v in parent:
                # Node v has two parents
                candidate1 = [parent[v], v]  # First edge
                candidate2 = [u, v]  # Second edge
                break
            parent[v] = u

        # Try removing candidate2 (if exists)
        uf = UnionFind(n)
        for u, v in edges:
            if candidate2 and [u, v] == candidate2:
                continue  # Skip this edge
            if not uf.union(u, v):
                # Cycle detected
                if candidate1:
                    # Node had 2 parents and cycle exists
                    return candidate1
                else:
                    # No node with 2 parents, just a cycle
                    return [u, v]

        # No cycle when candidate2 removed
        return candidate2 if candidate2 else []


def test_solution() -> None:
    """Test cases for Problem 685."""
    solution = Solution()

    # Test case 1: Node with two parents, no cycle
    assert solution.findRedundantDirectedConnection([[1, 2], [1, 3], [2, 3]]) == [2, 3]
    print("Test case 1 passed: Two parents")

    # Test case 2: Node with two parents and cycle
    assert solution.findRedundantDirectedConnection([[1, 2], [2, 3], [3, 4], [4, 1], [1, 5]]) == [4, 1]
    print("Test case 2 passed: Two parents with cycle")

    # Test case 3: Simple cycle, no two parents
    assert solution.findRedundantDirectedConnection([[2, 1], [3, 1], [4, 2], [1, 4]]) == [2, 1]
    print("Test case 3 passed: Simple cycle")

    # Test case 4: Three nodes
    assert solution.findRedundantDirectedConnection([[1, 2], [2, 3], [3, 1]]) == [3, 1]
    print("Test case 4 passed: Three node cycle")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
