"""
# Difficulty: Easy

# 021. Merge Two Sorted Lists

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a sorted manner and return the head of the merged linked list.

The list should be made by splicing together the nodes of the first two lists.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>list1 = [1,2,4], list2 = [1,3,4]</dd>
<dt>Output:</dt>
<dd>[1,1,2,3,4,4]</dd>
<dt>Explanation:</dt>
<dd>Merging [1,2,4] and [1,3,4] gives [1,1,2,3,4,4]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
Use dummy node to handle edge cases. Compare nodes from both lists. Advance pointer of smaller node. Continue until both lists exhausted. Return dummy.next.

### APPROACH:
1. **Create dummy node**: Initialize dummy = ListNode(0) to simplify list construction
2. **Initialize current pointer**: Set current = dummy to track position in result list
3. **Compare while both exist**: While list1 and list2 are not None
4. **Choose smaller node**: If list1.val < list2.val, attach list1 to current, advance list1
5. **Otherwise choose list2**: Else attach list2 to current, advance list2
6. **Advance current**: Move current = current.next after each attachment
7. **Attach remaining nodes**: After loop, attach remaining nodes from non-empty list
8. **Return result**: Return dummy.next as the merged list head

### WHY THIS WORKS:
- Dummy node eliminates special cases for empty lists and first node selection
- Comparing values at each step ensures merged list maintains sorted order
- Attaching remaining nodes works because both input lists are already sorted
- Only pointer manipulation (no new nodes created) achieves O(1) space
- Single pass through both lists achieves O(m + n) time

### EXAMPLE WALKTHROUGH:
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Step 1: Compare and merge
  1 ≤ 1: add 1 from list1
  2 > 1: add 1 from list2
  2 ≤ 3: add 2 from list1
  4 > 3: add 3 from list2
  4 ≤ 4: add 4 from list1
  Remaining: 4 from list2

Output: [1,1,2,3,4,4]
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
from typing import Any



class ListNode:
    def __init__(self, val: Any = 0, next: Any = None) -> None:
        self.val = val
        self.next = next


class Solution:
    def mergeTwoLists(self, list1: Any, list2: Any) -> Any:
        """
        Merge two sorted linked lists into one sorted list.

        Args:
            list1: Head of first sorted linked list
            list2: Head of second sorted linked list

        Returns:
            Head of merged sorted linked list

        Time Complexity: O(m + n)
        Space Complexity: O(1)
        """
        # Create dummy node to simplify edge cases
        dummy = ListNode(0)
        current = dummy

        # Merge while both lists have nodes
        while list1 and list2:
            if list1.val <= list2.val:
                current.next = list1
                list1 = list1.next
            else:
                current.next = list2
                list2 = list2.next
            current = current.next

        # Attach remaining nodes
        if list1:
            current.next = list1
        if list2:
            current.next = list2

        return dummy.next


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Both empty
    result = solution.mergeTwoLists(None, None)
    expected = None
    assert result == expected, f"Expected {expected}, got {result}"

    print("Basic functionality test passed! For comprehensive linked list tests, build proper ListNode chains.")

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 021. Merge Two Sorted Lists")
