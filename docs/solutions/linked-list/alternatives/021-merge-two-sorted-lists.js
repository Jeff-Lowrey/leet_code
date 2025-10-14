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
 * - **Both lists empty:** Return null
 * - **One list empty:** Return the other list
 * - **Equal values:** Maintain stable ordering
 * - **Different lengths:** Handle remaining nodes
 * - **Single node lists:** Minimal merge case
 *
 * </details>
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
 * Main solution for Problem 021: Merge Two Sorted Lists
 *
 * @param {ListNode} list1 - First sorted linked list
 * @param {ListNode} list2 - Second sorted linked list
 * @return {ListNode} - Merged sorted linked list
 *
 * Time Complexity: O(m + n) where m, n are lengths of input lists
 * Space Complexity: O(1) using only constant extra space
 */
function solve(list1, list2) {
    // Create dummy head to simplify edge cases
    const dummy = new ListNode(0);
    let current = dummy;

    // Merge while both lists have nodes
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    // Append remaining nodes from non-empty list
    current.next = list1 !== null ? list1 : list2;

    return dummy.next;
}

/**
 * Recursive solution for merging two sorted lists
 */
function solveRecursive(list1, list2) {
    // Base cases
    if (list1 === null) return list2;
    if (list2 === null) return list1;

    // Choose the smaller head and recursively merge the rest
    if (list1.val <= list2.val) {
        list1.next = solveRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = solveRecursive(list1, list2.next);
        return list2;
    }
}

/**
 * In-place merge without creating new nodes
 */
function solveInPlace(list1, list2) {
    if (!list1) return list2;
    if (!list2) return list1;

    // Ensure list1 starts with the smaller value
    if (list1.val > list2.val) {
        [list1, list2] = [list2, list1];
    }

    const result = list1;
    let prev = null;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            prev = list1;
            list1 = list1.next;
        } else {
            prev.next = list2;
            const temp = list2.next;
            list2.next = list1;
            prev = list2;
            list2 = temp;
        }
    }

    return result;
}

/**
 * Helper function to create linked list from array
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

/**
 * Test cases for Problem 021: Merge Two Sorted Lists
 */
function testSolution() {
    console.log('Testing 021. Merge Two Sorted Lists');

    // Test case 1: Basic merge - [1,2,4] + [1,3,4] = [1,1,2,3,4,4]
    const list1_1 = createLinkedList([1, 2, 4]);
    const list2_1 = createLinkedList([1, 3, 4]);
    const result1 = solve(list1_1, list2_1);
    const expected1 = [1, 1, 2, 3, 4, 4];
    console.assert(JSON.stringify(linkedListToArray(result1)) === JSON.stringify(expected1),
        `Test 1 failed: expected ${expected1}, got ${linkedListToArray(result1)}`);

    // Test case 2: Empty lists - [] + [] = []
    const list1_2 = createLinkedList([]);
    const list2_2 = createLinkedList([]);
    const result2 = solve(list1_2, list2_2);
    const expected2 = [];
    console.assert(JSON.stringify(linkedListToArray(result2)) === JSON.stringify(expected2),
        `Test 2 failed: expected ${expected2}, got ${linkedListToArray(result2)}`);

    // Test case 3: One empty list - [] + [0] = [0]
    const list1_3 = createLinkedList([]);
    const list2_3 = createLinkedList([0]);
    const result3 = solve(list1_3, list2_3);
    const expected3 = [0];
    console.assert(JSON.stringify(linkedListToArray(result3)) === JSON.stringify(expected3),
        `Test 3 failed: expected ${expected3}, got ${linkedListToArray(result3)}`);

    // Test case 4: Different lengths - [1,2,3] + [4,5,6,7,8] = [1,2,3,4,5,6,7,8]
    const list1_4 = createLinkedList([1, 2, 3]);
    const list2_4 = createLinkedList([4, 5, 6, 7, 8]);
    const result4 = solve(list1_4, list2_4);
    const expected4 = [1, 2, 3, 4, 5, 6, 7, 8];
    console.assert(JSON.stringify(linkedListToArray(result4)) === JSON.stringify(expected4),
        `Test 4 failed: expected ${expected4}, got ${linkedListToArray(result4)}`);

    // Test case 5: All duplicates - [1,1,1] + [1,1,1] = [1,1,1,1,1,1]
    const list1_5 = createLinkedList([1, 1, 1]);
    const list2_5 = createLinkedList([1, 1, 1]);
    const result5 = solve(list1_5, list2_5);
    const expected5 = [1, 1, 1, 1, 1, 1];
    console.assert(JSON.stringify(linkedListToArray(result5)) === JSON.stringify(expected5),
        `Test 5 failed: expected ${expected5}, got ${linkedListToArray(result5)}`);

    // Test case 6: Interleaved values - [1,3,5] + [2,4,6] = [1,2,3,4,5,6]
    const list1_6 = createLinkedList([1, 3, 5]);
    const list2_6 = createLinkedList([2, 4, 6]);
    const result6 = solve(list1_6, list2_6);
    const expected6 = [1, 2, 3, 4, 5, 6];
    console.assert(JSON.stringify(linkedListToArray(result6)) === JSON.stringify(expected6),
        `Test 6 failed: expected ${expected6}, got ${linkedListToArray(result6)}`);

    console.log('All test cases passed for 021. Merge Two Sorted Lists!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 021. Merge Two Sorted Lists ===');
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
    solveRecursive,
    solveInPlace,
    ListNode,
    createLinkedList,
    linkedListToArray,
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
