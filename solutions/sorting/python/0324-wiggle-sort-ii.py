"""
LeetCode Problem 324: Wiggle Sort II
Difficulty: Medium
Category: Sorting

Problem Description:
Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....

You may assume the input array always has a valid answer.

Example 1:
Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
Explanation: [1,4,1,5,1,6] is also accepted.

Example 2:
Input: nums = [1,3,2,2,3,1]
Output: [2,3,1,3,1,2]

Constraints:
- 1 <= nums.length <= 5 * 10^4
- 0 <= nums[i] <= 5000
- It is guaranteed that there will be an answer for the given input nums.

Follow Up: Can you do it in O(n) time and/or in-place with O(1) extra space?

METADATA:
Techniques:
- Sorting
- Virtual indexing
- Partitioning
- Two-pointer technique

Data Structures:
- Array
- In-place manipulation

Patterns:
- Wiggle pattern
- Median finding
- Index mapping

Time Complexity: O(n log n) with sorting, O(n) with median finding
Space Complexity: O(n) for auxiliary array, can be O(1) with advanced techniques

Intuition:
The key insight is to place smaller elements in even positions and larger elements in odd
positions. Sort the array, split it into two halves (smaller and larger), then interleave
them from the end to avoid adjacent equal elements. Using reverse order prevents duplicates
from being placed next to each other.

Approach:
1. Sort the array
2. Split into two halves: small (0 to mid) and large (mid+1 to end)
3. Place elements from small half in even indices (from right to left)
4. Place elements from large half in odd indices (from right to left)
5. Use reverse order to maximize distance between duplicate values

Why This Works:
By sorting and splitting, we ensure smaller elements go to even positions and larger to odd.
Filling from the end of each half ensures that if there are duplicates, they're maximally
separated in the final array, preventing them from being adjacent.

Example Walkthrough:
Input: [1,5,1,1,6,4]
Sorted: [1,1,1,4,5,6]
Split: small=[1,1,1], large=[4,5,6]

Fill result array (size 6):
- Odd positions (from large, reversed): result[1]=6, result[3]=5, result[5]=4
- Even positions (from small, reversed): result[0]=1, result[2]=1, result[4]=1

Result: [1,6,1,5,1,4] ✓
Verify: 1 < 6 > 1 < 5 > 1 < 4 ✓
"""

from typing import List


def wiggleSort(nums: List[int]) -> None:
    """
    Reorder array in wiggle pattern (in-place).

    Args:
        nums: Array to reorder (modified in-place)
    """
    # Sort the array
    sorted_nums = sorted(nums)
    n = len(nums)

    # Split into two halves
    mid = (n + 1) // 2

    # Fill from the end to avoid adjacent duplicates
    # Small half goes to even positions (0, 2, 4, ...)
    # Large half goes to odd positions (1, 3, 5, ...)
    small = sorted_nums[:mid]
    large = sorted_nums[mid:]

    # Reverse both halves to maximize separation of duplicates
    small.reverse()
    large.reverse()

    # Fill even positions with small half
    for i in range(len(small)):
        nums[i * 2] = small[i]

    # Fill odd positions with large half
    for i in range(len(large)):
        nums[i * 2 + 1] = large[i]


def wiggleSortSimple(nums: List[int]) -> None:
    """
    Alternative simple approach using auxiliary array.

    Args:
        nums: Array to reorder (modified in-place)
    """
    sorted_nums = sorted(nums)
    n = len(nums)
    result = [0] * n

    # Fill odd positions from the end
    pos = n - 1
    for i in range(1, n, 2):
        result[i] = sorted_nums[pos]
        pos -= 1

    # Fill even positions from the end
    for i in range(0, n, 2):
        result[i] = sorted_nums[pos]
        pos -= 1

    # Copy back to original array
    for i in range(n):
        nums[i] = result[i]


def verify_wiggle(nums: List[int]) -> bool:
    """Verify if array satisfies wiggle property."""
    for i in range(len(nums) - 1):
        if i % 2 == 0:
            # Even index: nums[i] < nums[i+1]
            if nums[i] >= nums[i + 1]:
                return False
        else:
            # Odd index: nums[i] > nums[i+1]
            if nums[i] <= nums[i + 1]:
                return False
    return True


if __name__ == "__main__":
    # Test cases
    test_cases = [
        [1, 5, 1, 1, 6, 4],
        [1, 3, 2, 2, 3, 1],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
        [1, 1, 2, 2, 3, 3],
        [4, 5, 5, 6]
    ]

    print("Testing wiggleSort:")
    for nums in test_cases:
        original = nums.copy()
        wiggleSort(nums)
        is_valid = verify_wiggle(nums)
        status = "✓" if is_valid else "✗"
        print(f"{status} Input: {original}")
        print(f"   Output: {nums}, Valid: {is_valid}")

    print("\nTesting wiggleSortSimple:")
    for nums in test_cases:
        original = nums.copy()
        wiggleSortSimple(nums)
        is_valid = verify_wiggle(nums)
        status = "✓" if is_valid else "✗"
        print(f"{status} Input: {original}")
        print(f"   Output: {nums}, Valid: {is_valid}")
