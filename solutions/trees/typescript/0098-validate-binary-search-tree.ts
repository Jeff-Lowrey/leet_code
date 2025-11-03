/**
### INTUITION:
The key insight is that recursively validate each subtree. For each node, check: left < node < right, and both subtrees are valid BSTs. Pass valid range down: left subtree max < node, right subtree min > node.

### APPROACH:
1. **Define helper function**: Implement validate(node, min_val, max_val)
2. **Base case**: If node is None, return True
3. **Check BST property**: If node.val <= min_val or node.val >= max_val, return False
4. **Validate left subtree**: Recursively check left with updated max_val = node.val
5. **Validate right subtree**: Recursively check right with updated min_val = node.val
6. **Return combined**: Return left_valid and right_valid
7. **Start validation**: Call validate(root, float('-inf'), float('inf'))

### WHY THIS WORKS:
- In-order traversal of BST produces sorted sequence
- Track previous value: if current <= prev, not a valid BST
- Alternative: pass min/max bounds, ensure node.val in (min, max)
- Left subtree must be < node.val, right subtree must be > node.val
- O(n) time visiting all nodes, O(h) space for recursion stack

### EXAMPLE WALKTHROUGH:
Input:
```
root = [2,1,3]
```

Step 1: In-order traversal
Visit left (1), root (2), right (3)
Sequence: 1, 2, 3
Step 2: Check if sorted
1 < 2 < 3 ✓

Output:
```
True (valid BST)
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
   * Validates if the given binary tree is a valid Binary Search Tree (BST).
   *
   * Time Complexity: O(n)
   * Space Complexity: O(h) where h is height of tree
   */
  isValidBST(root: TreeNode | null): boolean {
    const validate = (node: TreeNode | null, minVal: number, maxVal: number): boolean => {
      // Empty tree is valid BST
      if (!node) {
        return true;
      }

      // Check if current node's value is within valid range
      if (node.val <= minVal || node.val >= maxVal) {
        return false;
      }

      // Recursively validate left and right subtrees
      // For left subtree: all values must be less than current node's value
      // For right subtree: all values must be greater than current node's value
      return validate(node.left, minVal, node.val) && validate(node.right, node.val, maxVal);
    };

    // Start validation with initial range (-infinity, +infinity)
    return validate(root, -Infinity, Infinity);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Helper to build tree from array
  function buildTree(arr: (number | null)[]): TreeNode | null {
    if (!arr.length || arr[0] === null) return null;

    const root = new TreeNode(arr[0]);
    const queue: TreeNode[] = [root];
    let i = 1;

    while (i < arr.length) {
      const node = queue.shift()!;

      if (i < arr.length && arr[i] !== null) {
        node.left = new TreeNode(arr[i]!);
        queue.push(node.left);
      }
      i++;

      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]!);
        queue.push(node.right);
      }
      i++;
    }

    return root;
  }

  const tree1 = buildTree([2, 1, 3]);
  console.log(`Test 1: ${solution.isValidBST(tree1) === true ? "PASS" : "FAIL"}`);

  const tree2 = buildTree([5, 1, 4, null, null, 3, 6]);
  console.log(`Test 2: ${solution.isValidBST(tree2) === false ? "PASS" : "FAIL"}`);

  const tree3 = buildTree([1]);
  console.log(`Test 3: ${solution.isValidBST(tree3) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
