"""
# 024. Swap Nodes In Pairs
**Medium**

Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to swap every pair of adjacent nodes in a linked list. This is a perfect use case for recursion where we can handle the current pair and recursively solve for the rest of the list.

### APPROACH:
1. **Base case**: If less than 2 nodes remain, return head
2. **Recursive case**: Swap current pair and recursively handle rest
3. **Link management**: Carefully update pointers to maintain list integrity
4. **Return new head**: After swapping, the second node becomes the new head

### WHY RECURSION WORKS:
- Each pair swap is independent of others
- Recursion naturally handles the "rest of the list"
- Stack manages the complex pointer operations
- Clean separation of concerns (current pair vs remaining list)

### TIME COMPLEXITY: O(n)
Visit each node exactly once

### SPACE COMPLEXITY: O(n)
Recursion stack depth proportional to number of pairs

### EXAMPLE WALKTHROUGH:
```
Input: 1->2->3->4->NULL
Step 1: Swap (1,2), recurse on 3->4
Step 2: Swap (3,4), recurse on NULL (base case)
Step 3: Link 2->4->3->NULL
Step 4: Link 2->4->3->1->NULL
Output: 2->1->4->3->NULL
```

### POINTER MANAGEMENT:
- Save nodes before breaking links
- Update pointers in correct order
- Connect swapped pair to recursively processed rest

### EDGE CASES:
- Empty list: return None
- Single node: return as-is
- Odd number of nodes: last node remains in place

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The recursive approach elegantly handles pointer manipulation:

### Algorithm Steps:
1. **Base case**: Return head if 0 or 1 nodes
2. **Save references**: Store first and second nodes
3. **Recursive call**: Process remaining list starting from third node
4. **Swap current pair**: Update pointers to swap first two nodes
5. **Link result**: Connect swapped pair to recursively processed rest

### Alternative Iterative Approach:
Use dummy node and three pointers to iteratively swap pairs.

</details>
"""

# Definition for singly-linked list
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __repr__(self):
        """String representation for debugging."""
        result = []
        current = self
        while current:
            result.append(str(current.val))
            current = current.next
        return " -> ".join(result) + " -> NULL"


class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        """
        Swap every two adjacent nodes using recursion.

        Args:
            head: Head of the linked list

        Returns:
            Head of the modified list with pairs swapped

        Time Complexity: O(n) - visit each node once
        Space Complexity: O(n) - recursion stack depth
        """
        # Base case: if less than 2 nodes, nothing to swap
        if not head or not head.next:
            return head

        # Save references to first and second nodes
        first = head
        second = head.next

        # Recursively swap pairs in the rest of the list
        first.next = self.swapPairs(second.next)

        # Swap the current pair
        second.next = first

        # Return new head (originally the second node)
        return second

    def swapPairsIterative(self, head: ListNode) -> ListNode:
        """
        Iterative solution using dummy node.

        Args:
            head: Head of the linked list

        Returns:
            Head of the modified list

        Time Complexity: O(n)
        Space Complexity: O(1) - only using constant extra space
        """
        # Create dummy node to simplify edge cases
        dummy = ListNode(0)
        dummy.next = head
        prev = dummy

        # Process pairs while they exist
        while prev.next and prev.next.next:
            # Identify the two nodes to swap
            first = prev.next
            second = prev.next.next

            # Perform the swap
            prev.next = second
            first.next = second.next
            second.next = first

            # Move prev to the end of swapped pair
            prev = first

        return dummy.next

    def swapPairsExplicit(self, head: ListNode) -> ListNode:
        """
        More explicit recursive implementation for clarity.

        Args:
            head: Head of the linked list

        Returns:
            Head of the modified list
        """
        def swap_recursive(node):
            # Base case: less than 2 nodes
            if not node or not node.next:
                return node

            # Store the nodes
            first = node
            second = node.next
            remaining = second.next

            # Recursively process the rest
            new_rest = swap_recursive(remaining)

            # Perform the swap
            second.next = first
            first.next = new_rest

            # Return new head of this segment
            return second

        return swap_recursive(head)


def create_linked_list(values):
    """Helper function to create linked list from values."""
    if not values:
        return None

    head = ListNode(values[0])
    current = head
    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next
    return head


def linked_list_to_list(head):
    """Helper function to convert linked list to Python list."""
    result = []
    current = head
    while current:
        result.append(current.val)
        current = current.next
    return result


def test_solution():
    """Test cases for 024. Swap Nodes In Pairs."""
    solution = Solution()

    # Test case 1: Even number of nodes
    head1 = create_linked_list([1, 2, 3, 4])
    result1 = solution.swapPairs(head1)
    expected1 = [2, 1, 4, 3]
    assert linked_list_to_list(result1) == expected1, f"Expected {expected1}, got {linked_list_to_list(result1)}"

    # Test case 2: Odd number of nodes
    head2 = create_linked_list([1, 2, 3, 4, 5])
    result2 = solution.swapPairs(head2)
    expected2 = [2, 1, 4, 3, 5]
    assert linked_list_to_list(result2) == expected2, f"Expected {expected2}, got {linked_list_to_list(result2)}"

    # Test case 3: Empty list
    head3 = None
    result3 = solution.swapPairs(head3)
    expected3 = []
    assert linked_list_to_list(result3) == expected3, f"Expected {expected3}, got {linked_list_to_list(result3)}"

    # Test case 4: Single node
    head4 = create_linked_list([1])
    result4 = solution.swapPairs(head4)
    expected4 = [1]
    assert linked_list_to_list(result4) == expected4, f"Expected {expected4}, got {linked_list_to_list(result4)}"

    # Test case 5: Two nodes
    head5 = create_linked_list([1, 2])
    result5 = solution.swapPairs(head5)
    expected5 = [2, 1]
    assert linked_list_to_list(result5) == expected5, f"Expected {expected5}, got {linked_list_to_list(result5)}"

    # Test iterative solution
    head6 = create_linked_list([1, 2, 3, 4])
    result6 = solution.swapPairsIterative(head6)
    expected6 = [2, 1, 4, 3]
    assert linked_list_to_list(result6) == expected6, f"Expected {expected6}, got {linked_list_to_list(result6)}"

    # Test explicit recursive solution
    head7 = create_linked_list([1, 2, 3, 4, 5, 6])
    result7 = solution.swapPairsExplicit(head7)
    expected7 = [2, 1, 4, 3, 6, 5]
    assert linked_list_to_list(result7) == expected7, f"Expected {expected7}, got {linked_list_to_list(result7)}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 024. Swap Nodes In Pairs ===")

    # Demonstrate with example
    original = [1, 2, 3, 4, 5]
    head = create_linked_list(original)
    print(f"Original: {original}")
    print(f"Linked list: {head}")

    result = solution.swapPairs(head)
    result_list = linked_list_to_list(result)
    print(f"After swapping pairs: {result_list}")
    print(f"Resulting linked list: {result}")
