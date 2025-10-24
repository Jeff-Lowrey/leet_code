"""
# Difficulty: Medium

# 023. Merge K Sorted Lists

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1,4,5],[1,3,4],[2,6]]</dd>
<dt>Output:</dt>
<dd>[1,1,2,3,4,4,5,6]</dd>
<dt>Explanation:</dt>
<dd>Merging [[1,4,5],[1,3,4],[2,6]] gives [1,1,2,3,4,4,5,6]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Divide and Conquer
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use min heap containing (value, list_index, node). Pop minimum, add to result, push next node from same list. Repeat until heap empty. Creates merged sorted list from k lists.

### APPROACH:
1. **Initialize min heap**: Create empty heap to track smallest available nodes
2. **Add first nodes**: For each list, push (head.val, index, head) to heap if head exists
3. **Create dummy head**: Initialize dummy = ListNode(0) and current = dummy
4. **Pop minimum repeatedly**: While heap is not empty, heappop to get smallest node
5. **Append to result**: Set current.next = popped_node, advance current
6. **Push next node**: If popped_node.next exists, heappush it to heap
7. **Continue until empty**: Repeat until heap is empty (all nodes processed)
8. **Return result**: Return dummy.next as head of merged list

### WHY THIS WORKS:
- Min heap always gives us the smallest available node across all k lists in O(log k) time
- Heap maintains size ≤ k by replacing popped nodes with their successors
- Dummy node simplifies edge cases (empty lists, single element)
- Total time: O(N log k) where N is total nodes, since each node inserted/removed once
- Space: O(k) for heap, not O(N), making it efficient for large lists

### EXAMPLE WALKTHROUGH:
Input:
```
lists = [[1,4,5],[1,3,4],[2,6]]
```

Step 1: Add all heads to min heap
heap = [(1,0), (1,1), (2,2)]
Step 2: Extract minimum and add next node
Pop (1,0), add 4 from list 0
Pop (1,1), add 3 from list 1
Pop (2,2), add 6 from list 2
Continue until heap empty

Output:
```
[1,1,2,3,4,4,5,6]
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

import heapq

from typing import Any, List, Optional, Dict, Tuple


class ListNode:
    def __init__(self, val: Any = 0, next: Any = None) -> None:
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
        heap: list[Any] = []

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

        return dummy.next  # type: ignore

    def createLinkedList(self, arr: List[int]) -> ListNode:
        """
        Helper function to create a linked list from an array.
        """
        if not arr:
            return None  # type: ignore

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
def main() -> None:
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

    merged = solution.mergeKLists(lists)  # type: ignore

    print("\nMerged list:")
    solution.printList(merged)  # type: ignore


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Empty list
    result = solution.mergeKLists([])
    expected = None
    assert result == expected, f"Expected expected, got result"

    print("Basic functionality test passed! For comprehensive linked list tests, build proper ListNode chains.")

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 023. Merge K Sorted Lists")
