"""
### INTUITION:
The key insight is that use a monotonic decreasing stack to track indices waiting for their next greater element.
As we traverse, for each node, pop all stack indices with smaller values and update their answers.

### APPROACH:
1. **Convert to array**: Simplifies index access
2. **Monotonic stack**: Store (index, value) pairs
3. **Process**: For each element, pop stack while current > stack top
4. **Update**: Set answer[popped_index] = current_value
5. **Push**: Add current element to stack

### WHY THIS WORKS:
The stack maintains elements in decreasing order. When we find a larger element,
it's the "next greater" for all smaller elements in the stack.

### EXAMPLE WALKTHROUGH:
Input:
```
list = [2,1,5]
```

Stack: [(idx, val)]
i=0, val=2: stack=[(0,2)], answer=[0,0,0]
i=1, val=1: stack=[(0,2),(1,1)], answer=[0,0,0]
i=2, val=5:
- Pop (1,1): answer[1]=5
- Pop (0,2): answer[0]=5
- stack=[(2,5)]
- answer=[5,5,0]
Result: [5,5,0]

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(n)**

- Additional data structure for storage

### EDGE CASES:
- **Empty list**: Return empty array
- **Single node**: Return [0] (no next greater exists)
- **Strictly increasing sequence**: Each node's answer is next value, last is 0
- **Strictly decreasing sequence**: All answers are 0 (no greater values ahead)
- **All same values**: All answers are 0 (no strictly greater values)

</details>

"""

from typing import Any


class ListNode:
    """..."""

    def __init__(self, val: Any = 0, next: Any = None) -> None:
        self.val = val
        self.next = next


class Solution:
    def nextLargerNodes(self, head: ListNode | None) -> list[int]:
        """
        Approach: Monotonic stack with array conversion
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Convert linked list to array
        values: list[Any] = []
        current = head
        while current:
            values.append(current.val)
            current = current.next

        n = len(values)
        answer = [0] * n
        stack: list[tuple[int, int]] = []  # Stack of (index, value)

        for i, val in enumerate(values):
            # Pop all elements smaller than current
            while stack and stack[-1][1] < val:
                idx, _ = stack.pop()
                answer[idx] = val

            stack.append((i, val))

        return answer

    def nextLargerNodesReverse(self, head: ListNode | None) -> list[int]:
        """
        Approach: Reverse traversal with stack
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        values = []
        current = head
        while current:
            values.append(current.val)
            current = current.next

        n = len(values)
        answer = [0] * n
        stack: list[int] = []  # Stack of values

        # Traverse from right to left
        for i in range(n - 1, -1, -1):
            # Pop elements <= current
            while stack and stack[-1] <= values[i]:
                stack.pop()

            # Top of stack is next greater (if exists)
            if stack:
                answer[i] = stack[-1]

            stack.append(values[i])

        return answer


def test_solution() -> None:
    """Test cases for Problem 1019."""
    solution = Solution()

    # Helper to create linked list from list
    def create_list(values: list[int]) -> ListNode:
        if not values:
            return None  # type: ignore
        head = ListNode(values[0])
        current = head
        for val in values[1:]:
            current.next = ListNode(val)
            current = current.next
        return head

    # Test case 1: Example from problem
    head1 = create_list([2, 1, 5])
    assert solution.nextLargerNodes(head1) == [5, 5, 0]
    assert solution.nextLargerNodesReverse(create_list([2, 1, 5])) == [5, 5, 0]
    print("Test case 1 passed: [2,1,5]")

    # Test case 2: Increasing sequence
    head2 = create_list([1, 2, 3, 4, 5])
    assert solution.nextLargerNodes(head2) == [2, 3, 4, 5, 0]
    print("Test case 2 passed: Increasing")

    # Test case 3: Decreasing sequence
    head3 = create_list([5, 4, 3, 2, 1])
    assert solution.nextLargerNodes(head3) == [0, 0, 0, 0, 0]
    print("Test case 3 passed: Decreasing")

    # Test case 4: Single element
    head4 = create_list([5])
    assert solution.nextLargerNodes(head4) == [0]
    print("Test case 4 passed: Single element")

    # Test case 5: All same
    head5 = create_list([3, 3, 3])
    assert solution.nextLargerNodes(head5) == [0, 0, 0]
    print("Test case 5 passed: All same")

    # Test case 6: Complex case
    head6 = create_list([2, 7, 4, 3, 5])
    assert solution.nextLargerNodes(head6) == [7, 0, 5, 5, 0]
    print("Test case 6 passed: Complex case")

    # Test case 7: Empty list
    assert solution.nextLargerNodes(None) == []
    print("Test case 7 passed: Empty list")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
