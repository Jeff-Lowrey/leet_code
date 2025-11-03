/**
### INTUITION:
Inorder traversal visits nodes in the order: Left -> Root -> Right. This gives us a sorted sequence for **Binary Search** Trees. The key is to implement this pattern using recursion or iteration with a stack.

### APPROACH:
1. **Recursive**: Visit left subtree, process root, visit right subtree
2. **Iterative with stack**: Simulate recursion using explicit stack
3. **Morris traversal**: O(1) space using threading technique

### WHY THIS WORKS:
- Inorder traversal naturally follows left-root-right pattern
- For BSTs, this produces sorted output
- Stack-based approach simulates the call stack of recursion
- Morris traversal modifies tree temporarily to avoid extra space



This solution uses two pointers for efficient implementation.
- DFS recursively explores all paths from a starting point, completely visiting each branch before backtracking

### EXAMPLE WALKTHROUGH:
Given input Tree:    1:

Input:
```
Tree:    1
```

\
2
/
3

Step 1:** Start at root (1)
- No left child, process 1

Step 2:** Go to right child (2)
- Has left child (3), go left first

Step 3:** Process left child (3)
- No left child of 3, process 3
- No right child of 3, backtrack

Step 4:** Process node 2
- No right child of 2

Output:
```
[1, 3, 2]
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input
We visit each node exactly once

### SPACE COMPLEXITY:
- Recursive: **O(h)** where h is tree height (call stack)
- Iterative: **O(h)** for explicit stack
- Morris: **O(1)** constant space

### EDGE CASES:
- **Empty tree**: Return empty list immediately
- **Single node**: Return list with one element
- **Left-skewed tree**: Traversal order is leaf-to-root path
- **Right-skewed tree**: Traversal order is root-to-leaf path
- **BST**: Inorder gives sorted sequence of values

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
   * Recursive inorder traversal.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of node values in inorder sequence
   *
   *         Time Complexity: O(n) where n is number of nodes
   *         Space Complexity: O(h) where h is height of tree (recursion stack)
   */
  inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];

    const inorder = (node: TreeNode | null): void => {
      if (!node) {
        return;
      }
      inorder(node.left);  // Visit left subtree
      result.push(node.val);  // Process current node
      inorder(node.right);  // Visit right subtree
    };

    inorder(root);
    return result;
  }

  /**
   * Iterative inorder traversal using stack.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of node values in inorder sequence
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(h) for stack
   */
  inorderTraversalIterative(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;

    while (stack.length > 0 || current !== null) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop()!;
      result.push(current.val);
      current = current.right;
    }

    return result;
  }

  /**
   * Morris inorder traversal with O(1) space.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of node values in inorder sequence
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(1) constant space
   */
  inorderTraversalMorris(root: TreeNode | null): number[] {
    const result: number[] = [];
    let current: TreeNode | null = root;

    while (current !== null) {
      if (!current.left) {
        result.push(current.val);
        current = current.right;
      } else {
        // Find the inorder predecessor
        let predecessor = current.left;
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          // Create thread
          predecessor.right = current;
          current = current.left;
        } else {
          // Remove thread
          predecessor.right = null;
          result.push(current.val);
          current = current.right;
        }
      }
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

  console.log("=== 94. Binary Tree **Inorder Traversal** ===");

  // Example 1: Simple tree
  const root1 = new TreeNode(1);
  root1.right = new TreeNode(2);
  root1.right.left = new TreeNode(3);
  console.log(`Tree 1 inorder: ${JSON.stringify(solution.inorderTraversal(root1))}`);

  // Example 2: BST (should give sorted output)
  const bstRoot = new TreeNode(4);
  bstRoot.left = new TreeNode(2);
  bstRoot.right = new TreeNode(6);
  bstRoot.left.left = new TreeNode(1);
  bstRoot.left.right = new TreeNode(3);
  bstRoot.right.left = new TreeNode(5);
  bstRoot.right.right = new TreeNode(7);
  console.log(`BST inorder (sorted): ${JSON.stringify(solution.inorderTraversal(bstRoot))}`);

  // Example 3: Compare different approaches
  console.log("\nComparison of approaches on BST:");
  const approaches: [string, (root: TreeNode | null) => number[]][] = [
    ["Recursive", (root) => solution.inorderTraversal(root)],
    ["Iterative", (root) => solution.inorderTraversalIterative(root)],
    ["Morris O(1) space", (root) => solution.inorderTraversalMorris(root)],
  ];

  for (const [name, method] of approaches) {
    const result = method(bstRoot);
    console.log(`${name}: ${JSON.stringify(result)}`);
  }

  // Example 4: Empty tree
  console.log(`\nEmpty tree: ${JSON.stringify(solution.inorderTraversal(null))}`);

  // Example 5: Single node
  const single = new TreeNode(42);
  console.log(`Single node [42]: ${JSON.stringify(solution.inorderTraversal(single))}`);

  console.log("\nKey insights:");
  console.log("1. Inorder: Left -> Root -> Right");
  console.log("2. For BST, inorder gives sorted sequence");
  console.log("3. Recursive: Clean but uses O(h) space");
  console.log("4. Iterative: Explicit stack control");
  console.log("5. Morris: O(1) space using threading");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;