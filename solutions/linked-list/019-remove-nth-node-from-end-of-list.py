"""
# 019. Remove Nth Node From End Of List
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
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        """
        Remove the nth node from the end of the list using two-pointer technique.

        Args:
            head: Head of the linked list
            n: Position from the end to remove (1-indexed)

        Returns:
            Head of the modified linked list

        Time Complexity: O(n) - single pass through the list
        Space Complexity: O(1) - only using two pointers
        """
        # Create a dummy node to handle edge case where head is removed
        dummy = ListNode(0)
        dummy.next = head

        # Initialize two pointers
        fast = slow = dummy

        # Move fast pointer n+1 steps ahead
        for _ in range(n + 1):
            fast = fast.next

        # Move both pointers until fast reaches the end
        while fast:
            fast = fast.next
            slow = slow.next

        # Remove the nth node from end
        slow.next = slow.next.next

        return dummy.next

    def solve(self, head: ListNode, n: int) -> ListNode:
        """Wrapper method for consistency with template."""
        return self.removeNthFromEnd(head, n)

def list_to_array(head: ListNode) -> list:
    """Convert linked list to array for testing."""
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

def array_to_list(arr: list) -> ListNode:
    """Convert array to linked list for testing."""
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def test_solution():
    """
    Test cases for 019. Remove Nth Node From End Of List.
    """
    solution = Solution()

    # Test case 1: Remove from middle
    head = array_to_list([1, 2, 3, 4, 5])
    result = solution.solve(head, 2)
    expected = [1, 2, 3, 5]
    assert list_to_array(result) == expected, f"Expected {expected}, got {list_to_array(result)}"

    # Test case 2: Remove head (single node)
    head = array_to_list([1])
    result = solution.solve(head, 1)
    expected = []
    assert list_to_array(result) == expected, f"Expected {expected}, got {list_to_array(result)}"

    # Test case 3: Remove head (multiple nodes)
    head = array_to_list([1, 2])
    result = solution.solve(head, 2)
    expected = [2]
    assert list_to_array(result) == expected, f"Expected {expected}, got {list_to_array(result)}"

    # Test case 4: Remove last node
    head = array_to_list([1, 2, 3])
    result = solution.solve(head, 1)
    expected = [1, 2]
    assert list_to_array(result) == expected, f"Expected {expected}, got {list_to_array(result)}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    head = array_to_list([1, 2, 3, 4, 5])
    result = solution.solve(head, 2)
    print(f"Solution for 019. Remove Nth Node From End Of List: {list_to_array(result)}")
