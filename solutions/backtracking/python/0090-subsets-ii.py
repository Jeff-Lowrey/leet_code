"""
# Difficulty: Medium

# 090. Subsets Ii

Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>All unique subsets of [1,2,2] are [[],[1],[1,2],[1,2,2],[2],[2,2]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern, Backtracking
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Sort the array to group duplicates together. During backtracking, add the current subset at each step (not just at leaves). Skip duplicate elements at the same recursion level using the condition i > start and nums[i] == nums[i-1] to avoid duplicate subsets.

### APPROACH:
1. **Sort array**: Sort nums to group duplicate elements together
2. **Initialize result**: Create result list starting with empty subset [[]]
3. **Define backtrack function**: Create recursive function with parameters (start, current)
4. **Add current subset**: Append copy of current to result at each recursive call
5. **Iterate from start**: Loop from start index to end of array
6. **Skip duplicates**: If i > start and nums[i] == nums[i-1], continue to avoid duplicate subsets
7. **Include element**: Add nums[i] to current, call backtrack(i+1, current)
8. **Backtrack**: Remove last element from current to explore other possibilities

### WHY THIS WORKS:
- Sort array to group duplicates, enables skipping in backtracking
- At each level, if nums[i] == nums[i-1] and i > start, skip (avoid duplicate subsets)
- Backtracking tries including/excluding each element
- Every path is valid subset, even partial paths
- O(2^n * n) time: 2^n subsets, O(n) to copy each

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,2,2]
Step 1: Sort array → [1,2,2]

Step 2: Build subsets with backtracking
  Start with [] → add to result
    Try 1: [1] → add to result
      Try 2: [1,2] → add to result
        Try 2: [1,2,2] → add to result
      Skip duplicate 2
    Try first 2: [2] → add to result
      Try second 2: [2,2] → add to result
    Skip duplicate 2 (i=2, start=0, nums[2]==nums[1])

Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
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
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        """
        Generate all possible unique subsets of the input array.

        Args:
            nums: List of integers that may contain duplicates

        Returns:
            List of lists containing all unique subsets

        Example:
            Input: nums = [1,2,2]
            Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
        """
        # Sort the array to handle duplicates properly
        nums.sort()
        result: list[Any] = []

        def backtrack(start: int, current_subset: List[int]) -> None:
            """
            Helper function to generate subsets using backtracking.

            Args:
                start: Starting index for considering elements
                current_subset: Current subset being built
            """
            # Add the current subset to result
            result.append(current_subset[:])

            # Try adding each remaining number to current subset
            for i in range(start, len(nums)):
                # Skip duplicates to avoid duplicate subsets
                if i > start and nums[i] == nums[i - 1]:
                    continue

                # Include current number in subset
                current_subset.append(nums[i])
                # Recursively generate subsets with remaining elements
                backtrack(i + 1, current_subset)
                # Backtrack by removing the last added element
                current_subset.pop()

        # Start backtracking with empty subset
        backtrack(0, [])
        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.subsetsWithDup([1, 2, 2])
    expected = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.subsetsWithDup([])
    expected: list[list[int]] = [[]]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single element
    result = solution.subsetsWithDup([1])
    expected = [[], [1]]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 090. Subsets Ii")
