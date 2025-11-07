/**
### INTUITION:
The key insight is that use level-order traversal (BFS) to process nodes level by level.
For each level, track the maximum value among all nodes at that level.

### APPROACH:
1. **Handle edge case**: Return empty list if tree is empty
2. **Initialize BFS**: Use a deque with root node
3. **For each level**:
   - Process all nodes at current level
   - Track maximum value seen at this level
   - Add maximum to result
   - Add children to queue for next level

### WHY THIS WORKS:
- This ensures that bFS processes nodes level by level
- This ensures that within each level, we can easily find the maximum value
- This ensures that by processing level boundaries (queue size), we separate levels
- This ensures that each level's maximum is independent of other levels

### EXAMPLE WALKTHROUGH:
Input:
```
Tree:      1
```

/   \\
3     2
/ \\     \\
5   3     9
Level 0: max = 1
Level 1: max = max(3, 2) = 3
Level 2: max = max(5, 3, 9) = 9
Result: [1, 3, 9]

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)**
- Single pass through input
- Visit each node exactly once
- n = number of nodes in tree

### SPACE COMPLEXITY:
O(w)**
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (worst case: n/2 for complete tree)
- Result storage: **O(h)** where h = height

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  /**
   * Find largest value in each row of binary tree.
   *
   * Args:
   *     root: Root node of binary tree
   *
   * Returns:
   *     List of maximum values for each level
   *
   * Time Complexity: O(n)
   * Space Complexity: O(w) where w is max width of tree
   */
  largestValues(root: any): number[] {
    if (!root) {
      return [];
    }
    const queue = deque([root]);
    while (queue) {
      const level_size = queue.length;
      const level_max = float("-inf");
      for (let _ = 0; _ < level_size; _++) {
        const node = queue.popleft();
        const level_max = max(level_max, node.val);
        if (node.left) {
          queue.append(node.left);
        }
        if (node.right) {
          queue.append(node.right);
        }
      }
      result.append(level_max);
    }
    return result;
  }

  /**
   * Alternative DFS solution using depth tracking.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(h) where h is height (recursion stack)
   */
  largestValues_dfs(root: any): number[] {
    dfs(root, 0);
    return result;
  }

}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution();
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;