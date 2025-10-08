"""
78. Subsets
Medium

Given an integer array `nums` of unique elements, return all possible subsets
(the power `set`).

The solution `set` must not contain duplicate subsets. Return the solution in any order.

Example:
Input: `nums` = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Generate all possible subsets (power set) by making binary choices for each element: include it or don't include it in the current subset. Use backtracking to explore all combinations.

### APPROACH (Backtracking):
1. **Start with empty subset** and iterate through array elements
2. **For each element**: try including it (recurse) then excluding it (backtrack)
3. **Add current subset** to result at each recursive call (not just at leaves)
4. **Use start index** to avoid generating duplicate subsets

### WHY THIS WORKS:
- Each element has 2 choices: include or exclude
- Total subsets = 2^n (binary choices for n elements)
- Backtracking systematically explores all combinations
- Adding current subset at each step captures all intermediate states

### TIME COMPLEXITY: O(n × 2^n) - 2^n subsets, each takes O(n) to copy
### SPACE COMPLEXITY: O(n) - recursion depth

### THREE APPROACHES:

#### Approach 1: Backtracking (Most Intuitive)
```python
def backtrack(start, current):
    result.append(current[:])  # Add current subset
    for i in range(start, len(nums)):
        current.append(nums[i])
        backtrack(i + 1, current)
        current.pop()
```

#### Approach 2: Bit Manipulation
Each subset corresponds to a binary number where bit i indicates if nums[i] is included

#### Approach 3: Iterative Building
Start with [[]], for each new element, add it to all existing subsets

### EXAMPLE WALKTHROUGH (Backtracking):
```
Input: nums = [1,2,3]

backtrack(0, []):
  Add [] to result

  Try i=0 (element 1):
    current = [1]
    backtrack(1, [1]):
      Add [1] to result

      Try i=1 (element 2):
        current = [1,2]
        backtrack(2, [1,2]):
          Add [1,2] to result

          Try i=2 (element 3):
            current = [1,2,3]
            backtrack(3, [1,2,3]):
              Add [1,2,3] to result
              No more elements, return
            current = [1,2] (backtrack)
          No more elements, return
        current = [1] (backtrack)

      Try i=2 (element 3):
        current = [1,3]
        backtrack(3, [1,3]):
          Add [1,3] to result
          No more elements, return
        current = [1] (backtrack)

      No more elements, return
    current = [] (backtrack)

  Try i=1 (element 2): ... continues similarly

Final result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

### KEY INSIGHTS:
- Add current subset to result BEFORE recursing (not just at leaves)
- Use start index to maintain order and avoid duplicates
- Backtracking pattern: choose → recurse → unchoose

</details>
"""

class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Backtracking
        Time Complexity: O(n * 2^n)
        Space Complexity: O(n) for recursion
        """
        result = []

        def backtrack(start, current):
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
        result = []

        for mask in range(1 << n):  # 2^n possibilities
            subset = []
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
        result = [[]]

        for num in nums:
            result += [subset + [num] for subset in result]

        return result


"""
90. Subsets II
Medium

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
        result = []

        def backtrack(start, current):
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
Medium

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
        result = []

        def backtrack(remain, current, start):
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
Medium

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
        result = []

        def backtrack(remain, current, start):
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
        print(f"Input: {nums}")
        print(f"Subsets ({len(result)}): {result}\n")

    # Test Subsets with Duplicates
    solution_dup = SolutionUnique()

    print("Subsets with Duplicates:")
    test_cases_dup = [[1, 2, 2], [4, 4, 4, 1, 4]]
    for nums in test_cases_dup:
        result = solution_dup.subsetsWithDup(nums)
        print(f"Input: {nums}")
        print(f"Unique Subsets: {result}\n")

    # Test Combination Sum
    solution_comb = SolutionCombSum()

    print("Combination Sum:")
    test_comb = [([2, 3, 6, 7], 7), ([2, 3, 5], 8)]
    for candidates, target in test_comb:
        result = solution_comb.combinationSum(candidates, target)
        print(f"Candidates: {candidates}, Target: {target}")
        print(f"Combinations: {result}\n")
