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
 *
 * **Step 1:** [description]
 *
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

// Definition for a Node
function Node(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
}

/**
 * Main solution for Problem 116: Populating Next Right Pointers In Each Node
 *
 * @param {Node} root - Root of the perfect binary tree
 * @return {Node} - Root with next pointers populated
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is maximum width
 */
function solve(root) {
    if (!root) return null;

    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // Connect to next node in the same level
            if (i < levelSize - 1) {
                node.next = queue[0]; // Peek at next node
            }

            // Add children to queue
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return root;
}

/**
 * Test cases for Problem 116: Populating Next Right Pointers In Each Node
 */
function testSolution() {
    console.log('Testing 116. Populating Next Right Pointers In Each Node');

    // Test case 1: Perfect binary tree
    const node7 = new Node(7);
    const node6 = new Node(6);
    const node5 = new Node(5);
    const node4 = new Node(4);
    const node3 = new Node(3, node6, node7);
    const node2 = new Node(2, node4, node5);
    const tree1 = new Node(1, node2, node3);

    const result1 = solve(tree1);
    console.assert(result1.next === null, 'Test 1 failed: root.next should be null');
    console.assert(result1.left.next === result1.right, 'Test 1 failed: 2.next should be 3');
    console.assert(result1.right.next === null, 'Test 1 failed: 3.next should be null');
    console.assert(result1.left.left.next === result1.left.right, 'Test 1 failed: 4.next should be 5');
    console.assert(result1.left.right.next === result1.right.left, 'Test 1 failed: 5.next should be 6');
    console.assert(result1.right.left.next === result1.right.right, 'Test 1 failed: 6.next should be 7');

    // Test case 2: Empty tree
    const result2 = solve(null);
    console.assert(result2 === null, 'Test 2 failed: should return null');

    // Test case 3: Single node
    const tree3 = new Node(1);
    const result3 = solve(tree3);
    console.assert(result3.next === null, 'Test 3 failed: single node.next should be null');

    console.log('All test cases passed for 116. Populating Next Right Pointers In Each Node!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 116. Populating Next Right Pointers In Each Node ===');
    console.log('Category: Queue');
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
    testSolution,
    demonstrateSolution,
    Node
};

/**
 * Additional Notes:
 * - This solution focuses on queue concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
