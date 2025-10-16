"""
# Difficulty: Easy

# 026. Remove Duplicates From Sorted Array

Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result.

Return k after placing the final result in the first k slots of nums.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1,1,2]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Remove duplicates from sorted array [1,1,2] gives length 2</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic two-pointers problem. Since the array is sorted, duplicates are adjacent. We use one pointer to iterate through the array and another to track the position where the next unique element should be placed.

### APPROACH:
1. **Two pointers**: Use `i` to iterate and `j` to track unique position
2. **Skip duplicates**: Only advance `j` when we find a new unique element
3. **In-place modification**: Copy unique elements to positions 0, 1, 2, etc.
4. **Return count**: Return the number of unique elements

### WHY THIS WORKS:
- Sorted array means duplicates are adjacent
- Two pointers allow in-place removal without extra space
- `j` tracks the "write" position for next unique element
- `i` scans through all elements

### EXAMPLE WALKTHROUGH:
```
Input: [1,1,2]
i=0, j=0: nums[0]=1 (first element, place at j=0)
i=1, j=1: nums[1]=1 == nums[0], skip
i=2, j=1: nums[2]=2 != nums[0], place at j=1
Result: [1,2,_], return k=2
```

### TIME COMPLEXITY:
O(n)
Single pass through the array

### SPACE COMPLEXITY:
O(1)
Only using constant extra space

### EDGE CASES:
- **Empty array**: Return 0 (no elements)
- **Single element**: Return 1 (already unique)
- **All elements same**: Return 1 (only one unique value)
- **No duplicates**: Return n (all unique already)
- **Consecutive duplicates**: Two-pointer removes them in-place

</details>
"""


class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        """
        Remove duplicates from sorted array in-place using two pointers.

        Args:
            nums: Sorted array in non-decreasing order

        Returns:
            Number of unique elements (length of modified array)

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not nums:
            return 0

        # j tracks the position for next unique element
        j = 1

        for i in range(1, len(nums)):
            # If current element is different from previous unique element
            if nums[i] != nums[j - 1]:
                nums[j] = nums[i]
                j += 1

        return j

    def removeDuplicatesAlternative(self, nums: list[int]) -> int:
        """
        Alternative implementation with explicit unique tracking.

        Args:
            nums: Sorted array

        Returns:
            Number of unique elements
        """
        if not nums:
            return 0

        unique_count = 1  # First element is always unique

        for i in range(1, len(nums)):
            if nums[i] != nums[unique_count - 1]:
                nums[unique_count] = nums[i]
                unique_count += 1

        return unique_count


def test_solution() -> None:
    """Test cases for 026. Remove Duplicates From Sorted Array."""
    solution = Solution()

    # Test case 1: Example case
    nums1 = [1, 1, 2]
    result1 = solution.removeDuplicates(nums1)
    expected1 = 2
    assert result1 == expected1 and nums1[:result1] == [1, 2], f"Expected {expected1}, got {result1}"

    # Test case 2: More duplicates
    nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    result2 = solution.removeDuplicatesAlternative(nums2)
    expected2 = 5
    assert result2 == expected2 and nums2[:result2] == [0, 1, 2, 3, 4], f"Expected {expected2}, got {result2}"

    # Test case 3: No duplicates
    nums3 = [1, 2, 3]
    result3 = solution.removeDuplicates(nums3)
    expected3 = 3
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: All same
    nums4 = [1, 1, 1]
    result4 = solution.removeDuplicates(nums4)
    expected4 = 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    nums = [1, 1, 2, 2, 3]
    k = solution.removeDuplicates(nums)
    print(f"Unique elements: {k}, Array: {nums[:k]}")
