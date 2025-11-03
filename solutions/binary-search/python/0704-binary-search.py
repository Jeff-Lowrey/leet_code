"""
### INTUITION:
The key insight is that binary search is the classic divide-and-conquer algorithm for searching
in sorted arrays. We repeatedly divide the search space in half by
comparing the target with the middle element.

### APPROACH:
1. **Initialize pointers**: Set left=0, right=len(nums)-1
2. **Divide search space**: Calculate mid = (left + right) // 2
3. **Compare and eliminate**:
   - If nums[mid] == target: found, return mid
   - If nums[mid] < target: search right half (left = mid + 1)
   - If nums[mid] > target: search left half (right = mid - 1)
4. **Repeat until found or search space exhausted**

### WHY THIS WORKS:
- Sorted array property allows us to eliminate half the elements each iteration
- Each comparison reduces search space by 50%
- Guarantees O(log n) time complexity

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [-1,0,3,5,9,12], target = 9
```

Step 1: left=0, right=5, mid=2, nums[2]=3 < 9, search right
Step 2: left=3, right=5, mid=4, nums[4]=9 == 9, found!

Output:
```
4
```

### TIME COMPLEXITY:
**O(log n)** where n is the length of the array. In each iteration, we eliminate half of the remaining search space by comparing with the middle element. Starting with n elements, after 1 comparison we have n/2 elements left, after 2 comparisons n/4 elements, and so on. We can eliminate half the elements at most log₂(n) times before reaching a single element or empty range. Therefore, maximum iterations = log₂(n), giving us **O(log n)** time complexity.

### SPACE COMPLEXITY:
**O(1)** - We use only a constant amount of extra space regardless of input size. The algorithm uses three integer variables (left, right, mid) to track the current search boundaries. No additional data structures are allocated, and the space used doesn't grow with input size. This is the iterative implementation; a recursive implementation would use **O(log n)** space for the call stack.

### EDGE CASES:
- **Empty array**: nums = [] returns -1 (no elements to search)
- **Single element match**: nums = [5], target = 5 returns 0
- **Single element no match**: nums = [5], target = 3 returns -1
- **Target at start**: nums = [1,2,3,4,5], target = 1 returns 0
- **Target at end**: nums = [1,2,3,4,5], target = 5 returns 4
- **Target not in array**: nums = [1,3,5,7], target = 4 returns -1 (would be between 3 and 5)
- **All duplicates**: nums = [5,5,5,5], target = 5 returns any valid index (implementation dependent)

</details>

"""


class Solution:
    def search(self, nums: list[int], target: int) -> int:
        """
        Binary search for target in sorted array.

        Args:
            nums: Sorted array of integers
            target: Target value to search for

        Returns:
            Index of target if found, -1 otherwise

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = (left + right) // 2

            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return -1

    def solve(self, nums: list[int], target: int) -> int:
        """Legacy method for compatibility."""
        return self.search(nums, target)


def test_solution() -> None:
    """
    Test cases for 704. Binary Search.
    """
    solution = Solution()

    # Test case 1: Target found in middle
    result = solution.search([-1, 0, 3, 5, 9, 12], 9)
    expected = 4
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Target not found
    result = solution.search([-1, 0, 3, 5, 9, 12], 2)
    expected = -1
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Target at beginning
    result = solution.search([-1, 0, 3, 5, 9, 12], -1)
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Target at end
    result = solution.search([-1, 0, 3, 5, 9, 12], 12)
    expected = 5
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Single element found
    result = solution.search([5], 5)
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 6: Single element not found
    result = solution.search([5], 3)
    expected = -1
    assert result == expected, f"Expected expected, got result"

    # Test case 7: Empty array
    result = solution.search([], 1)
    expected = -1
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 704. Binary Search ===")
    print(f"search([-1,0,3,5,9,12], 9) -> {solution.search([-1, 0, 3, 5, 9, 12], 9)}")
    print(f"search([-1,0,3,5,9,12], 2) -> {solution.search([-1, 0, 3, 5, 9, 12], 2)}")
    print(f"search([5], 5) -> {solution.search([5], 5)}")
