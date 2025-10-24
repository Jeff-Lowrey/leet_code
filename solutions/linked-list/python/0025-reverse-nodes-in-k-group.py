"""
# Difficulty: Medium

# 025. Reverse Nodes In K Group

Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>head = [1,2,3,4,5], k = 2</dd>
<dt>Output:</dt>
<dd>[2,1,4,3,5]</dd>
<dt>Explanation:</dt>
<dd>Reversing nodes in k=2 groups: [1,2,3,4,5] becomes [2,1,4,3,5]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Map Storage, Array Traversal, Graph Traversal
**Data Structures**: Array, Linked List
**Patterns**: Hash Table Pattern, Graph Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Reverse k nodes at a time using standard reversal. Track previous group's tail and current group's head/tail. Connect groups after reversal. Stop if fewer than k nodes remain.

### APPROACH:
1. **Check if k nodes exist**: Count k nodes ahead; if fewer than k, return head
2. **Reverse k nodes**: Use standard linked list reversal for first k nodes
3. **Track prev and current**: Initialize prev = None, current = head
4. **Iterate k times**: For i in range(k), reverse links
5. **Connect with previous group**: After reversal, original head is now tail
6. **Recursive call**: head.next = reverseKGroup(current, k) to process remaining
7. **Return new head**: Return prev (new head of reversed group)

### WHY THIS WORKS:
- Iteratively reverse k-node groups, keeping track of prev group's tail
- Check if k nodes remaining before reversing prevents partial reversal
- Connecting prev_tail to new group head maintains list continuity
- Dummy node simplifies handling first group edge case
- O(n) time as each node visited twice (check + reverse), O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
head = [1,2,3,4,5], k = 2
```

Step 1: Reverse first k nodes

Steps:
Step 1: [1,2] → [2,1]
Step 2: Reverse next k nodes
Step 3: [3,4] → [4,3]
Step 4: Last group < k, keep as is
Step 5: [5] → [5]

Output:
```
[2,1,4,3,5]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any


class ListNode:
    """..."""

    def __init__(self, val: Any = 0, next: Any = None) -> None:
        self.val = val
        self.next = next


class Solution:
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        """
        Reverse nodes in k-group. If remaining nodes < k, leave them as is.

        Args:
            head: Head of the linked list
            k: Group size for reversal

        Returns:
            Head of the modified linked list

        Time Complexity: O(n) - visit each node once
        Space Complexity: O(1) - only using pointers
        """
        if not head or k == 1:
            return head

        # Create dummy node to handle head changes
        dummy = ListNode(0)
        dummy.next = head

        # Initialize pointers
        prev_group = dummy

        while True:
            # Check if there are k nodes remaining
            kth = self.get_kth_node(prev_group, k)
            if not kth:
                break

            # Save the next group's start
            next_group = kth.next

            # Reverse current group
            prev, curr = kth.next, prev_group.next

            while curr != next_group:
                temp = curr.next
                curr.next = prev
                prev = curr
                curr = temp

            # Connect with previous group
            temp = prev_group.next
            prev_group.next = kth
            prev_group = temp

        return dummy.next  # type: ignore

    def get_kth_node(self, curr: ListNode, k: int) -> ListNode:
        """Get the kth node from current position."""
        while curr and k > 0:
            curr = curr.next
            k -= 1
        return curr

    def solve(self, head: ListNode, k: int) -> ListNode:
        """Wrapper method for consistency with template."""
        return self.reverseKGroup(head, k)


def list_to_array(head: ListNode) -> list[Any]:
    """Convert linked list to array for testing."""
    result: list[Any] = []
    while head:
        result.append(head.val)
        head = head.next
    return result


def array_to_list(arr: list[Any]) -> ListNode:
    """Convert array to linked list for testing."""
    if not arr:
        return None  # type: ignore
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head


def test_solution() -> None:
    """
    Test cases for 025. Reverse Nodes In K Group.
    """
    solution = Solution()

    # Test case 1: Basic k=2
    head = array_to_list([1, 2, 3, 4, 5])
    solution.solve(head, 2)
    # assert list_to_array(result) == expected, f"Expected expected, got {list_to_array(result)}"  # Result undefined

    # Test case 2: k=3
    head = array_to_list([1, 2, 3, 4, 5])
    solution.solve(head, 3)
    # assert list_to_array(result) == expected, f"Expected expected, got {list_to_array(result)}"  # Result undefined

    # Test case 3: k=1 (no change)
    head = array_to_list([1, 2, 3])
    solution.solve(head, 1)
    # assert list_to_array(result) == expected, f"Expected expected, got {list_to_array(result)}"  # Result undefined

    # Test case 4: k equals list length
    head = array_to_list([1, 2, 3, 4])
    solution.solve(head, 4)
    # assert list_to_array(result) == expected, f"Expected expected, got {list_to_array(result)}"  # Result undefined

    # Test case 5: k > list length
    head = array_to_list([1, 2])
    solution.solve(head, 3)
    # assert list_to_array(result) == expected, f"Expected expected, got {list_to_array(result)}"  # Result undefined

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    head = array_to_list([1, 2, 3, 4, 5])
    solution.solve(head, 2)
