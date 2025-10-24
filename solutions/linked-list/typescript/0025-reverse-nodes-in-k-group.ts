/**
 * # Difficulty: Medium
 *
 * # 025. Reverse Nodes In K Group
 *
 * Difficulty: Easy
 *
 * Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
 *
 * k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
 *
 * You may not alter the values in the list's nodes, only nodes themselves may be changed.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>head = [1,2,3,4,5], k = 2</dd>
 * <dt>Output:</dt>
 * <dd>* [2,1,4,3,5]</dd>
 * <dt>Explanation:</dt>
 * <dd>Reversing nodes in k=2 groups: [1,2,3,4,5] becomes [2,1,4,3,5]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Graph Traversal
 * **Data Structures**: Array, Linked List
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Reverse k nodes at a time using standard reversal. Track previous group's tail and current group's head/tail. Connect groups after reversal. Stop if fewer than k nodes remain.
 *
 * ### APPROACH:
 * 1. **Check if k nodes exist**: Count k nodes ahead; if fewer than k, return head
 * 2. **Reverse k nodes**: Use standard linked list reversal for first k nodes
 * 3. **Track prev and current**: Initialize prev = None, current = head
 * 4. **Iterate k times**: For i in range(k), reverse links
 * 5. **Connect with previous group**: After reversal, original head is now tail
 * 6. **Recursive call**: head.next = reverseKGroup(current, k) to process remaining
 * 7. **Return new head**: Return prev (new head of reversed group)
 *
 * ### WHY THIS WORKS:
 * - Iteratively reverse k-node groups, keeping track of prev group's tail
 * - Check if k nodes remaining before reversing prevents partial reversal
 * - Connecting prev_tail to new group head maintains list continuity
 * - Dummy node simplifies handling first group edge case
 * - O(n) time as each node visited twice (check + reverse), O(1) space
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

### TIME COMPLEXITY:
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

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class Solution {
  /**
   * Reverses nodes in k-group. If remaining nodes < k, leave them as is.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    if (!head || k === 1) {
      return head;
    }

    // Create dummy node to handle head changes
    const dummy = new ListNode(0);
    dummy.next = head;

    // Initialize pointers
    let prevGroup: ListNode | null = dummy;

    while (true) {
      // Check if there are k nodes remaining
      const kth = this.getKthNode(prevGroup, k);
      if (!kth) {
        break;
      }

      // Save the next group's start
      const nextGroup = kth.next;

      // Reverse current group
      let prev: ListNode | null = kth.next;
      let curr: ListNode | null = prevGroup!.next;

      while (curr !== nextGroup) {
        const temp = curr!.next;
        curr!.next = prev;
        prev = curr;
        curr = temp;
      }

      // Connect with previous group
      const temp = prevGroup!.next;
      prevGroup!.next = kth;
      prevGroup = temp;
    }

    return dummy.next;
  }

  /**
   * Get the kth node from current position.
   */
  private getKthNode(curr: ListNode | null, k: number): ListNode | null {
    while (curr && k > 0) {
      curr = curr.next;
      k--;
    }
    return curr;
  }

  /**
   * Alternative recursive approach.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n/k) for recursion stack
   */
  reverseKGroupRecursive(head: ListNode | null, k: number): ListNode | null {
    if (!head) {
      return null;
    }

    // Check if there are k nodes remaining
    let count = 0;
    let curr: ListNode | null = head;
    while (curr && count < k) {
      curr = curr.next;
      count++;
    }

    // If fewer than k nodes, return as is
    if (count < k) {
      return head;
    }

    // Reverse first k nodes
    let prev: ListNode | null = null;
    curr = head;
    for (let i = 0; i < k; i++) {
      const temp = curr!.next;
      curr!.next = prev;
      prev = curr;
      curr = temp;
    }

    // Recursively process remaining list
    // head is now the tail of reversed group
    head.next = this.reverseKGroupRecursive(curr, k);

    // prev is the new head of this group
    return prev;
  }
}

/**
 * Helper function to create linked list from array.
 */
function createLinkedList(values: number[]): ListNode | null {
  if (values.length === 0) {
    return null;
  }

  const head = new ListNode(values[0]);
  let current = head;
  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }
  return head;
}

/**
 * Helper function to convert linked list to array.
 */
function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Solution, ListNode };
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Basic k=2
  const head1 = createLinkedList([1, 2, 3, 4, 5]);
  const result1 = solution.reverseKGroup(head1, 2);
  console.log(`Test 1: ${JSON.stringify(linkedListToArray(result1)) === JSON.stringify([2, 1, 4, 3, 5]) ? "PASS" : "FAIL"}`);

  // Test case 2: k=3
  const head2 = createLinkedList([1, 2, 3, 4, 5]);
  const result2 = solution.reverseKGroup(head2, 3);
  console.log(`Test 2: ${JSON.stringify(linkedListToArray(result2)) === JSON.stringify([3, 2, 1, 4, 5]) ? "PASS" : "FAIL"}`);

  // Test case 3: k=1 (no change)
  const head3 = createLinkedList([1, 2, 3]);
  const result3 = solution.reverseKGroup(head3, 1);
  console.log(`Test 3: ${JSON.stringify(linkedListToArray(result3)) === JSON.stringify([1, 2, 3]) ? "PASS" : "FAIL"}`);

  // Test case 4: k equals list length
  const head4 = createLinkedList([1, 2, 3, 4]);
  const result4 = solution.reverseKGroup(head4, 4);
  console.log(`Test 4: ${JSON.stringify(linkedListToArray(result4)) === JSON.stringify([4, 3, 2, 1]) ? "PASS" : "FAIL"}`);

  // Test case 5: k > list length
  const head5 = createLinkedList([1, 2]);
  const result5 = solution.reverseKGroup(head5, 3);
  console.log(`Test 5: ${JSON.stringify(linkedListToArray(result5)) === JSON.stringify([1, 2]) ? "PASS" : "FAIL"}`);

  // Test case 6: Recursive approach
  const head6 = createLinkedList([1, 2, 3, 4, 5]);
  const result6 = solution.reverseKGroupRecursive(head6, 2);
  console.log(`Test 6: ${JSON.stringify(linkedListToArray(result6)) === JSON.stringify([2, 1, 4, 3, 5]) ? "PASS" : "FAIL"}`);

  // Test case 7: Single node
  const head7 = createLinkedList([1]);
  const result7 = solution.reverseKGroup(head7, 1);
  console.log(`Test 7: ${JSON.stringify(linkedListToArray(result7)) === JSON.stringify([1]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
