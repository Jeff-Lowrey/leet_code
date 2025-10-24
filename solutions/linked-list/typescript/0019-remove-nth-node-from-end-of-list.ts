/**
 * # Difficulty: Medium
 * 
 * # 019. Remove Nth Node From End Of List
 * 
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>head = [1,2,3,4,5], n = 2</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {list_to_array(result)}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Removing 2nd node from end of [1,2,3,4,5] gives [1,2,3,5]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Linked List
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * Use two pointers with n-step gap. Move fast pointer n steps ahead. Then move both until fast reaches end. Slow is now at the node before target. Remove target node.
 * 
 * ### APPROACH:
 * 1. **Create dummy node**: Initialize dummy = ListNode(0, head) to handle edge cases
 * 2. **Use two pointers**: Set fast = slow = dummy for the two-pointer technique
 * 3. **Advance fast pointer**: Move fast n+1 steps ahead to create n-node gap
 * 4. **Move both pointers**: Advance both fast and slow until fast reaches end
 * 5. **Slow at target's previous**: When fast is null, slow is at node before target
 * 6. **Remove target node**: Set slow.next = slow.next.next to skip target node
 * 7. **Return new head**: Return dummy.next as the new head of modified list
 * 
 * ### WHY THIS WORKS:
 * - Two-pointer technique with gap of n creates (n+1) node offset
 * - Dummy node handles edge case of removing first node elegantly
 * - When fast reaches end, slow is at node before target (nth from end)
 * - Single pass O(n) instead of two-pass (count length, then remove)
 * - Gap ensures slow.next points to node to remove, enabling removal
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * head = [1,2,3,4,5], n = 2
 * ```
 *
 * Step 1: Use fast and slow pointers
 * fast moves n+1 steps: reaches node 3
 * slow at dummy node
 * Step 2: Move both until fast reaches end
 * fast at 5, slow at 3
 * slow.next = slow.next.next (remove 4)
 *
 * Output:
 * ```
 * [1,2,3,5]
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

class Solution {
  /**
   * Remove the nth node from the end of the list using two-pointer technique.
   *
   * Args:
   *     head: Head of the linked list
   *     n: Position from the end to remove (1-indexed)
   *
   * Returns:
   *     Head of the modified linked list
   *
   * Time Complexity: O(n) - single pass through the list
   * Space Complexity: O(1) - only using two pointers
   */
  removeNthFromEnd(head: any, n: number): any {
    const dummy = ListNode(0);
    const dummy.next = head;
    const fast = dummy;
    for (let _ = 0; _ < n + 1; _++) {
      const fast = fast.next;
    }
    while (fast) {
      const fast = fast.next;
      const slow = slow.next;
    }
    const slow.next = slow.next.next;
    return dummy.next;
  }

  /**
   * Wrapper method for consistency with template.
   */
  solve(head: any, n: number): any {
    return self.removeNthFromEnd(head, n);
  }

}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution();
  const solution = Solution();
  const head = array_to_list([1, 2, 3, 4, 5]);
  solution.solve(head, 2);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;