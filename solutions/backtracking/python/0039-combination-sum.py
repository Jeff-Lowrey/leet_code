"""
# Difficulty: Medium

# 0039. Combination Sum

Given an array of distinct integers candidates and a target integer target,
return a list of all unique combinations of candidates where the chosen numbers sum to target.
You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times.
Two combinations are unique if the frequency of at least one of the chosen numbers is different.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>candidates = [2,3,6,7], target = 7</dd>
<dt>Output:</dt>
<dd>[[2,2,3], [7]]</dd>
<dt>Explanation:</dt>
<dd>All combinations summing to 7 using [2,3,6,7] are [[2,2,3], [7]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Backtracking, Recursive Combination Building, Reuse with Index
**Data Structures**: Array, List, Recursion Stack
**Patterns**: Backtracking Pattern, Combination Sum with Repetition
**Time Complexity**: **O(N^(T/M))** - Explore all combinations with repetition allowed
**Space Complexity**: **O(T/M)** - Recursion depth proportional to target/min_candidate

### INTUITION:
This is a classic backtracking problem where we need to find all combinations that sum to target.
Since numbers can be reused unlimited times, we explore each candidate multiple times.

### APPROACH:
1. **Sort candidates**: For optimization and early termination
2. **Use backtracking**: Build combinations incrementally
3. **Two choices per element**: Include it (allowing reuse) or skip it
4. **Base cases**: Sum equals target (valid) or exceeds target (invalid)

### WHY THIS WORKS:
- This ensures that backtracking explores all possible combinations systematically
- This ensures that sorting allows early termination when candidate > remaining sum
- This ensures that using start index prevents duplicate combinations

### EXAMPLE WALKTHROUGH:
Input:
```
candidates = [2,3,6,7], target = 7
```

Combinations found: [[2,2,3], [7]]

Steps:
Step 1: - Try 2: [2] -> remaining=5, try 2 again: [2,2] -> remaining=3, try 3: [2,2,3] ✓
Step 2: - Try 7: [7] -> remaining=0 ✓

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
**O(N^(T/M))** - where N is the number of candidates, T is the target value, and M is the minimal candidate value. In the worst case, we explore a tree where each node has N choices (all candidates), and the maximum depth is T/M (when we repeatedly pick the smallest candidate). The number of nodes in this tree is bounded by N^(T/M). For each complete combination, we perform O(T/M) work to copy it. This gives us O(N^(T/M) × (T/M)) total time, but the N^(T/M) term dominates.

### SPACE COMPLEXITY:
**O(T/M)** - where T is the target and M is the minimal candidate value. The recursion call stack depth is at most T/M levels (when we repeatedly use the smallest candidate to reach the target). The current combination list can grow to size at most T/M. The result list is not counted as it's required output. Total auxiliary space: O(T/M) for recursion stack + O(T/M) for current combination = O(T/M).

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

from typing import Any


class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        """
        Find all unique combinations of numbers that sum up to the target.

        Args:
            candidates (list[int]): List of distinct positive integers
            target (int): Target sum to achieve

        Returns:
            list[list[int]]: List of all unique combinations that sum to target

        Time Complexity: O(N^(T/M)), where N is length of candidates,
                        T is target, M is minimal value in candidates
        Space Complexity: O(T/M) for recursion depth
        """

        def backtrack(remain: int, combo: list[int], start: int) -> None:
            """
            Helper function to perform backtracking and find combinations.

            Args:
                remain (int): Remaining sum to achieve
                combo (list[int]): Current combination being built
                start (int): Starting index in candidates to consider
            """
            if remain == 0:
                # Found a valid combination
                result.append(combo[:])
                return

            for i in range(start, len(candidates)):
                # Skip if the current number is too large
                if candidates[i] > remain:
                    continue

                # Include the current number in combination
                combo.append(candidates[i])
                # Recursively find combinations with the remaining sum
                backtrack(remain - candidates[i], combo, i)
                # Remove the number to try other combinations
                combo.pop()

        # Sort candidates to optimize and handle cases more efficiently
        candidates.sort()
        result: list[Any] = []
        backtrack(target, [], 0)
        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.combinationSum([1, 2, 3], 2)
    expected = [[1, 1], [2]]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.combinationSum([], 0)
    expected: list[list[int]] = [[]]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 039. Combination Sum ===")
    print(f"Input: [2,3,6,7], target=7 -> {solution.combinationSum([2, 3, 6, 7], 7)}")
    print(f"Input: [2,3,5], target=8 -> {solution.combinationSum([2, 3, 5], 8)}")
    print(f"Input: [2], target=3 -> {solution.combinationSum([2], 3)}")
