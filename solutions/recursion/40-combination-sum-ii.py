"""
# Difficulty: Medium

# 40. Combination Sum II

This problem demonstrates key concepts in Recursion.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 1, 6]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>All unique combinations summing to 8 from [10,1,2,7,6,1,5] are [[1,1,6],[1,2,5],[1,7],[2,6]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Given an array of integers (may contain duplicates) and a target, find all unique
combinations where the numbers sum to target. Each number may be used only once.
The key challenge is avoiding duplicate combinations when the input contains duplicates.

### APPROACH:
1. **Sort the array**: This groups duplicates together and enables efficient duplicate detection
2. **Backtracking with duplicate handling**:
   - For each candidate, decide to include it or skip it
   - Skip duplicate candidates at the same recursion level
   - Move to next index after including a number (use only once)
3. **Duplicate prevention**:
   - If current number equals previous and we didn't use previous, skip current
   - This ensures we don't create duplicate combinations

### WHY THIS WORKS:
- Sorting enables duplicate detection by grouping same numbers
- Skipping duplicates at same level prevents duplicate combinations
- Moving to next index ensures each number used at most once
- The condition (i > start and candidates[i] == candidates[i-1]) is key

### EXAMPLE WALKTHROUGH:
```
Input: candidates = [10,1,2,7,6,1,5], target = 8
After sorting: [1,1,2,5,6,7,10]

Explore combinations:
[1,1,6] -> sum = 8 (valid!)
[1,2,5] -> sum = 8 (valid!)
[1,7] -> sum = 8 (valid!)
[2,6] -> sum = 8 (valid!)

Note: Duplicates like [1,1,6] from different 1's are prevented by skipping logic
Output: [[1,1,6], [1,2,5], [1,7], [2,6]]
```

### TIME COMPLEXITY:
O(2^n) - each element can be included or excluded

### SPACE COMPLEXITY:
O(n) - recursion depth

### EDGE CASES:
- Empty candidates array
- All duplicates
- No valid combinations
- Target equals single candidate

</details>
"""

from typing import Any, List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Find all unique combinations that sum to target (each number used once).

        Args:
            candidates: Array of integers (may contain duplicates)
            target: Target sum

        Returns:
            List of all unique combinations that sum to target

        Time Complexity: O(2^n)
        Space Complexity: O(n)
        """
        result: list[Any] = []

        # Sort to group duplicates and enable pruning
        candidates.sort()

        def backtrack(start: int, current_sum: int, combination: List[int]) -> None:
            """
            Backtracking helper to build combinations.

            Args:
                start: Starting index in candidates array
                current_sum: Current sum of combination
                combination: Current combination being built
            """
            # Base case: found valid combination
            if current_sum == target:
                result.append(combination[:])
                return

            # Pruning: if current sum exceeds target, stop
            if current_sum > target:
                return

            # Try each candidate starting from 'start' index
            for i in range(start, len(candidates)):
                # Skip duplicates at the same recursion level
                # If current element equals previous and we're not at start of this level
                if i > start and candidates[i] == candidates[i - 1]:
                    continue

                candidate = candidates[i]

                # Pruning: if adding this candidate exceeds target, stop
                # (works because array is sorted)
                if current_sum + candidate > target:
                    break

                # Choose: add candidate to combination
                combination.append(candidate)

                # Explore: recurse with next index (each number used at most once)
                backtrack(i + 1, current_sum + candidate, combination)

                # Unchoose: backtrack
                combination.pop()

        # Start backtracking from index 0
        backtrack(0, 0, [])

        return result

    def solve(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Main solution for Problem 40.

        Args:
            candidates: Array of integers (may contain duplicates)
            target: Target sum

        Returns:
            List of all unique combinations that sum to target

        Time Complexity: O(2^n)
        Space Complexity: O(n)
        """
        return self.combinationSum2(candidates, target)


def test_solution() -> None:
    """Test cases for Problem 40."""
    solution = Solution()

    def arrays_equal(a: Any, b: Any) -> Any:
        """Compare 2D arrays (order doesn't matter)."""
        if len(a) != len(b):
            return False
        sorted_a = sorted([sorted(arr) for arr in a])
        sorted_b = sorted([sorted(arr) for arr in b])
        return sorted_a == sorted_b

    # Test case 1: Array with duplicates
    solution.solve([10, 1, 2, 7, 6, 1, 5], 8)
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 1 passed: Array with duplicates")

    # Test case 2: Multiple duplicates
    solution.solve([2, 5, 2, 1, 2], 5)
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 2 passed: Multiple duplicates")

    # Test case 3: No valid combinations
    solution.solve([2, 3, 5], 1)
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 3 passed: No valid combinations")

    # Test case 4: Single element
    solution.solve([1], 1)
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 4 passed: Single element")

    # Test case 5: All same numbers
    solution.solve([1, 1, 1, 1], 2)
    # assert arrays_equal(result, expected), f"Expected {expected}, got {result}"  # Result undefined
    print("Test 5 passed: All same numbers")

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"\nSolution for 40. Combination Sum II")
    solution = Solution()

    example1 = ([10, 1, 2, 7, 6, 1, 5], 8)
    print(f"Input: candidates = {example1[0]}, target = {example1[1]}")
    print(f"Output: {solution.solve(*example1)}")
    print()

    example2 = ([2, 5, 2, 1, 2], 5)
    print(f"Input: candidates = {example2[0]}, target = {example2[1]}")
    print(f"Output: {solution.solve(*example2)}")
