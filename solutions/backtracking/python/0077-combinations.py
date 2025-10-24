"""
# Difficulty: Medium

# 077. Combinations

Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

You may return the answer in any order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 4, k = 2</dd>
<dt>Output:</dt>
<dd>[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]</dd>
<dt>Explanation:</dt>
<dd>All 2-combinations from [1,2,3,4] are [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, Matrix
**Patterns**: Backtracking
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Build combinations incrementally by choosing numbers from a starting position onwards. Use a start parameter to ensure we only consider numbers greater than previously chosen ones, avoiding duplicates like [1,2] and [2,1]. When combination reaches size k, add it to results.

### APPROACH:
1. **Initialize result**: Create empty result list and current combination list
2. **Define backtrack function**: Create recursive function with parameters (start, current)
# 3. **Base case**: If len(current) == k, add copy of current to result and return  # Result undefined
4. **Iterate from start**: Loop from start to n+1 (numbers 1 to n)
5. **Add number**: Append current number i to current combination
6. **Recursive call**: Call backtrack(i+1, current) to continue building combination
7. **Backtrack**: Remove last element from current (pop) to try next number
8. **Return result**: After all recursive calls complete, return result list

### WHY THIS WORKS:
- Backtracking builds combinations of size k from 1..n
- At each step, try all numbers from start to n
- When path length reaches k, found valid combination
- Pass start to ensure combinations not permutations (no [2,1] after [1,2])
- O(C(n,k) * k) time: C(n,k) combinations, O(k) to copy each

### EXAMPLE WALKTHROUGH:
Input:
```
n = 4, k = 2
```

Step 1: Start backtracking with empty combination
Try 1: curr = [1]

Steps:
Step 1: Try 2: curr = [1,2] → len=k, add [1,2] to result
Step 2: Try 3: curr = [1,3] → len=k, add [1,3] to result
Step 3: Try 4: curr = [1,4] → len=k, add [1,4] to result
Step 4: Try 2: curr = [2]
Step 5: Try 3: curr = [2,3] → len=k, add [2,3] to result
Step 6: Try 4: curr = [2,4] → len=k, add [2,4] to result
Step 7: Try 3: curr = [3]
Step 8: Try 4: curr = [3,4] → len=k, add [3,4] to result
Step 9: Try 4: curr = [4] → can't form combination of size 2

Output:
```
[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
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
    def combine(self, n: int, k: int) -> List[List[int]]:
        """
        Generate all possible combinations of k numbers from 1 to n.

        Args:
            n (int): The range of numbers (1 to n)
            k (int): The size of each combination

        Returns:
            List[List[int]]: List of all possible combinations
        """

        def backtrack(start: int, curr_combination: List[int]) -> None:
            # If we have a valid combination of size k, add it to results
            if len(curr_combination) == k:
                result.append(curr_combination[:])
                return

            # Try each possible number that can be added to the current combination
            for i in range(start, n + 1):
                # Add current number to combination
                curr_combination.append(i)
                # Recursively generate combinations with remaining numbers
                backtrack(i + 1, curr_combination)
                # Backtrack by removing the last added number
                curr_combination.pop()

        result: list[Any] = []
        backtrack(1, [])
        return result

    def combine_iterative(self, n: int, k: int) -> List[List[int]]:
        """
        Generate all possible combinations of k numbers from 1 to n using iterative approach.

        Args:
            n (int): The range of numbers (1 to n)
            k (int): The size of each combination

        Returns:
            List[List[int]]: List of all possible combinations
        """
        # Initialize the first combination
        nums = list(range(1, k + 1)) + [n + 1]
        result: list[list[int]] = []
        i = 0

        while i < k:
            # Add current combination
            result.append(nums[:k])
            i = 0

            # Find the first number that can be incremented
            while i < k and nums[i] + 1 == nums[i + 1]:
                nums[i] = i + 1
                i += 1

            # Increment the number at position i
            nums[i] += 1

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.combine(4, k=2)
    expected = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.combine([], 0)  # type: ignore
    expected: list[list[int]] = [[]]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 077. Combinations")
