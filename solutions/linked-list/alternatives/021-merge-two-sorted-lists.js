/**
 * 21. Merge Two Sorted Lists
 * Medium
 *
 * Definition for singly-linked list node
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Merge Two Sorted Lists is to understand the core problem pattern
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
 * Merges two sorted linked lists into a single sorted linked list
 * @param {ListNode} list1 - Head of first sorted linked list
 * @param {ListNode} list2 - Head of second sorted linked list
 * @return {ListNode} - Head of merged sorted linked list
 */
function mergeTwoLists(list1, list2) {
    // Handle edge cases where either list is empty
    if (!list1) return list2;
    if (!list2) return list1;
    
    // Create a dummy head node to simplify the merging process
    const dummyHead = new ListNode(-1);
    let current = dummyHead;
    
    // Traverse both lists and merge them
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Attach remaining nodes from either list
    current.next = list1 || list2;
    
    // Return the merged list (excluding dummy head)
    return dummyHead.next;
}

/**
 * Helper function to create a linked list from an array
 * @param {Array} arr - Array of values to convert to linked list
 * @return {ListNode} - Head of created linked list
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
 * Helper function to convert linked list to array for testing
 * @param {ListNode} head - Head of linked list
 * @return {Array} - Array representation of linked list
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

// Test cases
function runTests() {
    // Test Case 1: Regular merge
    const test1List1 = createLinkedList([1, 2, 4]);
    const test1List2 = createLinkedList([1, 3, 4]);
    console.log('Test 1:', linkedListToArray(mergeTwoLists(test1List1, test1List2)));
    // Expected: [1, 1, 2, 3, 4, 4]
    
    // Test Case 2: One empty list
    const test2List1 = createLinkedList([]);
    const test2List2 = createLinkedList([0]);
    console.log('Test 2:', linkedListToArray(mergeTwoLists(test2List1, test2List2)));
    // Expected: [0]
    
    // Test Case 3: Both empty lists
    const test3List1 = createLinkedList([]);
    const test3List2 = createLinkedList([]);
    console.log('Test 3:', linkedListToArray(mergeTwoLists(test3List1, test3List2)));
    // Expected: []
}

// Run the tests
runTests();

// Export the functions for external use
module.exports = {
    ListNode,
    mergeTwoLists,
    createLinkedList,
    linkedListToArray
};