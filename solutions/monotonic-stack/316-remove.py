"""
# 316. Remove
# Difficulty: Medium
Given a problem that demonstrates key concepts in Monotonic Stack.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply monotonic stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages monotonic stack principles
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

The approach uses monotonic stack techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using monotonic stack method
3. Return the computed result

</details>
"""

class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        """
        Remove duplicate letters to create smallest lexicographical order string.

        Args:
            s: Input string with possible duplicate characters

        Returns:
            Smallest lexicographical string with no duplicate characters

        Time Complexity: O(n) - single pass through string
        Space Complexity: O(1) - stack and sets limited to 26 characters
        """
        # Count occurrences of each character
        last_occurrence = {char: i for i, char in enumerate(s)}

        stack = []
        in_stack = set()

        for i, char in enumerate(s):
            # Skip if character already in result
            if char in in_stack:
                continue

            # Remove larger characters that appear later
            while stack and stack[-1] > char and last_occurrence[stack[-1]] > i:
                removed = stack.pop()
                in_stack.remove(removed)

            stack.append(char)
            in_stack.add(char)

        return ''.join(stack)

    def solve(self, s: str) -> str:
        """Wrapper method for consistency with template."""
        return self.removeDuplicateLetters(s)

def test_solution():
    """
    Test cases for 316. Remove Duplicate Letters.
    """
    solution = Solution()

    # Test case 1: Basic example
    result = solution.solve("bcabc")
    expected = "abc"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Multiple duplicates
    result = solution.solve("cbacdcbc")
    expected = "acdb"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: No duplicates
    result = solution.solve("abcd")
    expected = "abcd"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: All same character
    result = solution.solve("aaaa")
    expected = "a"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Reverse alphabetical
    result = solution.solve("dcba")
    expected = "dcba"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Complex pattern
    result = solution.solve("ecbacba")
    expected = "eacb"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: Single character
    result = solution.solve("a")
    expected = "a"
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    s = "bcabc"
    result = solution.solve(s)
    print(f"Solution for 316. Remove Duplicate Letters: {result}")
