"""
# Difficulty: Medium

# 280. Wiggle Sort

Given an integer array nums, reorder it such that nums[0] <= nums[1] >= nums[2] <= nums[3]...

You may assume the input array always has a valid answer.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[3, 5, 2, 1, 6, 4]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Wiggle sort: [3,5,2,1,6,4] becomes [3,5,1,6,2,4]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Map Storage, Array Traversal, Two Pointers
**Data Structures**: Array, Tree, Linked List
**Patterns**: Two Pointers Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
We need alternating pattern: small, large, small, large. We can achieve this in O(n) time
by swapping elements when the pattern is violated, without sorting.

### APPROACH:
1. **One-pass swap approach**: Iterate through array
2. **Check pattern**: At even indices, ensure nums[i] <= nums[i+1]
3. **At odd indices**: Ensure nums[i] >= nums[i+1]
4. **Swap if violated**: When pattern is wrong, swap adjacent elements
5. **Alternative**: Sort and arrange elements

### WHY THIS WORKS:
- At even index i: We want nums[i] <= nums[i+1]
  - If nums[i] > nums[i+1], swap them
- At odd index i: We want nums[i] >= nums[i+1]
  - If nums[i] < nums[i+1], swap them
- After swap, previous conditions remain satisfied
- One pass is sufficient to fix all violations

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [3,5,2,1,6,4]
```

One-pass approach:
Sorting approach:
Pair and swap:

Steps:
Step 1: i=0 (even): 3 <= 5? YES, no swap -> [3,5,2,1,6,4]
Step 2: i=1 (odd):  5 >= 2? YES, no swap -> [3,5,2,1,6,4]
Step 3: i=2 (even): 2 <= 1? NO, swap     -> [3,5,1,2,6,4]
Step 4: i=3 (odd):  2 >= 6? NO, swap     -> [3,5,1,6,2,4]
Step 5: i=4 (even): 2 <= 4? YES, no swap -> [3,5,1,6,2,4]
Step 6: Final: [3,5,1,6,2,4]
Step 7: Verify: 3<=5>=1<=6>=2<=4 ✓
Step 8: Sort: [1,2,3,4,5,6]
Step 9: - Take pairs: (1,2), (3,4), (5,6)
Step 10: - Swap each pair: (2,1), (4,3), (6,5)
Step 11: - Result: [2,1,4,3,6,5]
Step 12: - Verify: 2>=1<=4>=3<=6>=5 ✓

Output:
```
[2,1,4,3,6,5]
```

### TIME COMPLEXITY:
O(n)
Single pass through array with swaps

### SPACE COMPLEXITY:
O(1)
In-place swaps only

### EDGE CASES:
- Array length 1 or 2 (already valid)
- All elements equal
- Already wiggle sorted
- Reverse sorted array

</details>
"""


