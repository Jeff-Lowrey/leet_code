/**
 * # Difficulty: Medium
 *
 * # 0141. Linked List Cycle
 *
 *
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 *
 * There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
 *
 * Return true if there is a cycle in the linked list. Otherwise, return false.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3,2,0,-4], pos = 1 (cycle at node 2)</dd>
 * <dt>Output:</dt>
 * <dd>True (has cycle)</dd>
 * <dt>Explanation:</dt>
 * <dd>There is a cycle in the linked list where the tail connects back to the second node (index 1)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup
 * **Data Structures**: Hash Set, Array, Linked List
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use Floyd's cycle detection with fast and slow pointers. Fast moves 2 steps, slow moves 1 step. If they meet, cycle exists. If fast reaches null, no cycle.
 *
 * ### APPROACH:
 * 1. **Initialize two pointers**: Set slow = fast = head
 * 2. **Move at different speeds**: In loop, slow moves 1 step, fast moves 2 steps
 * 3. **Check for cycle**: If slow == fast, cycle detected, return True
 * 4. **Check for end**: If fast or fast.next is None, no cycle exists
 * 5. **Continue until resolved**: Keep moving pointers
 * 6. **Return False**: If loop exits without meeting, return False
 *
 * ### WHY THIS WORKS:
 * - Floyd's tortoise and hare algorithm: if there's a cycle, fast pointer will eventually lap slow pointer
 * - Fast moves 2x speed, so it closes gap by 1 node per iteration, guaranteed to meet
 * - If fast reaches null, no cycle exists (linear structure)
 * - O(n) time: worst case fast travels 2n nodes before meeting or reaching null
 * - O(1) space: only two pointers regardless of list size
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * head = [3,2,0,-4], pos = 1 (cycle at node 2)
 * ```
 *
 * Step 1: Fast and slow pointers
 * slow=3, fast=3
 * slow=2, fast=0
 * slow=0, fast=2
 *
 * Steps:
 * Step 1: slow=-4, fast=-4 → meet
 *
 * Output:
 * ```
 * True (has cycle)
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
   * Detect if linked list has a cycle using Floyd's cycle detection algorithm.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  hasCycle(head: ListNode | null): boolean {
    if (!head || !head.next) {
      return false;
    }

    // Initialize slow and fast pointers
    let slow: ListNode | null = head;
    let fast: ListNode | null = head.next;

    // Floyd's cycle detection (tortoise and hare)
    while (slow !== fast) {
      if (!fast || !fast.next) {
        return false;
      }
      slow = slow!.next;
      fast = fast.next.next;
    }

    return true;
  }

  /**
   * Alternative: using hash set to track visited nodes.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  hasCycleHashSet(head: ListNode | null): boolean {
    const visited = new Set<ListNode>();
    let current = head;

    while (current) {
      if (visited.has(current)) {
        return true;
      }
      visited.add(current);
      current = current.next;
    }

    return false;
  }
}

/**
 * Helper function to create a linked list with optional cycle.
 */
function createCycleList(values: number[], pos: number): ListNode | null {
  if (values.length === 0) {
    return null;
  }

  const head = new ListNode(values[0]);
  let current = head;
  let cycleNode: ListNode | null = pos === 0 ? head : null;

  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
    if (i === pos) {
      cycleNode = current;
    }
  }

  // Create cycle if pos >= 0
  if (pos >= 0 && cycleNode) {
    current.next = cycleNode;
  }

  return head;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Solution, ListNode };
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: List with cycle at position 1
  const head1 = createCycleList([3, 2, 0, -4], 1);
  console.log(`Test 1: ${solution.hasCycle(head1) === true ? "PASS" : "FAIL"}`);

  // Test case 2: List with cycle at head
  const head2 = createCycleList([1, 2], 0);
  console.log(`Test 2: ${solution.hasCycle(head2) === true ? "PASS" : "FAIL"}`);

  // Test case 3: No cycle
  const head3 = createCycleList([1, 2, 3, 4], -1);
  console.log(`Test 3: ${solution.hasCycle(head3) === false ? "PASS" : "FAIL"}`);

  // Test case 4: Single node, no cycle
  const head4 = createCycleList([1], -1);
  console.log(`Test 4: ${solution.hasCycle(head4) === false ? "PASS" : "FAIL"}`);

  // Test case 5: Empty list
  const head5 = null;
  console.log(`Test 5: ${solution.hasCycle(head5) === false ? "PASS" : "FAIL"}`);

  // Test case 6: Hash set approach
  const head6 = createCycleList([1, 2, 3], 1);
  console.log(`Test 6: ${solution.hasCycleHashSet(head6) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
