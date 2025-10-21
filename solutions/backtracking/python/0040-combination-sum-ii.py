"""
# Difficulty: Medium

# 040. Combination Sum Ii

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1,1,6]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>All unique combinations summing to 8 from [10,1,2,7,6,1,5] are [[1,1,6],[1,2,5],[1,7],[2,6]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Complement Search, Two Pointers Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Sort the candidates first to handle duplicates. During backtracking, skip duplicate elements at the same recursion level by checking if nums[i] == nums[i-1] and i > start. Each number can only be used once, so advance the index by 1 after including a number.

### APPROACH:
1. **Sort candidates**: Sort candidates array to group duplicates together for easy skipping
2. **Initialize result**: Create empty result list and current combination list
3. **Define backtrack function**: Create recursive function with parameters (start, current, remaining_target)
# 4. **Base case**: If remaining_target == 0, add copy of current to result and return  # Result undefined
5. **Iterate from start**: Loop from start index to end of candidates array
6. **Skip duplicates**: If i > start and candidates[i] == candidates[i-1], continue to avoid duplicate combinations
7. **Prune search**: If candidates[i] > remaining_target, break early since array is sorted
8. **Recursive call**: Add candidates[i] to current, call backtrack(i+1, current, remaining_target - candidates[i]), then remove last element

### WHY THIS WORKS:
- Sort array to enable duplicate skipping
- Skip duplicates: if i > start and candidates[i] == candidates[i-1], skip
- Backtracking tries including/excluding each candidate
- Pass start index to avoid reusing earlier elements
- O(2^n) time: each element in/out, sorting adds O(n log n)

### EXAMPLE WALKTHROUGH:
```
Input: candidates = [10,1,2,7,6,1,5], target = 8
Step 1: Sort candidates → [1,1,2,5,6,7,10]

Step 2: Backtrack to find combinations
  Try 1: curr = [1], remain = 7
    Try 1: curr = [1,1], remain = 6
      Try 2: curr = [1,1,2], remain = 4 → continue
      Try 5: curr = [1,1,5], remain = 1 → continue
      Try 6: curr = [1,1,6], remain = 0 → add [1,1,6]
    Skip duplicate 1 at position 2
    Try 2: curr = [1,2], remain = 5
      Try 5: curr = [1,2,5], remain = 0 → add [1,2,5]
    Try 7: curr = [1,7], remain = 0 → add [1,7]
  Skip duplicate 1 at position 1
  Try 2: curr = [2], remain = 6
    Try 6: curr = [2,6], remain = 0 → add [2,6]

Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
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
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Find all unique combinations of numbers that sum to target.

        Args:
            candidates: List of candidate numbers
            target: Target sum to achieve

        Returns:
            List of all unique combinations that sum to target
        """
        # Sort candidates to handle duplicates and enable early termination
        candidates.sort()
        result: list[Any] = []

        def backtrack(curr: List[int], pos: int, remain: int) -> None:
            """
            Recursive backtracking helper function.

            Args:
                curr: Current combination being built
                pos: Current position in candidates array
                remain: Remaining sum to achieve
            """
            if remain == 0:
                # Found a valid combination
                result.append(curr[:])
                return

            for i in range(pos, len(candidates)):
                # Skip duplicates to avoid duplicate combinations
                if i > pos and candidates[i] == candidates[i - 1]:
                    continue

                # Early termination if current number is too large
                if candidates[i] > remain:
                    break

                # Include current number and recurse
                curr.append(candidates[i])
                backtrack(curr, i + 1, remain - candidates[i])
                curr.pop()  # Backtrack by removing the last number

        backtrack([], 0, target)
        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.combinationSum2([10, 1, 2, 7, 6, 1, 5], target=8)
    expected = [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.combinationSum2([], 0)
    expected: list[list[int]] = [[]]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 040. Combination Sum Ii")
