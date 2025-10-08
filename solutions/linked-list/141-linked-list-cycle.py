"""
# 141. Linked List Cycle
**Medium**

Given a problem that demonstrates key concepts in Linked List.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of linked list concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply linked list methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages linked list principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses linked list techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using linked list method
3. Return the computed result

</details>
"""

class ListNode:
    """Definition for singly-linked list."""
    def __init__(self, val=0, next=None):
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

def create_cycle_list(values: list, pos: int) -> ListNode:
    """
    Create a linked list with a cycle.

    Args:
        values: List of node values
        pos: Position where tail connects (-1 for no cycle)

    Returns:
        Head of the linked list
    """
    if not values:
        return None

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

def test_solution():
    """
    Test cases for 141. Linked List Cycle.
    """
    solution = Solution()

    # Test case 1: List with cycle
    head = create_cycle_list([3, 2, 0, -4], 1)
    result = solution.solve(head)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: List with cycle at head
    head = create_cycle_list([1, 2], 0)
    result = solution.solve(head)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: No cycle
    head = create_cycle_list([1, 2, 3, 4], -1)
    result = solution.solve(head)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Single node, no cycle
    head = create_cycle_list([1], -1)
    result = solution.solve(head)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Empty list
    head = None
    result = solution.solve(head)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    head = create_cycle_list([3, 2, 0, -4], 1)
    result = solution.solve(head)
    print(f"Solution for 141. Linked List Cycle: {result}")
