"""
# 324. Wiggle Sort II
# Difficulty: Medium
Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]...

You may assume the input array always has a valid answer.

Follow up: Can you do it in O(n) time and/or in-place with O(1) extra space?

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Unlike Wiggle Sort I which allows equality, this requires strict inequality (<, >, <, >).
We need to interleave smaller and larger halves to avoid adjacent equal elements.

### APPROACH:
1. **Find median**: Partition array around median value
2. **Interleave halves**: Place smaller elements at even indices, larger at odd
3. **Reverse order**: Place larger elements in reverse to avoid adjacency
4. **Virtual indexing**: Map indices to avoid using extra space

### WHY THIS WORKS:
- After sorting, split into two halves around median
- Interleaving ensures no same-valued elements are adjacent
- Reverse order within halves maximizes separation
- Example: [1,2,3,4,5,6] → [1,4,2,5,3,6] → rearrange → [3,6,2,5,1,4]

### TIME COMPLEXITY: O(n log n)
For sorting. Can be O(n) with median-finding algorithm.

### SPACE COMPLEXITY: O(n)
For temporary sorted array. Can be O(1) with in-place virtual indexing.

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,5,1,1,6,4]

Step 1: Sort
[1,1,1,4,5,6]

Step 2: Split around median (median ≈ 2.5, so split at index 3)
Small half: [1,1,1]
Large half: [4,5,6]

Step 3: Interleave in reverse order
Even indices (0,2,4): [1,1,1] reversed → 1,1,1
Odd indices (1,3,5): [4,5,6] reversed → 6,5,4

Result: [1,6,1,5,1,4]
Verify: 1<6>1<5>1<4 ✓

Why reverse order?
If we used [1,1,1] and [4,5,6] directly:
[1,4,1,5,1,6] - works
But with [1,1,1,2,2,2], without reversing:
[1,2,1,2,1,2] - works
With [1,1,1,1,2,2], need clever placement:
[1,2,1,2,1,1] - the last two are equal!
Reversing: [1,2,1,2,1,1] → place from middle outward
```

### EDGE CASES:
- Array with many duplicate elements
- All elements equal (impossible with strict inequality requirement)
- Small arrays (length 2-3)
- Even vs odd length arrays

### OPTIMIZATIONS:
- **Quickselect for median**: O(n) average time
- **Virtual indexing**: Map [0,1,2,3,4,5] → [1,3,5,0,2,4] for in-place
- **Three-way partitioning**: Dutch National Flag algorithm

</details>
"""

