"""
2. Add Two Numbers
Medium

You are given two `non-empty` linked lists representing two `non-negative` integers.
The digits are stored in reverse order, and each of their nodes contains a single digit.
Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: `342 + 465` = 807.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This mimics elementary school `addition! Since` digits are in reverse order,
we can add from `left` to `right` (which corresponds to least significant digit first).
We need to handle carries just like manual addition.

### KEY INSIGHT:
- Reverse order means we naturally process least significant digits first
- Use a "carry" variable to handle sums ≥ 10
- Continue until both lists are exhausted AND no carry remains

### APPROACH:
1. Create dummy `head` for `result` linked list
2. Process both lists simultaneously with carry
3. For each position: `sum` = `val1 + val2` + carry
4. Create new `node` with (`sum` % 10), update carry = `sum` // 10
5. Continue until both lists empty and `carry = 0`

### EXAMPLE WALKTHROUGH:
```
l1 = [2,4,3] represents 342
l2 = [5,6,4] represents 465

Step 1: `2 + 5` + 0(carry) = 7, `carry = 0` → node(7)
Step 2: `4 + 6` + 0(carry) = 10, `carry = 1` → node(0)
Step 3: `3 + 4` + 1(carry) = 8, `carry = 0` → node(8)

Result: [7,0,8] represents 807
```

### EDGE CASES:
- **Different length lists**: treat missing digits as 0
- **Final carry**: create additional node if carry > 0
- **One list empty**: continue with other list + carry

### WHY LINKED LIST?
- Numbers can be arbitrarily large (beyond int/long limits)
- Linked list allows dynamic size
- Reverse order makes addition natural (no need to reverse)

### ELEMENTARY MATH PARALLEL:
```
    342
  + 465
  -----
    807
```
We add column by column from `right`, which corresponds to `left-to`-`right` in reversed lists.

</details>
"""

class ListNode:
    def __init__(self, val=0, next=None):
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

            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None

        return dummy.next


"""
19. Remove Nth Node From End of List
Medium

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

        return dummy.next

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
            return head.next

        # Find node before the one to remove
        current = head
        for _ in range(length - n - 1):
            current = current.next

        # Remove node
        current.next = current.next.next

        return head


"""
138. Copy List with Random Pointer
Medium

A linked list of length n is given such that each node contains an additional
random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list.

Example:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
"""

class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
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
            return None

        # First pass: create all nodes
        old_to_new = {}
        current = head
        while current:
            old_to_new[current] = Node(current.val)
            current = current.next

        # Second pass: set next and random pointers
        current = head
        while current:
            if current.next:
                old_to_new[current].next = old_to_new[current.next]
            if current.random:
                old_to_new[current].random = old_to_new[current.random]
            current = current.next

        return old_to_new[head]

    def copyRandomListInterweaving(self, head: Node) -> Node:
        """
        Approach: Interweaving nodes
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not head:
            return None

        # First pass: create cloned nodes and interweave
        current = head
        while current:
            cloned = Node(current.val, current.next)
            current.next = cloned
            current = cloned.next

        # Second pass: set random pointers
        current = head
        while current:
            if current.random:
                current.next.random = current.random.next
            current = current.next.next

        # Third pass: separate the lists
        dummy = Node(0)
        prev = dummy
        current = head

        while current:
            cloned = current.next
            current.next = cloned.next
            prev.next = cloned
            prev = cloned
            current = current.next

        return dummy.next


# Helper functions
def create_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    current = head
    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def list_to_array(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result


# Test cases
if __name__ == "__main__":
    # Test Add Two Numbers
    solution = Solution()

    print("Add Two Numbers:")
    test_cases = [
        ([2, 4, 3], [5, 6, 4]),
        ([0], [0]),
        ([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])
    ]

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
    remove_cases = [
        ([1, 2, 3, 4, 5], 2),
        ([1], 1),
        ([1, 2], 1)
    ]

    for values, n in remove_cases:
        head = create_list(values)
        result = solution_remove.removeNthFromEnd(head, n)
        print(f"List: {values}, n={n}")
        print(f"Result: {list_to_array(result)}\n")
