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

/**
 * Definition for singly-linked list node
 */
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Main solution for Problem 1019: Next Greater Node In Linked List
 *
 * @param {ListNode} head - Head of linked list
 * @return {number[]} - Array of next greater values
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(head) {
    // Convert linked list to array for easier index access
    const values = [];
    let current = head;
    while (current) {
        values.push(current.val);
        current = current.next;
    }

    const n = values.length;
    const result = new Array(n).fill(0);
    const stack = []; // Store indices

    for (let i = 0; i < n; i++) {
        // While stack not empty and current value > value at stack top index
        while (stack.length > 0 && values[i] > values[stack[stack.length - 1]]) {
            const index = stack.pop();
            result[index] = values[i];
        }
        stack.push(i);
    }

    return result;
}

/**
 * Helper function to create linked list from array
 */
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

/**
 * Helper function to compare arrays
 */
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

/**
 * Test cases for Problem 1019: Next Greater Node In Linked List
 */
function testSolution() {
    console.log('Testing 1019. Next Greater Node In Linked List');

    // Test case 1: Example from problem
    const result1 = solve(createLinkedList([2,1,5]));
    const expected1 = [5,5,0];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Another example
    const result2 = solve(createLinkedList([2,7,4,3,5]));
    const expected2 = [7,0,5,5,0];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: Single node
    const result3 = solve(createLinkedList([1]));
    const expected3 = [0];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: Decreasing sequence
    const result4 = solve(createLinkedList([5,4,3,2,1]));
    const expected4 = [0,0,0,0,0];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: Increasing sequence
    const result5 = solve(createLinkedList([1,2,3,4,5]));
    const expected5 = [2,3,4,5,0];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected [${expected5}], got [${result5}]`);

    console.log('All test cases passed for 1019. Next Greater Node In Linked List!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1019. Next Greater Node In Linked List ===');
    console.log('Category: Monotonic Stack');
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
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
