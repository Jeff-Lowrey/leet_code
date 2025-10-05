I'll help you create a solution for inverting a binary tree in JavaScript. I'll include detailed comments and handle edge cases appropriately.

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Inverts a binary tree by swapping all left and right child nodes recursively.
 * @param {TreeNode} root - The root node of the binary tree
 * @return {TreeNode} - The root node of the inverted binary tree
 */
function invertTree(root) {
    // Base case: if root is null, return null
    if (root === null) {
        return null;
    }
    
    // Store the left and right children
    const leftChild = root.left;
    const rightChild = root.right;
    
    // Swap the children
    root.left = invertTree(rightChild);
    root.right = invertTree(leftChild);
    
    // Return the root node
    return root;
}

/**
 * Alternative iterative solution using a queue
 * @param {TreeNode} root - The root node of the binary tree
 * @return {TreeNode} - The root node of the inverted binary tree
 */
function invertTreeIterative(root) {
    // If tree is empty, return null
    if (root === null) {
        return null;
    }
    
    // Create a queue and add root node
    const queue = [root];
    
    // Process nodes in the queue
    while (queue.length > 0) {
        // Get the current node
        const current = queue.shift();
        
        // Swap the left and right children
        const temp = current.left;
        current.left = current.right;
        current.right = temp;
        
        // Add non-null children to the queue
        if (current.left !== null) {
            queue.push(current.left);
        }
        if (current.right !== null) {
            queue.push(current.right);
        }
    }
    
    // Return the root node
    return root;
}

/**
 * Helper function to create a binary tree node
 * @param {number} val - The value of the node
 * @param {TreeNode} left - The left child node
 * @param {TreeNode} right - The right child node
 * @return {TreeNode} - A new TreeNode instance
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example usage:
function example() {
    // Create a sample binary tree
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(9);
    
    // Invert the tree using recursive method
    const invertedTree = invertTree(root);
    
    // Create another tree for iterative method
    const root2 = new TreeNode(4);
    root2.left = new TreeNode(2);
    root2.right = new TreeNode(7);
    root2.left.left = new TreeNode(1);
    root2.left.right = new TreeNode(3);
    root2.right.left = new TreeNode(6);
    root2.right.right = new TreeNode(9);
    
    // Invert the tree using iterative method
    const invertedTree2 = invertTreeIterative(root2);
    
    return {
        recursive: invertedTree,
        iterative: invertedTree2
    };
}

// Export the functions for use in other modules
module.exports = {
    invertTree,
    invertTreeIterative,
    TreeNode
};
```

This implementation provides two different approaches to inverting a binary tree:

1. A recursive solution (`invertTree`):
   - Simple and elegant
   - Uses recursion to swap left and right children
   - Time complexity: O(n) where n is the number of nodes
   - Space complexity: O(h) where h is the height of the tree (due to recursion stack)

2. An iterative solution (`invertTreeIterative`):
   - Uses a queue to process nodes level by level
   - Might be more efficient for very deep trees
   - Time complexity: O(n) where n is the number of nodes
   - Space complexity: O(w) where w is the maximum width of the tree

The code includes:
- Clear documentation and comments
- A TreeNode class definition
- Example usage
- Proper error handling for edge cases (null inputs)
- Module exports for use in other files

Both solutions will correctly invert a binary tree by swapping all left and right child nodes recursively or iteratively. The choice between the two implementations might depend on factors such as:
- Tree depth (very deep trees might benefit from the iterative approach)
- Code readability requirements (recursive solution is more concise)
- Stack size limitations in the execution environment