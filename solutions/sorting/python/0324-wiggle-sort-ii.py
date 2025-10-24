"""
# 0324. Wiggle Sort Ii

# Difficulty: Medium

Solve the Wiggle Sort Ii problem as described.

**Example:**
 *
<dl class="example-details">
<dt>Input:</dt>
<dd>```</dd>
<dt>Output:</dt>
<dd>```</dd>
<dt>Explanation:</dt>
<dd>Processing input produces the expected output</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
### METADATA:
**Techniques**: - Sorting
**Data Structures**: - Array
**Patterns**: - Wiggle pattern
**Time Complexity**: **O(n²)**
**Space Complexity**: **O(1)**
 *
### INTUITION:
The key insight is to solve this problem efficiently.
 *
### APPROACH:
We solve this problem by implementing the required algorithm.
 *
### WHY THIS WORKS:
This approach works because it correctly implements the problem requirements.
 *
### EXAMPLE WALKTHROUGH:
Input:
```
example input
```

Output:
```
example output
```

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 *
### SPACE COMPLEXITY:
**O(1)** - Analysis of space complexity
 *
### EDGE CASES:
- Handle empty input
- Handle boundary conditions
 *
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
