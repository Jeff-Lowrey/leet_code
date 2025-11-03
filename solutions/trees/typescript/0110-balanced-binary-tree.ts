/**
### INTUITION:
A balanced binary tree requires that for every node, the heights of its left and right subtrees differ by at most 1. The key insight is to check this condition recursively while computing heights bottom-up.

### APPROACH:
Data structures: Binary Tree with DFS (**Depth-First** Search) traversal**
1. **Recursive Height Calculation**: Calculate height of each subtree recursively using DFS
2. **Balance Check**: For each node, check if |left_height - right_height| ≤ 1
3. **Early Termination**: If any subtree is unbalanced, immediately return -1 as sentinel value
4. **Bottom-Up (Post-order)**: Check balance condition while returning heights from leaves to root

### WHY THIS WORKS:
- Height-balanced property must hold for ALL nodes, not just root
- DFS recursion naturally checks every node in post-order (children before parent)
- Bottom-up approach avoids redundant height calculations
- Early termination with sentinel value (-1) optimizes for unbalanced trees
- Binary Tree structure enables efficient recursive height computation

### EXAMPLE WALKTHROUGH:
Input:
```
[3,9,20,null,null,15,7]
```

3
/ \
9  20
/  \
15   7

Step 1:** Check leaf nodes
- Node 9: height = 1, balanced ✓
- Node 15: height = 1, balanced ✓
- Node 7: height = 1, balanced ✓

Step 2:** Check node 20 (parent of 15 and 7)
- left_height = 1, right_height = 1, |1-1| = 0 ≤ 1 ✓

Step 3:** Check node 3 (root)
- left_height = 1, right_height = 2, |1-2| = 1 ≤ 1 ✓

Step 4:** Return result

Output:
```
true
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input
Each node is visited exactly once

### SPACE COMPLEXITY:
O(h)**
Where h is height of tree (recursion stack)

### EDGE CASES:
- **Empty tree**: Return True (null tree is balanced)
- **Single node**: Return True (height-balanced by definition)
- **Perfect binary tree**: All levels completely filled, always balanced
- **Linear tree (skewed)**: Height difference > 1, return False
- **Subtree unbalanced**: Early termination returns -1 immediately

</details>

*/

// TreeNode class definition
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
   * Check if binary tree is height-balanced.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             True if tree is balanced, False otherwise
   *
   *         Time Complexity: O(n) where n is number of nodes
   *         Space Complexity: O(h) where h is height of tree
   */
  isBalanced(root: TreeNode | null): boolean {
    const checkHeight = (node: TreeNode | null): number => {
      // Return height if balanced, -1 if unbalanced
      if (!node) {
        return 0;
      }

      const leftHeight = checkHeight(node.left);
      if (leftHeight === -1) {
        return -1;  // Left subtree is unbalanced
      }

      const rightHeight = checkHeight(node.right);
      if (rightHeight === -1) {
        return -1;  // Right subtree is unbalanced
      }

      // Check if current node is balanced
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;  // Current node is unbalanced
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(root) !== -1;
  }

  /**
   * Alternative approach using separate height function.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             True if tree is balanced, False otherwise
   */
  isBalancedAlternative(root: TreeNode | null): boolean {
    const getHeight = (node: TreeNode | null): number => {
      if (!node) {
        return 0;
      }
      return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    };

    const isBalancedHelper = (node: TreeNode | null): boolean => {
      if (!node) {
        return true;
      }

      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      return isBalancedHelper(node.left) && isBalancedHelper(node.right);
    };

    return isBalancedHelper(root);
  }

  /**
   * Iterative approach using stack and height calculation.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             True if tree is balanced, False otherwise
   */
  isBalancedIterative(root: TreeNode | null): boolean {
    if (!root) {
      return true;
    }

    const getHeight = (node: TreeNode | null): number => {
      if (!node) {
        return 0;
      }

      const stack: [TreeNode, number][] = [[node, 1]];
      let maxHeight = 0;
      const visited = new Map<TreeNode, number>();

      while (stack.length > 0) {
        const [current, height] = stack[stack.length - 1];

        if (visited.has(current)) {
          stack.pop();
          maxHeight = Math.max(maxHeight, visited.get(current)!);
          continue;
        }

        if (!current.left && !current.right) {
          visited.set(current, height);
          maxHeight = Math.max(maxHeight, height);
          stack.pop();
          continue;
        }

        let leftHeight = 0;
        let rightHeight = 0;

        if (current.right) {
          if (visited.has(current.right)) {
            rightHeight = visited.get(current.right)!;
          } else {
            stack.push([current.right, height + 1]);
            continue;
          }
        }

        if (current.left) {
          if (visited.has(current.left)) {
            leftHeight = visited.get(current.left)!;
          } else {
            stack.push([current.left, height + 1]);
            continue;
          }
        }

        const nodeHeight = Math.max(leftHeight, rightHeight) + 1;
        visited.set(current, nodeHeight);
        stack.pop();
      }

      return maxHeight;
    };

    const checkBalanced = (node: TreeNode | null): boolean => {
      if (!node) {
        return true;
      }

      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      return checkBalanced(node.left) && checkBalanced(node.right);
    };

    return checkBalanced(root);
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 110. Balanced Binary Tree ===");

  // Example 1: Balanced tree
  const tree1 = new TreeNode(3);
  tree1.left = new TreeNode(9);
  tree1.right = new TreeNode(20);
  tree1.right.left = new TreeNode(15);
  tree1.right.right = new TreeNode(7);

  const result1 = solution.isBalanced(tree1);
  console.log(`isBalanced([3,9,20,null,null,15,7]) -> ${result1}`);
  console.log("Tree structure:");
  console.log("       3");
  console.log("      / \\");
  console.log("     9  20");
  console.log("       /  \\");
  console.log("      15   7");
  console.log("Heights: 9=1, 15=1, 7=1, 20=2, 3=3. All differences ≤ 1 ✓");

  // Example 2: Unbalanced tree
  const tree2 = new TreeNode(1);
  tree2.left = new TreeNode(2);
  tree2.right = new TreeNode(2);
  tree2.left.left = new TreeNode(3);
  tree2.left.right = new TreeNode(3);
  tree2.left.left.left = new TreeNode(4);
  tree2.left.left.right = new TreeNode(4);

  const result2 = solution.isBalanced(tree2);
  console.log(`\nisBalanced([1,2,2,3,3,null,null,4,4]) -> ${result2}`);
  console.log("Tree structure:");
  console.log("         1");
  console.log("       /   \\");
  console.log("      2     2");
  console.log("     / \\");
  console.log("    3   3");
  console.log("   / \\");
  console.log("  4   4");
  console.log("Left subtree height = 4, Right subtree height = 1. |4-1| = 3 > 1 ✗");

  // Example 3: Algorithm comparison
  console.log("\nAlgorithm comparison:");
  const approaches: [string, (root: TreeNode | null) => boolean][] = [
    ["Optimized recursive", (root) => solution.isBalanced(root)],
    ["Alternative recursive", (root) => solution.isBalancedAlternative(root)],
    ["Iterative", (root) => solution.isBalancedIterative(root)],
  ];

  for (const [name, method] of approaches) {
    const result = method(tree1);
    console.log(`${name}: ${result}`);
  }

  console.log("\nKey insights:");
  console.log("1. Balance condition: |left_height - right_height| ≤ 1 for ALL nodes");
  console.log("2. Recursive approach with early termination is most efficient");
  console.log("3. Bottom-up calculation avoids redundant height computations");
  console.log("4. Empty trees and single nodes are always balanced");
  console.log("5. Time complexity: O(n), Space complexity: O(h)");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;