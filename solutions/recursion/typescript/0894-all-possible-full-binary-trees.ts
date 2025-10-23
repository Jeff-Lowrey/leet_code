/**
 * # 894. All Possible Full Binary Trees
 *
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
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function allPossibleFBT(n: number): Array<TreeNode | null> {
    const memo: Map<number, Array<TreeNode | null>> = new Map();

    function helper(nodes: number): Array<TreeNode | null> {
        if (memo.has(nodes)) {
            return memo.get(nodes)!;
        }

        if (nodes === 1) {
            return [new TreeNode(0)];
        }

        if (nodes % 2 === 0) {
            return [];
        }

        const result: Array<TreeNode | null> = [];
        for (let leftNodes = 1; leftNodes < nodes; leftNodes += 2) {
            const rightNodes: number = nodes - 1 - leftNodes;
            const leftTrees: Array<TreeNode | null> = helper(leftNodes);
            const rightTrees: Array<TreeNode | null> = helper(rightNodes);

            for (const left of leftTrees) {
                for (const right of rightTrees) {
                    const root: TreeNode = new TreeNode(0);
                    root.left = left as TreeNode;
                    root.right = right as TreeNode;
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
    const testCases: [number, number][] = [
        [1, 1],
        [3, 1],
        [5, 2],
        [7, 5],
    ];

    console.log("Testing allPossibleFBT:");
    for (const [n, expectedCount] of testCases) {
        const result: Array<TreeNode | null> = allPossibleFBT(n);
        const count: number = result.length;
        const status: string = count === expectedCount ? "✓" : "✗";
        console.log(`${status} allPossibleFBT(${n}) returned ${count} trees, expected ${expectedCount}`);
    }
}

export { allPossibleFBT, TreeNode };
