/**
 * LeetCode Problem 894: All Possible Full Binary Trees
 * Difficulty: Medium
 * Category: Recursion
 *
 * Problem Description:
 * Given an integer n, return a list of all possible full binary trees with n nodes. Each node
 * of each tree in the answer must have Node.val == 0.
 *
 * A full binary tree is a binary tree where each node has exactly 0 or 2 children.
 *
 * Example 1:
 * Input: n = 7
 * Output: 5 different trees
 *
 * Example 2:
 * Input: n = 3
 * Output: [[0,0,0]]
 *
 * Constraints:
 * - 1 <= n <= 20
 *
 * METADATA:
 * Techniques:
 * - Recursion, Memoization, Tree construction, Combinatorial generation
 *
 * Data Structures:
 * - Binary tree, Map (for memoization), Array
 *
 * Patterns:
 * - Divide and conquer, Recursive tree building, Memoization
 *
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
 */

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function allPossibleFBT(n) {
    const memo = new Map();

    function helper(nodes) {
        if (memo.has(nodes)) {
            return memo.get(nodes);
        }

        if (nodes === 1) {
            return [new TreeNode(0)];
        }

        if (nodes % 2 === 0) {
            return [];
        }

        const result = [];
        for (let leftNodes = 1; leftNodes < nodes; leftNodes += 2) {
            const rightNodes = nodes - 1 - leftNodes;
            const leftTrees = helper(leftNodes);
            const rightTrees = helper(rightNodes);

            for (const left of leftTrees) {
                for (const right of rightTrees) {
                    const root = new TreeNode(0);
                    root.left = left;
                    root.right = right;
                    result.push(root);
                }
            }
        }

        memo.set(nodes, result);
        return result;
    }

    return helper(n);
}

if (require.main === module) {
    const testCases = [
        [1, 1],
        [3, 1],
        [5, 2],
        [7, 5],
    ];

    console.log("Testing allPossibleFBT:");
    for (const [n, expectedCount] of testCases) {
        const result = allPossibleFBT(n);
        const count = result.length;
        const status = count === expectedCount ? "✓" : "✗";
        console.log(`${status} allPossibleFBT(${n}) returned ${count} trees, expected ${expectedCount}`);
    }
}

module.exports = { allPossibleFBT, TreeNode };
