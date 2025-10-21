/**
 * Difficulty: Medium
 *
 * # 143. Reorder List
 *
 * You are given the head of a singly linked-list. The list can be represented as:
 *
 * L0 → L1 → … → Ln - 1 → Ln
 *
 * Reorder the list to be on the following form:
 *
 * L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
 *
 * You may not modify the values in the list's nodes. Only nodes themselves may be changed.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,2,3,4]</dd>
 * <dt>Output:</dt>
 * <dd>[1,4,2,3]</dd>
 * <dt>Explanation:</dt>
 * <dd>The list is reordered by interleaving nodes from the start and end: 1->4->2->3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: Two Pointers, Linked List Traversal
 * **Data Structures**: Linked List
 * **Patterns**: Fast-Slow Pointer, Dummy Head
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * This problem manipulates linked list nodes using pointer techniques, often employing dummy heads and two-pointer approaches.
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
 * Input: head = [1,2,3,4]
 * Step 1: Find middle
 *   middle at node 2
 *
 * Step 2: Reverse second half
 *   [3,4] → [4,3]
 *
 * Step 3: Merge alternating
 *   1 → 4 → 2 → 3
 *
 * Output: [1,4,2,3]
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
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * Main solution for Problem 143: Reorder List
 * Modifies the list in-place
 *
 * @param {ListNode} head - Head of the linked list
 * @return {void} - Modifies list in-place, no return value needed
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(1) using only constant extra space
 */
function solve(head) {
  if (!head || !head.next || !head.next.next) {
    return; // Lists with 0, 1, or 2 nodes need no reordering
  }

  // Step 1: Find the middle of the list
  const middle = findMiddle(head);

  // Step 2: Split the list into two halves
  const secondHalf = middle.next;
  middle.next = null; // Break the connection

  // Step 3: Reverse the second half
  const reversedSecondHalf = reverseList(secondHalf);

  // Step 4: Merge the two halves alternately
  mergeLists(head, reversedSecondHalf);
}

/**
 * Helper function to find the middle of the list
 * For odd length: returns the actual middle
 * For even length: returns the first middle node
 */
function findMiddle(head) {
  let slow = head;
  let fast = head;

  // Use slow/fast pointers to find middle
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

/**
 * Helper function to reverse a linked list
 */
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

/**
 * Helper function to merge two lists alternately
 */
function mergeLists(first, second) {
  while (second) {
    const firstNext = first.next;
    const secondNext = second.next;

    first.next = second;
    second.next = firstNext;

    first = firstNext;
    second = secondNext;
  }
}

/**
 * Alternative solution using array (easier to understand but uses O(n) space)
 */
function solveWithArray(head) {
  if (!head) return;

  // Convert to array
  const nodes = [];
  let current = head;
  while (current) {
    nodes.push(current);
    current = current.next;
  }

  // Reorder using two pointers
  let left = 0;
  let right = nodes.length - 1;

  while (left < right) {
    nodes[left].next = nodes[right];
    left++;

    if (left < right) {
      nodes[right].next = nodes[left];
      right--;
    }
  }

  nodes[left].next = null; // Terminate the list
}

/**
 * Recursive solution (uses O(n) space due to call stack)
 */
function solveRecursive(head) {
  if (!head || !head.next) return head;

  // Find the tail and the node before it
  let prev = null;
  let current = head;

  while (current.next) {
    prev = current;
    current = current.next;
  }

  // Remove the tail
  prev.next = null;

  // Recursively reorder the rest
  const newHead = solveRecursive(head.next);

  // Insert tail after head
  current.next = newHead;
  head.next = current;

  return head;
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
 * Test cases for Problem 143: Reorder List
 */
function testSolution() {
  console.log("Testing 143. Reorder List");

  // Test case 1: Even length list - [1,2,3,4] -> [1,4,2,3]
  const head1 = createLinkedList([1, 2, 3, 4]);
  solve(head1);
  const result1 = linkedListToArray(head1);
  const expected1 = [1, 4, 2, 3];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Odd length list - [1,2,3,4,5] -> [1,5,2,4,3]
  const head2 = createLinkedList([1, 2, 3, 4, 5]);
  solve(head2);
  const result2 = linkedListToArray(head2);
  const expected2 = [1, 5, 2, 4, 3];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Two nodes - [1,2] -> [1,2] (no change needed)
  const head3 = createLinkedList([1, 2]);
  solve(head3);
  const result3 = linkedListToArray(head3);
  const expected3 = [1, 2];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single node - [1] -> [1]
  const head4 = createLinkedList([1]);
  solve(head4);
  const result4 = linkedListToArray(head4);
  const expected4 = [1];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Empty list - [] -> []
  const head5 = createLinkedList([]);
  solve(head5);
  const result5 = linkedListToArray(head5);
  const expected5 = [];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Three nodes - [1,2,3] -> [1,3,2]
  const head6 = createLinkedList([1, 2, 3]);
  solve(head6);
  const result6 = linkedListToArray(head6);
  const expected6 = [1, 3, 2];
  console.assert(
    JSON.stringify(result6) === JSON.stringify(expected6),
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test case 7: Longer list - [1,2,3,4,5,6] -> [1,6,2,5,3,4]
  const head7 = createLinkedList([1, 2, 3, 4, 5, 6]);
  solve(head7);
  const result7 = linkedListToArray(head7);
  const expected7 = [1, 6, 2, 5, 3, 4];
  console.assert(
    JSON.stringify(result7) === JSON.stringify(expected7),
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );

  console.log("All test cases passed for 143. Reorder List!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 143. Reorder List ===");
  console.log("Category: Linked List");
  console.log("Difficulty: Medium");
  console.log("");

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
  solveWithArray,
  solveRecursive,
  findMiddle,
  reverseList,
  mergeLists,
  ListNode,
  createLinkedList,
  linkedListToArray,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on linked list concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
