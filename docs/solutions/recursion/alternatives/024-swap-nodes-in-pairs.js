/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

// Definition for singly-linked list node
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Main solution for Problem 024: Swap Nodes In Pairs
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - Head of the modified list with swapped pairs
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) - recursive call stack
 */
function solve(head) {
    // Base case: if list is empty or has only one node, return as-is
    if (!head || !head.next) {
        return head;
    }

    // Save references to first and second nodes
    const first = head;
    const second = head.next;

    // Recursively process the rest of the list
    first.next = solve(second.next);

    // Swap the pair by adjusting pointers
    second.next = first;

    // Return the new head (originally the second node)
    return second;
}

/**
 * Helper function to create a linked list from an array
 */
function createList(arr) {
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
 * Helper function to convert linked list to array for testing
 */
function listToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

/**
 * Helper function to compare arrays
 */
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

/**
 * Test cases for Problem 024: Swap Nodes In Pairs
 */
function testSolution() {
    console.log('Testing 024. Swap Nodes In Pairs');

    // Test case 1: Even number of nodes
    const list1 = createList([1, 2, 3, 4]);
    const result1 = listToArray(solve(list1));
    const expected1 = [2, 1, 4, 3];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Odd number of nodes
    const list2 = createList([1, 2, 3]);
    const result2 = listToArray(solve(list2));
    const expected2 = [2, 1, 3];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: Single node
    const list3 = createList([1]);
    const result3 = listToArray(solve(list3));
    const expected3 = [1];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: Empty list
    const list4 = createList([]);
    const result4 = listToArray(solve(list4));
    const expected4 = [];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: Two nodes
    const list5 = createList([1, 2]);
    const result5 = listToArray(solve(list5));
    const expected5 = [2, 1];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected [${expected5}], got [${result5}]`);

    console.log('All test cases passed for 024. Swap Nodes In Pairs!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 024. Swap Nodes In Pairs ===');
    console.log('Category: Recursion');
    console.log('Difficulty: Medium');
    console.log('');

    const example = createList([1, 2, 3, 4]);
    console.log('Input: [1, 2, 3, 4]');
    const result = solve(example);
    console.log('Output:', listToArray(result));

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution,
    ListNode,
    createList,
    listToArray
};

/**
 * Additional Notes:
 * - This solution uses recursion to elegantly handle pair swapping
 * - The recursive call stack depth is O(n/2) which simplifies to O(n)
 * - An iterative approach could achieve O(1) space complexity
 * - The key insight is that each pair can be processed independently
 */
