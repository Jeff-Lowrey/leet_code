"""
# Difficulty: Medium

# 039. Combination Sum

Given an array of distinct integers candidates and a target integer target,
return a list of all unique combinations of candidates where the chosen numbers sum to target.
You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times.
Two combinations are unique if the frequency of at least one of the chosen numbers is different.

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
This is a classic backtracking problem where we need to find all combinations that sum to target.
Since numbers can be reused unlimited times, we explore each candidate multiple times.

### APPROACH:
1. **Sort candidates**: For optimization and early termination
2. **Use backtracking**: Build combinations incrementally
3. **Two choices per element**: Include it (allowing reuse) or skip it
4. **Base cases**: Sum equals target (valid) or exceeds target (invalid)

### WHY THIS WORKS:
- Backtracking explores all possible combinations systematically
- Sorting allows early termination when candidate > remaining sum
- Using start index prevents duplicate combinations

### EXAMPLE WALKTHROUGH:
```
Input: candidates = [2,3,6,7], target = 7
Combinations found: [[2,2,3], [7]]
- Try 2: [2] -> remaining=5, try 2 again: [2,2] -> remaining=3, try 3: [2,2,3] ✓
- Try 7: [7] -> remaining=0 ✓
```

### TIME COMPLEXITY:
O(N^(T/M))
Where N=len(candidates), T=target, M=minimal candidate value

### SPACE COMPLEXITY:
O(T/M)
For recursion depth and storing combinations

### EDGE CASES:
- Target = 0: return [[]]
- No valid combinations: return []
- Single candidate equals target: return [[candidate]]

</details>
"""

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
        result = []
        backtrack(target, [], 0)
        return result

def test_solution():
    """
    Test cases for 039. Combination Sum.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    result = solution.combinationSum([2,3,6,7], 7)
    expected = [[2,2,3], [7]]
    assert len(result) == len(expected), f"Expected {len(expected)} combinations, got {len(result)}"

    # Test case 2: Multiple reuse
    result = solution.combinationSum([2,3,5], 8)
    assert len(result) == 3, f"Expected 3 combinations for [2,3,5] target 8, got {len(result)}"

    # Test case 3: No solution
    result = solution.combinationSum([2], 3)
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Single element solution
    result = solution.combinationSum([1], 2)
    expected = [[1,1]]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 039. Combination Sum ===")
    print(f"Input: [2,3,6,7], target=7 -> {solution.combinationSum([2,3,6,7], 7)}")
    print(f"Input: [2,3,5], target=8 -> {solution.combinationSum([2,3,5], 8)}")
    print(f"Input: [2], target=3 -> {solution.combinationSum([2], 3)}")
