"""### METADATA:
**Techniques**: Backtracking, Sorting
**Data Structures**: Array, List
**Time Complexity**: O(2^n × n)
**Space Complexity**: O(n)

### INTUITION:
The key insight is that sort the candidates first to handle duplicates. During backtracking, skip duplicate elements at the same recursion level by checking if nums[i] == nums[i-1] and i > start. Each number can only be used once, so advance the index by 1 after including a number.

### APPROACH:
1. **Sort candidates**: Sort candidates array to group duplicates together for easy skipping
2. **Initialize result**: Create empty result list and current combination list
3. **Define backtrack function**: Create recursive function with parameters (start, current, remaining_target)
4. **Base case**: If remaining_target == 0, add copy of current to result and return
5. **Iterate from start**: Loop from start index to end of candidates array
6. **Skip duplicates**: If i > start and candidates[i] == candidates[i-1], continue to avoid duplicate combinations
7. **Prune search**: If candidates[i] > remaining_target, break early since array is sorted
8. **Recursive call**: Add candidates[i] to current, call backtrack(i+1, current, remaining_target - candidates[i]), then remove last element

### WHY THIS WORKS:
- This ensures that sort array to enable duplicate skipping
- This ensures that skip duplicates: if i > start and candidates[i] == candidates[i-1], skip
- This ensures that backtracking tries including/excluding each candidate
- This ensures that pass start index to avoid reusing earlier elements
- This ensures that o(2^n) time: each element in/out, sorting adds O(n log n)

### EXAMPLE WALKTHROUGH:
Input:
```
candidates = [10,1,2,7,6,1,5], target = 8
```

Steps:
Step 1: Sort candidates → [1,1,2,5,6,7,10]
Step 2: Backtrack to find combinations
Step 3: Try 1: curr = [1], remain = 7
Step 4: Try 1: curr = [1,1], remain = 6
Step 5: Try 2: curr = [1,1,2], remain = 4 → continue
Step 6: Try 5: curr = [1,1,5], remain = 1 → continue
Step 7: Try 6: curr = [1,1,6], remain = 0 → add [1,1,6]
Step 8: Skip duplicate 1 at position 2
Step 9: Try 2: curr = [1,2], remain = 5
Step 10: Try 5: curr = [1,2,5], remain = 0 → add [1,2,5]
Step 11: Try 7: curr = [1,7], remain = 0 → add [1,7]
Step 12: Skip duplicate 1 at position 1
Step 13: Try 2: curr = [2], remain = 6
Step 14: Try 6: curr = [2,6], remain = 0 → add [2,6]

Output:
```
[[1,1,6],[1,2,5],[1,7],[2,6]]
```

### TIME COMPLEXITY:
**O(2^n × n)** - where n is the number of candidates. In the worst case, we generate all possible subsets of the candidates array. There are 2^n possible subsets (each element can be included or excluded). For each valid subset that sums to the target, we need **O(n)** time to copy it to the result list. The sorting step takes **O(n log n)**, but this is dominated by the exponential subset generation. Early termination and duplicate skipping reduce the actual number of subsets generated, but the worst-case complexity remains **O(2^n × n)**.

### SPACE COMPLEXITY:
**O(n)** - where n is the number of candidates. The recursion call stack can go as deep as n levels (when we include all candidates in decreasing order). We also maintain a current combination list that can have at most n elements. The space for storing the result is not counted toward space complexity as it's required output. The sorting is done in-place, so it doesn't add to space complexity. Total auxiliary space: **O(n)** for recursion stack + **O(n)** for current combination = **O(n)**.

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values"""

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
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.combinationSum2([], 0)
    expected: list[list[int]] = [[]]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 040. Combination Sum Ii")
