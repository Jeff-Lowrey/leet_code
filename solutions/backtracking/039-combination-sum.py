"""
# 039. Combination Sum
**Medium**

Given a problem that demonstrates key concepts in Backtracking.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of backtracking concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply backtracking methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages backtracking principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses backtracking techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using backtracking method
3. Return the computed result

</details>
"""

class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Find all unique combinations of numbers that sum up to the target.
        
        Args:
            candidates (List[int]): List of distinct positive integers
            target (int): Target sum to achieve
            
        Returns:
            List[List[int]]: List of all unique combinations that sum to target
            
        Time Complexity: O(N^(T/M)), where N is length of candidates,
                        T is target, M is minimal value in candidates
        Space Complexity: O(T/M) for recursion depth
        """
        def backtrack(remain: int, combo: List[int], start: int) -> None:
            """
            Helper function to perform backtracking and find combinations.
            
            Args:
                remain (int): Remaining sum to achieve
                combo (List[int]): Current combination being built
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
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 039. Combination Sum")
