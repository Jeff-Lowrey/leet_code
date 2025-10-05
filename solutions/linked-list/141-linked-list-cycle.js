I'll help you create a complete JavaScript implementation for the "Has Cycle" problem, which detects if a linked list has a cycle. Here's the solution:

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
 * Determines if a linked list has a cycle
 * Uses Floyd's Tortoise and Hare (slow/fast pointer) algorithm
 * 
 * @param {ListNode} head - Head of the linked list
 * @return {boolean} - True if the linked list has a cycle, false otherwise
 * 
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(1) as we only use two pointers
 */
function hasCycle(head) {
    // Handle edge cases: empty list or single node
    if (!head || !head.next) {
        return false;
    }

    // Initialize slow and fast pointers
    let slow = head;
    let fast = head;

    // Move through the list until we either:
    // 1. Find a cycle (fast catches up to slow)
    // 2. Reach the end of the list (fast or fast.next is null)
    while (fast && fast.next) {
        // Move slow pointer one step
        slow = slow.next;
        // Move fast pointer two steps
        fast = fast.next.next;

        // If fast catches up to slow, we found a cycle
        if (slow === fast) {
            return true;
        }
    }

    // If we reach here, we found null (end of list) - no cycle
    return false;
}

/**
 * Helper function to create a linked list with a cycle for testing
 * @param {Array} values - Array of values to create nodes from
 * @param {number} pos - Position to create cycle (-1 for no cycle)
 * @return {ListNode} - Head of the created linked list
 */
function createLinkedList(values, pos) {
    if (!values.length) return null;

    const head = new ListNode(values[0]);
    let current = head;
    let cycleNode = pos === 0 ? head : null;

    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
        if (i === pos) {
            cycleNode = current;
        }
    }

    if (cycleNode) {
        current.next = cycleNode;
    }

    return head;
}

// Test cases
function runTests() {
    // Test 1: List with cycle
    const test1 = createLinkedList([3, 2, 0, -4], 1);
    console.log("Test 1 (should be true):", hasCycle(test1));

    // Test 2: List with cycle at beginning
    const test2 = createLinkedList([1, 2], 0);
    console.log("Test 2 (should be true):", hasCycle(test2));

    // Test 3: List without cycle
    const test3 = createLinkedList([1], -1);
    console.log("Test 3 (should be false):", hasCycle(test3));

    // Test 4: Empty list
    console.log("Test 4 (should be false):", hasCycle(null));
}

// Run tests if not being imported as a module
if (require.main === module) {
    runTests();
}

// Export for use in other modules
module.exports = {
    hasCycle,
    ListNode,
    createLinkedList
};
```

This implementation includes:

1. A `ListNode` class for creating linked list nodes
2. The main `hasCycle` function using Floyd's Tortoise and Hare algorithm
3. A helper function `createLinkedList` to create test cases
4. A test suite with various test cases
5. Proper exports for module usage

The solution uses the efficient Floyd's Tortoise and Hare algorithm (also known as the slow/fast pointer technique) to detect cycles in the linked list. This approach:

- Uses O(1) space complexity
- Has O(n) time complexity
- Handles all edge cases (empty list, single node, no cycle, cycle at different positions)
- Includes comprehensive comments explaining the implementation
- Follows JavaScript best practices and conventions

The code can be run directly to test the implementation or imported as a module in other files. The test cases cover various scenarios including:
- Lists with cycles at different positions
- Lists without cycles
- Edge cases like empty lists and single-node lists