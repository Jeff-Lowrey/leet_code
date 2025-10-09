"""
# Difficulty: Medium

# 75. Sort Colors

Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects
of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is the classic Dutch National Flag problem. We need to partition array into three sections:
all 0s, all 1s, all 2s. Use three pointers to maintain boundaries.

### APPROACH:
1. **Three pointers**: left (0s boundary), mid (current), right (2s boundary)
2. **Initialize**: left=0, mid=0, right=n-1
3. **Process mid pointer**:
   - If nums[mid] == 0: swap with left, move both pointers right
   - If nums[mid] == 1: just move mid right (already in correct region)
   - If nums[mid] == 2: swap with right, move right left (don't move mid yet)
4. **Continue until mid > right**: All elements processed

### WHY THIS WORKS:
- Left pointer maintains: all elements before left are 0s
- Right pointer maintains: all elements after right are 2s
- Mid pointer scans: checks and places elements
- Invariants preserved throughout
- Single pass is sufficient

### EXAMPLE WALKTHROUGH:
```
Input: nums = [2,0,2,1,1,0]

Initial: left=0, mid=0, right=5
[2,0,2,1,1,0]
 ^
 LM         R

Step 1: nums[mid]=2, swap with right, right--
[0,0,2,1,1,2]
 ^
 LM       R

Step 2: nums[mid]=0, swap with left, left++, mid++
[0,0,2,1,1,2]
   ^
   LM     R

Step 3: nums[mid]=2, swap with right, right--
[0,0,1,1,2,2]
   ^
   LM   R

Step 4: nums[mid]=1, mid++
[0,0,1,1,2,2]
     ^
     LMR

Step 5: nums[mid]=1, mid++
[0,0,1,1,2,2]
       ^
       L MR

Step 6: mid > right, done
[0,0,1,1,2,2]
         ^
         LRM

Output: [0,0,1,1,2,2] ✓
```

### TIME COMPLEXITY:
O(n)
Single pass through array

### SPACE COMPLEXITY:
O(1)
In-place sorting with constant extra space

### EDGE CASES:
- All same color
- Already sorted
- Reverse sorted
- Single element
- Two elements

</details>
"""

class Solution:
    def sortColors(self, nums: list[int]) -> None:
        """
        Sort colors in-place using Dutch National Flag algorithm.

        Three-way partitioning with one pass.

        Args:
            nums: Array to sort (modified in-place)

        Time Complexity: O(n) - single pass
        Space Complexity: O(1) - in-place
        """
        left, mid, right = 0, 0, len(nums) - 1

        while mid <= right:
            if nums[mid] == 0:
                # Move 0 to left section
                nums[left], nums[mid] = nums[mid], nums[left]
                left += 1
                mid += 1
            elif nums[mid] == 1:
                # 1 is already in correct middle section
                mid += 1
            else:  # nums[mid] == 2
                # Move 2 to right section
                nums[mid], nums[right] = nums[right], nums[mid]
                right -= 1
                # Don't increment mid yet, need to check swapped element

    def sortColorsCountingSort(self, nums: list[int]) -> None:
        """
        Sort using counting sort (two-pass).

        Time Complexity: O(n) - two passes
        Space Complexity: O(1) - constant extra space (just counters)
        """
        # Count occurrences
        count = [0, 0, 0]
        for num in nums:
            count[num] += 1

        # Overwrite array with sorted values
        idx = 0
        for color in range(3):
            for _ in range(count[color]):
                nums[idx] = color
                idx += 1

    def sortColorsTwoPasses(self, nums: list[int]) -> None:
        """
        Sort using two passes of partitioning.

        First pass: move all 0s to front
        Second pass: move all 1s to middle

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        n = len(nums)

        # First pass: partition 0s to the left
        left = 0
        for i in range(n):
            if nums[i] == 0:
                nums[left], nums[i] = nums[i], nums[left]
                left += 1

        # Second pass: partition 1s to the middle (starting from left)
        for i in range(left, n):
            if nums[i] == 1:
                nums[left], nums[i] = nums[i], nums[left]
                left += 1

def test_solution():
    """Test cases for Problem 75."""
    solution = Solution()

    # Test case 1: Example from problem
    nums1 = [2, 0, 2, 1, 1, 0]
    solution.sortColors(nums1)
    expected1 = [0, 0, 1, 1, 2, 2]
    assert nums1 == expected1, f"Expected {expected1}, got {nums1}"

    # Test case 2: Another example
    nums2 = [2, 0, 1]
    solution.sortColors(nums2)
    expected2 = [0, 1, 2]
    assert nums2 == expected2, f"Expected {expected2}, got {nums2}"

    # Test case 3: All same color
    nums3 = [1, 1, 1, 1]
    solution.sortColors(nums3)
    expected3 = [1, 1, 1, 1]
    assert nums3 == expected3, f"Expected {expected3}, got {nums3}"

    # Test case 4: Already sorted
    nums4 = [0, 0, 1, 1, 2, 2]
    solution.sortColors(nums4)
    expected4 = [0, 0, 1, 1, 2, 2]
    assert nums4 == expected4, f"Expected {expected4}, got {nums4}"

    # Test case 5: Reverse sorted
    nums5 = [2, 2, 1, 1, 0, 0]
    solution.sortColors(nums5)
    expected5 = [0, 0, 1, 1, 2, 2]
    assert nums5 == expected5, f"Expected {expected5}, got {nums5}"

    # Test case 6: Single element
    nums6 = [0]
    solution.sortColors(nums6)
    expected6 = [0]
    assert nums6 == expected6, f"Expected {expected6}, got {nums6}"

    # Test case 7: Two elements
    nums7 = [1, 0]
    solution.sortColors(nums7)
    expected7 = [0, 1]
    assert nums7 == expected7, f"Expected {expected7}, got {nums7}"

    # Test counting sort
    nums8 = [2, 0, 2, 1, 1, 0]
    solution.sortColorsCountingSort(nums8)
    expected8 = [0, 0, 1, 1, 2, 2]
    assert nums8 == expected8, f"Expected {expected8}, got {nums8}"

    # Test two-pass approach
    nums9 = [2, 0, 2, 1, 1, 0]
    solution.sortColorsTwoPasses(nums9)
    expected9 = [0, 0, 1, 1, 2, 2]
    assert nums9 == expected9, f"Expected {expected9}, got {nums9}"

    # Test case 10: Only 0s and 2s
    nums10 = [2, 0, 2, 0, 2]
    solution.sortColors(nums10)
    expected10 = [0, 0, 2, 2, 2]
    assert nums10 == expected10, f"Expected {expected10}, got {nums10}"

    # Test case 11: Complex pattern
    nums11 = [1, 2, 0, 1, 2, 0, 1, 2, 0]
    solution.sortColors(nums11)
    expected11 = [0, 0, 0, 1, 1, 1, 2, 2, 2]
    assert nums11 == expected11, f"Expected {expected11}, got {nums11}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 75. Sort Colors (Dutch National Flag) ===")

    nums1 = [2, 0, 2, 1, 1, 0]
    print(f"Before: {nums1}")
    solution.sortColors(nums1)
    print(f"After:  {nums1}")

    nums2 = [2, 0, 1]
    print(f"\nBefore: {nums2}")
    solution.sortColors(nums2)
    print(f"After:  {nums2}")

    nums3 = [1, 2, 0, 1, 2, 0]
    print(f"\nBefore: {nums3}")
    solution.sortColorsCountingSort(nums3)
    print(f"After (counting sort): {nums3}")
