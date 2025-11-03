"""
### INTUITION:
The key insight is that reversing a string recursively involves swapping characters at opposite ends and recursively
reversing the middle portion. The base case is when pointers meet or cross.

### APPROACH:
1. **Base case**: When left >= right, return (pointers have met/crossed)
2. **Swap**: Exchange characters at left and right indices
3. **Recurse**: Move pointers inward and recurse on remaining substring
4. **In-place**: Modify array directly without extra space

### WHY THIS WORKS:
- Swapping opposite-end characters and moving inward eventually reverses entire string
- Recursion naturally divides problem into smaller subproblems
- Base case ensures recursion terminates

### EXAMPLE WALKTHROUGH:
Input:
```
["h","e","l","l","o"]
```

Step 1: Swap s[0] and s[4]: ["o","e","l","l","h"]
Step 2: Swap s[1] and s[3]: ["o","l","l","e","h"]

Steps:
Step 1: left=2, right=2 (meet) -> stop

Output:
```
["o","l","l","e","h"]
```

### TIME COMPLEXITY:
**O(n)** - visit each character once

### SPACE COMPLEXITY:
**O(n)** - recursion stack depth

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""


class Solution:
    def reverseString(self, s: list[str]) -> None:
        """
        Reverse string using recursion (in-place).

        Time Complexity: O(n)
        Space Complexity: O(n) - recursion stack
        """

        def helper(left: int, right: int) -> None:
            # Base case: pointers meet or cross
            if left >= right:
                return

            # Swap characters
            s[left], s[right] = s[right], s[left]

            # Recurse on remaining substring
            helper(left + 1, right - 1)

        helper(0, len(s) - 1)

    def reverseStringIterative(self, s: list[str]) -> None:
        """
        Reverse string iteratively (more space efficient).

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        left, right = 0, len(s) - 1

        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1


def test_solution() -> None:
    """Test cases for 344. Reverse String."""
    solution = Solution()

    # Test case 1
    s1 = ["h", "e", "l", "l", "o"]
    solution.reverseString(s1)
    assert s1 == ["o", "l", "l", "e", "h"]

    # Test case 2
    s2 = ["H", "a", "n", "n", "a", "h"]
    solution.reverseString(s2)
    assert s2 == ["h", "a", "n", "n", "a", "H"]

    # Test case 3: Single character
    s3 = ["A"]
    solution.reverseString(s3)
    assert s3 == ["A"]

    # Test case 4: Two characters
    s4 = ["A", "B"]
    solution.reverseString(s4)
    assert s4 == ["B", "A"]

    # Test iterative
    s5 = ["t", "e", "s", "t"]
    solution.reverseStringIterative(s5)
    assert s5 == ["t", "s", "e", "t"]

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 344. Reverse String ===")
    s = ["h", "e", "l", "l", "o"]
    print(f"Original: {s}")
    solution.reverseString(s)
    print(f"Reversed: {s}")
