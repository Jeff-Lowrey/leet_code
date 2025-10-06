/**
 * 143. Reorder List
 * Medium
 *
 * Definition for singly-linked list node
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Reorder List is to understand the core problem pattern
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
 * Reorders a linked list in the following pattern:
 * L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...
 * 
 * @param {ListNode} head - Head of the linked list
 * @return {void} Modifies the list in place
 */
function reorderList(head) {
    // Handle edge cases
    if (!head || !head.next || !head.next.next) {
        return;
    }

    // Step 1: Find the middle of the linked list
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Step 2: Reverse the second half of the list
    let secondHalf = reverseList(slow.next);
    slow.next = null; // Break the list into two halves
    
    // Step 3: Merge the two halves
    mergeAlternating(head, secondHalf);
}

/**
 * Reverses a linked list
 * @param {ListNode} head - Head of the list to reverse
 * @return {ListNode} Head of the reversed list
 */
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        let nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
}

/**
 * Merges two lists by alternating nodes
 * @param {ListNode} list1 - First list
 * @param {ListNode} list2 - Second list
 */
function mergeAlternating(list1, list2) {
    while (list1 && list2) {
        let temp1 = list1.next;
        let temp2 = list2.next;
        
        list1.next = list2;
        list2.next = temp1;
        
        list1 = temp1;
        list2 = temp2;
    }
}

/**
 * Helper function to create a linked list from an array
 * @param {Array} arr - Array of values
 * @return {ListNode} Head of the created linked list
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
 * @return {Array} Array representation of the linked list
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

// Example usage and test cases
function runTests() {
    // Test Case 1: [1,2,3,4]
    let test1 = createLinkedList([1, 2, 3, 4]);
    reorderList(test1);
    console.log('Test 1:', linkedListToArray(test1)); // Expected: [1,4,2,3]

    // Test Case 2: [1,2,3,4,5]
    let test2 = createLinkedList([1, 2, 3, 4, 5]);
    reorderList(test2);
    console.log('Test 2:', linkedListToArray(test2)); // Expected: [1,5,2,4,3]

    // Test Case 3: Single node
    let test3 = createLinkedList([1]);
    reorderList(test3);
    console.log('Test 3:', linkedListToArray(test3)); // Expected: [1]

    // Test Case 4: Empty list
    let test4 = createLinkedList([]);
    reorderList(test4);
    console.log('Test 4:', linkedListToArray(test4)); // Expected: []
}

// Run the tests
runTests();

// Export the functions for external use
module.exports = {
    reorderList,
    ListNode,
    createLinkedList,
    linkedListToArray
};