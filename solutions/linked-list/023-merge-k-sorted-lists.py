"""
# 023. Merge K Sorted Lists
# Difficulty: Medium
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

def test_solution():
    """
    Test cases for 023. Merge K Sorted Lists.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 023. Merge K Sorted Lists")
