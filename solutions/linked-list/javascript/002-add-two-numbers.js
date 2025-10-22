/**
 * # Difficulty: Medium
 *
 * You are given two non-empty linked lists representing two non-negative integers.
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Solution {
  /**
   * Add two numbers represented as linked lists.
   *
   * Time Complexity: O(max(m, n))
   * Space Complexity: O(max(m, n))
   */
  addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {
      const val1 = l1 ? l1.val : 0;
      const val2 = l2 ? l2.val : 0;

      const total = val1 + val2 + carry;
      carry = Math.floor(total / 10);
      const digit = total % 10;

      current.next = new ListNode(digit);
      current = current.next;

      l1 = l1 ? l1.next : null;
      l2 = l2 ? l2.next : null;
    }

    return dummy.next;
  }
}

/**
 * 19. Remove Nth Node From End of List
 * # Difficulty: Medium
 *
 * Given the head of a linked list, remove the nth node from the end of the list
 * and return its head.
 */
class SolutionRemoveNth {
  /**
   * Two pointer approach with gap.
   *
   * Time Complexity: O(L)
   * Space Complexity: O(1)
   */
  removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let first = dummy;
    let second = dummy;

    // Move first pointer n+1 steps ahead
    for (let i = 0; i < n + 1; i++) {
      first = first.next;
    }

    // Move both pointers until first reaches end
    while (first) {
      first = first.next;
      second = second.next;
    }

    // Remove the nth node
    second.next = second.next.next;

    return dummy.next;
  }

  /**
   * Two pass approach - find length first.
   *
   * Time Complexity: O(L)
   * Space Complexity: O(1)
   */
  removeNthFromEndTwoPass(head, n) {
    // Find length
    let length = 0;
    let current = head;
    while (current) {
      length++;
      current = current.next;
    }

    // Edge case: remove first node
    if (length === n) {
      return head.next;
    }

    // Find node before the one to remove
    current = head;
    for (let i = 0; i < length - n - 1; i++) {
      current = current.next;
    }

    // Remove node
    current.next = current.next.next;

    return head;
  }
}

/**
 * 138. Copy List with Random Pointer
 * # Difficulty: Medium
 *
 * A linked list of length n is given such that each node contains an additional
 * random pointer, which could point to any node in the list, or null.
 * Construct a deep copy of the list.
 */
class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

class SolutionCopyRandom {
  /**
   * Hash map approach.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  copyRandomList(head) {
    if (!head) {
      return null;
    }

    // First pass: create all nodes
    const oldToNew = new Map();
    let current = head;
    while (current) {
      oldToNew.set(current, new Node(current.val));
      current = current.next;
    }

    // Second pass: set next and random pointers
    current = head;
    while (current) {
      if (current.next) {
        oldToNew.get(current).next = oldToNew.get(current.next);
      }
      if (current.random) {
        oldToNew.get(current).random = oldToNew.get(current.random);
      }
      current = current.next;
    }

    return oldToNew.get(head);
  }

  /**
   * Interweaving nodes approach.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  copyRandomListInterweaving(head) {
    if (!head) {
      return null;
    }

    // First pass: create cloned nodes and interweave
    let current = head;
    while (current) {
      const cloned = new Node(current.val, current.next);
      current.next = cloned;
      current = cloned.next;
    }

    // Second pass: set random pointers
    current = head;
    while (current) {
      if (current.random) {
        current.next.random = current.random.next;
      }
      current = current.next.next;
    }

    // Third pass: separate the lists
    const dummy = new Node(0);
    let prev = dummy;
    current = head;

    while (current) {
      const cloned = current.next;
      current.next = cloned.next;
      prev.next = cloned;
      prev = cloned;
      current = current.next;
    }

    return dummy.next;
  }
}

// Helper functions
function createList(values) {
  if (!values || values.length === 0) {
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

function listToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Solution, SolutionRemoveNth, SolutionCopyRandom, ListNode, Node };
}

// Test cases
if (typeof require !== "undefined" && require.main === module) {
  // Test Add Two Numbers
  const solution = new Solution();

  console.log("Add Two Numbers:");
  const testCases = [
    [[2, 4, 3], [5, 6, 4]],
    [[0], [0]],
    [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]]
  ];

  testCases.forEach(([l1Vals, l2Vals]) => {
    const l1 = createList(l1Vals);
    const l2 = createList(l2Vals);
    const result = solution.addTwoNumbers(l1, l2);
    console.log(`L1: ${JSON.stringify(l1Vals)}`);
    console.log(`L2: ${JSON.stringify(l2Vals)}`);
    console.log(`Sum: ${JSON.stringify(listToArray(result))}\n`);
  });

  // Test Remove Nth Node
  const solutionRemove = new SolutionRemoveNth();

  console.log("Remove Nth Node From End:");
  const removeCases = [
    [[1, 2, 3, 4, 5], 2],
    [[1], 1],
    [[1, 2], 1]
  ];

  removeCases.forEach(([values, n]) => {
    const head = createList(values);
    const result = solutionRemove.removeNthFromEnd(head, n);
    console.log(`List: ${JSON.stringify(values)}, n=${n}`);
    console.log(`Result: ${JSON.stringify(listToArray(result))}\n`);
  });
}
