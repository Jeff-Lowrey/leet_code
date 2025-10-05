I'll help you create a solution for merging two sorted linked lists in Python. Here's the complete implementation:

```python
#!/usr/bin/env python3
"""
LeetCode 21: Merge Two Sorted Lists
https://leetcode.com/problems/merge-two-sorted-lists/

This module implements the solution for merging two sorted linked lists.
The resulting merged list should be made by splicing together the nodes
of the first two lists and should also be sorted.
"""

class ListNode:
    """Definition for singly-linked list node."""
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(list1: ListNode, list2: ListNode) -> ListNode:
    """
    Merges two sorted linked lists into a single sorted linked list.
    
    Args:
        list1: Head of the first sorted linked list
        list2: Head of the second sorted linked list
    
    Returns:
        Head of the merged sorted linked list
    """
    # Create a dummy node to serve as the head of the merged list
    dummy = ListNode(0)
    current = dummy
    
    # Traverse both lists while comparing values
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    
    # Append remaining nodes from either list
    if list1:
        current.next = list1
    if list2:
        current.next = list2
    
    return dummy.next

def create_linked_list(arr):
    """
    Helper function to create a linked list from an array.
    
    Args:
        arr: List of values to create linked list from
    
    Returns:
        Head of the created linked list
    """
    if not arr:
        return None
    
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def print_linked_list(head):
    """
    Helper function to print a linked list.
    
    Args:
        head: Head of the linked list to print
    """
    values = []
    current = head
    while current:
        values.append(str(current.val))
        current = current.next
    print(" -> ".join(values) if values else "None")

def main():
    """
    Main function to demonstrate the merge operation with example cases.
    """
    # Test Case 1
    list1 = create_linked_list([1, 2, 4])
    list2 = create_linked_list([1, 3, 4])
    print("Test Case 1:")
    print("List 1:", end=" ")
    print_linked_list(list1)
    print("List 2:", end=" ")
    print_linked_list(list2)
    result = mergeTwoLists(list1, list2)
    print("Merged:", end=" ")
    print_linked_list(result)
    print()

    # Test Case 2 (Empty lists)
    list1 = create_linked_list([])
    list2 = create_linked_list([])
    print("Test Case 2 (Empty lists):")
    print("List 1:", end=" ")
    print_linked_list(list1)
    print("List 2:", end=" ")
    print_linked_list(list2)
    result = mergeTwoLists(list1, list2)
    print("Merged:", end=" ")
    print_linked_list(result)
    print()

    # Test Case 3 (One empty list)
    list1 = create_linked_list([])
    list2 = create_linked_list([1, 2, 3])
    print("Test Case 3 (One empty list):")
    print("List 1:", end=" ")
    print_linked_list(list1)
    print("List 2:", end=" ")
    print_linked_list(list2)
    result = mergeTwoLists(list1, list2)
    print("Merged:", end=" ")
    print_linked_list(result)

if __name__ == "__main__":
    main()
```

This implementation includes:

1. A `ListNode` class defining the structure of linked list nodes
2. The main `mergeTwoLists` function that implements the merging logic
3. Helper functions for creating and printing linked lists
4. A main function with test cases demonstrating the functionality
5. Proper handling of edge cases (empty lists)
6. Clear comments and documentation

The solution uses a dummy node approach to simplify the merging process and handles all edge cases appropriately. The time complexity is O(n + m) where n and m are the lengths of the input lists, and the space complexity is O(1) since we're only rearranging pointers.

The code follows Python best practices and includes comprehensive test cases to demonstrate the functionality. When run, it will show example merges with different input scenarios.