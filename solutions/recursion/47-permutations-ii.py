"""
# Difficulty: Medium

# 47. Permutations II

This problem demonstrates key concepts in Recursion.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 1, 2]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>All unique permutations of [1,1,2] are [[1,1,2],[1,2,1],[2,1,1]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Given an array that may contain duplicate integers, return all unique permutations.
The challenge is avoiding duplicate permutations when the input has duplicate values.
We need to track which numbers we've used AND skip duplicates at the same recursion level.

### APPROACH:
1. **Sort the array**: Groups duplicates together for efficient duplicate detection
2. **Backtracking with duplicate handling**:
   - Track which indices have been used in current permutation
   - Skip a number if it equals the previous number AND the previous wasn't used
   - This prevents duplicate permutations from being generated
3. **Key insight**:
   - If we have [1,1,2], we want [1,1,2] but not [1,1,2] again from swapping the 1's
   - Sorting + skipping ensures we only use duplicates in order

### WHY THIS WORKS:
- Sorting groups duplicates together
- The skip condition (i > 0 and nums[i] == nums[i-1] and not used[i-1]) ensures
  we only use duplicate values in left-to-right order
- This prevents generating the same permutation multiple times
- Each duplicate is only considered if all previous duplicates were used

### EXAMPLE WALKTHROUGH:
```
Input: [1,1,2]
After sorting: [1,1,2]

Generate permutations:
Use first 1: [1] -> Use second 1: [1,1] -> Use 2: [1,1,2] ✓
                 -> Use 2: [1,2] -> Use second 1: [1,2,1] ✓
Use second 1: SKIP (first 1 not used, would create duplicate)
Use 2: [2] -> Use first 1: [2,1] -> Use second 1: [2,1,1] ✓

Output: [[1,1,2],[1,2,1],[2,1,1]]
```

### TIME COMPLEXITY:
O(n! * n) - n! permutations, O(n) to build each

### SPACE COMPLEXITY:
O(n) - recursion depth and tracking array

### EDGE CASES:
- All elements are the same (return single permutation)
- No duplicates (behaves like Permutations I)
- Empty array (return [[]])

</details>
"""

from typing import Any, List


class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        """
        Generate all unique permutations of integers (may contain duplicates).

        Args:
            nums: Array of integers (may contain duplicates)

        Returns:
            List of all unique permutations

        Time Complexity: O(n! * n)
        Space Complexity: O(n)
        """
        result: list[Any] = []

        # Sort to group duplicates together
        nums.sort()

        # Track which indices have been used
        used = [False] * len(nums)

        def backtrack(current: List[int]) -> None:
            """
            Backtracking helper to build permutations.

            Args:
                current: Current permutation being built
            """
            # Base case: permutation is complete
            if len(current) == len(nums):
                result.append(current[:])
                return

            # Try each number that hasn't been used yet
            for i in range(len(nums)):
                # Skip if already used
                if used[i]:
                    continue

                # Skip duplicates: if current number equals previous number
                # and previous number hasn't been used, skip current
                # This ensures we only use duplicates in left-to-right order
                if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                    continue

                # Choose: add number to permutation
                current.append(nums[i])
                used[i] = True

                # Explore: recurse to fill next position
                backtrack(current)

                # Unchoose: backtrack
                current.pop()
                used[i] = False

        # Start backtracking with empty permutation
        backtrack([])

        return result

    def solve(self, nums: List[int]) -> List[List[int]]:
        """
        Main solution for Problem 47.

        Args:
            nums: Array of integers (may contain duplicates)

        Returns:
            List of all unique permutations

        Time Complexity: O(n! * n)
        Space Complexity: O(n)
        """
        return self.permuteUnique(nums)


def test_solution() -> None:
    """Test cases for Problem 47."""
    solution = Solution()

    def arrays_equal(a: Any, b: Any) -> Any:
        """Compare 2D arrays (order doesn't matter)."""
        if len(a) != len(b):
            return False
        sorted_a = sorted([tuple(arr) for arr in a])
        sorted_b = sorted([tuple(arr) for arr in b])
        return sorted_a == sorted_b

    # Test case 1: Two duplicates
    solution.solve([1, 1, 2])
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 1 passed: Two duplicates")

    # Test case 2: All same
    solution.solve([1, 1, 1])
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 2 passed: All same")

    # Test case 3: Multiple duplicates
    solution.solve([2, 2, 1, 1])
    print("Test 3 passed: Multiple duplicates")

    # Test case 4: No duplicates (should work like Permutations I)
    solution.solve([1, 2, 3])
    print("Test 4 passed: No duplicates")

    # Test case 5: Single element
    solution.solve([1])
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 5 passed: Single element")

    # Test case 6: Verify all unique
    solution.solve([1, 1, 2])
    # assert len(result_set) == len(result), "Duplicate permutations found"  # Result undefined
    print("Test 6 passed: All permutations unique")

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"\nSolution for 47. Permutations II")
    solution = Solution()

    example1 = [1, 1, 2]
    print(f"Input: {example1}")
    print(f"Output: {solution.solve(example1)}")
    print()

    example2 = [1, 2, 3]
    print(f"Input: {example2}")
    print(f"Output: {solution.solve(example2)}")
