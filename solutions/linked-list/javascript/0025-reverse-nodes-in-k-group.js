/**
 * ### METADATA:
 *
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
 * - This ensures that the solution leverages linked list principles
 * - This ensures that time complexity is optimized for the given constraints
 * - This ensures that space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * head = [1,2,3,4,5], k = 2
 * ```
 *
 * Step 1: Reverse first k nodes
 *
 * Steps:
 * Step 1: [1,2] → [2,1]
 * Step 2: Reverse next k nodes
 * Step 3: [3,4] → [4,3]
 * Step 4: Last group < k, keep as is
 * Step 5: [5] → [5]
 *
 * Output:
 * ```
 * [2,1,4,3,5]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
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
 * Main solution for Problem 025: Reverse Nodes In K Group
 *
 * @param {ListNode} head - Head of the linked list
 * @param {number} k - Size of each group to reverse
 * @return {ListNode} - Head of modified list
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(1) using only constant extra space
 */
function solve(head, k) {
  if (!head || k === 1) return head;

  // Count total nodes
  let count = 0;
  let current = head;
  while (current) {
    count++;
    current = current.next;
  }

  const dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupEnd = dummy;

  // Process groups of k nodes
  while (count >= k) {
    let groupStart = prevGroupEnd.next;
    let groupEnd = groupStart;

    // Find the end of current group
    for (let i = 1; i < k; i++) {
      groupEnd = groupEnd.next;
    }

    let nextGroupStart = groupEnd.next;

    // Reverse the current group
    const reversedGroupHead = reverseKNodes(groupStart, k);

    // Connect with previous group
    prevGroupEnd.next = reversedGroupHead;

    // groupStart is now the last node of reversed group
    groupStart.next = nextGroupStart;

    // Update for next iteration
    prevGroupEnd = groupStart;
    count -= k;
  }

  return dummy.next;
}

/**
 * Helper function to reverse exactly k nodes starting from head
 */
function reverseKNodes(head, k) {
  let prev = null;
  let current = head;

  for (let i = 0; i < k; i++) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev; // new head of reversed group
}

/**
 * Alternative solution using iterative approach with explicit group handling
 */
function solveAlternative(head, k) {
  if (!head || k === 1) return head;

  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;

  while (prev.next) {
    // Check if we have k nodes remaining
    let curr = prev.next;
    for (let i = 0; i < k && curr; i++) {
      curr = curr.next;
    }

    if (!curr && prev.next) {
      // Less than k nodes remaining, break
      break;
    }

    // We have exactly k nodes, reverse them
    let start = prev.next;
    let next = curr;

    // Reverse k nodes
    let current = start;
    let previous = next;

    for (let i = 0; i < k; i++) {
      const temp = current.next;
      current.next = previous;
      previous = current;
      current = temp;
    }

    prev.next = previous;
    prev = start;
  }

  return dummy.next;
}

/**
 * Recursive solution
 */
function solveRecursive(head, k) {
  // Check if we have at least k nodes
  let current = head;
  let count = 0;
  while (current && count < k) {
    current = current.next;
    count++;
  }

  // If we have k nodes, reverse them
  if (count === k) {
    // Recursively reverse the rest
    current = solveRecursive(current, k);

    // Reverse first k nodes
    let prev = current;
    current = head;
    for (let i = 0; i < k; i++) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    head = prev;
  }

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
 * Test cases for Problem 025: Reverse Nodes In K Group
 */
function testSolution() {
  console.log("Testing 025. Reverse Nodes In K Group");

  // Test case 1: Basic example - [1,2,3,4,5], k=2 -> [2,1,4,3,5]
  const head1 = createLinkedList([1, 2, 3, 4, 5]);
  const result1 = solve(head1, 2);
  const expected1 = [2, 1, 4, 3, 5];
  console.assert(
    JSON.stringify(linkedListToArray(result1)) === JSON.stringify(expected1),
    `Test 1 failed: expected ${expected1}, got ${linkedListToArray(result1)}`,
  );

  // Test case 2: Perfect groups - [1,2,3,4,5,6], k=3 -> [3,2,1,6,5,4]
  const head2 = createLinkedList([1, 2, 3, 4, 5, 6]);
  const result2 = solve(head2, 3);
  const expected2 = [3, 2, 1, 6, 5, 4];
  console.assert(
    JSON.stringify(linkedListToArray(result2)) === JSON.stringify(expected2),
    `Test 2 failed: expected ${expected2}, got ${linkedListToArray(result2)}`,
  );

  // Test case 3: k = 1 (no change) - [1,2,3,4,5], k=1 -> [1,2,3,4,5]
  const head3 = createLinkedList([1, 2, 3, 4, 5]);
  const result3 = solve(head3, 1);
  const expected3 = [1, 2, 3, 4, 5];
  console.assert(
    JSON.stringify(linkedListToArray(result3)) === JSON.stringify(expected3),
    `Test 3 failed: expected ${expected3}, got ${linkedListToArray(result3)}`,
  );

  // Test case 4: k equals list length - [1,2,3], k=3 -> [3,2,1]
  const head4 = createLinkedList([1, 2, 3]);
  const result4 = solve(head4, 3);
  const expected4 = [3, 2, 1];
  console.assert(
    JSON.stringify(linkedListToArray(result4)) === JSON.stringify(expected4),
    `Test 4 failed: expected ${expected4}, got ${linkedListToArray(result4)}`,
  );

  // Test case 5: k > list length - [1,2], k=3 -> [1,2]
  const head5 = createLinkedList([1, 2]);
  const result5 = solve(head5, 3);
  const expected5 = [1, 2];
  console.assert(
    JSON.stringify(linkedListToArray(result5)) === JSON.stringify(expected5),
    `Test 5 failed: expected ${expected5}, got ${linkedListToArray(result5)}`,
  );

  // Test case 6: Empty list - [], k=2 -> []
  const head6 = createLinkedList([]);
  const result6 = solve(head6, 2);
  const expected6 = [];
  console.assert(
    JSON.stringify(linkedListToArray(result6)) === JSON.stringify(expected6),
    `Test 6 failed: expected ${expected6}, got ${linkedListToArray(result6)}`,
  );

  // Test case 7: Single node - [1], k=1 -> [1]
  const head7 = createLinkedList([1]);
  const result7 = solve(head7, 1);
  const expected7 = [1];
  console.assert(
    JSON.stringify(linkedListToArray(result7)) === JSON.stringify(expected7),
    `Test 7 failed: expected ${expected7}, got ${linkedListToArray(result7)}`,
  );

  console.log("All test cases passed for 025. Reverse Nodes In K Group!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 025. Reverse Nodes In K Group ===");
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
  solveRecursive,
  reverseKNodes,
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
