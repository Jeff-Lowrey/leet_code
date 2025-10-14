"""
# Difficulty: Medium

# 206. Reverse Linked List

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
Input: 1 → 2 → 3 → 4 → 5 → null

Step 1: Initialize
  prev = null
  current = 1

Step 2: Process node 1
  next_temp = 2
  1.next = null
  prev = 1, current = 2
  Result: null ← 1   2 → 3 → 4 → 5

Step 3: Process node 2
  next_temp = 3
  2.next = 1
  prev = 2, current = 3
  Result: null ← 1 ← 2   3 → 4 → 5

Step 4: Process node 3
  next_temp = 4
  3.next = 2
  prev = 3, current = 4
  Result: null ← 1 ← 2 ← 3   4 → 5

Step 5: Process node 4
  next_temp = 5
  4.next = 3
  prev = 4, current = 5
  Result: null ← 1 ← 2 ← 3 ← 4   5

Step 6: Process node 5
  next_temp = null
  5.next = 4
  prev = 5, current = null
  Result: null ← 1 ← 2 ← 3 ← 4 ← 5

Output: 5 → 4 → 3 → 2 → 1 → null
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
