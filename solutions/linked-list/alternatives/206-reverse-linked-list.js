/**
 * 206. Reverse Linked List
 * Easy
 *
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * To reverse a linked list, we need to change the direction of all the links.
 * We can do this iteratively by keeping track of the previous, current, and next nodes.
 * The key insight is to break and rebuild connections as we traverse.
 *
 * APPROACH:
 * 1. **Iterative approach**: Use three pointers (prev, current, next)
 * 2. **Traverse the list**: Move through each node once
 * 3. **Reverse links**: Point current.next to prev instead of next
 * 4. **Update pointers**: Move all pointers forward
 *
 * WHY THIS WORKS:
 * - We reverse one link at a time while maintaining references
 * - Previous becomes the new next, current becomes the new previous
 * - At the end, prev points to the new head of reversed list
 *
 * TIME COMPLEXITY: O(n) - visit each node exactly once
 * SPACE COMPLEXITY: O(1) - only use constant extra space
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: 1 -> 2 -> 3 -> 4 -> 5 -> null
 * Step 1: prev=null, curr=1, next=2. After: null <- 1, curr=2
 * Step 2: prev=1, curr=2, next=3. After: null <- 1 <- 2, curr=3
 * Step 3: prev=2, curr=3, next=4. After: null <- 1 <- 2 <- 3, curr=4
 * Step 4: prev=3, curr=4, next=5. After: null <- 1 <- 2 <- 3 <- 4, curr=5
 * Step 5: prev=4, curr=5, next=null. After: null <- 1 <- 2 <- 3 <- 4 <- 5, curr=null
 * Output: 5 -> 4 -> 3 -> 2 -> 1 -> null
 * ```
 *
 * EDGE CASES:
 * - Empty list (null): return null
 * - Single node: return the node unchanged
 * - Two nodes: reverse the connection
 */

/**
 * Definition for singly-linked list node
 */
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

/**
 * Reverse Linked List - Iterative approach
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - Head of the reversed linked list
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function reverseList(head) {
    let prev = null;
    let current = head;

    while (current !== null) {
        // Store the next node before breaking the link
        const next = current.next;

        // Reverse the link: current now points to previous
        current.next = prev;

        // Move pointers forward for next iteration
        prev = current;
        current = next;
    }

    // prev is now the new head of the reversed list
    return prev;
}

/**
 * Reverse Linked List - Recursive approach
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - Head of the reversed linked list
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) - due to recursion stack
 */
function reverseListRecursive(head) {
    // Base case: empty list or single node
    if (!head || !head.next) {
        return head;
    }

    // Recursively reverse the rest of the list
    const reversedHead = reverseListRecursive(head.next);

    // Reverse the current connection
    head.next.next = head;
    head.next = null;

    return reversedHead;
}

function solve(head) {
    return reverseList(head);
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
 * Helper function to convert linked list to array
 */
function linkedListToArray(head) {
    const result = [];
    let current = head;

    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }

    return result;
}

/**
 * Test cases for Problem 206: Reverse Linked List
 */
function testSolution() {
    console.log('Testing 206. Reverse Linked List');

    // Test case 1: Normal list [1,2,3,4,5]
    const list1 = createLinkedList([1, 2, 3, 4, 5]);
    const result1 = reverseList(list1);
    const expected1 = [5, 4, 3, 2, 1];
    const actual1 = linkedListToArray(result1);
    console.assert(JSON.stringify(actual1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${expected1}, got ${actual1}`);

    // Test case 2: Two nodes [1,2]
    const list2 = createLinkedList([1, 2]);
    const result2 = reverseList(list2);
    const expected2 = [2, 1];
    const actual2 = linkedListToArray(result2);
    console.assert(JSON.stringify(actual2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${expected2}, got ${actual2}`);

    // Test case 3: Single node [1]
    const list3 = createLinkedList([1]);
    const result3 = reverseList(list3);
    const expected3 = [1];
    const actual3 = linkedListToArray(result3);
    console.assert(JSON.stringify(actual3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${expected3}, got ${actual3}`);

    // Test case 4: Empty list
    const result4 = reverseList(null);
    const expected4 = [];
    const actual4 = linkedListToArray(result4);
    console.assert(JSON.stringify(actual4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${expected4}, got ${actual4}`);

    // Test case 5: Test recursive approach
    const list5 = createLinkedList([1, 2, 3]);
    const result5 = reverseListRecursive(list5);
    const expected5 = [3, 2, 1];
    const actual5 = linkedListToArray(result5);
    console.assert(JSON.stringify(actual5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${expected5}, got ${actual5}`);

    console.log('All test cases passed for 206. Reverse Linked List!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 206. Reverse Linked List ===');
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
    ListNode,
    reverseList,
    reverseListRecursive,
    createLinkedList,
    linkedListToArray,
    solve,
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
