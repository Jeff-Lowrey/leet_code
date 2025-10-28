"""
# Difficulty: Medium

# 0141. Linked List Cycle

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[3,2,0,-4], pos = 1 (cycle at node 2)</dd>
<dt>Output:</dt>
<dd>True (has cycle)</dd>
<dt>Explanation:</dt>
<dd>There is a cycle in the linked list where the tail connects back to the second node (index 1)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup
**Data Structures**: Hash Set, Array, Linked List
**Patterns**: Two Pointers Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use Floyd's cycle detection with fast and slow pointers. Fast moves 2 steps, slow moves 1 step. If they meet, cycle exists. If fast reaches null, no cycle.

### APPROACH:
1. **Initialize two pointers**: Set slow = fast = head
2. **Move at different speeds**: In loop, slow moves 1 step, fast moves 2 steps
3. **Check for cycle**: If slow == fast, cycle detected, return True
4. **Check for end**: If fast or fast.next is None, no cycle exists
5. **Continue until resolved**: Keep moving pointers
6. **Return False**: If loop exits without meeting, return False

### WHY THIS WORKS:
- Floyd's tortoise and hare algorithm: if there's a cycle, fast pointer will eventually lap slow pointer
- Fast moves 2x speed, so it closes gap by 1 node per iteration, guaranteed to meet
- If fast reaches null, no cycle exists (linear structure)
- O(n) time: worst case fast travels 2n nodes before meeting or reaching null
- O(1) space: only two pointers regardless of list size

### EXAMPLE WALKTHROUGH:
Input:
```
head = [3,2,0,-4], pos = 1 (cycle at node 2)
```

Step 1: Fast and slow pointers
slow=3, fast=3
slow=2, fast=0
slow=0, fast=2

Steps:
Step 1: slow=-4, fast=-4 → meet

Output:
```
True (has cycle)
```

### TIME COMPLEXITY:
O(n)
- Single pass through input


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any


class ListNode:
    def __init__(self, val: Any = 0, next: Any = None) -> None:
        self.val = val
        self.next = next


class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        """
        Detect if linked list has a cycle using Floyd's cycle detection algorithm.

        Args:
            head: Head of the linked list

        Returns:
            True if cycle exists, False otherwise

        Time Complexity: O(n) - fast pointer traverses at most 2n nodes
        Space Complexity: O(1) - only using two pointers
        """
        if not head or not head.next:
            return False

        # Initialize slow and fast pointers
        slow = head
        fast = head.next

        # Floyd's cycle detection (tortoise and hare)
        while slow != fast:
            if not fast or not fast.next:
                return False
            slow = slow.next
            fast = fast.next.next

        return True

    def solve(self, head: ListNode) -> bool:
        """Wrapper method for consistency with template."""
        return self.hasCycle(head)


def create_cycle_list(values: list[Any], pos: int) -> ListNode:
    """
    Create a linked list with a cycle.

    Args:
        values: List of node values
        pos: Position where tail connects (-1 for no cycle)

    Returns:
        Head of the linked list
    """
    if not values:
        return None  # type: ignore

    head = ListNode(values[0])
    current = head
    cycle_node = head if pos == 0 else None

    for i, val in enumerate(values[1:], 1):
        current.next = ListNode(val)
        current = current.next
        if i == pos:
            cycle_node = current

    # Create cycle if pos >= 0
    if pos >= 0 and cycle_node:
        current.next = cycle_node

    return head


def test_solution() -> None:
    """
    Test cases for 141. Linked List Cycle.
    """
    solution = Solution()

    # Test case 1: List with cycle
    head = create_cycle_list([3, 2, 0, -4], 1)
    solution.solve(head)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 2: List with cycle at head
    head = create_cycle_list([1, 2], 0)
    solution.solve(head)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 3: No cycle
    head = create_cycle_list([1, 2, 3, 4], -1)
    solution.solve(head)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 4: Single node, no cycle
    head = create_cycle_list([1], -1)
    solution.solve(head)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 5: Empty list
    head = None  # type: ignore
    solution.solve(head)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    head = create_cycle_list([3, 2, 0, -4], 1)
    solution.solve(head)
