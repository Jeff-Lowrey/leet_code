/**
 * # 0002. Add Two Numbers
 *
 * Difficulty: Easy
 *
 * # Difficulty: Medium
 *
 * You are given two `non-empty` linked lists representing two `non-negative` integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 *
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * Example:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: `342 + 465` = 807.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>l1 = [2,4,3], l2 = [5,6,4]</dd>
 * <dt>Output:</dt>
 * <dd>[7,0,8]</dd>
 * <dt>Explanation:</dt>
 * <dd>Adding linked lists 342+465=807 gives [7,0,8] in reverse</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal, Greedy Selection
 * **Data Structures**: Array, String, Linked List
 * **Patterns**: Greedy Algorithm
 * **Time Complexity**: O(max(m, n))
 * **Space Complexity**: O(max(m, n))

 *
 * ### INTUITION:
 * This mimics elementary school `addition! Since` digits are in reverse order,
 * we can add from `left` to `right` (which corresponds to least significant digit first).
 * We need to handle carries just like manual addition.
 *
 * ### APPROACH:
 * 1. Create dummy `head` for `result` linked list
 * 2. Process both lists simultaneously with carry
 * 3. For each position: `sum` = `val1 + val2` + carry
 * 4. Create new `node` with (`sum` % 10), update carry = `sum` // 10
 * 5. Continue until both lists empty and `carry = 0`
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * l1 = [2,4,3] represents 342
 * ```
 *
 * l2 = [5,6,4] represents 465
 *
 * Steps:
 * Step 1: `2 + 5` + 0(carry) = 7, `carry = 0` → node(7)
 * Step 2: `4 + 6` + 0(carry) = 10, `carry = 1` → node(0)
 * Step 3: `3 + 4` + 1(carry) = 8, `carry = 0` → node(8)
 * Step 4: Result: [7,0,8] represents 807
 * 
 * Output:
 * ```
 * [7,0,8] represents 807
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(max(m, n))
 * Where m and n are lengths of the two linked lists. Process each digit once.
 *
 * ### SPACE COMPLEXITY:
 * O(max(m, n))
 * Result list length is max(m, n) or max(m, n) + 1 if final carry exists.
 *
 * ### EDGE CASES:
 * - **Different length lists**: treat missing digits as 0
 * - **Final carry**: create additional node if carry > 0
 * - **One list empty**: continue with other list + carry
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
 * Main solution for Problem 002: Add Two Numbers
 *
 * @param {ListNode} l1 - First linked list representing a number
 * @param {ListNode} l2 - Second linked list representing a number
 * @return {ListNode} - Sum as a linked list
 *
 * Time Complexity: O(max(m, n)) where m, n are lengths of input lists
 * Space Complexity: O(max(m, n)) for the result list
 */
function solve(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  // Process both lists while either has nodes or carry exists
  while (l1 !== null || l2 !== null || carry !== 0) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;

    // Create new node with digit value (sum % 10)
    current.next = new ListNode(sum % 10);
    current = current.next;

    // Update carry for next iteration
    carry = Math.floor(sum / 10);

    // Move to next nodes if they exist
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
}

/**
 * Alternative iterative solution with explicit carry handling
 */
function solveAlternative(l1, l2) {
  let result = new ListNode(0);
  let current = result;
  let carry = 0;

  while (l1 || l2) {
    const x = l1 ? l1.val : 0;
    const y = l2 ? l2.val : 0;
    const sum = carry + x + y;

    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  // Handle final carry
  if (carry > 0) {
    current.next = new ListNode(carry);
  }

  return result.next;
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
 * Test cases for Problem 002: Add Two Numbers
 */
function testSolution() {
  console.log("Testing 002. Add Two Numbers");

  // Test case 1: Basic example - [2,4,3] + [5,6,4] = [7,0,8]
  const l1_1 = createLinkedList([2, 4, 3]);
  const l2_1 = createLinkedList([5, 6, 4]);
  const result1 = solve(l1_1, l2_1);
  const expected1 = [7, 0, 8];
  console.assert(
    JSON.stringify(linkedListToArray(result1)) === JSON.stringify(expected1),
    `Test 1 failed: expected ${expected1}, got ${linkedListToArray(result1)}`,
  );

  // Test case 2: Different lengths - [0] + [5,6,4] = [5,6,4]
  const l1_2 = createLinkedList([0]);
  const l2_2 = createLinkedList([5, 6, 4]);
  const result2 = solve(l1_2, l2_2);
  const expected2 = [5, 6, 4];
  console.assert(
    JSON.stringify(linkedListToArray(result2)) === JSON.stringify(expected2),
    `Test 2 failed: expected ${expected2}, got ${linkedListToArray(result2)}`,
  );

  // Test case 3: Carry propagation - [9,9,9,9,9,9,9] + [9,9,9,9] = [8,9,9,9,0,0,0,1]
  const l1_3 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
  const l2_3 = createLinkedList([9, 9, 9, 9]);
  const result3 = solve(l1_3, l2_3);
  const expected3 = [8, 9, 9, 9, 0, 0, 0, 1];
  console.assert(
    JSON.stringify(linkedListToArray(result3)) === JSON.stringify(expected3),
    `Test 3 failed: expected ${expected3}, got ${linkedListToArray(result3)}`,
  );

  // Test case 4: Single digits - [5] + [5] = [0,1]
  const l1_4 = createLinkedList([5]);
  const l2_4 = createLinkedList([5]);
  const result4 = solve(l1_4, l2_4);
  const expected4 = [0, 1];
  console.assert(
    JSON.stringify(linkedListToArray(result4)) === JSON.stringify(expected4),
    `Test 4 failed: expected ${expected4}, got ${linkedListToArray(result4)}`,
  );

  // Test case 5: One empty list - [] + [1,2,3] = [1,2,3]
  const l1_5 = null;
  const l2_5 = createLinkedList([1, 2, 3]);
  const result5 = solve(l1_5, l2_5);
  const expected5 = [1, 2, 3];
  console.assert(
    JSON.stringify(linkedListToArray(result5)) === JSON.stringify(expected5),
    `Test 5 failed: expected ${expected5}, got ${linkedListToArray(result5)}`,
  );

  // Test case 6: Both single zeros - [0] + [0] = [0]
  const l1_6 = createLinkedList([0]);
  const l2_6 = createLinkedList([0]);
  const result6 = solve(l1_6, l2_6);
  const expected6 = [0];
  console.assert(
    JSON.stringify(linkedListToArray(result6)) === JSON.stringify(expected6),
    `Test 6 failed: expected ${expected6}, got ${linkedListToArray(result6)}`,
  );

  console.log("All test cases passed for 002. Add Two Numbers!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 002. Add Two Numbers ===");
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
  solveAlternative,
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
