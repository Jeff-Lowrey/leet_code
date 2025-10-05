I'll help you implement the Reorder List solution in Python. This solution will reorder a linked list by connecting the first element with the last, second with second to last, and so on.

```python
# Definition for singly-linked list node
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reorderList(self, head: ListNode) -> None:
        """
        Reorders the linked list in-place following the pattern:
        L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...
        
        Args:
            head: Head of the linked list
            
        Returns:
            None (modifies the list in-place)
        """
        if not head or not head.next:
            return
        
        # Step 1: Find the middle of the linked list
        slow = fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        
        # Step 2: Reverse the second half of the linked list
        second = slow.next
        slow.next = None  # Break the list into two parts
        prev = None
        
        while second:
            temp = second.next
            second.next = prev
            prev = second
            second = temp
        
        # Step 3: Merge the two halves
        first = head
        second = prev
        
        while second:
            temp1 = first.next
            temp2 = second.next
            
            first.next = second
            second.next = temp1
            
            first = temp1
            second = temp2

def print_list(head: ListNode) -> None:
    """Helper function to print the linked list"""
    current = head
    while current:
        print(current.val, end=" -> ")
        current = current.next
    print("None")

# Example usage and test cases
def test_reorder_list():
    # Test Case 1: Normal case
    # Input: 1->2->3->4
    # Output: 1->4->2->3
    head1 = ListNode(1)
    head1.next = ListNode(2)
    head1.next.next = ListNode(3)
    head1.next.next.next = ListNode(4)
    
    print("Test Case 1:")
    print("Before reordering:", end=" ")
    print_list(head1)
    Solution().reorderList(head1)
    print("After reordering:", end=" ")
    print_list(head1)
    
    # Test Case 2: Odd length list
    # Input: 1->2->3->4->5
    # Output: 1->5->2->4->3
    head2 = ListNode(1)
    head2.next = ListNode(2)
    head2.next.next = ListNode(3)
    head2.next.next.next = ListNode(4)
    head2.next.next.next.next = ListNode(5)
    
    print("\nTest Case 2:")
    print("Before reordering:", end=" ")
    print_list(head2)
    Solution().reorderList(head2)
    print("After reordering:", end=" ")
    print_list(head2)
    
    # Test Case 3: Single node
    head3 = ListNode(1)
    print("\nTest Case 3:")
    print("Before reordering:", end=" ")
    print_list(head3)
    Solution().reorderList(head3)
    print("After reordering:", end=" ")
    print_list(head3)

if __name__ == "__main__":
    test_reorder_list()
```

This implementation includes:

1. A `ListNode` class for the linked list structure
2. The main `reorderList` solution that works in three steps:
   - Finding the middle of the list
   - Reversing the second half
   - Merging the two halves
3. Helper function to print the linked list
4. Test cases with different scenarios
5. Clear comments explaining the implementation
6. Proper handling of edge cases

The solution follows these steps:
1. First, it finds the middle of the list using slow and fast pointers
2. Then it reverses the second half of the list
3. Finally, it merges the first half with the reversed second half

The time complexity is O(n) where n is the number of nodes in the list, and the space complexity is O(1) as it modifies the list in-place.

The code handles various edge cases including:
- Empty list
- Single node list
- Even and odd length lists

When you run this code, it will demonstrate the reordering with different test cases and print the results.