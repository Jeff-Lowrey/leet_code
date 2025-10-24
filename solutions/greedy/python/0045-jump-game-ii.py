"""
# Difficulty: Medium

# 0045. Jump Game Ii

You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where 0 <= j <= nums[i] and i + j < n.

Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[2,3,1,1,4]</dd>
<dt>Output:</dt>
<dd>2 (minimum jumps)</dd>
<dt>Explanation:</dt>
<dd>Minimum 2 jumps needed to reach end of [2,3,1,1,4]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Breadth-First Search
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Track current reach and farthest reach. When reach exhausted, must jump (increment jumps) and update reach to farthest. Greedy: always extend reach as far as possible before jumping.

### APPROACH:
1. **Initialize variables**: Set jumps = 0, current_end = 0, farthest = 0
2. **Iterate to second-last**: For i in range(len(nums) - 1)
3. **Update farthest**: farthest = max(farthest, i + nums[i])
4. **Reached current end**: If i == current_end, increment jumps
5. **Extend range**: Set current_end = farthest
6. **Continue jumping**: Process all positions
7. **Return result**: Return jumps as minimum number of jumps

### WHY THIS WORKS:
- BFS-like greedy: track current jump's reach and next jump's reach
- Increment jumps when reaching end of current jump's range
- Update next reach as maximum of (i + nums[i]) for all i in current range
- Guaranteed to reach end, so count minimum jumps needed
- O(n) time: single pass, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [2,3,1,1,4]
```

Step 1: Initialize variables
jumps = 0, current_end = 0, farthest = 0
Step 2: Iterate through array
i=0: farthest = max(0, 0+2) = 2

Steps:
Step 1: i=1: farthest = max(2, 1+3) = 4, reached current_end → jumps=1, current_end=2
Step 2: i=2: farthest = max(4, 2+1) = 4, reached current_end → jumps=2, current_end=4
Step 3: Reached last index

Output:
```
2 (minimum jumps)
```

### TIME COMPLEXITY:
Based on the algorithm implementation


### SPACE COMPLEXITY:
Based on auxiliary data structures used


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def jump(self, nums: List[int]) -> int:
        """
        Calculates the minimum number of jumps needed to reach the last index.

        Args:
            nums: List of non-negative integers representing maximum jump lengths

        Returns:
            int: Minimum number of jumps needed to reach the last index

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Handle edge cases
        if not nums or len(nums) <= 1:
            return 0

        # Initialize variables
        jumps = 0  # Count of jumps taken
        current_max = 0  # Maximum index that can be reached with current jumps
        next_max = 0  # Maximum index that can be reached with jumps + 1

        # Iterate through the array (except last element)
        for i in range(len(nums) - 1):
            # Update the farthest position we can reach
            next_max = max(next_max, i + nums[i])

            # If we've reached the current maximum position
            # we need to take another jump
            if i == current_max:
                jumps += 1
                current_max = next_max

                # If we can already reach the end, break
                if current_max >= len(nums) - 1:
                    break

        return jumps


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.jump([1, 2, 3])
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.jump([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.jump([1])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 045. Jump Game Ii")
