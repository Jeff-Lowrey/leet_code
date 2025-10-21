/**
 * # Difficulty: Medium
 *
 * Given the head of a linked list, return an array of integers answer, where answer[i] is
 * the value of the next greater node of the ith node (1-indexed). If there is no next greater
 * node, answer[i] is 0.
 *
 * Example:
 * Input: head = [2,1,5]
 * Output: [5,5,0]
 * Explanation: For node 2, next greater is 5. For node 1, next greater is 5. For node 5, there is none.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>head = [2,1,5]</dd>
 * <dt>Output:</dt>
 * <dd>[5,5,0]</dd>
 * <dt>Explanation:</dt>
 * <dd>For each node in the linked list, find the value of the next node that is greater: [7,7,7,7,0]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Stack Operations
 * **Data Structures**: Array, Stack, Linked List
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * Use a monotonic decreasing stack to track indices waiting for their next greater element.
 * As we traverse, for each node, pop all stack indices with smaller values and update their answers.
 *
 * ### APPROACH:
 * 1. **Convert to array**: Simplifies index access
 * 2. **Monotonic stack**: Store (index, value) pairs
 * 3. **Process**: For each element, pop stack while current > stack top
 * 4. **Update**: Set answer[popped_index] = current_value
 * 5. **Push**: Add current element to stack
 *
 * ### WHY THIS WORKS:
 * The stack maintains elements in decreasing order. When we find a larger element,
 * it's the "next greater" for all smaller elements in the stack.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * list = [2,1,5]
 * Stack: [(idx, val)]
 *
 * i=0, val=2: stack=[(0,2)], answer=[0,0,0]
 * i=1, val=1: stack=[(0,2),(1,1)], answer=[0,0,0]
 * i=2, val=5:
 *   - Pop (1,1): answer[1]=5
 *   - Pop (0,2): answer[0]=5
 *   - stack=[(2,5)]
 *   - answer=[5,5,0]
 *
 * Result: [5,5,0]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 *
 * ### EDGE CASES:
 * - **Empty list**: Return empty array
 * - **Single node**: Return [0] (no next greater exists)
 * - **Strictly increasing sequence**: Each node's answer is next value, last is 0
 * - **Strictly decreasing sequence**: All answers are 0 (no greater values ahead)
 * - **All same values**: All answers are 0 (no strictly greater values)
 *
 * </details>
 */

/**
 * Definition for singly-linked list node
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Main solution for Problem 1019: Next Greater Node In Linked List
 *
 * @param {ListNode} head - Head of linked list
 * @return {number[]} - Array of next greater values
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(head) {
  // Convert linked list to array for easier index access
  const values = [];
  let current = head;
  while (current) {
    values.push(current.val);
    current = current.next;
  }

  const n = values.length;
  const result = new Array(n).fill(0);
  const stack = []; // Store indices

  for (let i = 0; i < n; i++) {
    // While stack not empty and current value > value at stack top index
    while (stack.length > 0 && values[i] > values[stack[stack.length - 1]]) {
      const index = stack.pop();
      result[index] = values[i];
    }
    stack.push(i);
  }

  return result;
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
 * Helper function to compare arrays
 */
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

/**
 * Test cases for Problem 1019: Next Greater Node In Linked List
 */
function testSolution() {
  console.log("Testing 1019. Next Greater Node In Linked List");

  // Test case 1: Example from problem
  const result1 = solve(createLinkedList([2, 1, 5]));
  const expected1 = [5, 5, 0];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected [${expected1}], got [${result1}]`,
  );

  // Test case 2: Another example
  const result2 = solve(createLinkedList([2, 7, 4, 3, 5]));
  const expected2 = [7, 0, 5, 5, 0];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected [${expected2}], got [${result2}]`,
  );

  // Test case 3: Single node
  const result3 = solve(createLinkedList([1]));
  const expected3 = [0];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected [${expected3}], got [${result3}]`,
  );

  // Test case 4: Decreasing sequence
  const result4 = solve(createLinkedList([5, 4, 3, 2, 1]));
  const expected4 = [0, 0, 0, 0, 0];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected [${expected4}], got [${result4}]`,
  );

  // Test case 5: Increasing sequence
  const result5 = solve(createLinkedList([1, 2, 3, 4, 5]));
  const expected5 = [2, 3, 4, 5, 0];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected [${expected5}], got [${result5}]`,
  );

  console.log(
    "All test cases passed for 1019. Next Greater Node In Linked List!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1019. Next Greater Node In Linked List ===");
  console.log("Category: Monotonic Stack");
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
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
