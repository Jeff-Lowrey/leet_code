"""
23. Merge k Sorted Lists
Hard

You are given an array of k linked-lists lists, each linked-list is sorted in
ascending order. Merge all the linked-lists into one sorted linked-list and return it.

Example:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to merge k sorted lists efficiently. Key insight: always pick the smallest
available element from all list heads.

### APPROACH 1 (Min Heap):
1. Add first node of each list to min heap
2. Pop minimum, add to result
3. Add next node from that list to heap
4. Repeat until heap is empty

### APPROACH 2 (Divide & Conquer):
1. Pair up lists and merge each pair
2. Repeat until only one list remains
3. Uses the classic "merge two sorted lists" as subroutine

### APPROACH 3 (Sequential):
1. Start with first list
2. Merge with second list, then third, etc.
3. Simple but less efficient

### WHY MIN HEAP WORKS:
- Always gives us the globally smallest element
- Maintains sorted order automatically
- Efficient insertion/deletion: O(log k)

### EXAMPLE WALKTHROUGH (Heap):
```
Lists: [1,4,5], [1,3,4], [2,6]
Heap: [1(list1), 1(list2), 2(list3)]
Pop 1(list1) → add 4: [1(list2), 2(list3), 4(list1)]
Pop 1(list2) → add 3: [2(list3), 4(list1), 3(list2)]
...continue until heap empty
```

### TIME COMPLEXITY: O(n log k) where n = total nodes
### SPACE COMPLEXITY: O(k) for heap

</details>
"""

import heapq


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: list[ListNode | None]) -> ListNode | None:
        """
        Approach: Min heap
        Time Complexity: O(n log k) where n is total nodes, k is number of lists
        Space Complexity: O(k)
        """
        # Python3 requires comparison function for custom objects in heap
        ListNode.__lt__ = lambda self, other: self.val < other.val

        dummy = ListNode(0)
        current = dummy
        heap = []

        # Add first node from each list to heap
        for head in lists:
            if head:
                heapq.heappush(heap, head)

        while heap:
            # Get minimum node
            node = heapq.heappop(heap)
            current.next = node
            current = current.next

            # Add next node from same list if exists
            if node.next:
                heapq.heappush(heap, node.next)

        return dummy.next

    def mergeKListsDivideConquer(self, lists: list[ListNode | None]) -> ListNode | None:
        """
        Approach: Divide and Conquer
        Time Complexity: O(n log k)
        Space Complexity: O(1)
        """
        if not lists:
            return None

        def merge_two_lists(l1: ListNode, l2: ListNode) -> ListNode:
            dummy = ListNode(0)
            current = dummy

            while l1 and l2:
                if l1.val <= l2.val:
                    current.next = l1
                    l1 = l1.next
                else:
                    current.next = l2
                    l2 = l2.next
                current = current.next

            current.next = l1 if l1 else l2
            return dummy.next

        # Merge lists in pairs
        while len(lists) > 1:
            merged_lists = []

            # Merge pairs of lists
            for i in range(0, len(lists), 2):
                l1 = lists[i]
                l2 = lists[i + 1] if i + 1 < len(lists) else None
                merged_lists.append(merge_two_lists(l1, l2))

            lists = merged_lists

        return lists[0]

    def mergeKListsBruteForce(self, lists: list[ListNode | None]) -> ListNode | None:
        """
        Approach: Collect all values and sort
        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        values = []

        # Collect all values
        for head in lists:
            while head:
                values.append(head.val)
                head = head.next

        # Sort values
        values.sort()

        # Build result list
        dummy = ListNode(0)
        current = dummy

        for val in values:
            current.next = ListNode(val)
            current = current.next

        return dummy.next


# Helper functions
def create_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    current = head
    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def list_to_array(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    lists1 = [
        create_list([1, 4, 5]),
        create_list([1, 3, 4]),
        create_list([2, 6])
    ]
    result1 = solution.mergeKLists(lists1)
    print("Input: [[1,4,5],[1,3,4],[2,6]]")
    print(f"Output: {list_to_array(result1)}")  # [1,1,2,3,4,4,5,6]

    # Test case 2
    lists2 = []
    result2 = solution.mergeKLists(lists2)
    print("Input: []")
    print(f"Output: {list_to_array(result2)}")  # []