class Solution:
    def wiggleSort(self, nums: list[int]) -> None:
        """
        Reorder array in wiggle pattern in-place using one-pass approach.

        Modifies nums in-place. Pattern: nums[0] <= nums[1] >= nums[2] <= ...

        Args:
            nums: Array to reorder (modified in-place)

        Time Complexity: O(n) - single pass
        Space Complexity: O(1) - in-place swaps
        """
        # One pass with swaps
        for i in range(len(nums) - 1):
            # Even index: should be <= next
            # Odd index: should be >= next
            if (i % 2 == 0 and nums[i] > nums[i + 1]) or (i % 2 == 1 and nums[i] < nums[i + 1]):
                nums[i], nums[i + 1] = nums[i + 1], nums[i]

    def wiggleSortSorting(self, nums: list[int]) -> None:
        """
        Reorder array using sorting approach.

        Sort first, then swap adjacent pairs.

        Time Complexity: O(n log n) for sorting
        Space Complexity: O(1) or O(n) depending on sort
        """
        nums.sort()
        # Swap pairs: (0,1), (2,3), (4,5), ...
        for i in range(1, len(nums) - 1, 2):
            nums[i], nums[i + 1] = nums[i + 1], nums[i]

    def wiggleSortMedian(self, nums: list[int]) -> None:
        """
        Sort and interleave using median partitioning approach.

        Sort and rearrange: smaller elements at even indices, larger at odd.

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        nums.sort()
        # Create copy
        temp = nums[:]
        n = len(nums)

        # Fill odd indices with larger half
        # Fill even indices with smaller half
        left, right = 0, 0
        for i in range(n):
            if i % 2 == 0:
                nums[i] = temp[left]
                left += 1
            else:
                nums[i] = temp[n - 1 - right]
                right += 1


def is_wiggle_sorted(nums: list[int]) -> bool:
    """
    Check if array satisfies wiggle sort property.

    Args:
        nums: Array to check

    Returns:
        True if nums[0] <= nums[1] >= nums[2] <= nums[3] >= ...
    """
    for i in range(len(nums) - 1):
        if i % 2 == 0:
            # Even index: should be <= next
            if nums[i] > nums[i + 1]:
                return False
        else:
            # Odd index: should be >= next
            if nums[i] < nums[i + 1]:
                return False
    return True


def test_solution() -> None:
    """Test cases for Problem 280."""
    solution = Solution()

    # Test case 1: Standard case
    nums1 = [3, 5, 2, 1, 6, 4]
    solution.wiggleSort(nums1)
    assert is_wiggle_sorted(nums1), f"Not wiggle sorted: {nums1}"

    # Test case 2: Already sorted ascending
    nums2 = [1, 2, 3, 4, 5]
    solution.wiggleSort(nums2)
    assert is_wiggle_sorted(nums2), f"Not wiggle sorted: {nums2}"

    # Test case 3: All equal
    nums3 = [1, 1, 1, 1]
    solution.wiggleSort(nums3)
    assert is_wiggle_sorted(nums3), f"Not wiggle sorted: {nums3}"

    # Test case 4: Two elements
    nums4 = [2, 1]
    solution.wiggleSort(nums4)
    assert is_wiggle_sorted(nums4), f"Not wiggle sorted: {nums4}"

    # Test case 5: Single element
    nums5 = [1]
    solution.wiggleSort(nums5)
    assert is_wiggle_sorted(nums5), f"Not wiggle sorted: {nums5}"

    # Test case 6: Reverse sorted
    nums6 = [5, 4, 3, 2, 1]
    solution.wiggleSort(nums6)
    assert is_wiggle_sorted(nums6), f"Not wiggle sorted: {nums6}"

    # Test sorting approach
    nums7 = [3, 5, 2, 1, 6, 4]
    solution.wiggleSortSorting(nums7)
    assert is_wiggle_sorted(nums7), f"Not wiggle sorted: {nums7}"

    # Test median approach
    nums8 = [3, 5, 2, 1, 6, 4]
    solution.wiggleSortMedian(nums8)
    print(f"Median approach result: {nums8}")

    # Test case 9: Larger array
    nums9 = [9, 8, 7, 6, 5, 4, 3, 2, 1]
    solution.wiggleSort(nums9)
    assert is_wiggle_sorted(nums9), f"Not wiggle sorted: {nums9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 280. Wiggle Sort ===")

    nums1 = [3, 5, 2, 1, 6, 4]
    print(f"Before: {nums1}")
    solution.wiggleSort(nums1)
    print(f"After:  {nums1}")
    print(f"Is wiggle sorted: {is_wiggle_sorted(nums1)}")

    nums2 = [1, 5, 1, 1, 6, 4]
    print(f"\nBefore: {nums2}")
    solution.wiggleSort(nums2)
    print(f"After:  {nums2}")
    print(f"Is wiggle sorted: {is_wiggle_sorted(nums2)}")

    nums3 = [1, 2, 3, 4, 5]
    print(f"\nBefore: {nums3}")
    solution.wiggleSortSorting(nums3)
    print(f"After (sorting approach): {nums3}")
    print(f"Is wiggle sorted: {is_wiggle_sorted(nums3)}")
