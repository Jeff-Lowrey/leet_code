"""
# Difficulty: Easy

# 035. Search Insert Position

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1,3,5,6]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Target 5 should be inserted at index 2 in [1,3,5,6]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic binary search problem where we need to find the insertion point for a target value. The key insight is that binary search naturally converges to the correct insertion position when the target is not found.

### APPROACH:
1. **Binary search**: Use standard binary search to find target or insertion point
2. **Insertion logic**: When target not found, left pointer indicates insertion position
3. **Boundary handling**: Handle cases where target should be inserted at beginning or end
4. **Optimization**: Single pass O(log n) solution

### WHY THIS WORKS:
- Binary search maintains sorted order properties
- Left pointer always points to the smallest index where target should be inserted
- When target found, return that index directly
- When not found, left pointer is the correct insertion position

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,3,5,6], target = 5
Step 1: Binary search finds 5 at index 2
Output: 2

Input: nums = [1,3,5,6], target = 2
Step 1: left=0, right=3, mid=1, nums[1]=3 > 2, so right=0
Step 2: left=0, right=0, mid=0, nums[0]=1 < 2, so left=1
Step 3: left=1, right=0, loop ends, left=1 is insertion point
Output: 1

Input: nums = [1,3,5,6], target = 7
Step 1: Binary search doesn't find 7
Step 2: left pointer ends up at index 4 (end of array)
Output: 4
```

### TIME COMPLEXITY:
O(log n)
Binary search through sorted array

### SPACE COMPLEXITY:
O(1)
Only using constant extra space

### EDGE CASES:
- Empty array: insert at position 0
- Target smaller than all elements: insert at position 0
- Target larger than all elements: insert at end
- Single element array: compare and insert appropriately

</details>
"""

class Solution:
    def searchInsert(self, nums: list[int], target: int) -> int:
        """
        Find the index where target should be inserted in sorted array.

        Args:
            nums: Sorted array of distinct integers
            target: Target value to find or insert

        Returns:
            Index where target is found or should be inserted

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = left + (right - left) // 2

            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        # When loop ends, left is the insertion position
        return left

    def searchInsertRecursive(self, nums: list[int], target: int) -> int:
        """
        Recursive solution for search insert position.

        Args:
            nums: Sorted array
            target: Target value

        Returns:
            Insertion index

        Time Complexity: O(log n)
        Space Complexity: O(log n) due to recursion stack
        """
        def binary_search(left: int, right: int) -> int:
            if left > right:
                return left

            mid = left + (right - left) // 2

            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                return binary_search(mid + 1, right)
            else:
                return binary_search(left, mid - 1)

        return binary_search(0, len(nums) - 1)

    def searchInsertLinear(self, nums: list[int], target: int) -> int:
        """
        Linear search solution (less efficient but simple).

        Args:
            nums: Sorted array
            target: Target value

        Returns:
            Insertion index

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        for i, num in enumerate(nums):
            if num >= target:
                return i

        # If target is larger than all elements
        return len(nums)

def test_solution():
    """
    Test cases for 035. Search Insert Position.
    """
    solution = Solution()

    # Test case 1: Target found in array
    nums1 = [1,3,5,6]
    target1 = 5
    result1 = solution.searchInsert(nums1, target1)
    expected1 = 2
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Target not found, insert in middle
    nums2 = [1,3,5,6]
    target2 = 2
    result2 = solution.searchInsert(nums2, target2)
    expected2 = 1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Target larger than all elements
    nums3 = [1,3,5,6]
    target3 = 7
    result3 = solution.searchInsert(nums3, target3)
    expected3 = 4
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Target smaller than all elements
    nums4 = [1,3,5,6]
    target4 = 0
    result4 = solution.searchInsert(nums4, target4)
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Single element array - target found
    nums5 = [1]
    target5 = 1
    result5 = solution.searchInsert(nums5, target5)
    expected5 = 0
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Single element array - target smaller
    nums6 = [3]
    target6 = 1
    result6 = solution.searchInsert(nums6, target6)
    expected6 = 0
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Single element array - target larger
    nums7 = [1]
    target7 = 3
    result7 = solution.searchInsert(nums7, target7)
    expected7 = 1
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test case 8: Empty array
    nums8 = []
    target8 = 5
    result8 = solution.searchInsert(nums8, target8)
    expected8 = 0
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test recursive solution
    result9 = solution.searchInsertRecursive([1,3,5,6], 2)
    expected9 = 1
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test linear solution
    result10 = solution.searchInsertLinear([1,3,5,6], 7)
    expected10 = 4
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    nums = [1,3,5,6]
    targets = [5, 2, 7, 0]

    print(f"=== 035. Search Insert Position ===")
    print(f"Array: {nums}")

    for target in targets:
        result = solution.searchInsert(nums, target)
        print(f"Target {target}: insert at index {result}")

    # Demonstrate with single element and empty arrays
    print(f"\nEdge cases:")
    print(f"Single element [1], target 3: {solution.searchInsert([1], 3)}")
    print(f"Empty array, target 1: {solution.searchInsert([], 1)}")
