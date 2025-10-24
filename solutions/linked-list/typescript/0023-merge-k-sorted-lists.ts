/**
 * # Difficulty: Medium
 *
 * # 0023. Merge K Sorted Lists
 *
 * Difficulty: Easy
 *
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 *
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1,4,5],[1,3,4],[2,6]]</dd>
 * <dt>Output:</dt>
 * <dd>[1,1,2,3,4,4,5,6]</dd>
 * <dt>Explanation:</dt>
 * <dd>Merging [[1,4,5],[1,3,4],[2,6]] gives [1,1,2,3,4,4,5,6]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Divide and Conquer
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use min heap containing (value, list_index, node). Pop minimum, add to result, push next node from same list. Repeat until heap empty. Creates merged sorted list from k lists.
 *
 * ### APPROACH:
 * 1. **Initialize min heap**: Create empty heap to track smallest available nodes
 * 2. **Add first nodes**: For each list, push (head.val, index, head) to heap if head exists
 * 3. **Create dummy head**: Initialize dummy = ListNode(0) and current = dummy
 * 4. **Pop minimum repeatedly**: While heap is not empty, heappop to get smallest node
 * 5. **Append to result**: Set current.next = popped_node, advance current
 * 6. **Push next node**: If popped_node.next exists, heappush it to heap
 * 7. **Continue until empty**: Repeat until heap is empty (all nodes processed)
 * 8. **Return result**: Return dummy.next as head of merged list
 *
 * ### WHY THIS WORKS:
 * - Min heap always gives us the smallest available node across all k lists in O(log k) time
 * - Heap maintains size ≤ k by replacing popped nodes with their successors
 * - Dummy node simplifies edge cases (empty lists, single element)
 * - Total time: O(N log k) where N is total nodes, since each node inserted/removed once
 * - Space: O(k) for heap, not O(N), making it efficient for large lists
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * lists = [[1,4,5],[1,3,4],[2,6]]
 * ```
 *
 * Step 1: Add all heads to min heap
 * heap = [(1,0), (1,1), (2,2)]
 * Step 2: Extract minimum and add next node
 * Pop (1,0), add 4 from list 0
 * Pop (1,1), add 3 from list 1
 * Pop (2,2), add 6 from list 2
 * Continue until heap empty
 *
 * Output:
 * ```
 * [1,1,2,3,4,4,5,6]
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

class MinHeap {
  private heap: Array<{ val: number; index: number; node: ListNode }> = [];

  push(item: { val: number; index: number; node: ListNode }): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): { val: number; index: number; node: ListNode } | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return min;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].val >= this.heap[parentIndex].val) break;

      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild].val < this.heap[smallest].val
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].val < this.heap[smallest].val
      ) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

class Solution {
  /**
   * Merges k sorted linked lists using min heap.
   *
   * Time Complexity: O(N log k) where N is total nodes, k is number of lists
   * Space Complexity: O(k) for the heap
   */
  mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    // Handle edge cases
    if (!lists || lists.length === 0) {
      return null;
    }

    // Create a min heap
    const heap = new MinHeap();

    // Add the first node from each list to the heap
    for (let i = 0; i < lists.length; i++) {
      if (lists[i]) {
        heap.push({ val: lists[i]!.val, index: i, node: lists[i]! });
      }
    }

    // Create a dummy node for the result list
    const dummy = new ListNode(0);
    let current = dummy;

    // Process nodes from the heap until it's empty
    while (heap.size() > 0) {
      const item = heap.pop()!;

      // Add the node to our result list
      current.next = item.node;
      current = current.next;

      // If there are more nodes in this list, add the next one to the heap
      if (item.node.next) {
        heap.push({
          val: item.node.next.val,
          index: item.index,
          node: item.node.next,
        });
      }
    }

    return dummy.next;
  }

  /**
   * Alternative: Divide and conquer approach.
   *
   * Time Complexity: O(N log k)
   * Space Complexity: O(log k) for recursion stack
   */
  mergeKListsDivideConquer(lists: Array<ListNode | null>): ListNode | null {
    if (!lists || lists.length === 0) return null;
    if (lists.length === 1) return lists[0];

    const mergeTwoLists = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
      const dummy = new ListNode(0);
      let current = dummy;

      while (l1 && l2) {
        if (l1.val <= l2.val) {
          current.next = l1;
          l1 = l1.next;
        } else {
          current.next = l2;
          l2 = l2.next;
        }
        current = current.next;
      }

      current.next = l1 || l2;
      return dummy.next;
    };

    const merge = (lists: Array<ListNode | null>, left: number, right: number): ListNode | null => {
      if (left === right) return lists[left];
      if (left > right) return null;

      const mid = Math.floor((left + right) / 2);
      const l1 = merge(lists, left, mid);
      const l2 = merge(lists, mid + 1, right);
      return mergeTwoLists(l1, l2);
    };

    return merge(lists, 0, lists.length - 1);
  }
}

/**
 * Helper function to create linked list from array.
 */
function createLinkedList(values: number[]): ListNode | null {
  if (values.length === 0) return null;

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
  const lists1 = [
    createLinkedList([1, 4, 5]),
    createLinkedList([1, 3, 4]),
    createLinkedList([2, 6]),
  ];
  const result1 = solution.mergeKLists(lists1);
  console.log(`Test 1: ${JSON.stringify(linkedListToArray(result1)) === JSON.stringify([1, 1, 2, 3, 4, 4, 5, 6]) ? "PASS" : "FAIL"}`);

  // Test case 2: Empty lists
  const lists2: Array<ListNode | null> = [];
  const result2 = solution.mergeKLists(lists2);
  console.log(`Test 2: ${result2 === null ? "PASS" : "FAIL"}`);

  // Test case 3: One list
  const lists3 = [createLinkedList([1, 2, 3])];
  const result3 = solution.mergeKLists(lists3);
  console.log(`Test 3: ${JSON.stringify(linkedListToArray(result3)) === JSON.stringify([1, 2, 3]) ? "PASS" : "FAIL"}`);

  // Test case 4: Divide and conquer
  const lists4 = [createLinkedList([1, 4, 5]), createLinkedList([1, 3, 4]), createLinkedList([2, 6])];
  const result4 = solution.mergeKListsDivideConquer(lists4);
  console.log(`Test 4: ${JSON.stringify(linkedListToArray(result4)) === JSON.stringify([1, 1, 2, 3, 4, 4, 5, 6]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
