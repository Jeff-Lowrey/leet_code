"""
# Difficulty: Medium

# 025. Reverse Nodes In K Group

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

class Solution:
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        """
        Reverse nodes in k-group. If remaining nodes < k, leave them as is.

        Args:
            head: Head of the linked list
            k: Group size for reversal

        Returns:
            Head of the modified linked list

        Time Complexity: O(n) - visit each node once
        Space Complexity: O(1) - only using pointers
        """
        if not head or k == 1:
            return head

        # Create dummy node to handle head changes
        dummy = ListNode(0)
        dummy.next = head

        # Initialize pointers
        prev_group = dummy

        while True:
            # Check if there are k nodes remaining
            kth = self.get_kth_node(prev_group, k)
            if not kth:
                break

            # Save the next group's start
            next_group = kth.next

            # Reverse current group
            prev, curr = kth.next, prev_group.next

            while curr != next_group:
                temp = curr.next
                curr.next = prev
                prev = curr
                curr = temp

            # Connect with previous group
            temp = prev_group.next
            prev_group.next = kth
            prev_group = temp

        return dummy.next

    def get_kth_node(self, curr: ListNode, k: int) -> ListNode:
        """Get the kth node from current position."""
        while curr and k > 0:
            curr = curr.next
            k -= 1
        return curr

    def solve(self, head: ListNode, k: int) -> ListNode:
        """Wrapper method for consistency with template."""
        return self.reverseKGroup(head, k)

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
    Test cases for 025. Reverse Nodes In K Group.
    """
    solution = Solution()

    # Test case 1: Basic k=2
    head = array_to_list([1, 2, 3, 4, 5])
    result = solution.solve(head, 2)
    expected = [2, 1, 4, 3, 5]
    assert list_to_array(result) == expected, f"Expected {expected}, got {list_to_array(result)}"

    # Test case 2: k=3
    head = array_to_list([1, 2, 3, 4, 5])
    result = solution.solve(head, 3)
    expected = [3, 2, 1, 4, 5]
    assert list_to_array(result) == expected, f"Expected {expected}, got {list_to_array(result)}"

    # Test case 3: k=1 (no change)
    head = array_to_list([1, 2, 3])
    result = solution.solve(head, 1)
    expected = [1, 2, 3]
    assert list_to_array(result) == expected, f"Expected {expected}, got {list_to_array(result)}"

    # Test case 4: k equals list length
    head = array_to_list([1, 2, 3, 4])
    result = solution.solve(head, 4)
    expected = [4, 3, 2, 1]
    assert list_to_array(result) == expected, f"Expected {expected}, got {list_to_array(result)}"

    # Test case 5: k > list length
    head = array_to_list([1, 2])
    result = solution.solve(head, 3)
    expected = [1, 2]
    assert list_to_array(result) == expected, f"Expected {expected}, got {list_to_array(result)}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    head = array_to_list([1, 2, 3, 4, 5])
    result = solution.solve(head, 2)
    print(f"Solution for 025. Reverse Nodes In K Group: {list_to_array(result)}")
