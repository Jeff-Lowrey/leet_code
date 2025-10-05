I'll help you implement the Reverse K Group solution in Python. Here's the complete implementation:

```python
#!/usr/bin/env python3
"""
LeetCode Problem 25: Reverse Nodes in k-Group
Implementation of reversing linked list nodes in groups of k.
"""

class ListNode:
    """Definition for singly-linked list node."""
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseKGroup(head: ListNode, k: int) -> ListNode:
    """
    Reverses nodes in k-group segments of a linked list.
    
    Args:
        head: Head node of the linked list
        k: Size of groups to reverse
    
    Returns:
        Head of the modified linked list
    
    Time Complexity: O(n), where n is the number of nodes
    Space Complexity: O(1), only using constant extra space
    """
    if not head or k == 1:
        return head
    
    # Helper function to count nodes
    def getLength(node):
        count = 0
        while node:
            count += 1
            node = node.next
        return count
    
    # Helper function to reverse a segment of the linked list
    def reverseSegment(start, k):
        prev = None
        curr = start
        for _ in range(k):
            if not curr:
                return start, None
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev, curr
    
    length = getLength(head)
    dummy = ListNode(0)
    dummy.next = head
    prev_group_end = dummy
    
    # Process each group
    while length >= k:
        # Current group starts where previous group ended
        curr_group_start = prev_group_end.next
        
        # Reverse current group
        new_group_start, next_group_start = reverseSegment(curr_group_start, k)
        
        # Connect with the rest of the list
        prev_group_end.next = new_group_start
        curr_group_start.next = next_group_start
        
        # Update for next iteration
        prev_group_end = curr_group_start
        length -= k
    
    return dummy.next

def createLinkedList(arr):
    """Helper function to create a linked list from an array."""
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def printLinkedList(head):
    """Helper function to print a linked list."""
    result = []
    current = head
    while current:
        result.append(str(current.val))
        current = current.next
    return ' -> '.join(result)

# Example usage and testing
if __name__ == "__main__":
    # Test Case 1: Basic case
    test1 = createLinkedList([1, 2, 3, 4, 5])
    k1 = 2
    print(f"Test 1 (k={k1}):")
    print("Input:", printLinkedList(test1))
    result1 = reverseKGroup(test1, k1)
    print("Output:", printLinkedList(result1))
    
    # Test Case 2: k = 3
    test2 = createLinkedList([1, 2, 3, 4, 5, 6])
    k2 = 3
    print(f"\nTest 2 (k={k2}):")
    print("Input:", printLinkedList(test2))
    result2 = reverseKGroup(test2, k2)
    print("Output:", printLinkedList(result2))
    
    # Test Case 3: Single node
    test3 = createLinkedList([1])
    k3 = 1
    print(f"\nTest 3 (k={k3}):")
    print("Input:", printLinkedList(test3))
    result3 = reverseKGroup(test3, k3)
    print("Output:", printLinkedList(result3))
```

This implementation includes:

1. A `ListNode` class for the linked list structure
2. The main `reverseKGroup` function that handles the k-group reversal
3. Helper functions for:
   - Creating a linked list from an array
   - Printing a linked list
   - Counting list length
   - Reversing a segment of the list
4. Test cases demonstrating different scenarios

The solution handles:
- Edge cases (empty list, k=1, single node)
- Groups that can't be fully reversed (less than k nodes remaining)
- Proper linking between reversed groups

The code follows Python conventions and includes detailed comments explaining the implementation. The time complexity is O(n) where n is the number of nodes, and space complexity is O(1) as it uses only constant extra space.

To use this code, you can run it directly and it will execute the test cases, or you can import the functions into another Python file.