I'll help you create a solution for merging K sorted linked lists in Python. I'll implement this with clear comments and proper structure.

```python
# Merge K Sorted Linked Lists
# Time Complexity: O(N * log k) where N is total number of nodes and k is number of lists
# Space Complexity: O(k) for the heap

from typing import List, Optional
import heapq

# Definition for singly-linked list node
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        """
        Merges k sorted linked lists into one sorted linked list.
        
        Args:
            lists: List of heads of sorted linked lists
            
        Returns:
            Head of the merged sorted linked list
        """
        # Handle edge cases
        if not lists:
            return None
        
        # Create a min heap to store the smallest elements
        # Since heapq can't compare ListNodes directly, we'll store tuples of (value, index, node)
        heap = []
        
        # Add the first node from each list to the heap
        for i, head in enumerate(lists):
            if head:
                # We include the index i to handle cases where values are equal
                heapq.heappush(heap, (head.val, i, head))
        
        # Create a dummy node for the result list
        dummy = ListNode(0)
        current = dummy
        
        # Process nodes from the heap until it's empty
        while heap:
            val, i, node = heapq.heappop(heap)
            
            # Add the node to our result list
            current.next = node
            current = current.next
            
            # If there are more nodes in this list, add the next one to the heap
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
        
        return dummy.next

    def createLinkedList(self, arr: List[int]) -> ListNode:
        """
        Helper function to create a linked list from an array.
        """
        if not arr:
            return None
        
        head = ListNode(arr[0])
        current = head
        for val in arr[1:]:
            current.next = ListNode(val)
            current = current.next
        return head

    def printList(self, head: ListNode) -> None:
        """
        Helper function to print a linked list.
        """
        current = head
        while current:
            print(current.val, end=" -> ")
            current = current.next
        print("None")


# Example usage and testing
def main():
    solution = Solution()
    
    # Create sample linked lists
    list1 = solution.createLinkedList([1, 4, 5])
    list2 = solution.createLinkedList([1, 3, 4])
    list3 = solution.createLinkedList([2, 6])
    
    # Merge the lists
    lists = [list1, list2, list3]
    print("Input lists:")
    for lst in lists:
        solution.printList(lst)
    
    merged = solution.mergeKLists(lists)
    
    print("\nMerged list:")
    solution.printList(merged)


if __name__ == "__main__":
    main()
```

This implementation includes:

1. A `ListNode` class for the linked list structure
2. The main `mergeKLists` function that uses a min heap to efficiently merge K sorted lists
3. Helper functions for creating and printing linked lists
4. A main function with example usage
5. Proper type hints and documentation
6. Edge case handling
7. Efficient implementation using a heap (priority queue)

The solution uses a min heap to always keep track of the smallest current node among all lists, resulting in an efficient O(N * log k) time complexity where N is the total number of nodes and k is the number of lists.

The code handles edge cases like empty input lists and provides helper functions to make testing and verification easier. The implementation follows Python best practices and includes clear comments explaining the logic and complexity.

When run, it will demonstrate the merging of three sample sorted linked lists, but can handle any number of input lists.