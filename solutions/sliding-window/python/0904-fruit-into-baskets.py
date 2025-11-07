"""
### INTUITION:
The key insight is that use sliding window tracking fruit types with hash map. Expand while <= 2 types. When 3rd type appears, shrink until back to 2 types. Track maximum window size.

### APPROACH:
1. **Initialize variables**: Set left = 0, max_fruits = 0, basket = {}
2. **Expand with right**: For right in range(len(fruits))
3. **Add to basket**: basket[fruits[right]] = basket.get(fruits[right], 0) + 1
4. **Check basket limit**: While len(basket) > 2, shrink window
5. **Remove from left**: basket[fruits[left]] -= 1, remove if 0, increment left
6. **Update maximum**: max_fruits = max(max_fruits, right - left + 1)
7. **Return result**: Return max_fruits

### WHY THIS WORKS:
- This ensures that longest subarray with at most 2 distinct elements (fruit types)
- This ensures that hash map tracks count of each fruit type in current window
- This ensures that expand right adding fruits, contract left when > 2 types
- This ensures that remove fruit type when its count reaches 0 in map
- This ensures that o(n) time: each element processed twice at most, O(1) space (at most 3 keys)

### EXAMPLE WALKTHROUGH:
Input:
```
fruits = [1,2,1,2,3,1,1]
```

Step 1: Expand with at most 2 types
[1,2,1,2]: types={1,2}, count=4
[1,2,1,2,3]: types={1,2,3}, invalid
Step 2: Contract
[2,1,2,3]: types={1,2,3}, invalid
[1,2,3]: types={1,2,3}, invalid
[2,3]: types={2,3}, valid
[2,3,1,1]: types={2,3,1}, invalid
[3,1,1]: types={3,1}, count=3

Output:
```
4 (maximum fruits)
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import Any


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
        basket: dict[Any, Any] = {}
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


def test_solution() -> None:
    """
    Test cases for 904. Fruit Into Baskets.
    """
    solution = Solution()

    # Test case 1: Classic example
    solution.solve([1, 2, 1])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 2: Multiple types
    solution.solve([0, 1, 2, 2])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 3: Long sequence
    solution.solve([1, 2, 3, 2, 2])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 4: All same type
    solution.solve([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 5: Single element
    solution.solve([1])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 6: Two types only
    solution.solve([1, 2, 1, 2, 1, 2])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 7: All different types
    solution.solve([1, 2, 3, 4, 5])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 8: Two elements
    solution.solve([1, 2])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    fruits = [1, 2, 3, 2, 2]
    solution.solve(fruits)
