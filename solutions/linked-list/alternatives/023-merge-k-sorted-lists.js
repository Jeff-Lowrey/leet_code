/**
 * 23. Merge K Sorted Lists
 * Medium
 *
 * Definition for singly-linked list node
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Merge K Sorted Lists is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
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
 * Merges k sorted linked lists and returns the merged list
 * @param {ListNode[]} lists - Array of linked list heads
 * @return {ListNode} - Head of merged sorted linked list
 */
function mergeKLists(lists) {
    // Handle edge cases
    if (!lists || lists.length === 0) return null;
    if (lists.length === 1) return lists[0];

    return mergeLists(lists, 0, lists.length - 1);
}

/**
 * Recursively merges lists using divide and conquer approach
 * @param {ListNode[]} lists - Array of linked list heads
 * @param {number} start - Start index
 * @param {number} end - End index
 * @return {ListNode} - Head of merged sorted linked list
 */
function mergeLists(lists, start, end) {
    // Base case: single list
    if (start === end) return lists[start];
    
    // Recursive case: divide and merge
    const mid = Math.floor((start + end) / 2);
    const left = mergeLists(lists, start, mid);
    const right = mergeLists(lists, mid + 1, end);
    
    return mergeTwoLists(left, right);
}

/**
 * Merges two sorted linked lists
 * @param {ListNode} l1 - First linked list
 * @param {ListNode} l2 - Second linked list
 * @return {ListNode} - Head of merged sorted linked list
 */
function mergeTwoLists(l1, l2) {
    // Create dummy head to simplify merging
    const dummy = new ListNode(0);
    let current = dummy;
    
    // Merge while both lists have nodes
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    // Attach remaining nodes if any
    current.next = l1 || l2;
    
    return dummy.next;
}

/**
 * Helper function to create a linked list from array
 * @param {number[]} arr - Input array
 * @return {ListNode} - Head of created linked list
 */
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    
    const dummy = new ListNode(0);
    let current = dummy;
    
    for (const val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    
    return dummy.next;
}

/**
 * Helper function to convert linked list to array
 * @param {ListNode} head - Head of linked list
 * @return {number[]} - Array representation of linked list
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

// Example usage and tests
function runTests() {
    // Test Case 1: Multiple lists
    const lists1 = [
        createLinkedList([1, 4, 5]),
        createLinkedList([1, 3, 4]),
        createLinkedList([2, 6])
    ];
    console.log("Test 1:", linkedListToArray(mergeKLists(lists1))); // Expected: [1,1,2,3,4,4,5,6]

    // Test Case 2: Empty lists
    console.log("Test 2:", linkedListToArray(mergeKLists([]))); // Expected: null

    // Test Case 3: Single list
    const lists3 = [createLinkedList([1, 2, 3])];
    console.log("Test 3:", linkedListToArray(mergeKLists(lists3))); // Expected: [1,2,3]

    // Test Case 4: Multiple empty lists
    const lists4 = [null, null];
    console.log("Test 4:", linkedListToArray(mergeKLists(lists4))); // Expected: []
}

// Run tests
runTests();

// Export functions for external use
module.exports = {
    mergeKLists,
    ListNode,
    createLinkedList,
    linkedListToArray
};