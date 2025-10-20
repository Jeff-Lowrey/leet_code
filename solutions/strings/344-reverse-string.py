"""
# Difficulty: Easy

# 344. Reverse String

This problem demonstrates key concepts in Strings.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>["h", "e", "l", "l", "o"]</dd>
<dt>Output:</dt>
<dd>"Before: {example}"</dd>
<dt>Explanation:</dt>
<dd>The string ['h','e','l','l','o'] is reversed in-place to ['o','l','l','e','h']</dd>
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
The problem asks us to reverse a string (represented as a list of characters) in-place, meaning we
must modify the original array without using extra space for another array. The most intuitive
approach is to use two pointers - one at the start and one at the end - and swap elements as we
move towards the center.

### APPROACH:
1. **Initialize two pointers**: One at the start (left) and one at the end (right)
2. **Swap and move**: While left < right, swap elements at left and right positions
3. **Increment/Decrement**: Move left pointer forward and right pointer backward
4. **Continue until pointers meet**: When left >= right, all elements have been swapped

### WHY THIS WORKS:
- By swapping elements from both ends moving towards the center, we reverse the array
- Each element is only touched once, making it efficient
- No additional space is needed beyond the two pointer variables
- The algorithm naturally handles both odd and even length arrays

### EXAMPLE WALKTHROUGH:
```
Input: ["h","e","l","l","o"]
Step 1: Swap positions 0 and 4: ["o","e","l","l","h"]
Step 2: Swap positions 1 and 3: ["o","l","l","e","h"]
Step 3: Position 2 is the center, done
Output: ["o","l","l","e","h"]
```

### TIME COMPLEXITY:
O(n)
We iterate through half the array (n/2 swaps), which is O(n).

### SPACE COMPLEXITY:
O(1)
Only two pointer variables are used, regardless of input size.

### EDGE CASES:
- Empty array: No swaps needed
- Single element: No swaps needed
- Two elements: Single swap
- Array already reversed: Still performs swaps (idempotent)

</details>
"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def solve(self, s: List[str]) -> None:
        """
        Reverse string in-place using two-pointer technique.

        Args:
            s: List of characters to reverse

        Returns:
            None (modifies array in-place)

        Time Complexity: O(n) where n is the length of the array
        Space Complexity: O(1) - only using two pointer variables
        """
        left = 0
        right = len(s) - 1

        while left < right:
            # Swap characters at left and right pointers
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    test1 = ["h", "e", "l", "l", "o"]
    solution.solve(test1)
    assert test1 == ["o", "l", "l", "e", "h"], f"Expected ['o','l','l','e','h'], got {test1}"

    # Test case 2: Empty input
    test2: list[str] = []
    solution.solve(test2)
    assert test2 == [], f"Expected [], got {test2}"

    # Test case 3: Single element
    test3 = ["a"]
    solution.solve(test3)
    assert test3 == ["a"], f"Expected ['a'], got {test3}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    example = ["h", "e", "l", "l", "o"]
    print(f"Before: {example}")
    solution.solve(example)
    print(f"After: {example}")
