/**

 *
 * This problem demonstrates key concepts in tree construction from traversals.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Preorder gives us the root first, then left subtree, then right subtree.
 * Inorder gives us left subtree, then root, then right subtree.
 * By combining these patterns, we can uniquely reconstruct the binary tree.
 * The first element in preorder is always the root. Find this root in inorder
 * to determine left and right subtrees, then recursively build each subtree.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Preorder traversal visits root before subtrees (Root-Left-Right)
 * - Inorder traversal visits left subtree, then root, then right (Left-Root-Right)
 * - Root position in inorder divides tree into left and right parts
 * - Recursive structure naturally builds the tree from top to bottom
 *
 * TIME COMPLEXITY: O(n) where n is number of nodes
 * Each node is processed once, hashmap lookups are O(1)
 *
 * SPACE COMPLEXITY: O(n) for hashmap + O(h) for recursion stack
 * Where h is height of tree (worst case O(n) for skewed tree)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 *
 * Step 1: Root = 3 (first in preorder)
 * Step 2: Find 3 in inorder at index 1
 *         Left subtree: [9], Right subtree: [15,20,7]
 * Step 3: Recursively build:
 *         - Left: preorder=[9], inorder=[9] → node 9
 *         - Right: preorder=[20,15,7], inorder=[15,20,7]
 *           - Root = 20, Left=[15], Right=[7]
 *
 * Output:     3
 *            / \
 *           9  20
 *             /  \
 *            15   7
 * ```
 *
 * EDGE CASES:
 * - Empty arrays (return null)
 * - Single element (return single node)
 * - Left-skewed or right-skewed trees
 * - All elements unique (guaranteed by problem)
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * Main solution for Problem 105: Construct Binary Tree From Preorder And Inorder Traversal
 *
 * @param {number[]} preorder - Preorder traversal array
 * @param {number[]} inorder - Inorder traversal array
 * @return {TreeNode} - Root of constructed binary tree
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(n) for hashmap + O(h) for recursion
 */
function solve(preorder, inorder) {
    return buildTree(preorder, inorder);
}

/**
 * Approach 1: Optimized with HashMap for O(1) inorder lookups
 *
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
    if (!preorder || !inorder || preorder.length === 0 || inorder.length === 0) {
        return null;
    }

    // Build hashmap for O(1) inorder index lookups
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }

    let preorderIndex = 0;

    function buildTreeRecursive(inorderStart, inorderEnd) {
        if (inorderStart > inorderEnd) {
            return null;
        }

        // Root is the current element in preorder
        const rootVal = preorder[preorderIndex++];
        const root = new TreeNode(rootVal);

        // Find root position in inorder
        const rootIndex = inorderMap.get(rootVal);

        // Build left subtree first (preorder processes left before right)
        root.left = buildTreeRecursive(inorderStart, rootIndex - 1);
        // Build right subtree
        root.right = buildTreeRecursive(rootIndex + 1, inorderEnd);

        return root;
    }

    return buildTreeRecursive(0, inorder.length - 1);
}

/**
 * Approach 2: Simple recursive without hashmap optimization
 *
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTreeSimple(preorder, inorder) {
    if (!preorder || !inorder || preorder.length === 0 || inorder.length === 0) {
        return null;
    }

    // Root is first element in preorder
    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);

    // Find root in inorder
    const rootIndex = inorder.indexOf(rootVal);

    // Split arrays for left and right subtrees
    const leftPreorder = preorder.slice(1, rootIndex + 1);
    const leftInorder = inorder.slice(0, rootIndex);
    const rightPreorder = preorder.slice(rootIndex + 1);
    const rightInorder = inorder.slice(rootIndex + 1);

    // Recursively build subtrees
    root.left = buildTreeSimple(leftPreorder, leftInorder);
    root.right = buildTreeSimple(rightPreorder, rightInorder);

    return root;
}

/**
 * Approach 3: Iterative solution using stack
 *
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTreeIterative(preorder, inorder) {
    if (!preorder || preorder.length === 0) {
        return null;
    }

    const root = new TreeNode(preorder[0]);
    const stack = [root];
    let preIndex = 1;
    let inIndex = 0;

    while (preIndex < preorder.length) {
        let node = stack[stack.length - 1];

        if (node.val !== inorder[inIndex]) {
            // Create left child
            node.left = new TreeNode(preorder[preIndex++]);
            stack.push(node.left);
        } else {
            // Pop nodes that match inorder sequence
            while (stack.length > 0 && stack[stack.length - 1].val === inorder[inIndex]) {
                node = stack.pop();
                inIndex++;
            }
            // Create right child
            node.right = new TreeNode(preorder[preIndex++]);
            stack.push(node.right);
        }
    }

    return root;
}

/**
 * Helper function to convert tree to array for testing
 * @param {TreeNode} root
 * @return {number[]}
 */
