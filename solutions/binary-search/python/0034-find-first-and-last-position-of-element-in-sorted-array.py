"""
# Difficulty: Medium

# 0034. Find First And Last Position Of Element In Sorted Array

Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[5,7,7,8,8,10]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Target 8 appears at indices [3,4] in sorted array [5,7,7,8,8,10]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
**Data Structures**: Array, Tree
**Patterns**: Two Pointers Pattern, Binary Search Pattern
**Time Complexity**: O(log n) - Binary search or tree height
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
This is a classic binary search problem that requires finding both the leftmost and rightmost positions of a target. The key insight is to perform two separate binary searches: one to find the first occurrence and another to find the last occurrence.

### APPROACH:
1. **First position**: Use binary search to find the leftmost occurrence
2. **Last position**: Use binary search to find the rightmost occurrence
3. **Optimization**: Return early if target not found in first search
4. **Edge cases**: Handle empty array and target not found

### WHY THIS WORKS:
- Binary search maintains O(log n) complexity for sorted arrays
- Two separate searches isolate first and last positions independently
- Template-based approach ensures correctness for boundary conditions
- Early termination optimizes performance when target not found

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [5,7,7,8,8,10], target = 8
nums = [5,7,7,8,8,10], target = 6
```

Step 1: Find first position of 8
- Binary search finds index 3 as leftmost 8
Step 2: Find last position of 8
- Binary search finds index 4 as rightmost 8
Step 1: Find first position of 6
- Binary search returns -1 (not found)

Output:
```
[3,4]
[-1,-1] (early return)
```

### TIME COMPLEXITY:
O(log n)
Two binary searches on array of size n

### SPACE COMPLEXITY:
O(1)
Only using constant extra space

### EDGE CASES:
- Empty array: return [-1, -1]
- Target not in array: return [-1, -1]
- Single element array: return [0, 0] if match, [-1, -1] if not
- Target at beginning/end of array

</details>
"""

from typing import Any


class Solution:
    def searchRange(self, nums: list[int], target: int) -> list[int]:
        """
        Find the starting and ending position of target in sorted array.

        Args:
            nums: Sorted array of integers
            target: Target value to find

        Returns:
            [start_pos, end_pos] or [-1, -1] if not found

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        if not nums:
            return [-1, -1]

        # Find first position
        first_pos = self._find_first(nums, target)
        if first_pos == -1:
            return [-1, -1]

        # Find last position
        last_pos = self._find_last(nums, target)

        return [first_pos, last_pos]

    def _find_first(self, nums: list[int], target: int) -> int:
        """Find the first occurrence of target using binary search."""
        left, right = 0, len(nums) - 1
        first_pos = -1

        while left <= right:
            mid = left + (right - left) // 2

            if nums[mid] == target:
                first_pos = mid
                right = mid - 1  # Continue searching left for first occurrence
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return first_pos

    def _find_last(self, nums: list[int], target: int) -> int:
        """Find the last occurrence of target using binary search."""
        left, right = 0, len(nums) - 1
        last_pos = -1

        while left <= right:
            mid = left + (right - left) // 2

            if nums[mid] == target:
                last_pos = mid
                left = mid + 1  # Continue searching right for last occurrence
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return last_pos

    def searchRangeOnePass(self, nums: list[int], target: int) -> list[int]:
        """
        Alternative approach using single binary search with expansion.

        Args:
            nums: Sorted array
            target: Target value

        Returns:
            [start_pos, end_pos] or [-1, -1] if not found
        """
        if not nums:
            return [-1, -1]

        # Find any occurrence first
        left, right = 0, len(nums) - 1
        found_idx = -1

        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                found_idx = mid
                break
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        if found_idx == -1:
            return [-1, -1]

        # Expand to find boundaries
        start = end = found_idx

        # Find start boundary
        while start > 0 and nums[start - 1] == target:
            start -= 1

        # Find end boundary
        while end < len(nums) - 1 and nums[end + 1] == target:
            end += 1

        return [start, end]


def test_solution() -> None:
    """
    Test cases for 034. Find First And Last Position Of Element In Sorted Array.
    """
    solution = Solution()

    # Test case 1: Target found with multiple occurrences
    nums1 = [5, 7, 7, 8, 8, 10]
    target1 = 8
    result1 = solution.searchRange(nums1, target1)
    expected1 = [3, 4]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Target not found
    nums2 = [5, 7, 7, 8, 8, 10]
    target2 = 6
    result2 = solution.searchRange(nums2, target2)
    expected2 = [-1, -1]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Empty array
    nums3: list[Any] = []
    target3 = 0
    result3 = solution.searchRange(nums3, target3)
    expected3 = [-1, -1]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single element - found
    nums4 = [1]
    target4 = 1
    result4 = solution.searchRange(nums4, target4)
    expected4 = [0, 0]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Single element - not found
    nums5 = [1]
    target5 = 2
    result5 = solution.searchRange(nums5, target5)
    expected5 = [-1, -1]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Target at beginning
    nums6 = [1, 1, 2, 3, 4]
    target6 = 1
    result6 = solution.searchRange(nums6, target6)
    expected6 = [0, 1]
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Target at end
    nums7 = [1, 2, 3, 4, 4]
    target7 = 4
    result7 = solution.searchRange(nums7, target7)
    expected7 = [3, 4]
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test case 8: All elements are the same
    nums8 = [2, 2, 2, 2, 2]
    target8 = 2
    result8 = solution.searchRange(nums8, target8)
    expected8 = [0, 4]
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test alternative implementation
    result9 = solution.searchRangeOnePass([5, 7, 7, 8, 8, 10], 8)
    expected9 = [3, 4]
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    nums = [5, 7, 7, 8, 8, 10]
    target = 8
    result = solution.searchRange(nums, target)
    print(f"=== 034. Find First And Last Position Of Element In Sorted Array ===")
    print(f"Array: nums")
    print(f"Target: {target}")
    print(f"Range: result")

    # Demonstrate edge cases
    print(f"\nEdge cases:")
    print(f"Target 6 (not found): {solution.searchRange(nums, 6)}")
    print(f"Empty array: {solution.searchRange([], 1)}")
    print(f"Single element [1], target 1: {solution.searchRange([1], 1)}")
    print(f"All same [2,2,2], target 2: {solution.searchRange([2, 2, 2], 2)}")
