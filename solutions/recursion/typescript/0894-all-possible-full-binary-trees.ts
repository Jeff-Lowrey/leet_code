/**
 * # 894. All Possible Full Binary Trees
 *
 * Difficulty: Medium
 *
 * Solve the All Possible Full Binary Trees problem as described.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>* ```</dd>
 * <dt>Output:</dt>
 * <dd>* ```</dd>
 * <dt>Explanation:</dt>
 * <dd>Processing input produces the expected output</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: * - Recursion, Memoization, Tree construction, Combinatorial generation
 * **Data Structures**: * - Binary tree, Map (for memoization), Array
 * **Patterns**: * - Divide and conquer, Recursive tree building, Memoization
 * **Time Complexity**: **O(n²)**
 * **Space Complexity**: **O(n)**
 *
 * ### INTUITION:
 * The key insight is to solve this problem efficiently.
 *
 * ### APPROACH:
 * We solve this problem by implementing the required algorithm.
 *
 * ### WHY THIS WORKS:
 * This approach works because it correctly implements the problem requirements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * example input
 * ```
 *
 * Output:
 * ```
 * example output
 * ```

### TIME COMPLEXITY:
 * **O(n²)** - Analysis of time complexity
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Analysis of space complexity
 *
 * ### EDGE CASES:
 * - Handle empty input
 * - Handle boundary conditions
 *
 * </details>
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
