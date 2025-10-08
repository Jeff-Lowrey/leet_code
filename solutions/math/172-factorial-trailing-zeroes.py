"""
# 172. Factorial Trailing Zeroes
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
    def trailingZeroes(self, n: int) -> int:
        """
        Count trailing zeroes in n! (factorial).

        Trailing zeroes come from factors of 10 = 2 * 5.
        Since there are always more factors of 2 than 5,
        we just need to count factors of 5.

        Args:
            n: Non-negative integer

        Returns:
            Number of trailing zeroes in n!

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        count = 0

        # Count how many numbers <= n are divisible by 5, 25, 125, etc.
        while n >= 5:
            n //= 5
            count += n

        return count

    def solve(self, *args):
        """
        Main solution for 172. Factorial Trailing Zeroes.

        Args:
            *args: Problem-specific arguments

        Returns:
            Number of trailing zeroes

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        return self.trailingZeroes(*args)


def test_solution():
    """
    Test cases for 172. Factorial Trailing Zeroes.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    result = solution.trailingZeroes(3)
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: n = 5 (5! = 120)
    result = solution.trailingZeroes(5)
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: n = 10 (10! has 2 trailing zeroes)
    result = solution.trailingZeroes(10)
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: n = 25 (includes 25 = 5*5)
    result = solution.trailingZeroes(25)
    expected = 6
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: n = 0
    result = solution.trailingZeroes(0)
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Large number
    result = solution.trailingZeroes(100)
    expected = 24
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: Power of 5
    result = solution.trailingZeroes(125)
    expected = 31
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 172. Factorial Trailing Zeroes")
    for n in [3, 5, 10, 25]:
        print(f"{n}! has {solution.trailingZeroes(n)} trailing zeroes")
