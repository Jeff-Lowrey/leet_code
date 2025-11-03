/**
 * # 1019. Next Greater Node In Linked List
 *
 * Difficulty: Medium
 *
 *
 * Given the head of a linked list, return an array of integers answer, where answer[i] is
 * the value of the next greater node of the ith node (1-indexed). If there is no next greater
 * node, answer[i] is 0.
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Stack
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n) - Additional set storage
 *
 * ### INTUITION:
The key insight is that use a monotonic decreasing stack to track indices waiting for their next greater element.
As we traverse, for each node, pop all stack indices with smaller values and update their answers.

### APPROACH:
 * 1. **Convert to array**: Simplifies index access
 * 2. **Monotonic stack**: Store (index, value) pairs
 * 3. **Process**: For each element, pop stack while current > stack top
 * 4. **Update**: Set answer[popped_index] = current_value
 * 5. **Push**: Add current element to stack
 *
 * ### WHY THIS WORKS:
The stack maintains elements in decreasing order. When we find a larger element,
it's the "next greater" for all smaller elements in the stack.

### EXAMPLE WALKTHROUGH:
Input:
```
list = [2,1,5]
```

Stack: [(idx, val)]
i=0, val=2: stack=[(0,2)], answer=[0,0,0]
i=1, val=1: stack=[(0,2),(1,1)], answer=[0,0,0]
i=2, val=5:
- Pop (1,1): answer[1]=5
- Pop (0,2): answer[0]=5
- stack=[(2,5)]
- answer=[5,5,0]
Result: [5,5,0]

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional set storage
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
   * Monotonic stack with array conversion approach.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  nextLargerNodes(head: ListNode | null): number[] {
    // Convert linked list to array
    const values: number[] = [];
    let current = head;
    while (current) {
      values.push(current.val);
      current = current.next;
    }

    const n = values.length;
    const answer: number[] = new Array(n).fill(0);
    const stack: Array<[number, number]> = []; // Stack of [index, value]

    for (let i = 0; i < n; i++) {
      const val = values[i];

      // Pop all elements smaller than current
      while (stack.length > 0 && stack[stack.length - 1][1] < val) {
        const [idx] = stack.pop()!;
        answer[idx] = val;
      }

      stack.push([i, val]);
    }

    return answer;
  }

  /**
   * Alternative: Reverse traversal with stack.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  nextLargerNodesReverse(head: ListNode | null): number[] {
    const values: number[] = [];
    let current = head;
    while (current) {
      values.push(current.val);
      current = current.next;
    }

    const n = values.length;
    const answer: number[] = new Array(n).fill(0);
    const stack: number[] = []; // Stack of values

    // Traverse from right to left
    for (let i = n - 1; i >= 0; i--) {
      // Pop elements <= current
      while (stack.length > 0 && stack[stack.length - 1] <= values[i]) {
        stack.pop();
      }

      // Top of stack is next greater (if exists)
      if (stack.length > 0) {
        answer[i] = stack[stack.length - 1];
      }

      stack.push(values[i]);
    }

    return answer;
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

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Solution, ListNode };
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  const head1 = createLinkedList([2, 1, 5]);
  console.log(`Test 1: ${JSON.stringify(solution.nextLargerNodes(head1)) === JSON.stringify([5, 5, 0]) ? "PASS" : "FAIL"}`);

  // Test case 2: Increasing sequence
  const head2 = createLinkedList([1, 2, 3, 4, 5]);
  console.log(`Test 2: ${JSON.stringify(solution.nextLargerNodes(head2)) === JSON.stringify([2, 3, 4, 5, 0]) ? "PASS" : "FAIL"}`);

  // Test case 3: Decreasing sequence
  const head3 = createLinkedList([5, 4, 3, 2, 1]);
  console.log(`Test 3: ${JSON.stringify(solution.nextLargerNodes(head3)) === JSON.stringify([0, 0, 0, 0, 0]) ? "PASS" : "FAIL"}`);

  // Test case 4: Single element
  const head4 = createLinkedList([5]);
  console.log(`Test 4: ${JSON.stringify(solution.nextLargerNodes(head4)) === JSON.stringify([0]) ? "PASS" : "FAIL"}`);

  // Test case 5: All same
  const head5 = createLinkedList([3, 3, 3]);
  console.log(`Test 5: ${JSON.stringify(solution.nextLargerNodes(head5)) === JSON.stringify([0, 0, 0]) ? "PASS" : "FAIL"}`);

  // Test case 6: Complex case
  const head6 = createLinkedList([2, 7, 4, 3, 5]);
  console.log(`Test 6: ${JSON.stringify(solution.nextLargerNodes(head6)) === JSON.stringify([7, 0, 5, 5, 0]) ? "PASS" : "FAIL"}`);

  // Test case 7: Reverse approach
  const head7 = createLinkedList([2, 1, 5]);
  console.log(`Test 7: ${JSON.stringify(solution.nextLargerNodesReverse(head7)) === JSON.stringify([5, 5, 0]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
