I'll help you create a complete JavaScript implementation for reversing a linked list. I'll include detailed comments and handle edge cases appropriately.

```javascript
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
```

This implementation includes:

1. A `ListNode` class for creating linked list nodes
2. The main `reverseList` function that handles the reversal logic
3. Helper functions for creating linked lists from arrays and converting them back
4. A comprehensive test suite
5. Proper exports for use in other files

The solution uses an iterative approach with three pointers to reverse the linked list in-place. It handles all edge cases including:
- Empty lists
- Single-node lists
- Two-node lists
- Normal cases with multiple nodes

The time complexity is O(n) where n is the number of nodes in the list, and the space complexity is O(1) as we only use a constant amount of extra space regardless of input size.

The code follows JavaScript best practices and includes detailed comments explaining the implementation. You can run this file directly to see the test results, or import the functions for use in other parts of your project.