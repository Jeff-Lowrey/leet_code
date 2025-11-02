/**
 * # Difficulty: Medium
 *
 * # 0143. Reorder List
 *
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
### METADATA:
 * **Techniques**: Hash Table Lookup, Two Pointers, Single Pass
 * **Data Structures**: Hash Set, Array, Linked List
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Find middle using slow/fast pointers. Reverse second half. Merge by alternating nodes from first and second half. Weave them together to reorder the list.
 *
 * ### APPROACH:
 * 1. **Find middle**: Use slow/fast pointers to find middle of list
 * 2. **Split into two halves**: Set slow.next = None to separate
 * 3. **Reverse second half**: Reverse the second half
 * 4. **Initialize pointers**: Set first = head, second = reversed second half
 * 5. **Merge alternately**: While second exists, interleave nodes
 * 6. **Save next pointers**: temp1 = first.next, temp2 = second.next
 * 7. **Link nodes**: first.next = second, second.next = temp1
 * 8. **Advance pointers**: first = temp1, second = temp2
 *
 * ### WHY THIS WORKS:
 * - Three-phase approach: find middle O(n), reverse second half O(n/2), merge O(n) = total O(n)
 * - Slow/fast pointers find middle in one pass without counting length
 * - Reversing second half in-place maintains O(1) space
 * - Merging alternates nodes: first->second->first->second pattern creates desired reordering
 * - In-place manipulation means no extra nodes created, achieving O(1) auxiliary space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * head = [1,2,3,4]
 * ```
 *
 * Step 1: Find middle
 * middle at node 2
 * Step 2: Reverse second half
 *
 * Steps:
 * Step 1: [3,4] → [4,3]
 * Step 2: Merge alternating
 * Step 3: 1 → 4 → 2 → 3
 *
 * Output:
 * ```
 * [1,4,2,3]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
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
   * Reorders the linked list in-place.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  reorderList(head: ListNode | null): void {
    if (!head || !head.next) {
      return;
    }

    // Step 1: Find the middle of the linked list
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast.next && fast.next.next) {
      slow = slow!.next;
      fast = fast.next.next;
    }

    // Step 2: Reverse the second half of the linked list
    let second: ListNode | null = slow!.next;
    slow!.next = null; // Break the list into two parts
    let prev: ListNode | null = null;

    while (second) {
      const temp = second.next;
      second.next = prev;
      prev = second;
      second = temp;
    }

    // Step 3: Merge the two halves
    let first: ListNode | null = head;
    second = prev;

    while (second) {
      const temp1 = first!.next;
      const temp2 = second.next;

      first!.next = second;
      second.next = temp1;

      first = temp1;
      second = temp2;
    }
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

  // Test case 1: Even number of nodes
  const head1 = createLinkedList([1, 2, 3, 4]);
  solution.reorderList(head1);
  console.log(`Test 1: ${JSON.stringify(linkedListToArray(head1)) === JSON.stringify([1, 4, 2, 3]) ? "PASS" : "FAIL"}`);

  // Test case 2: Odd number of nodes
  const head2 = createLinkedList([1, 2, 3, 4, 5]);
  solution.reorderList(head2);
  console.log(`Test 2: ${JSON.stringify(linkedListToArray(head2)) === JSON.stringify([1, 5, 2, 4, 3]) ? "PASS" : "FAIL"}`);

  // Test case 3: Two nodes
  const head3 = createLinkedList([1, 2]);
  solution.reorderList(head3);
  console.log(`Test 3: ${JSON.stringify(linkedListToArray(head3)) === JSON.stringify([1, 2]) ? "PASS" : "FAIL"}`);

  // Test case 4: Three nodes
  const head4 = createLinkedList([1, 2, 3]);
  solution.reorderList(head4);
  console.log(`Test 4: ${JSON.stringify(linkedListToArray(head4)) === JSON.stringify([1, 3, 2]) ? "PASS" : "FAIL"}`);

  // Test case 5: Single node
  const head5 = createLinkedList([1]);
  solution.reorderList(head5);
  console.log(`Test 5: ${JSON.stringify(linkedListToArray(head5)) === JSON.stringify([1]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
