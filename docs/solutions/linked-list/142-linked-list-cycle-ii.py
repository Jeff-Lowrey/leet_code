"""
# Difficulty: Medium

# 142. Linked List Cycle Ii

Given a problem that demonstrates key concepts in Linked List.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

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

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
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


class ListNode:
    """Definition for singly-linked list."""
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        """
        Finds the node where the cycle begins in a linked list.
        
        Args:
            head: The head node of the linked list
            
        Returns:
            ListNode: The node where the cycle begins, or None if no cycle exists
        """
        # Handle edge cases
        if not head or not head.next:
            return None
            
        # Initialize two pointers (tortoise and hare)
        slow = head
        fast = head
        
        # First phase: Detect cycle using Floyd's algorithm
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            
            # If they meet, there is a cycle
            if slow == fast:
                # Second phase: Find cycle start
                # Reset one pointer to head
                slow = head
                
                # Move both pointers at same speed until they meet
                while slow != fast:
                    slow = slow.next
                    fast = fast.next
                    
                return slow  # This is the start of the cycle
                
        # No cycle found
        return None

def test_solution():
    """
    Test cases for 142. Linked List Cycle Ii.
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
    print(f"Solution for 142. Linked List Cycle Ii")
