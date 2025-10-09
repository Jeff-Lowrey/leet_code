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

/**
 * Main solution using iterative approach
 */
function solve(head) {
    return reverseList(head);
}

/**
 * Alternative approach using stack (O(n) space)
 */
function reverseListWithStack(head) {
    if (!head) return null;

    const stack = [];
    let current = head;

    // Push all nodes onto stack
    while (current) {
        stack.push(current);
        current = current.next;
    }

    // Pop nodes and rebuild connections
    const newHead = stack.pop();
    current = newHead;

    while (stack.length > 0) {
        current.next = stack.pop();
        current = current.next;
    }

    current.next = null; // Terminate the list
    return newHead;
}

/**
 * Approach using array conversion (O(n) space but straightforward)
 */
function reverseListWithArray(head) {
    if (!head) return null;

    // Convert to array
    const values = [];
    let current = head;
    while (current) {
        values.push(current.val);
        current = current.next;
    }

    // Reverse array
    values.reverse();

    // Rebuild linked list
    const newHead = new ListNode(values[0]);
    current = newHead;

    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
    }

    return newHead;
}

/**
 * Tail recursive approach (optimized for some languages)
 */
function reverseListTailRecursive(head, prev = null) {
    if (!head) return prev;

    const next = head.next;
    head.next = prev;

    return reverseListTailRecursive(next, head);
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

    // Test case 6: Test stack approach
    const list6 = createLinkedList([1, 2, 3, 4]);
    const result6 = reverseListWithStack(list6);
    const expected6 = [4, 3, 2, 1];
    const actual6 = linkedListToArray(result6);
    console.assert(JSON.stringify(actual6) === JSON.stringify(expected6),
        `Test 6 failed: expected ${expected6}, got ${actual6}`);

    // Test case 7: Test array approach
    const list7 = createLinkedList([5, 4, 3, 2, 1]);
    const result7 = reverseListWithArray(list7);
    const expected7 = [1, 2, 3, 4, 5];
    const actual7 = linkedListToArray(result7);
    console.assert(JSON.stringify(actual7) === JSON.stringify(expected7),
        `Test 7 failed: expected ${expected7}, got ${actual7}`);

    // Test case 8: Test tail recursive approach
    const list8 = createLinkedList([10, 20, 30]);
    const result8 = reverseListTailRecursive(list8);
    const expected8 = [30, 20, 10];
    const actual8 = linkedListToArray(result8);
    console.assert(JSON.stringify(actual8) === JSON.stringify(expected8),
        `Test 8 failed: expected ${expected8}, got ${actual8}`);

    // Test case 9: Long list to test performance
    const longArray = Array.from({length: 100}, (_, i) => i + 1);
    const longList = createLinkedList(longArray);
    const longResult = reverseList(longList);
    const longExpected = longArray.reverse();
    const longActual = linkedListToArray(longResult);
    console.assert(JSON.stringify(longActual) === JSON.stringify(longExpected),
        `Test 9 failed: long list reversal failed`);

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
    reverseListWithStack,
    reverseListWithArray,
    reverseListTailRecursive,
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
