"""
# Difficulty: Medium

Given an array `nums` of distinct integers, return all the possible permutations.
You can return the answer in any order.

Example:
Input: `nums` = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Generate all permutations by systematically trying each unused element at each position. Use backtracking to explore all possibilities while maintaining state through choices and un-choices.

### APPROACH:
[Detailed explanation of the solution approach]

### WHY THIS WORKS:
- Each permutation uses every element exactly once
- Backtracking ensures we explore all n! permutations
- Checking "not in current" ensures no duplicates within a permutation
- Systematic exploration guarantees all permutations are found

### EXAMPLE WALKTHROUGH:

Input:
```
[example input]
```

**Step 1:** [description]

**Step 2:** [description]

### TIME COMPLEXITY:
O(n × n!) - n! permutations, each takes O(n) to build/copy

### SPACE COMPLEXITY:
O(n) - recursion depth and current permutation

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""

class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Backtracking
        Time Complexity: O(n * n!)
        Space Complexity: O(n) for recursion
        """
        result = []

        def backtrack(current):
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
        result = []

        def backtrack(first=0):
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
# Difficulty: Medium
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
        from collections import Counter
        result = []
        counter = Counter(nums)

        def backtrack(current):
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
# Difficulty: Medium
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
        print(f"Input: {nums}")
        print(f"Permutations: {result}\n")

    # Test Permutations with Duplicates
    solution_unique = SolutionUnique()

    print("Unique Permutations:")
    test_cases_dup = [[1, 1, 2], [1, 2, 3], [2, 2, 1, 1]]
    for nums in test_cases_dup:
        result = solution_unique.permuteUnique(nums)
        print(f"Input: {nums}")
        print(f"Unique Permutations: {result}\n")

    # Test Next Permutation
    solution_next = SolutionNext()

    print("Next Permutation:")
    test_cases_next = [[1, 2, 3], [3, 2, 1], [1, 1, 5], [1]]
    for nums in test_cases_next:
        original = nums.copy()
        solution_next.nextPermutation(nums)
        print(f"Input: {original} -> Next: {nums}")
