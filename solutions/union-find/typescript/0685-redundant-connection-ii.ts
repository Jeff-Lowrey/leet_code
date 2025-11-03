/**
### INTUITION:
The key insight is that a rooted tree has exactly one root (no parent) and all other nodes have exactly one parent.
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
Input:
```
edges = [[1,2],[1,3],[2,3]]
```

Step 1: Find node with 2 parents
Node 3 has parents 1 and 2
Step 2: Try removing each edge to node 3
Remove [1,3]: still cycle exists
Remove [2,3]: forms valid tree ✓

Output:
```
[2,3]
```

### TIME COMPLEXITY:
O(n α(n)**) - Union-find operations with path compression and union by rank

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage

### EDGE CASES:
- **Node with two parents, no cycle**: Remove the later edge to that node
- **Node with two parents and cycle**: Remove the edge that breaks both issues
- **Cycle without two parents**: Return the last edge that creates the cycle
- **All edges form valid tree except one**: Union-find detects the redundant edge
- **Single edge graph**: Return that edge if it creates self-loop

</details>

</details>

*/

class Solution {
  /**
   * Approach: Union-Find with parent tracking
   *         Time Complexity: O(n α(n))
   *         Space Complexity: O(n)
   */
  findRedundantDirectedConnection(edges: number[][]): number[] {
    // Implementation
    n = edges.length
    parent: dict[int, int] = {}
    candidate1 = candidate2 = null
    for u, v in edges:
    if (parent.has(v)) {
    candidate1 = [parent.get(v), v]  // First edge
    candidate2 = [u, v]  // Second edge
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;