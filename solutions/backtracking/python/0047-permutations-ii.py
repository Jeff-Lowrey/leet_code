"""
# Difficulty: Medium

# 047. Permutations Ii

Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [1,1,2]</dd>
<dt>Output:</dt>
<dd>[[1,1,2],[1,2,1],[2,1,1]]</dd>
<dt>Explanation:</dt>
<dd>All unique permutations of [1,1,2] are [[1,1,2],[1,2,1],[2,1,1]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array
**Patterns**: Hash Table Pattern, Backtracking
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use a frequency counter to track available numbers. During backtracking, iterate through unique numbers in the counter, not array positions. Decrement the counter when using a number and increment when backtracking. This naturally handles duplicates by treating them as frequency counts.

### APPROACH:
1. **Create frequency counter**: Use Counter(nums) to build frequency map of available numbers
2. **Initialize result**: Create empty result list and current permutation list
3. **Define backtrack function**: Create recursive function that builds permutations incrementally
# 4. **Base case**: When len(current) == len(nums), add copy of current to result and return  # Result undefined
5. **Iterate unique numbers**: Loop through counter.keys() (unique numbers only)
6. **Check availability**: If counter[num] > 0, the number is available to use
7. **Use number**: Add num to current, decrement counter[num] by 1
8. **Recurse and backtrack**: Call backtrack(), then remove num from current and increment counter[num]

### WHY THIS WORKS:
- Backtracking with frequency map to handle duplicates
- At each level, try each unique unused number
- Skip if count[num] == 0 (already used in this path)
- Decrement count on recursion, increment on backtrack
- O(n! * n) time: n! permutations, O(n) to copy each

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,1,2]
```

Step 1: Create frequency counter
counter = {1: 2, 2: 1}
Step 2: Backtrack to build permutations
Choose 1: temp = [1], counter = {1: 1, 2: 1}
Choose 1: temp = [1,1], counter = {1: 0, 2: 1}

Steps:
Step 1: Choose 2: temp = [1,1,2] → add to result
Step 2: Choose 2: temp = [1,2], counter = {1: 1, 2: 0}
Step 3: Choose 1: temp = [1,2,1] → add to result
Step 4: Choose 2: temp = [2], counter = {1: 2, 2: 0}
Step 5: Choose 1: temp = [2,1], counter = {1: 1, 2: 0}
Step 6: Choose 1: temp = [2,1,1] → add to result

Output:
```
[[1,1,2],[1,2,1],[2,1,1]]
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

from collections import Counter

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        """
        Generate all possible unique permutations of the input array.

        Args:
            nums: List of integers (may contain duplicates)

        Returns:
            List of lists containing all unique permutations

        Time Complexity: O(n!)
        Space Complexity: O(n)
        """
        # Handle empty input
        if not nums:
            return []

        def backtrack(counter: Counter, temp_perm: List[int], n: int) -> None:
            """
            Helper function for backtracking to generate permutations.

            Args:
                counter: Counter object containing remaining numbers
                temp_perm: Current permutation being built
                n: Target length of permutation
            """
            # Base case: if current permutation is complete
            if len(temp_perm) == n:
                result.append(temp_perm[:])
                return

            # Try each unique number from counter
            for num in counter:
                if counter[num] > 0:
                    # Add current number to permutation
                    temp_perm.append(num)
                    counter[num] -= 1

                    # Recursive call
                    backtrack(counter, temp_perm, n)

                    # Backtrack
                    temp_perm.pop()
                    counter[num] += 1

        result: list[Any] = []
        # Create counter for frequency of each number
        counter = Counter(nums)
        backtrack(counter, [], len(nums))
        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.permuteUnique([1, 1, 2])
    expected = [[1, 1, 2], [1, 2, 1], [2, 1, 1]]
    # Sort for comparison since order may vary
    assert sorted([sorted(p) for p in result]) == sorted([sorted(p) for p in expected]), (
        f"Expected {expected}, got {result}"
    )

    # Test case 2: Single element
    result = solution.permuteUnique([1])
    expected = [[1]]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: All duplicates
    result = solution.permuteUnique([1, 1, 1])
    expected = [[1, 1, 1]]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 047. Permutations Ii")
