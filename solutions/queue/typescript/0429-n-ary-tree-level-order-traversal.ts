/**
### INTUITION:
The key insight is that similar to binary tree level-order traversal, but each node can have multiple children.
Use BFS to process nodes level by level, adding all children of each node to the queue.

### APPROACH:
1. **Handle edge case**: Return empty list if tree is empty
2. **Initialize BFS**: Use a deque with root node
3. **For each level**:
   - Process all nodes at current level
   - Collect values in order
   - Add all children of each node to queue for next level
4. **Return result**: List of lists representing each level

### WHY THIS WORKS:
- This ensures that bFS naturally processes nodes level by level
- This ensures that by tracking level boundaries (queue size), we process each level independently
- This ensures that for n-ary trees, we simply iterate through all children instead of just left/right
- This ensures that deque provides O(1) append/popleft operations

### EXAMPLE WALKTHROUGH:
Input:
```
Tree:        1
```

/  |  \\
3   2   4
/ \\
5   6
Level 0: [1]
Level 1: [3, 2, 4]
Level 2: [5, 6]
Result: [[1], [3, 2, 4], [5, 6]]

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)**
- Single pass through input
- Visit each node exactly once
- n = total number of nodes in tree

### SPACE COMPLEXITY:
O(w)**
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (max children at any level)
- Result storage: **O(n)**

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  /**
   * Level order traversal of n-ary tree.
   *
   * Args:
   *     root: Root node of n-ary tree
   *
   * Returns:
   *     List of lists containing node values in level order
   *
   * Time Complexity: O(n)
   * Space Complexity: O(w) where w is max width of tree
   */
  levelOrder(root: any): number[][] {
    if (!root) {
      return [];
    }
    const queue = deque([root]);
    while (queue) {
      const level_size = queue.length;
      for (let _ = 0; _ < level_size; _++) {
        const node = queue.popleft();
        level_values.append(node.val);
        for (const child of node.children) {
          queue.append(child);
        }
      }
      result.append(level_values);
    }
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