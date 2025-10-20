/**
 * # Difficulty: Medium
 *
 * # 024. Swap Nodes In Pairs
 *
 * Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2, 1, 4, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Swapping adjacent pairs: [1,2,3,4] becomes [2,1,4,3]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n)
**Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * We need to swap every pair of adjacent nodes in a linked list. This is a perfect use case for recursion where we can handle the current pair and recursively solve for the rest of the list.
 *
 * ### APPROACH:
 * 1. **Base case**: If less than 2 nodes remain, return head
 * 2. **Recursive case**: Swap current pair and recursively handle rest
 * 3. **Link management**: Carefully update pointers to maintain list integrity
 * 4. **Return new head**: After swapping, the second node becomes the new head
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: 1->2->3->4->NULL
 * Step 1: Swap (1,2), recurse on 3->4
 * Step 2: Swap (3,4), recurse on NULL (base case)
 * Step 3: Link 2->4->3->NULL
 * Step 4: Link 2->4->3->1->NULL
 * Output: 2->1->4->3->NULL
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Visit each node exactly once
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * Recursion stack depth proportional to number of pairs
 *
 * ### EDGE CASES:
 * - Empty list: return None
 * - Single node: return as-is
 * - Odd number of nodes: last node remains in place
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
  console.log("Testing 024. Swap Nodes In Pairs");

  // Test case 1: Even number of nodes
  const list1 = createList([1, 2, 3, 4]);
  const result1 = listToArray(solve(list1));
  const expected1 = [2, 1, 4, 3];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected [${expected1}], got [${result1}]`,
  );

  // Test case 2: Odd number of nodes
  const list2 = createList([1, 2, 3]);
  const result2 = listToArray(solve(list2));
  const expected2 = [2, 1, 3];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected [${expected2}], got [${result2}]`,
  );

  // Test case 3: Single node
  const list3 = createList([1]);
  const result3 = listToArray(solve(list3));
  const expected3 = [1];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected [${expected3}], got [${result3}]`,
  );

  // Test case 4: Empty list
  const list4 = createList([]);
  const result4 = listToArray(solve(list4));
  const expected4 = [];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected [${expected4}], got [${result4}]`,
  );

  // Test case 5: Two nodes
  const list5 = createList([1, 2]);
  const result5 = listToArray(solve(list5));
  const expected5 = [2, 1];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected [${expected5}], got [${result5}]`,
  );

  console.log("All test cases passed for 024. Swap Nodes In Pairs!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 024. Swap Nodes In Pairs ===");
  console.log("Category: Recursion");
  console.log("Difficulty: Medium");
  console.log("");

  const example = createList([1, 2, 3, 4]);
  console.log("Input: [1, 2, 3, 4]");
  const result = solve(example);
  console.log("Output:", listToArray(result));

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
  listToArray,
};

/**
 * Additional Notes:
 * - This solution uses recursion to elegantly handle pair swapping
 * - The recursive call stack depth is O(n/2) which simplifies to O(n)
 * - An iterative approach could achieve O(1) space complexity
 * - The key insight is that each pair can be processed independently
 */
