/**
 * 206. Reverse Linked List
 * Medium
 *
 * Definition for singly-linked list node
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Reverse Linked List is to understand the core problem pattern
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
 * Reverses a singly linked list
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(1) as we only use a few pointers
 *
 * @param {ListNode} head - The head of the linked list to reverse
 * @return {ListNode} - The new head of the reversed linked list
 */
function reverseList(head) {
    // Handle edge cases: empty list or single node
    if (!head || !head.next) {
        return head;
    }

    // Initialize pointers
    let prev = null;
    let current = head;
    let next = null;

    // Iterate through the list
    while (current !== null) {
        // Store next node
        next = current.next;
        
        // Reverse the link
        current.next = prev;
        
        // Move prev and current one step forward
        prev = current;
        current = next;
    }

    // Return the new head
    return prev;
}

/**
 * Helper function to create a linked list from an array
 * @param {Array} arr - Array of values to create linked list from
 * @return {ListNode} - Head of the created linked list
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
 * @param {ListNode} head - Head of the linked list
 * @return {Array} - Array representation of the linked list
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

// Test cases
function runTests() {
    // Test Case 1: Normal case
    const test1 = createLinkedList([1, 2, 3, 4, 5]);
    console.log("Test 1 Original:", linkedListToArray(test1));
    console.log("Test 1 Reversed:", linkedListToArray(reverseList(test1)));

    // Test Case 2: Empty list
    const test2 = null;
    console.log("Test 2 (Empty List):", linkedListToArray(reverseList(test2)));

    // Test Case 3: Single node
    const test3 = createLinkedList([1]);
    console.log("Test 3 (Single Node):", linkedListToArray(reverseList(test3)));

    // Test Case 4: Two nodes
    const test4 = createLinkedList([1, 2]);
    console.log("Test 4 (Two Nodes):", linkedListToArray(reverseList(test4)));
}

// Run tests if this file is being executed directly
if (require.main === module) {
    runTests();
}

// Export the functions for use in other files
module.exports = {
    ListNode,
    reverseList,
    createLinkedList,
    linkedListToArray
};