/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Pointers meet:** Handle when left == right
 * - **Empty input:** Check for null or empty arrays
 * - **Single element:** One pointer scenario
 * - **All duplicates:** Pointer movement with same values
 * - **Boundary crossing:** Prevent left > right
 *
 * </details>
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
 * Main solution for Problem 226: Invert Binary Tree
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {TreeNode} - Root of inverted tree
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(h) where h is height of tree
 */
function solve(root) {
    return invertTree(root);
}

/**
 * Approach 1: Recursive inversion
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {
    if (!root) return null;

    // Swap left and right children
    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    // Recursively invert subtrees
    invertTree(root.left);
    invertTree(root.right);

    return root;
}

/**
 * Approach 2: Iterative BFS with queue
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTreeBFS(root) {
    if (!root) return null;

    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();

        // Swap children
        const temp = node.left;
        node.left = node.right;
        node.right = temp;

        // Add children to queue for processing
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return root;
}

/**
 * Approach 3: Iterative DFS with stack
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTreeDFS(root) {
    if (!root) return null;

    const stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();

        // Swap children
        const temp = node.left;
        node.left = node.right;
        node.right = temp;

        // Add children to stack for processing
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }

    return root;
}

/**
 * Approach 4: Recursive with explicit swap function
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTreeSwap(root) {
    function swap(node) {
        if (!node) return;

        // Swap children
        [node.left, node.right] = [node.right, node.left];

        // Recursively process children
        swap(node.left);
        swap(node.right);
    }

    swap(root);
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
 * Test cases for Problem 226: Invert Binary Tree
 */
function testSolution() {
    console.log('Testing 226. Invert Binary Tree');

    // Test case 1: Standard tree
    const tree1 = new TreeNode(4,
        new TreeNode(2,
            new TreeNode(1),
            new TreeNode(3)
        ),
        new TreeNode(7,
            new TreeNode(6),
            new TreeNode(9)
        )
    );
    const result1 = solve(tree1);
    const expected1 = [4, 7, 2, 9, 6, 3, 1];
    const actual1 = treeToArray(result1);
    console.assert(JSON.stringify(actual1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(actual1)}`);

    // Test case 2: Single node
    const tree2 = new TreeNode(1);
    const result2 = solve(tree2);
    const expected2 = [1];
    const actual2 = treeToArray(result2);
    console.assert(JSON.stringify(actual2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(actual2)}`);

    // Test case 3: Empty tree
    const result3 = solve(null);
    console.assert(result3 === null,
        `Test 3 failed: expected null, got ${result3}`);

    // Test case 4: Left-skewed tree
    const tree4 = new TreeNode(1,
        new TreeNode(2,
            new TreeNode(3),
            null
        ),
        null
    );
    const result4 = solve(tree4);
    const expected4 = [1, null, 2, null, 3];
    const actual4 = treeToArray(result4);
    console.assert(JSON.stringify(actual4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(actual4)}`);

    // Test case 5: Simple tree
    const tree5 = new TreeNode(2,
        new TreeNode(1),
        new TreeNode(3)
    );
    const result5 = solve(tree5);
    const expected5 = [2, 3, 1];
    const actual5 = treeToArray(result5);
    console.assert(JSON.stringify(actual5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(actual5)}`);

    console.log('All test cases passed for 226. Invert Binary Tree!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 226. Invert Binary Tree ===');
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
    invertTree,
    invertTreeBFS,
    invertTreeDFS,
    invertTreeSwap,
    TreeNode,
    treeToArray,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Four different approaches with same time complexity:




 * - All approaches modify tree in-place and return root
 * - Time: O(n) for all approaches (visit each node once)
 * - Space: O(h) recursive, O(w) iterative where h=height, w=width
 * - Tree inversion is its own inverse (invert twice = original)
 * - Famous problem: inspired by Google interview question
 */
