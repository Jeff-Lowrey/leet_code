"""
# Difficulty: Medium

# 0090. Subsets Ii

Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [1,2,2]</dd>
<dt>Output:</dt>
<dd>[[],[1],[1,2],[1,2,2],[2],[2,2]]</dd>
<dt>Explanation:</dt>
<dd>All unique subsets of [1,2,2] are [[],[1],[1,2],[1,2,2],[2],[2,2]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Backtracking, Duplicate Skipping, Subset Generation
**Data Structures**: Array, List, Recursion Stack
**Patterns**: Backtracking Pattern, Power Set Generation with Duplicates
**Time Complexity**: **O(2^n × n)** - Generate all 2^n subsets, each takes O(n) to copy
**Space Complexity**: **O(n)** - Recursion stack depth and current subset size

### INTUITION:
The key insight is that sort the array to group duplicates together. During backtracking, add the current subset at each step (not just at leaves). Skip duplicate elements at the same recursion level using the condition i > start and nums[i] == nums[i-1] to avoid duplicate subsets.

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
Input:
```
nums = [1,2,2]
```

Steps:
Step 1: Sort array → [1,2,2]
Step 2: Build subsets with backtracking
Step 3: Start with [] → add to result
Step 4: Try 1: [1] → add to result
Step 5: Try 2: [1,2] → add to result
Step 6: Try 2: [1,2,2] → add to result
Step 7: Skip duplicate 2
Step 8: Try first 2: [2] → add to result
Step 9: Try second 2: [2,2] → add to result
Step 10: Skip duplicate 2 (i=2, start=0, nums[2]==nums[1])

Output:
```
[[],[1],[1,2],[1,2,2],[2],[2,2]]
```

### TIME COMPLEXITY:
**O(2^n × n)** - where n is the number of elements in the input array. We generate all possible subsets (the power set), which contains 2^n subsets (each element can be included or excluded). For each subset, we perform O(n) work to copy it to the result list. The sorting step takes O(n log n), but this is dominated by the exponential subset generation. Duplicate skipping reduces the actual number of subsets when duplicates exist, but worst-case complexity remains O(2^n × n) when all elements are distinct. Total: O(n log n) + O(2^n × n) = O(2^n × n).

### SPACE COMPLEXITY:
**O(n)** - where n is the number of elements in the input array. The recursion call stack can go as deep as n levels (we can include up to n elements in a subset). The current subset list grows from size 0 to size n in the worst case. The result list storing all subsets is not counted toward space complexity as it's required output. Sorting is done in-place. Total auxiliary space: O(n) for recursion stack + O(n) for current subset = O(n).


### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

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
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.subsetsWithDup([])
    expected: list[list[int]] = [[]]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.subsetsWithDup([1])
    expected = [[], [1]]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 090. Subsets Ii")
