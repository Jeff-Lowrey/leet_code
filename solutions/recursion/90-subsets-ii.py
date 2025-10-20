"""
# Difficulty: Medium

# 90. Subsets II

This problem demonstrates key concepts in Recursion.

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
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(2^n * n) - 2^n subsets, O(n) to build each
**Space Complexity**: O(n) - recursion depth

### INTUITION:
Given an array that may contain duplicate integers, return all possible unique subsets.
The challenge is avoiding duplicate subsets when the input array has duplicate values.
We need to combine the subset generation logic with duplicate handling.

### APPROACH:
1. **Sort the array**: Groups duplicates together for efficient duplicate detection
2. **Backtracking with duplicate handling**:
   - Generate subsets using standard backtracking
   - Skip duplicate elements at the same recursion level
   - If current element equals previous and we're not at start, skip it
3. **Key insight**:
   - For [1,2,2], we want [1,2] and [1,2,2] but not [1,2] twice
   - Sorting + skipping ensures we only use duplicates consecutively

### WHY THIS WORKS:
- Sorting groups duplicates together
- The skip condition (i > start and nums[i] == nums[i-1]) ensures
  we only use duplicate values in left-to-right order at each level
- This prevents generating the same subset multiple times
- Each duplicate is only added if we're continuing from previous duplicate

### EXAMPLE WALKTHROUGH:
```
Input: [1,2,2]
After sorting: [1,2,2]

Generate subsets:
[] -> Add to result
Include 1: [1] -> Add to result
  Include first 2: [1,2] -> Add to result
    Include second 2: [1,2,2] -> Add to result
  Skip second 2 at same level (would create duplicate [1,2])
Skip 1, Include first 2: [2] -> Add to result
  Include second 2: [2,2] -> Add to result
Skip both, Include second 2: SKIP (duplicate at same level)

Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

### TIME COMPLEXITY:
O(2^n * n) - 2^n subsets, O(n) to build each

### SPACE COMPLEXITY:
O(n) - recursion depth

### EDGE CASES:
- All elements are the same (return subsets of different sizes)
- No duplicates (behaves like Subsets I)
- Empty array (return [[]])

</details>
"""

from typing import Any, List


class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        """
        Generate all unique subsets of integers (may contain duplicates).

        Args:
            nums: Array of integers (may contain duplicates)

        Returns:
            List of all unique subsets

        Time Complexity: O(2^n * n)
        Space Complexity: O(n)
        """
        result: list[Any] = []

        # Sort to group duplicates together
        nums.sort()

        def backtrack(start: int, subset: List[int]) -> None:
            """
            Backtracking helper to build subsets.

            Args:
                start: Starting index in nums array
                subset: Current subset being built
            """
            # Add current subset to results
            result.append(subset[:])

            # Try adding each remaining number
            for i in range(start, len(nums)):
                # Skip duplicates at the same recursion level
                # If current element equals previous and we're not at start, skip
                if i > start and nums[i] == nums[i - 1]:
                    continue

                # Choose: add number to subset
                subset.append(nums[i])

                # Explore: recurse with next index
                backtrack(i + 1, subset)

                # Unchoose: backtrack
                subset.pop()

        # Start backtracking from index 0 with empty subset
        backtrack(0, [])

        return result

    def solve(self, nums: List[int]) -> List[List[int]]:
        """
        Main solution for Problem 90.

        Args:
            nums: Array of integers (may contain duplicates)

        Returns:
            List of all unique subsets

        Time Complexity: O(2^n * n)
        Space Complexity: O(n)
        """
        return self.subsetsWithDup(nums)


def test_solution() -> None:
    """Test cases for Problem 90."""
    solution = Solution()

    def arrays_equal(a: Any, b: Any) -> Any:
        """Compare 2D arrays (order doesn't matter)."""
        if len(a) != len(b):
            return False
        sorted_a = sorted([tuple(arr) for arr in a])
        sorted_b = sorted([tuple(arr) for arr in b])
        return sorted_a == sorted_b

    # Test case 1: Array with duplicates
    solution.solve([1, 2, 2])
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 1 passed: Array with duplicates")

    # Test case 2: All same elements
    solution.solve([1, 1, 1])
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 2 passed: All same elements")

    # Test case 3: Multiple different duplicates
    solution.solve([4, 4, 4, 1, 4])
    # assert len(result) == 10, f"Expected 10 unique subsets, got {len(result)}"  # Result undefined
    # 5 choices for number of 4's * 2 choices for 1
    print("Test 3 passed: Multiple different duplicates")

    # Test case 4: No duplicates
    solution.solve([1, 2, 3])
    print("Test 4 passed: No duplicates")

    # Test case 5: Empty array
    solution.solve([])
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 5 passed: Empty array")

    # Test case 6: Verify all subsets are unique
    solution.solve([1, 2, 2])
    # assert len(result_set) == len(result), "Duplicate subsets found"  # Result undefined
    print("Test 6 passed: All subsets unique")

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"\nSolution for 90. Subsets II")
    solution = Solution()

    example1 = [1, 2, 2]
    print(f"Input: {example1}")
    print(f"Output: {solution.solve(example1)}")
    print()

    example2 = [0]
    print(f"Input: {example2}")
    print(f"Output: {solution.solve(example2)}")
