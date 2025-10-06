/**
 * 142. Linked List Cycle Ii
 * Medium
 *
 * Definition for singly-linked list node
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Linked List Cycle Ii is to understand the core problem pattern
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
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/**
 * Finds the node where the cycle begins in a linked list
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} The node where the cycle begins, or null if no cycle
 */
function detectCycle(head) {
    // Handle edge cases
    if (!head || !head.next) {
        return null;
    }

    // Initialize two pointers for Floyd's cycle detection
    let slow = head;
    let fast = head;
    let hasCycle = false;

    // Phase 1: Detect if there is a cycle using Floyd's algorithm
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            hasCycle = true;
            break;
        }
    }

    // If no cycle is found, return null
    if (!hasCycle) {
        return null;
    }

    // Phase 2: Find the start of the cycle
    // Reset one pointer to head and move both pointers at same speed
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}

/**
 * Helper function to create a linked list with a cycle for testing
 * @param {Array} values - Array of values to create linked list
 * @param {number} pos - Position where cycle should begin (-1 for no cycle)
 * @return {ListNode} Head of the created linked list
 */
function createLinkedListWithCycle(values, pos) {
    if (!values.length) return null;

    const head = new ListNode(values[0]);
    let current = head;
    const nodes = [head];

    // Create the linked list
    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
        nodes.push(current);
    }

    // Create cycle if pos is valid
    if (pos >= 0 && pos < values.length) {
        current.next = nodes[pos];
    }

    return head;
}

// Test cases
function runTests() {
    // Test Case 1: List with cycle at position 1
    const test1 = createLinkedListWithCycle([3, 2, 0, -4], 1);
    console.log("Test 1:", detectCycle(test1)?.val); // Should print 2

    // Test Case 2: List with cycle at position 0
    const test2 = createLinkedListWithCycle([1, 2], 0);
    console.log("Test 2:", detectCycle(test2)?.val); // Should print 1

    // Test Case 3: List without cycle
    const test3 = createLinkedListWithCycle([1], -1);
    console.log("Test 3:", detectCycle(test3)); // Should print null
}

// Run the tests
runTests();

// Export the function for external use
module.exports = {
    detectCycle,
    ListNode,
    createLinkedListWithCycle
};