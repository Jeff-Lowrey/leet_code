/**
 * 19. Remove Nth Node From End Of List
 * Medium
 *
 * Definition for singly-linked list node
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Remove Nth Node From End Of List is to understand the core problem pattern
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
 * Removes the nth node from the end of a linked list
 * @param {ListNode} head - The head of the linked list
 * @param {number} n - The position from the end to remove (1-based)
 * @return {ListNode} - The head of the modified linked list
 */
function removeNthFromEnd(head, n) {
    // Handle edge cases
    if (!head) return null;
    if (n <= 0) return head;

    // Create a dummy node to handle edge cases (like removing first node)
    const dummy = new ListNode(0);
    dummy.next = head;
    
    // Use two pointers: fast and slow
    let fast = dummy;
    let slow = dummy;
    
    // Move fast pointer n steps ahead
    for (let i = 0; i <= n; i++) {
        if (!fast) return head; // Handle case where n is larger than list length
        fast = fast.next;
    }
    
    // Move both pointers until fast reaches the end
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    
    // Remove the nth node by updating the next pointer
    slow.next = slow.next ? slow.next.next : null;
    
    return dummy.next;
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
    
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

// Test cases
function runTests() {
    // Test Case 1: Regular case
    let test1 = createLinkedList([1, 2, 3, 4, 5]);
    console.log('Test 1:', linkedListToArray(removeNthFromEnd(test1, 2)));  // Should print [1,2,3,5]
    
    // Test Case 2: Remove first element
    let test2 = createLinkedList([1, 2]);
    console.log('Test 2:', linkedListToArray(removeNthFromEnd(test2, 2)));  // Should print [2]
    
    // Test Case 3: Remove last element
    let test3 = createLinkedList([1, 2, 3]);
    console.log('Test 3:', linkedListToArray(removeNthFromEnd(test3, 1)));  // Should print [1,2]
    
    // Test Case 4: Single element
    let test4 = createLinkedList([1]);
    console.log('Test 4:', linkedListToArray(removeNthFromEnd(test4, 1)));  // Should print []
    
    // Test Case 5: Empty list
    console.log('Test 5:', linkedListToArray(removeNthFromEnd(null, 1)));  // Should print []
}

// Run the tests
runTests();

// Export the functions for external use
module.exports = {
    removeNthFromEnd,
    ListNode,
    createLinkedList,
    linkedListToArray
};