class Solution:
    def wiggleSort(self, nums: list[int]) -> None:
        """
        Reorder array in strict wiggle pattern: nums[0] < nums[1] > nums[2] < ...

        Modifies nums in-place using sorting and interleaving.

        Args:
            nums: Array to reorder (modified in-place)

        Time Complexity: O(n log n) for sorting
        Space Complexity: O(n) for temporary array
        """
        # Sort and create copy
        sorted_nums = sorted(nums)
        n = len(nums)

        # Find split point (median)
        mid = (n + 1) // 2

        # Split into two halves
        small = sorted_nums[:mid]
        large = sorted_nums[mid:]

        # Reverse both halves to maximize separation
        small.reverse()
        large.reverse()

        # Interleave: small at even indices, large at odd indices
        for i in range(len(small)):
            nums[2 * i] = small[i]
        for i in range(len(large)):
            nums[2 * i + 1] = large[i]

    def wiggleSortSimple(self, nums: list[int]) -> None:
        """
        Simpler approach using sorting and direct interleaving.

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        sorted_nums = sorted(nums)
        n = len(nums)
        mid = (n + 1) // 2

        # Place smaller half at even indices (reversed)
        # Place larger half at odd indices (reversed)
        j = mid - 1
        for i in range(0, n, 2):
            nums[i] = sorted_nums[j]
            j -= 1

        j = n - 1
        for i in range(1, n, 2):
            nums[i] = sorted_nums[j]
            j -= 1

    def wiggleSortVirtualIndex(self, nums: list[int]) -> None:
        """
        Advanced O(n) time and O(1) space using virtual indexing.

        Uses index mapping: (1 + 2*i) % (n|1)
        Maps [0,1,2,3,4,5] → [1,3,5,0,2,4]

        Time Complexity: O(n) with quickselect
        Space Complexity: O(1)
        """
        n = len(nums)
        median = self.findMedian(nums)

        # Virtual index mapping
        def idx(i):
            return (1 + 2 * i) % (n | 1)

        # Three-way partitioning around median
        i, j, k = 0, 0, n - 1
        while j <= k:
            if nums[idx(j)] > median:
                nums[idx(i)], nums[idx(j)] = nums[idx(j)], nums[idx(i)]
                i += 1
                j += 1
            elif nums[idx(j)] < median:
                nums[idx(j)], nums[idx(k)] = nums[idx(k)], nums[idx(j)]
                k -= 1
            else:
                j += 1

    def findMedian(self, nums: list[int]) -> int:
        """
        Find median using sorting (simple approach).

        For true O(n), use quickselect algorithm.
        """
        sorted_nums = sorted(nums)
        n = len(sorted_nums)
        return sorted_nums[(n - 1) // 2]

def is_strict_wiggle(nums: list[int]) -> bool:
    """
    Check if array satisfies strict wiggle property.

    Args:
        nums: Array to check

    Returns:
        True if nums[0] < nums[1] > nums[2] < nums[3] > ...
    """
    for i in range(len(nums) - 1):
        if i % 2 == 0:
            # Even index: should be < next
            if nums[i] >= nums[i + 1]:
                return False
        else:
            # Odd index: should be > next
            if nums[i] <= nums[i + 1]:
                return False
    return True

def test_solution():
    """Test cases for Problem 324."""
    solution = Solution()

    # Test case 1: Example from problem
    nums1 = [1, 5, 1, 1, 6, 4]
    solution.wiggleSort(nums1)
    print(f"Test 1 result: {nums1}")
    assert is_strict_wiggle(nums1), f"Not strict wiggle: {nums1}"

    # Test case 2: Another example
    nums2 = [1, 3, 2, 2, 3, 1]
    solution.wiggleSort(nums2)
    print(f"Test 2 result: {nums2}")
    assert is_strict_wiggle(nums2), f"Not strict wiggle: {nums2}"

    # Test case 3: Small array
    nums3 = [1, 2, 3]
    solution.wiggleSort(nums3)
    print(f"Test 3 result: {nums3}")
    assert is_strict_wiggle(nums3), f"Not strict wiggle: {nums3}"

    # Test case 4: Larger array
    nums4 = [1, 2, 3, 4, 5, 6]
    solution.wiggleSort(nums4)
    print(f"Test 4 result: {nums4}")
    assert is_strict_wiggle(nums4), f"Not strict wiggle: {nums4}"

    # Test case 5: With duplicates
    nums5 = [4, 5, 5, 6]
    solution.wiggleSort(nums5)
    print(f"Test 5 result: {nums5}")
    assert is_strict_wiggle(nums5), f"Not strict wiggle: {nums5}"

    # Test simple approach
    nums6 = [1, 5, 1, 1, 6, 4]
    solution.wiggleSortSimple(nums6)
    print(f"Test 6 (simple) result: {nums6}")
    assert is_strict_wiggle(nums6), f"Not strict wiggle: {nums6}"

    # Test virtual index approach
    nums7 = [1, 5, 1, 1, 6, 4]
    solution.wiggleSortVirtualIndex(nums7)
    print(f"Test 7 (virtual) result: {nums7}")
    assert is_strict_wiggle(nums7), f"Not strict wiggle: {nums7}"

    # Test case 8: Even length
    nums8 = [1, 1, 2, 2, 3, 3]
    solution.wiggleSort(nums8)
    print(f"Test 8 result: {nums8}")
    assert is_strict_wiggle(nums8), f"Not strict wiggle: {nums8}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\n=== 324. Wiggle Sort II ===")

    nums1 = [1, 5, 1, 1, 6, 4]
    print(f"Before: {nums1}")
    solution.wiggleSort(nums1)
    print(f"After:  {nums1}")
    print(f"Is strict wiggle: {is_strict_wiggle(nums1)}")

    nums2 = [1, 3, 2, 2, 3, 1]
    print(f"\nBefore: {nums2}")
    solution.wiggleSort(nums2)
    print(f"After:  {nums2}")
    print(f"Is strict wiggle: {is_strict_wiggle(nums2)}")
