"""
# 904. Fruit Into Baskets
# Difficulty: Medium
Given a problem that demonstrates key concepts in Sliding Window.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of sliding window concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply sliding window methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages sliding window principles
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

The approach uses sliding window techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using sliding window method
3. Return the computed result

</details>
"""

class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        """
        Find maximum fruits collected with at most 2 types using sliding window.

        Args:
            fruits: Array where fruits[i] is the type of fruit at tree i

        Returns:
            Maximum number of fruits that can be collected

        Time Complexity: O(n) - each element visited at most twice
        Space Complexity: O(1) - hashmap contains at most 3 entries
        """
        # Track count of each fruit type in current window
        basket = {}
        left = 0
        max_fruits = 0

        for right in range(len(fruits)):
            # Add current fruit to basket
            fruit = fruits[right]
            basket[fruit] = basket.get(fruit, 0) + 1

            # Shrink window if more than 2 types
            while len(basket) > 2:
                left_fruit = fruits[left]
                basket[left_fruit] -= 1
                if basket[left_fruit] == 0:
                    del basket[left_fruit]
                left += 1

            # Update maximum
            max_fruits = max(max_fruits, right - left + 1)

        return max_fruits

    def solve(self, fruits: list[int]) -> int:
        """Wrapper method for consistency with template."""
        return self.totalFruit(fruits)

def test_solution():
    """
    Test cases for 904. Fruit Into Baskets.
    """
    solution = Solution()

    # Test case 1: Classic example
    result = solution.solve([1, 2, 1])
    expected = 3
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Multiple types
    result = solution.solve([0, 1, 2, 2])
    expected = 3
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Long sequence
    result = solution.solve([1, 2, 3, 2, 2])
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: All same type
    result = solution.solve([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4])
    expected = 5
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Single element
    result = solution.solve([1])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Two types only
    result = solution.solve([1, 2, 1, 2, 1, 2])
    expected = 6
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: All different types
    result = solution.solve([1, 2, 3, 4, 5])
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 8: Two elements
    result = solution.solve([1, 2])
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    fruits = [1, 2, 3, 2, 2]
    result = solution.solve(fruits)
    print(f"Solution for 904. Fruit Into Baskets: {result}")
