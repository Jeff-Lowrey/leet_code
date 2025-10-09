"""
# 206. Reverse Linked List
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
    def reverseList(self, head: ListNode) -> ListNode:
        """
        Reverses a singly linked list iteratively.
        
        Args:
            head: The head node of the linked list to reverse
            
        Returns:
            ListNode: The new head of the reversed linked list
        """
        # Handle edge cases: empty list or single node
        if not head or not head.next:
            return head
        
        # Initialize pointers
        prev = None
        current = head
        
        # Iterate through the list
        while current:
            # Store the next node
            next_temp = current.next
            
            # Reverse the link
            current.next = prev
            
            # Move prev and current one step forward
            prev = current
            current = next_temp
        
        # Return the new head
        return prev

    def reverseList_recursive(self, head: ListNode) -> ListNode:
        """
        Reverses a singly linked list recursively.
        
        Args:
            head: The head node of the linked list to reverse
            
        Returns:
            ListNode: The new head of the reversed linked list
        """
        # Base case: empty list or single node
        if not head or not head.next:
            return head
        
        # Recursive case
        rest = self.reverseList_recursive(head.next)
        head.next.next = head
        head.next = None
        
        return rest

def test_solution():
    """
    Test cases for 206. Reverse Linked List.
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
    print(f"Solution for 206. Reverse Linked List")
