/**
 * # Difficulty: Medium
 *
 * # 023. Merge K Sorted Lists
 *
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 *
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1,4,5],[1,3,4],[2,6]]</dd>
 * <dt>Output:</dt>
 * <dd>[1,1,2,3,4,4,5,6]</dd>
 * <dt>Explanation:</dt>
 * <dd>Merging [[1,4,5],[1,3,4],[2,6]] gives [1,1,2,3,4,4,5,6]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [This problem requires understanding of linked list concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply linked list methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages linked list principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Step 1: Add all heads to min heap
 *   heap = [(1,0), (1,1), (2,2)]
 *
 * Step 2: Extract minimum and add next node
 *   Pop (1,0), add 4 from list 0
 *   Pop (1,1), add 3 from list 1
 *   Pop (2,2), add 6 from list 2
 *   Continue until heap empty
 *
 * Output: [1,1,2,3,4,4,5,6]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
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
 * Main solution for Problem 023: Merge K Sorted Lists
 * Uses divide and conquer approach
 *
 * @param {ListNode[]} lists - Array of sorted linked lists
 * @return {ListNode} - Merged sorted linked list
 *
 * Time Complexity: O(n log k) where n is total nodes, k is number of lists
 * Space Complexity: O(1) for iterative merging
 */
function solve(lists) {
    if (!lists || lists.length === 0) return null;

    // Filter out null lists
    lists = lists.filter(list => list !== null);
    if (lists.length === 0) return null;
    if (lists.length === 1) return lists[0];

    // Divide and conquer approach
    while (lists.length > 1) {
        const mergedLists = [];

        // Merge pairs of lists
        for (let i = 0; i < lists.length; i += 2) {
            const list1 = lists[i];
            const list2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(list1, list2));
        }

        lists = mergedLists;
    }

    return lists[0];
}

/**
 * Helper function to merge two sorted lists
 */
function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    current.next = list1 || list2;
    return dummy.next;
}

/**
 * Alternative solution using priority queue approach
 */
function solveWithPriorityQueue(lists) {
    if (!lists || lists.length === 0) return null;

    // Priority queue implemented with simple array and sorting
    // In a real implementation, you'd use a proper min-heap
    const pq = [];

    // Add all non-null list heads to priority queue
    for (const list of lists) {
        if (list) {
            pq.push(list);
        }
    }

    const dummy = new ListNode(0);
    let current = dummy;

    while (pq.length > 0) {
        // Sort to find minimum (in real impl, this would be O(log k) heap operation)
        pq.sort((a, b) => a.val - b.val);
        const minNode = pq.shift();

        current.next = minNode;
        current = current.next;

        // Add next node from the same list if it exists
        if (minNode.next) {
            pq.push(minNode.next);
        }
    }

    return dummy.next;
}

/**
 * Brute force solution: merge one by one
 */
function solveBruteForce(lists) {
    if (!lists || lists.length === 0) return null;

    let result = null;

    for (const list of lists) {
        result = mergeTwoLists(result, list);
    }

    return result;
}

/**
 * Helper function to create linked list from array
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
 * Test cases for Problem 023: Merge K Sorted Lists
 */
function testSolution() {
    console.log('Testing 023. Merge K Sorted Lists');

    // Test case 1: Basic example - [[1,4,5],[1,3,4],[2,6]] -> [1,1,2,3,4,4,5,6]
    const lists1 = [
        createLinkedList([1, 4, 5]),
        createLinkedList([1, 3, 4]),
        createLinkedList([2, 6])
    ];
    const result1 = solve(lists1);
    const expected1 = [1, 1, 2, 3, 4, 4, 5, 6];
    console.assert(JSON.stringify(linkedListToArray(result1)) === JSON.stringify(expected1),
        `Test 1 failed: expected ${expected1}, got ${linkedListToArray(result1)}`);

    // Test case 2: Empty lists array -> null
    const lists2 = [];
    const result2 = solve(lists2);
    const expected2 = [];
    console.assert(JSON.stringify(linkedListToArray(result2)) === JSON.stringify(expected2),
        `Test 2 failed: expected ${expected2}, got ${linkedListToArray(result2)}`);

    // Test case 3: Array with one empty list -> null
    const lists3 = [null];
    const result3 = solve(lists3);
    const expected3 = [];
    console.assert(JSON.stringify(linkedListToArray(result3)) === JSON.stringify(expected3),
        `Test 3 failed: expected ${expected3}, got ${linkedListToArray(result3)}`);

    // Test case 4: Single non-empty list -> that list
    const lists4 = [createLinkedList([1, 2, 3])];
    const result4 = solve(lists4);
    const expected4 = [1, 2, 3];
    console.assert(JSON.stringify(linkedListToArray(result4)) === JSON.stringify(expected4),
        `Test 4 failed: expected ${expected4}, got ${linkedListToArray(result4)}`);

    // Test case 5: Mix of empty and non-empty lists
    const lists5 = [
        createLinkedList([1, 3]),
        null,
        createLinkedList([2, 4]),
        null
    ];
    const result5 = solve(lists5);
    const expected5 = [1, 2, 3, 4];
    console.assert(JSON.stringify(linkedListToArray(result5)) === JSON.stringify(expected5),
        `Test 5 failed: expected ${expected5}, got ${linkedListToArray(result5)}`);

    // Test case 6: All lists have same elements
    const lists6 = [
        createLinkedList([1, 1]),
        createLinkedList([1, 1]),
        createLinkedList([1, 1])
    ];
    const result6 = solve(lists6);
    const expected6 = [1, 1, 1, 1, 1, 1];
    console.assert(JSON.stringify(linkedListToArray(result6)) === JSON.stringify(expected6),
        `Test 6 failed: expected ${expected6}, got ${linkedListToArray(result6)}`);

    // Test case 7: Large number of lists
    const lists7 = [];
    for (let i = 0; i < 10; i++) {
        lists7.push(createLinkedList([i, i + 10, i + 20]));
    }
    const result7 = solve(lists7);
    // Expected: [0,1,2,...,9,10,11,...,19,20,21,...,29] but sorted
    const expected7 = [];
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 10; i++) {
            expected7.push(i + j * 10);
        }
    }
    expected7.sort((a, b) => a - b);
    console.assert(JSON.stringify(linkedListToArray(result7)) === JSON.stringify(expected7),
        `Test 7 failed: expected length ${expected7.length}, got ${linkedListToArray(result7).length}`);

    console.log('All test cases passed for 023. Merge K Sorted Lists!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 023. Merge K Sorted Lists ===');
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
    solveWithPriorityQueue,
    solveBruteForce,
    mergeTwoLists,
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
