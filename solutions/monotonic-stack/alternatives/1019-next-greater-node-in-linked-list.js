/**
 * 1019. Next Greater Node In Linked List
 * Medium
 *
 * This problem demonstrates key concepts in Monotonic Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * For each node in a linked list, we need to find the first node after it with a greater value.
 * A monotonic decreasing stack helps us efficiently track nodes waiting for their next greater value.
 *
 * APPROACH:
 * 1. Convert linked list to array (or process with indices)
 * 2. Use a monotonic decreasing stack storing indices
 * 3. When we find a larger value, pop all smaller values and update their results
 * 4. The stack stores indices of elements waiting for their next greater element
 *
 * WHY THIS WORKS:
 * - The stack maintains indices in decreasing order of values
 * - When we encounter a larger value, all smaller values in stack have found their answer
 * - Each element is pushed and popped at most once
 * - Elements remaining in stack have no next greater element (result stays 0)
 *
 * TIME COMPLEXITY: O(n) - each node processed once
 * SPACE COMPLEXITY: O(n) - for result array and stack
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: head = [2,1,5]
 *
 * Convert to array: [2,1,5]
 * Initialize result: [0,0,0], stack: []
 *
 * i=0, val=2: stack=[], push 0 → stack=[0]
 * i=1, val=1: 1<2, push 1 → stack=[0,1]
 * i=2, val=5: 5>1, pop 1, result[1]=5
 *             5>2, pop 0, result[0]=5
 *             push 2 → stack=[2]
 *
 * Result: [5,5,0]
 * ```
 *
 * EDGE CASES:
 * - Empty list: return []
 * - Single node: return [0]
 * - Decreasing values: all zeros
 * - Increasing values: last few are zero
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
