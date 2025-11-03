"""### METADATA:

### INTUITION:
The key insight is that generate all possible subsets (power set) by making binary choices for each element: include it or don't include it in the current subset. Use backtracking to explore all combinations.

### APPROACH:
1. **Initialize result list**: Create an empty list to store all subsets (will include empty set)
2. **Define recursive backtracking function**: Create a helper function with start index and current subset parameters
3. **Add current subset**: At each recursive call, add a copy of the current subset to results (captures all intermediate states)
4. **Iterate from start index**: Loop through remaining elements starting from the start index to avoid duplicates
5. **Include element and recurse**: Add current element to subset, then recursively explore with next start index (i+1)
6. **Backtrack**: Remove the last added element to try the next element at the current level
7. **Return power set**: After all recursive exploration completes, return the complete collection of 2^n subsets

### WHY THIS WORKS:
- This ensures that each element has 2 choices: include or exclude
- This ensures that total subsets = 2^n (binary choices for n elements)
- This ensures that backtracking systematically explores all combinations
- This ensures that adding current subset at each step captures all intermediate states

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,2,3]
```

**Step 1:** Backtracking approach
- Start with [] → add to result
  - Add 1: [1] → add to result
    - Add 2: [1,2] → add to result
      - Add 3: [1,2,3] → add to result
    - Add 3: [1,3] → add to result
  - Add 2: [2] → add to result
    - Add 3: [2,3] → add to result
  - Add 3: [3] → add to result

**Step 2:** Iterative approach
- Start: result = [[]]
- Add 1: result = [[], [1]]
- Add 2: result = [[], [1], [2], [1,2]]
- Add 3: result = [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

### TIME COMPLEXITY:
**O(n × 2^n)** - 2^n subsets, each takes **O(n)** to copy

### SPACE COMPLEXITY:
**O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.

### EDGE CASES:
- **Empty array**: Return [[]] (power set contains only empty set)
- **Single element**: Return [[], [element]]
- **All elements identical (in variant)**: Handle duplicates with sorting
- **Large n values**: 2^n subsets, exponential but unavoidable
- **Negative numbers**: No special handling needed, works same as positive

"""

from typing import Any


class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Backtracking
        Time Complexity: O(n * 2^n)
        Space Complexity: O(n) for recursion
        """
        result: list[Any] = []

        def backtrack(start: Any, current: Any) -> Any:
            result.append(current[:])

            for i in range(start, len(nums)):
                current.append(nums[i])
                backtrack(i + 1, current)
                current.pop()

        backtrack(0, [])
        return result

    def subsetsBitMask(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Bit manipulation
        Time Complexity: O(n * 2^n)
        Space Complexity: O(1) excluding output
        """
        n = len(nums)
        result: list[list[int]] = []

        for mask in range(1 << n):  # 2^n possibilities
            subset: list[Any] = []
            for i in range(n):
                if mask & (1 << i):
                    subset.append(nums[i])
            result.append(subset)

        return result

    def subsetsIterative(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Iterative building
        Time Complexity: O(n * 2^n)
        Space Complexity: O(1) excluding output
        """
        result: list[list[int]] = [[]]

        for num in nums:
            result += [subset + [num] for subset in result]

        return result


"""
90. Subsets II
Given an integer array nums that may contain duplicates, return all possible
subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example:
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
"""


class SolutionUnique:
    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Backtracking with duplicate handling
        Time Complexity: O(n * 2^n)
        Space Complexity: O(n)
        """
        nums.sort()  # Sort to handle duplicates
        result: list[Any] = []

        def backtrack(start: Any, current: Any) -> Any:
            result.append(current[:])

            for i in range(start, len(nums)):
                # Skip duplicates
                if i > start and nums[i] == nums[i - 1]:
                    continue

                current.append(nums[i])
                backtrack(i + 1, current)
                current.pop()

        backtrack(0, [])
        return result


"""
39. Combination Sum
Given an array of distinct integers candidates and a target integer target,
return a list of all unique combinations of candidates where the chosen numbers
sum to target.

The same number may be chosen from candidates an unlimited number of times.

Example:
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
"""


class SolutionCombSum:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        """
        Approach: Backtracking
        Time Complexity: O(n^(target/min))
        Space Complexity: O(target/min)
        """
        result: list[Any] = []

        def backtrack(remain: Any, current: Any, start: Any) -> Any:
            if remain == 0:
                result.append(current[:])
                return
            if remain < 0:
                return

            for i in range(start, len(candidates)):
                current.append(candidates[i])
                # Can reuse same element
                backtrack(remain - candidates[i], current, i)
                current.pop()

        backtrack(target, [], 0)
        return result


"""
40. Combination Sum II
Given a collection of candidate numbers (candidates) and a target number (target),
find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Example:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
"""


class SolutionCombSum2:
    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:
        """
        Approach: Backtracking with duplicate handling
        Time Complexity: O(2^n)
        Space Complexity: O(n)
        """
        candidates.sort()
        result: list[Any] = []

        def backtrack(remain: Any, current: Any, start: Any) -> Any:
            if remain == 0:
                result.append(current[:])
                return
            if remain < 0:
                return

            for i in range(start, len(candidates)):
                # Skip duplicates
                if i > start and candidates[i] == candidates[i - 1]:
                    continue

                if candidates[i] > remain:
                    break

                current.append(candidates[i])
                backtrack(remain - candidates[i], current, i + 1)
                current.pop()

        backtrack(target, [], 0)
        return result


# Test cases
if __name__ == "__main__":
    # Test Subsets
    solution = Solution()

    print("Subsets:")
    test_cases = [[1, 2, 3], [0], [1, 2, 3, 4]]
    for nums in test_cases:
        result = solution.subsets(nums)
        print(f"Input: nums")
        print(f"Subsets ({len(result)}): result\n")

    # Test Subsets with Duplicates
    solution_dup = SolutionUnique()

    print("Subsets with Duplicates:")
    test_cases_dup = [[1, 2, 2], [4, 4, 4, 1, 4]]
    for nums in test_cases_dup:
        result = solution_dup.subsetsWithDup(nums)
        print(f"Input: nums")
        print(f"Unique Subsets: result\n")

    # Test Combination Sum
    solution_comb = SolutionCombSum()

    print("Combination Sum:")
    test_comb = [([2, 3, 6, 7], 7), ([2, 3, 5], 8)]
    for candidates, target in test_comb:
        result = solution_comb.combinationSum(candidates, target)
        print(f"Candidates: {candidates}, Target: {target}")
        print(f"Combinations: result\n")
