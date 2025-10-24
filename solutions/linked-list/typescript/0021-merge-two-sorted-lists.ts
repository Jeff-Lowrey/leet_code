/**
 * # Difficulty: Easy
 *
 * # 0021. Merge Two Sorted Lists
 *
 * Difficulty: Easy
 *
 * You are given the heads of two sorted linked lists list1 and list2.
 *
 * Merge the two lists in a sorted manner and return the head of the merged linked list.
 *
 * The list should be made by splicing together the nodes of the first two lists.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>list1 = [1,2,4], list2 = [1,3,4]</dd>
 * <dt>Output:</dt>
 * <dd>[1,1,2,3,4,4]</dd>
 * <dt>Explanation:</dt>
 * <dd>Merging [1,2,4] and [1,3,4] gives [1,1,2,3,4,4]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup
 * **Data Structures**: Hash Set, Array, Linked List
 * **Patterns**: Divide and Conquer
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use dummy node to handle edge cases. Compare nodes from both lists. Advance pointer of smaller node. Continue until both lists exhausted. Return dummy.next.
 *
 * ### APPROACH:
 * 1. **Create dummy node**: Initialize dummy = ListNode(0) to simplify list construction
 * 2. **Initialize current pointer**: Set current = dummy to track position in result list
 * 3. **Compare while both exist**: While list1 and list2 are not None
 * 4. **Choose smaller node**: If list1.val < list2.val, attach list1 to current, advance list1
 * 5. **Otherwise choose list2**: Else attach list2 to current, advance list2
 * 6. **Advance current**: Move current = current.next after each attachment
 * 7. **Attach remaining nodes**: After loop, attach remaining nodes from non-empty list
 * 8. **Return result**: Return dummy.next as the merged list head
 *
 * ### WHY THIS WORKS:
 * - Dummy node eliminates special cases for empty lists and first node selection
 * - Comparing values at each step ensures merged list maintains sorted order
 * - Attaching remaining nodes works because both input lists are already sorted
 * - Only pointer manipulation (no new nodes created) achieves O(1) space
 * - Single pass through both lists achieves O(m + n) time
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * list1 = [1,2,4], list2 = [1,3,4]
 * ```
 *
 * Step 1: Compare and merge
 * 1 ≤ 1: add 1 from list1
 * 2 > 1: add 1 from list2
 * 2 ≤ 3: add 2 from list1
 * 4 > 3: add 3 from list2
 * 4 ≤ 4: add 4 from list1
 * Remaining: 4 from list2
 *
 * Output:
 * ```
 * [1,1,2,3,4,4]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
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
   * Merge two sorted linked lists into one sorted list.
   *
   * Time Complexity: O(m + n)
   * Space Complexity: O(1)
   */
  mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // Create dummy node to simplify edge cases
    const dummy = new ListNode(0);
    let current = dummy;

    // Merge while both lists have nodes
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

    // Attach remaining nodes
    if (list1) {
      current.next = list1;
    }
    if (list2) {
      current.next = list2;
    }

    return dummy.next;
  }

  /**
   * Recursive approach to merge two sorted lists.
   *
   * Time Complexity: O(m + n)
   * Space Complexity: O(m + n) - recursion stack
   */
  mergeTwoListsRecursive(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // Base cases
    if (!list1) return list2;
    if (!list2) return list1;

    // Recursive case
    if (list1.val <= list2.val) {
      list1.next = this.mergeTwoListsRecursive(list1.next, list2);
      return list1;
    } else {
      list2.next = this.mergeTwoListsRecursive(list1, list2.next);
      return list2;
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

  // Test case 1: Normal merge
  const list1 = createLinkedList([1, 2, 4]);
  const list2 = createLinkedList([1, 3, 4]);
  const result1 = solution.mergeTwoLists(list1, list2);
  console.log(`Test 1: ${JSON.stringify(linkedListToArray(result1)) === JSON.stringify([1, 1, 2, 3, 4, 4]) ? "PASS" : "FAIL"}`);

  // Test case 2: One empty
  const list3 = createLinkedList([]);
  const list4 = createLinkedList([0]);
  const result2 = solution.mergeTwoLists(list3, list4);
  console.log(`Test 2: ${JSON.stringify(linkedListToArray(result2)) === JSON.stringify([0]) ? "PASS" : "FAIL"}`);

  // Test case 3: Both empty
  const list5 = createLinkedList([]);
  const list6 = createLinkedList([]);
  const result3 = solution.mergeTwoLists(list5, list6);
  console.log(`Test 3: ${linkedListToArray(result3).length === 0 ? "PASS" : "FAIL"}`);

  // Test case 4: Different lengths
  const list7 = createLinkedList([1, 2]);
  const list8 = createLinkedList([3, 4, 5]);
  const result4 = solution.mergeTwoLists(list7, list8);
  console.log(`Test 4: ${JSON.stringify(linkedListToArray(result4)) === JSON.stringify([1, 2, 3, 4, 5]) ? "PASS" : "FAIL"}`);

  // Test case 5: Recursive
  const list9 = createLinkedList([1, 3, 5]);
  const list10 = createLinkedList([2, 4, 6]);
  const result5 = solution.mergeTwoListsRecursive(list9, list10);
  console.log(`Test 5: ${JSON.stringify(linkedListToArray(result5)) === JSON.stringify([1, 2, 3, 4, 5, 6]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
