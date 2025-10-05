I'll help you create a JavaScript implementation for the "Linked List Cycle II" problem, which finds the node where a cycle begins in a linked list.

```javascript
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
```

This implementation includes:

1. A `ListNode` class for creating linked list nodes
2. The main `detectCycle` function that implements Floyd's cycle detection algorithm
3. A helper function `createLinkedListWithCycle` for testing purposes
4. Test cases to verify the implementation
5. Proper exports for external use

The solution uses Floyd's Tortoise and Hare algorithm (also known as Floyd's cycle-finding algorithm) which works in two phases:
1. First phase detects if there is a cycle using two pointers moving at different speeds
2. Second phase finds the start of the cycle by resetting one pointer to head and moving both at the same speed

The time complexity is O(n) where n is the number of nodes in the linked list, and the space complexity is O(1) as it only uses two pointers regardless of the input size.

The code handles edge cases such as:
- Empty lists
- Lists with single node
- Lists without cycles
- Lists with cycles at different positions

The implementation includes test cases to demonstrate the functionality with different scenarios.