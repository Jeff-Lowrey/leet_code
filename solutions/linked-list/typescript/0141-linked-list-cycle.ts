/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that use Floyd's cycle detection with fast and slow pointers. Fast moves 2 steps, slow moves 1 step. If they meet, cycle exists. If fast reaches null, no cycle.
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
 * - This ensures that floyd's tortoise and hare algorithm: if there's a cycle, fast pointer will eventually lap slow pointer
 * - This ensures that fast moves 2x speed, so it closes gap by 1 node per iteration, guaranteed to meet
 * - This ensures that if fast reaches null, no cycle exists (linear structure)
 * - This ensures that o(n) time: worst case fast travels 2n nodes before meeting or reaching null
 * - This ensures that o(1) space: only two pointers regardless of list size
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
