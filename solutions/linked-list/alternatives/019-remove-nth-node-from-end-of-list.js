/**
 * 019. Remove Nth Node From End Of List
 * Medium
 *
 * This problem demonstrates key concepts in Linked List.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use two pointers separated by n nodes. When the fast pointer reaches the end,
 * the slow pointer will be at the node to remove. Use a dummy head to handle
 * edge cases like removing the first node.
 *
 * APPROACH:
 * 1. Create dummy head pointing to the original head
 * 2. Set fast pointer n+1 steps ahead of slow pointer
 * 3. Move both pointers until fast reaches end
 * 4. Skip the target node by updating slow.next
 * 5. Return dummy.next
 *
 * WHY THIS WORKS:
 * - Two-pointer technique maintains n-node gap
 * - Dummy head simplifies edge case handling
 * - Single pass solution with O(1) extra space
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: head = [1,2,3,4,5], n = 2
Step 1: Create dummy(0) -> 1 -> 2 -> 3 -> 4 -> 5
Step 2: fast = dummy, slow = dummy, move fast n+1=3 steps
Step 3: fast at node 3, slow at dummy
Step 4: Move both until fast reaches end
Step 5: slow at node 3, remove node 4 by slow.next = slow.next.next
Output: [1,2,3,5]
```
 *
 * EDGE CASES:
 * - Remove first node (n equals list length)
 * - Single node list (remove the only node)
 * - Remove last node (n = 1)
 * - List with two nodes
 */

/**
 * Definition for singly-linked list.
 */
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

/**
 * Main solution for Problem 019: Remove Nth Node From End Of List
 *
 * @param {ListNode} head - Head of the linked list
 * @param {number} n - Position from end to remove (1-indexed)
 * @return {ListNode} - Head of modified list
 *
 * Time Complexity: O(L) where L is length of list
 * Space Complexity: O(1) constant extra space
 */
function solve(head, n) {
    // Create dummy node to simplify edge cases
    const dummy = new ListNode(0);
    dummy.next = head;

    let fast = dummy;
    let slow = dummy;

    // Move fast pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Move both pointers until fast reaches end
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // Remove the nth node from end
    slow.next = slow.next.next;

    return dummy.next;
}

/**
 * Alternative solution using two-pass approach
 */
function solveTwoPass(head, n) {
    // First pass: count total nodes
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }

    // Edge case: remove first node
    if (length === n) {
        return head.next;
    }

    // Second pass: find node before target
    current = head;
    for (let i = 0; i < length - n - 1; i++) {
        current = current.next;
    }

    // Remove target node
    current.next = current.next.next;

    return head;
}

/**
 * Recursive solution
 */
function solveRecursive(head, n) {
    function removeNthFromEnd(node) {
        if (!node) return 0;

        const position = removeNthFromEnd(node.next) + 1;

        if (position === n + 1) {
            node.next = node.next.next;
        }

        return position;
    }

    const dummy = new ListNode(0);
    dummy.next = head;
    removeNthFromEnd(dummy);
    return dummy.next;
}

/**
 * Helper function to create linked list from array
 */
function createLinkedList(arr) {
    if (!arr.length) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

/**
 * Helper function to convert linked list to array
 */
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

/**
 * Test cases for Problem 019: Remove Nth Node From End Of List
 */
function testSolution() {
    console.log('Testing 019. Remove Nth Node From End Of List');

    // Test case 1: Remove 2nd from end - [1,2,3,4,5], n=2 -> [1,2,3,5]
    const head1 = createLinkedList([1, 2, 3, 4, 5]);
    const result1 = solve(head1, 2);
    const expected1 = [1, 2, 3, 5];
    console.assert(JSON.stringify(linkedListToArray(result1)) === JSON.stringify(expected1),
        `Test 1 failed: expected ${expected1}, got ${linkedListToArray(result1)}`);

    // Test case 2: Remove only node - [1], n=1 -> []
    const head2 = createLinkedList([1]);
    const result2 = solve(head2, 1);
    const expected2 = [];
    console.assert(JSON.stringify(linkedListToArray(result2)) === JSON.stringify(expected2),
        `Test 2 failed: expected ${expected2}, got ${linkedListToArray(result2)}`);

    // Test case 3: Remove first node - [1,2], n=2 -> [2]
    const head3 = createLinkedList([1, 2]);
    const result3 = solve(head3, 2);
    const expected3 = [2];
    console.assert(JSON.stringify(linkedListToArray(result3)) === JSON.stringify(expected3),
        `Test 3 failed: expected ${expected3}, got ${linkedListToArray(result3)}`);

    // Test case 4: Remove last node - [1,2,3], n=1 -> [1,2]
    const head4 = createLinkedList([1, 2, 3]);
    const result4 = solve(head4, 1);
    const expected4 = [1, 2];
    console.assert(JSON.stringify(linkedListToArray(result4)) === JSON.stringify(expected4),
        `Test 4 failed: expected ${expected4}, got ${linkedListToArray(result4)}`);

    // Test case 5: Two nodes, remove first - [1,2], n=2 -> [2]
    const head5 = createLinkedList([1, 2]);
    const result5 = solve(head5, 2);
    const expected5 = [2];
    console.assert(JSON.stringify(linkedListToArray(result5)) === JSON.stringify(expected5),
        `Test 5 failed: expected ${expected5}, got ${linkedListToArray(result5)}`);

    // Test case 6: Longer list, remove middle - [1,2,3,4,5,6], n=3 -> [1,2,3,5,6]
    const head6 = createLinkedList([1, 2, 3, 4, 5, 6]);
    const result6 = solve(head6, 3);
    const expected6 = [1, 2, 3, 5, 6];
    console.assert(JSON.stringify(linkedListToArray(result6)) === JSON.stringify(expected6),
        `Test 6 failed: expected ${expected6}, got ${linkedListToArray(result6)}`);

    console.log('All test cases passed for 019. Remove Nth Node From End Of List!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 019. Remove Nth Node From End Of List ===');
    console.log('Category: Linked List');
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
    solveTwoPass,
    solveRecursive,
    ListNode,
    createLinkedList,
    linkedListToArray,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on linked list concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
