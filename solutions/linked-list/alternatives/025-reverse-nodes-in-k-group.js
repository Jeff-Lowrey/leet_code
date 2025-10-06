/**
 * 25. Reverse Nodes In K Group
 * Medium
 *
 * Definition for singly-linked list node
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Reverse Nodes In K Group is to understand the core problem pattern
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
 * Reverses nodes in k-group in a linked list
 * @param {ListNode} head - The head of the linked list
 * @param {number} k - The size of groups to reverse
 * @return {ListNode} - Head of the modified linked list
 */
function reverseKGroup(head, k) {
    // Edge cases: empty list, single node, or k = 1 (no reversal needed)
    if (!head || !head.next || k === 1) return head;
    
    // Count total nodes to handle the last group
    let count = 0;
    let current = head;
    while (current) {
        count++;
        current = current.next;
    }
    
    // Create dummy node to handle edge cases
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    current = head;
    
    // Process each k-group
    while (count >= k) {
        // Reverse current k-group
        let first = current;
        let last = null;
        
        // Reverse k nodes
        for (let i = 0; i < k; i++) {
            let next = current.next;
            current.next = last;
            last = current;
            current = next;
        }
        
        // Connect with rest of the list
        prev.next = last;
        first.next = current;
        
        // Update pointers for next group
        prev = first;
        count -= k;
    }
    
    return dummy.next;
}

/**
 * Helper function to create a linked list from array
 * @param {Array} arr - Array of values
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
 * Helper function to convert linked list to array
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
    const testCases = [
        { input: [1, 2, 3, 4, 5], k: 2 },
        { input: [1, 2, 3, 4, 5], k: 3 },
        { input: [1], k: 1 },
        { input: [], k: 1 }
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const { input, k } = testCases[i];
        const list = createLinkedList(input);
        const result = reverseKGroup(list, k);
        console.log(`Test Case ${i + 1}:`);
        console.log(`Input: ${input}, k = ${k}`);
        console.log(`Output: ${linkedListToArray(result)}\n`);
    }
}

// Run tests
runTests();

// Export functions for external use
module.exports = {
    ListNode,
    reverseKGroup,
    createLinkedList,
    linkedListToArray
};