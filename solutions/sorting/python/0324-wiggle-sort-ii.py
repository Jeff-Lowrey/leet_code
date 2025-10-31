"""
# 0324. Wiggle Sort II

# Difficulty: Medium

Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]...

You may assume the input array always has a valid answer.

Follow up: Can you do it in O(n) time and/or in-place with O(1) extra space?

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1, 5, 1, 1, 6, 4]</dd>
<dt>Output:</dt>
<dd>[1,6,1,5,1,4]</dd>
<dt>Explanation:</dt>
<dd>Wiggle sort II: nums[0] < nums[1] > nums[2] < nums[3]...</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Sorting, Median Finding, Virtual Indexing
**Data Structures**: Array
**Patterns**: Wiggle pattern, Interleaving
**Time Complexity**: O(n log n) - Sorting or divide-and-conquer
**Space Complexity**: O(n) - Additional storage
 *
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

### EXAMPLE WALKTHROUGH:
**Input:** nums = [1,5,1,1,6,4]

**Step 1:** Find median - Sort the input array [1,5,1,1,6,4]
- Sorted: [1,1,1,4,5,6]

**Step 2:** Partition around median (median ≈ 2.5, split at index 3)
- Small half: [1,1,1]
- Large half: [4,5,6]

**Step 3:** Interleave halves in reverse order
- Even indices (0,2,4): [1,1,1] reversed → 1,1,1
- Odd indices (1,3,5): [4,5,6] reversed → 6,5,4

**Step 4:** Virtual indexing (place elements)
- Result: [1,6,1,5,1,4]
- Verify: 1<6>1<5>1<4 ✓

Why reverse order? With [1,1,1,1,2,2] and no reversing:
- [1,2,1,2,1,1] - last two are equal!
- Reversing ensures maximum separation of duplicates

Output:
```
[1,6,1,5,1,4]
```

### TIME COMPLEXITY:
O(n log n)
For sorting. Can be O(n) with median-finding algorithm.

### SPACE COMPLEXITY:
O(n)
For temporary sorted array. Can be O(1) with in-place virtual indexing.

### EDGE CASES:
- Array with many duplicate elements
- All elements equal (impossible with strict inequality requirement)
- Small arrays (length 2-3)
- Even vs odd length arrays

</details>
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
        print(f"   Output: nums, Valid: {is_valid}")

    print("\nTesting wiggleSortSimple:")
    for nums in test_cases:
        original = nums.copy()
        wiggleSortSimple(nums)
        is_valid = verify_wiggle(nums)
        status = "✓" if is_valid else "✗"
        print(f"{status} Input: {original}")
        print(f"   Output: nums, Valid: {is_valid}")
