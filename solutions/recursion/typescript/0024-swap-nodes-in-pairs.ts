/**
 * # Difficulty: Medium
 *
 * # 024. Swap Nodes In Pairs
 *
 * Difficulty: Easy
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
 * **Techniques**: Hash Map Storage, Array Traversal, Stack Operations
 * **Data Structures**: Array, Stack, Linked List
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(n)
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
 * Input:
 * ```
 * 1->2->3->4->NULL
 * ```
 *
 * Steps:
 * Step 1: Swap (1,2), recurse on 3->4
 * Step 2: Swap (3,4), recurse on NULL (base case)
 * Step 3: Link 2->4->3->NULL
 * Step 4: Link 2->4->3->1->NULL
 *
 * Output:
 * ```
 * 2->1->4->3->NULL
 * ```

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
   * Swap every two adjacent nodes using recursion.
   *
   * Time Complexity: O(n) - visit each node once
   * Space Complexity: O(n) - recursion stack depth
   */
  swapPairs(head: ListNode | null): ListNode | null {
    // Base case: if less than 2 nodes, nothing to swap
    if (!head || !head.next) {
      return head;
    }

    // Save references to first and second nodes
    const first = head;
    const second = head.next;

    // Recursively swap pairs in the rest of the list
    first.next = this.swapPairs(second.next);

    // Swap the current pair
    second.next = first;

    // Return new head (originally the second node)
    return second;
  }

  /**
   * Iterative solution using dummy node.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1) - only using constant extra space
   */
  swapPairsIterative(head: ListNode | null): ListNode | null {
    // Create dummy node to simplify edge cases
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    // Process pairs while they exist
    while (prev.next && prev.next.next) {
      // Identify the two nodes to swap
      const first = prev.next;
      const second = prev.next.next;

      // Perform the swap
      prev.next = second;
      first.next = second.next;
      second.next = first;

      // Move prev to the end of swapped pair
      prev = first;
    }

    return dummy.next;
  }

  /**
   * More explicit recursive implementation for clarity.
   */
  swapPairsExplicit(head: ListNode | null): ListNode | null {
    const swapRecursive = (node: ListNode | null): ListNode | null => {
      // Base case: less than 2 nodes
      if (!node || !node.next) {
        return node;
      }

      // Store the nodes
      const first = node;
      const second = node.next;
      const remaining = second.next;

      // Recursively process the rest
      const newRest = swapRecursive(remaining);

      // Perform the swap
      second.next = first;
      first.next = newRest;

      // Return new head of this segment
      return second;
    };

    return swapRecursive(head);
  }
}

/**
 * Helper function to create linked list from values.
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
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Even number of nodes
  const head1 = createLinkedList([1, 2, 3, 4]);
  const result1 = solution.swapPairs(head1);
  console.log(`Test 1: ${JSON.stringify(linkedListToArray(result1)) === JSON.stringify([2, 1, 4, 3]) ? "PASS" : "FAIL"}`);

  // Test case 2: Odd number of nodes
  const head2 = createLinkedList([1, 2, 3, 4, 5]);
  const result2 = solution.swapPairs(head2);
  console.log(`Test 2: ${JSON.stringify(linkedListToArray(result2)) === JSON.stringify([2, 1, 4, 3, 5]) ? "PASS" : "FAIL"}`);

  // Test case 3: Empty list
  const head3 = null;
  const result3 = solution.swapPairs(head3);
  console.log(`Test 3: ${JSON.stringify(linkedListToArray(result3)) === JSON.stringify([]) ? "PASS" : "FAIL"}`);

  // Test case 4: Single node
  const head4 = createLinkedList([1]);
  const result4 = solution.swapPairs(head4);
  console.log(`Test 4: ${JSON.stringify(linkedListToArray(result4)) === JSON.stringify([1]) ? "PASS" : "FAIL"}`);

  // Test case 5: Iterative solution
  const head5 = createLinkedList([1, 2, 3, 4]);
  const result5 = solution.swapPairsIterative(head5);
  console.log(`Test 5: ${JSON.stringify(linkedListToArray(result5)) === JSON.stringify([2, 1, 4, 3]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
