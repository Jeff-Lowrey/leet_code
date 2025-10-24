"""
# 0002. Add Two Numbers

# Difficulty: Medium

You are given two `non-empty` linked lists representing two `non-negative` integers.
The digits are stored in reverse order, and each of their nodes contains a single digit.
Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>l1 = [2,4,3], l2 = [5,6,4]</dd>
<dt>Output:</dt>
<dd>[7,0,8]</dd>
<dt>Explanation:</dt>
<dd>Adding linked lists 342+465=807 gives [7,0,8] in reverse</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern, Greedy Algorithm
**Time Complexity**: O(max(m, n))
**Space Complexity**: O(max(m, n))

### INTUITION:
This mimics elementary school `addition! Since` digits are in reverse order,
we can add from `left` to `right` (which corresponds to least significant digit first).
We need to handle carries just like manual addition.

### APPROACH:
1. Create dummy `head` for `result` linked list
2. Process both lists simultaneously with carry
3. For each position: `sum = `val1 + val2` + carry
4. Create new `node` with (`sum` % 10), update carry = `sum` // 10
5. Continue until both lists empty and `carry = 0`

### WHY THIS WORKS:
This works because it mirrors how manual addition operates: processing digits from least to most significant (which the reverse order provides), maintaining a carry that propagates left, and creating the result list node-by-node. The dummy head simplifies edge cases by avoiding null checks, and the loop continues while any input remains or carry exists, ensuring all digits are processed correctly even when lists have different lengths or a final carry needs an extra digit.

### EXAMPLE WALKTHROUGH:
Input:
```
l1 = [2,4,3] represents 342
```

l2 = [5,6,4] represents 465

Steps:
Step 1: `2 + 5` + 0(carry) = 7, `carry = 0` → node(7)
Step 2: `4 + 6` + 0(carry) = 10, `carry = 1` → node(0)
Step 3: `3 + 4` + 1(carry) = 8, `carry = 0` → node(8)
Step 4: Result: [7,0,8] represents 807

Output:
```
[7,0,8] represents 807
```

### TIME COMPLEXITY:
O(max(m, n))
Where m and n are lengths of the two linked lists. Process each digit once.

### SPACE COMPLEXITY:
O(max(m, n))
Result list length is max(m, n) or max(m, n) + 1 if final carry exists.

### EDGE CASES:
- **Different length lists**: treat missing digits as 0
- **Final carry**: create additional node if carry > 0
- **One list empty**: continue with other list + carry

</details>
"""

from typing import Any
import random


class ListNode:
    def __init__(self, val: Any = 0, next: Any = None) -> None:
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        """
        Approach: Elementary math with carry
        Time Complexity: O(max(m, n))
        Space Complexity: O(max(m, n))
        """
        dummy = ListNode(0)
        current = dummy
        carry = 0

        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0

            total = val1 + val2 + carry
            carry = total // 10
            digit = total % 10

            current.next = ListNode(digit)
            current = current.next

            l1 = l1.next if l1 else None  # type: ignore
            l2 = l2.next if l2 else None  # type: ignore

        return dummy.next  # type: ignore


"""
19. Remove Nth Node From End of List
# Difficulty: Medium
Given the head of a linked list, remove the nth node from the end of the list
and return its head.

Example:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
"""


class SolutionRemoveNth:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        """
        Approach: Two pointers with gap
        Time Complexity: O(L)
        Space Complexity: O(1)
        """
        dummy = ListNode(0)
        dummy.next = head
        first = dummy
        second = dummy

        # Move first pointer n+1 steps ahead
        for _ in range(n + 1):
            first = first.next

        # Move both pointers until first reaches end
        while first:
            first = first.next
            second = second.next

        # Remove the nth node
        second.next = second.next.next

        return dummy.next  # type: ignore

    def removeNthFromEndTwoPass(self, head: ListNode, n: int) -> ListNode:
        """
        Approach: Two pass - find length first
        Time Complexity: O(L)
        Space Complexity: O(1)
        """
        # Find length
        length = 0
        current = head
        while current:
            length += 1
            current = current.next

        # Edge case: remove first node
        if length == n:
            return head.next  # type: ignore

        # Find node before the one to remove
        current = head
        for _ in range(length - n - 1):
            current = current.next

        # Remove node
        current.next = current.next.next

        return head


"""
138. Copy List with Random Pointer
# Difficulty: Medium
A linked list of length n is given such that each node contains an additional
random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list.

Example:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
"""


class Node:
    def __init__(self, x: int, next: "Node | None" = None, random: "Node | None" = None) -> None:
        self.val = int(x)
        self.next = next
        self.random = random


class SolutionCopyRandom:
    def copyRandomList(self, head: Node) -> Node:
        """
        Approach: Hash map
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not head:
            return None  # type: ignore

        # First pass: create all nodes
        old_to_new: dict[Any, Any] = {}
        current = head
        while current:
            old_to_new[current] = Node(current.val)
            current = current.next  # type: ignore

        # Second pass: set next and random pointers
        current = head
        while current:
            if current.next:
                old_to_new[current].next = old_to_new[current.next]
            if current.random:
                old_to_new[current].random = old_to_new[current.random]
            current = current.next  # type: ignore

        return old_to_new[head]  # type: ignore

    def copyRandomListInterweaving(self, head: Node) -> Node:
        """
        Approach: Interweaving nodes
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not head:
            return None  # type: ignore

        # First pass: create cloned nodes and interweave
        current = head
        while current:
            cloned = Node(current.val, current.next)
            current.next = cloned
            current = cloned.next  # type: ignore

        # Second pass: set random pointers
        current = head
        while current:
            if current.random:
                current.next.random = current.random.next  # type: ignore
            current = current.next.next  # type: ignore

        # Third pass: separate the lists
        dummy = Node(0)
        prev = dummy
        current = head

        while current:
            cloned = current.next  # type: ignore
            current.next = cloned.next
            prev.next = cloned
            prev = cloned
            current = current.next  # type: ignore

        return dummy.next  # type: ignore


# Helper functions
def create_list(values: list[int]) -> ListNode:
    """Create a linked list from a list of values."""
    if not values:
        return None  # type: ignore
    head = ListNode(values[0])
    current = head
    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next
    return head


def list_to_array(head: ListNode) -> list[int]:
    """Convert a linked list to an array."""
    result: list[Any] = []
    while head:
        result.append(head.val)
        head = head.next
    return result


# Test cases
if __name__ == "__main__":
    # Test Add Two Numbers
    solution = Solution()

    print("Add Two Numbers:")
    test_cases = [([2, 4, 3], [5, 6, 4]), ([0], [0]), ([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])]

    for l1_vals, l2_vals in test_cases:
        l1 = create_list(l1_vals)
        l2 = create_list(l2_vals)
        result = solution.addTwoNumbers(l1, l2)
        print(f"L1: {l1_vals}")
        print(f"L2: {l2_vals}")
        print(f"Sum: {list_to_array(result)}\n")

    # Test Remove Nth Node
    solution_remove = SolutionRemoveNth()

    print("Remove Nth Node From End:")
    remove_cases = [([1, 2, 3, 4, 5], 2), ([1], 1), ([1, 2], 1)]

    for values, n in remove_cases:
        head = create_list(values)
        result = solution_remove.removeNthFromEnd(head, n)
        print(f"List: {values}, n=n")
        print(f"Result: {list_to_array(result)}\n")
