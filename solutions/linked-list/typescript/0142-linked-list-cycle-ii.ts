/**
### INTUITION:
The key insight is that use Floyd's algorithm: detect cycle with fast/slow pointers. After meeting, reset one pointer to head. Move both one step at a time. They meet at cycle start due to mathematical property of the algorithm.

### APPROACH:
1. **Phase 1 - detect cycle**: Use slow and fast pointers to detect cycle
2. **Move at different speeds**: slow moves 1 step, fast moves 2 steps per iteration
3. **Find meeting point**: If slow == fast, cycle exists; break
4. **No cycle check**: If fast or fast.next is None, return None
5. **Phase 2 - find cycle start**: Reset slow = head, keep fast at meeting point
6. **Move both at same speed**: Move both 1 step at a time
7. **Find cycle entrance**: When slow == fast again, that's the cycle start
8. **Return result**: Return slow as the cycle entrance node

### WHY THIS WORKS:
- Floyd's algorithm mathematical property: distance from head to cycle start = distance from meeting point to cycle start
- Phase 1 detects cycle existence by having fast catch up to slow
- Phase 2 exploits the distance property: moving both at same speed from head and meeting point
- They must meet at cycle entrance due to equal distances traveled
- O(n) time with two passes, O(1) space with only two pointers

### EXAMPLE WALKTHROUGH:
Input:
```
head = [3,2,0,-4], pos = 1
```

Step 1: Detect cycle
slow and fast meet at -4
Step 2: Find cycle start
slow=3, slow2=3

Steps:
Step 1: slow=2, slow2=2 → both at cycle start

Output:
```
node 2 (cycle begins here)
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

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
   * Finds the node where the cycle begins using Floyd's algorithm.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  detectCycle(head: ListNode | null): ListNode | null {
    // Handle edge cases
    if (!head || !head.next) {
      return null;
    }

    // Initialize two pointers (tortoise and hare)
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    // First phase: Detect cycle using Floyd's algorithm
    while (fast && fast.next) {
      slow = slow!.next;
      fast = fast.next.next;

      // If they meet, there is a cycle
      if (slow === fast) {
        // Second phase: Find cycle start
        // Reset one pointer to head
        slow = head;

        // Move both pointers at same speed until they meet
        while (slow !== fast) {
          slow = slow!.next;
          fast = fast!.next;
        }

        return slow; // This is the start of the cycle
      }
    }

    // No cycle found
    return null;
  }

  /**
   * Alternative approach using hash set.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  detectCycleHashSet(head: ListNode | null): ListNode | null {
    const visited = new Set<ListNode>();
    let current = head;

    while (current) {
      if (visited.has(current)) {
        return current;
      }
      visited.add(current);
      current = current.next;
    }

    return null;
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

  // Test case 1: Cycle at position 1
  const head1 = createCycleList([3, 2, 0, -4], 1);
  const result1 = solution.detectCycle(head1);
  console.log(`Test 1: ${result1 && result1.val === 2 ? "PASS" : "FAIL"}`);

  // Test case 2: Cycle at head
  const head2 = createCycleList([1, 2], 0);
  const result2 = solution.detectCycle(head2);
  console.log(`Test 2: ${result2 && result2.val === 1 ? "PASS" : "FAIL"}`);

  // Test case 3: No cycle
  const head3 = createCycleList([1, 2, 3], -1);
  const result3 = solution.detectCycle(head3);
  console.log(`Test 3: ${result3 === null ? "PASS" : "FAIL"}`);

  // Test case 4: Single node with cycle
  const head4 = new ListNode(1);
  head4.next = head4;
  const result4 = solution.detectCycle(head4);
  console.log(`Test 4: ${result4 && result4.val === 1 ? "PASS" : "FAIL"}`);

  // Test case 5: Hash set approach
  const head5 = createCycleList([1, 2, 3, 4], 2);
  const result5 = solution.detectCycleHashSet(head5);
  console.log(`Test 5: ${result5 && result5.val === 3 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
