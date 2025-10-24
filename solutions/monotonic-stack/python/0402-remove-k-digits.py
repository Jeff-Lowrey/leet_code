"""
# Difficulty: Medium

# 0402. Remove K Digits

Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>num = "1432219", k = 3</dd>
<dt>Output:</dt>
<dd>"1219"</dd>
<dt>Explanation:</dt>
<dd>By greedily removing k digits to make the smallest number, '1432219' becomes '1219' after removing 3 digits</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Array, String, Stack
**Patterns**: Two Pointers Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use monotonic increasing stack. Remove k digits greedily by popping larger digits when a smaller digit is found. If k removals not reached, remove from end. Handle leading zeros.

### APPROACH:
1. **Initialize stack**: Create empty stack to build result
2. **Iterate through digits**: For each digit in num
3. **Remove larger digits**: While k > 0 and stack and stack[-1] > digit, pop from stack and decrement k
4. **Add current digit**: Append digit to stack
5. **Handle remaining k**: After loop, if k > 0, remove last k digits from stack
6. **Remove leading zeros**: Strip leading zeros from result
7. **Handle empty**: If result is empty, return "0"
8. **Return result**: Return ''.join(stack)

### WHY THIS WORKS:
- Monotonic increasing stack removes digits to create smallest number
- Remove larger digits from left when possible (higher place value impact)
- While digit < stack_top and k > 0: pop (remove larger digit)
- Leading zeros stripped, leftover k handled by removing from right
- Greedy works: removing leftmost large digits always improves result

### EXAMPLE WALKTHROUGH:
Input:
```
num = "1432219", k = 3
```

Step 1: Use monotonic stack
Add '1': stack=['1']
Add '4': stack=['1','4']
Add '3': pop '4' (3<4), k=2, stack=['1','3']
Add '2': pop '3' (2<3), k=1, stack=['1','2']
Add '2': stack=['1','2','2']
Add '1': pop '2' (1<2), k=0, stack=['1','2','1']
Add '9': stack=['1','2','1','9']

Output:
```
"1219"
```

### TIME COMPLEXITY:
Based on the algorithm implementation


### SPACE COMPLEXITY:
Based on auxiliary data structures used


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any


class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        """
        Remove k digits from the number to get the smallest possible number.
        Uses a monotonic stack approach to maintain increasing sequence.

        Args:
            num: Input number as string
            k: Number of digits to remove

        Returns:
            String representing the smallest possible number after removing k digits
        """
        # Edge cases
        if not num or k >= len(num):
            return "0"

        # Initialize stack to build monotonic sequence
        stack: list[Any] = []

        # Process each digit
        for digit in num:
            # Remove digits that break monotonic increasing sequence
            while k > 0 and stack and stack[-1] > digit:
                stack.pop()
                k -= 1
            stack.append(digit)

        # If we still need to remove digits, remove from the end
        while k > 0:
            stack.pop()
            k -= 1

        # Build the result string
        result = "".join(stack).lstrip("0")

        # Return "0" if result is empty, otherwise return result
        return result if result else "0"


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.removeKdigits("1432219", 3)
    expected = "1219"
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Remove all digits
    result = solution.removeKdigits("10", 2)
    expected = "0"
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 402. Remove K Digits")