function treeToArray(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }

    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }

    return result;
}

/**
 * Test cases for Problem 105: Construct Binary Tree From Preorder And Inorder Traversal
 */
function testSolution() {
    console.log('Testing 105. Construct Binary Tree From Preorder And Inorder Traversal');

    // Test case 1: Standard tree
    const preorder1 = [3, 9, 20, 15, 7];
    const inorder1 = [9, 3, 15, 20, 7];
    const result1 = solve(preorder1, inorder1);
    const expected1 = [3, 9, 20, null, null, 15, 7];
    const actual1 = treeToArray(result1);
    console.assert(JSON.stringify(actual1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(actual1)}`);

    // Test case 2: Single node
    const preorder2 = [1];
    const inorder2 = [1];
    const result2 = solve(preorder2, inorder2);
    const expected2 = [1];
    const actual2 = treeToArray(result2);
    console.assert(JSON.stringify(actual2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(actual2)}`);

    // Test case 3: Empty arrays
    const preorder3 = [];
    const inorder3 = [];
    const result3 = solve(preorder3, inorder3);
    console.assert(result3 === null,
        `Test 3 failed: expected null, got ${result3}`);

    // Test case 4: Left-skewed tree
    const preorder4 = [1, 2, 3];
    const inorder4 = [3, 2, 1];
    const result4 = solve(preorder4, inorder4);
    const expected4 = [1, 2, null, 3];
    const actual4 = treeToArray(result4);
    console.assert(JSON.stringify(actual4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(actual4)}`);

    // Test case 5: Right-skewed tree
    const preorder5 = [1, 2, 3];
    const inorder5 = [1, 2, 3];
    const result5 = solve(preorder5, inorder5);
    const expected5 = [1, null, 2, null, 3];
    const actual5 = treeToArray(result5);
    console.assert(JSON.stringify(actual5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(actual5)}`);

    // Test case 6: Perfect binary tree
    const preorder6 = [1, 2, 4, 5, 3, 6, 7];
    const inorder6 = [4, 2, 5, 1, 6, 3, 7];
    const result6 = solve(preorder6, inorder6);
    const expected6 = [1, 2, 3, 4, 5, 6, 7];
    const actual6 = treeToArray(result6);
    console.assert(JSON.stringify(actual6) === JSON.stringify(expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(actual6)}`);

    // Test alternative approaches give same results
    const resultSimple = buildTreeSimple(preorder1, inorder1);
    const actualSimple = treeToArray(resultSimple);
    console.assert(JSON.stringify(actualSimple) === JSON.stringify(expected1),
        'Simple approach should give same result');

    const resultIterative = buildTreeIterative(preorder1, inorder1);
    const actualIterative = treeToArray(resultIterative);
    console.assert(JSON.stringify(actualIterative) === JSON.stringify(expected1),
        'Iterative approach should give same result');

    console.log('All test cases passed for 105. Construct Binary Tree From Preorder And Inorder Traversal!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 105. Construct Binary Tree From Preorder And Inorder Traversal ===');
    console.log('Category: Trees');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    buildTree,
    buildTreeSimple,
    buildTreeIterative,
    TreeNode,
    treeToArray,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Three different approaches with different trade-offs:



 * - Key insight: preorder gives root, inorder splits left/right subtrees
 * - HashMap optimization crucial for large inputs to avoid O(n²) behavior
 * - Recursive approach naturally follows the tree construction pattern
 * - All approaches handle edge cases consistently
 * - Problem guarantees unique values, making solution deterministic
 */
