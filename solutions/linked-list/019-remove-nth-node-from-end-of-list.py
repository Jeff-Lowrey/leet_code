I'll help you create a solution for removing the nth node from the end of a linked list in Python. Here's the implementation:

```python
from typing import Optional

class ListNode:
    """Definition for singly-linked list node."""
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:
    """
    Remove the nth node from the end of a linked list and return its head.
    
    Args:
        head: The head of the linked list
        n: Position from the end to remove (1-based indexing)
    
    Returns:
        The head of the modified linked list
    
    Time Complexity: O(n) where n is the length of the list
    Space Complexity: O(1)
    """
    # Handle edge case of empty list
    if not head:
        return None
    
    # Create a dummy node to handle edge cases (like removing the head)
    dummy = ListNode(0)
    dummy.next = head
    
    # Initialize two pointers
    first = dummy
    second = dummy
    
    # Move first pointer n+1 steps ahead
    for i in range(n + 1):
        if not first:
            return head
        first = first.next
    
    # Move both pointers until first reaches the end
    while first:
        first = first.next
        second = second.next
    
    # Remove the nth node by updating the next pointer
    second.next = second.next.next
    
    return dummy.next


def create_linked_list(arr):
    """Helper function to create a linked list from an array."""
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head


def print_linked_list(head):
    """Helper function to print a linked list."""
    result = []
    current = head
    while current:
        result.append(str(current.val))
        current = current.next
    return ' -> '.join(result) if result else 'Empty'


# Test cases
def test_remove_nth_from_end():
    """Test function with various test cases."""
    # Test case 1: Regular case
    test1 = create_linked_list([1, 2, 3, 4, 5])
    result1 = removeNthFromEnd(test1, 2)
    print("Test 1:", print_linked_list(result1))  # Expected: 1 -> 2 -> 3 -> 5
    
    # Test case 2: Remove head
    test2 = create_linked_list([1])
    result2 = removeNthFromEnd(test2, 1)
    print("Test 2:", print_linked_list(result2))  # Expected: Empty
    
    # Test case 3: Remove last element
    test3 = create_linked_list([1, 2, 3])
    result3 = removeNthFromEnd(test3, 1)
    print("Test 3:", print_linked_list(result3))  # Expected: 1 -> 2


if __name__ == "__main__":
    # Run test cases
    test_remove_nth_from_end()
```

This implementation includes:

1. A `ListNode` class defining the structure of the linked list nodes
2. The main `removeNthFromEnd` function that implements the solution using two pointers
3. Helper functions for creating and printing linked lists
4. Test cases to verify the implementation
5. Proper handling of edge cases
6. Clear comments explaining the implementation and complexity

The solution uses the two-pointer technique:
- One pointer (first) moves n steps ahead
- Then both pointers move until the first reaches the end
- This allows us to find the nth node from the end in one pass

The code handles various edge cases:
- Empty list
- Removing the head node
- Removing the last node
- Lists with only one node

The time complexity is O(n) where n is the length of the list, and space complexity is O(1) as we only use a constant amount of extra space.