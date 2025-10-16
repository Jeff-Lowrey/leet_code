"""
# Difficulty: Hard

# 330. Patching Array

You are given a sorted positive integer array nums and an integer n. You need to
make it so that any integer in the range [1, n] can be formed by the sum of some
elements from nums.

Return the minimum number of patches (additions to the array) required.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1,3], n = 6</dd>
<dt>Output:</dt>
<dd>1 (patched with 2)</dd>
<dt>Explanation:</dt>
<dd>Minimum 1 patch [3] needed to cover range [1,2,4] to sum 6</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
The key insight is tracking what range [1, covered] we can currently form. If we
can form [1, covered], and we have a number x where x <= covered + 1, then adding
x extends our range to [1, covered + x]. If x > covered + 1, we have a gap and
need to patch with (covered + 1).

### APPROACH:
1. **Track coverage**: Maintain the maximum number we can currently build
2. **Use available numbers**: If nums[i] <= covered + 1, use it to extend coverage
3. **Patch when needed**: If nums[i] > covered + 1, patch with (covered + 1)
4. **Greedy choice**: Always patch with (covered + 1) as it doubles our coverage

### WHY THIS WORKS:
The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,3], n = 6

covered = 0, patches = 0

Step 1: 1 <= 0+1? Yes → covered = 0+1 = 1
        Can now form: [1,1]

Step 2: 3 <= 1+1? No (3 > 2) → Need patch!
        Patch with 2, patches = 1
        covered = 1 + 2 = 3
        Can now form: [1,3]

Step 3: 3 <= 3+1? Yes → covered = 3+3 = 6
        Can now form: [1,6]

Step 4: covered >= 6, done!

Output: 1 (patched with 2)
```

### TIME COMPLEXITY:
O(m + log n)
Where m is length of nums. In worst case, we need log(n) patches.

### SPACE COMPLEXITY:
O(1)
Only using constant extra space

### EDGE CASES:
- Empty array: Need to patch from 1 up to n
- Array already covers [1,n]: No patches needed
- Large n with small array: Multiple patches required
- Array starts with value > 1: Need to patch 1 first

</details>
"""

from typing import List


class Solution:
    def minPatches(self, nums: List[int], n: int) -> int:
        """
        Calculate the minimum number of patches needed to cover range [1, n].

        Args:
            nums: A sorted list of positive integers
            n: Target number up to which we need coverage

        Returns:
            int: Minimum number of patches needed

        Time Complexity: O(m + logn) where m is length of nums
        Space Complexity: O(1)
        """
        patches = 0  # Count of patches needed
        covered = 0  # Numbers we can currently build up to
        index = 0  # Current position in nums array

        while covered < n:
            # If we have numbers left and current number <= covered + 1
            if index < len(nums) and nums[index] <= covered + 1:
                covered += nums[index]  # Extend our coverage
                index += 1
            else:
                # Need to patch with (covered + 1)
                patches += 1
                # Adding this number doubles our coverage range
                covered = covered + (covered + 1)

            # Handle potential integer overflow
            if covered > n:
                break

        return patches


def test_solution() -> None:
    """
    Test cases for 330. Patching Array.
    """
    class Solution:
        def minPatches(self, nums: List[int], n: int) -> int:
            patches = 0
            covered = 0
            index = 0

            while covered < n:
                if index < len(nums) and nums[index] <= covered + 1:
                    covered += nums[index]
                    index += 1
                else:
                    patches += 1
                    covered = covered + (covered + 1)

                if covered > n:
                    break

            return patches

    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.minPatches([1, 3], 6)
    expected1 = 1
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: More patches needed
    result2 = solution.minPatches([1, 5, 10], 20)
    expected2 = 2
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Empty array
    result3 = solution.minPatches([], 7)
    expected3 = 3  # Need to patch with 1, 2, 4
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Already complete
    result4 = solution.minPatches([1, 2, 2], 5)
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Large n
    result5 = solution.minPatches([1, 2, 31, 33], 2147483647)
    expected5 = 28
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Single element
    result6 = solution.minPatches([1], 1)
    expected6 = 0
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Gap at start
    result7 = solution.minPatches([2], 5)
    expected7 = 2  # Need 1 and 4
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage with the Solution class already defined above
    solution = Solution()
    print("=== 330. Patching Array ===")
    print(f"minPatches([1,3], 6) -> {solution.minPatches([1, 3], 6)}")
    print(f"minPatches([1,5,10], 20) -> {solution.minPatches([1, 5, 10], 20)}")
    print(f"minPatches([], 7) -> {solution.minPatches([], 7)}")
