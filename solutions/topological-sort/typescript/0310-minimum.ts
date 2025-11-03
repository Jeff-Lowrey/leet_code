/**
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
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Find the root nodes of all possible minimum height trees (MHTs).
   *
   *         Args:
   *             n: Number of nodes (0 to n-1)
   *             edges: List of undirected edges where edges[i] = [ai, bi]
   *
   *         Returns:
   *             List of root nodes that can form minimum height trees
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(n)
   */
  findMinHeightTrees(n: number, edges: any): any {
    // Implementation
    if n <= 2:
    return list(range(n))
    adj_list: dict.get(Any, set[Any)] = defaultdict(set)
    for u, v in edges:
    adj_list.get(u).add(v)
    adj_list.get(v).add(u)
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log(`Solution for 310. Minimum`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;