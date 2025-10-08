"""
# 202. Happy Number
**Medium**

Given a problem that demonstrates key concepts in Math.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of math concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply math methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages math principles
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

The approach uses math techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using math method
3. Return the computed result

</details>
"""

class Solution:
    def isHappy(self, n: int) -> bool:
        """
        Determine if a number is happy using Floyd's cycle detection.

        A happy number is defined by repeatedly replacing the number
        with the sum of the squares of its digits until either:
        - The number equals 1 (happy)
        - It loops endlessly in a cycle (not happy)

        Args:
            n: Positive integer

        Returns:
            True if n is a happy number, False otherwise

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        def get_next(num: int) -> int:
            """Calculate sum of squares of digits."""
            total = 0
            while num > 0:
                digit = num % 10
                total += digit * digit
                num //= 10
            return total

        # Floyd's cycle detection (slow and fast pointers)
        slow = n
        fast = get_next(n)

        while fast != 1 and slow != fast:
            slow = get_next(slow)
            fast = get_next(get_next(fast))

        return fast == 1

    def solve(self, *args):
        """
        Main solution for 202. Happy Number.

        Args:
            *args: Problem-specific arguments

        Returns:
            True if happy number, False otherwise

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        return self.isHappy(*args)


def test_solution():
    """
    Test cases for 202. Happy Number.
    """
    solution = Solution()

    # Test case 1: Happy number (19)
    # 19 -> 82 -> 68 -> 100 -> 1
    result = solution.isHappy(19)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Not happy number (2)
    result = solution.isHappy(2)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Already 1
    result = solution.isHappy(1)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Happy number (7)
    result = solution.isHappy(7)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Not happy number (4)
    result = solution.isHappy(4)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Happy number (10)
    result = solution.isHappy(10)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: Happy number (100)
    result = solution.isHappy(100)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 202. Happy Number")
    for n in [1, 2, 7, 19]:
        result = "is" if solution.isHappy(n) else "is not"
        print(f"{n} {result} a happy number")
