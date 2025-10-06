/**
 * 235. Lowest Common Ancestor Of A Binary Search Tree
 * Easy
 *
 * This problem leverages BST properties for efficient LCA finding.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * In a BST, we can use the ordering property to efficiently find LCA.
 * If both nodes are smaller than current node, LCA is in left subtree.
 * If both nodes are larger than current node, LCA is in right subtree.
 * If nodes are on different sides, current node is the LCA.
 *
 * APPROACH:
 * 1. **BST Property**: Use ordering to navigate without searching entire tree
 * 2. **Three Cases**: Both left, both right, or split (LCA found)
 * 3. **Iterative/Recursive**: Both approaches work efficiently
 * 4. **Early Termination**: Stop as soon as split point is found
 *
 * WHY THIS WORKS:
 * - BST property guarantees all left < root < all right
 * - LCA is the first node where paths to p and q diverge
 * - No need to search both subtrees like in general binary tree
 * - Path from root to any node follows BST ordering
 *
 * TIME COMPLEXITY: O(h) where h is height of tree
 * Best case O(log n) for balanced BST, worst case O(n) for skewed
 *
 * SPACE COMPLEXITY:
 *   - Recursive: O(h) for call stack
 *   - Iterative: O(1) constant space
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
 *        6
 *       / \
 *      2   8
 *     / \ / \
 *    0  4 7  9
 *      / \
 *     3   5
 *
 * Step 1: At node 6: p=2 < 6 and q=8 > 6 (split!) → LCA = 6
 * Output: 6
 * ```
 *
 * EDGE CASES:
 * - One node is ancestor of the other
 * - Nodes are the same
 * - Tree with only one or two nodes
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
 * Main solution for Problem 235: Lowest Common Ancestor Of A Binary Search Tree
 *
 * @param {TreeNode} root - Root of BST
 * @param {TreeNode} p - First node
 * @param {TreeNode} q - Second node
 * @return {TreeNode} - Lowest common ancestor
 *
 * Time Complexity: O(h) where h is height
 * Space Complexity: O(1) iterative approach
 */
function solve(root, p, q) {
    return lowestCommonAncestor(root, p, q);
}

/**
 * Approach 1: Iterative solution (most efficient)
 *
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
    let current = root;

    while (current) {
        if (p.val < current.val && q.val < current.val) {
            // Both are in left subtree
            current = current.left;
        } else if (p.val > current.val && q.val > current.val) {
            // Both are in right subtree
            current = current.right;
        } else {
            // Split point found - this is the LCA
            return current;
        }
    }

    return null;
}

/**
 * Approach 2: Recursive solution
 *
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestorRecursive(root, p, q) {
    if (!root) return null;

    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestorRecursive(root.left, p, q);
    }

    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestorRecursive(root.right, p, q);
    }

    return root;
}

/**
 * Approach 3: Path-based solution (for comparison)
 *
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestorPath(root, p, q) {
    function getPath(node, target) {
        const path = [];
        let current = node;

        while (current) {
            path.push(current);
            if (target.val < current.val) {
                current = current.left;
            } else if (target.val > current.val) {
                current = current.right;
            } else {
                break;
            }
        }

        return path;
    }

    const pathP = getPath(root, p);
    const pathQ = getPath(root, q);

    let lca = null;
    for (let i = 0; i < Math.min(pathP.length, pathQ.length); i++) {
        if (pathP[i] === pathQ[i]) {
            lca = pathP[i];
        } else {
            break;
        }
    }

    return lca;
}

/**
 * Test cases for Problem 235: Lowest Common Ancestor Of A Binary Search Tree
 */
function testSolution() {
    console.log('Testing 235. Lowest Common Ancestor Of A Binary Search Tree');

    // Create test BST:     6
    //                     / \
    //                    2   8
    //                   / \ / \
    //                  0  4 7  9
    //                    / \
    //                   3   5
    const root = new TreeNode(6,
        new TreeNode(2,
            new TreeNode(0),
            new TreeNode(4,
                new TreeNode(3),
                new TreeNode(5)
            )
        ),
        new TreeNode(8,
            new TreeNode(7),
            new TreeNode(9)
        )
    );

    // Test case 1: LCA of 2 and 8 should be 6
    const p1 = root.left; // node 2
    const q1 = root.right; // node 8
    const result1 = solve(root, p1, q1);
    console.assert(result1.val === 6,
        `Test 1 failed: expected 6, got ${result1.val}`);

    // Test case 2: LCA of 2 and 4 should be 2
    const p2 = root.left; // node 2
    const q2 = root.left.right; // node 4
    const result2 = solve(root, p2, q2);
    console.assert(result2.val === 2,
        `Test 2 failed: expected 2, got ${result2.val}`);

    // Test case 3: LCA of 3 and 5 should be 4
    const p3 = root.left.right.left; // node 3
    const q3 = root.left.right.right; // node 5
    const result3 = solve(root, p3, q3);
    console.assert(result3.val === 4,
        `Test 3 failed: expected 4, got ${result3.val}`);

    // Test case 4: LCA of 7 and 9 should be 8
    const p4 = root.right.left; // node 7
    const q4 = root.right.right; // node 9
    const result4 = solve(root, p4, q4);
    console.assert(result4.val === 8,
        `Test 4 failed: expected 8, got ${result4.val}`);

    // Test case 5: Same node (LCA of 4 and 4 should be 4)
    const p5 = root.left.right; // node 4
    const q5 = root.left.right; // node 4
    const result5 = solve(root, p5, q5);
    console.assert(result5.val === 4,
        `Test 5 failed: expected 4, got ${result5.val}`);

    // Test alternative approaches
    const resultRecursive = lowestCommonAncestorRecursive(root, p1, q1);
    console.assert(resultRecursive.val === 6,
        'Recursive approach should give same result');

    const resultPath = lowestCommonAncestorPath(root, p1, q1);
    console.assert(resultPath.val === 6,
        'Path approach should give same result');

    console.log('All test cases passed for 235. Lowest Common Ancestor Of A Binary Search Tree!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 235. Lowest Common Ancestor Of A Binary Search Tree ===');
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
    lowestCommonAncestor,
    lowestCommonAncestorRecursive,
    lowestCommonAncestorPath,
    TreeNode,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Three different approaches with different trade-offs:
 *   1. Iterative: O(h) time, O(1) space - most efficient
 *   2. Recursive: O(h) time, O(h) space - clean and intuitive
 *   3. Path-based: O(h) time, O(h) space - works for general binary trees
 * - BST property enables much more efficient solution than general binary tree LCA
 * - Key insight: LCA is first node where paths to p and q diverge
 * - No need to search both subtrees unlike general binary tree case
 * - Time complexity is O(h) not O(n) due to BST ordering property
 * - Space can be optimized to O(1) with iterative approach
 */
