/**
### INTUITION:
The key insight is that track previous node. For each node, change next pointer to previous. Move forward by saving next before changing pointers. Return previous when current is null.

### APPROACH:
1. **Initialize pointers**: Set prev = None, current = head
2. **Iterate until end**: While current is not None
3. **Save next node**: next_node = current.next to avoid losing reference
4. **Reverse link**: current.next = prev to point backwards
5. **Move prev forward**: prev = current
6. **Move current forward**: current = next_node
7. **Return new head**: After loop, return prev as new head

### WHY THIS WORKS:
- This ensures that three-pointer technique (prev, current, next) enables reversal without extra space
- This ensures that saving next pointer before reversing prevents losing rest of list
- This ensures that each node's next pointer flipped exactly once as we traverse
- This ensures that when current becomes null, prev points to new head (original tail)
- This ensures that o(n) time single pass, O(1) space using only three pointers

### EXAMPLE WALKTHROUGH:
Input:
```
1 → 2 → 3 → 4 → 5 → null
```

Step 1: Initialize
prev = null
current = 1
Step 2: Process node 1
next_temp = 2
1.next = null
prev = 1, current = 2

Steps:
Step 1: Result: null ← 1   2 → 3 → 4 → 5
Step 2: Process node 2
Step 3: next_temp = 3
Step 4: next = 1
Step 5: prev = 2, current = 3
Step 6: Result: null ← 1 ← 2   3 → 4 → 5
Step 7: Process node 3
Step 8: next_temp = 4
Step 9: next = 2
Step 10: prev = 3, current = 4
Step 11: Result: null ← 1 ← 2 ← 3   4 → 5
Step 12: Process node 4
Step 13: next_temp = 5
Step 14: next = 3
Step 15: prev = 4, current = 5
Step 16: Result: null ← 1 ← 2 ← 3 ← 4   5
Step 17: Process node 5
Step 18: next_temp = null
Step 19: next = 4
Step 20: prev = 5, current = null
Step 21: Result: null ← 1 ← 2 ← 3 ← 4 ← 5

Output:
```
5 → 4 → 3 → 2 → 1 → null
```

### TIME COMPLEXITY:
O(n)**

- Single pass through the input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

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
   * Reverses a singly linked list iteratively.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  reverseList(head: ListNode | null): ListNode | null {
    // Handle edge cases: empty list or single node
    if (!head || !head.next) {
      return head;
    }

    // Initialize pointers
    let prev: ListNode | null = null;
    let current: ListNode | null = head;

    // Iterate through the list
    while (current) {
      // Store the next node
      const nextTemp = current.next;

      // Reverse the link
      current.next = prev;

      // Move prev and current one step forward
      prev = current;
      current = nextTemp;
    }

    // Return the new head
    return prev;
  }

  /**
   * Reverses a singly linked list recursively.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n) - recursion stack
   */
  reverseListRecursive(head: ListNode | null): ListNode | null {
    // Base case: empty list or single node
    if (!head || !head.next) {
      return head;
    }

    // Recursive case
    const rest = this.reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;

    return rest;
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

  // Test case 1: Normal list
  const head1 = createLinkedList([1, 2, 3, 4, 5]);
  const result1 = solution.reverseList(head1);
  console.log(`Test 1: ${JSON.stringify(linkedListToArray(result1)) === JSON.stringify([5, 4, 3, 2, 1]) ? "PASS" : "FAIL"}`);

  // Test case 2: Single node
  const head2 = createLinkedList([1]);
  const result2 = solution.reverseList(head2);
  console.log(`Test 2: ${JSON.stringify(linkedListToArray(result2)) === JSON.stringify([1]) ? "PASS" : "FAIL"}`);

  // Test case 3: Empty list
  const head3 = null;
  const result3 = solution.reverseList(head3);
  console.log(`Test 3: ${result3 === null ? "PASS" : "FAIL"}`);

  // Test case 4: Two nodes
  const head4 = createLinkedList([1, 2]);
  const result4 = solution.reverseList(head4);
  console.log(`Test 4: ${JSON.stringify(linkedListToArray(result4)) === JSON.stringify([2, 1]) ? "PASS" : "FAIL"}`);

  // Test case 5: Recursive
  const head5 = createLinkedList([1, 2, 3]);
  const result5 = solution.reverseListRecursive(head5);
  console.log(`Test 5: ${JSON.stringify(linkedListToArray(result5)) === JSON.stringify([3, 2, 1]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
