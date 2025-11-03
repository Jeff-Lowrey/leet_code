/**
### INTUITION:
The key insight is that use level-order traversal (BFS) to calculate the sum of values at each level.
Track the level with maximum sum and return the smallest level if there are ties.

### APPROACH:
1. **Handle edge case**: Return 0 if tree is empty (though problem guarantees non-empty tree)
2. **Initialize BFS**: Use a deque with root node
3. **Track variables**:
   - Current level number
   - Maximum sum seen so far
   - Level with maximum sum
4. **For each level**:
   - Calculate sum of all node values at current level
   - If sum > max_sum, update max_sum and max_level
   - Add children to queue for next level

### WHY THIS WORKS:
- This ensures that bFS processes nodes level by level
- This ensures that by tracking level sums, we can find the level with maximum sum
- Since we process levels in order (1, 2, 3, ...), the first maximum we find is the smallest level

### EXAMPLE WALKTHROUGH:
Input:
```
Tree:      1
```

/   \
7     0
/ \
7  -8
Level 1: sum = 1
Level 2: sum = 7 + 0 = 7 (max)
Level 3: sum = 7 + (-8) = -1
Result: 2

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

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

class Solution {
  /**
   * Find level with maximum sum using BFS.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(w)
   */
  maxLevelSum(root: TreeNode | null): number {
    if (!root) {
      return 0;
    }

    let maxSum = -Infinity;
    let maxLevel = 1;
    let currentLevel = 1;

    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
      const levelSize = queue.length;
      let levelSum = 0;

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()!;
        levelSum += node.val;

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      if (levelSum > maxSum) {
        maxSum = levelSum;
        maxLevel = currentLevel;
      }

      currentLevel++;
    }

    return maxLevel;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Solution, TreeNode };
}

function runTests(): void {
  const solution = new Solution();

  const root1 = new TreeNode(1);
  root1.left = new TreeNode(7);
  root1.right = new TreeNode(0);
  root1.left.left = new TreeNode(7);
  root1.left.right = new TreeNode(-8);
  console.log(`Test 1: ${solution.maxLevelSum(root1) === 2 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
export { TreeNode };
