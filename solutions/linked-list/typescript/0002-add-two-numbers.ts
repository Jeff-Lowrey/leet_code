/**
 * # 2. Add Two Numbers
 * 
 * # Difficulty: Medium
 * 
 * You are given two `non-empty` linked lists representing two `non-negative` integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 * 
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
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
 * 3. For each position: `sum = `val1 + val2` + carry
 * 4. Create new `node` with (`sum` % 10), update carry = `sum` // 10
 * 5. Continue until both lists empty and `carry = 0`
 * 
 * ### WHY THIS WORKS:
 * This works because it mirrors how manual addition operates: processing digits from least to most significant (which the reverse order provides), maintaining a carry that propagates left, and creating the result list node-by-node. The dummy head simplifies edge cases by avoiding null checks, and the loop continues while any input remains or carry exists, ensuring all digits are processed correctly even when lists have different lengths or a final carry needs an extra digit.
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

### TIME COMPLEXITY:
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

class Solution {
  /**
   * Approach: Elementary math with carry
   *         Time Complexity: O(max(m, n))
   *         Space Complexity: O(max(m, n))
   */
  addTwoNumbers(l1: any, l2: any): any {
    // Implementation
    dummy = ListNode(0)
    current = dummy
    carry = 0
    while l1 or l2 or carry:
    val1 = l1.val if l1 else 0
    val2 = l2.val if l2 else 0
    total = val1 + val2 + carry
    carry = total // 10
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  # Test Add Two Numbers
  solution = Solution()
  console.log("Add Two Numbers:")
  test_cases = [([2, 4, 3], [5, 6, 4]), ([0], [0]), ([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])]
  for l1_vals, l2_vals in test_cases:
  l1 = create_list(l1_vals)
  l2 = create_list(l2_vals)
  result = solution.addTwoNumbers(l1, l2)
  console.log(`L1: {l1_vals}`)
  console.log(`L2: {l2_vals}`)
  console.log(`Sum: {list_to_array(result)}\n`)
  # Test Remove Nth Node
  solution_remove = SolutionRemoveNth()
  console.log("Remove Nth Node From End:")
  remove_cases = [([1, 2, 3, 4, 5], 2), ([1], 1), ([1, 2], 1)]
  for values, n in remove_cases:
  head = create_list(values)
  result = solution_remove.removeNthFromEnd(head, n)
  console.log(`List: {values}, n={n}`)
  console.log(`Result: {list_to_array(result)}\n`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;