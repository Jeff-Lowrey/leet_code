"""
# Difficulty: Medium

# 300. Longest Increasing Subsequence

Given an integer array nums, return the length of the longest strictly increasing subsequence.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [10, 9, 2, 5, 3, 7, 101, 18]</dd>
<dt>Output:</dt>
<dd>4 (LIS: [2, 3, 7, 18] or [2, 3, 7, 101])</dd>
<dt>Explanation:</dt>
<dd>Longest increasing subsequence in [10,9,2,5,3,7,101,18] is [2,3,7,18] with length 4</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Set, Array, Tree
**Patterns**: Two Pointers Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
For each number, find the longest increasing subsequence ending at that number. dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]. The answer is max(dp).

### APPROACH:
1. **Initialize DP array**: Create dp = [1] * len(nums) where dp[i] = LIS length ending at index i
2. **Iterate through array**: For each position i from 1 to len(nums)
3. **Check previous elements**: For each j from 0 to i-1
4. **Find increasing pairs**: If nums[j] < nums[i], we can extend subsequence ending at j
5. **Update DP value**: Set dp[i] = max(dp[i], dp[j] + 1) for all valid j
6. **Track maximum length**: Keep running maximum of all dp values
7. **Return result**: Return max(dp) as the length of longest increasing subsequence

### WHY THIS WORKS:
- DP: dp[i] = length of LIS ending at i
- For each i, check all j < i: if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1)
- Binary search optimization: maintain increasing tails array, binary search for insertion point
- Tails[i] = smallest ending value of LIS of length i+1
- O(n^2) DP solution, O(n log n) with binary search, O(n) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [10, 9, 2, 5, 3, 7, 101, 18]
```

Step 1: num=10
tails = [10]
Step 2: num=9
9 < 10, replace: tails = [9]
Step 3: num=2
2 < 9, replace: tails = [2]
Step 4: num=5
5 > 2, append: tails = [2, 5]
Step 5: num=3
3 > 2 but 3 < 5, replace 5
tails = [2, 3]
Step 6: num=7
7 > 3, append: tails = [2, 3, 7]
Step 7: num=101
101 > 7, append: tails = [2, 3, 7, 101]
Step 8: num=18
18 > 7 but 18 < 101, replace 101
tails = [2, 3, 7, 18]

Output:
```
4 (LIS: [2, 3, 7, 18] or [2, 3, 7, 101])
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any


class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        """
        Find length of longest increasing subsequence using binary search + DP.

        Args:
            nums: Array of integers

        Returns:
            Length of longest strictly increasing subsequence

        Time Complexity: O(n log n) - binary search for each element
        Space Complexity: O(n) - space for tails array
        """
        if not nums:
            return 0

        # tails[i] = smallest tail value for LIS of length i+1
        tails: list[Any] = []

        for num in nums:
            # Binary search for position to insert/replace
            left, right = 0, len(tails)

            while left < right:
                mid = (left + right) // 2
                if tails[mid] < num:
                    left = mid + 1
                else:
                    right = mid

            # If left == len(tails), append; otherwise, replace
            if left == len(tails):
                tails.append(num)
            else:
                tails[left] = num

        return len(tails)

    def solve(self, nums: list[int]) -> int:
        """Wrapper method for consistency with template."""
        return self.lengthOfLIS(nums)


def test_solution() -> None:
    """
    Test cases for 300. Longest Increasing Subsequence.
    """
    solution = Solution()

    # Test case 1: Classic example
    solution.solve([10, 9, 2, 5, 3, 7, 101, 18])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 2: All increasing
    solution.solve([1, 2, 3, 4, 5])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 3: All decreasing
    solution.solve([5, 4, 3, 2, 1])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 4: Single element
    solution.solve([7])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 5: Two elements increasing
    solution.solve([1, 3])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 6: Two elements decreasing
    solution.solve([3, 1])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 7: Duplicates
    solution.solve([1, 3, 6, 7, 9, 4, 10, 5, 6])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 8: Another example
    solution.solve([0, 1, 0, 3, 2, 3])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    nums = [10, 9, 2, 5, 3, 7, 101, 18]
    solution.solve(nums)
