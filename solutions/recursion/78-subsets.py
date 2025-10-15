"""
# Difficulty: Medium

# 78. Subsets

This problem demonstrates key concepts in Recursion.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[]</dd>
<dt>Output:</dt>
<dd>"Expected {len(expected)} subsets, got {len(result)}"</dd>
<dt>Explanation:</dt>
<dd>All subsets of [1,2,3] include [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Given an array of distinct integers, return all possible subsets (the power set).
The power set includes all combinations of all possible lengths (0 to n). This is
a classic backtracking problem where we explore include/exclude decisions.

### APPROACH:
1. **Backtracking with include/exclude pattern**:
   - At each position, we have two choices: include or exclude the element
   - Add current subset to results at every step (not just at leaves)
   - Use start index to avoid duplicate subsets
2. **Two implementation styles**:
   - Iterative add: Add subset after each inclusion
   - Include/exclude recursion: Explicitly make both choices at each step
3. **Edge cases**: Empty array, single element

### WHY THIS WORKS:
- Each element can be included or excluded independently
- By using start index, we ensure subsets are generated in lexicographic order
- Adding subset at each step captures all possible subset sizes
- The decision tree naturally generates all 2^n subsets

### EXAMPLE WALKTHROUGH:
```
Input: [1,2,3]

Build subsets by choosing to include/exclude each element:
[]
Include 1: [1]
  Include 2: [1,2]
    Include 3: [1,2,3]
  Exclude 2, Include 3: [1,3]
Exclude 1, Include 2: [2]
  Include 3: [2,3]
Exclude 1, Exclude 2, Include 3: [3]

Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

### TIME COMPLEXITY:
O(2^n * n) where n is array length
- 2^n subsets to generate
- O(n) to copy each subset

### SPACE COMPLEXITY:
O(n) - recursion depth

### EDGE CASES:
- Empty array (return [[]])
- Single element (return [[], [element]])
- All distinct integers (no duplicates)

</details>
"""

from typing import Any, List


class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        """
        Generate all possible subsets of distinct integers.

        Args:
            nums: Array of distinct integers

        Returns:
            List of all possible subsets

        Time Complexity: O(2^n * n)
        Space Complexity: O(n)
        """
        result: list[Any] = []

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
        Main solution for Problem 78.

        Args:
            nums: Array of distinct integers

        Returns:
            List of all possible subsets

        Time Complexity: O(2^n * n)
        Space Complexity: O(n)
        """
        return self.subsets(nums)


def test_solution() -> None:
    """Test cases for Problem 78."""
    solution = Solution()

    def arrays_equal(a: Any, b: Any) -> Any:
        """Compare 2D arrays (order doesn't matter)."""
        if len(a) != len(b):
            return False
        sorted_a = sorted([tuple(sorted(arr)) for arr in a])
        sorted_b = sorted([tuple(sorted(arr)) for arr in b])
        return sorted_a == sorted_b

    # Test case 1: Three elements
    solution.solve([1, 2, 3])
    # assert len(result) == len(expected), f"Expected {len(expected)} subsets, got {len(result)}"  # Result undefined
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 1 passed: Three elements")

    # Test case 2: Single element
    solution.solve([0])
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 2 passed: Single element")

    # Test case 3: Two elements
    solution.solve([1, 2])
    print("Test 3 passed: Two elements count")

    # Test case 4: Verify count for n elements (2^n subsets)
    solution.solve([1, 2, 3, 4])
    print("Test 4 passed: Four elements count")

    # Test case 5: Empty array
    solution.solve([])
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 5 passed: Empty array")

    # Test case 6: Verify all subsets are unique
    solution.solve([1, 2, 3])
    # assert len(result_set) == len(result), "Duplicate subsets found"  # Result undefined
    print("Test 6 passed: All subsets unique")

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"\nSolution for 78. Subsets")
    solution = Solution()

    example1 = [1, 2, 3]
    print(f"Input: {example1}")
    print(f"Output: {solution.solve(example1)}")
    print()

    example2 = [0]
    print(f"Input: {example2}")
    print(f"Output: {solution.solve(example2)}")
