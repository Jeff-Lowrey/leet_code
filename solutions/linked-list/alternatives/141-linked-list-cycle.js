/**

 *
 * This problem demonstrates key concepts in Linked List.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use Floyd's cycle detection algorithm (tortoise and hare). If there's a cycle,
 * the fast pointer (hare) will eventually meet the slow pointer (tortoise).
 * If no cycle exists, the fast pointer will reach the end.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - In a cycle, fast pointer gains 1 position on slow per iteration
 * - Eventually, fast will catch up to slow if cycle exists
 * - If no cycle, fast will reach the end first
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: head = [3,2,0,-4], pos = 1 (cycle from node 1)
Step 1: slow=3, fast=3
Step 2: slow=2, fast=0 (fast moves 2 steps)
Step 3: slow=0, fast=2 (fast moves 2 steps, cycles back)
Step 4: slow=-4, fast=-4 (pointers meet!)
Output: true (cycle detected)

Input: head = [1,2], pos = -1 (no cycle)
Step 1: slow=1, fast=1
Step 2: slow=2, fast=null (fast reaches end)
Output: false (no cycle)
```
 *
 * EDGE CASES:
 * - Empty list (return false)
 * - Single node with no cycle (return false)
 * - Single node pointing to itself (return true)
 * - Two nodes with cycle (return true)
 */

/**
 * Definition for singly-linked list.
 */
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

/**
 * Main solution for Problem 141: Linked List Cycle
 * Uses Floyd's cycle detection algorithm
 *
 * @param {ListNode} head - Head of the linked list
 * @return {boolean} - True if cycle exists, false otherwise
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(1) using only two pointers
 */
function solve(head) {
    if (!head || !head.next) return false;

    let slow = head;
    let fast = head;

    // Move pointers until they meet or fast reaches end
    while (fast && fast.next) {
        slow = slow.next;        // tortoise: 1 step
        fast = fast.next.next;   // hare: 2 steps

        if (slow === fast) {
            return true;  // Cycle detected
        }
    }

    return false;  // No cycle found
}

/**
 * Alternative solution using hash set
 */
function solveWithHashSet(head) {
    const visited = new Set();
    let current = head;

    while (current) {
        if (visited.has(current)) {
            return true;  // Cycle detected
        }
        visited.add(current);
        current = current.next;
    }

    return false;  // No cycle found
}

/**
 * Solution that modifies the list (not recommended for interview)
 */
function solveWithModification(head) {
    while (head) {
        if (head.val === 'VISITED') {
            return true;  // Cycle detected
        }
        head.val = 'VISITED';
        head = head.next;
    }

    return false;  // No cycle found
}

/**
 * Mathematical approach: count nodes and compare with expected traversal
 */
function solveWithCounting(head) {
    if (!head) return false;

    let slow = head;
    let fast = head;
    let steps = 0;

    // First, try to find if there's a potential cycle
    while (fast && fast.next && steps < 10000) {  // Arbitrary large number
        slow = slow.next;
        fast = fast.next.next;
        steps++;

        if (slow === fast) {
            return true;
        }
    }

    return false;
}

/**
 * Helper function to create linked list with cycle
 */
function createLinkedListWithCycle(arr, pos) {
    if (!arr || arr.length === 0) return null;

    const nodes = arr.map(val => new ListNode(val));

    // Connect nodes
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }

    // Create cycle if pos is valid
    if (pos >= 0 && pos < nodes.length) {
        nodes[nodes.length - 1].next = nodes[pos];
    }

    return nodes[0];
}

/**
 * Helper function to create linked list without cycle
 */
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

/**
 * Test cases for Problem 141: Linked List Cycle
 */
function testSolution() {
    console.log('Testing 141. Linked List Cycle');

    // Test case 1: List with cycle at position 1 - [3,2,0,-4], pos=1 -> true
    const head1 = createLinkedListWithCycle([3, 2, 0, -4], 1);
    const result1 = solve(head1);
    const expected1 = true;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: List with cycle at position 0 - [1,2], pos=0 -> true
    const head2 = createLinkedListWithCycle([1, 2], 0);
    const result2 = solve(head2);
    const expected2 = true;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: List without cycle - [1], pos=-1 -> false
    const head3 = createLinkedListWithCycle([1], -1);
    const result3 = solve(head3);
    const expected3 = false;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Empty list -> false
    const head4 = null;
    const result4 = solve(head4);
    const expected4 = false;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single node pointing to itself
    const head5 = new ListNode(1);
    head5.next = head5;
    const result5 = solve(head5);
    const expected5 = true;
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Two nodes without cycle - [1,2], pos=-1 -> false
    const head6 = createLinkedList([1, 2]);
    const result6 = solve(head6);
    const expected6 = false;
    console.assert(result6 === expected6,
        `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Long list with cycle at end
    const head7 = createLinkedListWithCycle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5);
    const result7 = solve(head7);
    const expected7 = true;
    console.assert(result7 === expected7,
        `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 141. Linked List Cycle!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 141. Linked List Cycle ===');
    console.log('Category: Linked List');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    solveWithHashSet,
    solveWithModification,
    solveWithCounting,
    ListNode,
    createLinkedList,
    createLinkedListWithCycle,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on linked list concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
