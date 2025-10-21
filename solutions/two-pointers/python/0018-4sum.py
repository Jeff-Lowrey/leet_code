"""
# Difficulty: Medium

# 018. 4Sum

Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

- 0 <= a, b, c, d < n
- a, b, c, and d are distinct.
- nums[a] + nums[b] + nums[c] + nums[d] == target

You may return the answer in any order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1,0,-1,0,-2,2], target = 0</dd>
<dt>Output:</dt>
<dd>[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]</dd>
<dt>Explanation:</dt>
<dd>4Sum: quadruplets summing to target</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
Sort array first. Fix first two elements, use two pointers for remaining two. Skip duplicates at all four positions. Adjust pointers based on sum comparison to target.

### APPROACH:
1. **Sort array**: Sort nums to enable two-pointer technique and skip duplicates
2. **Outer loops for first two numbers**: Use nested loops for i and j
3. **Skip duplicates**: For both i and j, skip duplicate values
4. **Initialize two pointers**: For each (i,j) pair, set left = j+1, right = len(nums)-1
5. **Calculate sum**: current_sum = nums[i] + nums[j] + nums[left] + nums[right]
6. **Check target**: If sum == target, add quadruplet and skip duplicates
7. **Adjust pointers**: If sum < target, increment left; if sum > target, decrement right
8. **Return result**: Return list of all unique quadruplets

### WHY THIS WORKS:
- Sort array, fix two numbers with outer loops, two-pointer on remaining
- Skip duplicates at each level to avoid duplicate quadruplets
- Two pointers find pairs that sum to (target - num1 - num2)
- Same as 3sum with extra outer loop
- O(n^3) time: two nested loops + two pointers, O(1) space

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,0,-1,0,-2,2], target = 0
Step 1: Sort array
  sorted = [-2,-1,0,0,1,2]

Step 2: Fix first two, use two pointers for rest
  i=-2, j=-1: find pairs summing to 3
  i=-2, j=0: find pairs summing to 2
  ...

Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
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

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        """
        Find all unique quadruplets in nums that sum up to target.

        Args:
            nums: List of integers
            target: Target sum

        Returns:
            List of lists containing unique quadruplets that sum to target

        Example:
            Input = [1,0,-1,0,-2,2], target = 0
            Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
        """
        # Handle edge cases
        if not nums or len(nums) < 4:
            return []

        # Sort the array to handle duplicates and use two pointers approach
        nums.sort()
        n = len(nums)
        result: list[Any] = []

        # Fix first two numbers and use two pointers for the rest
        for i in range(n - 3):
            # Skip duplicates for first number
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            # Early break if smallest possible sum is greater than target
            if nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target:
                break

            # Skip if largest possible sum is smaller than target
            if nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target:
                continue

            for j in range(i + 1, n - 2):
                # Skip duplicates for second number
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue

                # Use two pointers for the remaining two numbers
                left, right = j + 1, n - 1

                while left < right:
                    current_sum = nums[i] + nums[j] + nums[left] + nums[right]

                    if current_sum == target:
                        result.append([nums[i], nums[j], nums[left], nums[right]])

                        # Skip duplicates for third number
                        while left < right and nums[left] == nums[left + 1]:
                            left += 1
                        # Skip duplicates for fourth number
                        while left < right and nums[right] == nums[right - 1]:
                            right -= 1

                        left += 1
                        right -= 1
                    elif current_sum < target:
                        left += 1
                    else:
                        right -= 1

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.fourSum([1, 2, 3], 2)
    expected: list[Any] = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.fourSum([], 0)
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 018. 4Sum")
