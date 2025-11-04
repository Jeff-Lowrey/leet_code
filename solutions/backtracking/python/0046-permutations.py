"""
# 0046. Permutations

# Difficulty: Medium

Given an array `nums` of distinct integers, return all the possible permutations.
You can return the answer in any order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [1,2,3]</dd>
<dt>Output:</dt>
<dd>[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</dd>
<dt>Explanation:</dt>
<dd>All permutations of [1,2,3] are 6 arrangements: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, Tree
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n × n!) - n! permutations, each takes O(n) to build/copy
**Space Complexity**: O(n) - recursion depth and current permutation

### INTUITION:
Generate all permutations by systematically trying each unused element at each position. Use backtracking to explore all possibilities while maintaining state through choices and un-choices.

### APPROACH:
1. **Initialize result list**: Create an empty list to store all permutations
2. **Define recursive backtracking function**: Create a helper function that builds permutations by maintaining a current partial permutation
3. **Base case check**: If the current permutation length equals the input array length, we have a complete permutation - add a copy to results
4. **Iterate through all elements**: For each element in the original array, check if it's not already in the current permutation
5. **Make choice and recurse**: Add the element to current permutation, recursively call backtrack to continue building
6. **Backtrack**: Remove the last added element (undo choice) to try other possibilities
7. **Return all permutations**: After exploring all branches, return the complete list of permutations

### WHY THIS WORKS:
- Each permutation uses every element exactly once
- Backtracking ensures we explore all n! permutations
- Checking "not in current" ensures no duplicates within a permutation
- Systematic exploration guarantees all permutations are found

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1, 2, 3]
```

Step 1: backtrack([])
Try 1: current = [1]
Try 2: current = [1,2]
Try 3: current = [1,2,3] ✓ Complete! Add to result
Remove 3: current = [1,2]
Remove 2: current = [1]
Try 3: current = [1,3]
Try 2: current = [1,3,2] ✓ Complete! Add to result
Remove 2: current = [1,3]
Remove 3: current = [1]
Remove 1: current = []
Step 2: Try 2: current = [2]
Try 1: current = [2,1]
Try 3: current = [2,1,3] ✓ Complete! Add to result
Try 3: current = [2,3]
Try 1: current = [2,3,1] ✓ Complete! Add to result
Step 3: Try 3: current = [3]
Try 1: current = [3,1]
Try 2: current = [3,1,2] ✓ Complete! Add to result
Try 2: current = [3,2]
Try 1: current = [3,2,1] ✓ Complete! Add to result

Output:
```
[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

### TIME COMPLEXITY:
O(n × n!) - n! permutations, each takes O(n) to build/copy

### SPACE COMPLEXITY:
O(n) - recursion depth and current permutation

### EDGE CASES:
- **Empty array**: Return [[]] (empty permutation)
- **Single element**: Return [[element]]
- **Two elements**: Return both orderings [[a,b], [b,a]]
- **Duplicate elements (in variant)**: Use frequency counter to avoid duplicates
- **Large arrays**: n! permutations, factorial growth

</details>
"""

from collections import Counter
from typing import Any


class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Backtracking
        Time Complexity: O(n * n!)
        Space Complexity: O(n) for recursion
        """
        result: list[Any] = []

        def backtrack(current: Any) -> Any:
            if len(current) == len(nums):
                result.append(current[:])
                return

            for num in nums:
                if num not in current:
                    current.append(num)
                    backtrack(current)
                    current.pop()

        backtrack([])
        return result

    def permuteSwap(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Backtracking with swapping
        Time Complexity: O(n * n!)
        Space Complexity: O(n)
        """
        result: list[list[int]] = []

        def backtrack(first: Any = 0) -> Any:
            if first == len(nums):
                result.append(nums[:])
                return

            for i in range(first, len(nums)):
                nums[first], nums[i] = nums[i], nums[first]
                backtrack(first + 1)
                nums[first], nums[i] = nums[i], nums[first]

        backtrack()
        return result


"""
47. Permutations II
Given a collection of numbers, nums, that might contain duplicates, return all
possible unique permutations in any order.

Example:
Input: nums = [1,1,2]
Output: [[1,1,2],[1,2,1],[2,1,1]]
"""


class SolutionUnique:
    def permuteUnique(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Backtracking with frequency map
        Time Complexity: O(n * n!)
        Space Complexity: O(n)
        """
        result: list[Any] = []
        counter = Counter(nums)

        def backtrack(current: Any) -> Any:
            if len(current) == len(nums):
                result.append(current[:])
                return

            for num in counter:
                if counter[num] > 0:
                    current.append(num)
                    counter[num] -= 1
                    backtrack(current)
                    current.pop()
                    counter[num] += 1

        backtrack([])
        return result


"""
31. Next Permutation
A permutation of an array of integers is an arrangement of its members into a
sequence or linear order.

Implement next permutation, which rearranges numbers into the lexicographically
next greater permutation of numbers.

Example:
Input: nums = [1,2,3]
Output: [1,3,2]
"""


class SolutionNext:
    def nextPermutation(self, nums: list[int]) -> None:
        """
        Approach: Find pivot and swap
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        n = len(nums)

        # Find the pivot (first decreasing element from right)
        pivot = n - 2
        while pivot >= 0 and nums[pivot] >= nums[pivot + 1]:
            pivot -= 1

        if pivot >= 0:
            # Find the smallest element greater than pivot
            successor = n - 1
            while nums[successor] <= nums[pivot]:
                successor -= 1

            # Swap
            nums[pivot], nums[successor] = nums[successor], nums[pivot]

        # Reverse the suffix
        left, right = pivot + 1, n - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1


# Test cases
if __name__ == "__main__":
    # Test Permutations
    solution = Solution()

    print("Permutations:")
    test_cases = [[1, 2, 3], [0, 1], [1]]
    for nums in test_cases:
        result = solution.permute(nums)
        print(f"Input: nums")
        print(f"Permutations: result\n")

    # Test Permutations with Duplicates
    solution_unique = SolutionUnique()

    print("Unique Permutations:")
    test_cases_dup = [[1, 1, 2], [1, 2, 3], [2, 2, 1, 1]]
    for nums in test_cases_dup:
        result = solution_unique.permuteUnique(nums)
        print(f"Input: nums")
        print(f"Unique Permutations: result\n")

    # Test Next Permutation
    solution_next = SolutionNext()

    print("Next Permutation:")
    test_cases_next = [[1, 2, 3], [3, 2, 1], [1, 1, 5], [1]]
    for nums in test_cases_next:
        original = nums.copy()
        solution_next.nextPermutation(nums)
        print(f"Input: {original} -> Next: nums")
