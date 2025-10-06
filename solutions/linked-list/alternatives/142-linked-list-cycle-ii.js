/**
 * 142. Linked List Cycle Ii
 * Medium
 *
 * This problem demonstrates key concepts in Linked List.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Extend Floyd's cycle detection to find the cycle start node. After detecting
 * a cycle, use mathematical properties: when pointers meet, the distance from
 * head to cycle start equals distance from meeting point to cycle start.
 *
 * APPROACH:
 * 1. Phase 1: Use Floyd's algorithm to detect cycle (slow/fast pointers)
 * 2. Phase 2: If cycle exists, reset one pointer to head
 * 3. Move both pointers one step at a time until they meet
 * 4. Meeting point is the start of the cycle
 *
 * WHY THIS WORKS:
 * - Mathematical proof: if cycle length is C and meeting happens at distance d
 * - Distance from head to cycle start = distance from meeting point to cycle start
 * - This property allows us to find the exact cycle start node
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: head = [3,2,0,-4], cycle starts at node with value 2
Phase 1: Detect cycle using Floyd's algorithm
  - slow and fast pointers meet inside the cycle
Phase 2: Find cycle start
  - Reset slow to head: slow=3, fast=meeting point
  - Move both one step: slow=2, fast=2 (they meet!)
  - Return node with value 2 (cycle start)

Input: head = [1,2], no cycle
Phase 1: fast reaches null before meeting slow
Output: null (no cycle)
```
 *
 * EDGE CASES:
 * - Empty list or no cycle (return null)
 * - Single node pointing to itself (return that node)
 * - Cycle starts at head (return head)
 * - Long list with small cycle at the end
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
 * Main solution for Problem 142: Linked List Cycle II
 * Uses Floyd's cycle detection with cycle start finding
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - Node where cycle begins, or null if no cycle
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(1) using only two pointers
 */
function solve(head) {
    if (!head || !head.next) return null;

    // Phase 1: Detect if cycle exists using Floyd's algorithm
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Cycle detected, proceed to phase 2
            break;
        }
    }

    // No cycle found
    if (!fast || !fast.next) {
        return null;
    }

    // Phase 2: Find the start of the cycle
    // Reset slow to head, keep fast at meeting point
    slow = head;

    // Move both pointers one step at a time until they meet
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    // They meet at the cycle start
    return slow;
}

/**
 * Alternative solution using hash set
 */
function solveWithHashSet(head) {
    const visited = new Set();
    let current = head;

    while (current) {
        if (visited.has(current)) {
            return current;  // First revisited node is cycle start
        }
        visited.add(current);
        current = current.next;
    }

    return null;  // No cycle found
}

/**
 * Mathematical explanation helper function
 */
function explainMathematicalReasoning() {
    /*
    Mathematical Proof:

    Let:
    - L = distance from head to cycle start
    - C = cycle length
    - k = distance from cycle start to meeting point

    When slow and fast meet:
    - slow has traveled: L + k
    - fast has traveled: L + k + nC (where n is number of complete cycles)

    Since fast travels twice as fast as slow:
    2(L + k) = L + k + nC
    2L + 2k = L + k + nC
    L + k = nC
    L = nC - k

    This means:
    Distance from head to cycle start (L) =
    Distance from meeting point to cycle start (C - k)

    Therefore, if we start one pointer from head and another from meeting point,
    they will meet exactly at the cycle start.
    */
}

/**
 * Verbose solution with step-by-step tracking
 */
function solveVerbose(head) {
    if (!head || !head.next) return null;

    console.log('Phase 1: Detecting cycle...');
    let slow = head;
    let fast = head;
    let step = 0;

    // Phase 1: Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        step++;

        console.log(`Step ${step}: slow=${slow.val}, fast=${fast?.val}`);

        if (slow === fast) {
            console.log('Cycle detected at step', step);
            break;
        }
    }

    if (!fast || !fast.next) {
        console.log('No cycle found');
        return null;
    }

    console.log('Phase 2: Finding cycle start...');
    slow = head;
    step = 0;

    // Phase 2: Find cycle start
    while (slow !== fast) {
        console.log(`Step ${step}: slow=${slow.val}, fast=${fast.val}`);
        slow = slow.next;
        fast = fast.next;
        step++;
    }

    console.log(`Cycle starts at node with value: ${slow.val}`);
    return slow;
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
        return { head: nodes[0], cycleStart: nodes[pos] };
    }

    return { head: nodes[0], cycleStart: null };
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
 * Test cases for Problem 142: Linked List Cycle II
 */
function testSolution() {
    console.log('Testing 142. Linked List Cycle II');

    // Test case 1: List with cycle at position 1 - [3,2,0,-4], pos=1
    const { head: head1, cycleStart: expected1 } = createLinkedListWithCycle([3, 2, 0, -4], 1);
    const result1 = solve(head1);
    console.assert(result1 === expected1,
        `Test 1 failed: expected cycle start with value ${expected1?.val}, got ${result1?.val}`);

    // Test case 2: List with cycle at position 0 - [1,2], pos=0
    const { head: head2, cycleStart: expected2 } = createLinkedListWithCycle([1, 2], 0);
    const result2 = solve(head2);
    console.assert(result2 === expected2,
        `Test 2 failed: expected cycle start with value ${expected2?.val}, got ${result2?.val}`);

    // Test case 3: List without cycle - [1], pos=-1
    const { head: head3, cycleStart: expected3 } = createLinkedListWithCycle([1], -1);
    const result3 = solve(head3);
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Empty list
    const head4 = null;
    const result4 = solve(head4);
    const expected4 = null;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single node pointing to itself
    const head5 = new ListNode(1);
    head5.next = head5;
    const result5 = solve(head5);
    console.assert(result5 === head5,
        `Test 5 failed: expected cycle start node, got ${result5?.val}`);

    // Test case 6: Two nodes without cycle
    const head6 = createLinkedList([1, 2]);
    const result6 = solve(head6);
    const expected6 = null;
    console.assert(result6 === expected6,
        `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Long list with cycle at position 3
    const { head: head7, cycleStart: expected7 } = createLinkedListWithCycle([1, 2, 3, 4, 5, 6], 3);
    const result7 = solve(head7);
    console.assert(result7 === expected7,
        `Test 7 failed: expected cycle start with value ${expected7?.val}, got ${result7?.val}`);

    // Test case 8: Cycle starts at head
    const { head: head8, cycleStart: expected8 } = createLinkedListWithCycle([1, 2, 3], 0);
    const result8 = solve(head8);
    console.assert(result8 === expected8,
        `Test 8 failed: expected cycle start with value ${expected8?.val}, got ${result8?.val}`);

    console.log('All test cases passed for 142. Linked List Cycle II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 142. Linked List Cycle Ii ===');
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
    solveVerbose,
    explainMathematicalReasoning,
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
